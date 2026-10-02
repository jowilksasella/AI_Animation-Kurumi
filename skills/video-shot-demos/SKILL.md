---
name: video-shot-demos
description: "制作或修改视频口播对应的 HTML 分镜动画。本定制版默认使用 FX战士久留美的四人角色库及动作表情，配合侧向气泡、简体书面语字幕和当前主题进度条；适用于科普、课程、产品解释和录屏演示。"
metadata:
  version: "0.2.0-kurumi"
---

# 视频分镜演示动画 · 久留美定制版

一个镜头对应一个独立 HTML，复用原播放器与时间轴。默认人物为福贺久留美、小金萌智子、山师芽吹、高根やす子；用户明确指定其他人物或视觉规范时，以用户要求为准。

## 默认角色素材（先读）

- 读取 `assets/fx-kurumi/manifest.json`，从这里选择角色、动作 ID 和相对文件路径。
- 使用 `assets/fx-kurumi/` 整套素材：8 张官方立绘/头像 + 4 张四格 AI 动作图，共 **12 个 PNG 文件、16 种生成姿态**。不要称为 14 张或 16 张独立 PNG。
- 多角色与语义选表情见 `references/character-reactions.md`；四格取用示例见 `assets/fx-kurumi/README.md`。
- 原安安/橘雪莉保留在历史示例中，不是本 fork 默认阵容。素材已在仓库内，通常不必重新下载或生成。

## 工作流

1. **理解输入与时间轴。** 使用用户已有口播或音频，按概念与句读拆镜头。已有获认可的 Demo 时沿用其规范。用户只要求素材、暂停或停止时，只完成该范围，不继续导出影片。
2. **复制模板与素材。** 从 `assets/template.html` 起步，把 `assets/fx-kurumi/` 整目录复制到输出目录的 `fx-kurumi/`。定位修改标题、画面层、cue 和时长；虚拟时钟、暂停及镜头调度继续复用原底盘。
3. **按内容编排角色。** 选择主讲/解释/提问/反馈人物，长片混用多位角色和不同动作表情。两人反应围绕同一内容但不重复相同文字。角色可放大、下半身可出画，以脸部和表情可读为准。
4. **实现字幕与主题进度。** 本定制版默认简体中文、书面语、主题色字幕与常驻当前话题/时间进度。布局与同步见 `references/kurumi-production.md`；用户指定不需要时省略相应层。
5. **检查并交付。** 检查改动涉及的角色、箭头、字幕遮挡、图片加载和播放。已有有效证据可以复用；普通复制和保存不增加哈希验证。可观看结果生成后及时交付，不把无关检查当作交付门槛。

## 四格图与角色取用

模板已经加载 `cast-data.js`、`runtime.js` 和 `runtime.css`：

```js
const kurumi = FXKurumi.mount({stage:'#stage', character:'kurumi', expression:'explain', side:'left'});
const mochiko = FXKurumi.mount({stage:'#stage', character:'mochiko', expression:'think', side:'right'});
on(4000, () => kurumi.show('从合约出发，<br>理解<b>市场波动</b>。'));
on(8000, () => { kurumi.setExpression('surprise'); mochiko.show('观察重点是，<br><b>对冲方向</b>。'); });
```

四格顺序：左上、右上、左下、右下。用 runtime 或 CSS 视口选出一格，不直接把整张四格图当成一名人物。动作 ID 从 manifest 查该角色可用值，不假设所有人的第四个动作同名。

## 制作规范

- 固定 1920×1080 舞台，再按窗口缩放；内容、字幕和气泡可读优先。
- 风格以用户确认样板为准，图形和布局随内容变化，避免连续只换文字的空卡片。
- 人物、字幕和新进度条置于 `#cam` 外，避免随镜头运动移出画面。
- 气泡从靠近人物的一侧指向脸部：左侧人物对应向左尾巴，右侧人物对应向右尾巴；同时调整尾巴的高度。
- 浏览器启动黑场不等于成片 intro。导出从虚拟时钟 0 开始；裁切原声引入段时，音频、字幕、章节与进度统一减去实际偏移，不写死某次示例的秒数。
- 本库没有 Q 版进度角色组件。默认采用主题色分段条和标记；仅在用户明确要求时新增该类资源。

## 按需参考

- `references/mechanics.md`：原时钟、镜头、音效技术机制。
- `references/style-cards.md`：视觉隐喻选型，用户已确认风格优先。
- `references/character-reactions.md`：四人阵容、动作语义及气泡规则。
- `references/kurumi-production.md`：字幕、主题进度、裁切与布局。
- `assets/fx-kurumi/preview.html`：本地角色预览，不必为查看素材渲染影片。
- `scripts/shot.js`：需要定位具体中间态时使用原按时刻截图工具。
