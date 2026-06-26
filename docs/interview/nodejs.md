---
title: Node.js
sidebarDepth: 2
---

# Node.js 面试题

## ⭐Node.js 是什么？有哪些特点？

**Node.js** 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境，让 JavaScript 可以在服务端运行。

**核心特点：**

| 特点 | 说明 |
|---|---|
| 单线程 | 主线程只有一个，避免线程切换开销 |
| 事件驱动 | 基于事件循环（Event Loop）处理请求 |
| 非阻塞 I/O | I/O 操作异步执行，不阻塞主线程 |
| 高并发 | 适合 I/O 密集型场景（网络请求、文件读写）|
| 跨平台 | 支持 Windows、Linux、macOS |
| npm 生态 | 拥有世界最大的开源包仓库 |

**不适合的场景：** CPU 密集型任务（大量计算），因为单线程会被阻塞。

---

## ⭐Node.js 的事件循环（Event Loop）是什么？

Node.js 的事件循环基于 **libuv** 库实现，分为多个阶段：

```
   ┌─────────────────────────────┐
┌──┤         timers              │  ← setTimeout / setInterval 回调
│  └──────────────┬──────────────┘
│  ┌──────────────┴──────────────┐
│  │     pending callbacks       │  ← 上一轮延迟的 I/O 回调
│  └──────────────┬──────────────┘
│  ┌──────────────┴──────────────┐
│  │         idle, prepare       │  ← 内部使用
│  └──────────────┬──────────────┘
│  ┌──────────────┴──────────────┐
│  │            poll             │  ← 获取新的 I/O 事件（核心阶段）
│  └──────────────┬──────────────┘
│  ┌──────────────┴──────────────┐
│  │            check            │  ← setImmediate 回调
│  └──────────────┬──────────────┘
│  ┌──────────────┴──────────────┐
└──┤      close callbacks        │  ← socket.on('close') 等
   └─────────────────────────────┘
```

**宏任务 vs 微任务：**

| 类型 | 示例 | 执行时机 |
|---|---|---|
| 微任务（microtask）| `Promise.then`、`process.nextTick` | 每个阶段切换**之前**清空 |
| 宏任务（macrotask）| `setTimeout`、`setInterval`、`setImmediate` | 按阶段顺序执行 |

> `process.nextTick` 优先级高于 `Promise.then`，在微任务队列中最先执行。

```javascript
setTimeout(() => console.log('timeout'), 0)
setImmediate(() => console.log('immediate'))
Promise.resolve().then(() => console.log('promise'))
process.nextTick(() => console.log('nextTick'))

// 输出顺序：nextTick → promise → timeout/immediate（顺序不固定）
```

---

## ⭐Node.js 中 CommonJS 模块系统

Node.js 默认使用 CommonJS 模块规范：

```javascript
// 导出（方式1：exports）
exports.add = (a, b) => a + b
exports.PI = 3.14159

// 导出（方式2：module.exports，可导出任意值）
module.exports = {
  add: (a, b) => a + b,
  PI: 3.14159
}

// 导出类
module.exports = class Calculator {
  add(a, b) { return a + b }
}
```

```javascript
// 导入
const math = require('./math')
const { add, PI } = require('./math')
const Calculator = require('./calculator')

// 内置模块
const fs = require('fs')
const path = require('path')
const http = require('http')
```

**CommonJS vs ES Module：**

| 特性 | CommonJS | ES Module |
|---|---|---|
| 语法 | `require` / `module.exports` | `import` / `export` |
| 加载时机 | 运行时动态加载 | 编译时静态分析 |
| 同步/异步 | 同步 | 异步 |
| Tree Shaking | 不支持 | 支持 |
| 文件扩展名 | `.js` | `.mjs` 或 `"type":"module"` |
| `this` 指向 | `module.exports` | `undefined` |

---

## ⭐常用的 Node.js 核心模块

### fs（文件系统）
```javascript
const fs = require('fs')
const fsPromises = require('fs/promises')

// 同步读取
const content = fs.readFileSync('./file.txt', 'utf8')

// 异步读取（回调）
fs.readFile('./file.txt', 'utf8', (err, data) => {
  if (err) throw err
  console.log(data)
})

// Promise 风格（推荐）
async function readFile() {
  const data = await fsPromises.readFile('./file.txt', 'utf8')
  console.log(data)
}

// 写入文件
await fsPromises.writeFile('./output.txt', 'Hello World')

// 读取目录
const files = await fsPromises.readdir('./src')
```

### path（路径处理）
```javascript
const path = require('path')

path.join('/foo', 'bar', 'baz')        // '/foo/bar/baz'
path.resolve('src', 'utils', 'index')  // 绝对路径
path.basename('/foo/bar/baz.txt')      // 'baz.txt'
path.extname('index.html')             // '.html'
path.dirname('/foo/bar/baz.txt')       // '/foo/bar'

// 常用：获取当前文件所在目录
const dir = path.dirname(__filename)
const fullPath = path.join(__dirname, 'config.json')
```

### http（HTTP 服务）
```javascript
const http = require('http')

const server = http.createServer((req, res) => {
  const { method, url } = req

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: 'Hello World' }))
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
```

### stream（流）
```javascript
const fs = require('fs')

// 读取流
const readStream = fs.createReadStream('./large-file.txt', { encoding: 'utf8' })
readStream.on('data', chunk => console.log(chunk))
readStream.on('end', () => console.log('读取完成'))

// 管道（pipe）：读取文件 → 压缩 → 写入
const zlib = require('zlib')
fs.createReadStream('./input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('./output.gz'))
```

---

## ⭐什么是 Express？如何搭建基本服务？

**Express** 是最流行的 Node.js Web 框架，提供路由、中间件等核心功能。

```javascript
const express = require('express')
const app = express()

// 内置中间件
app.use(express.json())                          // 解析 JSON 请求体
app.use(express.urlencoded({ extended: true }))  // 解析表单数据
app.use(express.static('public'))                // 静态文件服务

// 路由
app.get('/users', async (req, res) => {
  const { page = 1, limit = 10 } = req.query    // 查询参数
  res.json({ users: [], page, limit })
})

app.get('/users/:id', (req, res) => {
  const { id } = req.params                      // 路径参数
  res.json({ id })
})

app.post('/users', (req, res) => {
  const { name, email } = req.body               // 请求体
  res.status(201).json({ id: 1, name, email })
})

// 错误处理中间件（4个参数）
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: err.message })
})

app.listen(3000, () => console.log('Server started on port 3000'))
```

**Express 中间件机制：**
```javascript
// 中间件是带有 (req, res, next) 参数的函数
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()  // 调用 next() 传递给下一个中间件
}

app.use(logger)

// 路由级中间件（仅对特定路由生效）
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  next()
}

app.get('/profile', authMiddleware, (req, res) => {
  res.json({ user: 'me' })
})
```

---

## ⭐Node.js 如何处理异步操作？

Node.js 经历了三个阶段的异步处理方式：

### 1. 回调函数（Callback）- 早期方式
```javascript
fs.readFile('./a.txt', 'utf8', (err, data1) => {
  if (err) return console.error(err)
  fs.readFile('./b.txt', 'utf8', (err, data2) => {
    // 回调地狱（Callback Hell）
    if (err) return console.error(err)
    console.log(data1 + data2)
  })
})
```

### 2. Promise - 改善可读性
```javascript
const fsPromises = require('fs/promises')

fsPromises.readFile('./a.txt', 'utf8')
  .then(data1 => fsPromises.readFile('./b.txt', 'utf8').then(data2 => [data1, data2]))
  .then(([data1, data2]) => console.log(data1 + data2))
  .catch(err => console.error(err))
```

### 3. async/await - 推荐方式
```javascript
async function readFiles() {
  try {
    const [data1, data2] = await Promise.all([
      fsPromises.readFile('./a.txt', 'utf8'),
      fsPromises.readFile('./b.txt', 'utf8')   // 并行读取
    ])
    console.log(data1 + data2)
  } catch (err) {
    console.error(err)
  }
}
```

---

## ⭐什么是 npm？常用命令有哪些？

**npm（Node Package Manager）**：Node.js 的包管理器，用于安装、管理第三方依赖。

```bash
# 初始化项目
npm init -y

# 安装依赖
npm install express          # 安装到 dependencies
npm install -D eslint        # 安装到 devDependencies
npm install -g nodemon       # 全局安装

# 删除依赖
npm uninstall express

# 更新依赖
npm update
npm update express

# 查看已安装
npm list
npm list --depth=0           # 只看顶层

# 运行脚本
npm run dev
npm run build
npm start                    # 快捷方式

# 查看包信息
npm info express
npm outdated                 # 查看过期依赖

# 清除缓存
npm cache clean --force
```

**package.json 重要字段：**
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "webpack --mode production"
  },
  "dependencies": {
    "express": "^4.18.0"     // ^ 允许次版本更新
  },
  "devDependencies": {
    "nodemon": "~3.0.0"      // ~ 只允许补丁版本更新
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## ⭐Node.js 中如何解决跨域问题？

```javascript
// 方法1：手动设置 CORS 头
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')          // 或指定域名
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  if (req.method === 'OPTIONS') return res.sendStatus(204)   // 预检请求
  next()
})

// 方法2：使用 cors 中间件（推荐）
const cors = require('cors')

app.use(cors())  // 允许所有来源

// 精细配置
app.use(cors({
  origin: ['http://localhost:3000', 'https://myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true  // 允许携带 Cookie
}))
```

---

## ⭐Node.js 性能优化

1. **使用 cluster 模块充分利用多核 CPU**
```javascript
const cluster = require('cluster')
const os = require('os')

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()  // 创建子进程
  }
} else {
  // 每个子进程运行独立的 HTTP 服务
  const app = require('./app')
  app.listen(3000)
}
```

2. **流式处理大文件**（避免将整个文件加载到内存）
```javascript
// 不推荐：内存占用大
const data = fs.readFileSync('./large-file.csv')

// 推荐：流式读取
fs.createReadStream('./large-file.csv').pipe(processStream).pipe(res)
```

3. **缓存热点数据**（Redis + 内存缓存）

4. **避免同步 API**（生产环境禁用 `*Sync` 方法）

5. **使用 PM2 进程管理器**（负载均衡、自动重启、日志管理）
```bash
pm2 start app.js -i max    # 开启 cluster 模式，使用所有 CPU
pm2 logs                   # 查看日志
pm2 monit                  # 监控面板
```
