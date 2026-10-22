---
name: kurumi-shorts
description: "Turn an existing two-voice podcast episode (audio + SRT + manifest of speaker turns) into a 1080×1920 Shorts/Reels video with the FX战士久留美 cast: kinetic word-by-word captions, speaker-driven characters, punchy animated visuals, 简体/繁體 versions. Use for vertical short videos from Kurumi podcast audio."
metadata:
  version: "0.1.0"
---

# kurumi-shorts

Vertical short videos from finished podcast audio. Cast art comes from the sibling skill `video-shot-demos/assets/fx-kurumi/` (needs both skills installed side by side). The audio is never re-synthesized.

## Project layout

A project folder (outside this repo) holds `project.json`, `scenes/<ep>.js|css` and all outputs:

```json
{"episode_dir": "C:/…/{ep}/out", "media_dir": "C:/…/crops", "tc_config": "s2hk", "langs": ["sc", "tc"]}
```

`episode_dir` must contain `manifest.json` (`title` "系列名 NN｜集名", `turns[].id/speaker/start/end`), `subtitles.srt` ("说话人：文本") and `episode.wav`. Speakers are 久留美 and 萌智子.

## Steps

1. Once per machine: `npm i` in `tools/`; Python needs `opencc`, `faster-whisper` (CUDA), `jieba`, `scipy`, `Pillow`.
2. Read the episode's brief (if the project has one) and `timing/<ep>.words.json` after the first run: beats go on **word starts**, not line starts.
3. Write `scenes/<ep>.js|css` in simplified Chinese (繁體 is converted with OpenCC): one `scene()` per beat of roughly 2–4 s, built from `C.*` parts in `engine/components.js`, plus `cast()` expressions, `keywords()`, and `sound()`/`punch()`/`shake()`/`flash()` on the key words. Tag every scene's source (blue `paper`, amber `ours`, `q`, `next`).
4. `python tools/shorts.py <project> <ep> --preview`: aligns words (cached), builds, runs the layout check, writes `qa/<ep>/sheet.png`. Done when the check prints `clean` and the sheet looks right.
5. `python tools/shorts.py <project> <ep> [--langs tc]`: mix, render, mux, verify. Done when every final line prints `OK`.

## Style rules

- Light theme, permanent top title, no progress bar; visuals change every 1–3 s; numbers count up with a spark and a camera punch; claims slam in.
- Keep text out of the Shorts UI zones (bottom 340 px, right 100 px); the layout check enforces this.
- Position elements with `left/top`; inline `transform` is for animation only (the layout check resets it before measuring).
- BGM and SFX are synthesized in `tools/mix.py` (no third-party audio); BGM ducks about 20 dB under speech; delivery −14 LUFS.

## Files

- `engine/`: deterministic player (`renderAt(t)`), components, layout check.
- `tools/shorts.py`: pipeline. `align.py`: Whisper word timing. `render.js`: frame capture via local Chrome. `mix.py`: BGM/SFX/ducking.
