---
title: dsh实战
sidebar: 'heading'
---


# dsh实战

## 资源

官网：<https://www.deepseek.com/harness/>

Github仓库： <https://github.com/deepseek-ai/deepseek-harness>

开源插件： <https://github.com/topics/dsh-plugin>

Awesome插件仓库：<https://github.com/awesome-dsh-plugin/awesome-dsh-plugin>

## 安装&启动

### 安装
```bash
npm install -g @deepseek-ai/dsh
```

### 查看版本号
```bash
dsh --version
```

### 启动
```bash
dsh web
```

### 安装插件市场
```bash
dsh plugin --profile web add dshmarket
```

### 卸载
```bash

```

## 使用其它API KEY

### 火山引擎Agent Plan

参考文档：<https://console.volcengine.com/ark/region:cn-beijing/docs/82379/2637928?lang=zh>


## 玩转插件

### Open Design

仓库地址：<https://github.com/nexu-io/open-design>

### OpenViking插件

记忆与上下文插件。

官方文档：<https://github.com/volcengine/OpenViking/blob/main/README_CN.md>

#### 安装

```bash
dsh plugin --profile default add @openviking/dsh-memory-plugin
```

#### 配置

略。


### ouroboros

略

### archify

略

### hindsight

略


## DSH原理

可参考官方文档：<https://deepseek-harness.github.io/deepseek-harness/reference/>

### 主配置目录

```
~/.dsh
├──   settings.yaml  # 主要配置文件：存放你的个人偏好设置，例如默认使用的Agent预设（Preset）、默认模型等
├──   .credentials.yaml  # API密钥存储文件：这里存放着你明文或加密的API密钥，例如DeepSeek的sk-...密钥
├──   profiles/  # 配置组合目录：用于存放不同运行模式（Profile）的详细能力组合配置
├──   sessions/  # 会话数据目录：存放你每次对话的持久化记录
└──   .agent-presets  # 作用于单个会话的配置，定义了那个Agent的具体行为风格
```

### Profile（运行模式）

安装好DSH后，会在profiles目录下看到，DSH已内置了两种运行模式：**web**和**headless**

```
/profiles
├──  /web
└──  /headless
```

- **web模式**：使用web模式启动DSH，会自带网页界面
- **headless模式**：脚本、自动化用这个模式，通常用于一次性执行命令

----------------------------------------

看看`/profiles/web`里的内容

```
/web
├──  /package.json # Profile描述文件，声明Profile需要哪些插件（Bundle）和哪些node模块（dependencies）
├──  /cordis.patch.yml # 用户配置
├──  /node_modules # 安装的 npm 包
└──  /cordis.yml # 初始根节点，一般不需要关心或修改
```

> 关于**用户配置（cordis.patch.yml）**，插件加载进来后一般会自带默认配置，我们在cordis.patch.yml中可调整配置。


### DSH插件（Bundle）

DSH的口号是 **Everything is a Plugin，所有能力都是插件**。现在我们就看看DSH的插件。

在`/profiles/web/package.json`中，我们能看到web模式下声明了哪些插件（见bundles字段）。这些插件都是**按顺序**加载的

常见插件：
- dsh-base # 模型适配器、工具、持久化、沙箱与审批策略、设置、凭据、遥测
- dsh-web-app # 增加浏览器应用
- dsh-headless # 增加不带服务器的一次性运行器
- dsh-sdk-app # 增加 SDK JSON-RPC 服务器
- dsh-acp-app # 增加仅用于自动化的 ACP 服务器

