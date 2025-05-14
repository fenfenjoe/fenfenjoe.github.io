---
title:Mysql使用笔记
---

# Mysql使用笔记


### 1. 当查询条件中含有不等于号（!=），是查不出NULL的数据的

示例：  
Teacher表

| ID  | NAME  | AGE |
|-----|-------|-----|
| 1   | JOHN  | 28  |
| 2   | ALICE | 35  |
| 3   | NULL  | 29  |

查询SQL：```sql SELECT * FROM TEACHER WHERE NAME != 'JOHN'```

结果：  

| ID  | NAME   | AGE |
|-----|--------|-----|
| 2   | ALICE  | 35  |

### 2. 如何评估一行数据有多少KB

可以将所有字段的KB累加起来大致估算。

* char(n) --- n个字节
* varchar(n) --- 2个字节储存字符串长度，如果是utf-8，则3n+2个字节
* tinyint --- 1个字节
* smallint --- 2个字节
* int --- 4个字节
* bigint --- 8个字节
* date --- 3个字节
* timestamp --- 4个字节
* datetime --- 8个字节
* decimal(m,n) --- 若n=0，则(m+1)/2+1字节；若n!=0，则(m+2)/2+1字节； 

顺便一提，mysql规定一行记录的最大容量是**65535字节**（约64KB）。