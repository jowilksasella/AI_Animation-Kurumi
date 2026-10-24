"""Compact storyboard brief for one episode: everything needed to write scenes/epNN.js, nothing else.

    python brief.py <project_dir> ep02

Needs project.json "episode_dir" and, optionally, "source_map" (a source-map.json with per-line sources and
crops next to it in crops/). Word starts come from <out_dir or project_dir>/timing/<ep>.words.json once shorts.py has aligned.

Merges manifest.json (turn times, speaker, delivery), subtitles.srt (caption split times inside a turn)
and source-map.json (per-line sources, notes, crop sizes, external citations). Read this instead of the
raw manifest (~120 KB, mostly TTS settings)."""
import json, re, sys
from pathlib import Path
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, str(Path(__file__).resolve().parent))
from align import srt_cues  # noqa: E402


def main(proj, ep):
    proj = Path(proj).resolve()
    cfg = json.loads((proj / 'project.json').read_text(encoding='utf-8'))
    out = Path(cfg['episode_dir'].format(ep=ep))
    m = json.loads((out / 'manifest.json').read_text(encoding='utf-8'))
    smp = Path(cfg['source_map']) if cfg.get('source_map') else None
    sm = json.loads(smp.read_text(encoding='utf-8')) if smp and smp.exists() else {'episodes': [], 'white_paper_sources': {}, 'external_sources': {}, 'non_paper_tags': {}}
    e = next((x for x in sm['episodes'] if x['episode'] == ep), {'lines': [], 'visual_suggestion': [], 'sources_used': []})
    lines = {l['id']: l for l in e['lines']}
    cues = srt_cues(out / 'subtitles.srt')
    tj = Path(cfg.get('out_dir', proj)) / 'timing' / f'{ep}.words.json'
    timed = json.loads(tj.read_text(encoding='utf-8')) if tj.exists() else None
    import wave
    with wave.open(str(out / 'episode.wav')) as w:
        dur = w.getnframes() / w.getframerate()
    print(f"{ep} {m['title']} | audio {dur:.3f} s | suggested visuals: {' '.join(e['visual_suggestion'])}")
    print('id  time  who  delivery  words with start seconds  [sources] note')
    for t in m['turns']:
        l = lines.get(t['id'], {})
        who = 'K' if t['speaker'] == '久留美' else 'M'
        note = f" — {l['note']}" if l.get('note') else ''
        text = t['text']
        if timed:  # word starts replace the plain text: '预测0.00 波动0.28 …'
            text = ' '.join(f"{w['text']}{w['start']:.2f}" for c in timed if t['start'] - .05 <= c['start'] < t['end'] for w in c['words'])
        print(f"{t['id']} {t['start']:6.2f}–{t['end']:6.2f} {who} {t['delivery']:8s} {text}  [{' '.join(l.get('sources', []))}]{note}")

    print('\nsources:')
    for sid in e['sources_used']:
        if sid in sm['white_paper_sources']:
            s = sm['white_paper_sources'][sid]
            crop = smp.parent / 'crops' / f'{sid}.png'
            size = 'x'.join(map(str, Image.open(crop).size)) if crop.exists() else 'no crop'
            print(f"{sid} p{s['page']} crop {size}: {s['zh']}")
        elif sid in sm['external_sources']:
            s = sm['external_sources'][sid]
            print(f"{sid}: {s['cite']} | 依据：{s['where']} | {s['zh']}")
        else:
            print(f"{sid}: {sm['non_paper_tags'].get(sid, '')}")


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
