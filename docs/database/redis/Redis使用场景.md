---
title: Redis---使用场景
---

# Redis 使用场景


1. 存热点数据
```SET key value```  
将key的值设为value。如果key已存在，则覆盖旧值。

2. 分布式锁
```SETNX key value```  
如果key不存在，则设置key的值为value，返回1；如果key已存在，则不做任何操作，返回0。

3. 实时统计
```INCR key```  
将key的值加1。如果key不存在，则先将其值设为0，然后再执行加1操作。

4. 分布式会话存储
略。

5. 存储地理位置（GEO命令）
```GEOADD key longitude latitude member```  
将指定的经度、纬度和成员添加到key对应的有序集合中。

```GEORADIUS key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count]```  
根据给定的经度、纬度和半径，返回有序集合中所有成员的经度、纬度、距离（可选）和成员本身（可选）。


