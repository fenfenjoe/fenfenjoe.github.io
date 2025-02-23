---
title: elasticsearch
---

# elasticsearch

## 依赖包

```xml
<dependencies>
        <!--引入es-high-level-client相关依赖  start-->
		<dependency>
			<groupId>org.elasticsearch</groupId>
			<artifactId>elasticsearch</artifactId>
			<version>${elasticsearch.version}</version>
		</dependency>

		<dependency>
			<groupId>org.elasticsearch.client</groupId>
			<artifactId>elasticsearch-rest-high-level-client</artifactId>
			<version>${elasticsearch.version}</version>
		</dependency>

		<dependency>
			<groupId>org.elasticsearch.client</groupId>
			<artifactId>elasticsearch-rest-client</artifactId>
			<version>${elasticsearch.version}</version>
		</dependency>
</dependencies>
```


## API

说到底，这套API最终都会生成一个JSON格式的入参，然后通过HTTP请求发送到ES服务器执行增删改查操作。  
因此，在了解API如何使用前，一定要先熟悉ES-JSON格式的语法。  


### 查询

``` 

```