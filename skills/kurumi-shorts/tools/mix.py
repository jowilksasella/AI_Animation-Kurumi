"""Audio for one short: original podcast voice + self-synthesized BGM + SFX, BGM ducked under speech.

    python tools/mix.py <episode.wav> <sfx.json> <out.wav> [--seed N]

Everything except the voice is generated here from numpy oscillators/noise (no third-party audio),
so there is no external licence to track. The voice samples are not altered except for a single
overall gain applied with the rest of the mix to reach the delivery loudness."""
import argparse, json, subprocess, re
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve, resample_poly
from scipy.io import wavfile

SR = 48000
BGM_LUFS = -28.0      # BGM alone, before ducking (voice as dual-mono stereo is about -15 LUFS)
DUCK_DB = -7.0        # extra attenuation while someone is speaking
TARGET_LUFS = -14.0   # delivery loudness (YouTube reference level)


def note(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def env_adsr(n, a, r):
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    if na: e[:na] = np.linspace(0, 1, na)
    if nr: e[-nr:] *= np.linspace(1, 0, nr)
    return e


def bgm(duration, seed):
    """Upbeat 96 BPM C-major bed: Fmaj7–Em7–Dm7–Cmaj7 pad, bell arpeggio, soft bass, kick and shaker."""
    rng = np.random.default_rng(seed)
    beat = 60 / 96
    bar = 4 * beat
    n = int((np.ceil(duration / bar) + 3) * bar * SR)
    L, R = np.zeros(n), np.zeros(n)
    chords = [[53, 57, 60, 64], [52, 55, 59, 62], [50, 53, 57, 60], [48, 52, 55, 59]]
    t_bar = np.arange(int(bar * SR)) / SR
    bars = int(np.ceil(duration / bar)) + 1
    for b in range(bars):
        ch = chords[b % 4]
        s0 = int(b * bar * SR)
        # pad: additive saw (8 partials), two detuned voices, slow attack
        seg = np.zeros(len(t_bar) + int(.8 * SR))
        tt = np.arange(len(seg)) / SR
        for m in ch:
            for det in (-0.06, 0.06):
                f = note(m + det)
                for k in range(1, 9):
                    seg += np.sin(2 * np.pi * f * k * tt + rng.uniform(0, 6.28)) / k ** 1.6
        seg *= env_adsr(len(seg), .6, .9) * 0.02
        e = min(n, s0 + len(seg))
        L[s0:e] += seg[:e - s0]; R[s0:e] += seg[:e - s0]
        # bass on beats 1 and 3 (and a pickup on 2+)
        for bt, mm in ((0, ch[0] - 12), (2, ch[0] - 12), (1.5, ch[2] - 12)):
            st = s0 + int(bt * beat * SR)
            tt = np.arange(int(.9 * SR)) / SR
            f = note(mm)
            x = (np.sin(2 * np.pi * f * tt) + .25 * np.sin(4 * np.pi * f * tt)) * np.exp(-tt / .35) * (.10 if bt != 1.5 else .06)
            e = min(n, st + len(x)); L[st:e] += x[:e - st]; R[st:e] += x[:e - st]
        # bell arpeggio in eighths
        pattern = [0, 1, 2, 3, 2, 1, 2, 3]
        for i, pi_ in enumerate(pattern):
            if rng.random() < .18: continue
            st = s0 + int(i * beat / 2 * SR)
            tt = np.arange(int(1.2 * SR)) / SR
            f = note(ch[pi_] + 12)
            x = (np.sin(2 * np.pi * f * tt) + .3 * np.sin(4 * np.pi * f * tt) * np.exp(-tt / .08) + .12 * np.sin(6 * np.pi * f * tt)) * np.exp(-tt / .45)
            x *= rng.uniform(.035, .05) * np.minimum(1, tt / .004)
            pan = .5 + .35 * np.sin(i)
            e = min(n, st + len(x)); L[st:e] += x[:e - st] * (1 - pan) * 1.4; R[st:e] += x[:e - st] * pan * 1.4
        # soft kick on 1 and 3, shaker on off-beats
        for bt in (0, 2):
            st = s0 + int(bt * beat * SR)
            tt = np.arange(int(.25 * SR)) / SR
            ph = 2 * np.pi * np.cumsum(45 + 70 * np.exp(-tt / .03)) / SR
            x = np.sin(ph) * np.exp(-tt / .1) * .24
            e = min(n, st + len(x)); L[st:e] += x[:e - st]; R[st:e] += x[:e - st]
        for i in range(8):
            st = s0 + int((i + .5) * beat / 2 * SR)
            tt = np.arange(int(.06 * SR)) / SR
            x = np.diff(rng.standard_normal(len(tt) + 1)) * np.exp(-tt / .012) * (.010 if i % 2 else .006)
            e = min(n, st + len(x)); L[st:e] += x[:e - st] * .8; R[st:e] += x[:e - st]
    # room reverb (decorrelated noise IR)
    ir_t = np.arange(int(1.6 * SR)) / SR
    for ch_, s in ((L, 1), (R, 2)):
        ir = np.random.default_rng(seed + s).standard_normal(len(ir_t)) * np.exp(-ir_t / .45)
        ir = sosfilt(butter(2, 5000, 'low', fs=SR, output='sos'), ir)
        wet = fftconvolve(ch_, ir)[:n] * .018
        ch_ += wet
    out = np.stack([L, R], 1)[:int(duration * SR)]
    out = sosfilt(butter(2, 30, 'high', fs=SR, output='sos'), out, axis=0)
    fade_in, fade_out = int(.8 * SR), int(1.5 * SR)
    out[:fade_in] *= np.linspace(0, 1, fade_in)[:, None]
    out[-fade_out:] *= np.linspace(1, 0, fade_out)[:, None]
    return out


def sfx_bank(seed):
    rng = np.random.default_rng(seed)
    def t(d): return np.arange(int(d * SR)) / SR
    def pop():
        tt = t(.2); f = 340 * 2 ** (np.minimum(tt, .09) / .09)
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / .05) * .5
    def ding():
        tt = t(.8)
        return (np.sin(2 * np.pi * 660 * tt) * .2 + np.sin(2 * np.pi * 990 * tt) * .09) * np.exp(-tt / .22) * np.minimum(1, tt / .005) * 1.6
    def tick():
        tt = t(.06)
        return np.sign(np.sin(2 * np.pi * 1900 * tt)) * np.exp(-tt / .008) * .12
    def whoosh():
        tt = t(.7); x = rng.standard_normal(len(tt))
        lo = sosfilt(butter(2, [300, 900], 'band', fs=SR, output='sos'), x)
        hi = sosfilt(butter(2, [900, 2600], 'band', fs=SR, output='sos'), x)
        k = np.sin(np.pi * tt / .7)
        return (lo * (1 - k) + hi * k) * np.sin(np.pi * tt / .7) ** 2 * .45
    def hit():
        tt = t(.5); ph = 2 * np.pi * np.cumsum(40 + 120 * np.exp(-tt / .025)) / SR
        body = np.sin(ph) * np.exp(-tt / .14) * .8
        snap = sosfilt(butter(2, 1800, 'high', fs=SR, output='sos'), rng.standard_normal(len(tt))) * np.exp(-tt / .03) * .35
        return body + snap
    def sparkle():
        out = np.zeros(int(.7 * SR))
        for k, f in enumerate((1568, 2093, 2637, 3136)):
            st = int(k * .045 * SR); tt = t(.5)
            x = np.sin(2 * np.pi * f * tt) * np.exp(-tt / .12) * .14
            out[st:st + len(x)] += x[:len(out) - st]
        return out
    return {'pop': pop(), 'ding': ding(), 'tick': tick(), 'whoosh': whoosh(), 'hit': hit(), 'sparkle': sparkle()}


def lufs(path):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', path, '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True)
    return float(re.findall(r'I:\s+(-?[\d.]+) LUFS', r.stderr)[-1])


def read_wav(path):
    sr, x = wavfile.read(path)
    if x.dtype.kind == 'i': x = x / float(np.iinfo(x.dtype).max)
    return (x.reshape(len(x), -1).astype(np.float64)), sr


def measure(x, tmp):
    wavfile.write(tmp, SR, x.astype(np.float32))
    return lufs(tmp)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('voice'); ap.add_argument('sfx'); ap.add_argument('out')
    ap.add_argument('--seed', type=int, default=20261022)
    ap.add_argument('--stems', action='store_true')
    a = ap.parse_args()
    v, vsr = read_wav(a.voice)
    v = resample_poly(v.mean(1), SR, vsr)
    dur = len(v) / SR
    tmp = a.out + '.tmp.wav'
    music = bgm(dur, a.seed)
    music *= 10 ** ((BGM_LUFS - measure(music, tmp)) / 20)
    # duck: speech detector on 30 ms RMS, attack 80 ms / release 400 ms
    win = int(.03 * SR)
    rms = np.sqrt(np.convolve(v ** 2, np.ones(win) / win, 'same'))
    target = np.where(20 * np.log10(rms + 1e-9) > -42, DUCK_DB, 0.0)
    g = np.empty_like(target); cur = 0.0
    att, rel = 1 - np.exp(-1 / (.08 * SR)), 1 - np.exp(-1 / (.4 * SR))
    for i, x in enumerate(target):
        cur += (x - cur) * (att if x < cur else rel); g[i] = cur
    music *= (10 ** (g / 20))[:, None]
    fx = np.zeros((len(v), 2)); bank = sfx_bank(a.seed)
    for c in json.load(open(a.sfx, encoding='utf-8')):
        x = bank[c['kind']] * c['vol'] * .55
        st = int(c['t'] * SR); e = min(len(v), st + len(x))
        if st < len(v): fx[st:e] += x[:e - st, None]
    if a.stems:
        for name, x in (('voice', np.repeat(v[:, None], 2, 1)), ('bgm', music), ('sfx', fx)):
            wavfile.write(a.out.replace('.wav', f'.{name}.wav'), SR, x.astype(np.float32))
    mix = v[:, None] + music + fx
    gain = TARGET_LUFS - measure(mix, tmp)
    mix *= 10 ** (gain / 20)
    peak = np.abs(mix).max()
    if peak > 0.70:  # soft ceiling at about -2.6 dBFS, leaving headroom for AAC overshoot (delivery check is <= -1 dBFS true peak)
        over = np.abs(mix) > .68
        mix[over] = np.sign(mix[over]) * (.68 + .06 * np.tanh((np.abs(mix[over]) - .68) / .06))
    wavfile.write(a.out, SR, mix.astype(np.float32))
    import os; os.remove(tmp)
    print(json.dumps({'duration': round(dur, 3), 'gain_db': round(gain, 2), 'peak_before_limit': round(float(peak), 3),
                      'mix_lufs': lufs(a.out)}))


if __name__ == '__main__':
    main()
