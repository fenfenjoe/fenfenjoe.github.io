---
title: Redux Toolkit 使用教程
sidebarDepth: 2
---

# Redux Toolkit 使用教程

Redux Toolkit（RTK）是 Redux 官方推荐的工具集，大幅简化了 Redux 的使用。它内置了 Immer（支持直接修改 state）、createSlice（简化 reducer 定义）、createAsyncThunk（处理异步）等工具。

## 安装

```bash
npm install @reduxjs/toolkit react-redux
```

## 基础使用

### 1. 创建 Slice

```js
// src/store/counterSlice.js
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',       // 模块名（action type 前缀）
  initialState: {
    value: 0,
    status: 'idle',
  },
  reducers: {
    // 每个 reducer 自动生成对应的 action creator
    increment(state) {
      state.value += 1   // 得益于 Immer，可以直接修改
    },
    decrement(state) {
      state.value -= 1
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
    reset(state) {
      state.value = 0
    },
  },
})

// 导出 actions
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions

// 导出 selectors（选择器）
export const selectCount = (state) => state.counter.value

// 导出 reducer
export default counterSlice.reducer
```

### 2. 配置 Store

```js
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
})

export default store

// TypeScript 项目导出类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

### 3. 注册 Provider

```jsx
// src/main.jsx
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

### 4. 在组件中使用

```jsx
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount, reset, selectCount } from '@/store/counterSlice'

function Counter() {
  const count = useSelector(selectCount)  // 读取状态
  const dispatch = useDispatch()           // 获取 dispatch

  return (
    <div>
      <p>当前计数：{count}</p>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
      <button onClick={() => dispatch(reset())}>重置</button>
    </div>
  )
}
```

## 异步操作（createAsyncThunk）

```js
// src/store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// 定义异步 Thunk
export const fetchUser = createAsyncThunk(
  'user/fetchUser',           // action type 前缀
  async (userId, thunkAPI) => {
    try {
      const res = await fetch(`/api/user/${userId}`)
      if (!res.ok) throw new Error('请求失败')
      return await res.json()  // 返回值作为 fulfilled 的 payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)  // 失败时的 payload
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.userInfo = null
    },
  },
  // 处理异步 action 的三种状态
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout } = userSlice.actions
export const selectUser = (state) => state.user.userInfo
export const selectUserLoading = (state) => state.user.loading
export default userSlice.reducer
```

```jsx
// 组件中使用异步 Thunk
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser, selectUser, selectUserLoading } from '@/store/userSlice'

function UserProfile({ userId }) {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const loading = useSelector(selectUserLoading)

  useEffect(() => {
    dispatch(fetchUser(userId))
  }, [userId, dispatch])

  if (loading) return <p>加载中...</p>
  return <p>{user?.name}</p>
}
```

## RTK Query（数据请求缓存）

RTK Query 是 RTK 内置的数据请求和缓存方案，类似 TanStack Query。

```js
// src/store/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: ['User', 'Post'],  // 用于缓存失效
  endpoints: (builder) => ({
    // 查询
    getUser: builder.query({
      query: (userId) => `/user/${userId}`,
      providesTags: (result, error, userId) => [{ type: 'User', id: userId }],
    }),
    getPostList: builder.query({
      query: ({ page = 1, size = 10 }) => `/post?page=${page}&size=${size}`,
      providesTags: ['Post'],
    }),
    // 修改
    createPost: builder.mutation({
      query: (body) => ({ url: '/post', method: 'POST', body }),
      invalidatesTags: ['Post'],  // 创建后让 Post 列表缓存失效，自动重新请求
    }),
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/user/${id}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
  }),
})

// 导出自动生成的 Hooks
export const {
  useGetUserQuery,
  useGetPostListQuery,
  useCreatePostMutation,
  useUpdateUserMutation,
} = apiSlice
```

```js
// 注册到 store
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
```

```jsx
// 在组件中使用 RTK Query
function UserProfile({ userId }) {
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserQuery(userId)

  if (isLoading) return <p>加载中...</p>
  if (isError) return <p>错误：{error.message}</p>

  return (
    <div>
      <p>{user.name}</p>
      <button onClick={refetch}>刷新</button>
    </div>
  )
}

function CreatePostForm() {
  const [createPost, { isLoading }] = useCreatePostMutation()

  const handleSubmit = async (data) => {
    try {
      await createPost(data).unwrap()
      alert('创建成功')
    } catch (err) {
      alert('创建失败：' + err.message)
    }
  }

  return (
    <button onClick={() => handleSubmit({ title: '新文章' })} disabled={isLoading}>
      {isLoading ? '提交中...' : '创建文章'}
    </button>
  )
}
```

## 状态持久化（redux-persist）

```bash
npm install redux-persist
```

```js
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'  // localStorage
import userReducer from './userSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],  // 只持久化 user 模块
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export default store
```

```jsx
// main.jsx
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
```

## Zustand（轻量替代方案）

如果项目较小，可以用 Zustand 替代 Redux，API 更简洁：

```bash
npm install zustand
```

```js
// src/store/useCounterStore.js
import { create } from 'zustand'

const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))

export default useCounterStore
```

```jsx
// 组件中直接使用，无需 Provider
function Counter() {
  const { count, increment, decrement } = useCounterStore()

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
    </div>
  )
}
```

## Redux vs Zustand 对比

| 特性 | Redux Toolkit | Zustand |
|------|--------------|---------|
| 学习成本 | 较高 | 低 |
| 代码量 | 较多 | 极少 |
| DevTools | 完善 | 支持 |
| 适合场景 | 大型复杂应用 | 中小型应用 |
| 数据请求缓存 | RTK Query | 需配合 SWR / React Query |
| TypeScript | 完整支持 | 完整支持 |
