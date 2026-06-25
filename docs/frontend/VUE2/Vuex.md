---
title: Vuex 使用教程
sidebarDepth: 2
---

# Vuex 使用教程

Vuex 是 Vue2 官方的状态管理库，用于管理多个组件共享的状态。Vue3 推荐使用 Pinia 替代。

## 安装

```bash
npm install vuex@3   # Vue2 对应 Vuex 3
```

## 核心概念

| 概念 | 说明 | 类比 |
|------|------|------|
| `state` | 全局响应式状态数据 | 数据库 |
| `getters` | 从 state 派生的计算值 | computed |
| `mutations` | 同步修改 state 的唯一途径 | setter |
| `actions` | 可包含异步操作，提交 mutations | service 层 |
| `modules` | 将 store 拆分为模块 | 分表 |

**数据流向：**

```
组件 → dispatch(action) → commit(mutation) → 修改 state → 组件响应式更新
组件 → commit(mutation) → 修改 state（简单同步场景可跳过 action）
```

---

## 基础配置

```js
// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 开启严格模式：state 只能通过 mutation 修改（生产环境关闭，影响性能）
  strict: process.env.NODE_ENV !== 'production',

  state: {
    count: 0,
    userInfo: null,
    token: localStorage.getItem('token') || '',
  },

  getters: {
    // 类似 computed，有缓存
    isLoggedIn: state => !!state.token,
    doubleCount: state => state.count * 2,
    // 接收其他 getter
    countInfo: (state, getters) => `count: ${state.count}, double: ${getters.doubleCount}`,
  },

  mutations: {
    // mutation 必须是同步函数
    INCREMENT(state, payload) {
      state.count += payload || 1
    },
    SET_USER(state, user) {
      state.userInfo = user
    },
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)  // 同步到本地存储
    },
    CLEAR_AUTH(state) {
      state.token = ''
      state.userInfo = null
      localStorage.removeItem('token')
    },
  },

  actions: {
    // action 可以是异步的，通过 commit 提交 mutation
    async login({ commit }, credentials) {
      const res = await api.login(credentials)
      commit('SET_TOKEN', res.data.token)
      commit('SET_USER', res.data.user)
      return res.data
    },
    async fetchUserInfo({ commit, state }) {
      if (!state.token) return
      const res = await api.getUserInfo()
      commit('SET_USER', res.data)
    },
    logout({ commit }) {
      commit('CLEAR_AUTH')
    },
  },
})

export default store
```

```js
// main.js 注册 store
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

---

## 在组件中使用

### 直接访问

```js
export default {
  computed: {
    count() { return this.$store.state.count },
    isLoggedIn() { return this.$store.getters.isLoggedIn },
  },
  methods: {
    increment() {
      // 提交 mutation（同步）
      this.$store.commit('INCREMENT', 5)
    },
    async login() {
      // 派发 action（异步）
      await this.$store.dispatch('login', { username: 'Tom', password: '123' })
    }
  }
}
```

### 辅助函数（推荐）

```js
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    // 映射 state
    ...mapState(['count', 'userInfo', 'token']),
    // 重命名
    ...mapState({ myCount: 'count', user: 'userInfo' }),
    // 映射 getters
    ...mapGetters(['isLoggedIn', 'doubleCount']),
  },
  methods: {
    // 映射 mutations
    ...mapMutations(['INCREMENT', 'SET_TOKEN']),
    // 映射 actions
    ...mapActions(['login', 'logout', 'fetchUserInfo']),

    async handleLogin() {
      await this.login({ username: 'Tom', password: '123' })
      this.$router.push('/dashboard')
    }
  }
}
```

---

## 模块化（modules）

项目变大后将 store 拆分为模块：

```js
// src/store/modules/user.js
export default {
  namespaced: true,  // 开启命名空间，避免命名冲突

  state: () => ({
    userInfo: null,
    token: '',
  }),

  getters: {
    isLoggedIn: state => !!state.token,
  },

  mutations: {
    SET_TOKEN(state, token) { state.token = token },
    SET_USER(state, user) { state.userInfo = user },
  },

  actions: {
    async login({ commit }, credentials) {
      const res = await api.login(credentials)
      commit('SET_TOKEN', res.data.token)
      commit('SET_USER', res.data.user)
    }
  }
}
```

```js
// src/store/modules/cart.js
export default {
  namespaced: true,
  state: () => ({ items: [] }),
  mutations: {
    ADD_ITEM(state, item) { state.items.push(item) },
    REMOVE_ITEM(state, id) {
      state.items = state.items.filter(i => i.id !== id)
    },
  },
  getters: {
    totalCount: state => state.items.length,
    totalPrice: state => state.items.reduce((sum, i) => sum + i.price, 0),
  },
}
```

```js
// src/store/index.js
import user from './modules/user'
import cart from './modules/cart'

const store = new Vuex.Store({
  modules: { user, cart }
})
```

```js
// 组件中访问命名空间模块
export default {
  computed: {
    // 方式一：直接访问
    token() { return this.$store.state.user.token },
    isLoggedIn() { return this.$store.getters['user/isLoggedIn'] },
    totalCount() { return this.$store.getters['cart/totalCount'] },

    // 方式二：mapState 指定命名空间
    ...mapState('user', ['userInfo', 'token']),
    ...mapGetters('user', ['isLoggedIn']),
    ...mapGetters('cart', ['totalCount', 'totalPrice']),
  },
  methods: {
    ...mapActions('user', ['login', 'logout']),
    ...mapMutations('cart', ['ADD_ITEM', 'REMOVE_ITEM']),
  }
}
```

---

## 实际项目结构

```
src/store/
├── index.js          # 入口，组合所有模块
└── modules/
    ├── user.js       # 用户认证、信息
    ├── app.js        # 应用全局配置（主题、语言、侧边栏状态）
    ├── permission.js # 权限、动态路由
    └── cart.js       # 购物车（电商项目）
```

---

## 持久化（vuex-persistedstate）

```bash
npm install vuex-persistedstate
```

```js
import createPersistedState from 'vuex-persistedstate'

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'vuex',
      storage: localStorage,
      paths: ['user.token', 'user.userInfo'],  // 只持久化指定字段
    })
  ],
  modules: { user, cart }
})
```

---

## Vuex 与 Pinia 对比

| | Vuex 3/4 | Pinia |
|-|----------|-------|
| mutations | 必须通过 mutation 修改 state | 直接修改，无 mutation |
| 模块化 | 需要 `namespaced: true` 配置 | 每个 store 天然独立 |
| TypeScript | 有限支持，类型推导较弱 | 完整类型推导 |
| DevTools | 支持 | 支持 |
| 体积 | 较大 | ~1KB |
| 适用版本 | Vue2（Vuex 3）/ Vue3（Vuex 4） | Vue2 / Vue3 |
