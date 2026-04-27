---
title: Netty学习笔记
---

# Netty学习笔记

搭建步骤：
- 创建Java项目
- 引入Netty Maven依赖
- 创建ServerBootstrap并配置线程组
- 配置Handler链（解决粘包/拆包、协议解析）
- 业务逻辑异步化（避免阻塞I/O线程）
- 连接管理与状态维护



