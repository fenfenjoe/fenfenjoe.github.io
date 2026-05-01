---
title: openclaw实战
sidebar: 'heading'
---

# openclaw实战

## 安装（简单描述）

1. 安装node.js  
略
2. 全局安装openclaw  
```shell
npm install -g openclaw@latest
```
3. 初始化配置
```shell
openclaw init
```
4. 启动服务
```shell
openclaw gateway start
```


## 使用

### 查看openclaw运行情况
```
openclaw status
```

### 启动openclaw仪表盘
```shell
# 在主机上启动网关
openclaw gateway run
# 获取带令牌的仪表盘URL
openclaw dashboard --no-open
```

### 修改openclaw配置文件

方式1，用nano命令直接在wsl上面修改  
```shell
# 编辑openclaw.json文件
nano ~/.openclaw/openclaw.json
```

方式2，用windows的文件管理器打开openclaw.json文件（推荐）  
```shell
# 1.打开我的电脑，或者点击Win + E
# 2.在地址栏输入以下命令
\\wsl$
# 3.找到你的发行版，然后进入/home/<用户名>/.openclaw/
# 4.打开openclaw.json文件，修改完保存
```

修改完openclaw.json后，执行以下命令重启openclaw服务  
```shell
openclaw gateway restart
```

### 停止openclaw服务

```shell
openclaw gateway stop
```


## 卸载

```shell
npm uninstall -g openclaw
```

检查是否卸载成功
```shell
openclaw --version
```

## 查看日志

```shell
openclaw gateway --log
```


## WSL常用命令

查看所有发行版
```shell
wsl -l -v
```

进入
```shell
# 默认的发行版
wsl
# 进入指定的发行版
wsl -d Ubuntu-22.04
```

停止
```shell
wsl --shutdown
```

安装
```shell
wsl --install -d <发行版名>
```

指定默认的发行版
```shell
wsl --set-default <发行版名>
```

卸载
```shell
wsl --unregister -n <发行版名>
```

**在windows中访问wsl文件系统（重要）**

```shell
# 1.打开我的电脑，或者点击Win + E
# 2.在地址栏输入以下命令
\\wsl$
```

## .openclaw详解

安装好openclaw后，会在用户目录下创建一个`.openclaw`文件夹，里面包含了openclaw的配置文件。


```
~/.openclaw/
├── openclaw.json                # 🧠 核心配置文件：定义AI大脑、性格、安全边界
├── workspace/                   # 🏠 Agent的工作区：AI的"家"，可放于Git备份
│   ├── AGENTS.md               # 📜 操作指南：定义工作流程、决策逻辑
│   ├── SOUL.md                 # ✨ 灵魂设定：定义性格、语气、价值观
│   ├── USER.md                 # 👤 用户画像：记录你的偏好和习惯
│   ├── IDENTITY.md             # 🆔 身份定义：AI的名称和角色定位
│   ├── TOOLS.md                # 🛠️ 工具使用指南：规范工具调用方式
│   ├── MEMORY.md               # 🧠 长期记忆：存放关键事实和偏好
│   ├── BOOTSTRAP.md            # 🚀 首次启动配置：一次性初始化脚本
│   ├── HEARTBEAT.md            # 💓 心跳检查：定时运行的小任务清单
│   ├── BOOT.md                 # ⚡ 启动检查清单：网关重启时执行
│   ├── memory/                 # 📅 日常记忆日志：按日期存储的对话记录
│   ├── skills/                 # 🎯 工作区专属技能：优先级最高的技能包
│   └── canvas/                 # 🎨 可视化工作区：存放Canvas UI文件
├── agents/                     # 🤖 多Agent配置目录：每个子目录对应一个独立Agent
│   └── <agentId>/              #    特定Agent的专属状态
│       ├── agent/
│       │   └── auth-profiles.json  # 🔑 API密钥与OAuth凭证（新版）
│       └── sessions/           #        会话历史记录存储
├── credentials/                # 🔐 旧版凭证存储：API密钥、OAuth令牌等敏感信息
├── skills/                     # 🛠️ 全局技能包：从ClawHub安装的技能
├── memory/                     # 🧠 长期记忆文件：包含向量索引库
│   └── <cid>.sqlite            #    SQLite向量记忆库
├── logs/                       # 📝 运行日志：问题排查的宝库
├── sandboxes/                  # 🏖️ 沙箱环境：隔离运行高风险任务
└── plugins/                    # 🔌 插件目录：存放扩展插件
```

## nano的用法

```shell
# 删除整行
Ctrl + K
# 删除光标所在字符
DELETE
# 删除光标前一个字符
BACKSPACE
# 撤销
ALT + U
# 恢复撤销的操作
ALT + E
# 保存
Ctrl + O
# 退出
Ctrl + X
```

## 搭建多个agent团队

安装好openclaw后，便会创建一个默认的AGENT，其工作目录为```~/.openclaw/workspace```。

如果我们想再创建一些AGENT呢？

【方法1】  
```shell
# 创建一个名为creative的AGENT，其工作目录为 ~/.openclaw/workspace-creative
openclaw agents add creative --workspace ~/.openclaw/workspace-creative
```

```/.openclaw/workspace-creative```的目录结构与```/.openclaw/workspace```类似，也有：
- ```SOUL.md```
- ```IDENTITY.md```
- ```TOOLS.md```
- ```USER.md```
- ...等文件

【方法2】  
1.先为openclaw安装openclaw-new-agent这个skill，重启网关后通过对话，告诉openclaw新AGENT的名称、角色等信息。  
2.创建完毕后，同样会生成一个新的workspace，然后可以按需修改SOUL.md、IDENTITY.md等文件。


创建了AGENT后，要修改密钥文件的访问权限：
```shell
chmod 600 /home/dyzadmin/.openclaw/credentials/lark-tommy.secrets.json
```


## 如何为agent配置飞书机器人

创建好AGENT后，要为它配置飞书机器人，才能在飞书中使用它。

1. 登录```https://open.feishu.cn/app```，创建企业自建应用，填写应用名称和描述后完成创建。

2. 在应用能力 > 添加应用能力页面，添加机器人能力，开启机器人功能。

3. 在权限管理页面，为应用开通以下 API 权限：
    - im:message.group_at_msg:readonly：接收群聊中 @机器人消息事件
    - im:message.group_msg：获取群组中所有消息（如需接收所有群消息则开通）
    - im:message.send_as_bot：以应用的身份发消息
    - im:chat:read：查看群信息

4. 入应用详情页的事件与回调 > 事件配置页面，选择订阅方式（推荐企业自建应用使用使用长连接接收事件）。
添加事件，在消息与群组分类下订阅接收消息 v2.0事件。

5. 完成配置后，进入应用发布 > 版本管理与发布页面，创建版本并发布应用，等待审核通过使配置生效。


6. 告诉openclaw，你的飞书机器人名称、APP ID、APP Secret。以及它对应的AGENT是什么。openclaw会为你在openclaw.json中添加该飞书机器人的配置，同时绑定该AGENT。

7. 检查openclaw.json文件，channels中是否已有机器人的配置。



## 如何选择大模型

有几种方案：
- 直接用大模型厂家提供的**大模型**，按Token计费。
- 购买大模型厂商提供的**Coding Plan**，按月计费。
- 选择大模型**中间商**，按Token计费。


### 1. 大模型厂商 


御三家大模型厂商：

| 厂商 | 模型 | 官网 |
|---|---|---|
| OpenAI | GPT系列 | https://openai.com/zh-Hans-CN/ |
| Anthropic | Claude系列 | https://claude.com/ |
| Google DeepMind‌ | Gemini系列 | https://deepmind.google/models/gemini/ |


### 2. Coding Plan

一、国内厂商 Coding Plan 对比
| 厂商 | 套餐名称 | 月费（人民币）|	核心额度|	支持模型|
|---|---|---|---|---|---|
| **智谱 AI** | Lite / Pro / Max |¥49 / ¥149 / ¥469|	未明确披露|	GLM-5 系列|	
| **阿里云百炼** | Pro（唯一可新购）|	¥200（首月¥39.9，次月¥100）|	9万次/月|	通义千问、GLM、Kimi、MiniMax|
| **腾讯云** | Lite / Pro	|¥40 / ¥200|	Lite 用量为 Pro 的 1/5|	混元、GLM、Kimi、MiniMax|
| **MiniMax** | Starter / Plus / Max / Ultra |未明确|极速版每周约 1.5 万次|MiniMax-M2.7（约 100 TPS）|	
| **月之暗面 Kimi** |	Andante / Moderato / Allegretto / Allegro|	¥49 / ¥99 / ¥199 / ¥699	未明确（弹性调配）|	Kimi 系列|	
| **火山引擎方舟**|	Pro 档|	¥200 起|	未明确|	豆包、MiniMax、Kimi、GLM、DeepSeek|

二、海外厂商 Coding Plan 对比

| 厂商 | 套餐名称 | 月费（美元）|	核心额度|	支持模型|
|---|---|---|---|---|---|
| **OpenAI** | Plus / Pro (100) / Pro (200)	|$20 / $100 / $200|	100 美元档约为 Plus 的 5 倍	Codex（GPT-4o/Claude/Gemini 可选）|
| **Anthropic** | Pro / Max	$20 / $100|	按量计费，200K 上下文 |	Claude 系列|
| **Cursor** | Pro / Pro+ / Ultra / Teams	$20 / $60 / $200 / $40 每人|	含 Cloud Agents	多模型可切换|
| **GitHub Copilot**|	Individual / Business|	$10 / $39|	2,000 次补全/月（免费版）	|GPT-4o/Claude/Gemini|



### 3. 大模型中间商

| 中间商 | 官网 | 是否需要代理 |
|---|---|---|
| **OpenRouter** | https://openrouter.ai/ | 是 |
| **硅基流动** | https://www.siliconflow.cn/ | 否 |
| **n1n.ai** | https://n1n.ai/zh | 否 |
| **AIHUBMix** | https://www.aihubmix.com/ | 否 |
| **PoloAPI** | https://poloapi.com/ | 否 |


## openclaw的心跳机制

TODO


## 安装看门狗：openclaw-keeper

```bash
# 1. 安装 openclaw-keeper
npm install -g openclaw-keeper

# 2. 运行设置向导（会自动检测系统类型）
openclaw-keeper setup

# 3. 在前台启动（用于测试）
openclaw-keeper start

# 4. 如需开机自启，使用 systemd 而非 install 命令
# 创建 systemd 服务文件
sudo tee /etc/systemd/system/openclaw-keeper.service << 'EOF'
[Unit]
Description=OpenClaw Keeper Daemon
After=network.target

[Service]
Type=simple
User=dyzadmin
ExecStart=$(which openclaw-keeper) start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# 启用并启动服务
sudo systemctl daemon-reload
sudo systemctl enable openclaw-keeper
sudo systemctl start openclaw-keeper
```

验证keeper是否正常运行：
```bash
# 查看状态
openclaw-keeper status

# 查看日志
openclaw-keeper logs --follow

# 诊断网关问题
openclaw-keeper diagnose

# 检查openclaw-keeper服务
systemctl status openclaw-keeper

# 检查service unit文件
cat /etc/systemd/system/openclaw-keeper.service
```