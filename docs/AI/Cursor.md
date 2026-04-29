---
title: Cursor IDE 完全指南
sidebar: 'auto'
---

# Cursor IDE 完全指南

> Cursor 是一款基于 VSCode 的 AI 编程工具，内置强大的 AI 辅助编程能力。

## 目录结构

本教程包括：
- Cursor 安装与基础配置
- Java 开发环境配置
- Vue 开发环境配置
- 大模型配置与 AI 功能使用
- Java + Vue 全栈项目配置
- 常用快捷键与最佳实践

## 一、Cursor IDE 安装

### 1.1 下载与安装

**官方网站**：[https://cursor.sh](https://cursor.sh)

**支持平台**：
- Windows 10/11
- macOS (Intel & Apple Silicon)
- Linux

**安装步骤**：

1. 访问官网下载对应系统的安装包
2. Windows：运行 `.exe` 安装程序
3. macOS：打开 `.dmg` 文件，拖动到 Applications 文件夹
4. Linux：按照官方文档使用对应的包管理器安装

### 1.2 首次启动配置

首次启动 Cursor 时：

1. **选择主题**：Light / Dark / Auto
2. **导入 VSCode 设置**（可选）：
   - 如果之前使用过 VSCode，可以选择导入设置、扩展和快捷键
   - 路径通常在 `%APPDATA%\Code\User\settings.json` (Windows)
3. **登录账号**：
   - 可以使用 GitHub / Google / Email 登录
   - 登录后可同步设置和使用 AI 功能

### 1.3 基础设置

打开设置：`Ctrl + ,` (Windows/Linux) 或 `Cmd + ,` (macOS)

推荐配置：
```json
{
  "editor.fontSize": 14,
  "editor.fontFamily": "Consolas, 'Courier New', monospace",
  "editor.tabSize": 4,
  "editor.formatOnSave": true,
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}
```

## 二、Java 开发环境配置

### 2.1 安装 JDK

**下载 JDK**：
- [Oracle JDK](https://www.oracle.com/java/technologies/downloads/)
- [OpenJDK](https://adoptium.net/) (推荐)

**配置环境变量** (Windows)：

1. 安装 JDK（如 JDK 17）
2. 设置 `JAVA_HOME`：
   ```
   变量名: JAVA_HOME
   变量值: C:\Program Files\Java\jdk-17
   ```
3. 添加到 `Path`：
   ```
   %JAVA_HOME%\bin
   ```
4. 验证安装：
   ```bash
   java -version
   javac -version
   ```

### 2.2 安装 Java 开发必备扩展

在 Cursor 中安装以下扩展（`Ctrl + Shift + X` 打开扩展市场）：

**核心扩展包**：
1. **Extension Pack for Java** (Microsoft)
   - 包含 Language Support for Java、Debugger for Java、Test Runner 等

**其他推荐扩展**：
2. **Spring Boot Extension Pack** - Spring Boot 开发工具
3. **Lombok Annotations Support** - Lombok 支持
4. **SonarLint** - 代码质量检查

### 2.3 配置 Maven/Gradle

**Maven 配置**：

1. 下载 [Apache Maven](https://maven.apache.org/download.cgi)
2. 配置环境变量：
   ```
   MAVEN_HOME=C:\Program Files\apache-maven-3.9.x
   Path 添加: %MAVEN_HOME%\bin
   ```
3. 配置国内镜像（可选），编辑 `settings.xml`：
   ```xml
   <mirrors>
     <mirror>
       <id>aliyun</id>
       <mirrorOf>central</mirrorOf>
       <url>https://maven.aliyun.com/repository/public</url>
     </mirror>
   </mirrors>
   ```

### 2.4 创建与调试 Java 项目

**创建项目**：
1. `Ctrl + Shift + P` 打开命令面板
2. 输入 `Java: Create Java Project`
3. 选择项目类型（Maven / Gradle / Spring Boot）

**调试配置** (`launch.json`)：
```json
{
  "type": "java",
  "name": "Debug Java Application",
  "request": "launch",
  "mainClass": "com.example.Main",
  "projectName": "your-project-name"
}
```

## 三、Vue 开发环境配置

### 3.1 安装 Node.js

**下载 Node.js**：[https://nodejs.org](https://nodejs.org)

推荐安装 LTS 版本（长期支持版）

**验证安装**：
```bash
node -v
npm -v
```

**配置 npm 镜像**（可选，加速下载）：
```bash
npm config set registry https://registry.npmmirror.com
```

### 3.2 安装 Vue 开发必备扩展

在 Cursor 扩展市场安装：

**核心扩展**：
1. **Vue - Official** (Vue Language Features) - Vue 3 官方扩展
2. **TypeScript Vue Plugin (Volar)** - Vue 的 TypeScript 支持

**其他推荐扩展**：
3. **ESLint** - 代码规范检查
4. **Prettier - Code formatter** - 代码格式化
5. **Auto Rename Tag** - 自动重命名配对标签
6. **Vue VSCode Snippets** - Vue 代码片段

### 3.3 创建 Vue 项目

**使用 Vite（推荐，更快）**：

```bash
# 创建 Vite + Vue 项目
npm create vite@latest my-vue-app -- --template vue

# 或使用 TypeScript 模板
npm create vite@latest my-vue-app -- --template vue-ts

# 安装依赖
cd my-vue-app
npm install

# 启动开发服务器
npm run dev
```

**使用 Vue CLI**：

```bash
# 全局安装 Vue CLI
npm install -g @vue/cli

# 创建项目
vue create my-vue-project

# 启动项目
cd my-vue-project
npm run serve
```

### 3.4 配置 ESLint + Prettier

**创建 `.eslintrc.js`**：
```javascript
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2021
  }
}
```

**创建 `.prettierrc.json`**：
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 100
}
```

**Cursor 设置中启用**：
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### 3.5 Vue 项目调试

**创建 `.vscode/launch.json`**：
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Vue: Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

**调试步骤**：
1. 在 Vue 代码中设置断点
2. 启动开发服务器：`npm run dev`
3. 按 `F5` 启动调试，自动打开 Chrome

## 四、大模型配置（AI 功能）

### 4.1 Cursor AI 功能介绍

Cursor 内置多种 AI 辅助功能：

1. **Cursor Tab** - AI 代码补全（类似 GitHub Copilot）
2. **Ctrl + K** - AI 代码编辑（行内修改）
3. **Ctrl + L** - AI 聊天（侧边栏对话）
4. **Cmd/Ctrl + Shift + L** - 引用当前代码到聊天
5. **@符号** - 在聊天中引用文件、代码、文档

### 4.2 配置 AI 模型

**打开 AI 设置**：
- 点击右上角头像 → `Settings` → `AI`
- 或使用快捷键 `Ctrl + Shift + P` → `Cursor Settings`

**模型选择**：

Cursor 支持多种 AI 模型：

1. **GPT-4** (推荐) - 最强大，理解能力最好，适合复杂代码生成
2. **GPT-3.5-turbo** - 速度快，成本低，适合简单代码补全
3. **Claude 3 (Opus / Sonnet / Haiku)** - 长上下文，适合大型文件
4. **自定义模型** - 可以配置自己的 OpenAI API Key

### 4.3 配置自定义 API Key

**使用自己的 OpenAI API Key**：

1. 打开设置：`Settings` → `AI` → `OpenAI API Key`
2. 输入你的 API Key
3. 选择模型和 API 端点（默认或自定义）

**配置示例**：
```
API Key: sk-xxxxxxxxxxxxxxxxxxxxxxxx
Model: gpt-4-turbo
Base URL: https://api.openai.com/v1 (或自定义)
```

**使用 Azure OpenAI**：
```
API Key: your-azure-key
Model: gpt-4
Base URL: https://your-resource.openai.azure.com/
Deployment: your-deployment-name
```

### 4.4 配置 Claude API（Anthropic）

如果要使用 Claude 模型：

1. 访问 [Anthropic Console](https://console.anthropic.com/)
2. 创建 API Key
3. 在 Cursor 中配置：
   ```
   Provider: Anthropic
   API Key: sk-ant-xxxxx
   Model: claude-3-opus / claude-3-sonnet
   ```

### 4.5 配置本地大模型（高级）

**使用 Ollama 运行本地模型**：

1. 安装 [Ollama](https://ollama.ai)
2. 下载模型：
   ```bash
   ollama pull codellama
   ollama pull deepseek-coder
   ```
3. 在 Cursor 中配置：
   ```
   Provider: OpenAI Compatible
   Base URL: http://localhost:11434/v1
   Model: codellama
   API Key: ollama (任意值)
   ```

### 4.6 AI 功能使用技巧

**代码生成**：
- `Ctrl + K`：选中代码或光标位置，输入指令如 "添加错误处理"
- 在注释中描述需求，AI 自动生成代码

**代码重构**：
- 选中代码 → `Ctrl + K` → "重构这段代码，使用设计模式"
- "优化性能" / "添加类型注解" / "提取为函数"

**聊天交互**：
- `Ctrl + L` 打开聊天
- `@filename` 引用特定文件
- `@folder` 引用整个文件夹
- `@code` 引用当前选中的代码
- `@docs` 引用官方文档（自动搜索）

**智能调试**：
- 选中报错代码 → `Ctrl + K` → "修复这个错误"
- 在聊天中粘贴错误信息，AI 会分析并给出解决方案

## 五、Java + Vue 全栈项目配置

### 5.1 推荐项目结构

```
my-fullstack-project/
├── backend/              # Java 后端（Spring Boot）
│   ├── src/
│   ├── pom.xml
│   └── .gitignore
├── frontend/             # Vue 前端
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── .vscode/             # 共享配置
    ├── settings.json
    └── launch.json
```

### 5.2 多项目工作区配置

**创建 `my-project.code-workspace`**：

```json
{
  "folders": [
    {
      "path": "./backend",
      "name": "Backend (Java)"
    },
    {
      "path": "./frontend",
      "name": "Frontend (Vue)"
    }
  ],
  "settings": {
    "java.configuration.updateBuildConfiguration": "automatic",
    "java.home": "C:\\Program Files\\Java\\jdk-17",
    "eslint.workingDirectories": ["./frontend"],
    "editor.formatOnSave": true,
    "[java]": {
      "editor.defaultFormatter": "redhat.java"
    },
    "[vue]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
  }
}
```

### 5.3 前后端联调配置

**后端 CORS 配置** (Java)：

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }
}
```

**前端代理配置** (`vite.config.js`)：

```javascript
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### 5.4 统一调试配置

**`.vscode/launch.json`**：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "java",
      "name": "Debug Backend",
      "request": "launch",
      "mainClass": "com.example.Application",
      "projectName": "backend"
    },
    {
      "type": "chrome",
      "name": "Debug Frontend",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/frontend/src"
    }
  ],
  "compounds": [
    {
      "name": "Full Stack Debug",
      "configurations": ["Debug Backend", "Debug Frontend"],
      "stopAll": true
    }
  ]
}
```

## 六、常用快捷键

### 6.1 通用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + P` | 快速打开文件 |
| `Ctrl + Shift + P` | 命令面板 |
| `Ctrl + B` | 切换侧边栏 |
| `Ctrl + J` | 切换终端 |
| `Ctrl + \`` | 打开终端 |
| `Ctrl + ,` | 打开设置 |

### 6.2 AI 功能快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + K` | AI 编辑（行内修改） |
| `Ctrl + L` | AI 聊天 |
| `Ctrl + Shift + L` | 引用代码到聊天 |
| `Tab` | 接受 AI 建议 |
| `Esc` | 拒绝 AI 建议 |

### 6.3 代码编辑快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + D` | 选中下一个相同内容 |
| `Ctrl + /` | 切换注释 |
| `Alt + ↑/↓` | 移动行 |
| `Shift + Alt + ↓/↑` | 复制行 |
| `F2` | 重命名符号 |
| `F12` | 跳转到定义 |

## 七、常见问题与解决方案

### 7.1 Java 相关问题

**Q: Java 扩展无法正常工作**
- 确认 JDK 已正确安装并配置环境变量
- 检查 Cursor 设置中的 `java.home` 路径
- 重启 Cursor 或重新加载窗口

**Q: Maven 依赖下载失败**
- 配置国内镜像（阿里云）
- 检查网络连接和代理设置
- 手动删除 `.m2` 目录缓存重新下载

### 7.2 Vue 相关问题

**Q: Vue 文件没有语法高亮和智能提示**
- 确认安装了 `Vue - Official` 扩展
- 检查文件是否正确识别为 Vue 类型
- 重启 Vue 语言服务：`Ctrl+Shift+P` → `Vue: Restart Vue Server`

**Q: ESLint 报错太多**
- 运行 `npm run lint -- --fix` 自动修复
- 调整 `.eslintrc.js` 规则

### 7.3 AI 功能问题

**Q: AI 响应速度慢**
- 切换到更快的模型（如 GPT-3.5）
- 检查网络连接
- 考虑使用本地模型（Ollama）

**Q: API 配额用完**
- 使用自己的 API Key
- 切换到其他模型提供商
- 使用本地模型替代

## 八、最佳实践建议

### 8.1 开发流程建议

1. **使用 AI 生成代码骨架**
   - 先用注释描述功能，让 AI 生成基础代码
   - 再手动优化和调整细节

2. **结合传统 IDE 特性**
   - 使用 Cursor 的智能提示和重构功能
   - 利用调试器和性能分析工具

3. **版本控制最佳实践**
   - AI 生成的代码也要经过 Code Review
   - 定期提交，保持提交历史清晰

### 8.2 AI 使用技巧

1. **明确的指令**
   - ❌ "优化这段代码"
   - ✅ "使用策略模式重构这段 if-else，提高可扩展性"

2. **分步骤实现**
   - 复杂功能拆分成多个小任务
   - 每完成一步验证后再继续

3. **引用上下文**
   - 使用 `@filename` 让 AI 了解相关代码
   - 粘贴错误信息和日志帮助 AI 分析问题

### 8.3 性能优化建议

1. **禁用不需要的扩展**
   - 扩展太多会影响性能
   - 定期清理不用的扩展

2. **排除大文件和目录**
   ```json
   {
     "files.exclude": {
       "**/node_modules": true,
       "**/target": true,
       "**/.git": true
     }
   }
   ```

## 九、参考资源

### 官方文档
- [Cursor 官方文档](https://cursor.sh/docs)
- [Java 扩展文档](https://code.visualstudio.com/docs/java/java-tutorial)
- [Vue.js 官方文档](https://vuejs.org)

### 社区资源
- [Cursor Discord](https://discord.gg/cursor)
- [Cursor Reddit](https://www.reddit.com/r/cursor/)

### 学习资源
- [Spring Boot 官方指南](https://spring.io/guides)
- [Vue.js 教程](https://vuejs.org/tutorial/)

---

**更新日期**：2026-04-29  
**适用版本**：Cursor 最新版

> 💡 **提示**：本教程会持续更新，建议收藏以获取最新内容。
