---
title: 'Elastic Search学习笔记'
sidebar: 'heading'
---

# Elastic Search学习笔记

### 参考
Elasticsearch－基础介绍及索引原理分析 [https://www.cnblogs.com/dreamroute/p/8484457.html](https://www.cnblogs.com/dreamroute/p/8484457.html)  
ElasticSearch官方文档<https://www.elastic.co/guide/cn/elasticsearch/guide/2.x/intro.html>  

## 什么是ES

Elastic Search，一个分布式、可扩展的实时搜索和分析引擎；
一个文档型数据库，数据以JSON作为文档序列化的格式；
特点是检索数据的速度快，使用倒排索引而不是B+树索引（关系型数据库）；


ES中的概念  

| Elasticsearch | 说明                                                                                  |
|---------------|-------------------------------------------------------------------------------------|
| 索引（Index）     | 等于RDBMS中**数据库（Database）** 的概念，实质是一个文档的集合。                                           |
| 类型（Type）      | 等于RDBMS中**表（Table）** 的概念，指在一个索引中，可以索引不同类型的文档，如用户数据、博客数据。从6.0.0 版本起已废弃，一个索引中只存放一类数据。 |
| 映射（Mapping）   | 等于RDBMS中**表结构（Schema）** 的概念                                                         |
| 文档（Doc）       | 等于RDBMS中**行（Row）** 的概念 ，以JSON格式来表示                                                  |
| 字段（Field）     | 等于RDBMS中**列（Column）** 的概念 ，以JSON格式来表示                                               |

## 为什么用ES

如果你的系统需要快速的、支持大数据量的全文检索功能；
如果你的系统需要一个可扩展的分布式搜索引擎；

## ES的应用场景
日志分析（ELK框架，还新增了一个FileBeat）

## ES的特性

* 支持分布式架构
* 高性能的搜索引擎
* 支持多种数据结构（文本、数值、日期、地理位置等）

## ES可视化管理工具

    **ElasticHD**
    **Dejavu**
    **Kibana**

## ES索引

#### 创建ES索引
创建ES索引的请求一般是这样的：
```bash
PUT /my_index
{
  "mappings":{
    "dynamic": true,
    "properties":{
      "info":{
        "type":"text",
        "analyzer":"ik_smart"
      },
      "email":{
        "type": "keyword",
        "index": false
      },
      "name": {
        "type": "object",
        "properties": {
          "firstname": {
            "type": "keyword"
          },
          "lastname": {
            "type": "keyword"
          }
        }
      }
    }
  }
}
```

- **mappings**:**字段映射**，配置索引里有哪些字段，以及每个字段的属性。
- **dynamic**:是否可以添加新字段（true(默认)/false/strict）
  - true:当插入的文档有新字段，会自动创建新字段的映射
  - false:当插入的文档有新字段，依然会存储下来，但不能作为查询条件
  - strict:当插入的文档有新字段，抛出异常
- **type**：字段的数据类型，一般有以下几种常用数据类型
  - 字符串：text（可分词的文本）、keyword（精确值）
  - 数值：long、integer、short、byte、double、float
  - 布尔值：boolean
  - 日期：date
  - 对象：object
- **index**:是否创建索引
- **analyzer**:分词器，text数据类型字段需要配置
- **properties**:配置该索引/字段的子字段


创建索引后，还有对索引的查看，删除操作（不支持修改）。

#### 查看索引
```bash
GET /my_index
```

#### 删除索引
```bash
DELETE /my_index
```





## ES的使用
#### 安装ES服务器
略
#### 配置文件

```sql
# 以下是配置文件：
/config
    /elasticsearch.yml
    /logging.yml
 ```
 ```yaml
#elasticsearch.yml
#该文件是ES服务器的主要配置文件
#分为静态属性和动态属性。
#静态属性：ES启动后便不可修改，如cluster.name、node.name
#动态属性：ES启动后，可通过Restful或其他方式修改
cluster.name: myescluster # 集群名字
node.data: true # 当前节点是否数据结点（默认为true）
node.master: true # 当前节点是否候选主结点（默认为true）
node.ingest: false # 当前节点是否吸收节点（默认为false）
discovery.zen.minimum_master_nodes: 1 # 当前集群
```
#### 登录
http://localhost:9200，若是远程服务器则修改一下IP地址



### ES集群
ES集群通过结点组成。

ElasticSearch集群中，共有五种结点类型：
* 主结点（Master）
* 候选主结点（Master-eligible）
* 数据结点（Data）
* 吸收结点（Ingest）
* 部落结点（Tribe）

**主结点**
每个集群只有一个主结点，负责：
* 管理集群（管理其他结点）
* 集群级别的操作（如索引的创建或删除、跟踪其他结点的状态等）

**候选主结点（相当于热备）**
当集群中的主结点出现故障时，集群会从候选主结点中进行选举，一个候选主结点被选中后会成为新的主结点。
只有候选主结点有投票权，其他结点没有投票权。

**数据结点**  
略

### 其他数据库与ES交互

**ES从其他数据源同步数据**：
mysql、oracle（关系型数据库）： logstash-input-jdbc
mongo： mongo-connector
kafka、文件、日志：Logstash或Apache Flume



## 原理
#### ES存储原理&索引

**docid**

ES数据库里的每条记录，都会分配到一个ID，称为doc id。

| docid | name      | age |
|---    |---        |---  |
|1      |Johnny Depp|25   |
|2      |Aby Homie  |18   |
|3      |Johnny Wei |25   |




**倒排索引（Posting）**

ES会为表中的每个字段都维护一个倒排索引。
倒排索引有两个主要字段，一个负责将表中该字段的每一行分成单词存储起来，一个则负责存储这些单词对应的docid（出现多次则以数组保存）。
查询时，通过分词去匹配索引，匹配到之后，根据后面的ID去查找记录。

name字段的倒排索引：
| Term  | Posting  |
|---    |---       |
|Johnny |[1,3]     |
|Depp   |1         |
|Aby    |2         |
|Homie  |2         |
|Wei    |3         |

age字段的倒排索引：
| Term  | Posting   |
|---    |---        |
|25     |[1,3]      |
|18     |2          |

> 倒排索引提供了模糊搜索的一种解决方案，但是当分词的数量很多（比如千万级），那么检索分词会很慢。
> 因此，ES又引出了分词词典这个概念。




**分词词典（Term Dictionary）**

分词词典，是对分词进行排序后，使其可以通过二分查找达到log(n)级的查询效率。
对倒排索引（posting）排序后获得的就是Term Dictionary。


name字段的分词词典：
| Term  | Posting  |
|---    |---       |
|Aby    |2         |
|Depp   |1         |
|Homie  |2         |
|Johnny |[1,3]     |
|Wei    |3         |

age字段的分词词典：
| Term  | Posting   |
|---    |---        |
|18     |2          |
|25     |[1,3]      |

> 分词词典解决了查询效率问题，但是若数据量太大，则无法将全部数据都加载到内存。
> 为了解决这个问题，分词索引出现了。




**分词索引（Term Index）**

通过分词中的前缀，为分词词典再维护一个B-树索引。
通过分词索引可快速定位到Term Dictionary里的某个offset，再沿着这个offset往下查询。

name字段的分词索引：
| Index | Posting  |
|---    |---       |
|A      |1         |
|Ab     |1         |
|Aby    |1         |
|D      |2         |
|H      |3         |
|J      |4         |
|W      |5         |
|...    |          |

> 若分词索引数据量也很大，内存无法加载完，此时可以通过FST方法，压缩分词索引，提高存储效率。




**FST**
压缩算法，提高存储效率


#### 搜索原理（Lucene）
略


#### 排序原理



#### 配置分词

**什么是分词器？**

ES将一段文本分成多个单词的工具。

**在哪个步骤会用到分词器？**

1. 保存数据时

ES在将一条数据保存到表之后，为了生成倒排索引，还需要通过分词器，将这条数据的每一个字段，分成多个单词，保存到不同字段对应的倒排索引中。
生成倒排索引的原理，可见本文中的“倒排索引”介绍。

2. 查询数据时（全文检索）

以下是一段全文检索请求（使用match），意思就是查表index1中，字段title匹配"BROWN DOG!"这个查询条件的数据：
```bash
GET /index1/_search

{
  "query":{
    "match":{
      "title":"BROWN DOG!"
    }
  }
}

```

全文检索时，ES会先使用分词器，将查询条件分成多个词（[brown,dog]），只要字段中有其中一个词，便会命中。
比如会命中以下数据：
* title = i like brown,i don't like dog.
* title = there is a brown tree.
* title = a white dog.

 如果我们想查两个词都有的数据，可以像下面这样请求：
```bash
GET /index1/_search
{
  "query":{
    "match":{
      "title":"BROWN DOG!"
      "operator":"and" //默认情况下是or
    }
  }
}

```



**有哪些分词器？**

ES自带以下分词器：

* Standard：默认分词器，支持多语言，不分大小写。
* Simple：非字母作为分隔符（即不会将数字分成一个单词）
* Whitespace：空格、制表符、换行作为分隔符
* Keyword：不分词
* Pattern：正则表达式

分词示例：
```
//【1.】假设使用不同分词器对以下句子进行分词。
“text”: “The 2 QUICK Brown-Foxes jumped over the lazy dog’s bone.”

//默认的分词器下，以空格、标点符号作为分隔符，并将单词小写处理
Standard：['the','2','quick','brown','foxes','jumped','over','the','lazy','dog's','bone']

//Simple分词器下，除了空格、标点符号，数字也会作为分隔符，同样也会将单词小写处理
Simple：['the','quick','brown','foxes','jumped','over','the','lazy','dog','s','bone']

//Whitespace分词器下，以空格、制表符、换行作为分隔符，但不会将单词小写处理
Whitespace：['The','2','QUICK','Brown-Foxes','jumped','over','the','lazy','dog's','bone']

//【2.】对中文进行分词。
“text”: “我想买3台空调”

//若用上面的分词器，基本上都会分成['我','想','买','3','台','空','调']
//此时，若搜索'空调'，是搜不出来这条数据的。因为从上面可以看出，没有分出'空调'这个分词
//由此可见，自带的分词对中文搜索不是很友好。此时我们可以使用IK分词器。

```


其他分词器实现：

* IK：更高效的中文分词器

IK分词器有两种模式：ik_max_word和ik_smart模式。

假设对“我是乒乓球冠军”进行分词。

**ik_max_word**：最细粒度分词，会分成：[我，是，乒乓，乒乓球，球，冠军]

**ik_smart**：最粗粒度分词，会分成：[我，是，乒乓球，冠军]


```
#测试分词（analyzer：standard、simple、whitespace、keyword、pattern...）
curl -X POST 'localhost:9200/city/_analyze'

{
  "analyzer":"standard",
  "text":"你是"
}

#返回结果
{
  "tokens":[
  {
   "token":"你",
   "start_offset":0,
   "end_offset":1,
   "type":"<IDEOGRAPHIC>"
   "position":0
  },
  {
   "token":"是",
   "start_offset":2,
   "end_offset":3,
   "type":"<IDEOGRAPHIC>"
   "position":1
  }
  ]
}

#创建索引时，为某个字段指定分词（查询时会自动走分词）
curl -X PUT 'localhost:9200/test'
{
  "mapping":{
    "properties":{
      "name":{   #创建一个name字段
        "type":"text", #定义其类型为text
        "analyzer":"ik_max_word" #分词器使用ik_max_word
      },
      "englishname":{   #创建一个englishname字段
        "type":"text", #定义其类型为text
        "analyzer":"standard" #分词器使用standard
      },
      "sex":{   #创建一个sex字段
        "type":"keyword", #定义其类型为keyword，无需分词
      },
      "age":{   #创建一个age字段
        "type":"long", #定义其类型为long，无需分词
      }
    }
  }
}

```