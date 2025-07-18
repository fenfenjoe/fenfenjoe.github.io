---
title: 'Elastic Search学习笔记'
---

# Elastic Search学习笔记

### 参考
Elasticsearch－基础介绍及索引原理分析 [https://www.cnblogs.com/dreamroute/p/8484457.html](https://www.cnblogs.com/dreamroute/p/8484457.html)  
ElasticSearch官方文档<https://www.elastic.co/guide/cn/elasticsearch/guide/2.x/intro.html>  

## 什么是ES

- Elastic Search，是一个：  
  - 一个**分布式、可扩展的实时搜索和分析引擎**；
  - 一个**文档型数据库**，数据以JSON作为文档序列化的格式；  
    
特点是检索数据的速度快，使用**倒排索引**而不是B+树索引（关系型数据库）；


## ES中的概念  

| Elasticsearch | 说明                                                                                  |
|---------------|-------------------------------------------------------------------------------------|
| 索引（Index）     | 等于RDBMS中**数据库（Database）** 的概念，实质是一个文档的集合。                                           |
| 类型（Type）      | 等于RDBMS中**表（Table）** 的概念，指在一个索引中，可以索引不同类型的文档，如用户数据、博客数据。从6.0.0 版本起已废弃，一个索引中只存放一类数据。 |
| 映射（Mapping）   | 等于RDBMS中**表结构（Schema）** 的概念                                                         |
| 文档（Doc）       | 等于RDBMS中**行（Row）** 的概念 ，以JSON格式来表示                                                  |
| 字段（Field）     | 等于RDBMS中**列（Column）** 的概念 ，以JSON格式来表示                                               |

## 为什么用ES

如果你的系统需要**快速的、支持大数据量的全文检索**功能；  
如果你的系统需要一个**可扩展的分布式搜索引擎**；  

## ES的应用场景
- 日志分析（ELK框架，还新增了一个FileBeat）
- 全文检索、模糊查询
- NoSql、分布式

## ES的特性

* 支持分布式架构
* 高性能的搜索引擎
* 支持多种数据结构（文本、数值、日期、地理位置等）

## ES可视化管理工具

- **ElasticHD**
- **Dejavu**
- **Kibana**


## 其他数据库与ES交互

**ES从其他数据源同步数据**：  
- **mysql、oracle（关系型数据库）**： logstash-input-jdbc
- **mongo**： mongo-connector
- **kafka、文件、日志**：Logstash或Apache Flume
