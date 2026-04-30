---
title: Vue学习笔记
---

# Vue学习笔记


## Vue3项目目录结构示例

```
my-vue3-project/
├── .vscode/                  # VS Code 编辑器配置（推荐）
├── node_modules/             # 依赖包（类似 Java 的 Maven 本地仓库）
├── public/                   # 纯静态资源，不会被打包处理
│   └── favicon.ico
├── src/                      # 核心源代码（类比 Java 的 src/main/java）
│   ├── api/                  # 后端接口调用封装（类似 service 层）
│   ├── assets/               # 需要构建的静态资源（图片、字体等）
│   ├── components/           # 可复用的 UI 组件（类比 Java 的工具类或子模块）
│   ├── composables/          # 组合式函数（Vue 3 新特性，类似 React Hooks）
│   ├── router/               # 路由配置（类似 Spring MVC 的 RequestMapping）
│   ├── stores/               # Pinia 状态管理（类似 Java 的全局缓存或 Session）
│   ├── views/                # 页面级组件（对应不同 URL 的完整页面）
│   ├── App.vue               # 顶级根组件（类似 main 方法启动后的容器）
│   ├── main.js               # 应用入口脚本（类似 SpringBootApplication 启动类）
│   └── registerServiceWorker.js  # PWA 相关（可选）
├── .gitignore                # Git 忽略文件
├── index.html                # 宿主 HTML（Vue 应用会挂载到此页面的 div 上）
├── package.json              # 项目依赖&脚本配置（类似 Maven 的 pom.xml）
├── vite.config.js            # Vite 构建配置（类似 application.yml）
└── README.md                 # 项目说明
```

## 开发环境搭建

### 1. 安装 Node.js

**下载安装**：访问 [https://nodejs.org](https://nodejs.org)，下载 LTS 版本（长期支持版）

**验证安装**：
```bash
node -v    # 查看 Node.js 版本
npm -v     # 查看 npm 版本
```

**配置国内镜像**（加速依赖下载）：
```bash
npm config set registry https://registry.npmmirror.com
```

### 2. 安装 Cursor（推荐 IDE）

**下载**：访问 [https://cursor.sh](https://cursor.sh)

**首次启动**：
- 可选择导入 VSCode 配置
- 登录账号（GitHub/Google/Email）

### 3. 安装必备插件

在 Cursor 扩展市场（`Ctrl + Shift + X`）安装：

**必装**：
1. **Vue - Official** - Vue 3 语法支持（前端工程师必备）
2. **ESLint** - 代码规范检查
3. **Prettier** - 代码格式化

**推荐**：
4. **Auto Rename Tag** - 自动重命名 HTML/Vue 标签
5. **Path Intellisense** - 路径自动补全
6. **GitLens** - 增强 Git 功能

### 4. 配置 Cursor 设置

按 `Ctrl + ,` 打开设置，添加：

```json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### 5. 配置大模型（AI 辅助）

**打开 AI 设置**：点击右上角头像 → `Settings` → `AI`

**推荐配置**（国内模型）：

| 选项 | 值 |
|------|---|
| Provider | OpenAI Compatible |
| API Key | 你的 API Key |
| Base URL | `https://api.deepseek.com` |
| Model | `deepseek-coder` |

**获取 DeepSeek API Key**：
1. 访问 [https://platform.deepseek.com/](https://platform.deepseek.com/)
2. 注册并创建 API Key
3. 复制粘贴到 Cursor 设置中

**常用 AI 快捷键**：
- `Ctrl + K`：AI 代码编辑
- `Ctrl + L`：AI 聊天
- `Tab`：接受 AI 建议

### 6. 安装项目依赖

进入项目目录，执行：

```bash
npm install
# 或使用 pnpm（更快）
pnpm install
```

> 💡 类比 Java：相当于 Maven 的 `mvn clean install`

### 7. 启动开发服务器

```bash
npm run dev
# 或
npm run serve
```

浏览器访问：`http://localhost:5173`（Vite）或 `http://localhost:8080`（Vue CLI）

### 8. 常见问题排查

**问题 1：npm install 失败**
```bash
# 清除缓存重试
npm cache clean --force
npm install
```

**问题 2：端口被占用**
```bash
# Windows 查看占用端口的进程
netstat -ano | findstr :5173
# 杀掉进程
taskkill /PID <进程号> /F
```

**问题 3：ESLint 报错太多**
```bash
# 自动修复
npm run lint -- --fix
```

## Vue 核心概念（Java 工程师视角）

### 1. 组件 vs Java 类

| Vue 组件 | Java 类 | 说明 |
|---------|---------|------|
| `<template>` | UI 布局 | HTML 结构，类比 JSP/Thymeleaf |
| `<script>` | 业务逻辑 | JavaScript 代码，类比 Controller/Service |
| `<style>` | 样式 | CSS 样式，类比前端资源 |
| `props` | 构造函数参数 | 父组件传入的数据 |
| `emits` | 回调函数 | 子组件向父组件通信 |
| `data()` | 实例变量 | 组件内部状态 |
| `methods` | 实例方法 | 业务逻辑函数 |
| `computed` | Getter 方法 | 计算属性，有缓存 |
| `watch` | 监听器 | 响应数据变化，类比观察者模式 |

### 2. 生命周期钩子 vs Spring Bean

```javascript
// Vue 组件生命周期
export default {
  created() {
    // 组件创建后 - 类比 @PostConstruct
    console.log('组件实例已创建')
  },
  
  mounted() {
    // DOM 挂载完成 - 类比 init-method
    console.log('可以访问 DOM 了')
  },
  
  unmounted() {
    // 组件销毁 - 类比 @PreDestroy
    console.log('清理资源')
  }
}
```

**对比**：
- `created` ≈ `@PostConstruct`
- `mounted` ≈ Bean 初始化完成
- `unmounted` ≈ `@PreDestroy`

### 3. Pinia（状态管理）vs Spring 缓存

**Pinia Store** 类比 Spring 的 `@Service` + 全局缓存：

```javascript
// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    token: ''
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token  // 类比 getter 方法
  },
  
  actions: {
    async login(username, password) {     // 类比 Service 方法
      const res = await api.login(username, password)
      this.token = res.token
      this.username = username
    }
  }
})
```

**使用**：
```javascript
// 在组件中使用（类比 @Autowired）
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
console.log(userStore.username)
userStore.login('admin', '123456')
```

### 4. Vue Router vs Spring MVC

| Vue Router | Spring MVC | 说明 |
|-----------|-----------|------|
| `routes` 配置 | `@RequestMapping` | 路由映射 |
| `path: '/user/:id'` | `@PathVariable` | 路径参数 |
| `query` | `@RequestParam` | 查询参数 |
| `router.push()` | `redirect:` | 页面跳转 |
| 路由守卫 | 拦截器/过滤器 | 权限控制 |

**路由配置示例**：
```javascript
// router/index.js
const routes = [
  {
    path: '/user/:id',           // 路径参数
    name: 'UserDetail',
    component: () => import('@/views/UserDetail.vue'),
    meta: { requiresAuth: true } // 元信息，类比注解
  }
]

// 路由守卫（类比拦截器）
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next('/login')  // 重定向到登录页
  } else {
    next()
  }
})
```

### 5. API 调用 vs RestTemplate

**Axios 封装**（类比 RestTemplate）：

```javascript
// api/request.js
import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器（类比 Spring Interceptor）
request.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// 响应拦截器
request.interceptors.response.use(
  response => response.data,
  error => {
    console.error('请求失败:', error)
    return Promise.reject(error)
  }
)

export default request
```

**使用**：
```javascript
// api/user.js
import request from './request'

export const getUserInfo = (id) => {
  return request.get(`/user/${id}`)  // 类比 restTemplate.getForObject()
}

export const updateUser = (data) => {
  return request.post('/user/update', data)  // 类比 restTemplate.postForObject()
}
```

### 6. 响应式数据 vs JavaBean

```javascript
// Vue 3 响应式数据（类比 JavaBean）
import { ref, reactive } from 'vue'

// ref - 基本类型（类比 private String name）
const count = ref(0)
console.log(count.value)  // 访问需要 .value
count.value++

// reactive - 对象类型（类比 POJO）
const user = reactive({
  name: '张三',
  age: 25
})
console.log(user.name)  // 直接访问
user.age++
```

**关键区别**：
- Vue 数据变化会自动更新 UI
- 类比 Spring 的 `@Autowired` 自动注入

### 7. 常用指令速查

| 指令 | 作用 | Java 类比 |
|-----|------|----------|
| `v-if` | 条件渲染 | `if` 语句 |
| `v-for` | 列表渲染 | `for` 循环 |
| `v-model` | 双向绑定 | getter + setter |
| `v-bind` / `:` | 属性绑定 | 动态赋值 |
| `v-on` / `@` | 事件绑定 | 事件监听 |
| `v-show` | 显示/隐藏 | `display: none` |

**示例**：
```vue
<template>
  <!-- v-if: 条件渲染 -->
  <div v-if="isAdmin">管理员界面</div>
  
  <!-- v-for: 列表渲染 -->
  <div v-for="user in users" :key="user.id">
    {{ user.name }}
  </div>
  
  <!-- v-model: 双向绑定 -->
  <input v-model="username" />
  
  <!-- @click: 事件绑定 -->
  <button @click="handleClick">提交</button>
</template>
```

### 8. 组合式 API vs 函数式编程

```javascript
// 组合式 API（Vue 3 推荐）
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {  // 类比 main 方法
    // 响应式数据
    const count = ref(0)
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 方法
    const increment = () => {
      count.value++
    }
    
    // 生命周期
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    // 返回给模板使用（类比 public 方法）
    return {
      count,
      doubleCount,
      increment
    }
  }
}
```

---

## 快速上手实战

### 创建第一个组件

```vue
<!-- UserCard.vue -->
<template>
  <div class="user-card">
    <h3>{{ user.name }}</h3>
    <p>年龄: {{ user.age }}</p>
    <button @click="handleClick">点击</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 接收父组件传入的数据（类比构造函数参数）
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

// 定义事件（类比回调函数）
const emit = defineEmits(['update'])

// 响应式数据
const count = ref(0)

// 方法
const handleClick = () => {
  count.value++
  emit('update', count.value)  // 向父组件发送事件
}
</script>

<style scoped>
.user-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
}
</style>
```

### 使用组件

```vue
<!-- ParentView.vue -->
<template>
  <div>
    <UserCard 
      :user="currentUser" 
      @update="handleUpdate" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserCard from '@/components/UserCard.vue'

const currentUser = ref({
  name: '张三',
  age: 25
})

const handleUpdate = (count) => {
  console.log('子组件点击了', count, '次')
}
</script>
```

---

## 常见开发场景

### 1. 发送 HTTP 请求

```javascript
// 在组件中调用 API
import { ref, onMounted } from 'vue'
import { getUserInfo } from '@/api/user'

const userInfo = ref(null)
const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    userInfo.value = await getUserInfo(123)
  } catch (error) {
    console.error('请求失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()  // 组件挂载后自动请求
})
```

### 2. 表单处理

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.username" placeholder="用户名" />
    <input v-model="form.password" type="password" placeholder="密码" />
    <button type="submit">登录</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  username: '',
  password: ''
})

const handleSubmit = async () => {
  console.log('提交表单:', form)
  // 调用登录 API
}
</script>
```

### 3. 路由跳转

```javascript
import { useRouter } from 'vue-router'

const router = useRouter()

// 编程式导航
router.push('/home')                    // 跳转到首页
router.push({ name: 'UserDetail', params: { id: 123 } })  // 带参数
router.go(-1)                           // 后退
```

---

## 调试技巧

### 1. Vue DevTools

安装 Chrome 扩展：[Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

**功能**：
- 查看组件树结构
- 检查组件数据和 props
- 查看 Pinia store 状态
- 跟踪路由变化

### 2. 常用调试方法

```javascript
// 1. console.log（最常用）
console.log('当前用户:', user.value)

// 2. debugger 断点
const handleClick = () => {
  debugger  // 在这里暂停
  count.value++
}

// 3. 监听数据变化
watch(count, (newVal, oldVal) => {
  console.log(`count 从 ${oldVal} 变为 ${newVal}`)
})
```

---

## 推荐学习资源

- [Vue 3 官方文档](https://cn.vuejs.org/)（中文，必读）
- [Vue Router 文档](https://router.vuejs.org/zh/)
- [Pinia 文档](https://pinia.vuejs.org/zh/)
- [Vite 文档](https://cn.vitejs.dev/)

---

**更新时间**：2026-04-30  
**适用版本**：Vue 3 + Vite + Pinia


