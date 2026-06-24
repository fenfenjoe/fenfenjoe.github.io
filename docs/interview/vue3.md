---
title: vue
sidebar: 'heading'
---

# Vue3 面试题

## ⭐什么是组合式 API（Composition API）？有哪些常用函数？

组合式 API 是 Vue3 提供的一套基于函数的 API，允许将同一逻辑关注点的代码组织在一起，替代 Options API 中分散在 `data / methods / computed / watch` 各选项中的写法。通过 `<script setup>` 语法糖使用，是 Vue3 的推荐写法。

**核心分类：**

**1. 响应式 API**（见下题）

**2. 生命周期钩子**

```js
import { onMounted, onBeforeUnmount } from 'vue'

onMounted(() => { /* 组件挂载后 */ })
onBeforeUnmount(() => { /* 组件卸载前，做清理 */ })
```

**3. 依赖注入**

```js
import { provide, inject } from 'vue'

// 祖先组件
provide('theme', ref('dark'))

// 后代组件
const theme = inject('theme')
```

**4. 编译器宏（仅 `<script setup>` 中使用，无需 import）**

| 宏 | 作用 |
|----|------|
| `defineProps` | 声明组件接收的 props |
| `defineEmits` | 声明组件可触发的事件 |
| `defineExpose` | 暴露属性/方法给父组件（通过 ref） |
| `defineOptions` | 声明组件名、inheritAttrs 等选项 |
| `withDefaults` | 为 `defineProps` 设置默认值 |

```vue
<script setup>
// defineProps 带默认值
const props = withDefaults(defineProps({
  title: String,
  size: { type: Number }
}), {
  title: '默认标题',
  size: 14
})

// defineEmits
const emit = defineEmits(['submit', 'cancel'])

// defineExpose
defineExpose({ reset: () => form.value = {} })
</script>
```

**5. 辅助函数**

| 函数 | 作用 |
|----|------|
| `useAttrs()` | 获取透传属性 |
| `useSlots()` | 获取插槽 |
| `useTemplateRef()` | 获取模板 ref（Vue 3.5+） |

## ⭐什么是响应式 API？有哪些常用函数？

响应式 API 是 Vue3 Composition API 的核心，用于创建和操作响应式数据。数据变化时，依赖该数据的视图和计算会自动更新。

**创建响应式数据：**

| API | 说明 | 适用类型 |
|-----|------|---------|
| `ref(value)` | 创建响应式引用，通过 `.value` 访问 | 任意类型 |
| `reactive(object)` | 创建响应式对象，直接访问属性 | 对象/数组 |
| `shallowRef(value)` | 浅层响应，只有 `.value` 本身是响应式的 | 任意类型 |
| `shallowReactive(obj)` | 浅层响应，只有第一层属性是响应式的 | 对象 |
| `readonly(obj)` | 创建只读代理，防止修改 | 对象/ref |

**派生响应式数据：**

| API | 说明 |
|-----|------|
| `computed(getter)` | 基于依赖缓存的计算属性 |
| `toRef(obj, key)` | 将 reactive 对象的某个属性转为 ref |
| `toRefs(obj)` | 将整个 reactive 对象的属性批量转为 ref（解构用） |

```js
const state = reactive({ count: 0, name: 'Tom' })

// ✅ 解构时用 toRefs 保持响应式
const { count, name } = toRefs(state)

// ✅ 单个属性用 toRef
const count = toRef(state, 'count')
```

**侦听响应式变化：**

| API | 说明 |
|-----|------|
| `watch(source, cb, options)` | 侦听指定来源，可获取新旧值 |
| `watchEffect(cb)` | 自动追踪依赖，立即执行 |
| `watchPostEffect(cb)` | 等 DOM 更新后执行的 watchEffect |

**工具函数：**

| API | 说明 |
|-----|------|
| `isRef(val)` | 判断是否是 ref |
| `isReactive(val)` | 判断是否是 reactive 代理 |
| `unref(val)` | 若是 ref 则返回 `.value`，否则原样返回 |
| `triggerRef(ref)` | 手动触发 shallowRef 的更新 |

## ⭐Vue3 生命周期钩子有哪些？与 Vue2 有何区别？

**Vue3 Composition API 生命周期钩子（`<script setup>` 中使用）：**

| 阶段 | 钩子 | 说明 |
|------|------|------|
| 创建 | ——（无对应钩子） | `setup()` 本身相当于 beforeCreate + created |
| 挂载前 | `onBeforeMount` | DOM 尚未生成 |
| 挂载后 | `onMounted` | 可访问 DOM、初始化第三方库 |
| 更新前 | `onBeforeUpdate` | 数据变化，DOM 还未更新 |
| 更新后 | `onUpdated` | 避免在此钩子中修改数据（会导致循环） |
| 卸载前 | `onBeforeUnmount` | 清理定时器、取消事件监听 |
| 卸载后 | `onUnmounted` | 组件已完全卸载 |
| keep-alive | `onActivated` / `onDeactivated` | 组件被缓存/激活时触发 |
| 错误捕获 | `onErrorCaptured` | 捕获子孙组件的错误 |

**Vue2 → Vue3 的变化：**

- `beforeCreate` / `created` → 被 `setup()` 取代，无对应钩子
- `beforeDestroy` / `destroyed` → 改名为 `beforeUnmount` / `unmounted`
- 所有钩子改为以 `on` 开头的函数形式，在 `setup` 内注册

**实际开发常用：**

- `onMounted`：请求初始数据、操作 DOM、初始化图表/地图等第三方库
- `onBeforeUnmount`：清理定时器、取消事件监听、销毁第三方实例
- `onUnmounted`：彻底清理，防止内存泄漏

## ⭐谈谈 computed 和 watch 的区别与使用场景

**computed（计算属性）：**

- 基于响应式依赖**缓存**结果，只有依赖变化才重新计算
- 必须有返回值，不能有异步操作
- 适合：从现有数据派生出新数据（过滤、格式化、数学运算等）

```js
const fullName = computed(() => `${firstName.value} ${lastName.value}`)
const filteredList = computed(() => list.value.filter(item => item.active))
```

**watch（侦听器）：**

- 监听响应式数据的变化，执行**副作用**（无需返回值）
- 支持异步、可访问新旧值
- 适合：数据变化时发请求、操作 DOM、写 localStorage 等

```js
// 侦听单个 ref
watch(userId, async (newId) => {
  userData.value = await fetchUser(newId)
})

// 侦听多个来源
watch([a, b], ([newA, newB], [oldA, oldB]) => { ... })

// 深度侦听对象
watch(obj, (newVal) => { ... }, { deep: true })

// 立即执行
watch(source, callback, { immediate: true })
```

**watchEffect：**

- 自动追踪回调中用到的响应式依赖，立即执行一次
- 不需要明确指定侦听源

```js
watchEffect(() => {
  console.log(userId.value) // 自动追踪 userId
})
```

**核心区别总结：**

| | computed | watch | watchEffect |
|-|----------|-------|-------------|
| 返回值 | 必须有 | 无 | 无 |
| 缓存 | 有 | 无 | 无 |
| 异步 | 不支持 | 支持 | 支持 |
| 适合场景 | 派生数据 | 副作用（异步） | 自动追踪副作用 |

## ⭐ref 和 reactive 有什么区别？

**ref：**

- 可包裹任意类型（基本类型、对象、数组）
- 在 JS 中访问/修改需要加 `.value`，模板中自动解包无需 `.value`
- 推荐用于基本类型数据

```js
const count = ref(0)
count.value++           // JS 中需要 .value
// 模板中：{{ count }}  // 自动解包
```

**reactive：**

- 只能包裹**对象类型**（对象、数组、Map、Set），不支持基本类型
- 不需要 `.value`，直接访问属性
- 解构后会**失去响应式**

```js
const state = reactive({ count: 0, name: 'Tom' })
state.count++            // 直接修改

// ❌ 解构失去响应式
const { count } = state

// ✅ 用 toRefs 保持响应式
const { count } = toRefs(state)
```

**实践建议：**

- 优先使用 `ref`，统一 `.value` 访问方式，避免 `reactive` 解构陷阱
- 组合 `reactive` 适合将多个相关状态聚合为一个对象


## ⭐Vue3 的响应式原理是什么？与 Vue2 有何不同？

**Vue3：基于 Proxy**

```js
const proxy = new Proxy(target, {
  get(target, key, receiver) {
    track(target, key)  // 依赖收集
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    Reflect.set(target, key, value, receiver)
    trigger(target, key)  // 触发更新
    return true
  }
})
```

**Vue2：基于 Object.defineProperty**

```js
Object.defineProperty(obj, key, {
  get() { /* 依赖收集 */ },
  set(newVal) { /* 触发更新 */ }
})
```

**Vue3 Proxy 的优势：**

| | Vue2 (defineProperty) | Vue3 (Proxy) |
|-|-----------------------|--------------|
| 新增属性 | 不能检测，需 `$set` | 自动拦截 |
| 删除属性 | 不能检测，需 `$delete` | 自动拦截 |
| 数组变化 | 只能拦截 7 个变异方法 | 完整拦截 |
| 性能 | 初始化时递归劫持全部属性 | 惰性，按需深度代理 |
| 代码量 | 多 | 少 |

## ⭐组件间通信方式有哪些？

### 1. props / emit（父子通信）

父组件通过 `props` 向子组件传数据，子组件通过 `emit` 向父组件发事件。

```vue
<!-- 父组件 Parent.vue -->
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const count = ref(0)
const handleAdd = (val) => { count.value += val }
</script>

<template>
  <p>父组件 count：{{ count }}</p>
  <Child :count="count" @add="handleAdd" />
</template>
```

```vue
<!-- 子组件 Child.vue -->
<script setup>
defineProps({ count: Number })
const emit = defineEmits(['add'])
</script>

<template>
  <p>子组件接收 count：{{ count }}</p>
  <button @click="emit('add', 1)">+1</button>
</template>
```

### 2. v-model（父子双向绑定语法糖）

`v-model` 是 `:modelValue` + `@update:modelValue` 的语法糖，Vue3 支持多个 `v-model`。

```vue
<!-- 父组件 -->
<script setup>
import { ref } from 'vue'
const name = ref('Tom')
const age = ref(18)
</script>

<template>
  <!-- 单个 v-model -->
  <MyInput v-model="name" />
  <!-- 多个 v-model（Vue3 新增） -->
  <UserForm v-model:name="name" v-model:age="age" />
</template>
```

```vue
<!-- 子组件 MyInput.vue -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

### 3. defineExpose + ref（父调用子的方法）

子组件通过 `defineExpose` 暴露方法，父组件通过模板 ref 调用。

```vue
<!-- 子组件 FormComp.vue -->
<script setup>
import { ref } from 'vue'

const form = ref({ name: '', age: '' })

function reset() {
  form.value = { name: '', age: '' }
}

// 必须显式暴露，<script setup> 默认不对外暴露任何内容
defineExpose({ reset })
</script>
```

```vue
<!-- 父组件 -->
<script setup>
import { ref } from 'vue'
import FormComp from './FormComp.vue'

const formRef = ref(null)

function handleReset() {
  formRef.value.reset()  // 调用子组件暴露的方法
}
</script>

<template>
  <FormComp ref="formRef" />
  <button @click="handleReset">重置表单</button>
</template>
```

### 4. provide / inject（跨层级通信）

祖先组件提供数据，任意深度的后代组件注入使用，无需逐层传递 props。

```vue
<!-- 祖先组件 App.vue -->
<script setup>
import { ref, provide } from 'vue'

const theme = ref('dark')
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

// 提供响应式数据和方法
provide('theme', theme)
provide('toggleTheme', toggleTheme)
</script>
```

```vue
<!-- 深层后代组件（无需中间层传递） -->
<script setup>
import { inject } from 'vue'

const theme = inject('theme')              // 响应式，随祖先变化自动更新
const toggleTheme = inject('toggleTheme')
</script>

<template>
  <div :class="theme">
    <p>当前主题：{{ theme }}</p>
    <button @click="toggleTheme">切换</button>
  </div>
</template>
```

### 5. Pinia（任意组件间，推荐）

Pinia 是 Vue3 官方推荐的状态管理库，适合跨页面、兄弟组件等复杂场景。

```js
// stores/useCounterStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
})
```

```vue
<!-- 组件 A：修改数据 -->
<script setup>
import { useCounterStore } from '@/stores/useCounterStore'
const store = useCounterStore()
</script>
<template>
  <button @click="store.increment()">+1</button>
</template>
```

```vue
<!-- 组件 B（兄弟/任意层级）：读取数据 -->
<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/useCounterStore'
const { count } = storeToRefs(useCounterStore())
</script>
<template>
  <p>共享 count：{{ count }}</p>
</template>
```

### 6. mitt 事件总线（任意组件间）

Vue3 移除了 `$on/$off`，需借助第三方库 `mitt` 实现事件总线。

```bash
npm install mitt
```

```js
// utils/emitter.js —— 创建全局单例
import mitt from 'mitt'
export const emitter = mitt()
```

```vue
<!-- 发送方 ComponentA.vue -->
<script setup>
import { emitter } from '@/utils/emitter'

function sendMsg() {
  emitter.emit('user-login', { name: 'Tom', role: 'admin' })
}
</script>
<template>
  <button @click="sendMsg">触发登录事件</button>
</template>
```

```vue
<!-- 接收方 ComponentB.vue（任意位置） -->
<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { emitter } from '@/utils/emitter'

function handleLogin(user) {
  console.log('收到登录事件：', user)
}

onMounted(() => emitter.on('user-login', handleLogin))
// ⚠️ 必须在卸载时移除监听，避免内存泄漏
onBeforeUnmount(() => emitter.off('user-login', handleLogin))
</script>
```

### 通信方式总结

| 方式 | 方向 | 适用场景 |
|------|------|---------|
| props / emit | 父 ↔ 子 | 简单父子通信 |
| v-model | 父 ↔ 子 | 表单组件双向绑定 |
| defineExpose + ref | 父 → 子 | 父调用子的方法/访问子的数据 |
| provide / inject | 祖先 → 后代 | 跨层级、主题/配置注入 |
| Pinia | 任意 | 全局状态、跨页面共享（推荐） |
| mitt | 任意 | 无父子关系的事件通知 |

## ⭐`<script setup>` 是什么？有什么优势？

`<script setup>` 是 Composition API 的编译时语法糖，是 Vue3 单文件组件的推荐写法。

**优势：**
- 更简洁：顶层变量、函数、import 自动暴露给模板，无需手动 return
- 性能更好：编译器可做静态分析，生成更优代码
- 更好的 TypeScript 支持

```vue
<script setup>
import { ref, computed } from 'vue'
import ChildComp from './ChildComp.vue'

// 直接可在模板中使用，无需 return
const count = ref(0)
const double = computed(() => count.value * 2)

// 声明 props 和 emits
const props = defineProps({ title: String })
const emit = defineEmits(['update'])

// 暴露给父组件（通过 ref 调用）
defineExpose({ count, reset: () => count.value = 0 })
</script>
```

## ⭐Vue3 的 v-model 与 Vue2 有什么变化？

**Vue2 的 v-model：**
- 默认绑定 `value` prop + `input` 事件
- 每个组件只能有一个 `v-model`

**Vue3 的 v-model：**
- 默认绑定 `modelValue` prop + `update:modelValue` 事件
- 支持**多个 v-model**，通过参数区分

```vue
<!-- 父组件 -->
<MyInput v-model="name" />
<!-- 等价于 -->
<MyInput :modelValue="name" @update:modelValue="name = $event" />

<!-- 多个 v-model（Vue3 新增） -->
<UserForm v-model:name="name" v-model:age="age" />
```

```vue
<!-- 子组件 -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>
```

## ⭐什么是虚拟 DOM？优点是什么？

虚拟 DOM 是用 JS 对象描述真实 DOM 结构的轻量副本。当数据变化时，先对比新旧虚拟 DOM 树（diff 算法），找出最小差异，再批量更新真实 DOM。

**优点：**
- 减少直接操作 DOM 的频次，批量更新性能更好
- 跨平台：同一套虚拟 DOM 可渲染到浏览器、SSR、Native（如 Weex）
- 声明式编程，开发者无需手动操作 DOM

**缺点：**
- 首次渲染比直接操作 innerHTML 稍慢
- 存在额外内存开销

**Vue3 的 diff 优化（相比 Vue2）：**
- 静态提升：纯静态节点只创建一次，不参与 diff
- 补丁标志（PatchFlag）：标记动态节点类型，diff 时跳过静态内容
- Block Tree：将动态节点收集到 block 中，diff 只比较动态部分

## ⭐key 的作用是什么？为什么不能用 index？

`key` 是 Vue 给虚拟 DOM 节点的唯一标识，用于 diff 算法判断节点是否可以复用，避免不必要的重建，提升渲染性能。

**不能用 index 的原因：**

当数组发生增删、排序等操作时，index 会重新编号，导致 key 与实际内容错位，发生错误复用。

```
原始：[A(key=0), B(key=1), C(key=2)]
删除 A 后：[B(key=0), C(key=1)]
```

此时 Vue 认为 key=0 的节点没变，会把 B 的内容套到 A 原本的 DOM 上，造成状态错乱（尤其是有输入框、动画状态时）。

**正确做法：** 用业务唯一 ID（如 `item.id`）作为 key。

## ⭐Vue3 的 Composition API 相比 Options API 有什么优势？

| | Options API | Composition API |
|-|-------------|-----------------|
| 代码组织 | 按选项（data/methods/computed）分散 | 按功能聚合，可读性更强 |
| 逻辑复用 | mixin（命名冲突、来源不清晰） | composable 函数，清晰无副作用 |
| TypeScript | 支持较弱（this 类型推导困难） | 完整类型推导 |
| Tree-shaking | 不支持 | 按需引入，产物更小 |

**逻辑复用示例（composable）：**

```js
// useCounter.js
export function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  const reset = () => count.value = initial
  return { count, increment, reset }
}

// 任意组件中复用
const { count, increment } = useCounter(10)
```

## ⭐Pinia 是什么？核心概念有哪些？

Pinia 是 Vue3 官方推荐的状态管理库，是 Vuex 的替代方案。

**核心概念：**
- **state**：响应式状态数据
- **getters**：从 state 派生的计算值（类似 computed）
- **actions**：修改 state 的方法，支持同步和异步

```js
// 定义 store
export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const userInfo = ref(null)

  const isLoggedIn = computed(() => !!token.value)

  async function login(credentials) {
    const res = await api.login(credentials)
    token.value = res.token
    userInfo.value = res.user
  }

  function logout() {
    token.value = ''
    userInfo.value = null
  }

  return { token, userInfo, isLoggedIn, login, logout }
})
```

**与 Vuex 的区别：**

| | Pinia | Vuex 4 |
|-|-------|--------|
| mutations | 无（直接修改 state） | 必须通过 mutation |
| 模块化 | 天然支持（每个 store 独立） | 需要 modules 嵌套 |
| TypeScript | 完整支持 | 有限支持 |
| 体积 | ~1KB | 较大 |

## ⭐如何实现路由懒加载？

使用动态 `import()` 语法，路由组件只在首次访问时加载，配合 Vite/Webpack 代码分割：

```js
const routes = [
  {
    path: '/home',
    component: () => import('@/views/HomeView.vue')  // 懒加载
  },
  {
    path: '/user',
    // Vite：通过 rollupOptions.output.manualChunks 分组
    // Webpack：通过魔法注释分组到同一 chunk
    component: () => import(/* webpackChunkName: "user" */ '@/views/UserView.vue')
  }
]
```

## ⭐keep-alive 是什么？有哪些使用场景？

`<keep-alive>` 是 Vue 内置组件，用于缓存动态组件或路由组件，避免重复创建/销毁。

**被缓存的组件会触发：**
- `onActivated`：从缓存中被激活时
- `onDeactivated`：被切换走、进入缓存时

```vue
<!-- 缓存所有子组件 -->
<keep-alive>
  <component :is="currentTab" />
</keep-alive>

<!-- 只缓存指定组件 -->
<keep-alive include="['HomeView', 'UserList']" :max="10">
  <RouterView />
</keep-alive>
```

**使用场景：**
- 列表页 ↔ 详情页来回切换，保留列表滚动位置和搜索状态
- Tab 页签切换，避免重复请求
- 表单填写中途跳转，保留输入内容

## ⭐Teleport 组件有什么用？

`<Teleport>` 将组件的 DOM 渲染到指定的目标节点（脱离当前组件树的 DOM 位置），但组件逻辑仍属于当前组件。

**使用场景：** 模态框、Toast 通知、全局 Loading，避免父组件的 `overflow:hidden` 或 `z-index` 干扰。

```vue
<template>
  <button @click="open = true">打开弹窗</button>

  <!-- 将弹窗渲染到 body 下，而非当前组件 DOM 内 -->
  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>这是弹窗</p>
      <button @click="open = false">关闭</button>
    </div>
  </Teleport>
</template>
```

## ⭐Suspense 组件有什么用？

`<Suspense>` 用于处理异步组件的加载状态，提供 `#default`（内容）和 `#fallback`（加载中占位）两个插槽。

```vue
<Suspense>
  <!-- 异步组件加载完成后显示 -->
  <template #default>
    <AsyncUserPanel />
  </template>
  <!-- 加载中显示 -->
  <template #fallback>
    <LoadingSpinner />
  </template>
</Suspense>
```

异步组件配合 `defineAsyncComponent` 使用：

```js
const AsyncUserPanel = defineAsyncComponent(() => import('./UserPanel.vue'))
```

## ⭐Vue3 中如何封装一个自定义指令？

```js
// 全局注册
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

// 局部注册（script setup 中以 v 开头的变量自动识别为指令）
const vFocus = {
  mounted(el) { el.focus() }
}

// 带参数的指令
const vColor = {
  mounted(el, binding) {
    // binding.value：指令的值
    // binding.arg：指令参数（v-color:bg 中的 bg）
    // binding.modifiers：修饰符
    el.style.color = binding.value
  },
  updated(el, binding) {
    el.style.color = binding.value
  }
}
```

```vue
<input v-focus />
<p v-color="'red'">红色文字</p>
```

## ⭐Vue3 性能优化有哪些手段？

**编译优化（框架内置）：**
- 静态提升：静态节点和 Props 提升到渲染函数外部，只创建一次
- 补丁标志（PatchFlag）：diff 时只比较动态部分
- Tree-shaking：未使用的 API 不打包进产物

**代码层面优化：**
- `v-memo`：缓存子树，依赖不变时跳过重新渲染
- `computed` 替代 `method`（有缓存）
- `v-once`：只渲染一次，不参与更新
- 组件懒加载（`defineAsyncComponent`）
- 路由懒加载（动态 `import()`）
- `<keep-alive>` 缓存频繁切换的组件

**工程层面：**
- 图片懒加载（`v-lazy` / 原生 `loading="lazy"`）
- 长列表虚拟滚动（vue-virtual-scroller）
- Vite 生产构建代码分割、Tree-shaking
