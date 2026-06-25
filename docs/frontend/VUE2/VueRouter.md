---
title: Vue Router 3 使用教程
sidebarDepth: 2
---

# Vue Router 3 使用教程

Vue Router 3 是 Vue2 配套的官方路由库（Vue3 对应 Vue Router 4）。

## 安装

```bash
npm install vue-router@3
```

## 基础配置

```js
// src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)  // Vue2 必须显式注册插件

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // 路由懒加载
    component: () => import('@/views/AboutView.vue'),
  },
  {
    // 404 兜底
    path: '*',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',   // history 模式（去掉 # 号）
  base: '/',
  routes,
})

export default router
```

```js
// main.js 注册路由
import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

```vue
<!-- App.vue -->
<template>
  <div>
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
    </nav>
    <router-view />
  </div>
</template>
```

---

## History 模式

| 模式 | 配置 | URL 格式 | 说明 |
|------|------|---------|------|
| Hash | `mode: 'hash'`（默认） | `/#/home` | 不需要服务器配置 |
| History | `mode: 'history'` | `/home` | 需服务器配置，生产环境需 Nginx 支持 |

**Nginx 配置（history 模式必须）：**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## 动态路由

```js
const routes = [
  { path: '/user/:id', component: UserDetail },
  { path: '/user/:userId/post/:postId', component: UserPost },
]
```

```js
// 组件中获取参数
export default {
  created() {
    console.log(this.$route.params.id)
    console.log(this.$route.query.page)  // ?page=2
  },
  // 监听参数变化（同一组件，参数变化时触发）
  watch: {
    '$route.params.id'(newId) {
      this.fetchData(newId)
    }
  }
}
```

---

## 嵌套路由

```js
const routes = [
  {
    path: '/user/:id',
    component: UserLayout,
    children: [
      { path: '', component: UserHome },          // /user/:id
      { path: 'profile', component: UserProfile }, // /user/:id/profile
      { path: 'posts', component: UserPosts },     // /user/:id/posts
    ]
  }
]
```

```vue
<!-- UserLayout.vue 中需要 router-view -->
<template>
  <div>
    <h2>用户 {{ $route.params.id }}</h2>
    <router-view />
  </div>
</template>
```

---

## 编程式导航

```js
// 跳转
this.$router.push('/home')
this.$router.push({ name: 'user', params: { id: 1 } })
this.$router.push({ path: '/search', query: { keyword: 'vue' } })

// replace（不产生历史记录）
this.$router.replace('/login')

// 前进/后退
this.$router.go(-1)   // 后退
this.$router.go(1)    // 前进
this.$router.back()
this.$router.forward()
```

---

## 路由元信息（Meta）

```js
const routes = [
  {
    path: '/admin',
    component: AdminView,
    meta: {
      requiresAuth: true,
      title: '管理后台',
      roles: ['admin'],
    }
  }
]
```

---

## 导航守卫

### 全局前置守卫

```js
// router/index.js
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    // 未登录，跳转到登录页，并记录来源路径
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()  // 必须调用 next() 才能继续导航
  }
})
```

### 全局后置钩子

```js
router.afterEach((to) => {
  document.title = to.meta.title || 'My App'
})
```

### 路由独享守卫

```js
const routes = [
  {
    path: '/admin',
    component: AdminView,
    beforeEnter(to, from, next) {
      if (!hasAdminRole()) next('/403')
      else next()
    }
  }
]
```

### 组件内守卫

```js
export default {
  // 进入路由前（可用于获取数据）
  beforeRouteEnter(to, from, next) {
    // 此时组件实例还未创建，不能访问 this
    next(vm => {
      // 通过 next 的回调访问实例
      vm.fetchData(to.params.id)
    })
  },
  // 路由参数更新时（同一组件）
  beforeRouteUpdate(to, from, next) {
    this.fetchData(to.params.id)
    next()
  },
  // 离开路由前
  beforeRouteLeave(to, from, next) {
    if (this.hasUnsavedChanges) {
      const confirm = window.confirm('有未保存的更改，确定离开？')
      if (!confirm) return next(false)
    }
    next()
  }
}
```

---

## router-link

```vue
<template>
  <!-- 基本用法 -->
  <router-link to="/">首页</router-link>
  <router-link :to="{ name: 'user', params: { id: 1 } }">用户</router-link>

  <!-- 激活样式（精确匹配） -->
  <router-link to="/" exact active-class="active">首页</router-link>

  <!-- replace 模式 -->
  <router-link to="/about" replace>关于</router-link>

  <!-- tag：渲染为指定标签 -->
  <router-link to="/home" tag="button">首页</router-link>
</template>
```

---

## 重定向与别名

```js
const routes = [
  // 重定向
  { path: '/home', redirect: '/' },
  { path: '/user', redirect: { name: 'user-list' } },
  // 动态重定向
  {
    path: '/search',
    redirect: to => ({ path: '/results', query: to.query })
  },
  // 别名（URL 是 /alias，但匹配 / 的组件）
  { path: '/', component: HomeView, alias: '/home' }
]
```

---

## 滚动行为

```js
const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition  // 后退时恢复位置
    }
    if (to.hash) {
      return { selector: to.hash }  // 有锚点时滚动到锚点
    }
    return { x: 0, y: 0 }  // 默认回到顶部
  }
})
```

---

## Vue Router 3 vs 4 对比

| | Vue Router 3（Vue2） | Vue Router 4（Vue3） |
|-|---------------------|---------------------|
| 创建方式 | `new VueRouter({ routes })` | `createRouter({ history, routes })` |
| 注册方式 | `Vue.use(VueRouter)` | `app.use(router)` |
| History 模式 | `mode: 'history'` | `history: createWebHistory()` |
| 组件内获取路由 | `this.$route` / `this.$router` | `useRoute()` / `useRouter()` |
| 404 路由 | `path: '*'` | `path: '/:pathMatch(.*)*'` |
| 守卫 next | 必须调用 `next()` | 返回值控制（return false / 路由对象） |
