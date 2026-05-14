---
title: vue
sidebar: 'heading'
---

# vue


## ⭐Vue 生命周期钩子有哪些？实际开发常用哪些？

创建前后：beforeCreate、created（可访问数据，无 DOM）

挂载前后：beforeMount、mounted（获取 DOM 或初始化第三方库）

更新前后：beforeUpdate、updated（避免在 updated 中改数据）

销毁前后：beforeDestroy/Vue3 beforeUnmount、destroyed/unmounted（清理定时器、取消监听）

其他：activated/deactivated（keep-alive）、errorCaptured。

## ⭐谈谈 computed 和 watch 的区别与使用场景

## ⭐组件间通信方式有哪些？

父子：
- ```props/$emit```（父传子用 props，子传父用 $emit）；
- v-model（语法糖）；
- ```ref/$refs```（父组件直接调用子组件）；
- ```$attrs/$listeners```（属性透传）；
- ```provide/inject```（跨层级）。

兄弟：
- 通过共同父组件（props/emit 上发下传）；
- Event Bus（Vue2 可用 new Vue()，Vue3 推荐 mitt）。

跨层级：
- provide/inject（不推荐用于非全局）；
- Vuex/Pinia 状态管理。

Vue3 还可用 Composition API 的 useXXX 封装的响应式对象。

## ⭐什么是虚拟 DOM？优点是什么？

虚拟 DOM 是用 JS 对象模拟真实 DOM 结构。当数据变化，先计算新旧树的差异（diff），再批量更新真实 DOM。

优点：减少直接操作 DOM 的次数、跨平台（如 Weex、小程序）、可提供声明式编程体验。

缺点：首次渲染比 innerHTML 慢，存在内存开销。

## ⭐key 的作用是什么？为什么不能用 index？

key 是虚拟 DOM 标识节点的唯一性，帮助 diff 算法复用节点、减少重排，提高性能。

使用 index 作为 key 在数组动态增删时会导致错误复用（例如删除第一个，所有后续索引变化，key 和内容不匹配），可能引起状态错乱。

## ⭐Vue3 的 Composition API 相比 Options API 有什么优势？

更好的逻辑复用：可将相关逻辑封装成 composable 函数。

更灵活的代码组织：按功能组织而非 data、methods 分离，便于维护大型组件。

更好的类型推导：配合 TypeScript 更友好。

减少 this 指向困惑；tree-shaking 更优。

## ⭐Vuex 的核心概念及工作流

state（单一状态树）

mutations（同步修改 state，唯一途径）

actions（可异步，提交 mutations）

getters（派生状态，类似 computed）

modules（模块化）

工作流：组件 dispatch action → action 提交 mutation → mutation 修改 state → 组件响应式更新。

## ⭐如何实现路由懒加载？

使用动态 import 语法：component: () => import('@/views/Home.vue')

结合 webpack 或 vite 的代码分割，该路由组件只在访问时加载。

Vue Router 支持将多个组件打包到同一个 chunk：/* webpackChunkName: "group" */