---
title: influxdb
---

# influxdb

InfluxDB 是一种**时序数据库（Time Series Database，TSDB）**，专门为处理时间序列数据而设计。
所谓时间序列数据，就是按时间顺序记录的数据点，比如服务器 CPU 使用率、物联网设备传感器读数、金融市场的 tick 数据、应用性能监控指标等。

**查询语言：**
- Flux
- Sql

**结构：**
- Bucket：相当于数据库
- Measurement：相当于表
- Tags：用于查询、过滤的字段
- Fields：相当于表字段
- Timestamp：每条数据必须带一个时间戳


**可视化操作界面**：  
http://localhost:8086
