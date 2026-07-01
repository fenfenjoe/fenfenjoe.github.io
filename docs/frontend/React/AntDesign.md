---
title: Ant Design
sidebarDepth: 2
---

# Ant Design

> 阿里巴巴出品的企业级 React UI 组件库，是国内中后台项目的事实标准。  
> 当前主流版本为 **antd v5**（2022年底发布），基于 CSS-in-JS，彻底移除了 Less 依赖。  
> 官网：[https://ant.design/index-cn](https://ant.design/index-cn)

## 安装与接入

### 安装

```bash
npm install antd
```

### 接入方式对比

| 方式 | 特点 | 适用场景 |
|------|------|--------|
| 直接使用（v5 推荐） | v5 内置按需加载，无需额外配置 | 所有项目 |
| 完整引入样式（v4 及以下） | 需手动引入 `antd/dist/antd.css` | v4 老项目 |
| 按需加载（v4 借助 babel-plugin） | 减小打包体积 | v4 项目优化 |

---

### v5 接入（推荐）

v5 默认使用 CSS-in-JS，**无需引入任何 CSS 文件**，直接使用即可：

```jsx
// main.jsx（或 index.jsx）
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

```jsx
// App.jsx
import { Button } from 'antd'

export default function App() {
  return <Button type="primary">Hello Ant Design</Button>
}
```

> v5 引入即用，Tree-shaking 自动处理，打包只包含用到的组件。

---

### 国际化（中文）

antd 默认英文（日期选择器、分页文案等），切换为中文：

```jsx
// App.jsx 或顶层组件
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')  // dayjs 也设为中文，日期组件需要

export default function App() {
  return (
    <ConfigProvider locale={zhCN}>
      {/* 所有子组件都生效 */}
      <YourRouterOrLayout />
    </ConfigProvider>
  )
}
```

---

### 主题定制（v5）

v5 通过 `ConfigProvider` 的 `theme` prop 定制设计 Token，无需修改 Less 变量：

```jsx
import { ConfigProvider, Button } from 'antd'

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',    // 主色
          borderRadius: 4,            // 全局圆角
          colorBgContainer: '#f6ffed', // 容器背景色
        },
        components: {
          Button: {
            colorPrimary: '#ff4d4f',  // 单独覆盖 Button 的主色
          },
        },
      }}
    >
      <Button type="primary">定制主题按钮</Button>
    </ConfigProvider>
  )
}
```

---

## 核心概念

### 组件命名规则

| 用法 | 说明 |
|------|------|
| `import { Button } from 'antd'` | 所有组件均具名导出，PascalCase 命名 |
| `<Button type="primary">` | props 驱动样式，不依赖 className |
| `Button.Group`、`Form.Item` | 子组件通过点语法访问 |

---

### ConfigProvider

ConfigProvider 是 antd 的全局配置组件，一般放在应用最外层，统一控制：

| 配置项 | 作用 |
|--------|------|
| `locale` | 国际化语言 |
| `theme` | 主题 Token |
| `size` | 全局组件尺寸（`large` / `middle` / `small`） |
| `prefixCls` | 组件 CSS 前缀（默认 `ant`，微前端时避免冲突） |
| `componentSize` | 同 size |

---

### 设计 Token（v5 新概念）

v5 将样式变量分为两层：

| 层级 | 说明 | 示例 |
|------|------|------|
| **Global Token** | 全局设计变量，影响所有组件 | `colorPrimary`、`borderRadius` |
| **Component Token** | 单个组件的专属变量 | `Button.colorPrimary` |

常用 Global Token：

```js
{
  colorPrimary: '#1677ff',       // 主色
  colorSuccess: '#52c41a',       // 成功色
  colorWarning: '#faad14',       // 警告色
  colorError: '#ff4d4f',         // 错误色
  colorTextBase: '#000',         // 基础文字色
  borderRadius: 6,               // 全局圆角
  fontSize: 14,                  // 基础字号
  wireframe: false,              // 线框模式（true 时所有组件改为线框风格）
}
```

---

## 常用组件

### Button 按钮

```jsx
import { Button, Space, Flex } from 'antd'
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons'

export default function Demo() {
  return (
    <Flex gap="small" wrap>
      {/* type: default / primary / dashed / text / link */}
      <Button>默认</Button>
      <Button type="primary">主要</Button>
      <Button type="dashed">虚线</Button>
      <Button type="text">文本</Button>
      <Button type="link">链接</Button>

      {/* 危险状态 */}
      <Button danger>危险</Button>
      <Button type="primary" danger>主要危险</Button>

      {/* 图标 */}
      <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
      <Button icon={<DownloadOutlined />} />

      {/* 加载 / 禁用 */}
      <Button type="primary" loading>提交中</Button>
      <Button disabled>禁用</Button>

      {/* 尺寸 */}
      <Button size="large">大</Button>
      <Button size="small">小</Button>
    </Flex>
  )
}
```

---

### Input 输入框

```jsx
import { Input, Space } from 'antd'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { useState } from 'react'

export default function Demo() {
  const [value, setValue] = useState('')

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Input
        placeholder="基础输入框"
        value={value}
        onChange={e => setValue(e.target.value)}
        allowClear
      />

      {/* 前缀 / 后缀图标 */}
      <Input prefix={<UserOutlined />} placeholder="用户名" />
      <Input suffix={<SearchOutlined />} placeholder="搜索" />

      {/* 密码框 */}
      <Input.Password placeholder="请输入密码" />

      {/* 文本域 */}
      <Input.TextArea rows={4} placeholder="请输入描述" maxLength={200} showCount />

      {/* 搜索框（带按钮） */}
      <Input.Search
        placeholder="输入关键词"
        enterButton="搜索"
        onSearch={val => console.log('搜索：', val)}
      />
    </Space>
  )
}
```

---

### Select 选择器

```jsx
import { Select, Space } from 'antd'
import { useState } from 'react'

const options = [
  { value: 'beijing', label: '北京' },
  { value: 'shanghai', label: '上海' },
  { value: 'guangzhou', label: '广州' },
]

export default function Demo() {
  const [city, setCity] = useState(null)
  const [cities, setCities] = useState([])

  return (
    <Space direction="vertical" style={{ width: 300 }}>
      {/* 基础 */}
      <Select
        value={city}
        onChange={setCity}
        options={options}
        placeholder="请选择城市"
        allowClear
        style={{ width: '100%' }}
      />

      {/* 多选 */}
      <Select
        mode="multiple"
        value={cities}
        onChange={setCities}
        options={options}
        placeholder="可多选"
        style={{ width: '100%' }}
      />

      {/* 可搜索 */}
      <Select
        showSearch
        options={options}
        placeholder="输入搜索"
        filterOption={(input, option) =>
          option.label.toLowerCase().includes(input.toLowerCase())
        }
        style={{ width: '100%' }}
      />
    </Space>
  )
}
```

---

### Form 表单

> antd Form 基于 rc-field-form，使用 `Form.useForm()` 获取实例，`rules` 支持内置校验器和自定义校验函数。

```jsx
import { Form, Input, Button, Select, Radio, Checkbox, message } from 'antd'

export default function Demo() {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log('表单提交：', values)
    message.success('提交成功')
  }

  const onFinishFailed = ({ errorFields }) => {
    console.log('校验失败：', errorFields)
  }

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}       // label 占 4 列
      wrapperCol={{ span: 16 }}    // 控件占 16 列
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          { required: true, message: '请输入用户名' },
          { min: 3, max: 16, message: '长度在 3~16 个字符' },
        ]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>

      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '邮箱格式不正确' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }, { min: 6 }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="确认密码"
        name="confirmPassword"
        dependencies={['password']}   // 依赖 password 字段，password 变化时重新校验
        rules={[
          { required: true, message: '请确认密码' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('两次密码不一致'))
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label="城市" name="city">
        <Select
          options={[
            { value: 'bj', label: '北京' },
            { value: 'sh', label: '上海' },
          ]}
          placeholder="请选择"
        />
      </Form.Item>

      <Form.Item label="性别" name="gender">
        <Radio.Group>
          <Radio value="male">男</Radio>
          <Radio value="female">女</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="爱好" name="hobbies">
        <Checkbox.Group
          options={[
            { label: '阅读', value: 'reading' },
            { label: '编程', value: 'coding' },
            { label: '游戏', value: 'gaming' },
          ]}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit">提交</Button>
        <Button style={{ marginLeft: 8 }} onClick={() => form.resetFields()}>重置</Button>
      </Form.Item>
    </Form>
  )
}
```

---

### Table 表格

```jsx
import { Table, Button, Space, Tag, Popconfirm, message } from 'antd'
import { useState } from 'react'

const initialData = [
  { key: '1', name: '张三', age: 28, status: 'active', address: '北京市朝阳区' },
  { key: '2', name: '李四', age: 32, status: 'inactive', address: '上海市浦东新区' },
  { key: '3', name: '王五', age: 25, status: 'active', address: '广州市天河区' },
]

export default function Demo() {
  const [data, setData] = useState(initialData)
  const [selectedKeys, setSelectedKeys] = useState([])
  const [loading, setLoading] = useState(false)

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '年龄',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        { text: '启用', value: 'active' },
        { text: '禁用', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '地址',
      dataIndex: 'address',
      ellipsis: true,   // 超长省略号
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" onClick={() => handleEdit(record)}>编辑</Button>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => handleDelete(record.key)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const handleEdit = (record) => {
    console.log('编辑：', record)
  }

  const handleDelete = (key) => {
    setData(data.filter(item => item.key !== key))
    message.success('删除成功')
  }

  const rowSelection = {
    selectedRowKeys: selectedKeys,
    onChange: setSelectedKeys,
  }

  return (
    <>
      {selectedKeys.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          已选 {selectedKeys.length} 条
          <Button type="link" onClick={() => setSelectedKeys([])}>取消选择</Button>
        </div>
      )}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10, showTotal: total => `共 ${total} 条` }}
        bordered
      />
    </>
  )
}
```

---

### Modal 对话框

```jsx
import { Modal, Form, Input, Button, message } from 'antd'
import { useState } from 'react'

export default function Demo() {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [form] = Form.useForm()

  const handleOk = async () => {
    try {
      const values = await form.validateFields()   // 校验并获取值
      setConfirmLoading(true)
      // 模拟接口请求
      await new Promise(r => setTimeout(r, 1000))
      console.log('提交：', values)
      message.success('操作成功')
      setOpen(false)
      form.resetFields()
    } catch {
      // 校验失败，不处理（antd 会自动显示错误信息）
    } finally {
      setConfirmLoading(false)
    }
  }

  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
  }

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>新增用户</Button>

      <Modal
        title="新增用户"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        maskClosable={false}      // 点击遮罩不关闭
        destroyOnClose            // 关闭时销毁内容，下次打开重置状态
      >
        <Form form={form} labelCol={{ span: 4 }} style={{ marginTop: 24 }}>
          <Form.Item label="姓名" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email" rules={[{ type: 'email' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
```

---

### Message / Notification / Modal.confirm 消息提示

```jsx
import { message, notification, Modal, Button, Space } from 'antd'

export default function Demo() {
  // ① message：顶部轻提示，自动消失
  const showMessage = () => {
    message.success('操作成功')
    message.error('操作失败')
    message.warning('请注意')
    message.info('提示信息')
    message.loading('加载中...', 2)  // 2秒后消失
  }

  // ② notification：右上角通知，停留时间较长
  const showNotification = () => {
    notification.open({
      message: '新消息',
      description: '您有一条新的系统通知，请及时处理。',
      type: 'info',
      duration: 4.5,
      placement: 'topRight',
    })
  }

  // ③ Modal.confirm：确认弹框
  const showConfirm = () => {
    Modal.confirm({
      title: '确认删除',
      content: '删除后无法恢复，是否继续？',
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        message.success('已删除')
      },
    })
  }

  return (
    <Space>
      <Button onClick={showMessage}>Message</Button>
      <Button onClick={showNotification}>Notification</Button>
      <Button danger onClick={showConfirm}>Modal.confirm</Button>
    </Space>
  )
}
```

---

### DatePicker 日期选择

```jsx
import { DatePicker, Space } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

export default function Demo() {
  const [date, setDate] = useState(null)
  const [range, setRange] = useState([null, null])

  return (
    <Space direction="vertical" size={12}>
      {/* 单日期 */}
      <DatePicker
        value={date}
        onChange={setDate}
        format="YYYY-MM-DD"
        placeholder="选择日期"
      />

      {/* 日期范围 */}
      <DatePicker.RangePicker
        value={range}
        onChange={setRange}
        format="YYYY-MM-DD"
      />

      {/* 禁用历史日期 */}
      <DatePicker
        disabledDate={current => current && current < dayjs().startOf('day')}
        placeholder="只能选今天及以后"
      />
    </Space>
  )
}
```

> antd v5 的日期组件依赖 **dayjs**（替代了 v4 的 moment.js），需安装：`npm install dayjs`

---

### Upload 文件上传

```jsx
import { Upload, Button, message } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import { useState } from 'react'

export default function Demo() {
  const [fileList, setFileList] = useState([])

  const uploadProps = {
    name: 'file',
    action: 'https://your-api.com/upload',
    headers: { Authorization: 'Bearer your-token' },
    fileList,
    onChange({ file, fileList }) {
      setFileList(fileList)
      if (file.status === 'done') {
        message.success(`${file.name} 上传成功`)
      } else if (file.status === 'error') {
        message.error(`${file.name} 上传失败`)
      }
    },
    beforeUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        message.error('文件不能超过 10MB')
        return Upload.LIST_IGNORE   // 阻止上传但不添加到列表
      }
      return true
    },
    maxCount: 3,
    accept: '.jpg,.png,.pdf',
  }

  return (
    <>
      {/* 按钮式上传 */}
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>点击上传</Button>
      </Upload>

      {/* 拖拽上传 */}
      <Upload.Dragger {...uploadProps} style={{ marginTop: 16 }}>
        <p><InboxOutlined style={{ fontSize: 48, color: '#1677ff' }} /></p>
        <p>点击或拖拽文件到此区域上传</p>
        <p style={{ color: '#999' }}>支持 jpg / png / pdf，单文件不超过 10MB</p>
      </Upload.Dragger>
    </>
  )
}
```

---

### Menu 导航菜单

```jsx
import { Menu, Layout } from 'antd'
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const menuItems = [
  { key: '/', icon: <HomeOutlined />, label: '首页' },
  {
    key: 'user',
    icon: <UserOutlined />,
    label: '用户管理',
    children: [
      { key: '/user/list', icon: <TeamOutlined />, label: '用户列表' },
      { key: '/user/role', label: '角色管理' },
    ],
  },
  { key: '/setting', icon: <SettingOutlined />, label: '系统设置' },
]

export default function SideMenu() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Layout.Sider width={220}>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}   // 根据当前路由高亮菜单项
        defaultOpenKeys={['user']}
        items={menuItems}
        onClick={({ key }) => navigate(key)}  // 点击跳转路由
        style={{ height: '100%' }}
      />
    </Layout.Sider>
  )
}
```

---

## 图标使用

antd 的图标独立为 `@ant-design/icons` 包：

```bash
npm install @ant-design/icons
```

```jsx
import {
  SearchOutlined,   // Outlined：线框风格（最常用）
  SearchFilled,     // Filled：填充风格
  SearchTwoTone,    // TwoTone：双色风格
  LoadingOutlined,
} from '@ant-design/icons'
import { Spin } from 'antd'

export default function Demo() {
  return (
    <div>
      <SearchOutlined style={{ fontSize: 20, color: '#1677ff' }} />
      <SearchFilled style={{ fontSize: 20 }} />
      <SearchTwoTone twoToneColor="#eb2f96" style={{ fontSize: 20 }} />

      {/* 自定义 Loading 图标 */}
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </div>
  )
}
```

---

## 布局系统

### Grid 栅格（24列）

```jsx
import { Row, Col, Divider } from 'antd'

export default function Demo() {
  const style = { background: '#0958d9', color: '#fff', padding: '8px 0', textAlign: 'center' }

  return (
    <>
      {/* gutter：列间距，[水平, 垂直] */}
      <Row gutter={[16, 16]}>
        <Col span={6}><div style={style}>6</div></Col>
        <Col span={12}><div style={style}>12</div></Col>
        <Col span={6}><div style={style}>6</div></Col>
      </Row>

      {/* 响应式：xs(<576) / sm(≥576) / md(≥768) / lg(≥992) / xl(≥1200) / xxl(≥1600) */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={style}>响应式列</div>
        </Col>
      </Row>
    </>
  )
}
```

### Space 间距

```jsx
import { Space, Button } from 'antd'

export default function Demo() {
  return (
    // size: 'small' | 'middle' | 'large' | number
    // wrap: 允许换行
    <Space size="middle" wrap>
      <Button>按钮1</Button>
      <Button>按钮2</Button>
      <Button>按钮3</Button>
    </Space>
  )
}
```

### Layout 页面布局

```jsx
import { Layout, Menu, theme } from 'antd'

const { Header, Content, Sider, Footer } = Layout

export default function BasicLayout({ children }) {
  const { token } = theme.useToken()  // 获取当前主题 Token

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        {/* 侧边导航 */}
        <div style={{ height: 32, margin: 16, background: 'rgba(255,255,255,.2)' }} />
        <Menu theme="dark" mode="inline" items={[]} />
      </Sider>

      <Layout>
        <Header style={{ background: token.colorBgContainer, padding: '0 24px' }}>
          {/* 顶部导航栏 */}
        </Header>

        <Content style={{ margin: '24px 16px', padding: 24, background: token.colorBgContainer }}>
          {children}
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          My App ©2024
        </Footer>
      </Layout>
    </Layout>
  )
}
```

---

## 与 React Hook Form / Zustand 搭配

实际项目中，antd Form 可以独立使用；如果状态管理需要跨组件共享表单数据，可搭配 Zustand：

```jsx
// 搭配 Zustand 存储表单草稿
import { create } from 'zustand'

const useFormStore = create((set) => ({
  draft: {},
  setDraft: (values) => set({ draft: values }),
  clearDraft: () => set({ draft: {} }),
}))

// 在表单组件中
const { draft, setDraft } = useFormStore()

// onValuesChange 实时保存草稿
<Form initialValues={draft} onValuesChange={(_, all) => setDraft(all)}>
  ...
</Form>
```

---

## 在 Axios 中配合全局 Loading

```js
// request.js
import axios from 'axios'
import { message } from 'antd'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// 请求拦截：附加 token
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 响应拦截：统一错误提示
request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status
    const msg = {
      400: '请求参数错误',
      401: '未登录，请先登录',
      403: '无权限访问',
      404: '资源不存在',
      500: '服务器内部错误',
    }[status] || error.response?.data?.message || '网络错误'

    message.error(msg)

    // 401 时跳转登录页
    if (status === 401) {
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default request
```

---

## FAQ

**Q：v5 和 v4 最大的区别是什么？**  
A：v5 用 CSS-in-JS 替代 Less，无需引入 CSS 文件，支持动态主题，但 SSR 需要额外配置；日期组件从 moment.js 改为 dayjs，体积大幅减小。

**Q：`message` / `notification` 在函数组件外（如 axios 拦截器）能用吗？**  
A：可以直接 `import { message } from 'antd'` 调用静态方法，不依赖 React 上下文。但 v5 推荐在组件内用 `message.useMessage()` hook，以便正确继承 ConfigProvider 的配置（如主题、语言）。

**Q：Table 的 `dataSource` 必须有 `key` 字段吗？**  
A：必须保证每行数据唯一标识，可以是 `key` 字段，也可以在 Table 上设置 `rowKey="id"` 指定其他字段。

**Q：Form 的 `initialValues` 和 `form.setFieldsValue` 有什么区别？**  
A：`initialValues` 只在组件首次挂载时生效，后续变化不会更新；`form.setFieldsValue(values)` 可在任意时刻动态填充表单（如编辑弹框回显数据）。

**Q：Modal 关闭后表单数据没清空？**  
A：在 Modal 上加 `destroyOnClose` 可在关闭时销毁内容；或在 `onCancel` / `afterClose` 中调用 `form.resetFields()`。两者都有效，`destroyOnClose` 更彻底但每次打开都重新挂载。

**Q：antd 组件样式被全局 CSS 污染怎么办？**  
A：v5 支持 CSS 隔离，在 ConfigProvider 上配置 `prefixCls` 修改前缀；或开启 `{ theme: { cssVar: true } }` 使用 CSS 变量模式，减少样式冲突。
