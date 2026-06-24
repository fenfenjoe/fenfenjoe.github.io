---
title: React Hooks
sidebarDepth: 2
---

# React Hooks

Hooks 是 React 16.8 引入的特性，让函数组件拥有状态、副作用等能力。Hooks 只能在函数组件顶层调用，不能在条件、循环或嵌套函数中调用。

## useState

管理组件内部状态，详见 [React 基础 - 状态](./React基础.md)。

```jsx
import { useState } from 'react'

const [state, setState] = useState(initialValue)

// 惰性初始化（初始值计算复杂时，传函数避免每次渲染都执行）
const [data, setData] = useState(() => JSON.parse(localStorage.getItem('data') || '[]'))
```

## useEffect

处理副作用：数据请求、订阅、手动操作 DOM、定时器等。

```jsx
import { useEffect } from 'react'

useEffect(() => {
  // 副作用代码

  return () => {
    // 清理函数（组件卸载或下次 effect 执行前调用）
  }
}, [/* 依赖数组 */])
```

### 依赖数组说明

```jsx
// 1. 不传依赖数组：每次渲染后都执行
useEffect(() => {
  console.log('每次渲染后执行')
})

// 2. 空数组：仅在组件挂载时执行一次（类似 componentDidMount）
useEffect(() => {
  console.log('仅执行一次')
}, [])

// 3. 有依赖：依赖变化时执行
useEffect(() => {
  console.log('count 变化时执行')
}, [count])
```

### 常见用法

```jsx
function UserDetail({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 数据请求
  useEffect(() => {
    let cancelled = false  // 防止组件卸载后的异步回调更新状态

    setLoading(true)
    fetch(`/api/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          setUser(data)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true  // 清理：标记已取消
    }
  }, [userId])  // userId 变化时重新请求


  // 定时器
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('tick')
    }, 1000)

    return () => clearInterval(timer)  // 清理定时器
  }, [])


  // 事件监听
  useEffect(() => {
    const handleResize = () => console.log(window.innerWidth)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (loading) return <p>加载中...</p>
  return <p>{user?.name}</p>
}
```

## useContext

跨层级组件传递数据，避免 Props 逐层透传。

```jsx
import { createContext, useContext, useState } from 'react'

// 1. 创建 Context
const ThemeContext = createContext('light')

// 2. 提供者（Provider）包裹子树
function App() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  )
}

// 3. 任意后代组件消费 Context（无需 props 传递）
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <button
      style={{ background: theme === 'dark' ? '#333' : '#fff' }}
      onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
    >
      切换主题（当前：{theme}）
    </button>
  )
}
```

### 封装为自定义 Hook

```jsx
// contexts/ThemeContext.jsx
export const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 封装消费 Hook，避免每次都写 useContext
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
```

## useRef

### 1. 访问 DOM 元素

```jsx
import { useRef, useEffect } from 'react'

function InputFocus() {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()  // 组件挂载后自动聚焦
  }, [])

  return <input ref={inputRef} placeholder="自动聚焦" />
}
```

### 2. 保存不触发重渲染的值

```jsx
function Timer() {
  const [count, setCount] = useState(0)
  const timerRef = useRef(null)  // 保存定时器 ID，修改不触发重渲染

  const start = () => {
    timerRef.current = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)
  }

  const stop = () => {
    clearInterval(timerRef.current)
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={start}>开始</button>
      <button onClick={stop}>停止</button>
    </div>
  )
}
```

### 3. 保存上一次的值

```jsx
function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value  // 每次渲染后更新，但读取时是上一次的值
  })
  return ref.current
}

function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  return <p>当前：{count}，上一次：{prevCount}</p>
}
```

## useMemo

缓存计算结果，避免重复执行昂贵计算。

```jsx
import { useMemo, useState } from 'react'

function ProductList({ products, filterText }) {
  // 只有 products 或 filterText 变化时才重新过滤
  const filteredProducts = useMemo(() => {
    console.log('执行过滤计算')
    return products.filter(p =>
      p.name.toLowerCase().includes(filterText.toLowerCase())
    )
  }, [products, filterText])

  return (
    <ul>
      {filteredProducts.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  )
}
```

> **注意**：不要滥用 `useMemo`，只有计算确实耗时才值得缓存。

## useCallback

缓存函数引用，配合 `memo` 避免子组件不必要重渲染。

```jsx
import { useCallback, memo, useState } from 'react'

// 子组件用 memo 包裹
const Button = memo(({ onClick, label }) => {
  console.log(`Button "${label}" render`)
  return <button onClick={onClick}>{label}</button>
})

function Parent() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  // 用 useCallback 缓存函数，依赖不变则函数引用不变
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1)
  }, [])  // 无依赖，函数永远是同一引用

  return (
    <div>
      <p>{count}</p>
      <input value={text} onChange={e => setText(e.target.value)} />
      {/* text 变化时，Button 不会重渲染（handleIncrement 引用未变） */}
      <Button onClick={handleIncrement} label="增加" />
    </div>
  )
}
```

## useReducer

管理复杂状态逻辑，类似 Redux 的 reducer 模式。

```jsx
import { useReducer } from 'react'

// 定义 reducer
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.text, done: false }]
    case 'TOGGLE':
      return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t)
    case 'DELETE':
      return state.filter(t => t.id !== action.id)
    default:
      return state
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, [])
  const [text, setText] = useState('')

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => {
        dispatch({ type: 'ADD', text })
        setText('')
      }}>
        添加
      </button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
              onClick={() => dispatch({ type: 'TOGGLE', id: todo.id })}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE', id: todo.id })}>
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## useId

生成唯一 ID，用于无障碍属性（如 label 的 htmlFor）。

```jsx
import { useId } from 'react'

function FormField({ label }) {
  const id = useId()

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </div>
  )
}
```

## 自定义 Hook

将可复用的状态逻辑提取为自定义 Hook（命名必须以 `use` 开头）。

### useFetch —— 数据请求

```jsx
// hooks/useFetch.js
import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError(null)

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
        return res.json()
      })
      .then(data => {
        if (!cancelled) {
          setData(data)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [url])

  return { data, loading, error }
}

// 使用
function UserDetail({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/user/${userId}`)

  if (loading) return <p>加载中...</p>
  if (error) return <p>错误：{error}</p>
  return <p>{user.name}</p>
}
```

### useLocalStorage —— 持久化状态

```jsx
// hooks/useLocalStorage.js
import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const val = value instanceof Function ? value(storedValue) : value
      setStoredValue(val)
      localStorage.setItem(key, JSON.stringify(val))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

// 使用
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      当前主题：{theme}
    </button>
  )
}
```

### useDebounce —— 防抖

```jsx
// hooks/useDebounce.js
import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// 使用：搜索框防抖
function SearchBox() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (debouncedQuery) {
      console.log('发起搜索：', debouncedQuery)
    }
  }, [debouncedQuery])

  return (
    <input
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="搜索..."
    />
  )
}
```

## Hooks 使用规则总结

| 规则 | 说明 |
|------|------|
| 只在顶层调用 | 不能在 if、for、嵌套函数中调用 |
| 只在函数组件中调用 | 或自定义 Hook 中调用 |
| 自定义 Hook 以 `use` 开头 | 便于 lint 工具识别 |

## 常见 Hooks 对比

| Hook | 用途 |
|------|------|
| `useState` | 管理简单状态 |
| `useReducer` | 管理复杂状态逻辑 |
| `useEffect` | 处理副作用 |
| `useContext` | 消费 Context |
| `useRef` | 访问 DOM / 保存不触发渲染的值 |
| `useMemo` | 缓存计算结果 |
| `useCallback` | 缓存函数引用 |
| `useId` | 生成唯一 ID |
