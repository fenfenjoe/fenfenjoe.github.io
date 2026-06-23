---
title: CSS
sidebar: 'heading'
---

# CSS

## 1. 引入方式

CSS 有三种引入方式，优先级从高到低：内联样式 > 内部样式 > 外部样式。

### 外部样式表（推荐）

```html
<link rel="stylesheet" href="/styles/main.css" />
```

### 内部样式表

```html
<style>
  body { margin: 0; }
</style>
```

### 内联样式

```html
<p style="color: red; font-size: 16px;">文字</p>
```

---

## 2. 选择器

### 基础选择器

| 选择器 | 语法 | 说明 |
|---|---|---|
| 通配符 | `*` | 匹配所有元素 |
| 标签 | `div` | 匹配指定标签 |
| 类 | `.className` | 匹配指定 class |
| ID | `#idName` | 匹配指定 id（唯一） |
| 属性 | `[attr]` | 匹配含有该属性的元素 |

```css
* { box-sizing: border-box; }
p { line-height: 1.6; }
.btn { cursor: pointer; }
#header { position: fixed; }
[disabled] { opacity: 0.5; }
```

### 属性选择器

| 语法 | 说明 |
|---|---|
| `[attr]` | 含有该属性 |
| `[attr="val"]` | 属性值完全等于 val |
| `[attr^="val"]` | 属性值以 val 开头 |
| `[attr$="val"]` | 属性值以 val 结尾 |
| `[attr*="val"]` | 属性值包含 val |
| `[attr~="val"]` | 属性值空格分隔列表中含 val |

```css
/* 所有外部链接 */
a[href^="https"] { color: green; }

/* 所有 PDF 链接 */
a[href$=".pdf"]::after { content: " (PDF)"; }

/* input 的 type */
input[type="text"] { border: 1px solid #ccc; }
```

### 关系选择器

| 选择器 | 语法 | 说明 |
|---|---|---|
| 后代 | `A B` | A 内所有 B（任意层级） |
| 子代 | `A > B` | A 的直接子元素 B |
| 相邻兄弟 | `A + B` | A 后紧邻的第一个兄弟 B |
| 通用兄弟 | `A ~ B` | A 后所有兄弟 B |

```css
/* nav 下所有 a */
nav a { text-decoration: none; }

/* ul 的直接 li 子元素 */
ul > li { list-style: none; }

/* h2 后紧邻的第一个 p */
h2 + p { font-size: 1.1em; }

/* h2 后所有兄弟 p */
h2 ~ p { color: #555; }
```

### 伪类选择器

| 伪类 | 说明 |
|---|---|
| `:hover` | 鼠标悬停 |
| `:focus` | 获得焦点 |
| `:active` | 激活（点击中） |
| `:visited` | 已访问链接 |
| `:link` | 未访问链接 |
| `:checked` | 复选框/单选框被选中 |
| `:disabled` | 被禁用的控件 |
| `:enabled` | 可用的控件 |
| `:required` | 必填控件 |
| `:first-child` | 父元素中的第一个子元素 |
| `:last-child` | 父元素中的最后一个子元素 |
| `:nth-child(n)` | 父元素中第 n 个子元素 |
| `:nth-of-type(n)` | 同类型元素中第 n 个 |
| `:not(selector)` | 不匹配选择器的元素 |
| `:empty` | 没有子节点的元素 |
| `:root` | 根元素（即 `<html>`） |
| `:is(A, B)` | 匹配 A 或 B（简化群组） |
| `:where(A, B)` | 同 `:is()`，但优先级为 0 |
| `:has(selector)` | 含有指定子元素的父元素 |

```css
/* 交互状态 */
button:hover { background: #0056b3; }
input:focus { outline: 2px solid #007bff; }
a:visited { color: purple; }

/* 结构伪类 */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
tr:nth-child(even) { background: #f5f5f5; }  /* 表格隔行变色 */
li:not(:last-child) { border-bottom: 1px solid #eee; }

/* :is() 简化 */
:is(h1, h2, h3) { font-family: serif; }

/* :has() 父选择器（现代浏览器支持） */
.card:has(img) { padding: 0; }
```

### 伪元素选择器

| 伪元素 | 说明 |
|---|---|
| `::before` | 在元素内容前插入内容 |
| `::after` | 在元素内容后插入内容 |
| `::first-line` | 元素文本的第一行 |
| `::first-letter` | 元素文本的第一个字符 |
| `::selection` | 用户选中的文本 |
| `::placeholder` | input 的占位文字 |

```css
/* 清除浮动（经典用法） */
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

/* 引用装饰 */
blockquote::before {
  content: '"';
  font-size: 3em;
  color: #ccc;
}

/* 首字下沉 */
p::first-letter {
  font-size: 2em;
  float: left;
  line-height: 1;
}

/* 选中文字颜色 */
::selection {
  background: #007bff;
  color: #fff;
}

/* 占位文字样式 */
input::placeholder { color: #aaa; }
```

### 选择器优先级

优先级从高到低：`!important` > 内联样式 > ID > 类/伪类/属性 > 标签/伪元素 > 通配符

| 类型 | 权重值 |
|---|---|
| 内联样式 | 1000 |
| ID 选择器 | 100 |
| 类、伪类、属性选择器 | 10 |
| 标签、伪元素选择器 | 1 |
| 通配符 `*` | 0 |

```css
/* 权重计算示例 */
#nav .item a:hover { }   /* 100 + 10 + 1 + 10 = 121 */
.list > li.active { }    /* 10 + 1 + 10 = 21 */
```

---

## 3. 盒模型

每个元素都是一个矩形盒子，由内到外依次为：**内容（content）→ 内边距（padding）→ 边框（border）→ 外边距（margin）**。

### `box-sizing`

| 值 | 说明 |
|---|---|
| `content-box` | 默认值，`width`/`height` 只包含内容区 |
| `border-box` | `width`/`height` 包含内容 + padding + border（推荐） |

```css
/* 全局推荐设置 */
*, *::before, *::after {
  box-sizing: border-box;
}
```

### `margin`

| 写法 | 说明 |
|---|---|
| `margin: 10px` | 四边相同 |
| `margin: 10px 20px` | 上下 10px，左右 20px |
| `margin: 10px 20px 30px` | 上 10px，左右 20px，下 30px |
| `margin: 10px 20px 30px 40px` | 上右下左（顺时针） |

```css
/* 块级元素水平居中 */
.container {
  width: 800px;
  margin: 0 auto;
}

/* 外边距折叠：相邻块级元素垂直 margin 会合并取最大值 */
/* 避免方法：使用 padding 或触发 BFC */
```

### `padding`

```css
.card {
  padding: 1.5rem 2rem;  /* 上下 1.5rem，左右 2rem */
}
```

### `border`

```css
.box {
  border: 1px solid #ddd;           /* 简写：宽度 样式 颜色 */
  border-radius: 8px;                /* 圆角 */
  border-top: 3px solid #007bff;    /* 单边设置 */
}

/* 圆形（宽高相同时） */
.avatar { border-radius: 50%; }
```

### `outline`

轮廓，不占据布局空间，常用于 focus 状态。

```css
button:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* 去除默认轮廓时必须提供替代方案（无障碍要求） */
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3);
}
```

---

## 4. 显示与定位

### `display`

| 值 | 说明 |
|---|---|
| `block` | 块级元素，独占一行，可设宽高 |
| `inline` | 行内元素，不可设宽高和上下 margin |
| `inline-block` | 行内块，可设宽高，不独占一行 |
| `none` | 隐藏元素，不占据空间 |
| `flex` | 开启 Flexbox 布局 |
| `grid` | 开启 Grid 布局 |
| `contents` | 元素自身不生成盒子，子元素直接参与外层布局 |

```css
.hidden { display: none; }
.visible { display: block; }
nav a { display: inline-block; padding: 0.5rem 1rem; }
```

### `visibility` 和 `opacity`

```css
/* visibility: hidden —— 隐藏但仍占空间 */
.placeholder { visibility: hidden; }

/* opacity: 0 —— 完全透明但仍占空间，仍可触发事件 */
.fade-out { opacity: 0; }
```

### `position`

| 值 | 说明 |
|---|---|
| `static` | 默认，不参与定位流 |
| `relative` | 相对自身原位置偏移，仍占据原空间 |
| `absolute` | 相对最近的非 static 祖先元素定位，脱离文档流 |
| `fixed` | 相对视口定位，不随页面滚动 |
| `sticky` | 滚动到阈值前表现为 relative，之后表现为 fixed |

```css
/* 绝对定位居中（经典技巧） */
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 固定导航栏 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

/* 粘性表头 */
th {
  position: sticky;
  top: 0;
  background: #fff;
}

/* 父相子绝（常用于角标、徽章） */
.parent { position: relative; }
.badge {
  position: absolute;
  top: -8px;
  right: -8px;
}
```

### `z-index`

控制元素层叠顺序，仅对非 `static` 定位元素有效。

```css
.dropdown { z-index: 100; }
.modal    { z-index: 200; }
.toast    { z-index: 300; }
```

### `overflow`

| 值 | 说明 |
|---|---|
| `visible` | 默认，内容溢出不裁剪 |
| `hidden` | 裁剪溢出内容 |
| `scroll` | 始终显示滚动条 |
| `auto` | 内容溢出时才显示滚动条 |
| `clip` | 裁剪，且不触发 BFC |

```css
/* 单行文字溢出省略号 */
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* 多行文字溢出省略号 */
.clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## 5. Flexbox 布局

设置 `display: flex` 后，子元素自动成为 flex item。

### 容器属性

| 属性 | 可选值 | 说明 |
|---|---|---|
| `flex-direction` | `row`（默认）、`row-reverse`、`column`、`column-reverse` | 主轴方向 |
| `flex-wrap` | `nowrap`（默认）、`wrap`、`wrap-reverse` | 是否换行 |
| `flex-flow` | `<direction> <wrap>` | 上两者简写 |
| `justify-content` | `flex-start`、`flex-end`、`center`、`space-between`、`space-around`、`space-evenly` | 主轴对齐 |
| `align-items` | `stretch`（默认）、`flex-start`、`flex-end`、`center`、`baseline` | 交叉轴对齐（单行） |
| `align-content` | 同 `justify-content` | 交叉轴对齐（多行） |
| `gap` | `<row-gap> <col-gap>` | 间距 |

```css
/* 水平垂直居中 */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 导航栏：左 logo 右菜单 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

/* 卡片列表自动换行 */
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
```

### 子项属性

| 属性 | 说明 |
|---|---|
| `flex-grow` | 剩余空间的分配比例（默认 0，不放大） |
| `flex-shrink` | 空间不足时的收缩比例（默认 1） |
| `flex-basis` | 在分配空间前的初始大小（默认 `auto`） |
| `flex` | 上三者简写，推荐用 `flex: 1` 等简写形式 |
| `align-self` | 覆盖容器 `align-items`，单独设置该子项的交叉轴对齐 |
| `order` | 排列顺序（默认 0，数值越小越靠前） |

```css
/* 侧边栏固定宽度，内容区自动填满 */
.layout { display: flex; }
.sidebar { flex: 0 0 240px; }   /* 不放大不收缩，固定 240px */
.content { flex: 1; }           /* 占满剩余空间 */

/* flex 简写含义 */
flex: 1;          /* flex: 1 1 0%  —— 等比分配 */
flex: auto;       /* flex: 1 1 auto */
flex: none;       /* flex: 0 0 auto —— 固定尺寸 */
flex: 0 0 200px;  /* 严格固定 200px */
```

---

## 6. Grid 布局

设置 `display: grid` 后，通过行列定义二维布局。

### 容器属性

| 属性 | 说明 |
|---|---|
| `grid-template-columns` | 定义列的数量和宽度 |
| `grid-template-rows` | 定义行的数量和高度 |
| `grid-template-areas` | 用命名区域定义布局 |
| `gap` / `row-gap` / `column-gap` | 间距 |
| `justify-items` | 单元格内水平对齐 |
| `align-items` | 单元格内垂直对齐 |
| `justify-content` | 整个网格在容器中的水平对齐 |
| `align-content` | 整个网格在容器中的垂直对齐 |

```css
/* 三列等宽 */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* 响应式卡片（最小 200px，自动填充列数） */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

/* 经典页面布局（命名区域） */
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: 60px 1fr 50px;
  min-height: 100vh;
}
.page-header  { grid-area: header; }
.page-sidebar { grid-area: sidebar; }
.page-content { grid-area: content; }
.page-footer  { grid-area: footer; }
```

### 子项属性

| 属性 | 说明 |
|---|---|
| `grid-column` | 列的起止线（如 `1 / 3` 或 `1 / span 2`） |
| `grid-row` | 行的起止线 |
| `grid-area` | 区域名，或 `row-start / col-start / row-end / col-end` |
| `justify-self` | 单元格内水平对齐（覆盖容器设置） |
| `align-self` | 单元格内垂直对齐（覆盖容器设置） |

```css
/* 横跨 2 列 */
.banner { grid-column: 1 / span 2; }

/* 横跨所有列 */
.full-width { grid-column: 1 / -1; }

/* 特定起止位置 */
.hero {
  grid-column: 2 / 4;
  grid-row: 1 / 3;
}
```

---

## 7. 文字与字体

### 字体属性

| 属性 | 常用值 | 说明 |
|---|---|---|
| `font-family` | `sans-serif`、`serif`、`monospace` 等 | 字体族 |
| `font-size` | `16px`、`1rem`、`1.2em` | 字号 |
| `font-weight` | `400`（normal）、`700`（bold）、`100`~`900` | 字重 |
| `font-style` | `normal`、`italic`、`oblique` | 字体样式 |
| `line-height` | `1.5`、`24px`、`150%` | 行高（推荐用无单位数值） |
| `letter-spacing` | `0.05em`、`2px` | 字符间距 |
| `word-spacing` | `0.2em` | 单词间距 |

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

code {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9em;
}
```

### 引入自定义字体

```css
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/myfont.woff2') format('woff2'),
       url('/fonts/myfont.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;  /* 加载期间先显示系统字体 */
}

body { font-family: 'MyFont', sans-serif; }
```

### 文本属性

| 属性 | 常用值 | 说明 |
|---|---|---|
| `color` | `#333`、`rgb()`、`hsl()` | 文字颜色 |
| `text-align` | `left`、`center`、`right`、`justify` | 水平对齐 |
| `text-decoration` | `none`、`underline`、`line-through` | 文本装饰线 |
| `text-transform` | `none`、`uppercase`、`lowercase`、`capitalize` | 大小写转换 |
| `text-indent` | `2em` | 首行缩进 |
| `white-space` | `normal`、`nowrap`、`pre`、`pre-wrap` | 空白处理方式 |
| `word-break` | `normal`、`break-all`、`keep-all` | 单词断行规则 |
| `text-shadow` | `x y blur color` | 文字阴影 |

```css
/* 链接下划线 */
a { text-decoration: none; }
a:hover { text-decoration: underline; }

/* 文字阴影 */
h1 { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); }

/* 中文首行缩进 */
p { text-indent: 2em; }

/* 禁止换行 */
.tag { white-space: nowrap; }
```

---

## 8. 颜色与背景

### 颜色表示方式

```css
color: #ff0000;                   /* 十六进制 */
color: #f00;                      /* 十六进制简写 */
color: rgb(255, 0, 0);            /* RGB */
color: rgba(255, 0, 0, 0.5);      /* RGBA（含透明度） */
color: hsl(0, 100%, 50%);         /* HSL（色相、饱和度、亮度） */
color: hsla(0, 100%, 50%, 0.5);   /* HSLA */
color: oklch(0.6 0.2 30);         /* OKLCH（现代，感知均匀） */
color: transparent;                /* 完全透明 */
color: currentColor;               /* 继承当前文字颜色 */
```

### 背景属性

| 属性 | 说明 |
|---|---|
| `background-color` | 背景色 |
| `background-image` | 背景图（`url()`、渐变） |
| `background-size` | `cover`、`contain`、`100% 100%`、`200px` |
| `background-position` | `center`、`top left`、`50% 50%` |
| `background-repeat` | `no-repeat`、`repeat`、`repeat-x`、`repeat-y` |
| `background-attachment` | `scroll`（默认）、`fixed`（视差效果）、`local` |
| `background-clip` | `border-box`、`padding-box`、`content-box`、`text` |
| `background` | 以上属性的简写 |

```css
/* 背景图覆盖 */
.hero {
  background-image: url('/images/hero.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 线性渐变 */
.gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* 径向渐变 */
.radial {
  background: radial-gradient(circle at center, #fff 0%, #ccc 100%);
}

/* 多背景叠加 */
.multi-bg {
  background:
    url('/icons/pattern.svg') top right no-repeat,
    linear-gradient(to bottom, #f8f9fa, #e9ecef);
}

/* 文字填充渐变 */
.gradient-text {
  background: linear-gradient(90deg, #f093fb, #f5576c);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

---

## 9. 变换、过渡与动画

### `transform` 变换

| 函数 | 说明 |
|---|---|
| `translate(x, y)` | 位移 |
| `scale(x, y)` | 缩放 |
| `rotate(deg)` | 旋转 |
| `skew(x, y)` | 倾斜 |
| `translateX/Y/Z` | 单轴位移 |
| `scaleX/Y` | 单轴缩放 |
| `rotateX/Y/Z` | 3D 旋转 |
| `perspective(n)` | 透视距离 |

```css
/* 悬停浮起效果 */
.card:hover {
  transform: translateY(-4px) scale(1.02);
}

/* 3D 翻转卡片 */
.flip-card {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}
.flip-card:hover {
  transform: rotateY(180deg);
}

/* 修改变换原点 */
.scale-from-left {
  transform-origin: left center;
  transform: scaleX(0);
}
```

### `transition` 过渡

```css
/* 语法：property duration timing-function delay */
.btn {
  background: #007bff;
  transition: background 0.3s ease, transform 0.2s ease;
}
.btn:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

/* 常用缓动函数 */
transition-timing-function: ease;         /* 默认，先快后慢 */
transition-timing-function: ease-in;      /* 慢进快出 */
transition-timing-function: ease-out;     /* 快进慢出 */
transition-timing-function: ease-in-out;  /* 慢进慢出 */
transition-timing-function: linear;       /* 匀速 */
transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); /* 弹簧效果 */
```

### `animation` 动画

```css
/* 定义关键帧 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 应用动画 */
.fade-in {
  animation: fadeIn 0.5s ease-out both;
}

/* loading 转圈 */
.loading {
  animation: spin 1s linear infinite;
}

/* 动画属性说明 */
.box {
  animation-name: fadeIn;           /* 关键帧名称 */
  animation-duration: 0.5s;         /* 持续时长 */
  animation-timing-function: ease;  /* 缓动函数 */
  animation-delay: 0.1s;            /* 延迟 */
  animation-iteration-count: 1;     /* 次数（infinite 为无限） */
  animation-direction: normal;      /* 方向（alternate 来回） */
  animation-fill-mode: both;        /* 动画前后状态（forwards/backwards/both） */
  animation-play-state: running;    /* 运行状态（paused 暂停） */
}
```

---

## 10. 响应式设计

### 媒体查询

```css
/* 移动优先写法（推荐）：默认为移动端样式，用 min-width 逐步增强 */
.container { padding: 1rem; }

@media (min-width: 768px) {
  .container { padding: 2rem; }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* 常用断点（参考 Tailwind CSS） */
/* sm: 640px | md: 768px | lg: 1024px | xl: 1280px | 2xl: 1536px */

/* 其他媒体特征 */
@media (prefers-color-scheme: dark) {
  body { background: #121212; color: #eee; }
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}

@media print {
  .no-print { display: none; }
}
```

### 响应式单位

| 单位 | 说明 |
|---|---|
| `px` | 固定像素 |
| `em` | 相对当前元素 `font-size`（会继承叠加） |
| `rem` | 相对根元素 `font-size`（推荐用于间距和字号） |
| `%` | 相对父元素的百分比 |
| `vw` | 视口宽度的 1% |
| `vh` | 视口高度的 1% |
| `vmin` / `vmax` | 视口宽高中较小/较大值的 1% |
| `dvh` | 动态视口高度（移动端地址栏变化时更准确） |
| `ch` | 字符 `0` 的宽度，适合控制文本行宽 |

```css
/* 流体字号（响应式缩放） */
h1 { font-size: clamp(1.5rem, 5vw, 3rem); }

/* 推荐内容行宽控制 */
p { max-width: 70ch; }

/* 全屏高度（兼容移动端地址栏） */
.hero {
  min-height: 100vh;
  min-height: 100dvh;
}
```

---

## 11. CSS 变量（自定义属性）

```css
/* 定义变量（通常在 :root 上全局定义） */
:root {
  --color-primary: #007bff;
  --color-text: #333;
  --color-bg: #fff;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --radius: 8px;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 使用变量 */
.btn {
  background: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius);
}

/* 提供回退值 */
.box { color: var(--color-text, #333); }

/* 暗色主题切换 */
[data-theme="dark"] {
  --color-primary: #4dabf7;
  --color-text: #eee;
  --color-bg: #121212;
}

/* 组件级别覆盖 */
.card { --radius: 12px; }
```

```javascript
// JS 中读取 CSS 变量
const primary = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary').trim();

// JS 中修改 CSS 变量
document.documentElement.style.setProperty('--color-primary', '#e74c3c');
```

---

## 12. 常用工具属性

### `cursor`

```css
.btn         { cursor: pointer; }
.disabled    { cursor: not-allowed; }
.draggable   { cursor: grab; }
.draggable:active { cursor: grabbing; }
.loading     { cursor: wait; }
```

### `pointer-events`

```css
/* 完全禁用鼠标事件（包括 hover、click） */
.overlay { pointer-events: none; }

/* 恢复子元素的事件响应 */
.overlay .clickable { pointer-events: auto; }
```

### `user-select`

```css
/* 禁止用户选中文字 */
.no-select { user-select: none; }

/* 全选（双击即可选中全部） */
.code-block { user-select: all; }
```

### `aspect-ratio`

```css
/* 保持宽高比 */
.video-wrapper { aspect-ratio: 16 / 9; }
.avatar        { aspect-ratio: 1; width: 48px; }
```

### `object-fit`（用于 `<img>`、`<video>`）

| 值 | 说明 |
|---|---|
| `fill` | 默认，拉伸填满 |
| `contain` | 保持比例，完整显示，可能留白 |
| `cover` | 保持比例，裁剪填满（最常用） |
| `none` | 不缩放 |

```css
/* 图片容器固定尺寸，不变形 */
.thumbnail {
  width: 200px;
  height: 150px;
  object-fit: cover;
  object-position: center top;
}
```

### `scroll-behavior` 和 `scroll-margin`

```css
/* 平滑滚动 */
html { scroll-behavior: smooth; }

/* 锚点偏移（避免被固定导航遮挡） */
[id] { scroll-margin-top: 80px; }
```

### `box-shadow`

```css
/* 语法：offset-x offset-y blur-radius spread-radius color */
.card { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }

/* 内阴影 */
.input:focus { box-shadow: inset 0 0 0 2px #007bff; }

/* 多层阴影 */
.elevated {
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 4px 12px rgba(0, 0, 0, 0.08);
}
```

### `filter`

```css
.blur      { filter: blur(4px); }
.grayscale { filter: grayscale(100%); }
.dim       { filter: brightness(0.8); }

/* 组合多个滤镜 */
.vintage { filter: sepia(0.5) contrast(1.1) brightness(1.05); }

/* 阴影（支持透明 PNG，box-shadow 不支持） */
.icon { filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3)); }
```

---

## 13. BFC（块级格式化上下文）

BFC 是一个独立的渲染区域，内部元素不影响外部布局。

**触发 BFC 的方式：**

```css
overflow: hidden;     /* 或 auto、scroll */
display: flow-root;   /* 专门用于触发 BFC（推荐，语义明确） */
display: flex;
display: grid;
position: absolute;
position: fixed;
float: left;          /* 或 right */
```

**BFC 的主要用途：**

```css
/* 1. 清除浮动（子元素浮动导致父元素高度塌陷） */
.parent { display: flow-root; }

/* 2. 防止外边距折叠 */
.wrapper { display: flow-root; }

/* 3. 阻止元素被浮动元素覆盖 */
.content { overflow: hidden; }
```

---

## 14. 性能优化建议

* **优先使用 `transform` 和 `opacity` 做动画**，这两个属性可由 GPU 加速，不触发重排（reflow）。  
* **减少重排（reflow）**：修改宽高、位置等会触发重排；改变颜色、透明度只触发重绘（repaint）。  
* **使用 `will-change` 提示浏览器提前优化**，但不要滥用：

```css
/* 提前告知浏览器该元素即将发生变换 */
.animated { will-change: transform; }
/* 动画结束后应通过 JS 移除，避免长期占用内存 */
```

* **避免深层嵌套选择器**（超过 3 层），增加样式复杂度且难以维护。  
* **使用 CSS 变量统一管理设计 token**，减少硬编码颜色、间距。  
* **合理使用 `contain` 属性**限制元素的渲染影响范围：

```css
.card { contain: layout style; }
```
