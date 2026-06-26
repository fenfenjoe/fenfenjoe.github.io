---
title: html
sidebarDepth: 2
---

# HTML 面试题

## ⭐有哪些常用标签

**文档结构标签：**

| 标签 | 说明 |
|---|---|
| `<html>` | 根元素 |
| `<head>` | 文档头部，包含元信息 |
| `<body>` | 文档主体 |
| `<meta>` | 元信息（字符集、视口、SEO）|
| `<title>` | 页面标题 |
| `<link>` | 外部资源链接（CSS 等）|
| `<script>` | JavaScript |
| `<style>` | 内联样式 |

**语义化结构标签（HTML5）：**

| 标签 | 说明 |
|---|---|
| `<header>` | 页眉 / 章节头部 |
| `<nav>` | 导航区域 |
| `<main>` | 页面主内容（唯一）|
| `<section>` | 独立内容区块 |
| `<article>` | 独立完整文章 |
| `<aside>` | 侧边栏 / 附属内容 |
| `<footer>` | 页脚 |

**文本内容标签：**

| 标签 | 说明 |
|---|---|
| `<h1>`~`<h6>` | 标题（h1 最重要）|
| `<p>` | 段落 |
| `<span>` | 内联容器（无语义）|
| `<div>` | 块级容器（无语义）|
| `<strong>` | 重要文本（粗体，有语义）|
| `<em>` | 强调文本（斜体，有语义）|
| `<br>` | 换行 |
| `<hr>` | 水平分隔线 |
| `<pre>` | 预格式化文本 |
| `<code>` | 代码片段 |
| `<blockquote>` | 块级引用 |

**列表标签：**

| 标签 | 说明 |
|---|---|
| `<ul>` | 无序列表 |
| `<ol>` | 有序列表 |
| `<li>` | 列表项 |
| `<dl>` | 定义列表 |
| `<dt>` | 定义术语 |
| `<dd>` | 术语描述 |

**表单标签：**

| 标签 | 说明 |
|---|---|
| `<form>` | 表单容器 |
| `<input>` | 输入框（多种 type）|
| `<textarea>` | 多行文本 |
| `<select>` / `<option>` | 下拉选择 |
| `<button>` | 按钮 |
| `<label>` | 表单标签（提升可访问性）|
| `<fieldset>` / `<legend>` | 表单分组 |

**媒体标签：**

| 标签 | 说明 |
|---|---|
| `<img>` | 图片 |
| `<video>` | 视频 |
| `<audio>` | 音频 |
| `<canvas>` | 画布（JS 绘图）|
| `<svg>` | 矢量图形 |
| `<iframe>` | 内嵌页面 |

**链接和导航：**

| 标签 | 说明 |
|---|---|
| `<a>` | 超链接 |

---

## ⭐什么是语义化 HTML？为什么重要？

**语义化**：使用具有明确含义的 HTML 标签来描述内容的结构和意义，而不是仅用 `<div>` 和 `<span>` 堆砌。

**重要性：**

1. **SEO 优化**：搜索引擎更好地理解页面结构，提高排名
2. **可访问性**：屏幕阅读器等辅助技术依赖语义标签理解内容
3. **可维护性**：代码更易读，团队协作效率更高
4. **浏览器兼容**：浏览器对语义标签有内置样式优化

```html
<!-- 非语义化（不推荐）-->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="content">
  <div class="post">...</div>
</div>
<div class="footer">...</div>

<!-- 语义化（推荐）-->
<header>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
</main>
<footer>...</footer>
```

---

## ⭐HTML5 新增了哪些特性？

| 分类 | 新特性 |
|---|---|
| 语义化标签 | `<header>` `<footer>` `<nav>` `<main>` `<section>` `<article>` `<aside>` `<figure>` |
| 表单增强 | 新 input type：`email`、`number`、`date`、`range`、`search`；`placeholder`、`required`、`autofocus` 属性 |
| 多媒体 | `<video>`、`<audio>`，原生播放无需 Flash |
| 图形 | `<canvas>`（位图绘制）、`<svg>`（矢量图形）|
| 存储 | `localStorage`、`sessionStorage`（替代 Cookie 存储）|
| 通信 | `WebSocket`（全双工通信）、`Server-Sent Events` |
| 离线 | `Service Worker`、`Cache API`、`Application Cache`（已废弃）|
| API | `Geolocation`（地理位置）、`Drag & Drop`、`History API`、`Web Workers` |
| 结构 | `<!DOCTYPE html>` 简化、字符集 `<meta charset="UTF-8">` 简化 |

---

## ⭐src 和 href 的区别

| 属性 | 用途 | 加载行为 | 常用标签 |
|---|---|---|---|
| `src` | 引入外部资源，**替换**当前元素内容 | 阻塞解析（script），或并行（img）| `<img>`、`<script>`、`<iframe>` |
| `href` | 建立当前文档与外部资源的**链接关系** | 不阻塞解析（CSS 并行加载）| `<a>`、`<link>` |

```html
<!-- src：资源内容嵌入当前位置 -->
<img src="logo.png">
<script src="app.js"></script>  <!-- 阻塞 HTML 解析 -->

<!-- href：建立链接关系 -->
<link href="style.css" rel="stylesheet">  <!-- 并行加载，但阻塞渲染 -->
<a href="https://example.com">链接</a>
```

---

## ⭐script 标签中 defer 和 async 的区别

| 特性 | 普通 `<script>` | `async` | `defer` |
|---|---|---|---|
| 下载时机 | 遇到时立即下载 | 并行下载 | 并行下载 |
| 执行时机 | 下载后立即执行（阻塞 HTML 解析）| 下载完立即执行（可能打断解析）| HTML 解析完毕后执行 |
| 执行顺序 | 按顺序 | 不保证顺序 | 保证顺序 |
| 适用场景 | 依赖 DOM 的同步脚本 | 独立脚本（如统计）| 依赖 DOM、有顺序依赖的脚本 |

```html
<!-- 阻塞解析 -->
<script src="app.js"></script>

<!-- 并行下载，完成即执行（顺序不保证）-->
<script src="analytics.js" async></script>

<!-- 并行下载，DOM 解析完后执行（顺序保证）-->
<script src="main.js" defer></script>
```

---

## ⭐link 和 @import 的区别

| 特性 | `<link>` | `@import` |
|---|---|---|
| 归属 | HTML 标签 | CSS 语法 |
| 加载时机 | 页面加载时**并行**加载 | 页面加载完后再加载 CSS |
| 兼容性 | 无兼容性问题 | 低版本 IE 不支持 |
| JS 操作 | 可通过 DOM 操作 | 不可通过 JS 操作 |
| 权重 | 无差异 | 无差异 |

```html
<!-- 推荐：并行加载 -->
<link rel="stylesheet" href="style.css">
```

```css
/* 不推荐：串行加载，影响性能 */
@import url("style.css");
```

---

## ⭐行内元素和块级元素的区别

| 特性 | 块级元素（block）| 行内元素（inline）|
|---|---|---|
| 占位 | 独占一行 | 与其他元素共一行 |
| 宽高 | 可设置 width/height | 无法设置（由内容决定）|
| margin/padding | 上下左右均有效 | 上下 margin 无效，padding 上下不影响布局 |
| 常见标签 | `div` `p` `h1-h6` `ul` `table` | `span` `a` `img` `input` `strong` `em` |

> `inline-block`：像行内元素一样排列，但可以设置宽高（如 `<img>`、`<input>`）。

---

## ⭐什么是 DOCTYPE？有什么作用？

**DOCTYPE（Document Type Declaration）** 是文档类型声明，告诉浏览器用哪种 HTML 规范来解析页面。

```html
<!-- HTML5 标准声明（推荐）-->
<!DOCTYPE html>
```

**作用：**
- **触发标准模式**：浏览器按 W3C 标准渲染
- **避免怪异模式**：不写 DOCTYPE 时，浏览器会用"怪异模式"（Quirks Mode），模拟旧浏览器行为，可能导致布局异常

---

## ⭐Cookie、localStorage、sessionStorage 的区别

| 特性 | Cookie | localStorage | sessionStorage |
|---|---|---|---|
| 存储大小 | ~4KB | ~5MB | ~5MB |
| 有效期 | 可设置过期时间 | 永久（手动清除）| 标签页关闭即清除 |
| 随请求发送 | 是（自动携带）| 否 | 否 |
| 作用域 | 可跨子域 | 同源共享 | 同标签页同源 |
| 服务端访问 | 可通过 `Set-Cookie` 设置 | 否 | 否 |
| 适用场景 | 身份验证 Token | 用户偏好设置 | 临时页面状态 |

```javascript
// localStorage
localStorage.setItem('theme', 'dark')
localStorage.getItem('theme')  // 'dark'
localStorage.removeItem('theme')

// sessionStorage（API 相同，生命周期不同）
sessionStorage.setItem('step', '2')

// Cookie
document.cookie = 'token=abc123; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/'
```
