---
title: Element Plus
sidebarDepth: 2
---

# Element Plus

> 基于 Vue 3 的企业级 UI 组件库，由饿了么前端团队出品，是 Element UI（Vue 2）的 Vue 3 升级版。  
> 官网：[https://element-plus.org/zh-CN/](https://element-plus.org/zh-CN/)

## 安装与接入

### 安装

```bash
npm install element-plus
```

### 接入方式对比

| 方式 | 特点 | 适用场景 |
|------|------|--------|
| 完整引入 | 一次性引入所有组件，配置简单 | 快速原型、小项目 |
| 按需自动导入（推荐） | 只打包用到的组件，体积最小 | 生产项目 |
| 手动按需引入 | 手动控制引入哪些组件 | 对打包有精细控制需求 |

---

### 方式一：完整引入

```js
// main.js
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

---

### 方式二：按需自动导入（推荐）

安装插件：

```bash
npm install -D unplugin-vue-components unplugin-auto-import
```

配置 `vite.config.js`：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],  // 自动导入 ElMessage、ElNotification 等 API
    }),
    Components({
      resolvers: [ElementPlusResolver()],  // 自动导入 <el-button> 等组件
    }),
  ],
})
```

> 配置完成后，模板中直接使用 `<el-button>` 等组件，无需手动 import，插件会自动处理。

---

### 国际化（中文）

Element Plus 默认英文，切换为中文：

```js
// main.js
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

app.use(ElementPlus, { locale: zhCn })
```

---

## 核心概念

### 组件命名规则

| 模板写法 | JS 写法 | 说明 |
|---------|--------|------|
| `<el-button>` | `ElButton` | 所有组件以 `el-` 为前缀 |
| `<el-form-item>` | `ElFormItem` | 复合组件用 `-` 分隔子组件名 |

---

### 尺寸（size）

Element Plus 统一使用 `size` prop 控制组件大小：

| 值 | 说明 |
|----|------|
| `large` | 大号 |
| `default` | 默认（可省略） |
| `small` | 小号 |

可在 `app.use(ElementPlus, { size: 'small' })` 全局设置默认尺寸。

---

### 主题色定制

通过覆盖 CSS 变量实现主题定制：

```css
/* src/styles/element-variables.css */
:root {
  --el-color-primary: #409eff;        /* 主色 */
  --el-color-success: #67c23a;        /* 成功色 */
  --el-color-warning: #e6a23c;        /* 警告色 */
  --el-color-danger: #f56c6c;         /* 危险色 */
  --el-color-info: #909399;           /* 信息色 */
}
```

---

### 命名空间（namespace）

Element Plus 支持修改组件的 CSS 前缀（默认 `el`），用于微前端等场景避免样式冲突：

```js
app.use(ElementPlus, { namespace: 'ep' })
// 此时组件会使用 .ep-button、.ep-input 等类名
```

---

## 常用组件

### Button 按钮

```vue
<template>
  <!-- type：plain / primary / success / warning / danger / info -->
  <el-button>默认</el-button>
  <el-button type="primary">主要</el-button>
  <el-button type="success" plain>朴素成功</el-button>
  <el-button type="danger" round>圆角危险</el-button>
  <el-button type="primary" :icon="Search">搜索</el-button>
  <el-button type="primary" :loading="loading" @click="handleClick">
    提交
  </el-button>
  <el-button type="primary" disabled>禁用</el-button>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const loading = ref(false)
const handleClick = () => {
  loading.value = true
  setTimeout(() => loading.value = false, 2000)
}
</script>
```

---

### Input 输入框

```vue
<template>
  <el-input v-model="value" placeholder="请输入内容" clearable />

  <!-- 带前后缀图标 -->
  <el-input v-model="search" :prefix-icon="Search" placeholder="搜索" />

  <!-- 密码框 -->
  <el-input v-model="password" type="password" show-password placeholder="请输入密码" />

  <!-- 文本域 -->
  <el-input v-model="desc" type="textarea" :rows="4" placeholder="请输入描述" />

  <!-- 限制字数 -->
  <el-input v-model="bio" maxlength="100" show-word-limit />
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const value = ref('')
const search = ref('')
const password = ref('')
const desc = ref('')
const bio = ref('')
</script>
```

---

### Select 选择器

```vue
<template>
  <el-select v-model="selected" placeholder="请选择" clearable>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>

  <!-- 多选 -->
  <el-select v-model="multiSelected" multiple placeholder="可多选" collapse-tags>
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref('')
const multiSelected = ref([])
const options = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
  { value: '3', label: '选项三' },
]
</script>
```

---

### Form 表单

> Form 是 Element Plus 中最常用的复合组件，重点掌握：`model`、`rules`、`ref` 校验。

```vue
<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="100px"
    status-icon
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" show-password />
    </el-form-item>

    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="form.gender">
        <el-radio value="male">男</el-radio>
        <el-radio value="female">女</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="爱好" prop="hobbies">
      <el-checkbox-group v-model="form.hobbies">
        <el-checkbox value="reading">阅读</el-checkbox>
        <el-checkbox value="coding">编程</el-checkbox>
        <el-checkbox value="gaming">游戏</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'

const formRef = ref(null)

const form = reactive({
  username: '',
  password: '',
  gender: '',
  hobbies: [],
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码不少于 6 位', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' },
  ],
}

// 提交：先校验再提交
const submitForm = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return
  console.log('提交数据：', form)
}

// 重置：清空内容并清除校验状态
const resetForm = () => {
  formRef.value.resetFields()
}
</script>
```

---

### Table 表格

```vue
<template>
  <el-table
    :data="tableData"
    stripe
    border
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <!-- 多选列 -->
    <el-table-column type="selection" width="55" />

    <!-- 序号列 -->
    <el-table-column type="index" label="序号" width="60" />

    <el-table-column prop="name" label="姓名" sortable width="120" />
    <el-table-column prop="age" label="年龄" width="80" />
    <el-table-column prop="address" label="地址" show-overflow-tooltip />

    <!-- 自定义列（插槽） -->
    <el-table-column label="操作" width="160" fixed="right">
      <template #default="{ row }">
        <el-button size="small" @click="handleEdit(row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[10, 20, 50]"
    :total="total"
    layout="total, sizes, prev, pager, next, jumper"
    @change="fetchData"
  />
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 28, address: '北京市朝阳区' },
  { name: '李四', age: 32, address: '上海市浦东新区' },
  { name: '王五', age: 25, address: '广州市天河区' },
])

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const handleSelectionChange = (selection) => {
  console.log('已选中：', selection)
}

const handleEdit = (row) => {
  console.log('编辑：', row)
}

const handleDelete = (row) => {
  console.log('删除：', row)
}

const fetchData = () => {
  console.log(`请求第 ${currentPage.value} 页，每页 ${pageSize.value} 条`)
}
</script>
```

---

### Dialog 对话框

```vue
<template>
  <el-button type="primary" @click="dialogVisible = true">打开对话框</el-button>

  <el-dialog
    v-model="dialogVisible"
    title="新增用户"
    width="500px"
    :close-on-click-modal="false"
    @closed="handleClosed"
  >
    <!-- 内容区 -->
    <el-form :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>

    <!-- 底部按钮区（footer 插槽） -->
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'

const dialogVisible = ref(false)
const form = reactive({ name: '' })

const handleConfirm = () => {
  console.log('确认提交：', form)
  dialogVisible.value = false
}

// 关闭动画结束后清空表单
const handleClosed = () => {
  form.name = ''
}
</script>
```

---

### Message / MessageBox / Notification 消息提示

```vue
<script setup>
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

// ① Message：轻提示（顶部居中，自动消失）
const showMessage = () => {
  ElMessage.success('操作成功')
  ElMessage.error('操作失败')
  ElMessage.warning('请注意')
  ElMessage({ message: '自定义消息', type: 'info', duration: 3000 })
}

// ② MessageBox：确认弹框（需用户操作）
const showConfirm = async () => {
  try {
    await ElMessageBox.confirm('确定要删除该记录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    ElMessage.success('已删除')
  } catch {
    ElMessage.info('已取消')
  }
}

// ③ Notification：通知（右上角，停留时间较长）
const showNotification = () => {
  ElNotification({
    title: '新消息',
    message: '您有一条新的系统通知',
    type: 'info',
    duration: 4500,
  })
}
</script>
```

---

### Loading 加载

```vue
<template>
  <!-- 方式一：指令，绑定到容器元素 -->
  <div v-loading="loading" style="height: 200px; border: 1px solid #eee;">
    <p>数据内容区域</p>
  </div>
  <el-button @click="loading = !loading">切换 Loading</el-button>
</template>

<script setup>
import { ref } from 'vue'
import { ElLoading } from 'element-plus'

const loading = ref(false)

// 方式二：全屏 Loading（适合页面跳转/接口请求）
const showFullscreenLoading = () => {
  const loadingInstance = ElLoading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => loadingInstance.close(), 2000)
}
</script>
```

---

### Menu 导航菜单

```vue
<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">工作台</el-menu-item>

    <!-- 子菜单 -->
    <el-sub-menu index="3">
      <template #title>系统管理</template>
      <el-menu-item index="3-1">用户管理</el-menu-item>
      <el-menu-item index="3-2">角色管理</el-menu-item>
      <el-menu-item index="3-3">权限管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key) => {
  console.log('选中菜单：', key)
}
</script>
```

**与 Vue Router 配合使用：**

```vue
<el-menu router :default-active="$route.path">
  <el-menu-item index="/home">首页</el-menu-item>
  <el-menu-item index="/user">用户管理</el-menu-item>
</el-menu>
```

---

### Upload 文件上传

```vue
<template>
  <el-upload
    action="https://your-api.com/upload"
    :headers="{ Authorization: 'Bearer ' + token }"
    :on-success="handleSuccess"
    :on-error="handleError"
    :before-upload="beforeUpload"
    :limit="3"
    :on-exceed="handleExceed"
    accept=".jpg,.png,.pdf"
    multiple
  >
    <el-button type="primary">点击上传</el-button>
    <template #tip>
      <div class="el-upload__tip">只能上传 jpg/png/pdf 文件，且不超过 10MB</div>
    </template>
  </el-upload>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const token = 'your-token'

// 上传前校验
const beforeUpload = (file) => {
  const isLt10M = file.size / 1024 / 1024 < 10
  if (!isLt10M) {
    ElMessage.error('文件大小不能超过 10MB')
    return false
  }
  return true
}

const handleSuccess = (response, file) => {
  ElMessage.success(`${file.name} 上传成功`)
}

const handleError = () => {
  ElMessage.error('上传失败，请重试')
}

const handleExceed = () => {
  ElMessage.warning('最多只能上传 3 个文件')
}
</script>
```

---

## 图标使用

Element Plus 的图标独立为 `@element-plus/icons-vue` 包：

```bash
npm install @element-plus/icons-vue
```

```vue
<template>
  <!-- 直接用作组件 -->
  <el-icon :size="20" color="#409eff"><Search /></el-icon>

  <!-- 配合 el-button -->
  <el-button :icon="Edit">编辑</el-button>

  <!-- 配合 el-input 的前缀 -->
  <el-input :prefix-icon="Search" placeholder="搜索" />
</template>

<script setup>
import { Search, Edit, Delete, Plus, Download } from '@element-plus/icons-vue'
</script>
```

---

## 布局系统

### Grid 栅格（24列）

```vue
<template>
  <!-- gutter：列间距 -->
  <el-row :gutter="20">
    <el-col :span="6">占 6 列（1/4）</el-col>
    <el-col :span="12">占 12 列（1/2）</el-col>
    <el-col :span="6">占 6 列（1/4）</el-col>
  </el-row>

  <!-- 响应式断点：xs / sm / md / lg / xl -->
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12" :md="8" :lg="6">
      响应式列
    </el-col>
  </el-row>
</template>
```

### Space 间距

```vue
<template>
  <!-- 统一管理子元素间距，替代手写 margin -->
  <el-space :size="16" wrap>
    <el-button>按钮1</el-button>
    <el-button>按钮2</el-button>
    <el-button>按钮3</el-button>
  </el-space>
</template>
```

---

## 常用 Hooks（组合式 API）

### useFormRules —— 统一管理校验规则

```js
// composables/useFormRules.js
export const useFormRules = () => {
  const requiredRule = (message) => [{ required: true, message, trigger: 'blur' }]

  const emailRule = [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ]

  return { requiredRule, emailRule }
}
```

### useLoading —— 封装接口 Loading 状态

```js
// composables/useLoading.js
import { ref } from 'vue'

export const useLoading = (asyncFn) => {
  const loading = ref(false)

  const run = async (...args) => {
    loading.value = true
    try {
      return await asyncFn(...args)
    } finally {
      loading.value = false
    }
  }

  return { loading, run }
}
```

```vue
<script setup>
import { useLoading } from '@/composables/useLoading'
import { fetchUserList } from '@/api/user'

const { loading, run: loadUsers } = useLoading(fetchUserList)

// 调用时自动管理 loading 状态
const users = await loadUsers()
</script>
```

---

## 在 Axios 中配合全屏 Loading

```js
// request.js
import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'

let loadingInstance = null

const request = axios.create({ baseURL: '/api', timeout: 10000 })

// 请求拦截：开启 Loading
request.interceptors.request.use((config) => {
  loadingInstance = ElLoading.service({ lock: true, text: '请求中...' })
  return config
})

// 响应拦截：关闭 Loading，统一错误提示
request.interceptors.response.use(
  (response) => {
    loadingInstance?.close()
    return response.data
  },
  (error) => {
    loadingInstance?.close()
    ElMessage.error(error.response?.data?.message || '网络错误')
    return Promise.reject(error)
  }
)

export default request
```

---

## FAQ

**Q：组件样式不生效？**  
A：检查是否引入了 `element-plus/dist/index.css`；使用按需导入时，插件会自动注入样式，无需手动引入。

**Q：`ElMessage` 等 API 在 JS 文件中不好用？**  
A：在非组件的 `.js` 文件中直接 `import { ElMessage } from 'element-plus'` 即可，不依赖组件上下文。

**Q：表单 `validate()` 报错 "Cannot read properties of null"？**  
A：`formRef.value` 为 null，通常是在 `onMounted` 之前调用了校验，或 `ref="formRef"` 绑定有误。

**Q：Table 数据更新后视图不刷新？**  
A：确保 `tableData` 是 `ref` 或 `reactive` 响应式数据，直接替换数组引用（`tableData.value = [...]`）而非 `push`，可触发视图更新。

**Q：Dialog 关闭后表单数据残留？**  
A：监听 `@closed` 事件（动画结束后）调用 `formRef.value.resetFields()` 重置，避免用 `@close`（动画未结束时重置会有闪烁）。
