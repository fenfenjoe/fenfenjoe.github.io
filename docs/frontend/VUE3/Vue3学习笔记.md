---
title: Vue3学习笔记
sidebarDepth: 2
---

# Vue3学习笔记


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

### 4. 查询数据&渲染表格

通常包含：查询条件表单 + 分页 + 表格数据三部分。

```vue
<template>
  <div>
    <!-- 查询条件 -->
    <div class="search-bar">
      <input v-model="query.keyword" placeholder="请输入关键字" />
      <select v-model="query.status">
        <option value="">全部</option>
        <option value="1">启用</option>
        <option value="0">禁用</option>
      </select>
      <button @click="handleSearch">查询</button>
      <button @click="handleReset">重置</button>
    </div>

    <!-- 数据表格 -->
    <table v-if="!loading">
      <thead>
        <tr>
          <th>ID</th>
          <th>姓名</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableData" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.status === 1 ? '启用' : '禁用' }}</td>
          <td>
            <button @click="handleEdit(row)">编辑</button>
            <button @click="handleDelete(row.id)">删除</button>
          </td>
        </tr>
        <tr v-if="tableData.length === 0">
          <td colspan="4">暂无数据</td>
        </tr>
      </tbody>
    </table>
    <p v-else>加载中...</p>

    <!-- 分页 -->
    <div class="pagination">
      <button :disabled="pagination.page <= 1" @click="changePage(pagination.page - 1)">上一页</button>
      <span>第 {{ pagination.page }} 页 / 共 {{ totalPages }} 页</span>
      <button :disabled="pagination.page >= totalPages" @click="changePage(pagination.page + 1)">下一页</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { getUserList } from '@/api/user'

// 查询条件
const query = reactive({
  keyword: '',
  status: '',
})

// 分页
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})

const totalPages = computed(() => Math.ceil(pagination.total / pagination.pageSize))

// 表格数据
const tableData = ref([])
const loading = ref(false)

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getUserList({
      ...query,
      page: pagination.page,
      pageSize: pagination.pageSize,
    })
    tableData.value = res.list
    pagination.total = res.total
  } catch (error) {
    console.error('获取数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 点击查询：重置到第1页再请求
const handleSearch = () => {
  pagination.page = 1
  loadData()
}

// 重置查询条件
const handleReset = () => {
  query.keyword = ''
  query.status = ''
  pagination.page = 1
  loadData()
}

// 切换分页
const changePage = (page) => {
  pagination.page = page
  loadData()
}

// 编辑行
const handleEdit = (row) => {
  console.log('编辑:', row)
  // 通常：打开弹窗并传入当前行数据
}

// 删除行
const handleDelete = async (id) => {
  if (!confirm('确定删除吗？')) return
  await deleteUser(id)
  loadData()  // 刷新列表
}

// 初始化加载
onMounted(() => loadData())
</script>
```

### 5. 弹窗&获取返回参数

常见模式：父组件控制弹窗显隐，子组件（弹窗）通过 `emit` 将结果回传给父组件。

```vue
<!-- 父组件 UserListView.vue -->
<template>
  <div>
    <button @click="openAdd">新增</button>
    <button @click="openEdit(currentRow)">编辑</button>

    <!-- 弹窗组件 -->
    <UserDialog
      v-if="dialogVisible"
      :visible="dialogVisible"
      :init-data="dialogData"
      @confirm="handleDialogConfirm"
      @cancel="dialogVisible = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserDialog from '@/components/UserDialog.vue'

const dialogVisible = ref(false)
const dialogData = ref(null)  // 传给弹窗的初始数据，null 表示新增

// 打开新增弹窗
const openAdd = () => {
  dialogData.value = null
  dialogVisible.value = true
}

// 打开编辑弹窗，传入当前行数据
const openEdit = (row) => {
  dialogData.value = { ...row }  // 浅拷贝，避免直接修改原数据
  dialogVisible.value = true
}

// 弹窗点击确认，接收子组件返回的表单数据
const handleDialogConfirm = async (formData) => {
  if (formData.id) {
    await updateUser(formData)   // 有 id：编辑
  } else {
    await createUser(formData)   // 无 id：新增
  }
  dialogVisible.value = false
  loadData()  // 刷新列表
}
</script>
```

```vue
<!-- 弹窗子组件 UserDialog.vue -->
<template>
  <div class="dialog-mask">
    <div class="dialog">
      <h3>{{ form.id ? '编辑用户' : '新增用户' }}</h3>

      <form @submit.prevent="handleConfirm">
        <div>
          <label>姓名</label>
          <input v-model="form.name" placeholder="请输入姓名" required />
        </div>
        <div>
          <label>邮箱</label>
          <input v-model="form.email" type="email" placeholder="请输入邮箱" />
        </div>
        <div class="dialog-footer">
          <button type="button" @click="emit('cancel')">取消</button>
          <button type="submit">确认</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  initData: Object,  // 父组件传入的初始数据（编辑时有值，新增时为 null）
})

const emit = defineEmits(['confirm', 'cancel'])

// 弹窗内部表单状态
const form = reactive({
  id: null,
  name: '',
  email: '',
})

// 监听 initData 变化，初始化表单（弹窗每次打开时同步数据）
watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      if (props.initData) {
        // 编辑模式：填入初始数据
        Object.assign(form, props.initData)
      } else {
        // 新增模式：重置表单
        Object.assign(form, { id: null, name: '', email: '' })
      }
    }
  }
)

// 点击确认：将表单数据回传给父组件
const handleConfirm = () => {
  emit('confirm', { ...form })  // 传副本，避免外部直接引用内部响应式对象
}
</script>
```

### 6. 异步发送请求&异步处理

**基础：async/await + 错误处理**

```javascript
import { ref } from 'vue'

const loading = ref(false)
const result = ref(null)
const errorMsg = ref('')

const fetchData = async () => {
  loading.value = true
  errorMsg.value = ''
  try {
    result.value = await api.getData()
  } catch (error) {
    // 统一处理错误信息（通常 axios 拦截器已处理，这里是兜底）
    errorMsg.value = error.message || '请求失败，请稍后重试'
  } finally {
    loading.value = false  // 无论成功失败都要关闭 loading
  }
}
```

**并行请求（互不依赖时用 Promise.all 提速）**

```javascript
const loadPageData = async () => {
  loading.value = true
  try {
    // 并行发起，总耗时 = 最慢的那个，而非叠加
    const [userInfo, orderList, noticeList] = await Promise.all([
      api.getUserInfo(),
      api.getOrderList(),
      api.getNoticeList(),
    ])
    user.value = userInfo
    orders.value = orderList
    notices.value = noticeList
  } finally {
    loading.value = false
  }
}
```

**串行请求（下一个依赖上一个的结果）**

```javascript
const loadOrderDetail = async (orderId) => {
  // 第一步：获取订单
  const order = await api.getOrder(orderId)

  // 第二步：用订单里的 userId 获取用户信息（依赖第一步结果）
  const user = await api.getUser(order.userId)

  // 第三步：用订单里的 productId 获取商品信息
  const product = await api.getProduct(order.productId)

  return { order, user, product }
}
```

**防重复提交（按钮 loading 状态）**

```vue
<template>
  <button :disabled="submitting" @click="handleSubmit">
    {{ submitting ? '提交中...' : '提交' }}
  </button>
</template>

<script setup>
import { ref } from 'vue'

const submitting = ref(false)

const handleSubmit = async () => {
  if (submitting.value) return  // 防止重复点击
  submitting.value = true
  try {
    await api.submitOrder(form)
    alert('提交成功')
  } catch (error) {
    alert('提交失败：' + error.message)
  } finally {
    submitting.value = false  // 成功或失败都恢复按钮
  }
}
</script>
```

**取消请求（组件卸载时终止进行中的请求）**

```javascript
import { onBeforeUnmount } from 'vue'
import axios from 'axios'

const controller = new AbortController()

const fetchData = async () => {
  try {
    const res = await axios.get('/api/data', {
      signal: controller.signal,  // 传入 AbortSignal
    })
    data.value = res.data
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('请求已取消')  // 组件卸载导致的取消，不需要报错
    } else {
      console.error('请求失败:', error)
    }
  }
}

// 组件卸载时取消未完成的请求，防止内存泄漏
onBeforeUnmount(() => controller.abort())
```


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


