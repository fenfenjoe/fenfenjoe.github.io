---
title: JavaScript 教程
sidebarDepth: 2
---

# JavaScript 教程

## 数组（Array）

### 创建数组

```js
const arr = [1, 2, 3]
const arr2 = new Array(3).fill(0)    // [0, 0, 0]
const arr3 = Array.from({ length: 3 }, (_, i) => i + 1)  // [1, 2, 3]
const arr4 = Array.from('hello')     // ['h', 'e', 'l', 'l', 'o']
```

---

### 增删元素

```js
const arr = [1, 2, 3]

// 末尾增删
arr.push(4, 5)       // [1, 2, 3, 4, 5]，返回新长度
arr.pop()            // [1, 2, 3, 4]，返回被删除的元素 5

// 开头增删
arr.unshift(0)       // [0, 1, 2, 3, 4]，返回新长度
arr.shift()          // [1, 2, 3, 4]，返回被删除的元素 0

// 任意位置增删（splice 会修改原数组）
// splice(起始下标, 删除个数, ...插入元素)
arr.splice(1, 0, 'a', 'b')   // 在下标1处插入，不删除 → [1, 'a', 'b', 2, 3, 4]
arr.splice(1, 2)              // 从下标1开始删除2个   → [1, 2, 3, 4]
arr.splice(1, 1, 'x')         // 替换下标1的元素      → [1, 'x', 3, 4]
```

---

### 查找元素

```js
const arr = [1, 2, 3, 2, 4]

arr.indexOf(2)            // 1，第一次出现的下标，找不到返回 -1
arr.lastIndexOf(2)        // 3，最后一次出现的下标
arr.includes(3)           // true，是否包含

// find / findIndex：按条件查找（返回第一个匹配项）
const users = [{ id: 1, name: 'Tom' }, { id: 2, name: 'Jerry' }]
users.find(u => u.id === 2)        // { id: 2, name: 'Jerry' }
users.findIndex(u => u.id === 2)   // 1
users.findLast(u => u.id < 3)      // { id: 2, name: 'Jerry' }（从后往前找）
```

---

### 遍历

```js
const arr = [1, 2, 3]

// forEach：无返回值，纯遍历
arr.forEach((item, index) => {
  console.log(index, item)
})

// for...of：最简洁，支持 break/continue
for (const item of arr) {
  if (item === 2) break
  console.log(item)
}

// 同时获取下标和值
for (const [index, item] of arr.entries()) {
  console.log(index, item)
}
```

---

### 转换（返回新数组，不修改原数组）

```js
const arr = [1, 2, 3, 4, 5]

// map：逐项转换
arr.map(x => x * 2)              // [2, 4, 6, 8, 10]

// filter：过滤
arr.filter(x => x > 2)           // [3, 4, 5]

// reduce：累积计算
arr.reduce((acc, x) => acc + x, 0)         // 15（求和）
arr.reduce((acc, x) => acc * x, 1)         // 120（求积）

// 常用 reduce 场景：数组转对象
const users = [{ id: 1, name: 'Tom' }, { id: 2, name: 'Jerry' }]
const userMap = users.reduce((acc, u) => {
  acc[u.id] = u
  return acc
}, {})
// { 1: { id: 1, name: 'Tom' }, 2: { id: 2, name: 'Jerry' } }

// flat：展平嵌套数组
[1, [2, [3, [4]]]].flat()     // [1, 2, [3, [4]]]，默认展平一层
[1, [2, [3, [4]]]].flat(2)    // [1, 2, 3, [4]]，展平两层
[1, [2, [3, [4]]]].flat(Infinity)  // [1, 2, 3, 4]，全部展平

// flatMap：map + flat(1) 的组合
['hello world', 'foo bar'].flatMap(s => s.split(' '))
// ['hello', 'world', 'foo', 'bar']
```

---

### 排序

```js
const arr = [3, 1, 4, 1, 5, 9]

// sort 默认按 Unicode 排序（数字会有问题！）
[10, 9, 2].sort()             // ❌ [10, 2, 9]，字符串排序

// 数字升序
arr.sort((a, b) => a - b)     // [1, 1, 3, 4, 5, 9]

// 数字降序
arr.sort((a, b) => b - a)     // [9, 5, 4, 3, 1, 1]

// 对象数组按字段排序
const users = [{ name: 'Tom', age: 25 }, { name: 'Anna', age: 20 }]
users.sort((a, b) => a.age - b.age)          // 按年龄升序
users.sort((a, b) => a.name.localeCompare(b.name))  // 按姓名字母序

// toSorted：不修改原数组（ES2023）
const sorted = arr.toSorted((a, b) => a - b)
```

---

### 截取与合并

```js
const arr = [1, 2, 3, 4, 5]

// slice：截取片段（不修改原数组）
arr.slice(1, 3)     // [2, 3]，含头不含尾
arr.slice(-2)       // [4, 5]，负数从末尾算
arr.slice()         // [1, 2, 3, 4, 5]，浅拷贝整个数组

// concat：合并数组（不修改原数组）
[1, 2].concat([3, 4], [5])   // [1, 2, 3, 4, 5]

// 展开运算符合并（更常用）
const merged = [...arr, ...arr2]
```

---

### 判断与统计

```js
const arr = [1, 2, 3, 4, 5]

arr.every(x => x > 0)    // true，是否全部满足条件
arr.some(x => x > 4)     // true，是否有至少一个满足条件
arr.length               // 5，数组长度

Array.isArray(arr)       // true，判断是否为数组
Array.isArray('hello')   // false
```

---

### 其他常用操作

```js
const arr = [1, 2, 3]

// join：数组转字符串
arr.join('-')            // '1-2-3'
arr.join('')             // '123'

// reverse：反转（修改原数组）
arr.reverse()            // [3, 2, 1]
arr.toReversed()         // 返回新数组，不修改原数组（ES2023）

// fill：填充
new Array(5).fill(0)         // [0, 0, 0, 0, 0]
arr.fill(0, 1, 3)            // 将下标 1~2 填为 0

// 数组去重（配合 Set）
const unique = [...new Set([1, 2, 2, 3, 3])]   // [1, 2, 3]

// 数组解构
const [first, second, ...rest] = [1, 2, 3, 4, 5]
// first=1, second=2, rest=[3,4,5]
```

---

## Map

Map 是键值对集合，与普通对象的区别：**键可以是任意类型**（对象、函数、NaN 等），且保证插入顺序。

### 创建与基本操作

```js
// 创建空 Map
const map = new Map()

// 从数组初始化
const map2 = new Map([
  ['name', 'Tom'],
  ['age', 25],
  [{ id: 1 }, 'object key'],  // 键可以是对象
])

// 增 / 改（链式调用）
map.set('name', 'Tom')
   .set('age', 25)
   .set(true, 'boolean key')

// 查
map.get('name')       // 'Tom'
map.get('notExist')   // undefined

// 是否存在
map.has('name')       // true
map.has('email')      // false

// 删
map.delete('age')     // true，成功删除返回 true

// 清空
map.clear()

// 大小
map.size              // 数量（注意不是 .length）
```

---

### 遍历

```js
const map = new Map([['a', 1], ['b', 2], ['c', 3]])

// forEach
map.forEach((value, key) => {
  console.log(key, value)   // 注意：回调参数顺序是 value, key
})

// for...of（推荐）
for (const [key, value] of map) {
  console.log(key, value)
}

// 只遍历键 / 只遍历值
for (const key of map.keys()) { ... }
for (const value of map.values()) { ... }

// 转为数组
const entries = [...map]          // [['a',1], ['b',2], ['c',3]]
const keys = [...map.keys()]      // ['a', 'b', 'c']
const values = [...map.values()]  // [1, 2, 3]
```

---

### Map 与对象互转

```js
const obj = { name: 'Tom', age: 25 }

// 对象 → Map
const map = new Map(Object.entries(obj))

// Map → 对象（键必须是字符串/Symbol）
const obj2 = Object.fromEntries(map)
// { name: 'Tom', age: 25 }
```

---

### 适用场景

```js
// ① 用对象作为键（普通对象做不到）
const cache = new Map()
const domEl = document.querySelector('#app')
cache.set(domEl, { clicks: 0 })

// ② 需要频繁增删键值对（比对象性能更好）
const registry = new Map()
registry.set('handler1', fn1)
registry.delete('handler1')

// ③ 需要知道键值对数量
console.log(registry.size)   // 比 Object.keys(obj).length 更直接

// ④ 统计词频
const words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
const freq = new Map()
for (const word of words) {
  freq.set(word, (freq.get(word) ?? 0) + 1)
}
// Map { 'apple' => 3, 'banana' => 2, 'cherry' => 1 }
```

---

## Set

Set 是值的集合，**自动去重，保证每个值只出现一次**。

### 创建与基本操作

```js
// 创建空 Set
const set = new Set()

// 从数组初始化（自动去重）
const set2 = new Set([1, 2, 2, 3, 3, 3])
// Set { 1, 2, 3 }

// 增
set.add(1).add(2).add(3).add(2)  // 链式，重复值被忽略
// Set { 1, 2, 3 }

// 是否存在
set.has(1)    // true
set.has(99)   // false

// 删
set.delete(2)   // true
set.clear()     // 清空

// 大小
set.size        // 数量
```

---

### 遍历

```js
const set = new Set(['a', 'b', 'c'])

// for...of（推荐）
for (const item of set) {
  console.log(item)
}

// forEach
set.forEach(item => console.log(item))

// 转数组
const arr = [...set]           // ['a', 'b', 'c']
const arr2 = Array.from(set)   // ['a', 'b', 'c']
```

---

### 集合运算

```js
const a = new Set([1, 2, 3, 4])
const b = new Set([3, 4, 5, 6])

// 并集
const union = new Set([...a, ...b])
// Set { 1, 2, 3, 4, 5, 6 }

// 交集
const intersection = new Set([...a].filter(x => b.has(x)))
// Set { 3, 4 }

// 差集（a 有但 b 没有）
const difference = new Set([...a].filter(x => !b.has(x)))
// Set { 1, 2 }

// 子集判断（b 是否是 a 的子集）
const isSubset = [...b].every(x => a.has(x))   // false
```

---

### 适用场景

```js
// ① 数组去重（最常用）
const arr = [1, 2, 2, 3, 3, 3]
const unique = [...new Set(arr)]   // [1, 2, 3]

// ② 快速判断某值是否在集合中（比数组 includes 性能好）
const allowedRoles = new Set(['admin', 'editor', 'viewer'])
if (allowedRoles.has(userRole)) { /* 有权限 */ }

// ③ 统计不重复数量
const visitors = ['user1', 'user2', 'user1', 'user3']
const uniqueCount = new Set(visitors).size   // 3

// ④ 标签/权限去重合并
const tagsA = ['vue', 'js', 'css']
const tagsB = ['js', 'ts', 'vue']
const allTags = [...new Set([...tagsA, ...tagsB])]
// ['vue', 'js', 'css', 'ts']
```

---

### Map、Set、Object、Array 对比

| | Object | Array | Map | Set |
|-|--------|-------|-----|-----|
| 键/索引类型 | 字符串/Symbol | 数字 | 任意类型 | — |
| 值重复 | 键不可重复 | 可重复 | 键不可重复 | 值不可重复 |
| 有序 | 不保证 | 有序 | 插入有序 | 插入有序 |
| 大小获取 | `Object.keys().length` | `.length` | `.size` | `.size` |
| 适用场景 | 结构化数据（JSON） | 有序列表 | 任意键的映射 | 去重/集合运算 |

---

## 模块（Module）

### 命名导出与导入

一个文件可以有**多个命名导出**，导入时名称必须对应。

```js
// utils/math.js —— 命名导出
export const PI = 3.14159

export function add(a, b) {
  return a + b
}

export function multiply(a, b) {
  return a * b
}
```

```js
// main.js —— 命名导入
import { add, multiply } from './utils/math.js'

add(1, 2)        // 3
multiply(3, 4)   // 12

// 导入时重命名（as）
import { add as sum } from './utils/math.js'
sum(1, 2)        // 3

// 导入全部（命名空间导入）
import * as Math from './utils/math.js'
Math.add(1, 2)
Math.PI          // 3.14159
```

---

### 默认导出与导入

一个文件**只能有一个**默认导出，导入时可以使用任意名称。

```js
// utils/request.js —— 默认导出
const request = {
  get(url) { /* ... */ },
  post(url, data) { /* ... */ },
}

export default request
```

```js
// main.js —— 默认导入（名称随意）
import request from './utils/request.js'
import myRequest from './utils/request.js'  // 同一模块，名称不同也可以
```

---

### 混合导出（默认 + 命名）

实际项目中最常见的模式：

```js
// api/user.js
import request from '@/utils/request'

// 命名导出：具体的 API 方法
export function getUserInfo(id) {
  return request.get(`/user/${id}`)
}

export function updateUser(id, data) {
  return request.put(`/user/${id}`, data)
}

export function deleteUser(id) {
  return request.delete(`/user/${id}`)
}

// 默认导出：聚合所有方法（可选）
export default { getUserInfo, updateUser, deleteUser }
```

```js
// 使用时按需导入（Tree-shaking 友好）
import { getUserInfo, updateUser } from '@/api/user'

// 或者导入默认导出
import userApi from '@/api/user'
userApi.getUserInfo(1)
```

---

### 重新导出（聚合导出）

用于将多个模块的导出集中到一个入口文件，方便统一引用。

```js
// api/index.js —— 聚合所有 API 模块
export { getUserInfo, updateUser } from './user'
export { getOrderList, createOrder } from './order'
export { getProductList } from './product'

// 重新导出默认导出
export { default as request } from '@/utils/request'
```

```js
// 其他文件只需从一个入口引入
import { getUserInfo, getOrderList, getProductList } from '@/api'
```

---

### 动态导入

在运行时按需加载模块，返回 Promise，适合路由懒加载、条件加载等场景。

```js
// 基础用法
const module = await import('./utils/math.js')
module.add(1, 2)

// 解构导入
const { add, multiply } = await import('./utils/math.js')

// 条件加载（根据用户权限加载不同模块）
async function loadAdminModule() {
  if (user.role === 'admin') {
    const { AdminPanel } = await import('./components/AdminPanel.vue')
    return AdminPanel
  }
}

// Vue Router 路由懒加载（最常见的场景）
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/DashboardView.vue')
  }
]
```

---

### 在 Vue3 项目中的实际用法

**API 层（`src/api/`）：**

```js
// src/api/user.js
import request from '@/utils/request'

export const getUserInfo = (id) => request.get(`/user/${id}`)
export const getUserList = (params) => request.get('/user/list', { params })
export const createUser = (data) => request.post('/user', data)
export const updateUser = (id, data) => request.put(`/user/${id}`, data)
export const deleteUser = (id) => request.delete(`/user/${id}`)
```

**工具函数（`src/utils/`）：**

```js
// src/utils/format.js
export function formatDate(date, fmt = 'YYYY-MM-DD') { /* ... */ }
export function formatMoney(amount) {
  return `¥${amount.toFixed(2)}`
}
export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)}KB`
  return `${(bytes / 1024 ** 2).toFixed(1)}MB`
}
```

**常量（`src/constants/`）：**

```js
// src/constants/status.js
export const ORDER_STATUS = {
  PENDING: 0,
  PAID: 1,
  SHIPPED: 2,
  DONE: 3,
  CANCELLED: 4,
}

export const ORDER_STATUS_LABEL = {
  [ORDER_STATUS.PENDING]: '待付款',
  [ORDER_STATUS.PAID]: '已付款',
  [ORDER_STATUS.SHIPPED]: '已发货',
  [ORDER_STATUS.DONE]: '已完成',
  [ORDER_STATUS.CANCELLED]: '已取消',
}
```

**Composable（`src/composables/`）：**

```js
// src/composables/useUserList.js
import { ref, reactive, onMounted } from 'vue'
import { getUserList } from '@/api/user'

// 封装可复用的数据逻辑，在任意组件中导入使用
export function useUserList() {
  const list = ref([])
  const loading = ref(false)
  const pagination = reactive({ page: 1, pageSize: 10, total: 0 })

  const loadData = async () => {
    loading.value = true
    try {
      const res = await getUserList({ page: pagination.page, pageSize: pagination.pageSize })
      list.value = res.list
      pagination.total = res.total
    } finally {
      loading.value = false
    }
  }

  onMounted(loadData)

  return { list, loading, pagination, loadData }
}
```

```vue
<!-- 在组件中使用 composable -->
<script setup>
import { useUserList } from '@/composables/useUserList'

const { list, loading, pagination, loadData } = useUserList()
</script>
```

---

### CommonJS vs ES Module 速查

| | CommonJS（Node.js 老项目） | ES Module（现代标准） |
|-|--------------------------|---------------------|
| 导出 | `module.exports = ...` | `export` / `export default` |
| 导入 | `require('./file')` | `import ... from './file'` |
| 动态导入 | `require()` 可在任意位置调用 | `import()` 函数（返回 Promise） |
| 加载时机 | 运行时同步加载 | 编译时静态分析 |
| Tree-shaking | 不支持 | 支持 |
| 浏览器支持 | 不支持 | 原生支持（现代浏览器） |
