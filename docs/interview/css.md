---
title: css
sidebarDepth: 2
---

# CSS 面试题

## ⭐CSS 是什么

CSS（Cascading Style Sheets，层叠样式表）是用于描述 HTML 文档视觉呈现的语言。

**三个核心概念：**
- **层叠（Cascade）**：多条规则作用于同一元素时，按优先级决定最终样式
- **选择器（Selector）**：用于匹配目标 HTML 元素
- **盒模型（Box Model）**：每个元素都是一个矩形盒子，由 content、padding、border、margin 组成

---

## ⭐CSS 选择器优先级

优先级从高到低：

| 优先级 | 类型 | 示例 |
|---|---|---|
| 最高 | `!important` | `color: red !important` |
| 1000 | 内联样式 | `style="color:red"` |
| 100 | ID 选择器 | `#app` |
| 10 | 类、属性、伪类 | `.box`、`[type]`、`:hover` |
| 1 | 标签、伪元素 | `div`、`::before` |
| 0 | 通配符、子代、兄弟 | `*`、`>`、`+` |

**计算规则**：选择器各部分的权重累加后比较，相同权重则后定义的生效。

```css
/* 权重: 0-1-1-0 = 110 */
#nav .menu { color: red; }

/* 权重: 0-0-2-1 = 21 */
div.box.active { color: blue; }
```

---

## ⭐什么是盒模型？标准盒模型和 IE 盒模型的区别

**盒模型**：每个 HTML 元素都被看作一个矩形盒子，由四个区域组成：

```
┌─────────────────────────────┐
│           margin            │
│  ┌───────────────────────┐  │
│  │        border         │  │
│  │  ┌─────────────────┐  │  │
│  │  │     padding     │  │  │
│  │  │  ┌───────────┐  │  │  │
│  │  │  │  content  │  │  │  │
│  │  │  └───────────┘  │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

| 特性 | 标准盒模型（content-box） | IE 盒模型（border-box） |
|---|---|---|
| `width/height` 包含 | 仅 content | content + padding + border |
| CSS 设置 | `box-sizing: content-box`（默认）| `box-sizing: border-box` |
| 实际占用宽度 | width + padding + border + margin | width + margin |
| 常用场景 | 默认 | 更直观，推荐 UI 开发使用 |

```css
/* 全局推荐设置 */
*, *::before, *::after {
  box-sizing: border-box;
}
```

---

## ⭐什么是响应式布局？如何实现？

**响应式布局**：页面能根据设备屏幕尺寸自动调整布局，提供最佳浏览体验。

**实现方式：**

### 1. 媒体查询（Media Query）
```css
/* 移动优先 */
.container { width: 100%; }

@media (min-width: 768px) {
  .container { width: 750px; }
}

@media (min-width: 1200px) {
  .container { width: 1170px; }
}
```

### 2. 弹性布局（Flexbox）
```css
.flex-container {
  display: flex;
  flex-wrap: wrap;   /* 允许换行 */
  gap: 16px;
}

.flex-item {
  flex: 1 1 200px;   /* 最小 200px，可伸缩 */
}
```

### 3. 网格布局（Grid）
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
```

### 4. 相对单位
```css
/* rem: 相对根元素字体大小 */
.title { font-size: 1.5rem; }

/* vw/vh: 相对视口宽高 */
.hero { height: 100vh; }

/* %: 相对父元素 */
.sidebar { width: 30%; }
```

### 5. viewport meta 标签
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## ⭐position 属性的值有哪些？分别的定位原点？

| 值 | 定位方式 | 定位原点 | 脱离文档流 |
|---|---|---|---|
| `static` | 默认，无定位 | 无 | 否 |
| `relative` | 相对定位 | **自身原来的位置** | 否（占位保留）|
| `absolute` | 绝对定位 | **最近的非 static 祖先元素** | 是 |
| `fixed` | 固定定位 | **视口（viewport）** | 是 |
| `sticky` | 粘性定位 | 滚动到阈值前同 relative，之后同 fixed | 否 |

```css
/* 常用：子绝父相 */
.parent {
  position: relative;  /* 作为绝对定位的参照 */
}

.child {
  position: absolute;
  top: 0;
  right: 0;
}

/* 吸顶效果 */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
}
```

---

## ⭐Flexbox 常用属性

**容器属性（父元素）：**

```css
.container {
  display: flex;
  flex-direction: row;          /* 主轴方向：row | column | row-reverse | column-reverse */
  justify-content: center;      /* 主轴对齐：flex-start | flex-end | center | space-between | space-around */
  align-items: center;          /* 交叉轴对齐：flex-start | flex-end | center | stretch | baseline */
  flex-wrap: wrap;              /* 换行：nowrap | wrap | wrap-reverse */
  gap: 16px;                    /* 间距 */
}
```

**子元素属性：**

```css
.item {
  flex: 1;                      /* 简写：flex-grow flex-shrink flex-basis */
  flex-grow: 1;                 /* 放大比例，默认 0 */
  flex-shrink: 1;               /* 缩小比例，默认 1 */
  flex-basis: 200px;            /* 初始尺寸，默认 auto */
  align-self: flex-end;         /* 覆盖容器的 align-items */
  order: 2;                     /* 排列顺序，默认 0 */
}
```

---

## ⭐CSS Grid 布局

```css
.grid {
  display: grid;

  /* 定义列：3列等宽 */
  grid-template-columns: 1fr 1fr 1fr;
  /* 或 */
  grid-template-columns: repeat(3, 1fr);
  /* 自适应列数 */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  /* 定义行 */
  grid-template-rows: 100px auto;

  gap: 16px;                    /* 行列间距 */
  row-gap: 16px;
  column-gap: 16px;
}

/* 子元素跨列/行 */
.item {
  grid-column: 1 / 3;          /* 从第1列线到第3列线，跨2列 */
  grid-row: 1 / 2;
}
```

---

## ⭐什么是 BFC？触发条件和作用？

**BFC（Block Formatting Context，块级格式化上下文）**：独立的渲染区域，内部元素的布局不影响外部。

**触发 BFC 的条件：**
- `overflow` 不为 `visible`（`hidden`、`auto`、`scroll`）
- `display: flex` / `grid` / `inline-block` / `table-cell`
- `position: absolute` / `fixed`
- `float` 不为 `none`

**BFC 的作用：**

1. **清除浮动**（解决父元素高度塌陷）
```css
.parent {
  overflow: hidden;  /* 触发 BFC */
}
```

2. **防止 margin 合并**
```css
/* 两个 BFC 容器中的 margin 不会合并 */
.box1 { overflow: hidden; margin-bottom: 20px; }
.box2 { overflow: hidden; margin-top: 20px; }
/* 间距 = 40px，而非 20px */
```

3. **防止文字环绕浮动元素**

---

## ⭐CSS 实现水平垂直居中

```css
/* 方法1：Flexbox（推荐）*/
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 方法2：Grid */
.parent {
  display: grid;
  place-items: center;
}

/* 方法3：绝对定位 + transform */
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 方法4：绝对定位 + margin auto（需要知道子元素尺寸）*/
.child {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  margin: auto;
  width: 200px;
  height: 200px;
}
```

---

## ⭐CSS 动画：transition 和 animation 的区别

| 特性 | transition | animation |
|---|---|---|
| 触发方式 | 需要事件触发（如 hover）| 可自动播放 |
| 关键帧 | 只有起始和结束两帧 | 可定义任意关键帧（@keyframes）|
| 循环 | 不支持 | 支持（`animation-iteration-count`）|
| 暂停 | 不支持 | 支持（`animation-play-state: paused`）|
| 适用场景 | 简单状态切换 | 复杂连续动画 |

```css
/* transition */
.btn {
  transition: background-color 0.3s ease, transform 0.2s;
}
.btn:hover {
  background-color: blue;
  transform: scale(1.05);
}

/* animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.box {
  animation: fadeIn 0.5s ease forwards;
  /* animation: 名称 时长 缓动 延迟 次数 方向 填充模式 */
}
```

---

## ⭐CSS 预处理器（Sass/Less）有哪些优势？

| 功能 | 说明 | 示例 |
|---|---|---|
| 变量 | 统一管理颜色、尺寸 | `$primary: #409eff;` |
| 嵌套 | 减少重复选择器 | `.nav { .item { } }` |
| Mixin | 可复用代码块 | `@mixin flex-center { ... }` |
| 函数 | 内置颜色/数学函数 | `darken($color, 10%)` |
| 继承 | `@extend` 共享样式 | `@extend .base-btn;` |
| 模块化 | `@import` / `@use` 拆分文件 | 多文件组织 |

---

## ⭐CSS 性能优化

1. **减少重排（Reflow）和重绘（Repaint）**
   - 修改 `transform`/`opacity` 只触发合成，不触发重排
   - 批量修改样式：使用 class 切换而非逐个修改 style
   - 避免频繁读取布局属性（`offsetWidth`、`getBoundingClientRect`）

2. **选择器优化**
   - 避免深层嵌套（超过3层）
   - 避免通配符 `*`
   - 使用 class 而非标签选择器

3. **资源优化**
   - CSS 放 `<head>` 中（避免 FOUC）
   - 压缩 CSS 文件
   - 使用 CSS Sprites 合并小图标（或改用 SVG/字体图标）
   - 关键 CSS 内联，非关键 CSS 异步加载
