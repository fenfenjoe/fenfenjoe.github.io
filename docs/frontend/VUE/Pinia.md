---
title: Pinia 使用教程
sidebar: 'heading'
---

# Pinia 使用教程

Pinia 是 Vue 3 官方推荐的状态管理库，是 Vuex 的替代方案。相比 Vuex，Pinia 更轻量、API 更简洁，并完整支持 TypeScript。

## 安装

```bash
npm install pinia
```

## 初始化

在 `main.js` 中注册 Pinia：

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
```

## 定义 Store

推荐在 `src/stores/` 目录下创建 Store 文件。

### Option Store 写法

类似 Vue 2 的 Options API 风格：

```js
// src/stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Eduardo',
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
    async fetchUser(userId) {
      const res = await fetch(`/api/user/${userId}`)
      this.name = (await res.json()).name
    },
  },
})
```

### Setup Store 写法（推荐）

类似 Vue 3 的 Composition API 风格，更灵活：

```js
// src/stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // state
  const count = ref(0)
  const name = ref('Eduardo')

  // getters
  const doubleCount = computed(() => count.value * 2)

  // actions
  function increment() {
    count.value++
  }

  async function fetchUser(userId) {
    const res = await fetch(`/api/user/${userId}`)
    name.value = (await res.json()).name
  }

  return { count, name, doubleCount, increment, fetchUser }
})
```

## 在组件中使用 Store

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>

<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <p>Double: {{ counter.doubleCount }}</p>
    <button @click="counter.increment()">+1</button>
  </div>
</template>
```

## 解构 Store（保持响应式）

直接解构会丢失响应式，需使用 `storeToRefs`：

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

// 用 storeToRefs 解构 state 和 getters（保持响应式）
const { count, name, doubleCount } = storeToRefs(counter)

// actions 可以直接解构，无需 storeToRefs
const { increment } = counter
</script>
```

## 修改 State

### 方式一：直接修改

```js
const counter = useCounterStore()
counter.count++
counter.name = 'Tom'
```

### 方式二：$patch（批量修改，性能更好）

```js
// 对象写法
counter.$patch({
  count: 10,
  name: 'Tom',
})

// 函数写法（适合复杂修改）
counter.$patch((state) => {
  state.count++
  state.name = 'Tom'
})
```

### 方式三：通过 Actions 修改（推荐）

```js
counter.increment()
```

## 重置 State

Option Store 可直接调用 `$reset()`：

```js
counter.$reset()
```

Setup Store 需手动实现：

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function $reset() {
    count.value = 0
  }

  return { count, $reset }
})
```

## 监听 State 变化

### $subscribe

```js
counter.$subscribe((mutation, state) => {
  console.log('mutation type:', mutation.type)
  console.log('new state:', state)
  // 可持久化存储
  localStorage.setItem('counter', JSON.stringify(state))
})
```

### watch

```js
import { watch } from 'vue'

watch(
  () => counter.count,
  (newVal, oldVal) => {
    console.log(`count changed: ${oldVal} -> ${newVal}`)
  }
)
```

## 监听 Actions

```js
counter.$onAction(({ name, args, after, onError }) => {
  console.log(`action "${name}" called with args:`, args)

  after((result) => {
    console.log(`action "${name}" finished`)
  })

  onError((error) => {
    console.error(`action "${name}" failed:`, error)
  })
})
```

## 持久化插件（pinia-plugin-persistedstate）

```bash
npm install pinia-plugin-persistedstate
```

```js
// main.js
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

在 Store 中开启持久化：

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  persist: true, // 默认存储到 localStorage
})

// 自定义配置
export const useUserStore = defineStore('user', {
  state: () => ({ token: '', userInfo: {} }),
  persist: {
    key: 'user-store',         // 存储键名
    storage: sessionStorage,   // 使用 sessionStorage
    paths: ['token'],          // 只持久化 token 字段
  },
})
```

## 在 Store 外使用

在非组件环境（如路由守卫、请求拦截器）中使用 Store，需传入 pinia 实例：

```js
// router/index.js
import { useUserStore } from '@/stores/user'

router.beforeEach((to) => {
  // 确保 pinia 已初始化后再调用
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.token) {
    return '/login'
  }
})
```

## 与 Vuex 对比

| 特性 | Pinia | Vuex 4 |
|------|-------|--------|
| TypeScript 支持 | 完整支持 | 有限支持 |
| Mutations | 无（直接修改） | 需要定义 |
| 模块化 | 天然支持（每个 Store 独立） | 需要 modules 配置 |
| DevTools | 支持 | 支持 |
| 代码量 | 少 | 多 |
| Vue 版本 | Vue 2 / Vue 3 | Vue 2 / Vue 3 |
