# 多Agent开发环境实战

2026年8月4日，目前常用的Agent有：
- ClaudeCode
- OpenCode
- OpenClaw
- TRAE
- Hermes Agent
- Codex


--------------------------------

开发一个项目时，最常遇到的需求：

| 我的需求 | Agent的职责 | 哪个Agent负责 |
|---|---|---|
| 项目启动 | 项目从0到1，搭建一个可运行的项目 | Claude Code |
| 提需求 | 润色需求 + 生成文档 + 实现需求 + 测试 | Claude Code | 
| 提BUG工单 | 润色工单 + 生成文档 + 修复工单 + 测试 | Claude Code |
| 派发任务 | 润色文档、开发、测试等任务的派发 | OpenClaw |
| 行业调研、升级Agent | 技能学习、技能增强 | Hermes |
| 打包、产品上线 | 代码评审、打包、冒烟测试、CI、CD、回滚、归档 | Claude Code |
| 生成报告 | 生成周报、月报 | Openclaw |
| 定时任务 | 轮询定时任务 | OpenClaw |
| 日志 | 打印并归档 | 每个Agent都需要 |
| 审批、确认、做决定 |  

我的目标是，搭建一个多Agent系统，将这些需求，分配给不同的Agent，让他们各司其职，而又能互相合作。

--------------------------------

对应github项目： 



