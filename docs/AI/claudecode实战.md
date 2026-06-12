# claudecode实战

## 安装与配置（windows）

1. 安装
```bash
# 全局安装
npm install -g @anthropic-ai/claude-code
# 检查是否安装成功
claude --version​
```


2. 配置

需要先选择大模型供应商，然后可根据他们提供的教程进行配置。

例如我用的是火山引擎的coding plan，教程则是：<https://www.volcengine.com/docs/82379/1928262?lang=zh>



（1）找到claude的配置文件，路径位于：```C:\Users\<用户名>\.claude\settings.json```

（2）添加内容  
```json
{
    "env": {
        "ANTHROPIC_AUTH_TOKEN": "<ARK_API_KEY>",
        "ANTHROPIC_BASE_URL": "https://ark.cn-beijing.volces.com/api/coding",
        "ANTHROPIC_MODEL": "<MODEL_NAME>",
        "ANTHROPIC_DEFAULT_HAIKU_MODEL": "<MODEL_NAME>",
        "ANTHROPIC_DEFAULT_SONNET_MODEL": "<MODEL_NAME>",
        "ANTHROPIC_DEFAULT_OPUS_MODEL": "<MODEL_NAME>",
        "CLAUDE_CODE_SUBAGENT_MODEL": "<MODEL_NAME>"
    }
}
```

（3）找到```C:\Users\<用户名>\.claude.json```，在里面添加：
```json
{​
  "hasCompletedOnboarding": true​
}
```

## Claude 文件结构

### 项目级配置

```
your-project/
├── CLAUDE.md                     # 🤝 项目核心指令
├── CLAUDE.local.md               # 👤 个人项目指令 (不提交)
├── .mcp.json                     # 🔌 项目MCP服务器配置
└── .claude/
    ├── settings.json             # ⚙️ 共享配置
    ├── settings.local.json       # 👤 个人配置覆盖 (不提交)
    ├── agents/                   # 🤖 子代理
    │   └── *.md
    ├── commands/                 # ⌨️ 自定义斜杠命令
    │   └── *.md
    ├── skills/                   # 🎯 技能包
    │   └── */SKILL.md
    ├── rules/                    # 📜 按需加载的模块化规则
    │   ├── *.md
    │   └── path-spec/*.md
    └── hooks/                    # 🪝 钩子脚本
        └── *.sh, *.js, *.py
```

### 用户级配置

```
~/.claude/
├── CLAUDE.md                     # 🌐 全局核心指令
├── settings.json                 # ⚙️ 全局配置
├── credentials.json              # 🔑 认证凭据 (自动生成)
├── .claudesignature              # 🔒 内部签名 (自动生成)
├── agents/                       # 🤖 全局子代理
├── commands/                     # ⌨️ 全局命令 (/user:xxx)
├── skills/                       # 🎯 全局技能包
├── rules/                        # 📜 全局规则
├── hooks/                        # 🪝 全局钩子
├── plugins/                      # 🧩 已安装插件 (新增)
├── projects/                     # 📂 项目会话历史
├── cache/                        # 💾 缓存目录
├── ide/                          # 💻 IDE集成数据
├── statsig/                      # 📊 功能标志/实验配置
├── tempo/                        # ⏳ 会话临时数据
└── ... (其他如 debug/, file-history/, todos/ 等)
```

## 常见概念

| 名称 | 描述 |
| --- | ---|
| Commands | 通过输入命令可触发预设的操作。如 ```/help``` , ```/init```等 |
| MCP | AI工具标准，通过为Agent安装各种MCP，让它获得访问数据库、访问浏览器等能力 |
| Hook | 监听器，Claude触发某些事件后会执行的特定操作 |
| SubAgent | 子代理，有自己的上下文和skill |
| Skill | 把特定领域的知识、规则、工具打包成可复用的模块，让AI瞬间变成该领域的专家 |
| Plugins | Agent,skill,hook,MCP,LSP,settings等资源的打包 |



## claude命令常用后缀

| 选项 | 简写 | 作用 | 适用场景 |
|------|------|------|----------|
| `--dangerously-skip-permissions` | 无 | 跳过权限确认 | 个人项目，节省时间 |
| `--verbose` | 无 | 显示详细日志 | 调试问题 |
| `--model <name>` | `-m` | 指定AI模型 | 需要特定模型 |
| `--continue` | `-c` | 恢复最近会话 | 继续昨天的工作 |
| `--resume <id>` | `-r` | 恢复指定会话 | 恢复特定对话 |

## Commands：命令

### claudecode内置的命令

| 命令 | 描述 |
| --- | --- |
| /init | 理解当前项目，并在当前路径下生成CLAUDE.md |
| /exit | 退出Claude |
| /compact | 压缩上下文 |
| /clear | 开启新对话 |
| /help | 显示所有命令 |
| /context | 可视化上下文管理 |
| /cost | 显示会话成本 |
| /model | 切换AI模型 |
| /resume | 恢复会话 |
| /agents | 管理和查看子代理 |
| /fast | 快速模式，适合简单任务 |
| /status | 状态信息（模型、MCP、Token用量等） |

### 自定义命令

略

## FAQ

### Q1:如何快速让Claude记住项目规范

```bash
# 交互模式下
You: # 本项目使用TypeScript
You: # 所有API必须返回code字段
```

### Q2：文件修改后不满意，如何回退？

```bash
# 方法1：双击Escape键
[按 Esc + Esc]
# 选择要回退到的检查点
# 选择"仅恢复代码"

# 方法2：/rewind命令
You: /rewind
```

### Q3: Claude一直请求确认，太麻烦了

```bash
claude --dangerously-skip-permissions
```


### Q4: 怎么省钱

综合省钱策略：
1. 选择合适的模型
  - 简单任务：Haiku（最便宜）
  - 日常开发：Sonnet（性价比高）
  - 关键决策：Opus（按需使用）
2. 优化Token使用
  - 定期 /compact 压缩对话
  - 完成任务后 /clear 清空
  - 简洁描述需求
3. 避免不必要的Extended Thinking
  - 简单问题直接问
  - 只在需要深度分析时用 think
4. 监控使用量
  - 定期 /cost 查看费用
  - /context 检查Token使用

### Q5:怎么取消正在执行的操作

```bash
# Claude正在生成长回答时
[按 Ctrl + C]
# 会立即停止生成
```



## 常用工具

### cc-pane

用该工具可以同时开启多个claude实例。

<https://winget.ragerworks.com/package/wuxiran.CC-Panes>

### cc-switch

用该工具可以切换不同的大模型供应商。

<https://github.com/farion1231/cc-switch>


## 参考

claude-howto (<github.com/luongnv89/claude-howto>): GitHub 上最火热的 Claude Code 中文学习教程。

Claude Code Guide (<github.com/AnsarUllahAnasZ360/cc-guide>): 主要提供可直接安装的技能（Skills）和工作流程。

Awesome Claude Code (<github.com/addyosmani/awesome-claude-code>): 这是由 Google 工程总监整理的工具与资源大全。


老金：开源10万字Claude Code中文教程，零基础到企业实战完整路径（ <waytoagi.feishu.cn/wiki/PjiSwwy4SilprRkuECucHu9inXg> ）