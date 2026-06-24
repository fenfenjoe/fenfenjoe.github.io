---
title: React Router 使用教程
sidebarDepth: 2
---

# React Router 使用教程

React Router v6 是 React 官方推荐的路由库，用于构建单页应用（SPA）。v6 相比 v5 API 更简洁，推荐使用 `createBrowserRouter` 配置路由。

## 安装

```bash
npm install react-router-dom
```

## 两种路由配置方式

### 方式一：createBrowserRouter（推荐，v6.4+）

```jsx
// src/router/index.jsx
import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/layouts/Layout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import UserDetail from '@/pages/UserDetail'
import NotFound from '@/pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'user/:id', element: <UserDetail /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])

export default router
```

```jsx
// src/main.jsx
import { RouterProvider } from 'react-router-dom'
import router from './router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
```

### 方式二：BrowserRouter + JSX（传统写法）

```jsx
// src/main.jsx
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

```jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="user/:id" element={<UserDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
```

## 布局组件（嵌套路由出口）

```jsx
// src/layouts/Layout.jsx
import { Outlet, NavLink } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <nav>
        {/* NavLink 激活时自动加 active 类 */}
        <NavLink to="/" end>首页</NavLink>
        <NavLink to="/about">关于</NavLink>
      </nav>
      <main>
        <Outlet />  {/* 子路由渲染在此 */}
      </main>
    </div>
  )
}
```

## 导航链接

```jsx
import { Link, NavLink } from 'react-router-dom'

function Nav() {
  return (
    <nav>
      {/* Link：普通链接 */}
      <Link to="/">首页</Link>

      {/* NavLink：带激活状态，end 表示精确匹配 / */}
      <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
        首页
      </NavLink>

      {/* 带查询参数 */}
      <Link to="/search?q=react">搜索 React</Link>

      {/* replace：不记入历史 */}
      <Link to="/login" replace>登录</Link>
    </nav>
  )
}
```

## 编程式导航

```jsx
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()

  const handleLogin = async () => {
    await login()
    navigate('/')              // 跳转到首页
    navigate(-1)               // 返回上一页
    navigate('/user/1', { replace: true })  // replace 模式
    navigate('/dashboard', { state: { from: 'login' } })  // 携带 state
  }

  return <button onClick={handleLogin}>登录</button>
}
```

## 动态路由参数

```jsx
// 路由定义
{ path: 'user/:id', element: <UserDetail /> }

// 获取参数
import { useParams } from 'react-router-dom'

function UserDetail() {
  const { id } = useParams()

  useEffect(() => {
    fetchUser(id)
  }, [id])

  return <p>用户 ID：{id}</p>
}
```

## 查询参数（Search Params）

```jsx
import { useSearchParams } from 'react-router-dom'

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // 读取
  const query = searchParams.get('q') || ''
  const page = Number(searchParams.get('page') || 1)

  // 更新
  const handleSearch = (newQuery) => {
    setSearchParams({ q: newQuery, page: 1 })
  }

  const handlePageChange = (newPage) => {
    setSearchParams(prev => {
      prev.set('page', newPage)
      return prev
    })
  }

  return (
    <div>
      <input
        value={query}
        onChange={e => handleSearch(e.target.value)}
        placeholder="搜索..."
      />
      <p>第 {page} 页</p>
    </div>
  )
}
```

## 嵌套路由

```jsx
// 路由配置
const router = createBrowserRouter([
  {
    path: '/user/:id',
    element: <UserLayout />,
    children: [
      { index: true, element: <UserHome /> },      // /user/:id
      { path: 'profile', element: <UserProfile /> }, // /user/:id/profile
      { path: 'posts', element: <UserPosts /> },     // /user/:id/posts
    ],
  },
])

// 父级布局组件
function UserLayout() {
  const { id } = useParams()

  return (
    <div>
      <h2>用户 {id}</h2>
      <nav>
        <NavLink to="" end>主页</NavLink>
        <NavLink to="profile">资料</NavLink>
        <NavLink to="posts">文章</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}
```

## 路由守卫（鉴权）

React Router 没有内置守卫，通过封装组件实现：

```jsx
// components/RequireAuth.jsx
import { Navigate, useLocation } from 'react-router-dom'

function RequireAuth({ children }) {
  const token = localStorage.getItem('token')
  const location = useLocation()

  if (!token) {
    // 保存当前路径，登录后跳回
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

// 在路由中使用
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'dashboard',
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
    ],
  },
])

// 登录页：登录成功后跳回原页面
function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleLogin = async () => {
    await doLogin()
    navigate(from, { replace: true })
  }

  return <button onClick={handleLogin}>登录</button>
}
```

## 路由懒加载

```jsx
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const UserDetail = lazy(() => import('@/pages/UserDetail'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>加载中...</div>}>
        <Layout />
      </Suspense>
    ),
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'user/:id', element: <UserDetail /> },
    ],
  },
])
```

## 使用 location state 传参

```jsx
// 发送方
navigate('/result', { state: { orderId: '12345', amount: 99 } })

// 接收方
import { useLocation } from 'react-router-dom'

function ResultPage() {
  const location = useLocation()
  const { orderId, amount } = location.state || {}

  return <p>订单 {orderId}，金额 {amount}</p>
}
```

## 数据加载（loader，v6.4+）

`createBrowserRouter` 支持在路由层面加载数据：

```jsx
// 定义 loader
async function userLoader({ params }) {
  const res = await fetch(`/api/user/${params.id}`)
  if (!res.ok) throw new Response('Not Found', { status: 404 })
  return res.json()
}

// 路由配置
const router = createBrowserRouter([
  {
    path: 'user/:id',
    element: <UserDetail />,
    loader: userLoader,
  },
])

// 组件中使用
import { useLoaderData } from 'react-router-dom'

function UserDetail() {
  const user = useLoaderData()
  return <p>{user.name}</p>
}
```

## 常用 Hooks 速查

| Hook | 用途 |
|------|------|
| `useNavigate()` | 编程式导航 |
| `useParams()` | 获取动态路由参数 |
| `useSearchParams()` | 读写 URL 查询参数 |
| `useLocation()` | 获取当前 location 对象 |
| `useMatch(pattern)` | 检测当前路径是否匹配 |
| `useLoaderData()` | 获取 loader 返回的数据 |
| `useOutlet()` | 获取子路由元素 |
