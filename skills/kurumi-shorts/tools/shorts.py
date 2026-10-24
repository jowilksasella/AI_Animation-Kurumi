"""kurumi-shorts pipeline: one command per episode.

    python shorts.py <project_dir> ep01 --preview      # align + build + layout check + contact sheet (~10 s after first align)
    python shorts.py <project_dir> ep01                # full: + SFX/BGM mix, render, mux, verify (~2.5 min for two languages)
    python shorts.py <project_dir> ep01 --langs tc     # only the 繁體 version
    python shorts.py <project_dir> ep01 --force        # render even if the layout check reports issues

<project_dir>/project.json:
  {"episode_dir": ".../{ep}/out",   # holds manifest.json, subtitles.srt, episode.wav
   "media_dir": ".../crops",         # PNGs copied to build/<ep>-<lang>/media/ (referenced as media/<ID>.png)
   "tc_config": "s2hk",              # OpenCC config for the 繁體 version
   "langs": ["sc", "tc"],
   "out_dir": "C:/…/outputs",       # optional: keep heavy outputs outside the project (e.g. outside git)
   "outro": {"dir": ".../out", "turn": "001", "gap": 0.5, "tail": 1.2,   # optional: a rendered podcast turn appended to every episode
             "ui": {"headline": "…", "button": "关注", "done": "已关注", "sub": "…"}}}
<project_dir>/scenes/<ep>.js|.css hold the episode's visuals (written in simplified Chinese; tc is converted).
Optional "titles": {"ep01": {"title": "…", "cover": "line
**keyword** line"}} overrides the top title and adds a cover.
Outputs under <project_dir>: timing/, build/, qa/<ep>/ (sheet.png, check-<lang>.json), audio/, render/, final/ (+ final/covers/)."""
import argparse, json, math, re, shutil, subprocess, sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
SKILL = Path(__file__).resolve().parent.parent
FXK = SKILL.parent / 'video-shot-demos' / 'assets' / 'fx-kurumi'
TOOLS = SKILL / 'tools'
LABEL = {'sc': '简体字幕', 'tc': '繁體字幕'}
FPS = 30
OUT_DIR = None  # project.json "out_dir": outputs (timing, build, qa, audio, render, final) live there instead of the project


def out_root(proj):
    return OUT_DIR or proj


def run(cmd, cwd=None):
    r = subprocess.run(list(map(str, cmd)), cwd=cwd, capture_output=True, text=True, encoding='utf-8', errors='replace')
    if r.returncode:
        sys.exit(f"FAILED: {' '.join(map(str, cmd))}\n{r.stdout[-2000:]}\n{r.stderr[-2000:]}")
    return r.stdout


def with_outro(proj, cfg, ep, src):
    """Episode voice (+ gap + outro turn + tail when configured). Returns (wav, words, turns_extra, outro, duration)."""
    from scipy.io import wavfile
    import numpy as np
    sr, voice = wavfile.read(src / 'episode.wav')
    words = json.loads(run_align(proj, src, f'{ep}.words.json'))
    o = cfg.get('outro')
    if not o:
        return src / 'episode.wav', words, [], None, round(len(voice) / sr, 3)
    od = Path(o['dir'])
    turn = next(t for t in json.loads((od / 'manifest.json').read_text(encoding='utf-8'))['turns'] if t['id'] == o['turn'])
    osr, ov = wavfile.read(od / 'episode.wav')
    assert osr == sr and ov.dtype == voice.dtype, 'outro wav format differs from the episode'
    clip = ov[int(turn['start'] * sr):int(turn['end'] * sr)]
    gap, tail = np.zeros(int(o.get('gap', .5) * sr), voice.dtype), np.zeros(int(o.get('tail', 1.2) * sr), voice.dtype)
    (out_root(proj) / 'audio').mkdir(exist_ok=True)
    out = out_root(proj) / 'audio' / f'{ep}-voice.wav'
    wavfile.write(out, sr, np.concatenate([voice, gap, clip, tail]))
    start = len(voice) / sr + len(gap) / sr
    shift = start - turn['start']
    ocues = [dict(c, start=c['start'] + shift, end=c['end'] + shift, words=[dict(w, start=w['start'] + shift) for w in c['words']])
             for c in json.loads(run_align(proj, od, 'outro.words.json')) if c['start'] >= turn['start'] - .05 and c['end'] <= turn['end'] + .05]
    end = start + turn['end'] - turn['start']
    outro = {'start': round(start, 3), 'end': round(end, 3), 'words': [w for c in ocues for w in c['words']], 'ui': o['ui']}
    return out, words + ocues, [{'id': 'outro', 'speaker': turn['speaker'], 'start': start, 'end': end}], outro, round((len(voice) + len(gap) + len(clip) + len(tail)) / sr, 3)


def run_align(proj, src, name):
    (out_root(proj) / 'timing').mkdir(exist_ok=True)
    out = out_root(proj) / 'timing' / name
    print(run([sys.executable, TOOLS / 'align.py', src / 'episode.wav', src / 'subtitles.srt', out]).strip().splitlines()[-1])
    return out.read_text(encoding='utf-8')


def build(proj, cfg, ep, lang, words, turns_extra=(), outro=None):
    import opencc
    conv = opencc.OpenCC(cfg.get('tc_config', 's2hk')).convert if lang == 'tc' else (lambda s: s)
    src = Path(cfg['episode_dir'].format(ep=ep))
    manifest = json.loads((src / 'manifest.json').read_text(encoding='utf-8'))
    brand, heading = manifest['title'].split('｜', 1)
    heading = cfg.get('titles', {}).get(ep, {}).get('title', heading)  # project.json may override the episode title
    num = re.search(r'(\d+)\s*$', brand).group(1)
    captions = [dict(c, text=conv(c['text']), words=[dict(w, text=conv(w['text'])) for w in c['words']]) for c in words]
    data = {'lang': lang, 'brand': conv(brand[:-len(num)].strip()), 'epLabel': conv(f'第 {num} 集'), 'heading': conv(heading),
            'names': {'kurumi': conv('久留美'), 'mochiko': conv('萌智子')},
            'turns': [{k: t[k] for k in ('id', 'speaker', 'start', 'end')} for t in manifest['turns']] + list(turns_extra), 'captions': captions}
    t = cfg.get('titles', {}).get(ep, {})
    if t.get('cover'):  # cover headline: one line per newline, **keyword** highlighted
        lines = [re.sub(r'[*][*](.+?)[*][*]', lambda m: '<b>' + m.group(1) + '</b>', conv(l)) for l in t['cover'].splitlines()]
        data['cover'] = {'lines': lines, 'strip': conv(cfg.get('cover_strip', '每集一分钟，读懂期权白皮书')), 'expression': t.get('expression', 'surprise'), 'kicker': conv(t.get('kicker', ''))}
    if outro:
        data['outro'] = dict(outro, ui={k: conv(v) for k, v in outro['ui'].items()}, words=[dict(w, text=conv(w['text'])) for w in outro['words']])
    dst = out_root(proj) / 'build' / f'{ep}-{lang}'
    dst.mkdir(parents=True, exist_ok=True)
    if not (dst / 'fx-kurumi').exists():
        shutil.copytree(FXK, dst / 'fx-kurumi')
    for f in ('player.js', 'player.css', 'components.js', 'components.css', 'outro.js', 'cover.js', 'cover.css'):
        shutil.copy2(SKILL / 'engine' / f, dst / f)
    (dst / 'scenes.js').write_text(conv((proj / 'scenes' / f'{ep}.js').read_text(encoding='utf-8')), encoding='utf-8')
    (dst / 'scenes.css').write_text((proj / 'scenes' / f'{ep}.css').read_text(encoding='utf-8'), encoding='utf-8')
    (dst / 'media').mkdir(exist_ok=True)
    for png in Path(cfg['media_dir']).glob('*.png'):
        if not (dst / 'media' / png.name).exists():
            shutil.copy2(png, dst / 'media' / png.name)
    (dst / 'data.js').write_text('window.EP=' + json.dumps(data, ensure_ascii=False) + ';\n', encoding='utf-8')
    for page, out in (('player.html', 'index.html'), ('cover.html', 'cover.html')):
        html = (SKILL / 'engine' / page).read_text(encoding='utf-8')
        (dst / out).write_text(html.replace('{{HTML_LANG}}', 'zh-HK' if lang == 'tc' else 'zh-CN').replace('{{TITLE}}', conv(manifest['title'])), encoding='utf-8')
    return dst / 'index.html'


def sheet(qa, langs):
    from PIL import Image, ImageDraw
    files = sorted((qa / langs[0]).glob('t*.png'))
    for other in langs[1:]:
        o = sorted((qa / other).glob('t*.png'))
        files += o[len(o) // 3::max(1, len(o) // 3)][:2]
    w, h, cols = 270, 480, 6
    S = Image.new('RGB', (cols * w, math.ceil(len(files) / cols) * (h + 20)), 'white')
    d = ImageDraw.Draw(S)
    for i, f in enumerate(files):
        x, y = (i % cols) * w, (i // cols) * (h + 20)
        S.paste(Image.open(f).convert('RGB').resize((w, h)), (x, y + 20))
        d.text((x + 4, y + 3), f'{f.parent.name} {f.stem[1:]}s', fill='black')
    S.save(qa / 'sheet.png')
    return qa / 'sheet.png'


def loudness(path):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', str(path), '-af', 'ebur128=peak=true', '-f', 'null', '-'],
                       capture_output=True, text=True, encoding='utf-8', errors='replace')
    return float(re.findall(r'I:\s+(-?[\d.]+) LUFS', r.stderr)[-1]), float(re.findall(r'Peak:\s+(-?[\d.]+) dBFS', r.stderr)[-1])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('project'); ap.add_argument('ep')
    ap.add_argument('--preview', action='store_true'); ap.add_argument('--force', action='store_true'); ap.add_argument('--langs')
    a = ap.parse_args()
    proj = Path(a.project).resolve()
    cfg = json.loads((proj / 'project.json').read_text(encoding='utf-8'))
    global OUT_DIR
    OUT_DIR = Path(cfg['out_dir']) if cfg.get('out_dir') else None
    langs = a.langs.split(',') if a.langs else cfg.get('langs', ['sc', 'tc'])
    ep = a.ep
    src = Path(cfg['episode_dir'].format(ep=ep))
    voice, words, turns_extra, outro, dur = with_outro(proj, cfg, ep, src)

    qa = out_root(proj) / 'qa' / ep
    issues = {}
    for lang in langs:
        page = build(proj, cfg, ep, lang, words, turns_extra, outro)
        out = qa / lang
        for old in out.glob('t*.png'):
            old.unlink()
        log = run(['node', TOOLS / 'render.js', page, 'qa', out, dur])
        found = json.loads((out / 'check.json').read_text(encoding='utf-8'))
        if 'page warnings:' in log:
            found['page warnings: ' + log.split('page warnings:')[1].strip().replace('\n', ' | ')] = []
        (qa / f'check-{lang}.json').write_text(json.dumps(found, ensure_ascii=False, indent=1), encoding='utf-8')
        issues[lang] = found
        if (page.parent / 'data.js').read_text(encoding='utf-8').find('"cover"') > 0:  # 1080x1920 cover → final/covers/
            run(['node', TOOLS / 'render.js', page.parent / 'cover.html', 'stills', qa / f'cover-{lang}', '0'])
            (out_root(proj) / 'final' / 'covers').mkdir(parents=True, exist_ok=True)
            shutil.copy2(qa / f'cover-{lang}' / 't000.00.png', out_root(proj) / 'final' / 'covers' / f'{ep}_{LABEL[lang]}.png')
            if OUT_DIR:  # covers are small and reviewed: keep a copy with the project sources too
                (proj / 'covers').mkdir(exist_ok=True)
                shutil.copy2(qa / f'cover-{lang}' / 't000.00.png', proj / 'covers' / f'{ep}_{LABEL[lang]}.png')
    print(f'{ep}: audio {dur} s | sheet {sheet(qa, langs)}')
    for lang, found in issues.items():
        print(f'  {lang} layout check: clean' if not found else '\n'.join(f"  {lang} {k}  @ {', '.join(map(str, ts[:4]))}{' …' if len(ts) > 4 else ''}" for k, ts in found.items()))
    if a.preview:
        return
    if any(issues.values()) and not a.force:
        sys.exit('layout check reported issues: fix the scenes or rerun with --force')

    for d in ('audio', 'render', 'final'):
        (proj / d).mkdir(exist_ok=True)
    sfx, mix = out_root(proj) / 'audio' / f'{ep}.sfx.json', out_root(proj) / 'audio' / f'{ep}-mix.wav'
    run(['node', TOOLS / 'render.js', out_root(proj) / 'build' / f'{ep}-{langs[0]}' / 'index.html', 'sfx', sfx])
    info = json.loads(run([sys.executable, TOOLS / 'mix.py', voice, sfx, mix]).strip().splitlines()[-1])
    procs = {lang: subprocess.Popen(['node', str(TOOLS / 'render.js'), str(out_root(proj) / 'build' / f'{ep}-{lang}' / 'index.html'), 'video',
                                     str(out_root(proj) / 'render' / f'{ep}-{lang}.video.mp4'), str(dur), str(FPS)],
                                    stdout=open(out_root(proj) / 'render' / f'{ep}-{lang}.log', 'w'), stderr=subprocess.STDOUT) for lang in langs}
    for lang, p in procs.items():
        if p.wait():
            sys.exit(f'render {lang} failed: see render/{ep}-{lang}.log')
    want = math.ceil(dur * FPS)
    for lang in langs:
        final = out_root(proj) / 'final' / f'{ep}_{LABEL[lang]}.mp4'
        run(['ffmpeg', '-y', '-loglevel', 'error', '-i', out_root(proj) / 'render' / f'{ep}-{lang}.video.mp4', '-i', mix, '-map', '0:v', '-map', '1:a',
             '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', final])
        frames = int(run(['ffprobe', '-v', 'error', '-count_packets', '-select_streams', 'v:0', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', final]).strip().strip(','))
        fdur = float(run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', final]).strip())
        i, p = loudness(final)
        ok = frames == want and abs(fdur - dur) < .05 and abs(i + 14) < .6 and p <= -1.0
        print(f"  {'OK ' if ok else 'BAD'} {final.name}: {fdur:.2f} s, {frames}/{want} frames, {i} LUFS, peak {p} dBFS")
    print(f"  mix: gain {info['gain_db']} dB, limiter input peak {info['peak_before_limit']}")


if __name__ == '__main__':
    main()
