"""Per-word caption timing: local faster-whisper (GPU) aligned to the known script.

    python align.py <episode.wav> <subtitles.srt> <out.json> [--model large-v3]

Whisper transcribes with the script as prompt and word timestamps; the ASR characters are matched to the
script characters (difflib), unmatched script characters are interpolated, and each SRT cue is split into
words with jieba (Whisper's Chinese word boundaries are unreliable). Output: [{start, end, speaker, text, words:[{text, start}]}] where the
word texts concatenate back to the cue text exactly. Cached: reruns are skipped if out.json is newer."""
import argparse, difflib, json, os, re, sys
from pathlib import Path

PUNCT = set('，。？！、；：“”‘’（）《》…—,.?!;:"\'()- ')


def srt_cues(path):
    text = Path(path).read_text(encoding='utf-8-sig')
    ts = lambda s: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + float(r.replace(',', '.')))(*s.split(':'))
    cues = []
    for block in re.split(r'\n\s*\n', text.strip()):
        lines = block.strip().splitlines()
        a, b = [x.strip() for x in lines[1].split('-->')]
        speaker, body = ' '.join(lines[2:]).split('：', 1)
        cues.append({'start': ts(a), 'end': ts(b), 'speaker': speaker, 'text': body.strip()})
    return cues


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('wav'); ap.add_argument('srt'); ap.add_argument('out'); ap.add_argument('--model', default='large-v3')
    a = ap.parse_args()
    if os.path.exists(a.out) and os.path.getmtime(a.out) > max(os.path.getmtime(a.wav), os.path.getmtime(a.srt)):
        print('align: cached'); return
    from faster_whisper import WhisperModel
    cues = srt_cues(a.srt)
    model = WhisperModel(a.model, device='cuda', compute_type='float16')
    script = [(ci, k, ch) for ci, c in enumerate(cues) for k, ch in enumerate(c['text']) if ch not in PUNCT]

    def attempt(prompt):
        segs, _ = model.transcribe(a.wav, language='zh', word_timestamps=True, beam_size=5, vad_filter=False, initial_prompt=prompt)
        chars, ts, starts = [], [], []
        for s in segs:
            for w in s.words:
                cs = [ch for ch in w.word.strip() if ch not in PUNCT]
                for k, ch in enumerate(cs):
                    chars.append(ch); ts.append(w.start + (w.end - w.start) * k / len(cs)); starts.append(k == 0)
        times, wstart = [None] * len(script), [False] * len(script)
        sm = difflib.SequenceMatcher(None, [x[2] for x in script], chars, autojunk=False)
        for blk in sm.get_matching_blocks():
            for k in range(blk.size):
                times[blk.a + k] = ts[blk.b + k]; wstart[blk.a + k] = starts[blk.b + k]
        return times, wstart

    # the script as prompt helps long episodes but can make Whisper skip the start of short clips: keep the better match
    times, wstart = max((attempt(p) for p in (''.join(c['text'] for c in cues), None)), key=lambda r: sum(t is not None for t in r[0]))
    matched = sum(t is not None for t in times)
    # interpolate gaps inside each cue, clamped to the cue window
    for ci, c in enumerate(cues):
        idx = [i for i, x in enumerate(script) if x[0] == ci]
        if not idx: continue
        pts = [(c['start'], idx[0] - 1)] + [(times[i], i) for i in idx if times[i] is not None and c['start'] - .3 <= times[i] <= c['end']] + [(c['end'] - .15, idx[-1] + 1)]
        for i in idx:
            if times[i] is not None and c['start'] - .3 <= times[i] <= c['end']: continue
            lo = max((p for p in pts if p[1] < i), key=lambda p: p[1]); hi = min((p for p in pts if p[1] > i), key=lambda p: p[1])
            times[i] = lo[0] + (hi[0] - lo[0]) * (i - lo[1]) / (hi[1] - lo[1]); wstart[i] = True
        for i in idx: times[i] = min(max(times[i], c['start']), c['end'] - .05)
    import jieba
    jieba.setLogLevel(60)
    out = []
    for ci, c in enumerate(cues):
        pos = {x[1]: i for i, x in enumerate(script) if x[0] == ci}
        words, k = [], 0
        for tok in jieba.cut(c['text'], HMM=False):
            first = next((pos[j] for j in range(k, k + len(tok)) if j in pos), None)
            if first is None and words:
                words[-1]['text'] += tok  # punctuation joins the previous word
            else:
                t = times[first] if first is not None else c['start']
                words.append({'text': tok, 'start': round(max(t, words[-1]['start'] if words else c['start']), 3)})
            k += len(tok)
        out.append(dict(c, words=words))
    Path(a.out).write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding='utf-8')
    print(f'align: {matched}/{len(script)} script characters matched by ASR; {sum(len(c["words"]) for c in out)} words')


if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    main()
