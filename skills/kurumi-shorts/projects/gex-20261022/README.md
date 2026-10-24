# GEX 一分钟 · 直版短片项目（1080×1920，16 集 × 简/繁）

`kurumi-shorts` 的第一个完整项目：把 SqueezeMetrics《Gamma Exposure (GEX)》白皮书的 16 集一分钟播客，做成 Shorts/Reels。

## 本目录（项目源文件，进 git）

| 路径 | 内容 |
|---|---|
| `project.json` | 播客输出位置（`episode_dir`）、白皮书截图（`media_dir`）、逐句来源（`source_map`）、繁体配置 `s2hk`、片尾（`outro`）、标题与封面文字（`titles`）、输出目录 `out_dir` |
| `scenes/epNN.js|css` | 每集分镜（简体写，繁体自动转换） |
| `titles.md` | 已定稿的平台标题（危机感书面语，简繁对照；同时用作片头常驻标题） |
| `covers/epNN_简体字幕.png`、`_繁體字幕.png` | 已定稿的封面（警示风格，关键内容在中间 4:5 区域），由 `shorts.py` 自动生成 |
| `covers/sc/`、`covers/tc/`、`covers/README.md`、`tools/covers.py` | 较早的品牌色封面方案（社交账号 session 制作），保留备选 |
| `covers/icon/` | 账号头像（定稿：`gex-icon-coin-sprout-v4-1024.png`） |
| `social/` | 账号名称与简介、发布时间表、各平台文案（`tools/copy_text.py` 生成） |

## 输出（不进 git）

`out_dir` = `C:/Invest/Videos/output/video/gex-shorts-20261022/`：`timing/`（逐词对时缓存）、`build/`、`qa/`、`audio/`、`render/`、`final/`（32 条 mp4 与封面）、`upload-10mb/`、`v1-pilot/`（静态卡片版旧试做）。

上游音频：`C:/Invest/Videos/output/speech/gex-anime-shorts-20261022/epNN/out/`（播客仓库的 `gallery/gex-20261022/` 也有一份）。片尾配音：`C:/Invest/Videos/output/speech/gex-anime-outro-20261022/out/`（只用 turn 001）。

## 命令（在 `skills/kurumi-shorts/` 下执行）

```
python tools/brief.py projects/gex-20261022 ep02            # 精简分镜简报（读这个，不读 manifest）
python tools/shorts.py projects/gex-20261022 ep02 --preview  # 对时 + 版面检查 + 封面 + qa/ep02/sheet.png
python tools/shorts.py projects/gex-20261022 ep02            # 加混音、渲染、合成、核验
```

## 状态（2026-10-24）

- 32 条成片已完成，全部通过检查。用户确认的新标题与封面已完成；成片按用户要求没有全部重出，只有 ep00/01/08/09 的片头标题是新标题，其余 12 集仍是原标题（以后重出任何一集都会自动用新标题）。
- v1 静态卡片版被评 3.5/10（不像 Insta、不吸睛、图表不够动），v2 节奏版获认可。
- 规则：浅色、无进度条、顶部常驻标题；图解标签蓝 = 白皮书、青 = 外部研究、黄 = 我们的比喻/解读；BGM/音效自制；成片 −14 LUFS、峰值 ≤ −1 dBFS。
- 版权：动画角色图、动画音色参考与白皮书截图可放在用户的 GitHub（用户 2026-10-22 同意）；公开发布影片由用户决定。
