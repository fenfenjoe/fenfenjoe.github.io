---
title: Webpack 使用教程
sidebarDepth: 2
---

# Webpack 使用教程

Webpack 是 Vue2 项目（Vue CLI）默认的构建工具，负责将各种资源（JS、CSS、图片等）打包成浏览器可运行的文件。Vue3 推荐使用 Vite 替代。

## Vue CLI 与 Webpack 的关系

Vue CLI 是官方脚手架，底层使用 Webpack。通过 `vue.config.js` 来配置 Webpack，无需直接编写 `webpack.config.js`。

```
Vue CLI 项目
└── vue.config.js         ← 你修改这里
    └── webpack.config.js ← Vue CLI 自动生成，你一般不直接改
```

---

## 常用命令

```bash
npm run serve    # 启动开发服务器（默认 http://localhost:8080）
npm run build    # 构建生产包（输出到 dist/）
npm run lint     # 代码检查
```

---

## vue.config.js 常用配置

```js
// vue.config.js
const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  // 部署路径（默认 /，部署到子目录时修改）
  publicPath: process.env.NODE_ENV === 'production' ? '/my-app/' : '/',

  // 打包输出目录
  outputDir: 'dist',

  // 静态资源目录（相对于 outputDir）
  assetsDir: 'static',

  // 是否生成 sourceMap（生产环境关闭可加速构建、减小体积）
  productionSourceMap: false,

  // 开发服务器配置
  devServer: {
    host: '0.0.0.0',  // 局域网可访问
    port: 8080,
    open: true,       // 启动后自动打开浏览器
    // API 代理（解决跨域）
    proxy: {
      '/api': {
        target: 'http://localhost:3000',   // 后端地址
        changeOrigin: true,
        pathRewrite: { '^/api': '' },      // 转发时去掉 /api 前缀
      },
    },
  },

  // 修改 Webpack 配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
      }
    },
    // 将大型库配置为外部引用（CDN 加速）
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
    }
  },

  // 链式修改 Webpack（更精细的控制）
  chainWebpack(config) {
    // 修改页面 title
    config.plugin('html').tap(args => {
      args[0].title = 'My Vue App'
      return args
    })

    // 图片压缩
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => ({
        ...options,
        limit: 10240,  // 小于 10KB 转 base64
      }))
  },

  // CSS 相关配置
  css: {
    loaderOptions: {
      scss: {
        // 全局注入 scss 变量，所有组件中都可用
        additionalData: `@import "@/styles/variables.scss";`,
      },
      less: {
        // 自定义 Ant Design 主题变量
        lessOptions: {
          modifyVars: { '@primary-color': '#1890ff' },
          javascriptEnabled: true,
        },
      },
    },
  },
})
```

---

## 环境变量

### 环境文件

```
.env                  # 所有环境
.env.local            # 本地覆盖，不提交 git
.env.development      # 开发环境（npm run serve）
.env.production       # 生产环境（npm run build）
.env.staging          # 自定义环境
```

### 定义变量（必须以 `VUE_APP_` 开头）

```bash
# .env.development
VUE_APP_API_BASE_URL=http://localhost:3000
VUE_APP_TITLE=My App (Dev)

# .env.production
VUE_APP_API_BASE_URL=https://api.example.com
VUE_APP_TITLE=My App
```

### 在代码中使用

```js
// JS 中
const apiUrl = process.env.VUE_APP_API_BASE_URL

// 内置变量
console.log(process.env.NODE_ENV)     // 'development' 或 'production'
console.log(process.env.BASE_URL)     // publicPath 的值
```

```vue
<!-- 模板中 -->
<title>{{ process.env.VUE_APP_TITLE }}</title>
```

### 自定义构建模式

```bash
# package.json
{
  "scripts": {
    "build:staging": "vue-cli-service build --mode staging"
  }
}
```

---

## 路径别名

```js
// vue.config.js 中配置别名后
import MyComp from '@/components/MyComp.vue'  // @ 代表 src/
import utils from '@/utils/index.js'

// CSS 中使用别名需要加 ~
<style>
@import '~@/styles/variables.scss';
background: url('~@/assets/logo.png');
</style>
```

---

## 代码分割与懒加载

```js
// 路由懒加载（最常用）
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/DashboardView.vue')
  },
  {
    path: '/user',
    // 同一 chunk，减少请求数
    component: () => import(/* webpackChunkName: "user" */ '@/views/UserView.vue')
  }
]

// 异步组件
const AsyncComp = () => ({
  component: import('./MyComp.vue'),
  loading: LoadingComp,   // 加载中显示
  error: ErrorComp,       // 加载失败显示
  delay: 200,             // 200ms 后显示 loading
  timeout: 3000           // 超时时间
})
```

---

## 生产构建优化

### 分析打包体积

```bash
# 安装分析工具
npm install --save-dev webpack-bundle-analyzer

# 运行分析
npm run build --report
```

### vue.config.js 优化配置

```js
module.exports = {
  productionSourceMap: false,  // 关闭 sourceMap

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 将大型库改为 CDN 引入，不打包进 bundle
      config.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
        'element-ui': 'ELEMENT',
      }
    }
  },

  chainWebpack(config) {
    // 生产环境移除 console.log
    config.optimization.minimizer('terser').tap(args => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })

    // 图片压缩
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
      .end()
  }
}
```

### index.html 引入 CDN

```html
<!-- public/index.html -->
<% if (process.env.NODE_ENV === 'production') { %>
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-router@3/dist/vue-router.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuex@3/dist/vuex.min.js"></script>
<% } %>
```

---

## 常见问题

### 跨域问题

开发环境通过 `devServer.proxy` 解决：

```js
devServer: {
  proxy: {
    '/api': {
      target: 'http://backend-server.com',
      changeOrigin: true,      // 修改请求头中的 Origin
      pathRewrite: {
        '^/api': '/api'        // 不需要去掉前缀就不写 rewrite
      }
    }
  }
}
```

生产环境由 Nginx 配置代理，前端不需要额外处理。

### 打包后白屏

原因通常是 `publicPath` 配置不对：

```js
// 部署在根路径
publicPath: '/'

// 部署在子目录 /my-app/
publicPath: '/my-app/'

// 相对路径（可应对任意部署路径，但 history 模式不适用）
publicPath: './'
```

---

## Webpack vs Vite 对比

| | Webpack（Vue CLI） | Vite |
|-|-------------------|------|
| 冷启动速度 | 慢（全量打包） | 极快（按需编译） |
| 热更新（HMR） | 较慢 | 极快 |
| 配置复杂度 | 复杂 | 简单 |
| 生态成熟度 | 非常成熟 | 快速成长 |
| 兼容性 | 可兼容老浏览器 | 主要面向现代浏览器 |
| 适用场景 | Vue2 项目、老项目维护 | Vue3 新项目（推荐） |
