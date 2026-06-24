---
title: React 学习笔记
sidebarDepth: 2
---

# React 学习笔记

React 是由 Meta（Facebook）开源的用于构建用户界面的 JavaScript 库。它采用组件化开发模式，通过虚拟 DOM 实现高效渲染，是目前最流行的前端框架之一。

## React 生态全景

| 分类 | 常用方案 |
|------|---------|
| 构建工具 | Vite、Create React App |
| 路由 | React Router v6 |
| 状态管理 | Redux Toolkit、Zustand、Jotai |
| UI 组件库 | Ant Design、MUI、Chakra UI |
| 数据请求 | TanStack Query、SWR、Axios |
| 表单 | React Hook Form、Formik |
| 样式方案 | Tailwind CSS、CSS Modules、styled-components |
| 全栈框架 | Next.js、Remix |

## 创建项目

### 使用 Vite（推荐）

```bash
npm create vite@latest my-react-app -- --template react
# 或 TypeScript 版本
npm create vite@latest my-react-app -- --template react-ts

cd my-react-app
npm install
npm run dev
```

### 项目目录结构

```
my-react-app/
├── public/
├── src/
│   ├── assets/          # 静态资源
│   ├── components/      # 可复用组件
│   ├── hooks/           # 自定义 Hooks
│   ├── pages/           # 页面级组件
│   ├── store/           # 状态管理
│   ├── services/        # API 请求封装
│   ├── utils/           # 工具函数
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## 本章内容

- [React 基础](./React基础.md) - JSX、组件、Props、事件处理、条件渲染、列表渲染
- [React Hooks](./ReactHooks.md) - useState、useEffect、useContext、useRef、useMemo、自定义 Hook
- [React Router](./ReactRouter.md) - 路由配置、动态路由、嵌套路由、路由守卫
- [Redux Toolkit](./Redux.md) - 状态管理、createSlice、异步 Thunk、RTK Query
