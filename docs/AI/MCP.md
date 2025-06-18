---
title: MCP
---

# MCP

## 什么是MCP

MCP 全称 Model Context Protocol，模型上下文协议。  

就像 Type-C 为设备连接各种外设提供了标准化方式，MCP 为 LLM 连接各种工具提供了统一方式。  

### MCP的整体架构
- MCP hosts：应用程序，比如各种 AI 工具或 IDE，最新版 Trae 就已接入
- MCP clients：客户端组件，专门负责和不同的MCP server维持连接
- MCP server：服务端，通过 MCP 协议提供各种功能
- Local data：本地资源，比如本地文件、数据库等
- Remote services：远程服务，通过网络访问

## 为什么需要MCP

在没有MCP之前，如果想为大模型添加功能（如查询天气、旅行规划等），可以开发出对应的接口（**Tool**），然后通过**Function Call**调用（由OpenAI提出，简称FC）。  

但是，不是所有LLM都支持FC。如果换个LLM，就要重新适配开发出来的Tool，实在太难受。  

于是，MCP就来了。  


## 实战


## 参考

- 百度：海量可用的 MCP Servers <https://www.mcpworld.com/mcp>
- 魔搭社区：MCP广场 <https://www.modelscope.cn/mcp>