---
title: Redis---数据结构
---

# Redis 数据结构


## 1. String（字符串）

```shell
# 设置键值对
SET <key> <value>
# 获取值
GET <key>
# 删除键
DEL <key>
# 自增（值为整数时）
INCR <key>
# 自减（值为整数时）
DECR <key>
# 设置键值并指定过期时间（秒）
SETEX <key> <seconds> <value>
```

## 2. Hash（哈希表）

```shell
# 设置单个字段
HSET <hashname> <field> <value>
# 批量设置字段
HMSET <hashname> <field1> <value1> <field2> <value2> ...
# 获取单个字段值
HGET <hashname> <field>
# 获取所有字段和值
HGETALL <hashname>
# 获取所有字段名
HKEYS <hashname>
# 获取所有字段值
HVALS <hashname>
# 删除字段
HDEL <hashname> <field>
```

## 3. List（列表）

```shell
# 左侧插入元素
LPUSH <listname> <value1> [value2 ...]
# 右侧插入元素
RPUSH <listname> <value1> [value2 ...]
# 左侧弹出元素
LPOP <listname>
# 右侧弹出元素
RPOP <listname>
# 获取指定范围元素（0=首元素，-1=尾元素）
LRANGE <listname> <start> <stop>
# 获取列表长度
LLEN <listname>
```

## 4. Set（集合）

```shell
# 添加元素
SADD <setname> <member1> [member2 ...]
# 获取所有元素
SMEMBERS <setname>
# 删除元素
SREM <setname> <member1> [member2 ...]
# 判断元素是否存在
SISMEMBER <setname> <member>
# 计算交集
SINTER <set1> <set2>
# 计算并集
SUNION <set1> <set2>
```

## 5. Sorted Set（有序集合）

```shell
# 添加元素（score为排序权重）
ZADD <zsetname> <score1> <member1> [score2 member2 ...]
# 获取升序范围元素（WITHSCORES显示分数）
ZRANGE <zsetname> <start> <stop> [WITHSCORES]
# 获取降序范围元素
ZREVRANGE <zsetname> <start> <stop> [WITHSCORES]
# 删除元素
ZREM <zsetname> <member1> [member2 ...]
# 获取元素分数
ZSCORE <zsetname> <member>
```


## 6. Bitmap（位图）

```shell
# 设置指定偏移量的位值（1/0），不存在则自动创建
SETBIT <key> <offset> <value>  # value: 0 或 1

# 获取指定偏移量的位值
GETBIT <key> <offset>

# 统计指定范围内为 1 的位数量
BITCOUNT <key> [start] [end]  # start/end 为字节索引，默认全范围

# 查找第一个为 0/1 的位位置
BITPOS <key> <bit> [start] [end]  # bit: 0 或 1

# 将指定偏移量的位设为 0（逻辑删除）
SETBIT <key> <offset> 0

# 直接删除整个 Bitmap 键（物理删除）
DEL <key>
```

## 7. HyperLogLog（基数统计）

```shell
# 向 HyperLogLog 中添加一个或多个元素
PFADD <key> <element1> [element2] ...

# 估算集合的基数（不重复元素数量）
PFCOUNT <key> [key2] ...  # 可同时统计多个 HyperLogLog

# 将多个 HyperLogLog 合并到目标 key
PFMERGE <destkey> <sourcekey1> [sourcekey2] ...

# 直接删除整个 HyperLogLog 键（物理删除）
DEL <key>
```

## 8. Geospatial（地理空间）

```shell
# 添加一个或多个地理位置（经度、纬度、成员名）
GEOADD <key> <longitude> <latitude> <member> [longitude2 latitude2 member2 ...]

# 获取一个或多个成员的坐标
GEOPOS <key> <member1> [member2] ...

# 计算两个成员之间的距离（单位：m/km/mi/ft）
GEODIST <key> <member1> <member2> [unit]

# 根据坐标范围查询成员（返回经纬度、距离、成员名）
GEORADIUS <key> <longitude> <latitude> <radius> <unit> [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT <n>]

# 根据成员位置查询范围内的其他成员
GEORADIUSBYMEMBER <key> <member> <radius> <unit> [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT <n>]

# 从 Geospatial 中删除指定成员（底层调用有序集合的 ZREM）
ZREM <key> <member>
```
