---
title: FAQ
---

# FAQ

这里是常见问题解答。


## 关于模块化规范（CommonJS、ES6、webpack），如何选择？

### 快速决策

> **2026 年标准答案：统一使用 ES6 Module (ESM)** ⭐

| 项目类型 | 推荐方案 | 语法 |
|---------|---------|------|
| Vue/React 前端项目 | **ES6 Module** | `import` / `export` |
| Node.js 后端（新项目） | **ES6 Module** | `import` / `export` |
| Node.js 后端（老项目） | CommonJS | `require()` / `module.exports` |
| npm 包开发 | 同时提供 ESM + CJS | 构建工具输出两种格式 |

### 三种方案对比

| 特性 | CommonJS | ES6 Module | Webpack |
|------|----------|-----------|---------|
| **使用场景** | Node.js 后端 | 现代前端（推荐） | 构建工具 |
| **加载方式** | 同步加载 | 异步加载 | 构建时处理 |
| **浏览器支持** | ❌ 不支持 | ✅ 原生支持 | ✅ 打包后支持 |
| **Tree Shaking** | ❌ 不支持 | ✅ 支持 | ✅ 支持 |
| **静态分析** | ❌ 运行时 | ✅ 编译时 | ✅ 支持 |

### 语法对比（Java 工程师视角）

**CommonJS**（Node.js 传统方案）：
```javascript
// 导出（类比 Java 的 public class）
module.exports = {
  name: '张三',
  getName: () => '张三'
}

// 导入（类比 Java 的 import）
const user = require('./user')
```

**ES6 Module**（现代标准，推荐）：
```javascript
// 命名导出（类比 public method）
export const name = '张三'
export function getName() {
  return name
}

// 默认导出（类比 public class）
export default {
  name: '张三',
  age: 25
}

// 导入
import user from './user.js'              // 默认导入
import { name, getName } from './user.js' // 命名导入
import * as User from './user.js'         // 全部导入（类比 import xxx.*）
```

### 为什么选择 ES6 Module？

1. ✅ **行业标准** - Vue、React、Angular 都使用 ES6
2. ✅ **原生支持** - 现代浏览器和 Node.js 16+ 原生支持
3. ✅ **Tree Shaking** - 自动删除未使用的代码，减小打包体积
4. ✅ **静态分析** - 编译时确定依赖，工具支持更好
5. ✅ **异步加载** - 支持代码分割和懒加载

### 实际项目示例

**Vue 3 + Vite 项目**（推荐写法）：
```javascript
// src/utils/request.js
import axios from 'axios'

export const request = axios.create({
  baseURL: '/api'
})

export function get(url) {
  return request.get(url)
}

export default request

// src/views/Home.vue
import request, { get } from '@/utils/request'

const fetchData = async () => {
  const data = await get('/users')
}
```

### 常见问题

**Q: 能在一个项目中混用吗？**  
A: 不推荐。统一使用 ES6 Module，代码更清晰。

**Q: 为什么 Vue 项目不能用 `require()`？**  
A: Vite/Webpack 默认只支持 ES6 Module。

**Q: Webpack 是什么？**  
A: Webpack 是构建工具（类比 Maven），不是模块规范。它负责：
- 将各种模块规范统一打包
- 转换 ES6 为 ES5（兼容老浏览器）
- 代码分割、懒加载

### 最佳实践

```javascript
// ✅ 推荐：统一使用 ES6
import { ref, reactive } from 'vue'
import axios from 'axios'

// ✅ 推荐：按需导入（减小体积）
import { debounce } from 'lodash-es'

// ✅ 推荐：聚合导出
// utils/index.js
export { request, get, post } from './request'
export { validate, isEmail } from './validator'

// ❌ 避免：混用模块规范
const axios = require('axios')  // CommonJS
import Vue from 'vue'            // ES6
```

### 总结

**核心建议**：新项目统一使用 **ES6 Module**，这是 JavaScript 的官方标准和行业最佳实践。


