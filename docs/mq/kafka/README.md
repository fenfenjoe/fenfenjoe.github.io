---
title: Kafka
---

# Kafka

## 简介
作用：分布式消息队列中间件  
语言：scala（0.9版本之前）、java（新版）  
依赖：zookeeper（0.5.x后kafka内置了zookeeper的单机版环境）

## 参考
【官网】<https://kafka.apache.org/>  
【kafka的版本号与版本演进】[https://blog.csdn.net/liuxiao723846/article/details/106020738/](https://blog.csdn.net/liuxiao723846/article/details/106020738/)  
【apache kafka技术分享系列(目录索引)】[https://blog.csdn.net/lizhitao/article/details/39499283](https://blog.csdn.net/lizhitao/article/details/39499283)  
【知乎：kafka(一) 消息队列的本质】[https://zhuanlan.zhihu.com/p/355343254](https://zhuanlan.zhihu.com/p/355343254)  
【Kafka知识总结之Broker原理总结】[https://blog.csdn.net/yhflyl/article/details/123582735](https://blog.csdn.net/yhflyl/article/details/123582735)

## 使用场景
1. 日志分析、系统监控、用户行为追踪（Kafka是著名的ELK系统中的一部分）
2. 大数据中做数据分流：（流数据处理、离线数据分析、在线数据分析）
    * 分流到离线存储平台（HDFS）
    * 分流到离线计算平台（Hive仓库）
    * 分流到实时流水计算（Storm，Spark）
    * 分流到海量数据查询（HBase）
    * 分流到及时查询（ElasticSearch）
3. 应用程序

