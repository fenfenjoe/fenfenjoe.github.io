---
title: claudecode实战
sidebar: 'heading'
---


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


## 使用场景

### 为项目初始化claude配置

1. 进入项目
```bash
# 切换到项目路径
cd /path/to/my_project
# 进入claude交互界面
claude
```

2. 让claude学习代码，并总结生成CLAUDE.md
```bash
/init 
```

### 增强claude的开发能力

#### 方案1：superpowers + gstack

**简介**

这是一套由两个互补插件组成的 AI 开发增强方案：

- [superpowers](https://github.com/obra/superpowers)：由 Jesse Vincent（Prime Radiant）开源，是一套完整的**软件开发方法论**，通过可组合的 Skills 让 AI 在动手写代码之前先思考、先规划，并贯穿 TDD、代码审查、验证等完整开发流程。
- [gstack](https://github.com/garrytan/gstack)：由 YC CEO Garry Tan 开源，定位是**虚拟工程团队**，提供 23 个专家角色和 8 个工具，覆盖产品规划、设计、工程审查、QA、安全审计、发布部署等环节。

两者形成互补：**superpowers 是大脑（思考与流程），gstack 是手脚（执行与外部世界）**。

**方法论**

superpowers 的核心工作流（Skills 自动触发，无需手动激活）：

```
brainstorming          → 动手前先提炼需求，通过对话确认设计
using-git-worktrees    → 在新 Git 分支上创建隔离工作区
writing-plans          → 将设计拆成 2-5 分钟粒度的任务，每条任务有文件路径、完整代码和验证步骤
subagent-driven-development → 每个任务派发独立 subagent 执行，两阶段 review（规范合规 + 代码质量）
test-driven-development → 强制 RED-GREEN-REFACTOR：先写失败测试，再写最小实现，再提交
requesting-code-review → 任务间进行代码审查，严重问题阻断继续推进
finishing-a-development-branch → 验证测试后给出合并/PR/保留/丢弃选项
```

gstack 按 Sprint 顺序运行，每个 Skill 产出物会自动流入下一步：

```
Think → Plan → Build → Review → Test → Ship → Reflect
/office-hours → /autoplan → (实现) → /review → /qa → /ship → /retro
```

---

**安装 & 配置**

**（1）安装 superpowers（安装到项目）**

进入项目目录后，在 Claude Code 中执行安装命令。使用 `--scope project` 将插件写入项目的 `.claude/settings.json`，提交到 git 后团队成员均可共享。

方式一：从 Anthropic 官方插件市场安装（推荐）

```bash
cd your-project
claude plugin install superpowers@claude-plugins-official --scope project
```

方式二：从 superpowers 自有市场安装

```bash
cd your-project
claude plugin marketplace add obra/superpowers-marketplace
claude plugin install superpowers@superpowers-marketplace --scope project
```

可选子插件（按需安装，同样安装到项目）：

```bash
claude plugin install superpowers-chrome@superpowers-marketplace --scope project      # 浏览器能力
claude plugin install superpowers-lab@superpowers-marketplace --scope project         # 实验性功能
claude plugin install superpowers-developing-for-claude-code@superpowers-marketplace --scope project  # 开发 Claude Code 插件时使用
```

> 安装完成后，`.claude/settings.json` 会自动记录插件配置，将该文件提交到 git 即可让团队所有成员共享同一套插件。新成员信任该仓库目录后，Claude Code 会提示自动安装。

**（2）安装 gstack（安装到项目）**

gstack 通过 git clone 直接写入项目的 `.claude/skills/` 目录，天然属于项目级配置。

在 Claude Code 中粘贴以下指令，让 Claude 自动完成安装：

```
Install gstack: run git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git .claude/skills/gstack && cd .claude/skills/gstack && ./setup
```

初始化团队模式并提交到 git（推荐，让协作者自动获取 gstack）：

```bash
(cd .claude/skills/gstack && ./setup --team) && \
.claude/skills/gstack/bin/gstack-team-init required && \
git add .claude/ CLAUDE.md && \
git commit -m "require gstack for AI-assisted work"
```

**（3）检查插件安装情况**

```bash
# 查看所有作用域已安装的插件
claude plugin list 
# 只看项目级插件
claude plugin list --scope project   
# 只看用户级插件
claude plugin list --scope user      
# 只看本地级插件
claude plugin list --scope local     
```

**（4）在 `CLAUDE.md` 中添加协作规则**

在项目根目录的 `CLAUDE.md` 中添加如下配置，确保两个插件职责清晰、不重叠：

```markdown
## 核心插件：superpowers + gstack

主干由两个插件组成：
- superpowers —— 思考与流程层（plan/brainstorm/debug/TDD/review/verify）
- gstack —— 执行与外部世界层（browser/QA/ship/deploy/canary/护栏）

类比：superpowers 是大脑，gstack 是手脚。

## 核心原则

1. 流程归 superpowers：所有 plan、brainstorm、debug、TDD、verify、
   code review 默认走 superpowers。
2. 执行归 gstack：所有浏览器操作、QA 测试、ship、deploy、canary、
   retro 走 gstack。
3. 独立 reviewer 通道：作者和审查者绝不在同一上下文里互评。
4. 证据优先：声明完成前必须收集可验证的证据。
5. 遇到歧义先 brainstorm。

## 浏览器规则

/browse 是唯一的浏览器入口。禁止使用 mcp__claude-in-chrome__*
和 mcp__computer-use__* 来操作浏览器。
```

---

**常用命令**

**superpowers（Skills 自动触发，以下为关键技能名）**

| 技能 | 触发时机 | 作用 |
|------|---------|------|
| `brainstorming` | 开始构建新功能时 | Socratic 式需求提炼，确认设计后保存设计文档 |
| `writing-plans` | 设计确认后 | 将设计拆成 2-5 分钟的细粒度任务 |
| `subagent-driven-development` | 计划就绪后 | 每个任务派发独立 subagent，两阶段 review |
| `test-driven-development` | 实现阶段 | 强制 RED-GREEN-REFACTOR |
| `systematic-debugging` | 遇到 bug 时 | 4 阶段根因分析流程 |
| `requesting-code-review` | 任务间 | 按严重性报告问题，关键问题阻断推进 |
| `using-git-worktrees` | 设计通过后 | 在新分支创建隔离工作区 |
| `finishing-a-development-branch` | 任务全部完成时 | 验证测试，给出合并/PR/保留/丢弃选项 |

**gstack（斜杠命令，手动触发）**

| 命令 | 专家角色 | 作用 |
|------|---------|------|
| `/office-hours` | YC Office Hours | 六个核心追问，重塑你的产品定义（推荐起点） |
| `/autoplan` | 综合评审 | 一键自动运行 CEO → 设计 → 工程审查，生成完整计划 |
| `/plan-ceo-review` | CEO/创始人 | 质疑需求范围，挖掘产品潜力 |
| `/plan-eng-review` | 工程经理 | 锁定架构、数据流、边界情况和测试方案 |
| `/plan-design-review` | 高级设计师 | 对设计各维度 0-10 评分，识别 AI 生成的视觉垃圾 |
| `/review` | Staff 工程师 | 找出能通过 CI 但会在生产崩溃的 bug，自动修复明显问题 |
| `/qa <URL>` | QA 负责人 | 打开真实浏览器，点击测试，发现并修复 bug |
| `/ship` | 发布工程师 | 同步 main、跑测试、推送、开 PR |
| `/land-and-deploy` | 发布工程师 | 合并 PR → 等待 CI/部署 → 验证生产环境 |
| `/canary` | SRE | 部署后监控，观察控制台错误和性能回归 |
| `/cso` | 首席安全官 | OWASP Top 10 + STRIDE 威胁建模 |
| `/retro` | 工程经理 | 周度复盘，含每人贡献分析和测试健康趋势 |
| `/browse` | QA 工程师 | 给 Agent 真实浏览器视角（真实 Chromium，截图、点击） |
| `/investigate` | 调试专家 | 系统性根因排查，3 次修复失败后强制停止 |
| `/careful` | 安全护栏 | 在破坏性命令前发出警告（rm -rf、DROP TABLE 等） |
| `/learn` | 记忆管理 | 管理跨会话积累的项目级知识，让 gstack 越用越聪明 |

---

**使用场景 & 示例**

**场景1：从零开始开发一个功能（完整 sprint）**

```
# 第一步：重塑需求（superpowers 自动触发 brainstorming）
You: 我想做一个日历每日简报 App

AI (superpowers brainstorming):
  你描述的是"简报 App"，但你实际要解决的是"会前准备太耗时"。
  我来挑战几个前提：
  1. 用户真正需要的是简报，还是"不被日历淹没"的感觉？
  2. 哪类事件最浪费你的准备时间？
  推荐：先做最窄的切入点，今天就能交付。
  [保存设计文档 → 自动传入下游 gstack 技能]

# 第二步：全套计划审查（gstack）
You: /autoplan
AI: 自动运行 CEO → 设计 → 工程审查...
  ✓ CEO Review: 建议聚焦"自动抓取会议室地址"作为 MVP
  ✓ Design Review: 信息密度评分 7/10，建议简化首屏
  ✓ Eng Review: 数据流图、边界情况、测试矩阵已生成

# 第三步：实现（superpowers 自动触发 subagent-driven-development）
You: 开始实现

AI (superpowers): 创建 Git worktree: feature/calendar-briefing
  Task 1.1: 实现 Google Calendar OAuth → subagent_1
  Task 1.2: 实现事件抓取与格式化 → subagent_2
  ...
  [两阶段 review 后全部通过]

# 第四步：QA 测试（gstack）
You: /qa https://staging.myapp.com
AI: 打开真实浏览器...
  ✓ 登录流程正常
  ✗ 发现 Bug：跨时区事件时间显示错误
  → 已生成 fix commit，回归测试通过

# 第五步：发布（gstack）
You: /ship
AI: Tests: 38 → 46 (+8 new)
  PR opened: github.com/you/app/pull/17
```

**场景2：遇到难以复现的 Bug（superpowers systematic-debugging）**

```
You: 生产环境偶发 500，复现不了

AI (superpowers systematic-debugging):
  阶段1：收集证据
  - 查看最近 error log：发现在高并发时触发
  - 检查数据库连接池配置

  阶段2：建立假设
  - 假设：连接池耗尽
  - 验证方案：在测试环境压测

  阶段3：测试假设
  [运行压测，复现问题]

  阶段4：修复与验证
  - 调整连接池 max_connections: 10 → 50
  - 证据：压测通过，500 消失
  [不声明完成，直到收集可验证证据]
```

**场景3：上线前安全审计（gstack /cso）**

```
You: /cso

AI (gstack CSO):
  运行 OWASP Top 10 + STRIDE 威胁建模...

  高置信度发现（≥8/10）：
  🔴 [A01-Broken Access Control] /api/admin 路由缺少权限校验
     Exploit: 任意未认证用户可访问管理接口
     修复：添加 requireAdmin 中间件

  🟡 [A03-Injection] 用户输入未经转义直接拼入 SQL
     Exploit: 构造 ' OR 1=1 -- 可绕过登录
     修复：使用参数化查询

  排除已知误报 17 项（低于 8/10 置信度未展示）
```

**场景4：并行开发多个任务（superpowers dispatching-parallel-agents）**

```
You: 我有 3 个独立模块需要同时开发

AI (superpowers dispatching-parallel-agents):
  分析模块依赖关系...无循环依赖，可并行。

  派发 3 个 subagent：
  → subagent_1: 用户模块 (预计 25 分钟)
  → subagent_2: 支付模块 (预计 40 分钟)
  → subagent_3: 通知模块 (预计 15 分钟)

  [并发执行，每个 subagent 独立 review]
  [全部完成后聚合结果，运行集成测试]
```

> **提示**：superpowers 的 Skills 是**强制工作流而非建议**，Agent 在任务前会自动检查并触发相关技能，无需手动调用。gstack 支持 Claude Code、Cursor、Codex CLI 等 10+ AI 工具，跨工具共享同一套方法论。


#### 方案2：OpenSpec

**简介**

[OpenSpec](https://github.com/Fission-AI/OpenSpec) 是一个轻量级的 AI 开发规范框架，核心理念是**先对齐、再编码**——在 AI 写任何代码之前，先让人和 AI 就"要做什么、怎么做"达成一致，从根本上解决 AI 编码助手输出不稳定、需求理解偏差的问题。

**方法论**

OpenSpec 的哲学：

```
→ fluid not rigid         # 流动而非僵硬，随时可以修改计划
→ iterative not waterfall # 迭代而非瀑布，边做边完善
→ easy not complex        # 简单而非复杂，低仪式感
→ built for brownfield    # 既适合已有项目，也适合新项目
→ scalable                # 从个人项目到企业团队都适用
```

每次开发功能，遵循这条主线：

```
提案(proposal) → 规范(specs) → 设计(design) → 任务(tasks) → 实现(apply) → 归档(archive)
```

人和 AI 在写代码之前先对齐规范，写完后自动将规范合并进"系统真相库"，形成可积累的知识。

**核心文件结构**

```
openspec/
├── specs/              # 系统当前行为的"真相来源"
│   └── <domain>/
│       └── spec.md
├── changes/            # 每个功能变更的独立文件夹
│   └── <change-name>/
│       ├── proposal.md  # 做什么、为什么做
│       ├── specs/       # 本次变更的增量规范（delta specs）
│       ├── design.md    # 技术方案
│       └── tasks.md     # 实现任务清单（带复选框）
└── config.yaml         # 项目配置（可选）
```

---

**安装 & 配置**

（1）全局安装（需要 Node.js 20.19.0+）

```bash
npm install -g @fission-ai/openspec@latest
```

（2）在项目根目录初始化

```bash
cd your-project
openspec init
```

初始化后会在项目中生成 `openspec/` 目录结构，并自动向 Claude Code 注入斜杠命令。

（3）启动 Claude Code 即可使用

```bash
claude
```

（4）可选：开启扩展工作流（提供更精细的步骤控制）

```bash
openspec config profile   # 选择 workflows 配置
openspec update           # 刷新项目中的 AI 指令
```

---

**常用命令**

**默认快速路径（core profile）**

| 命令 | 用途 |
|------|------|
| `/opsx:propose <功能名>` | 一步创建变更并生成所有规划产物（推荐入口） |
| `/opsx:explore` | 在正式规划前，先探索想法、调研代码库 |
| `/opsx:apply` | 按 tasks.md 逐条实现代码，自动打勾 |
| `/opsx:sync` | 将变更的 delta specs 合并入主 specs |
| `/opsx:archive` | 归档已完成的变更 |

**扩展工作流命令（需手动开启）**

| 命令 | 用途 |
|------|------|
| `/opsx:new <功能名>` | 仅创建变更文件夹，不生成产物 |
| `/opsx:continue` | 按依赖顺序逐步创建下一个产物（精细控制） |
| `/opsx:ff` | 快进：一次性生成所有规划产物 |
| `/opsx:verify` | 校验实现是否与规范产物一致 |
| `/opsx:bulk-archive` | 批量归档多个已完成的变更 |
| `/opsx:onboard` | 交互式教程，引导完整走一遍工作流 |

**CLI 辅助命令**

```bash
openspec list              # 列出所有活跃变更
openspec show <变更名>     # 查看变更详情
openspec validate <变更名> # 校验规范格式
openspec view              # 打开交互式 Dashboard
```

---

**使用场景 & 示例**

**场景1：快速开发一个新功能（默认工作流）**

以"添加暗黑模式"为例：

```
# 第一步：一键生成规划产物
You: /opsx:propose add-dark-mode

AI:  Created openspec/changes/add-dark-mode/
     ✓ proposal.md  —— 需求背景和范围
     ✓ specs/ui/spec.md  —— 增量需求规范
     ✓ design.md    —— 技术方案（CSS 变量 + React Context）
     ✓ tasks.md     —— 实现清单（8 条任务）
     Ready for implementation!

# 第二步：AI 按任务清单逐条实现
You: /opsx:apply

AI:  ✓ 1.1 Create ThemeContext with light/dark state
     ✓ 1.2 Add CSS custom properties to globals.css
     ✓ 1.3 Implement localStorage persistence
     ✓ 2.1 Create ThemeToggle component
     ...
     All 8 tasks complete!

# 第三步：归档，规范合并进主库
You: /opsx:archive

AI:  ✓ Merged specs → openspec/specs/ui/spec.md
     ✓ Archived to openspec/changes/archive/2025-01-24-add-dark-mode/
```

**场景2：需求不清时先探索（explore）**

```
You: /opsx:explore

AI:  What would you like to explore?

You: 移动端 App 的认证方案应该用 JWT 还是 Session？

AI:  让我分析你的现有代码...
     你当前使用 Session 认证。移动端有三个选项：
     1. JWT（无状态，支持离线）
     2. OAuth2（适合第三方登录）
     3. 扩展现有 Session（简单但需要网络）

     推荐 JWT，与你的 CORS 配置兼容。需要创建变更吗？

You: 好，用 JWT。

AI:  运行 /opsx:propose add-jwt-auth 开始。
```

**场景3：复杂功能的精细控制（扩展工作流）**

```
# 逐步创建产物，每步都可以人工审查和修改后再继续
You: /opsx:new add-payment-module

You: /opsx:continue
AI: ✓ Created proposal.md —— 请确认需求范围后继续

You: /opsx:continue
AI: ✓ Created specs/payment/spec.md —— 请确认接口约定

You: /opsx:continue
AI: ✓ Created design.md —— 请确认技术选型

You: /opsx:continue
AI: ✓ Created tasks.md —— 共 15 条任务

You: /opsx:apply

# 实现完成后验证规范一致性
You: /opsx:verify

AI:  ✓ Completeness: 15/15 tasks done
     ⚠ Warning: 缺少"支付超时"场景的测试覆盖
     Ready to archive (with warnings)

You: /opsx:archive
```

**场景4：多功能并行开发后批量归档**

```
You: /opsx:bulk-archive

AI:  Found 3 completed changes:
     - add-dark-mode  (8/8 tasks)
     - fix-login-bug  (3/3 tasks)
     - update-footer  (2/2 tasks)

     ⚠ add-dark-mode 和 update-footer 都涉及 specs/ui/，将按时间顺序合并

     ✓ Archived add-dark-mode
     ✓ Archived fix-login-bug
     ✓ Archived update-footer
```

> **提示**：OpenSpec 支持 Claude Code、Cursor、Windsurf、GitHub Copilot 等 20+ AI 工具，在 Claude Code 中命令格式为 `/opsx:xxx`，在 Cursor/Windsurf 中为 `/opsx-xxx`。建议搭配高推理能力模型以获得最佳规划质量。

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