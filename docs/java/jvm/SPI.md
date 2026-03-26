---
title:SPI
---

# SPI

## SPI是什么

SPI（Service Provider Interface）是Java提供的一种服务发现机制，它允许框架或应用程序在运行时动态地为某个接口加载不同的实现，
从而实现模块化、可插拔的架构。核心思想是“面向接口编程，实现分离”，将服务接口的定义与具体实现解耦，通过约定好的位置
（如 META-INF/services/）让第三方扩展点自动被发现。

## SPI的经典使用案例

- **JDBC**：
  - 接口定义：Java 核心库中定义了 java.sql.Driver 接口。
  - 厂商实现：MySQL 提供了实现类 com.mysql.cj.jdbc.Driver。
  - 配置文件：在 MySQL 驱动的 JAR 包中，包含文件 META-INF/services/java.sql.Driver
- **日志门面（SLF4J）**
  - 通过 SPI 在运行时绑定具体的日志实现（Logback、Log4j 等）
- **Spring Boot 自动配置**
  - 利用 spring.factories 文件（Spring 自定义的 SPI）加载 EnableAutoConfiguration 类。
  - 例如：Mybatis的自动配置类MybatisAutoConfiguration，根据用户的配置，自动创建SqlSessionFactory、SqlSessionTemplate、自动配置事务管理器


## 手搓SPI

1. 定义接口

```java
package com.example.spi;

public interface GreetingService {
    String greet(String name);
}
```

2. 实现接口

EnglishGreeting
```java
package com.example.spi.impl;

import com.example.spi.GreetingService;

public class EnglishGreeting implements GreetingService {
    @Override
    public String greet(String name) {
        return "Hello, " + name + "!";
    }
}
```

ChineseGreeting
```java
package com.example.spi.impl;

import com.example.spi.GreetingService;

public class ChineseGreeting implements GreetingService {
    @Override
    public String greet(String name) {
        return "你好，" + name + "！";
    }
}
```

3. 创建SPI配置文件

在 ```src/main/resources/META-INF/services/``` 目录下创建文件，文件名必须为接口的全限定名：

```text
com.example.spi.GreetingService
```

文件内容：
```text
com.example.spi.impl.EnglishGreeting
com.example.spi.impl.ChineseGreeting
```


4. 使用ServiceLoader调用

```java
package com.example.spi;

import java.util.ServiceLoader;

public class SpiDemo {
    public static void main(String[] args) {
        // 加载所有可用的 GreetingService 实现
        ServiceLoader<GreetingService> loader = ServiceLoader.load(GreetingService.class);
        
        for (GreetingService service : loader) {
            System.out.println(service.greet("World"));
        }
    }
}
```

