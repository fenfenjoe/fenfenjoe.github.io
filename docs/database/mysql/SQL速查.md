---
title:SQL速查
---

# SQL速查


## 列转行

```sql
select 
teacher_name,
GROUP_CONCAT(student_name) students
from student
group by teacher_name
```
student表：  

|teacher_name|student_name|
|---|---|
|黄老师|小明|
|黄老师|小红|
|红老师|小黑|

结果：  

|teacher_name|students|
|---|---|
|黄老师|小明,小红|
|红老师|小黑|


## 获取子字符串 

```sql 
-- 获取前2个字符（黄老师 -> 黄老）
select SUBSTRING(student_name,1,2) 
from student;

-- 获取第2个字符开始，后面的子字符串（黄老师 -> 老师）
select SUBSTRING(student_name,2) 
from student;

-- 获取倒数2个字符串（我是黄老师 -> 老师）
select SUBSTRING(student_name,-2) 
from student;
```

## 字符串拼接

```sql 
-- 用CONCAT函数。支持多个入参
select
CONCAT('A','B',student_name,'HAHAHA')
from student;
```


## DISTINCT 的用法

加在SELECT之后，比如：
```sql
select distinct name,age from person;
```

用于对查出来的行进行去重。  

也可以用于group by的语句：
```sql 
select student_name,count(distinct subject) 
from course group by student_name;
```


## 多字段分组，并取最新那条

```sql 
SELECT t1.*
FROM tableName t1
INNER JOIN (
  SELECT groupId, MAX(created_at) AS maxDate
  FROM tableName
  GROUP BY groupId
) t2 ON t1.groupId = t2.groupId AND t1.created_at = t2.maxDate;
```

## 取A表中的字段，插入到B表中
```sql 
INSERT INTO B(
    vendor_code, 
    organization_code, 
    item_code, 
    brand_place, 
    brand_place_id, 
    brand_belong_country
)
SELECT
    s.vendor_code,
    s.organization_code,
    s.item_code,
    s.BRAND_PLACE,
    s.BRAND_PLACE_ID,
    p.BRAND_BELONG_COUNTRY
FROM 
    A s
WHERE s.DELETE_FLAG = 0
    AND s.STATUS = 'ACTIVE';
```

## 取A表中的字段，更新到B表中

```sql
-- 1. 取 B 表 中的数据，并变成（organization_code, vendor_code, item_code）维度的数据
-- 2. 按照（organization_code, vendor_code, item_code）维度，更新到 A 表
UPDATE A rb
JOIN (
    SELECT 
        organization_code,
        vendor_code,
        item_code,
        GROUP_CONCAT(DISTINCT brand_place) AS brand_place,
        GROUP_CONCAT(DISTINCT brand_place_id) AS brand_place_id
    FROM 
        B
    GROUP BY 
        organization_code, vendor_code, item_code
) so ON rb.organization_code = so.organization_code
    AND rb.vendor_code = so.vendor_code
    AND rb.item_code = so.item_code
SET 
    rb.ATTRIBUTE9  = so.brand_place,
    rb.ATTRIBUTE10 = so.brand_place_id
```

## 日期函数

```sql
select now() from dual;
-- 今天（年月日时分秒）。2025-07-28 13:49:27

select curdate() from dual;
-- 今天（年月日）。2025-07-28

select curtime() from dual;
-- 今天（时分秒）。13:46:08

select curdate() - interval 30 day from dual;
-- 30天前。2025-06-28

select curdate() - interval 24 hour from dual;
-- 24小时前。2025-07-27 00:00:00

SELECT DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s')
-- 格式化日期。2025-07-28 13:49:27
```

## 查看某个表的字段

```sql
SHOW FULL COLUMNS FROM erp_iuoms;
```

## 修改表的编码

```sql
-- 修改成utf8mb4
ALTER TABLE erp_iuoms 
CONVERT TO CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
```