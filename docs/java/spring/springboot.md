---
title:springboot
---

# springboot


## 常用模板类（xxTemplate）

| 模板类                                       | 用途                                        |
|-------------------------------------------|-------------------------------------------|
| JdbcTemplate / NamedParameterJdbcTemplate | 	简化 JDBC 操作，处理连接管理、异常转换等                  |
| MongoTemplate                             | 	与 MongoDB 交互的模板类                         |
| JmsTemplate                               | 	简化 JMS 消息发送/接收                           |
| RabbitTemplate	                           | RabbitMQ 消息发送/接收                          |
| KafkaTemplate	                            | Kafka 消息发送/接收                             |
| WebClient	                                | 非阻塞式 HTTP 客户端（响应式），功能上类似 RestTemplate 的替代 |
| LdapTemplate	                             | 简化 LDAP 操作                                |
| SolrTemplate / ElasticsearchRestTemplate	 | 与 Solr / Elasticsearch 交互                 |
| MailSender 的 JavaMailSenderImpl	          | 虽非 Template 后缀，但也是模板模式的体现                 |
