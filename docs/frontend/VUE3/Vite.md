---
title: Vite 使用教程
sidebarDepth: 2
---

# Vite 使用教程

Vite 是由 Vue 作者尤雨溪开发的新一代前端构建工具。利用浏览器原生 ES Module 特性，开发环境下无需打包，启动速度极快；生产环境使用 Rollup 打包。

## 安装 & 创建项目

### 创建新项目

```bash
# npm
npm create vite@latest my-app

# yarn
yarn create vite my-app

# pnpm
pnpm create vite my-app
```

按提示选择框架（Vue / React 等）和变体（JS / TS）。

### 创建 Vue + TypeScript 项目（一键）

```bash
npm create vite@latest my-vue-app -- --template vue-ts
cd my-vue-app
npm install
npm run dev
```

## 项目结构

```
my-vite-app/
├── public/             # 不参与构建的静态资源
├── src/
│   ├── assets/         # 参与构建的静态资源
│   ├── components/
│   ├── App.vue
│   └── main.js
├── index.html          # 入口 HTML（Vite 以此为起点）
├── vite.config.js      # Vite 配置文件
└── package.json
```

## vite.config.js 常用配置

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],

  // 路径别名
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  // 开发服务器配置
  server: {
    host: '0.0.0.0',   // 局域网可访问
    port: 5173,
    open: true,         // 启动后自动打开浏览器
    proxy: {
      // 代理 /api 请求到后端服务
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  // 构建配置
  build: {
    outDir: 'dist',       // 输出目录
    assetsDir: 'assets',  // 静态资源目录
    sourcemap: false,     // 生产环境不生成 sourcemap
    minify: 'esbuild',    // 压缩方式：esbuild（快）或 terser（体积更小）
    chunkSizeWarningLimit: 1000, // chunk 大小警告阈值（KB）
    rollupOptions: {
      output: {
        // 手动分包
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
        },
      },
    },
  },

  // CSS 配置
  css: {
    preprocessorOptions: {
      scss: {
        // 全局注入 scss 变量
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
})
```

## 常用命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产包
npm run preview  # 本地预览生产包
```

## 环境变量

### 环境文件

```
.env                # 所有环境生效
.env.local          # 本地覆盖，不提交 git
.env.development    # 开发环境
.env.production     # 生产环境
```

### 定义变量（必须以 `VITE_` 开头）

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_TITLE=My App (Dev)

# .env.production
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=My App
```

### 使用变量

```js
// 在代码中使用
const apiUrl = import.meta.env.VITE_API_BASE_URL
const title = import.meta.env.VITE_APP_TITLE

// 内置变量
console.log(import.meta.env.MODE)      // 'development' 或 'production'
console.log(import.meta.env.DEV)       // boolean，是否为开发模式
console.log(import.meta.env.PROD)      // boolean，是否为生产模式
console.log(import.meta.env.BASE_URL)  // 部署的基础路径
```

## 静态资源处理

### 导入静态资源

```js
// 导入图片，返回解析后的 URL
import logoUrl from '@/assets/logo.png'

// 导入为原始文本
import shaderSource from './shader.glsl?raw'

// 导入为 URL（与直接导入等效）
import workerUrl from './worker.js?url'
```

### public 目录

`public/` 下的文件直接通过根路径 `/` 访问，不会被 Vite 处理：

```html
<!-- 不推荐在代码中引用 public 资源，应通过绝对路径 -->
<img src="/logo.png" />
```

## 插件

### 常用插件

```bash
# Vue 支持（官方）
npm install @vitejs/plugin-vue

# JSX 支持
npm install @vitejs/plugin-vue-jsx

# 自动导入 API（如 ref、computed 无需 import）
npm install -D unplugin-auto-import

# 组件自动导入
npm install -D unplugin-vue-components
```

### 自动导入配置示例

```js
// vite.config.js
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver()],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts',
    }),
  ],
})
```

## 多页面应用（MPA）

```js
// vite.config.js
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/index.html'),
      },
    },
  },
})
```

## 生产构建优化

### 代码分割

```js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 第三方库单独打包
            return id.toString().split('node_modules/')[1].split('/')[0]
          }
        },
      },
    },
  },
})
```

### 压缩图片（vite-plugin-imagemin）

```bash
npm install -D vite-plugin-imagemin
```

```js
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      svgo: {},
    }),
  ],
})
```

## Vite vs Webpack 对比

| 特性 | Vite | Webpack |
|------|------|---------|
| 冷启动速度 | 极快（按需编译） | 较慢（全量打包） |
| 热更新（HMR） | 极快（模块级更新） | 较慢 |
| 生产打包 | Rollup | 自身 |
| 配置复杂度 | 简单 | 复杂 |
| 生态成熟度 | 较新但快速成长 | 非常成熟 |
| 浏览器兼容性 | 现代浏览器为主 | 可兼容更低版本 |
