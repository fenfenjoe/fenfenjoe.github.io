---
title: VUE2 笔记
sidebarDepth: 2
---

# VUE2 笔记

## 参考资料

[Vue2 官方文档](https://v2.cn.vuejs.org/)

## 本章内容

- [Vue2 学习笔记](./Vue2学习笔记.md) - 基础语法、组件、生命周期、常见开发场景
- [Vue Router 3](./VueRouter.md) - Vue2 配套路由库
- [Vuex](./Vuex.md) - Vue2 官方状态管理
- [Webpack](./Webpack.md) - Vue2 项目配套构建工具

## Vue2 与 Vue3 核心区别速览

| 特性 | Vue2 | Vue3 |
|------|------|------|
| 响应式原理 | `Object.defineProperty` | `Proxy` |
| 组件 API 风格 | Options API | Composition API（兼容 Options API） |
| 状态管理 | Vuex | Pinia（推荐）/ Vuex 4 |
| 构建工具 | Vue CLI（Webpack） | Vite（推荐） |
| 根节点 | 只能有一个根元素 | 支持多根元素（Fragment） |
| v-model | `:value` + `@input` | `:modelValue` + `@update:modelValue` |
| 生命周期 | `beforeDestroy/destroyed` | `beforeUnmount/unmounted` |
| TypeScript | 支持较弱 | 完整支持 |
| 新增内置组件 | — | `Teleport`、`Suspense` |
