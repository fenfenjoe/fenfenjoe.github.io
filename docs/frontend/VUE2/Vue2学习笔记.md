---
title: Vue2 学习笔记
sidebarDepth: 2
---

# Vue2 学习笔记

## 项目目录结构

```
my-vue2-project/
├── node_modules/         # 依赖包
├── public/
│   └── index.html        # 宿主 HTML，Vue 挂载到 #app
├── src/
│   ├── api/              # 接口请求封装
│   ├── assets/           # 静态资源
│   ├── components/       # 可复用组件
│   ├── router/           # 路由配置（vue-router 3）
│   ├── store/            # 状态管理（Vuex）
│   ├── views/            # 页面级组件
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── .env.development      # 开发环境变量
├── .env.production       # 生产环境变量
├── babel.config.js       # Babel 配置
├── vue.config.js         # Vue CLI / Webpack 配置
└── package.json
```

---

## 创建项目

```bash
# 安装 Vue CLI
npm install -g @vue/cli

# 创建项目
vue create my-vue2-app

# 选择 Vue 2 preset，或手动选择特性
cd my-vue2-app
npm run serve   # 启动开发服务器（默认 8080 端口）
npm run build   # 构建生产包
```

---

## Vue 实例

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

new Vue({
  el: '#app',       // 挂载点（也可以用 vm.$mount('#app')）
  router,
  store,
  render: h => h(App)
})
```

---

## 模板语法

```vue
<template>
  <div>
    <!-- 插值 -->
    <p>{{ message }}</p>
    <p>{{ message.toUpperCase() }}</p>

    <!-- 绑定属性（v-bind 简写 :） -->
    <img :src="imgUrl" :alt="title" />
    <button :disabled="isLoading">提交</button>

    <!-- 事件（v-on 简写 @） -->
    <button @click="handleClick">点击</button>
    <button @click="handleClick($event, 'arg1')">传参</button>
    <form @submit.prevent="handleSubmit">...</form>

    <!-- 条件渲染 -->
    <p v-if="score >= 90">优秀</p>
    <p v-else-if="score >= 60">及格</p>
    <p v-else>不及格</p>

    <!-- v-show：切换 display，元素始终渲染 -->
    <p v-show="isVisible">可见内容</p>

    <!-- 列表渲染 -->
    <ul>
      <li v-for="(item, index) in list" :key="item.id">
        {{ index }} - {{ item.name }}
      </li>
    </ul>

    <!-- 双向绑定 -->
    <input v-model="inputValue" />
    <input v-model.trim="name" />      <!-- 去除首尾空格 -->
    <input v-model.number="age" />     <!-- 转数字 -->
    <input v-model.lazy="text" />      <!-- blur 时更新 -->
  </div>
</template>
```

---

## Options API

```vue
<script>
export default {
  name: 'MyComponent',

  // 组件数据（必须是函数，保证每个实例独立）
  data() {
    return {
      message: 'Hello Vue2',
      count: 0,
      list: [],
      form: { name: '', age: '' },
    }
  },

  // 计算属性（有缓存，依赖不变不重新计算）
  computed: {
    fullName() {
      return `${this.form.name} (${this.form.age})`
    },
    // 可读可写的计算属性
    reversedMessage: {
      get() { return this.message.split('').reverse().join('') },
      set(val) { this.message = val.split('').reverse().join('') }
    }
  },

  // 侦听器（适合异步操作、副作用）
  watch: {
    // 简单侦听
    count(newVal, oldVal) {
      console.log(`count: ${oldVal} → ${newVal}`)
    },
    // 深度侦听对象
    form: {
      handler(newVal) { console.log('form changed', newVal) },
      deep: true,
      immediate: true  // 组件创建时立即执行一次
    },
    // 侦听对象的某个属性
    'form.name'(newVal) {
      console.log('name changed:', newVal)
    }
  },

  // 方法
  methods: {
    handleClick() {
      this.count++
    },
    async fetchData() {
      const res = await this.$axios.get('/api/list')
      this.list = res.data
    }
  },
}
</script>
```

---

## 生命周期

```js
export default {
  // 创建阶段（此时还没有 DOM）
  beforeCreate() {
    // data、methods 还未初始化，很少使用
  },
  created() {
    // data、methods 已就绪，常用于发起数据请求
    this.fetchData()
  },

  // 挂载阶段
  beforeMount() {
    // DOM 即将生成
  },
  mounted() {
    // DOM 已生成，可操作 DOM、初始化第三方库（如 ECharts）
    this.$refs.chart.init()
  },

  // 更新阶段
  beforeUpdate() {
    // 数据已变，DOM 还未更新
  },
  updated() {
    // DOM 已更新，避免在此修改数据（死循环）
  },

  // 销毁阶段
  beforeDestroy() {
    // 组件即将销毁，清理定时器、取消事件监听
    clearInterval(this.timer)
    window.removeEventListener('resize', this.handleResize)
  },
  destroyed() {
    // 组件已销毁
  },

  // keep-alive 专用
  activated() { /* 从缓存中激活 */ },
  deactivated() { /* 进入缓存 */ },
}
```

---

## 组件

### 注册与使用

```js
// 全局注册（在 main.js 中）
import MyButton from '@/components/MyButton.vue'
Vue.component('MyButton', MyButton)

// 局部注册（在单文件组件中）
export default {
  components: { MyButton }
}
```

### Props（父 → 子）

```vue
<!-- 子组件 UserCard.vue -->
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 0,
    },
    tags: {
      type: Array,
      default: () => [],  // 引用类型必须用工厂函数
    },
    config: {
      type: Object,
      default: () => ({ size: 'medium' }),
    },
    // 多种类型
    value: [String, Number],
    // 自定义校验
    status: {
      validator(val) {
        return ['active', 'inactive', 'pending'].includes(val)
      }
    }
  }
}
</script>

<!-- 父组件使用 -->
<template>
  <UserCard name="Tom" :age="25" :tags="['前端', 'Vue']" />
</template>
```

### $emit（子 → 父）

```vue
<!-- 子组件 -->
<template>
  <button @click="handleClick">点击</button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit('click-btn', { count: 1 })  // 触发事件，传递数据
    }
  }
}
</script>

<!-- 父组件 -->
<template>
  <ChildComp @click-btn="handleChildClick" />
</template>

<script>
export default {
  methods: {
    handleChildClick(data) {
      console.log('子组件数据：', data)
    }
  }
}
</script>
```

### v-model（父子双向绑定）

```vue
<!-- 父组件 -->
<MyInput v-model="searchText" />
<!-- 等价于 -->
<MyInput :value="searchText" @input="searchText = $event" />

<!-- 子组件 MyInput.vue -->
<template>
  <input :value="value" @input="$emit('input', $event.target.value)" />
</template>

<script>
export default {
  props: ['value']  // v-model 默认绑定 value prop
}
</script>
```

### $refs（父访问子实例）

```vue
<template>
  <ChildComp ref="child" />
  <button @click="callChildMethod">调用子组件方法</button>
</template>

<script>
export default {
  methods: {
    callChildMethod() {
      this.$refs.child.reset()   // 直接调用子组件的方法
      console.log(this.$refs.child.value)  // 访问子组件的数据
    }
  }
}
</script>
```

### provide / inject（跨层级传值）

```js
// 祖先组件
export default {
  provide() {
    return {
      theme: 'dark',
      // ⚠️ Vue2 的 provide 默认不是响应式的
      // 要响应式需传对象引用
      config: this.config,
    }
  }
}

// 后代组件
export default {
  inject: ['theme', 'config'],
  mounted() {
    console.log(this.theme)  // 'dark'
  }
}
```

---

## 响应式注意事项

Vue2 基于 `Object.defineProperty`，有以下限制：

```js
export default {
  data() {
    return {
      obj: { name: 'Tom' },
      arr: [1, 2, 3]
    }
  },
  methods: {
    update() {
      // ❌ 直接新增属性，不是响应式
      this.obj.age = 25

      // ✅ 用 $set 新增属性（响应式）
      this.$set(this.obj, 'age', 25)
      // 或
      Vue.set(this.obj, 'age', 25)

      // ❌ 直接删除属性，不是响应式
      delete this.obj.name

      // ✅ 用 $delete 删除
      this.$delete(this.obj, 'name')

      // ❌ 通过下标修改数组，不是响应式
      this.arr[0] = 10

      // ✅ 用变异方法 或 $set
      this.arr.splice(0, 1, 10)
      this.$set(this.arr, 0, 10)

      // ✅ Vue2 响应式的数组变异方法
      // push / pop / shift / unshift / splice / sort / reverse
      this.arr.push(4)
      this.arr.splice(1, 1)
    }
  }
}
```

---

## 插槽（Slot）

```vue
<!-- 子组件 Card.vue -->
<template>
  <div class="card">
    <!-- 默认插槽 -->
    <slot></slot>

    <!-- 具名插槽 -->
    <slot name="header"></slot>
    <slot name="footer"></slot>

    <!-- 作用域插槽（将子组件数据暴露给父组件） -->
    <slot name="item" :row="currentRow" :index="currentIndex"></slot>
  </div>
</template>

<!-- 父组件使用 -->
<template>
  <Card>
    <!-- 默认插槽 -->
    <p>卡片内容</p>

    <!-- 具名插槽（v-slot 简写 #） -->
    <template #header>
      <h2>卡片标题</h2>
    </template>

    <template #footer>
      <button>确定</button>
    </template>

    <!-- 作用域插槽：接收子组件暴露的数据 -->
    <template #item="{ row, index }">
      <span>{{ index }}: {{ row.name }}</span>
    </template>
  </Card>
</template>
```

---

## 常见开发场景

### 1. 发送 HTTP 请求（axios）

```js
// main.js 全局挂载 axios
import axios from 'axios'
Vue.prototype.$axios = axios

// 组件中使用
export default {
  data() {
    return { list: [], loading: false }
  },
  async created() {
    this.loading = true
    try {
      const res = await this.$axios.get('/api/list', {
        params: { page: 1, size: 10 }
      })
      this.list = res.data.list
    } catch (err) {
      console.error(err)
    } finally {
      this.loading = false
    }
  }
}
```

### 2. 表单处理

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.username" placeholder="用户名" />
    <input v-model="form.password" type="password" placeholder="密码" />
    <button type="submit" :disabled="loading">
      {{ loading ? '登录中...' : '登录' }}
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: { username: '', password: '' }
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      try {
        const res = await this.$axios.post('/api/login', this.form)
        this.$router.push('/dashboard')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
```

### 3. 路由跳转

```js
// 编程式导航
this.$router.push('/home')
this.$router.push({ name: 'UserDetail', params: { id: 1 } })
this.$router.push({ path: '/search', query: { keyword: 'vue' } })
this.$router.replace('/login')
this.$router.go(-1)

// 获取路由信息
this.$route.params.id       // 动态参数
this.$route.query.keyword   // 查询参数
this.$route.path            // 当前路径
```

### 4. 查询数据 & 渲染表格

```vue
<template>
  <div>
    <input v-model="query.keyword" placeholder="关键字" />
    <button @click="handleSearch">查询</button>

    <table v-if="!loading">
      <tr v-for="row in tableData" :key="row.id">
        <td>{{ row.name }}</td>
        <td>{{ row.status === 1 ? '启用' : '禁用' }}</td>
        <td>
          <button @click="handleEdit(row)">编辑</button>
          <button @click="handleDelete(row.id)">删除</button>
        </td>
      </tr>
    </table>
    <p v-else>加载中...</p>

    <div>
      <button :disabled="page <= 1" @click="changePage(page - 1)">上一页</button>
      <span>第 {{ page }} / {{ totalPages }} 页</span>
      <button :disabled="page >= totalPages" @click="changePage(page + 1)">下一页</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: { keyword: '' },
      tableData: [],
      loading: false,
      page: 1,
      pageSize: 10,
      total: 0,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        const res = await this.$axios.get('/api/list', {
          params: { ...this.query, page: this.page, pageSize: this.pageSize }
        })
        this.tableData = res.data.list
        this.total = res.data.total
      } finally {
        this.loading = false
      }
    },
    handleSearch() {
      this.page = 1
      this.loadData()
    },
    changePage(page) {
      this.page = page
      this.loadData()
    },
    handleEdit(row) {
      // 打开弹窗
    },
    async handleDelete(id) {
      if (!confirm('确认删除？')) return
      await this.$axios.delete(`/api/item/${id}`)
      this.loadData()
    }
  }
}
</script>
```

### 5. 弹窗 & 获取返回参数

```vue
<!-- 父组件 -->
<template>
  <div>
    <button @click="openEdit(row)">编辑</button>
    <EditDialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :init-data="dialogData"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogData: null,
    }
  },
  methods: {
    openEdit(row) {
      this.dialogData = { ...row }
      this.dialogVisible = true
    },
    async handleConfirm(formData) {
      await this.$axios.put(`/api/item/${formData.id}`, formData)
      this.dialogVisible = false
      this.loadData()
    }
  }
}
</script>
```

```vue
<!-- 子组件 EditDialog.vue -->
<template>
  <div class="dialog" v-if="visible">
    <input v-model="form.name" />
    <button @click="handleConfirm">确认</button>
    <!-- .sync 修饰符：子组件可通过 $emit('update:visible', false) 关闭弹窗 -->
    <button @click="$emit('update:visible', false)">取消</button>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    initData: Object,
  },
  data() {
    return {
      form: { name: '', id: null }
    }
  },
  watch: {
    visible(val) {
      if (val && this.initData) {
        this.form = { ...this.initData }
      }
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('confirm', { ...this.form })
    }
  }
}
</script>
```

---

## 自定义指令

```js
// 全局注册
Vue.directive('focus', {
  inserted(el) {        // 元素插入 DOM 后
    el.focus()
  }
})

// 局部注册
export default {
  directives: {
    color: {
      bind(el, binding) {           // 指令绑定到元素时
        el.style.color = binding.value
      },
      update(el, binding) {         // 组件更新时
        el.style.color = binding.value
      }
    }
  }
}
```

```vue
<input v-focus />
<p v-color="'red'">红色文字</p>
```

---

## 过滤器（Vue2 特有，Vue3 已移除）

```js
// 全局过滤器
Vue.filter('formatDate', (val) => {
  if (!val) return ''
  return new Date(val).toLocaleDateString()
})

Vue.filter('currency', (val, symbol = '¥') => {
  return `${symbol}${Number(val).toFixed(2)}`
})
```

```vue
<!-- 模板中使用管道符 -->
<p>{{ createTime | formatDate }}</p>
<p>{{ price | currency }}</p>
<p>{{ price | currency('$') }}</p>
```

---

## 混入（Mixin）

将可复用逻辑提取到 mixin，在多个组件中共享（Vue3 中用 composable 替代）。

```js
// mixins/tableMixin.js
export const tableMixin = {
  data() {
    return {
      tableData: [],
      loading: false,
      page: 1,
      pageSize: 10,
      total: 0,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    changePage(page) {
      this.page = page
      this.loadData()
    }
  }
}

// 组件中使用
import { tableMixin } from '@/mixins/tableMixin'
export default {
  mixins: [tableMixin],
  methods: {
    async loadData() {
      // 组件自己实现具体的请求逻辑
    }
  }
}
```

> **Mixin 的缺点**：命名冲突、来源不清晰。Vue3 推荐用 Composition API 的 composable 替代。
