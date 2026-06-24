---
title: Vue Router 使用教程
sidebar: 'heading'
---

# Vue Router 使用教程

Vue Router 是 Vue.js 官方路由库，用于构建单页应用（SPA）。当前版本为 Vue Router 4，专为 Vue 3 设计。

## 安装

```bash
npm install vue-router@4
```

## 基础配置

### 创建路由文件

```js
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // 懒加载（推荐，按需加载减少首屏体积）
    component: () => import('@/views/AboutView.vue'),
  },
  {
    // 404 兜底路由，必须放最后
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
```

### 注册路由

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

### 路由出口

```vue
<!-- App.vue -->
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <!-- 路由匹配的组件渲染在此 -->
  <RouterView />
</template>
```

## History 模式

| 模式 | 函数 | URL 格式 | 说明 |
|------|------|---------|------|
| HTML5 History | `createWebHistory()` | `/user/1` | 需服务器配置支持 |
| Hash | `createWebHashHistory()` | `/#/user/1` | 无需服务器配置 |
| Memory | `createMemoryHistory()` | 无 URL 变化 | 适合 SSR / 测试 |

## 动态路由

### 定义动态参数

```js
const routes = [
  {
    path: '/user/:id',
    component: () => import('@/views/UserView.vue'),
  },
  {
    // 多个参数
    path: '/user/:userId/post/:postId',
    component: () => import('@/views/UserPostView.vue'),
  },
]
```

### 获取参数

```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// 获取动态参数
console.log(route.params.id)
console.log(route.params.userId)

// 获取查询参数（?key=value）
console.log(route.query.page)
</script>
```

### 响应参数变化

当路由参数改变时（`/user/1` → `/user/2`），组件不会重新创建，需手动监听：

```vue
<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(
  () => route.params.id,
  (newId) => {
    // 重新获取数据
    fetchUser(newId)
  }
)
</script>
```

## 嵌套路由

```js
const routes = [
  {
    path: '/user/:id',
    component: () => import('@/views/UserLayout.vue'),
    children: [
      {
        path: '',            // 匹配 /user/:id
        component: () => import('@/views/UserHome.vue'),
      },
      {
        path: 'profile',    // 匹配 /user/:id/profile
        component: () => import('@/views/UserProfile.vue'),
      },
      {
        path: 'posts',      // 匹配 /user/:id/posts
        component: () => import('@/views/UserPosts.vue'),
      },
    ],
  },
]
```

父级组件中需要有 `<RouterView>` 作为子路由出口：

```vue
<!-- UserLayout.vue -->
<template>
  <div>
    <h1>User {{ $route.params.id }}</h1>
    <RouterView />  <!-- 子路由渲染位置 -->
  </div>
</template>
```

## 编程式导航

```js
import { useRouter } from 'vue-router'

const router = useRouter()

// 跳转到路径
router.push('/about')

// 跳转到命名路由
router.push({ name: 'home' })

// 带参数跳转
router.push({ name: 'user', params: { id: 123 } })

// 带查询参数跳转
router.push({ path: '/search', query: { q: 'vue' } })

// 替换当前历史记录（不可后退）
router.replace({ name: 'home' })

// 前进/后退
router.go(1)   // 前进
router.go(-1)  // 后退（等同于 router.back()）
router.back()
router.forward()
```

## 路由元信息（Meta）

```js
const routes = [
  {
    path: '/admin',
    component: () => import('@/views/AdminView.vue'),
    meta: {
      requiresAuth: true,   // 需要登录
      title: '管理后台',     // 页面标题
      roles: ['admin'],     // 需要的角色
    },
  },
]
```

在路由守卫中使用：

```js
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})
```

## 路由守卫

### 全局前置守卫（最常用）

```js
// router/index.js
router.beforeEach((to, from) => {
  // 返回 false：取消导航
  // 返回路由对象：重定向
  // 返回 undefined / true：确认导航

  const isLoggedIn = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})
```

### 全局后置钩子

```js
router.afterEach((to) => {
  // 修改页面标题
  document.title = to.meta.title || 'My App'
})
```

### 路由独享守卫

```js
const routes = [
  {
    path: '/admin',
    component: AdminView,
    beforeEnter: (to, from) => {
      if (!hasAdminRole()) return { name: 'home' }
    },
  },
]
```

### 组件内守卫

```vue
<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

// 离开当前路由前（如表单未保存时提示用户）
onBeforeRouteLeave((to, from) => {
  if (hasUnsavedChanges) {
    const answer = window.confirm('您有未保存的更改，确定要离开吗？')
    if (!answer) return false
  }
})

// 路由参数更新时（同一组件，参数变化）
onBeforeRouteUpdate(async (to) => {
  await fetchUser(to.params.id)
})
</script>
```

## 路由懒加载与分组打包

```js
// 单独打包某个路由组件
const UserView = () => import('@/views/UserView.vue')

// 将多个路由组件打包到同一 chunk（webpack/vite 魔法注释）
const UserProfile = () => import(/* webpackChunkName: "user" */ '@/views/UserProfile.vue')
const UserPosts = () => import(/* webpackChunkName: "user" */ '@/views/UserPosts.vue')
```

## 滚动行为

```js
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 后退时恢复之前的滚动位置
    if (savedPosition) {
      return savedPosition
    }
    // 有锚点则滚动到锚点
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    // 默认滚动到顶部
    return { top: 0 }
  },
})
```

## 重定向与别名

```js
const routes = [
  // 重定向
  { path: '/home', redirect: '/' },
  { path: '/user/:id', redirect: { name: 'user-detail' } },
  { path: '/search', redirect: (to) => ({ path: '/results', query: to.query }) },

  // 别名（URL 变化但组件不变）
  { path: '/', component: HomeView, alias: '/home' },
]
```

## 路由传参（Props 解耦）

将路由参数作为 props 传给组件，避免组件强依赖 `$route`：

```js
const routes = [
  {
    path: '/user/:id',
    component: UserView,
    props: true,  // 将 params 作为 props 传入
  },
  {
    path: '/search',
    component: SearchView,
    props: (route) => ({ query: route.query.q }), // 函数形式，更灵活
  },
]
```

```vue
<!-- UserView.vue -->
<script setup>
// 直接声明 props，无需 useRoute
defineProps(['id'])
</script>
```

## RouterLink 进阶

```vue
<template>
  <!-- 激活时自动添加 router-link-active 类 -->
  <RouterLink to="/about">About</RouterLink>

  <!-- 精确匹配才激活 -->
  <RouterLink to="/" exact-active-class="active">Home</RouterLink>

  <!-- 自定义激活类名 -->
  <RouterLink to="/about" active-class="my-active">About</RouterLink>

  <!-- replace 模式（不记入历史） -->
  <RouterLink to="/about" replace>About</RouterLink>

  <!-- 自定义渲染元素（v-slot） -->
  <RouterLink to="/about" v-slot="{ isActive, navigate }">
    <button :class="{ active: isActive }" @click="navigate">About</button>
  </RouterLink>
</template>
```

## 常见场景

### 登录重定向

```js
// 登录成功后跳回原页面
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

// LoginView.vue 登录成功后
const redirect = route.query.redirect || '/'
router.push(redirect)
```

### 动态添加路由

```js
// 登录后根据权限动态添加路由
function addRoutesByRole(role) {
  if (role === 'admin') {
    router.addRoute({
      path: '/admin',
      component: () => import('@/views/AdminView.vue'),
    })
  }
}
```
