---
title: html5
sidebar: 'heading'
---

# html5

## 1. 文档结构标签

### `<!DOCTYPE>`
声明文档类型，告知浏览器使用 HTML5 标准解析。

```html
<!DOCTYPE html>
```

### `<html>`
根元素，包裹整个页面内容。

| 属性 | 说明 |
|---|---|
| `lang` | 声明页面语言（如 `zh-CN`、`en`） |

```html
<html lang="zh-CN">
</html>
```

### `<head>`
页面头部，包含元信息，不在页面中显示。

```html
<head>
  <meta charset="UTF-8" />
  <title>页面标题</title>
</head>
```

### `<body>`
页面主体，所有可见内容放在此标签内。

```html
<body>
  <h1>Hello World</h1>
</body>
```

---

## 2. 元信息标签

### `<meta>`
提供页面元数据，无闭合标签。

| 属性 | 说明 |
|---|---|
| `charset` | 字符编码 |
| `name` | 元数据名称（`viewport`、`description`、`keywords`、`author`） |
| `content` | 与 `name` 或 `http-equiv` 配合使用的值 |
| `http-equiv` | 模拟 HTTP 响应头（如 `refresh`、`X-UA-Compatible`） |

```html
<!-- 字符编码 -->
<meta charset="UTF-8" />

<!-- 移动端适配 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- 页面描述（SEO） -->
<meta name="description" content="这是一个示例页面" />

<!-- 关键词（SEO） -->
<meta name="keywords" content="HTML, CSS, JavaScript" />

<!-- IE 兼容模式 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<!-- 定时刷新（5秒后跳转） -->
<meta http-equiv="refresh" content="5; url=https://example.com" />
```

### `<title>`
设置浏览器标签页和书签的标题。

```html
<title>我的博客</title>
```

### `<link>`
链接外部资源，最常用于引入 CSS 文件。

| 属性 | 说明 |
|---|---|
| `rel` | 资源与当前文档的关系（`stylesheet`、`icon`、`preload`、`canonical`） |
| `href` | 资源地址 |
| `type` | MIME 类型 |
| `media` | 媒体查询条件 |

```html
<!-- 引入 CSS -->
<link rel="stylesheet" href="/styles/main.css" />

<!-- 网站图标 -->
<link rel="icon" href="/favicon.ico" type="image/x-icon" />

<!-- 预加载资源 -->
<link rel="preload" href="/fonts/font.woff2" as="font" crossorigin />
```

### `<style>`
在页面内嵌 CSS 样式。

| 属性 | 说明 |
|---|---|
| `type` | MIME 类型，默认 `text/css` |
| `media` | 应用样式的媒体条件 |

```html
<style>
  body { margin: 0; font-family: sans-serif; }
</style>
```

### `<script>`
引入或内嵌 JavaScript。

| 属性 | 说明 |
|---|---|
| `src` | 外部脚本地址 |
| `type` | MIME 类型，默认 `text/javascript` |
| `async` | 异步加载，下载完立即执行 |
| `defer` | 延迟执行，DOM 解析完后按顺序执行 |
| `module` | 将脚本作为 ES Module 加载 |

```html
<!-- 外部脚本（推荐 defer） -->
<script src="/js/app.js" defer></script>

<!-- 异步加载（适合无依赖的独立脚本） -->
<script src="/js/analytics.js" async></script>

<!-- 内嵌脚本 -->
<script>
  console.log('Hello World');
</script>

<!-- ES Module -->
<script type="module" src="/js/main.mjs"></script>
```

### `<base>`
设置页面所有相对 URL 的基准地址，只能有一个。

| 属性 | 说明 |
|---|---|
| `href` | 基准 URL |
| `target` | 所有链接的默认打开方式 |

```html
<base href="https://example.com/" target="_blank" />
```

---

## 3. 内容分区标签

### `<header>`
页面或章节的头部区域，通常包含导航或标题。

```html
<header>
  <h1>网站名称</h1>
  <nav>...</nav>
</header>
```

### `<footer>`
页面或章节的底部区域，通常包含版权、联系信息。

```html
<footer>
  <p>&copy; 2024 My Blog. All rights reserved.</p>
</footer>
```

### `<nav>`
导航链接区域。

```html
<nav>
  <a href="/">首页</a>
  <a href="/about">关于</a>
  <a href="/contact">联系我</a>
</nav>
```

### `<main>`
页面主体内容，每个页面只能有一个，不包含导航、页眉、页脚等重复内容。

```html
<main>
  <article>...</article>
</main>
```

### `<article>`
独立的、可复用的内容块（博客文章、新闻、评论等）。

```html
<article>
  <h2>文章标题</h2>
  <p>文章正文...</p>
</article>
```

### `<section>`
文档中的一个主题章节，通常包含标题。

```html
<section>
  <h2>第一章</h2>
  <p>章节内容...</p>
</section>
```

### `<aside>`
与主内容相关但可独立存在的侧边内容（侧边栏、广告、相关链接）。

```html
<aside>
  <h3>相关文章</h3>
  <ul>
    <li><a href="/post/1">文章一</a></li>
  </ul>
</aside>
```

### `<div>`
通用块级容器，无语义，用于布局和分组。

| 属性 | 说明 |
|---|---|
| `id` | 唯一标识符 |
| `class` | CSS 类名（多个类名用空格分隔） |

```html
<div id="app" class="container main-wrapper">
  内容
</div>
```

### `<span>`
通用行内容器，无语义，用于对文本片段应用样式。

```html
<p>价格：<span class="price">¥99.00</span></p>
```

---

## 4. 标题标签

`<h1>` 到 `<h6>`，表示六级标题，`h1` 权重最高，每个页面 `h1` 建议只有一个。

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

---

## 5. 文本内容标签

### `<p>`
段落。

```html
<p>这是一段正文内容。</p>
```

### `<br>`
换行，无闭合标签。

```html
<p>第一行<br />第二行</p>
```

### `<hr>`
水平分隔线，无闭合标签。

```html
<hr />
```

### `<pre>`
保留空白字符和换行的预格式化文本，通常与 `<code>` 配合使用。

```html
<pre>
  function hello() {
    console.log('Hello');
  }
</pre>
```

### `<blockquote>`
长引用块。

| 属性 | 说明 |
|---|---|
| `cite` | 引用来源的 URL |

```html
<blockquote cite="https://example.com">
  <p>这是一段引用的内容。</p>
</blockquote>
```

### `<figure>` 和 `<figcaption>`
图片、图表等媒体内容及其说明文字。

```html
<figure>
  <img src="/images/photo.jpg" alt="风景照片" />
  <figcaption>图1：美丽的风景</figcaption>
</figure>
```

### `<address>`
联系信息（邮件、地址、电话等），通常显示为斜体。

```html
<address>
  作者：<a href="mailto:user@example.com">user@example.com</a>
</address>
```

---

## 6. 行内文本语义标签

### `<a>`
超链接。

| 属性 | 说明 |
|---|---|
| `href` | 链接目标（URL、锚点 `#id`、`mailto:`、`tel:`） |
| `target` | 打开方式：`_blank`（新标签）、`_self`（当前页，默认）、`_parent`、`_top` |
| `rel` | 链接关系（`noopener noreferrer`、`nofollow`） |
| `download` | 触发下载，值为文件名 |

```html
<!-- 普通链接 -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">外部链接</a>

<!-- 锚点跳转 -->
<a href="#section1">跳转到第一节</a>

<!-- 发送邮件 -->
<a href="mailto:user@example.com">发邮件</a>

<!-- 拨打电话 -->
<a href="tel:+8613800000000">拨打电话</a>

<!-- 下载文件 -->
<a href="/files/report.pdf" download="年度报告.pdf">下载报告</a>
```

### `<strong>`
强调重要内容，语义上表示"重要"，默认加粗显示。

```html
<p>请<strong>不要</strong>在此处填写真实密码。</p>
```

### `<em>`
强调内容，语义上表示"语气强调"，默认斜体显示。

```html
<p>我<em>真的</em>很喜欢这个设计。</p>
```

### `<code>`
行内代码片段。

```html
<p>使用 <code>console.log()</code> 输出调试信息。</p>
```

### `<kbd>`
表示键盘输入。

```html
<p>按 <kbd>Ctrl</kbd> + <kbd>C</kbd> 复制。</p>
```

### `<samp>`
表示程序输出样本。

```html
<p>程序输出：<samp>Error: file not found</samp></p>
```

### `<var>`
表示数学或编程中的变量。

```html
<p>面积 = <var>π</var> × <var>r</var>²</p>
```

### `<mark>`
高亮标记文本（HTML5 新增）。

```html
<p>搜索结果：<mark>HTML5</mark> 教程</p>
```

### `<small>`
附属细则，如版权、法律声明等（字号较小）。

```html
<small>&copy; 2024 All rights reserved.</small>
```

### `<del>` 和 `<ins>`
标记删除和插入的内容，常用于修订对比。

| 属性 | 说明 |
|---|---|
| `cite` | 说明原因的 URL |
| `datetime` | 修改时间（ISO 格式） |

```html
<p>价格：<del>¥199</del> <ins>¥99</ins></p>
```

### `<sub>` 和 `<sup>`
下标和上标。

```html
<p>水的化学式：H<sub>2</sub>O</p>
<p>2<sup>10</sup> = 1024</p>
```

### `<abbr>`
缩写，鼠标悬停时显示完整说明。

| 属性 | 说明 |
|---|---|
| `title` | 缩写的完整说明 |

```html
<p><abbr title="HyperText Markup Language">HTML</abbr> 是网页的骨架。</p>
```

### `<time>`
机器可读的时间（HTML5 新增）。

| 属性 | 说明 |
|---|---|
| `datetime` | ISO 8601 格式的时间值 |

```html
<p>发布于 <time datetime="2024-06-01">2024年6月1日</time></p>
```

### `<q>`
行内引用，浏览器会自动加引号。

| 属性 | 说明 |
|---|---|
| `cite` | 引用来源的 URL |

```html
<p>鲁迅曾说：<q>时间就是生命。</q></p>
```

### `<cite>`
引用作品的标题（书名、电影名、文章名等），默认斜体。

```html
<p><cite>JavaScript 高级程序设计</cite> 是前端必读书籍。</p>
```

### `<dfn>`
定义术语。

```html
<p><dfn>HTML</dfn> 是用于创建网页的标准标记语言。</p>
```

### `<bdi>`
隔离双向文本，防止周围文本影响其方向（适用于用户生成内容）。

```html
<p>用户 <bdi>مرحبا</bdi> 获得了100分。</p>
```

### `<bdo>`
覆盖文本方向。

| 属性 | 说明 |
|---|---|
| `dir` | 文本方向：`ltr`（从左到右）、`rtl`（从右到左） |

```html
<bdo dir="rtl">从右往左显示的文字</bdo>
```

### `<wbr>`
建议换行点，仅在必要时才换行。

```html
<p>一个超长的URL：https://www.example.com/very<wbr>/long<wbr>/path</p>
```

---

## 7. 列表标签

### `<ul>` 无序列表

```html
<ul>
  <li>苹果</li>
  <li>香蕉</li>
  <li>橙子</li>
</ul>
```

### `<ol>` 有序列表

| 属性 | 说明 |
|---|---|
| `type` | 编号类型：`1`（数字，默认）、`a`/`A`（字母）、`i`/`I`（罗马数字） |
| `start` | 起始编号 |
| `reversed` | 倒序排列 |

```html
<ol type="1" start="3">
  <li>第三步</li>
  <li>第四步</li>
</ol>
```

### `<li>` 列表项

| 属性 | 说明 |
|---|---|
| `value` | 在 `<ol>` 中设置当前项的编号值 |

```html
<ol>
  <li value="5">从第5项开始</li>
  <li>第6项</li>
</ol>
```

### `<dl>` 描述列表
包含术语（`<dt>`）和描述（`<dd>`）的列表，适合词汇表、FAQ。

```html
<dl>
  <dt>HTML</dt>
  <dd>超文本标记语言，用于构建网页结构。</dd>
  <dt>CSS</dt>
  <dd>层叠样式表，用于描述网页的外观。</dd>
</dl>
```

---

## 8. 表格标签

### 基础结构

| 标签 | 说明 |
|---|---|
| `<table>` | 表格容器 |
| `<thead>` | 表头区域 |
| `<tbody>` | 表格主体区域 |
| `<tfoot>` | 表格底部汇总区域 |
| `<tr>` | 表格行 |
| `<th>` | 表头单元格（默认加粗居中） |
| `<td>` | 普通单元格 |
| `<caption>` | 表格标题 |
| `<colgroup>` / `<col>` | 定义列的样式 |

### 常用属性

| 属性 | 适用标签 | 说明 |
|---|---|---|
| `colspan` | `<th>` `<td>` | 横向合并列数 |
| `rowspan` | `<th>` `<td>` | 纵向合并行数 |
| `scope` | `<th>` | 标明表头适用范围：`col`、`row`、`colgroup`、`rowgroup` |
| `span` | `<col>` | 该列样式应用的列数 |

```html
<table>
  <caption>学生成绩表</caption>
  <colgroup>
    <col style="width: 40%" />
    <col span="2" style="width: 30%" />
  </colgroup>
  <thead>
    <tr>
      <th scope="col">姓名</th>
      <th scope="col">数学</th>
      <th scope="col">语文</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>张三</td>
      <td>95</td>
      <td>88</td>
    </tr>
    <tr>
      <td>李四</td>
      <td colspan="2">缺考</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">平均分</th>
      <td>95</td>
      <td>88</td>
    </tr>
  </tfoot>
</table>
```

---

## 9. 表单标签

### `<form>`
表单容器。

| 属性 | 说明 |
|---|---|
| `action` | 提交地址 |
| `method` | 提交方式：`get`（默认）、`post` |
| `enctype` | 编码类型，上传文件时需设为 `multipart/form-data` |
| `novalidate` | 禁用浏览器原生校验 |
| `autocomplete` | 自动填充：`on`（默认）、`off` |
| `target` | 响应结果的打开方式（同 `<a>` 的 `target`） |

```html
<form action="/api/login" method="post" enctype="application/x-www-form-urlencoded">
  <!-- 表单控件 -->
</form>
```

### `<input>`
最常用的表单控件，通过 `type` 属性切换形态，无闭合标签。

**通用属性：**

| 属性 | 说明 |
|---|---|
| `type` | 控件类型（见下表） |
| `name` | 提交时的字段名 |
| `value` | 控件值 |
| `id` | 配合 `<label>` 使用 |
| `placeholder` | 占位提示文字 |
| `required` | 必填 |
| `disabled` | 禁用 |
| `readonly` | 只读 |
| `autofocus` | 页面加载后自动聚焦 |
| `autocomplete` | 自动填充 |
| `form` | 关联的表单 `id`（可放在表单外） |

**`type` 类型：**

| type 值 | 说明 |
|---|---|
| `text` | 单行文本（默认） |
| `password` | 密码（内容遮蔽） |
| `email` | 邮箱（自动校验格式） |
| `number` | 数字（支持 `min`、`max`、`step`） |
| `tel` | 电话号码 |
| `url` | URL（自动校验格式） |
| `search` | 搜索框 |
| `checkbox` | 复选框（用 `checked` 默认勾选） |
| `radio` | 单选按钮（同 `name` 为一组） |
| `file` | 文件选择（支持 `accept`、`multiple`） |
| `range` | 滑块（支持 `min`、`max`、`step`） |
| `color` | 颜色选择器 |
| `date` | 日期选择 |
| `time` | 时间选择 |
| `datetime-local` | 日期+时间选择 |
| `month` | 年月选择 |
| `week` | 年周选择 |
| `hidden` | 隐藏字段 |
| `submit` | 提交按钮 |
| `reset` | 重置按钮 |
| `button` | 普通按钮（无默认行为） |
| `image` | 图片提交按钮（支持 `src`、`alt`） |

```html
<!-- 文本 -->
<input type="text" name="username" placeholder="请输入用户名" required />

<!-- 密码 -->
<input type="password" name="password" minlength="8" />

<!-- 数字 -->
<input type="number" name="age" min="1" max="120" step="1" value="18" />

<!-- 复选框 -->
<input type="checkbox" name="agree" id="agree" checked />
<label for="agree">我已阅读并同意</label>

<!-- 单选框 -->
<input type="radio" name="gender" value="male" id="male" />
<label for="male">男</label>
<input type="radio" name="gender" value="female" id="female" />
<label for="female">女</label>

<!-- 文件上传 -->
<input type="file" name="avatar" accept="image/*" multiple />

<!-- 日期 -->
<input type="date" name="birthday" min="1900-01-01" max="2024-12-31" />

<!-- 颜色 -->
<input type="color" name="themeColor" value="#3498db" />

<!-- 范围滑块 -->
<input type="range" name="volume" min="0" max="100" step="5" value="50" />

<!-- 隐藏字段 -->
<input type="hidden" name="csrf_token" value="abc123" />
```

### `<textarea>`
多行文本输入框。

| 属性 | 说明 |
|---|---|
| `rows` | 可见行数 |
| `cols` | 可见列数 |
| `maxlength` | 最大字符数 |
| `minlength` | 最小字符数 |
| `placeholder` | 占位提示 |
| `required` | 必填 |
| `disabled` | 禁用 |
| `readonly` | 只读 |

```html
<textarea name="comment" rows="5" cols="40" maxlength="500" placeholder="请输入评论..."></textarea>
```

### `<select>` 和 `<option>` / `<optgroup>`
下拉选择框。

| 属性（select） | 说明 |
|---|---|
| `name` | 字段名 |
| `multiple` | 允许多选 |
| `size` | 可见选项数量 |
| `required` | 必选 |
| `disabled` | 禁用 |

| 属性（option） | 说明 |
|---|---|
| `value` | 提交的值 |
| `selected` | 默认选中 |
| `disabled` | 禁用该项 |

```html
<select name="city" required>
  <option value="">请选择城市</option>
  <optgroup label="广东省">
    <option value="gz">广州</option>
    <option value="sz" selected>深圳</option>
  </optgroup>
  <optgroup label="浙江省">
    <option value="hz">杭州</option>
  </optgroup>
</select>
```

### `<button>`
按钮，比 `<input type="button">` 更灵活，可包含 HTML 内容。

| 属性 | 说明 |
|---|---|
| `type` | `submit`（默认）、`reset`、`button` |
| `disabled` | 禁用 |
| `form` | 关联的表单 `id` |
| `formaction` | 覆盖表单的 `action` |
| `formmethod` | 覆盖表单的 `method` |

```html
<!-- 提交按钮 -->
<button type="submit">登录</button>

<!-- 普通按钮（需 JS 处理） -->
<button type="button" onclick="handleClick()">点击我</button>

<!-- 重置按钮 -->
<button type="reset">清空</button>

<!-- 包含图标的按钮 -->
<button type="button"><img src="/icons/save.svg" alt="" /> 保存</button>
```

### `<label>`
表单控件的关联标签，点击标签可聚焦对应控件。

| 属性 | 说明 |
|---|---|
| `for` | 关联控件的 `id` |

```html
<!-- 显式关联 -->
<label for="email">邮箱：</label>
<input type="email" id="email" name="email" />

<!-- 隐式包裹（无需 for） -->
<label>
  用户名：
  <input type="text" name="username" />
</label>
```

### `<fieldset>` 和 `<legend>`
对表单控件分组，`<legend>` 是分组标题。

| 属性（fieldset） | 说明 |
|---|---|
| `disabled` | 禁用组内所有控件 |
| `form` | 关联的表单 `id` |

```html
<form>
  <fieldset>
    <legend>个人信息</legend>
    <label for="name">姓名：</label>
    <input type="text" id="name" name="name" />
  </fieldset>
  <fieldset disabled>
    <legend>高级设置（暂不可用）</legend>
    <input type="text" name="advanced" />
  </fieldset>
</form>
```

### `<datalist>`
为 `<input>` 提供预定义选项列表（可输入也可选择）。

```html
<input type="text" name="browser" list="browsers" placeholder="输入或选择浏览器" />
<datalist id="browsers">
  <option value="Chrome" />
  <option value="Firefox" />
  <option value="Safari" />
  <option value="Edge" />
</datalist>
```

### `<output>`
显示计算结果（HTML5 新增）。

| 属性 | 说明 |
|---|---|
| `for` | 关联的控件 `id`（空格分隔多个） |
| `name` | 字段名 |

```html
<form oninput="result.value = parseInt(a.value) + parseInt(b.value)">
  <input type="number" id="a" value="0" /> +
  <input type="number" id="b" value="0" /> =
  <output name="result" for="a b">0</output>
</form>
```

### `<progress>`
进度条（HTML5 新增）。

| 属性 | 说明 |
|---|---|
| `value` | 当前进度值 |
| `max` | 最大值（默认 1） |

```html
<!-- 确定进度 -->
<progress value="70" max="100">70%</progress>

<!-- 不确定进度（加载中） -->
<progress></progress>
```

### `<meter>`
标量测量值或分数值（HTML5 新增），如磁盘用量、评分。

| 属性 | 说明 |
|---|---|
| `value` | 当前值（必填） |
| `min` | 最小值（默认 0） |
| `max` | 最大值（默认 1） |
| `low` | 低值阈值 |
| `high` | 高值阈值 |
| `optimum` | 最优值（影响颜色显示） |

```html
<meter value="0.7" min="0" max="1" low="0.3" high="0.8" optimum="1">70%</meter>
<meter value="75" min="0" max="100">磁盘已用 75GB</meter>
```

---

## 10. 媒体标签

### `<img>`
图片，无闭合标签。

| 属性 | 说明 |
|---|---|
| `src` | 图片地址（必填） |
| `alt` | 替代文本（必填，无障碍+SEO） |
| `width` | 宽度（px 或省略单位） |
| `height` | 高度 |
| `loading` | 加载策略：`lazy`（懒加载）、`eager`（立即加载） |
| `decoding` | 解码策略：`async`、`sync`、`auto` |
| `srcset` | 响应式图片源集 |
| `sizes` | 配合 `srcset` 的媒体条件 |

```html
<!-- 基础用法 -->
<img src="/images/photo.jpg" alt="风景照片" width="800" height="600" />

<!-- 懒加载 -->
<img src="/images/banner.jpg" alt="Banner" loading="lazy" />

<!-- 响应式图片 -->
<img
  src="/images/photo-800.jpg"
  srcset="/images/photo-400.jpg 400w, /images/photo-800.jpg 800w, /images/photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  alt="响应式图片"
/>
```

### `<picture>`
响应式图片容器，支持多格式多尺寸按条件加载（HTML5 新增）。

```html
<picture>
  <!-- 现代格式优先 -->
  <source srcset="/images/photo.avif" type="image/avif" />
  <source srcset="/images/photo.webp" type="image/webp" />
  <!-- 移动端小图 -->
  <source srcset="/images/photo-mobile.jpg" media="(max-width: 600px)" />
  <!-- 兜底 -->
  <img src="/images/photo.jpg" alt="风景照片" />
</picture>
```

### `<audio>`
音频播放（HTML5 新增）。

| 属性 | 说明 |
|---|---|
| `src` | 音频地址（也可用 `<source>` 子元素） |
| `controls` | 显示播放控件 |
| `autoplay` | 自动播放（通常被浏览器阻止） |
| `loop` | 循环播放 |
| `muted` | 静音 |
| `preload` | 预加载策略：`none`、`metadata`、`auto` |

```html
<audio controls preload="metadata">
  <source src="/audio/song.ogg" type="audio/ogg" />
  <source src="/audio/song.mp3" type="audio/mpeg" />
  您的浏览器不支持 audio 标签。
</audio>
```

### `<video>`
视频播放（HTML5 新增）。

| 属性 | 说明 |
|---|---|
| `src` | 视频地址 |
| `controls` | 显示播放控件 |
| `width` / `height` | 尺寸 |
| `autoplay` | 自动播放（需配合 `muted`） |
| `loop` | 循环播放 |
| `muted` | 静音 |
| `poster` | 视频封面图地址 |
| `preload` | 预加载策略 |
| `playsinline` | iOS 内联播放（不全屏） |

```html
<video
  controls
  width="720"
  height="405"
  poster="/images/video-cover.jpg"
  muted
  playsinline
>
  <source src="/video/demo.webm" type="video/webm" />
  <source src="/video/demo.mp4" type="video/mp4" />
  <!-- 字幕 -->
  <track src="/subtitles/zh.vtt" kind="subtitles" srclang="zh" label="中文" default />
  您的浏览器不支持 video 标签。
</video>
```

### `<track>`
视频/音频的字幕或元数据轨道。

| 属性 | 说明 |
|---|---|
| `src` | 轨道文件地址（WebVTT 格式） |
| `kind` | 轨道类型：`subtitles`、`captions`、`descriptions`、`chapters`、`metadata` |
| `srclang` | 语言代码 |
| `label` | 用户可见的轨道名称 |
| `default` | 默认启用 |

### `<source>`
为 `<picture>`、`<audio>`、`<video>` 提供备选资源。

| 属性 | 说明 |
|---|---|
| `src` | 资源地址（`<audio>`/`<video>` 使用） |
| `srcset` | 图片源集（`<picture>` 使用） |
| `type` | MIME 类型 |
| `media` | 媒体查询条件 |

---

## 11. 嵌入内容标签

### `<iframe>`
嵌入外部网页或内容。

| 属性 | 说明 |
|---|---|
| `src` | 嵌入页面的 URL |
| `width` / `height` | 尺寸 |
| `title` | 无障碍描述（必填） |
| `allow` | 功能权限策略（`camera`、`microphone`、`fullscreen` 等） |
| `sandbox` | 安全限制（`allow-scripts`、`allow-same-origin`、`allow-forms` 等） |
| `loading` | 加载策略：`lazy`、`eager` |
| `referrerpolicy` | 引用策略 |

```html
<!-- 嵌入地图 -->
<iframe
  src="https://maps.example.com/embed"
  width="600"
  height="400"
  title="位置地图"
  loading="lazy"
  sandbox="allow-scripts allow-same-origin"
></iframe>

<!-- 嵌入视频 -->
<iframe
  src="https://player.example.com/video/123"
  width="720"
  height="405"
  title="示例视频"
  allow="fullscreen"
></iframe>
```

### `<embed>`
嵌入外部内容（PDF 等）。

| 属性 | 说明 |
|---|---|
| `src` | 资源地址 |
| `type` | MIME 类型 |
| `width` / `height` | 尺寸 |

```html
<embed src="/files/document.pdf" type="application/pdf" width="800" height="600" />
```

### `<object>`
嵌入外部资源，支持回退内容。

| 属性 | 说明 |
|---|---|
| `data` | 资源地址 |
| `type` | MIME 类型 |
| `width` / `height` | 尺寸 |

```html
<object data="/files/document.pdf" type="application/pdf" width="800" height="600">
  <p>您的浏览器不支持 PDF 预览，<a href="/files/document.pdf">点击下载</a>。</p>
</object>
```

### `<canvas>`
用于通过 JavaScript 绘制图形（HTML5 新增）。

| 属性 | 说明 |
|---|---|
| `width` | 画布宽度（默认 300px） |
| `height` | 画布高度（默认 150px） |

```html
<canvas id="myCanvas" width="500" height="300">
  您的浏览器不支持 canvas 标签。
</canvas>
<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#3498db';
  ctx.fillRect(50, 50, 200, 100);
</script>
```

### `<svg>`
可缩放矢量图形，可直接内嵌在 HTML 中（HTML5 新增）。

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" stroke="#3498db" stroke-width="3" fill="none" />
  <text x="50" y="55" text-anchor="middle" fill="#333">SVG</text>
</svg>
```

---

## 12. 交互标签

### `<details>` 和 `<summary>`
可展开/折叠的详情块（HTML5 新增）。

| 属性（details） | 说明 |
|---|---|
| `open` | 默认展开 |

```html
<details open>
  <summary>点击展开查看详情</summary>
  <p>这是详细内容，默认展开。</p>
  <ul>
    <li>条目一</li>
    <li>条目二</li>
  </ul>
</details>
```

### `<dialog>`
模态/非模态对话框（HTML5 新增）。

| 属性 | 说明 |
|---|---|
| `open` | 默认显示 |

```html
<dialog id="myDialog">
  <h2>确认删除</h2>
  <p>此操作不可恢复，确认删除？</p>
  <button onclick="document.getElementById('myDialog').close()">取消</button>
  <button>确认</button>
</dialog>
<button onclick="document.getElementById('myDialog').showModal()">打开对话框</button>
```

```javascript
// JS 控制方法
dialog.showModal(); // 模态打开
dialog.show();      // 非模态打开
dialog.close();     // 关闭
```

### `<menu>`
工具栏或上下文菜单（语义化按钮列表）。

```html
<menu>
  <li><button>剪切</button></li>
  <li><button>复制</button></li>
  <li><button>粘贴</button></li>
</menu>
```

---

## 13. 全局属性

所有 HTML 标签都支持的属性。

| 属性 | 说明 |
|---|---|
| `id` | 元素唯一标识符，页面内不可重复 |
| `class` | CSS 类名，多个用空格分隔 |
| `style` | 内联 CSS 样式 |
| `title` | 鼠标悬停时显示的提示文字 |
| `lang` | 元素内容的语言 |
| `dir` | 文本方向：`ltr`、`rtl`、`auto` |
| `hidden` | 隐藏元素（等效 `display: none`） |
| `tabindex` | Tab 键焦点顺序（`0` 参与，`-1` 排除，正数按数值排序） |
| `accesskey` | 快捷键 |
| `draggable` | 是否可拖拽：`true`、`false` |
| `contenteditable` | 是否可编辑：`true`、`false` |
| `spellcheck` | 是否检查拼写：`true`、`false` |
| `translate` | 是否应被翻译：`yes`、`no` |
| `data-*` | 自定义数据属性，通过 JS 的 `dataset` 访问 |
| `aria-*` | WAI-ARIA 无障碍属性 |
| `role` | 元素的 ARIA 角色 |

```html
<!-- data-* 自定义属性 -->
<div
  id="product-1"
  class="product-card"
  data-product-id="1001"
  data-price="99.00"
  data-category="electronics"
>
  商品卡片
</div>

<script>
  const card = document.getElementById('product-1');
  console.log(card.dataset.productId); // "1001"
  console.log(card.dataset.price);     // "99.00"
</script>

<!-- contenteditable -->
<div contenteditable="true" spellcheck="false">
  这段文字可以直接编辑
</div>

<!-- tabindex -->
<div tabindex="0">可通过 Tab 键聚焦的 div</div>
<div tabindex="-1">不在 Tab 顺序中，但可通过 JS 聚焦</div>
```

---

## 14. 废弃标签（HTML5 已移除）

以下标签在 HTML5 中已废弃，不应再使用，应以 CSS 代替其功能。

| 废弃标签 | 原功能 | 替代方案 |
|---|---|---|
| `<font>` | 设置字体 | CSS `font-family`、`color` |
| `<center>` | 居中 | CSS `text-align: center` / Flexbox |
| `<b>` | 加粗（已重新定义为样式无关的文本提醒） | `<strong>`（语义）或 CSS |
| `<i>` | 斜体（已重新定义为专业术语/外来词等） | `<em>`（语义）或 CSS |
| `<u>` | 下划线（已重新定义为注音等用途） | CSS `text-decoration` |
| `<s>` | 删除线（已重新定义为不再准确的内容） | `<del>`（语义）或 CSS |
| `<strike>` | 删除线 | `<del>` 或 CSS |
| `<big>` | 大号字体 | CSS `font-size` |
| `<tt>` | 等宽字体 | `<code>` 或 CSS |
| `<frame>` / `<frameset>` / `<noframes>` | 框架集 | `<iframe>` |
| `<acronym>` | 缩写 | `<abbr>` |
| `<applet>` | Java Applet | `<object>` 或现代 Web API |
