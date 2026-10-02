# 久留美四人阵容与角色反应

本 fork 的默认素材路径为 `assets/fx-kurumi/`。先读取 `manifest.json`，文件数为 12，生成姿态数为 16；角色路径和动作 ID 以这个目录为准。

## 阵容

| ID | 人物 | 适合的反应/分工 | 可用生成动作 |
|---|---|---|---|
| `kurumi` | 福贺久留美 | 主讲、好奇、波动反应 | explain / think / surprise / concern |
| `mochiko` | 小金萌智子 | 冷静解释、公式、模型假设 | explain / think / surprise / question |
| `mebuki` | 山师芽吹 | 新手疑问、兴奋、理解概念 | explain / think / surprise / nervous |
| `yasuko` | 高根やす子 | 质疑、风险反馈、纠正误解 | explain / think / surprise / caution |

这些是本定制视频中的编排建议，不是对角色的额外官方设定。默认以四人搭配，长片至少混用两位；适合时让四人分散出场，不把全片变成同一张久留美。单个画面一般一人，重点页可两人。

## 图像与四格

- `official/<id>-main.png`：官方立绘；`official/<id>-face.png`：官方头像。
- `generated/<id>-actions-v1.png`：2×2 动作表情素材图。左上讲解，右上思考，左下惊讶，右下为该人物的担忧/质疑/提醒。
- 网格由 CSS `background-size:200% 200%` 配合 `background-position` 选取。大小使用 manifest 中该图尺寸；萌智子的图与其他三张尺寸不完全相同，不写死分格像素。
- `FXKurumi.mount()` 会从表中选择对应四格；`setExpression()` 只换动作，不换发型、服装或色彩。
- 把整个素材文件夹复制进项目，保持 PNG 相对路径。旧安安/橘雪莉仅作为上游示例，默认不回退到旧角色。

## 排布与节拍

先以 480px 素材视口起步，再按实际可见人物大小调整；可允许下半身出画，脸部和表情不被字幕/内容遮挡。角色放在 `#cam` 外，按当前镜头内容选表情；长镜头可在中段和结尾变换反应，不必每几秒机械切图。

双人接话时，让另一位先提问或反应，主讲再接句；两句意思互补，避免两人显示同一句。气泡默认 260px 宽、23px 字号，纸色底、墨绿正文，强调色按人物区分。

箭头在人物最近的一侧，水平指向脸部：人物在左则气泡左侧尾巴朝左，人物在右则气泡右侧尾巴朝右。气泡中心尽量与脸部高度相符。runtime 随视口高度调整气泡 top，可按具体姿态微调，不能只沿用向下尾巴。

素材来源与生成提示词在 `assets/fx-kurumi/sources.json`、`generation-prompts.json`；官方原图与生成图分目录保存，不称 AI 扩展为官方图。
