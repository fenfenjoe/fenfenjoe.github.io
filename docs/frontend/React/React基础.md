---
title: React 基础
sidebarDepth: 2
---

# React 基础

## JSX 语法

JSX 是 JavaScript 的语法扩展，允许在 JS 中写类似 HTML 的标签结构。

### 基本规则

```jsx
// 1. 只能有一个根元素，可用 Fragment（<> </>）包裹
function App() {
  return (
    <>
      <h1>Hello</h1>
      <p>World</p>
    </>
  )
}

// 2. 标签必须闭合
const el = <img src="logo.png" />

// 3. 用 {} 嵌入 JavaScript 表达式
const name = 'Tom'
const el2 = <h1>Hello, {name}!</h1>
const el3 = <p>{1 + 1}</p>
const el4 = <p>{isLoggedIn ? '已登录' : '未登录'}</p>

// 4. class → className，for → htmlFor
const el5 = <div className="container"></div>
const el6 = <label htmlFor="name">姓名</label>

// 5. 内联样式用对象，属性名用驼峰
const el7 = <div style={{ color: 'red', fontSize: '16px' }}></div>
```

## 组件

React 组件分为**函数组件**（推荐）和类组件，现代 React 全面使用函数组件 + Hooks。

### 函数组件

```jsx
// 组件名必须大写开头
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>
}

// 箭头函数写法
const Welcome = (props) => {
  return <h1>Hello, {props.name}!</h1>
}

// 使用组件
function App() {
  return <Welcome name="Tom" />
}
```

### Props

Props 是父组件传给子组件的数据，只读不可修改。

```jsx
// 子组件：接收 props
function UserCard({ name, age, avatar, onClick }) {
  return (
    <div onClick={onClick}>
      <img src={avatar} alt={name} />
      <p>{name} - {age}岁</p>
    </div>
  )
}

// 父组件：传递 props
function App() {
  const handleClick = () => console.log('clicked')

  return (
    <UserCard
      name="Tom"
      age={25}
      avatar="/avatar.png"
      onClick={handleClick}
    />
  )
}
```

### Props 默认值

```jsx
function Button({ text = '确定', type = 'primary', disabled = false }) {
  return <button className={type} disabled={disabled}>{text}</button>
}
```

### children

```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  )
}

// 使用
function App() {
  return (
    <Card title="用户信息">
      <p>姓名：Tom</p>
      <p>年龄：25</p>
    </Card>
  )
}
```

## 状态（State）

使用 `useState` Hook 管理组件内部状态。

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)  // 初始值为 0

  return (
    <div>
      <p>当前计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>重置</button>
    </div>
  )
}
```

### 更新对象/数组状态

React 状态更新需要返回新引用，不能直接修改原对象：

```jsx
// 对象状态
const [user, setUser] = useState({ name: 'Tom', age: 25 })

// ❌ 错误：直接修改
user.age = 26
setUser(user)

// ✅ 正确：展开运算符创建新对象
setUser({ ...user, age: 26 })


// 数组状态
const [list, setList] = useState(['a', 'b', 'c'])

// 新增
setList([...list, 'd'])

// 删除
setList(list.filter(item => item !== 'b'))

// 更新某项
setList(list.map(item => item === 'a' ? 'A' : item))
```

### 函数式更新（依赖前一个状态时使用）

```jsx
// ✅ 推荐：使用函数确保拿到最新 state
setCount(prev => prev + 1)
setList(prev => [...prev, newItem])
```

## 事件处理

```jsx
function Form() {
  const [value, setValue] = useState('')

  // 事件处理函数
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()  // 阻止默认行为
    console.log('提交：', value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('回车')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button type="submit">提交</button>
    </form>
  )
}
```

### 传参给事件处理函数

```jsx
function List() {
  const items = ['苹果', '香蕉', '橙子']

  const handleClick = (item, index) => {
    console.log(`点击了第 ${index} 项：${item}`)
  }

  return (
    <ul>
      {items.map((item, index) => (
        // 使用箭头函数传参
        <li key={item} onClick={() => handleClick(item, index)}>
          {item}
        </li>
      ))}
    </ul>
  )
}
```

## 条件渲染

```jsx
function UserStatus({ isLoggedIn, role }) {
  // 方式一：if/else（适合复杂逻辑）
  if (!isLoggedIn) {
    return <p>请先登录</p>
  }

  return (
    <div>
      {/* 方式二：三元运算符 */}
      <p>{isLoggedIn ? '已登录' : '未登录'}</p>

      {/* 方式三：&& 短路（为 true 时才渲染） */}
      {role === 'admin' && <button>管理后台</button>}

      {/* 方式四：null 不渲染任何内容 */}
      {isLoggedIn ? <UserPanel /> : null}
    </div>
  )
}
```

## 列表渲染

```jsx
function TodoList() {
  const todos = [
    { id: 1, text: '学习 React', done: true },
    { id: 2, text: '学习 TypeScript', done: false },
    { id: 3, text: '完成项目', done: false },
  ]

  return (
    <ul>
      {todos.map(todo => (
        // key 必须是唯一且稳定的值，不推荐用 index
        <li
          key={todo.id}
          style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  )
}
```

## 受控组件与表单

```jsx
function LoginForm() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    remember: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="用户名"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="密码"
      />
      <label>
        <input
          name="remember"
          type="checkbox"
          checked={form.remember}
          onChange={handleChange}
        />
        记住我
      </label>
      <button type="submit">登录</button>
    </form>
  )
}
```

## 组件通信

### 父 → 子（Props）

```jsx
// 父组件通过 props 传数据给子组件（见上方 Props 章节）
```

### 子 → 父（回调函数）

```jsx
// 父组件
function Parent() {
  const [msg, setMsg] = useState('')

  return (
    <div>
      <p>收到子组件消息：{msg}</p>
      <Child onSend={setMsg} />
    </div>
  )
}

// 子组件
function Child({ onSend }) {
  return (
    <button onClick={() => onSend('Hello from Child!')}>
      发送消息给父组件
    </button>
  )
}
```

### 兄弟组件（状态提升）

将共享状态提升到最近的公共父组件：

```jsx
function Parent() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Display count={count} />
      <Controller onIncrement={() => setCount(c => c + 1)} />
    </>
  )
}

function Display({ count }) {
  return <p>当前值：{count}</p>
}

function Controller({ onIncrement }) {
  return <button onClick={onIncrement}>+1</button>
}
```

## 组件样式方案

### CSS Modules（推荐）

```css
/* Button.module.css */
.btn {
  padding: 8px 16px;
  border-radius: 4px;
}
.primary {
  background: #1677ff;
  color: white;
}
```

```jsx
import styles from './Button.module.css'

function Button({ children }) {
  return (
    <button className={`${styles.btn} ${styles.primary}`}>
      {children}
    </button>
  )
}
```

### 内联样式 + 动态类名

```jsx
import classNames from 'classnames'  // npm install classnames

function Button({ type = 'primary', disabled }) {
  return (
    <button
      className={classNames('btn', {
        [`btn-${type}`]: true,
        'btn-disabled': disabled,
      })}
    >
      Click
    </button>
  )
}
```

## 纯函数组件与 memo

```jsx
import { memo } from 'react'

// 用 memo 包裹，props 不变时跳过重渲染
const UserCard = memo(function UserCard({ name, age }) {
  console.log('UserCard render')
  return <div>{name} - {age}</div>
})

export default UserCard
```
