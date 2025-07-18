---
title: SpringBoot集成
---

# SpringBoot集成

## 1. Elasticsearch Java API Client

引入依赖
```xml
<dependency>
    <groupId>co.elastic.clients</groupId>
    <artifactId>elasticsearch-java</artifactId>
    <version>8.12.0</version> <!-- 使用最新版本 -->
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.15.2</version> <!-- 需要Jackson支持 -->
</dependency>

```

配置文件
```Java
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;

@Configuration
public class ElasticsearchConfig {

    @Bean
    public ElasticsearchClient elasticsearchClient() {
        // 1. 创建底层 REST 客户端
        RestClient restClient = RestClient.builder(
            new HttpHost("localhost", 9200) // ES地址
        ).build();

        // 2. 使用Jackson映射器创建传输层
        ElasticsearchTransport transport = new RestClientTransport(
            restClient,
            new JacksonJsonpMapper()
        );

        // 3. 创建API客户端
        return new ElasticsearchClient(transport);
    }
}

```

查询示例
```java
// 1. 查询所有学生 (match_all)
List<Student> students = client.search(s -> s
    .index("student")
    .query(q -> q.matchAll(m -> m)),
    Student.class
).hits().hits().stream()
    .map(hit -> hit.source())
    .collect(Collectors.toList());

// 2. 按ID查询 (term查询)
Student student = client.search(s -> s
    .index("student")
    .query(q -> q.term(t -> t.field("id").value(1))),
    Student.class
).hits().hits().get(0).source();

```


## 2. Spring Data Elasticsearch

引入依赖
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
</dependency>
```

配置
```yaml
# application.yml
spring:
  elasticsearch:
    uris: "http://localhost:9200" # ES地址

```

查询示例
```java
@Repository
public interface StudentRepository extends ElasticsearchRepository<Student, Long> {
    // 自动实现基础CRUD
}

// 复杂查询
List<Student> students = elasticsearchOperations.search(
    new NativeSearchQueryBuilder()
        .withQuery(QueryBuilders.matchAllQuery())
        .build(),
    Student.class
).getSearchHits().stream()
    .map(hit -> hit.getContent())
    .collect(Collectors.toList());

```


## 3. 旧版RestHighLevelClient

> [!warning]
> 已在 Elasticsearch 7.15.0 后被标记为废弃，并在 8.0 版本中移除。

引入依赖
```xml
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
```

1. 查询所有文档 (对应 SELECT * FROM student)
```java
@Autowired
private RestHighLevelClient client;

public List<Map<String, Object>> findAllStudents() throws IOException {
    SearchRequest searchRequest = new SearchRequest("student");
    SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
    sourceBuilder.query(QueryBuilders.matchAllQuery()); // 匹配所有文档
    
    searchRequest.source(sourceBuilder);
    SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
    
    return Arrays.stream(response.getHits().getHits())
            .map(SearchHit::getSourceAsMap)
            .collect(Collectors.toList());
}

```

2. 精确ID查询 (对应 SELECT * FROM student WHERE id = 1)

```java
public Map<String, Object> findStudentById(String id) throws IOException {
    SearchRequest searchRequest = new SearchRequest("student");
    SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
    sourceBuilder.query(QueryBuilders.termQuery("id", id)); // 精确匹配
    
    searchRequest.source(sourceBuilder);
    SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
    
    return response.getHits().getHits().length > 0 
            ? response.getHits().getHits()[0].getSourceAsMap() 
            : null;
}

```

3. 分页查询

```java
public List<Map<String, Object>> findStudentsWithPagination(int page, int size) throws IOException {
    SearchRequest searchRequest = new SearchRequest("student");
    SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
    
    sourceBuilder.query(QueryBuilders.matchAllQuery())
                 .from((page - 1) * size)  // 分页起始位置
                 .size(size);               // 每页大小
    
    searchRequest.source(sourceBuilder);
    SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
    
    return Arrays.stream(response.getHits().getHits())
            .map(SearchHit::getSourceAsMap)
            .collect(Collectors.toList());
}

```

4. 带条件的复合查询

```java
public List<Map<String, Object>> findStudentsByCondition(String name, int minAge) throws IOException {
    SearchRequest searchRequest = new SearchRequest("student");
    SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
    
    // 构建组合查询
    BoolQueryBuilder boolQuery = QueryBuilders.boolQuery()
            .must(QueryBuilders.matchQuery("name", name))      // 必须匹配name
            .filter(QueryBuilders.rangeQuery("age").gte(minAge)); // 过滤age>=minAge
    
    sourceBuilder.query(boolQuery);
    searchRequest.source(sourceBuilder);
    SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
    
    return Arrays.stream(response.getHits().getHits())
            .map(SearchHit::getSourceAsMap)
            .collect(Collectors.toList());
}

```