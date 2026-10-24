---
name: kurumi-shorts
description: "Turn finished two-voice Kurumi podcast episodes (audio + SRT + manifest of speaker turns) into 1080×1920 Shorts/Reels with the FX战士久留美 cast: word-by-word captions, speaker-driven characters, animated chart scenes, alarm-style covers and titles, a follow outro, 简体/繁體 versions. Use for vertical short videos, shorts covers or short titles from podcast audio."
metadata:
  version: "0.2.0"
---

# kurumi-shorts

Vertical short videos from finished podcast audio. Cast art comes from the sibling skill `video-shot-demos/assets/fx-kurumi/` (both skills must sit side by side). The audio is never re-synthesized here. New spoken lines (e.g. an outro) come from the podcast repo (AI_Podcast-Kurumi: `render`, `split-series`, `source-map` commands).

**Worked example**: `projects/gex-20261022/` (16 episodes, all scenes, titles, covers, social copy). Read its README first and copy its patterns.

## Project layout

A project folder holds `project.json`, `scenes/<ep>.js|css`, and (optionally) `titles.md`, `covers/` and `social/`. Heavy outputs go to `out_dir`, outside git.

```json
{"episode_dir": "C:/…/{ep}/out", "media_dir": "C:/…/crops", "source_map": "C:/…/source-map.json",
 "tc_config": "s2hk", "langs": ["sc", "tc"], "out_dir": "C:/…/outputs",
 "outro": {"dir": "C:/…/out", "turn": "001", "gap": 0.5, "tail": 1.2, "ui": {"headline": "…", "button": "关注", "done": "已关注", "sub": "…"}},
 "titles": {"ep01": {"title": "…", "cover": "line\n**keyword** line", "kicker": "…", "expression": "concern"}}, "cover_strip": "…"}
```

`episode_dir` must contain `manifest.json` (`title` "系列名 NN｜集名", `turns[].id/speaker/start/end`), `subtitles.srt` ("说话人：文本") and `episode.wav`. Speakers are 久留美 and 萌智子.

## Steps (per episode)

1. Once per machine: run `npm i` in `tools/`. Python needs `opencc`, `faster-whisper` (CUDA, model large-v3 cached), `jieba` (install with `SETUPTOOLS_USE_DISTUTILS=stdlib pip install --no-build-isolation jieba` if the build fails), `scipy` and `Pillow`.
2. `python tools/brief.py <project> <ep>`: a compact brief with turns, **word start times**, sources, and crop sizes. Read it instead of the raw manifest. The first `shorts.py` run creates the word timings.
3. Write `scenes/<ep>.js|css` in simplified Chinese (繁體 is converted with OpenCC). Use one `scene()` per beat of about 2–4 s, placed on word starts. Build from the `C.*` parts in `engine/components.js`: `compose`, `headline`, `bars`, `figure`, `points`, `quote`, `paperTitle`, `flow`, `tiles`, `stat`, `vs`, `custom`. Add `cast()` expressions; Mochiko has no `concern`, Kurumi has no `question`. Add `keywords()`, and `sound()`/`punch()`/`shake()`/`flash()` on key words. Tag every scene's source: `paper` (blue), `ext` (outside research; mark working papers as unpublished), `ours` (amber: our analogy or reading), `q` (question), `next`.
4. `python tools/shorts.py <project> <ep> --preview`: aligns words (cached), builds, runs the layout check, writes the cover (when `titles` has one) and `qa/<ep>/sheet.png`. It's done when the check prints `clean` and the sheet looks right. To sample only one version, add `--langs tc`.
5. `python tools/shorts.py <project> <ep>`: mixes, renders, muxes and verifies. It's done when every final line prints `OK` (frames, duration, −14 LUFS, true peak ≤ −1 dBFS).

## Style rules (user-approved)

- Light theme, permanent top title (up to two lines), no progress bar. Visuals change every 1–3 s; numbers count up with a spark and a camera punch; claims slam in. One big speaker, with the listener peeking from the edge.
- Titles and covers use the alarm angle in written Chinese: "you could lose / be fooled / miss this". They must stay true to the episode, with no invented claims and nothing that reads as investment advice.
- Keep text out of the Shorts UI zones (bottom 340 px, right 100 px). Covers keep key content inside the centre 4:5 crop. The layout check enforces both.
- Position with `left/top`; inline `transform` is for animation only (the check resets it). Mark decorative text that sits on images or SVG with class `float`.
- BGM and SFX are synthesized in `tools/mix.py` (no third-party audio); BGM ducks about 20 dB under speech.

## Files

- `engine/`: `player.*` (deterministic `renderAt(t)`, cast, kinetic captions, camera, layout check), `components.*`, `outro.js` (follow close-up, no platform avatar), `cover.*` (alarm-style cover).
- `tools/shorts.py`: the pipeline. `align.py`: Whisper word timing with the better of prompt/no-prompt. `brief.py`: episode brief. `render.js`: frame capture via local Chrome (`qa`, `stills`, `sfx`, `video` modes). `mix.py`: BGM, SFX, ducking and limiter.
