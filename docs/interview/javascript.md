---
title: javascript
sidebar: 'heading'
---

# javascript

## ⭐解释闭包及其使用场景

**什么是闭包：**

闭包是指**函数能够记住并访问其定义时所在的词法作用域**，即使该函数在其词法作用域之外执行。本质是：内层函数 + 对外层函数变量的引用。

```js
function outer() {
  let count = 0          // 外层变量

  function inner() {
    count++              // 内层函数引用了外层变量
    console.log(count)
  }

  return inner
}

const fn = outer()       // outer 执行完毕，但 count 不会被销毁
fn()  // 1
fn()  // 2
fn()  // 3  —— count 一直保持在内存中
```

**闭包的两个核心特性：**
1. 内层函数可以访问外层函数的变量
2. 外层函数执行完毕后，被内层函数引用的变量**不会被垃圾回收**

**常见使用场景：**

**① 封装私有变量（模块模式）**

```js
function createCounter() {
  let count = 0  // 外部无法直接访问

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  }
}

const counter = createCounter()
counter.increment()  // 1
counter.increment()  // 2
console.log(counter.count)  // undefined，外部访问不到
```

**② 函数工厂（生成带参数记忆的函数）**

```js
function multiply(x) {
  return (y) => x * y   // 记住了 x
}

const double = multiply(2)
const triple = multiply(3)

double(5)  // 10
triple(5)  // 15
```

**③ 在循环中保留变量（经典面试题）**

```js
// ❌ 问题：var 没有块作用域，所有回调共享同一个 i
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)  // 输出 3 3 3
}

// ✅ 方案一：let（块作用域，每次循环都是新的 i）
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)  // 输出 0 1 2
}

// ✅ 方案二：用闭包（IIFE）捕获每次的 i 值
for (var i = 0; i < 3; i++) {
  ((j) => setTimeout(() => console.log(j), 0))(i)  // 输出 0 1 2
}
```

**④ 实际开发中：防抖/节流（见下题）**

**闭包的缺点：**

被引用的变量无法被 GC 回收，如果闭包过多或引用了大对象，会造成**内存泄漏**。不再使用时应将变量置为 `null`。

---

## ⭐什么是事件循环（Event Loop）？宏任务与微任务有哪些？

**JavaScript 是单线程的**，但通过事件循环机制实现了"非阻塞"的异步能力。

**执行模型：**

```
调用栈（Call Stack）          任务队列
┌────────────────┐           ┌─────────────────────────────────┐
│  当前执行的代码  │  ←──────  │ 微任务队列（优先）：Promise.then  │
│                │           │ 宏任务队列（其次）：setTimeout    │
└────────────────┘           └─────────────────────────────────┘
```

**事件循环流程：**

1. 执行同步代码（调用栈清空）
2. 清空**全部**微任务队列
3. 取出**一个**宏任务执行
4. 再次清空微任务队列
5. 重复 3 → 4

**常见任务分类：**

| 类型 | 包含 |
|------|------|
| **微任务**（优先级高） | `Promise.then/catch/finally`、`queueMicrotask`、`MutationObserver` |
| **宏任务**（优先级低） | `setTimeout`、`setInterval`、`setImmediate`、I/O、UI 渲染 |

**经典输出题：**

```js
console.log('1')               // 同步

setTimeout(() => {
  console.log('2')             // 宏任务
}, 0)

Promise.resolve()
  .then(() => console.log('3')) // 微任务
  .then(() => console.log('4')) // 微任务

console.log('5')               // 同步

// 输出顺序：1 → 5 → 3 → 4 → 2
```

**分析：**
1. 同步：输出 `1`、`5`
2. 调用栈清空，清空微任务：输出 `3`、`4`
3. 取一个宏任务：输出 `2`

---

## ⭐this 的指向规则有哪些？

`this` 的值取决于**函数的调用方式**，而不是函数定义的位置（箭头函数除外）。

**规则一：默认绑定**

独立调用函数，非严格模式下 `this` 指向 `window`，严格模式下为 `undefined`。

```js
function fn() {
  console.log(this)
}
fn()  // window（浏览器）/ undefined（严格模式）
```

**规则二：隐式绑定**

作为对象的方法调用，`this` 指向**调用它的对象**。

```js
const obj = {
  name: 'Tom',
  greet() {
    console.log(this.name)
  }
}
obj.greet()  // 'Tom'，this 指向 obj

// ⚠️ 隐式丢失：把方法赋值给变量再调用
const fn = obj.greet
fn()  // undefined，this 变成 window
```

**规则三：显式绑定**

通过 `call`、`apply`、`bind` 手动指定 `this`。

```js
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`)
}

const user = { name: 'Tom' }

greet.call(user, 'Hello')        // Hello, Tom（立即调用）
greet.apply(user, ['Hello'])     // Hello, Tom（参数用数组）
const boundFn = greet.bind(user) // 返回新函数，不立即调用
boundFn('Hi')                    // Hi, Tom
```

**规则四：new 绑定**

用 `new` 调用构造函数，`this` 指向**新创建的对象**。

```js
function Person(name) {
  this.name = name  // this 指向新对象
}

const p = new Person('Tom')
console.log(p.name)  // 'Tom'
```

**规则五：箭头函数**

箭头函数**没有自己的 `this`**，它继承外层函数（词法作用域）的 `this`，且无法被 `call/apply/bind` 改变。

```js
const obj = {
  name: 'Tom',
  // ❌ 普通函数：this 取决于调用方式
  greet: function() {
    setTimeout(function() {
      console.log(this.name)  // undefined，this 是 window
    }, 100)
  },
  // ✅ 箭头函数：继承外层 this（obj）
  greet2: function() {
    setTimeout(() => {
      console.log(this.name)  // 'Tom'
    }, 100)
  }
}
```

**优先级：** `new` > 显式绑定 > 隐式绑定 > 默认绑定

---

## ⭐解释原型链及 instanceof 原理

**原型链：**

每个对象都有一个内部属性 `[[Prototype]]`（通过 `__proto__` 访问），指向它的**原型对象**。访问一个属性时，如果对象自身没有，会沿着原型链向上查找，直到找到或到达 `null`。

```js
function Animal(name) {
  this.name = name
}
Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`)
}

const dog = new Animal('Dog')

// 原型链：dog → Animal.prototype → Object.prototype → null
dog.speak()          // 在 Animal.prototype 上找到
dog.toString()       // 在 Object.prototype 上找到
dog.notExist         // undefined，到 null 没找到
```

**new 操作符做了什么：**

```js
// new Animal('Dog') 等价于：
const dog = {}
dog.__proto__ = Animal.prototype   // 1. 设置原型
Animal.call(dog, 'Dog')            // 2. 执行构造函数，this 指向新对象
// 3. 返回新对象（若构造函数无显式 return 对象）
```

**原型链示意：**

```
dog
 ├── name: 'Dog'（自身属性）
 └── __proto__ → Animal.prototype
                  ├── speak: function
                  └── __proto__ → Object.prototype
                                   ├── toString: function
                                   ├── hasOwnProperty: function
                                   └── __proto__ → null
```

**instanceof 原理：**

`A instanceof B` 沿着 `A` 的原型链向上查找，看是否能找到 `B.prototype`。

```js
dog instanceof Animal  // true：dog.__proto__ === Animal.prototype
dog instanceof Object  // true：沿链继续找到 Object.prototype

// 手动实现 instanceof
function myInstanceof(obj, Constructor) {
  let proto = Object.getPrototypeOf(obj)  // 获取 obj 的原型
  while (proto !== null) {
    if (proto === Constructor.prototype) return true
    proto = Object.getPrototypeOf(proto)  // 沿链向上
  }
  return false
}
```

**ES6 class 只是语法糖，底层依然是原型链：**

```js
class Animal {
  constructor(name) { this.name = name }
  speak() { console.log(this.name) }
}
class Dog extends Animal {
  bark() { console.log('Woof!') }
}

const d = new Dog('Rex')
// 原型链：d → Dog.prototype → Animal.prototype → Object.prototype → null
```

---

## ⭐什么是 Promise？与 async/await 的关系

**Promise：**

Promise 是异步编程的解决方案，代表一个**将来才会有结果**的操作，避免了回调地狱。

**三种状态（不可逆）：**
- `pending`（进行中）→ `fulfilled`（已成功）
- `pending`（进行中）→ `rejected`（已失败）

```js
// 创建 Promise
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true
    if (success) {
      resolve('成功的数据')   // 变为 fulfilled
    } else {
      reject(new Error('失败原因'))  // 变为 rejected
    }
  }, 1000)
})

// 消费 Promise
p.then(data => console.log(data))       // 成功回调
 .catch(err => console.error(err))      // 失败回调
 .finally(() => console.log('结束'))    // 无论成败都执行
```

**链式调用（解决回调地狱）：**

```js
// ❌ 回调地狱
getUser(id, (user) => {
  getOrders(user.id, (orders) => {
    getDetail(orders[0].id, (detail) => {
      console.log(detail)  // 嵌套越来越深
    })
  })
})

// ✅ Promise 链式
getUser(id)
  .then(user => getOrders(user.id))
  .then(orders => getDetail(orders[0].id))
  .then(detail => console.log(detail))
  .catch(err => console.error(err))  // 统一处理任意一步的错误
```

**常用静态方法：**

```js
// 并行等待所有请求，全部成功才 resolve，一个失败就 reject
Promise.all([p1, p2, p3]).then(([r1, r2, r3]) => {})

// 并行，全部结束后返回每个结果的状态（不管成败）
Promise.allSettled([p1, p2]).then(results => {})

// 并行，返回最快完成的那个（无论成败）
Promise.race([p1, p2]).then(first => {})

// 并行，返回最快成功的那个
Promise.any([p1, p2]).then(first => {})
```

**async/await 是 Promise 的语法糖：**

`async/await` 让异步代码看起来像同步代码，本质上仍是 Promise。

```js
// 两种写法完全等价
// Promise 写法
function fetchUser(id) {
  return api.getUser(id)
    .then(user => api.getOrders(user.id))
    .then(orders => orders[0])
    .catch(err => console.error(err))
}

// async/await 写法（更直观）
async function fetchUser(id) {
  try {
    const user = await api.getUser(id)      // 等待 Promise resolve
    const orders = await api.getOrders(user.id)
    return orders[0]
  } catch (err) {
    console.error(err)
  }
}
```

**关系总结：**

| | Promise | async/await |
|--|---------|-------------|
| 本质 | 异步操作的封装 | Promise 的语法糖 |
| 错误处理 | `.catch()` | `try/catch` |
| 可读性 | 链式，多层时较绕 | 接近同步代码，更直观 |
| 并行请求 | `Promise.all()` | `await Promise.all()` |

---

## ⭐解释变量提升和暂时性死区

**变量提升（Hoisting）：**

`var` 声明和函数声明会在代码执行前被"提升"到作用域顶部，但**只提升声明，不提升赋值**。

```js
// 代码书写顺序
console.log(a)  // undefined（不报错！声明被提升了）
var a = 10
console.log(a)  // 10

// JS 引擎实际执行顺序（等价于）
var a           // 提升声明，初始化为 undefined
console.log(a)  // undefined
a = 10          // 赋值留在原地
console.log(a)  // 10
```

函数声明整体提升（包括函数体）：

```js
fn()  // 'hello'，可以在声明前调用
function fn() { console.log('hello') }

// 但函数表达式不会提升函数体：
fn2()  // TypeError: fn2 is not a function
var fn2 = function() { console.log('hello') }
// 等价于：var fn2 = undefined; fn2()  → 报错
```

**暂时性死区（Temporal Dead Zone，TDZ）：**

`let` 和 `const` 声明的变量虽然也会被提升，但在**声明语句之前无法访问**，这段区域称为暂时性死区。访问会抛出 `ReferenceError`。

```js
console.log(b)  // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 20
console.log(b)  // 20

// ⚠️ 在同名函数参数中也会出现 TDZ
function test(x = y, y = 2) {  // y 在 x 的默认值中还未初始化
  return [x, y]
}
test()  // ReferenceError
```

**`var` / `let` / `const` 对比：**

| | `var` | `let` | `const` |
|-|-------|-------|---------|
| 作用域 | 函数作用域 | 块作用域 | 块作用域 |
| 变量提升 | ✅（初始化为 undefined） | ✅（但有 TDZ） | ✅（但有 TDZ） |
| 重复声明 | ✅ | ❌ | ❌ |
| 重新赋值 | ✅ | ✅ | ❌ |
| 挂载到 window | ✅ | ❌ | ❌ |

**现代开发建议：** 默认用 `const`，需要重新赋值时用 `let`，禁用 `var`。

---

## ⭐节流和防抖的区别及实现

两者都是**限制函数高频执行**的优化手段，区别在于触发策略不同。

**防抖（Debounce）：**

事件触发后等待 n 毫秒再执行，如果等待期间**再次触发则重新计时**。适合"停下来之后才处理"的场景。

```
触发：  ─▼──▼──▼──────▼──▼──────────▼
执行：  ────────────────────────────►  ← 只在最后一次触发后的 n ms 后执行
```

```js
function debounce(fn, delay) {
  let timer = null

  return function(...args) {
    clearTimeout(timer)  // 每次触发都清除上一个定时器
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 使用：搜索框输入停止 500ms 后才发请求
const handleSearch = debounce((keyword) => {
  api.search(keyword)
}, 500)

input.addEventListener('input', (e) => handleSearch(e.target.value))
```

**节流（Throttle）：**

n 毫秒内只执行一次，无论触发多少次。适合"持续触发但要均匀响应"的场景。

```
触发：  ─▼──▼──▼──▼──▼──▼──▼──▼──▼
执行：  ─▼────────▼────────▼────────  ← 每隔 n ms 最多执行一次
```

```js
function throttle(fn, interval) {
  let lastTime = 0

  return function(...args) {
    const now = Date.now()
    if (now - lastTime >= interval) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

// 使用：滚动事件每 200ms 最多触发一次
const handleScroll = throttle(() => {
  console.log('scroll position:', window.scrollY)
}, 200)

window.addEventListener('scroll', handleScroll)
```

**对比总结：**

| | 防抖（Debounce） | 节流（Throttle） |
|-|-----------------|-----------------|
| 执行时机 | 停止触发 n ms 后执行 | 每隔 n ms 最多执行一次 |
| 连续触发期间 | 一直不执行（一直重置） | 均匀执行 |
| 适用场景 | 搜索框输入、表单校验、窗口 resize 结束 | 滚动加载、鼠标移动、按钮防重复点击 |
