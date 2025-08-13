---
title: 概述
--- 

# AWS

## AWS组件 
| 组件名称              | 	模块    | 	描述                                    |
|-------------------|--------|----------------------------------------|
| SQS               | 	应用集成  | 	**消息队列**服务，实现应用解耦和异步通信                |
| SNS               | 应用集成   | 全托管**消息发布/订阅**服务，用于实现应用解耦和事件驱动架构。      |
| Step Functions    | 	应用集成	 | **可视化工作流编排服务**，协调多步骤任务                 |
| ECS               | 	计算    | 	全托管**Docker容器编排**服务，支持微服务部署           |
| Lambda            | 	计算    | 	事件驱动的无服务器计算服务，按需执行代码                  |
| Elastic Beanstalk | 	计算    | 	**自动化应用部署**平台，简化Web应用托管和扩缩容           |
| IAM               | 	安全    | 	访问控制核心服务，管理用户权限和资源授权策略                |
| Cognito           | 	安全    | 	用户身份认证与访问控制服务，支持社交登录和MFA              |
| VPC               |        ||
| API Gateway       | 	网络    | 	托管式API管理服务，用于创建、发布和维护API              |
| CloudFront        | 	网络	   | 全球内容分发网络（**CDN**），加速静态/动态内容分发          |
| DynamoDB          | 	数据库   | 	全托管NoSQL数据库，提供毫秒级键值对和文档存储             |
| S3	               | OSS    | 	**高扩展性对象存储服务（OSS）**，适用于数据备份、静态网站和数据分析 |
| CloudFormation    | 	运维管理  | 	基础设施即代码（IaC）工具，通过模板自动化部署资源            |
| OpsWorks          | 	运维管理  | 	基于Chef/Puppet的配置管理服务（传统服务器运维）         |
| CloudWatch        |||
| AWS X-ray         |||
| Kinesis           | 	数据分析  | 	实时流数据处理平台，支持日志/点击流分析                  |
| AWS Glue          | 数据分析   | ETL工具                                  |
| CodeStar          | 	开发工具  | 	统一DevOps面板，快速创建CI/CD流水线               |
| AWS SAM           | 	开发工具  | 	无服务器应用框架，简化Lambda/API Gateway部署       |
| AWS Amplify       | 	开发工具	 | 全栈Web/移动应用开发平台，集成身份验证、API和托管功能         |


### SQS和SNS的区别

| 维度    | 	SNS（广播）    | 	SQS（队列）          |
|-------|-------------|-------------------|
| 消息模式	 | 发布/订阅（1:N）  | 	点对点队列（1:1）       |
| 消息保留	 | 不存储消息（实时推送） | 	存储消息14天（等待消费者拉取） |
| 消费方式	 | 主动推送给订阅者    | 	消费者主动拉取          |
| 典型用例	 | 事件广播/实时通知   | 	异步任务处理/缓冲        |

## AWS常见概念

| 名称 | 描述                         |
|---|----------------------------|
| Event Source Mapping |                            |
| Fan Out| 扇出架构，常用SQS+SNS模式实现，保证数据不丢失 |
|Sand box| Database Sandbox（数据库沙盒）是一种隔离的、临时的数据库环境，专为开发、测试、数据分析或故障排查而设计。它通过复制生产数据的快照（而非实时数据）创建独立实例，用户可在其中自由读写、实验，而不影响生产环境。|
|global secondary index | n. 辅助索引|


## PS. 开发常用单词

| 常用单词           | 含义                                                                                                                  |
|----------------|---------------------------------------------------------------------------------------------------------------------|
| orchestration  | 编排。如 container orchestration = 容器编排                                                                                 |
| scenario       | 情景、场合、场景。                                                                                                           |
| specific       | adj. 明确的，具体的。对应的动词是specify（详细说明）                                                                                    |
| dive into sth. | 深入研究                                                                                                                |
| migrate        | v. 迁移.如 data migration = 数据迁移                                                                                       |
| feature        | v. 作为重要组成部分。 it features in this exam.                                                                              |
| invoke         | v. 调用                                                                                                               |
| capacity       | n. 容量                                                                                                               |
| throttle       | v. 限流、节流。 如 API Throttling = API请求限流                                                                                |
| throughput     | n. 吞吐量                                                                                                              |
| implement      | v. 实施、采用、实现、搭建。  <br/> Implement microservices architecture （实施微服务架构）<br/>Implement CI/CD pipelines（搭建持续集成/持续部署流水线） |
| refactor       | v. 重构                                                                                                               |
| distribute     | v. 分配。 如 distribute workloads = 分配负载                                                                                |
| concurrency    | n. 并发、并发资源池                                                                                                         |
| consistency    | n. 一致性（eventually consistency，最终一致性；）                                                                               |
| ad hoc         | adj. 临时的                                                                                                            |
| assign         | vt. 分配、布置、委派（常用于被动）                                                                                                 |
| optimization   | n. 优化                                                                                                               |
| latency        | n. 延迟                                                                                                               |
| inherit        | vt.  继承、遗传、沿袭、接到(~ sth. from sb.)                                                                                   |
