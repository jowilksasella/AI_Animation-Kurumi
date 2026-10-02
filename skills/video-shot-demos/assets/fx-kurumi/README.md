# 久留美角色素材库

本 fork 的 `video-shot-demos` 默认使用本目录，不再从历史示例复制安安/橘雪莉。

## 文件与姿态数量

**12 个 PNG 文件，不是 14 个独立 PNG**：
- `official/`：四人各一张立绘和一张头像，共 8 张。
- `generated/`：四人各一张 2×2 透明动作表情图，共 4 张，含 16 种姿态。

| 角色 | 动作图 | 左上 / 右上 / 左下 / 右下 |
|---|---|---|
| 福贺久留美 | [kurumi-actions-v1.png](generated/kurumi-actions-v1.png) | 讲解 / 思考 / 惊讶 / 担忧 |
| 小金萌智子 | [mochiko-actions-v1.png](generated/mochiko-actions-v1.png) | 讲解 / 思考 / 惊讶 / 质疑 |
| 山师芽吹 | [mebuki-actions-v1.png](generated/mebuki-actions-v1.png) | 讲解 / 思考 / 兴奋惊讶 / 紧张 |
| 高根やす子 | [yasuko-actions-v1.png](generated/yasuko-actions-v1.png) | 讲解 / 怀疑思考 / 惊讶 / 严肃提醒 |

## 使用

把整个 `assets/fx-kurumi/` 复制到输出目录的 `fx-kurumi/`，保持 PNG 文件名及相对路径。

```html
<link rel="stylesheet" href="fx-kurumi/runtime.css">
<script src="fx-kurumi/cast-data.js"></script>
<script src="fx-kurumi/runtime.js"></script>
```

```js
const actor = FXKurumi.mount({stage:'#stage', character:'kurumi', expression:'explain', side:'left'});
actor.show('从合约出发，<br>理解<b>市场波动</b>。');
actor.setExpression('think');
actor.hide();
```

素材四格通过 CSS 视口选取，**不要把整张四格图当作一名角色直接显示**。`manifest.json` 是角色、路径、表达 ID、尺寸与分格数据的目录；`cast-data.js` 是供 `file://` 离线页面使用的同一份数据。

[打开交互式预览](preview.html)。官方原图与 AI 扩展分目录保存；来源见 `sources.json`，提示词见 `generation-prompts.json`。
