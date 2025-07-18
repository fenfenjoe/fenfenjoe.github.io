
# ES-JSON查询


## 查询详解

1. ```select * from student;```

```json 
GET /student/_search
{
  "query": {
    "match_all": {}
  }
}
```

2. ```select * from student where id = 1;```

```json 
GET /student/_search
{
  "query": {
    "term": {
      "id": 1
    }
  }
}
```

3. ```select name,age from student where id = 1;```

```json 
GET /student/_search
{
  "query": {
    "term": {
      "id": 1
    }
  },
  "_source": {
    "includes": ["name", "age"]
  }
}
```

4. ```select * from student where name='Mike' and age=14;```

```json 
GET /student/_search
{
  "query": {
    "bool": {
      "filter": [
        { "term": { "name": "Mike" } },
        { "term": { "age": 14 } }
      ]
    }
  }
} 
```


5. ```select * from student where age>14;```

```json 
GET /student/_search
{
  "query": {
    "range": {
      "age": { "gt": 14 }
    }
  }
}

```

6. ```select * from student where name != 'Mike';```

```json 
GET /student/_search
{
  "query": {
    "bool": {
      "must_not": [
        { "term": { "name": "Mike" } }
      ]
    }
  }
}
```

7. ```select max(age) as maxAge,min(age) as minAge from student where grade = 4 and class = 3;```

```json 
GET /student/_search
{
  "query": {
    "bool": {
      "filter": [
        { "term": { "grade": 4 } },
        { "term": { "class": 3 } }
      ]
    }
  },
  "aggs": {
    "maxAge": { "max": { "field": "age" } },
    "minAge": { "min": { "field": "age" } }
  }
}
```

8. ```select age,count(1) from student where name='Joe' and teacher='Mike' group by age;```

```json 
GET /student/_search
{
  "query": {
    "bool": {
      "filter": [
        { "term": { "name": "Joe" } },
        { "term": { "teacher": "Mike" } }
      ]
    }
  },
  "aggs": {
    "age": {
      "terms": {
        "field": "age",
        "size": 10
      },
      "aggs": {
        "count": {
          "value_count": {
            "field": "_index"
          }
        }
      }
    }
  }
}
```

9. ```select * from student where create_date>'2024-12-01' and create_date<'2025-03-01';```

```json 
GET /student/_search
{
  "query": {
    "bool": {
      "filter": [
        { "range": { "create_date": { "gt": "2024-12-01" } } },
        { "range": { "create_date": { "lt": "2025-03-01" } } }
      ]
    }
  }
}

```

10. ```select age+10 from student where name='Joe';```

```json 
GET /student/_search
{
  "query": {
    "term": {
      "name": "Joe"
    }
  },
  "script_fields": {
    "age_plus_10": {
      "script": {
        "source": "doc['age'].value + 10"
      }
    }
  }
}
```

11. ```select * from student where age = 14 order by name limit 10;```

```json 
GET /student/_search
{
  "query": {
    "term": {
      "age": 14
    }
  },
  "sort": [
    { "name": "asc" }
  ],
  "size": 10
}
```

12. ```select * from student where name in('Mike','Joe');```

```json 
GET /student/_search
{
  "query": {
    "terms": {
      "name": ["Mike", "Joe"]
    }
  }
}

```

13. ```select age * 2 as doubleAge from student;```

```json 
GET /student/_search
{
  "script_fields": {
    "doubleAge": {
      "script": {
        "source": "doc['age'].value * 2"
      }
    }
  }
}
```

## 创建ES索引
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
- **dynamic**:是否可以添加新字段【true(默认)/false/strict】
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

## 查看索引
```bash
GET /my_index
```

## 删除索引
```bash
DELETE /my_index
```