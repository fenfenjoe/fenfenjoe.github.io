---
title: apollo
---

# apollo

参考资料：<https://www.apolloconfig.com/#/zh/>


## SpringBoot集成APOLLO 

pom.xml中添加依赖
```xml
<dependency>
    <groupId>com.ctrip.framework.apollo</groupId>
    <artifactId>apollo-client</artifactId>
    <version>2.4.0</version> <!-- 推荐使用最新稳定版 -->
</dependency>
```

application.properties配置客户端
```properties
# application.properties
app.id=your-app-id                   # 应用的唯一标识，需与Apollo中创建的项目ID一致
apollo.meta=http://localhost:8080    # Apollo Config Service地址
apollo.bootstrap.enabled=true        # 让Spring Boot启动时就从Apollo拉取配置
```

在主类中启用APOLLO
```java
@SpringBootApplication
@EnableApolloConfig
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

```

通过`@Value`注解获取配置项
```java
import org.springframework.beans.factory.annotation.Value;

@Component
public class DemoComponent {
    @Value("${your-config-item}")
    private String yourConfigItem;
}
```


## 搭建APOLLO服务端

准备工作：
- JDK 17+
- MYSQL 5.6.5+

搭建测试用的可参考：  
<https://www.apolloconfig.com/#/zh/deployment/quick-start>

生产用的可参考：  
<https://www.apolloconfig.com/#/zh/deployment/distributed-deployment-guide>