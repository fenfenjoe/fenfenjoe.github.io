# Java项目集成Redis

## 1. 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

## 2. 连接配置

```yaml
spring:
  redis:
    host: localhost  # Redis服务器地址
    port: 6379       # Redis端口
    password:        # Redis密码（如无密码可省略）
    database: 0      # 数据库索引（默认为0）
    timeout: 2000ms  # 连接超时时间
    lettuce:
      pool:
        max-active: 8  # 连接池最大连接数
        max-idle: 8    # 连接池最大空闲连接数
        min-idle: 2    # 连接池最小空闲连接数
```

## 3. RedisTemplate配置

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        
        // Key使用String序列化
        template.setKeySerializer(new StringRedisSerializer());
        // Value使用JSON序列化
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        
        // Hash类型Key和Value序列化
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(new GenericJackson2JsonRedisSerializer());
        
        template.afterPropertiesSet();
        return template;
    }
}
```

## 4. 使用RedisTemplate操作Redis

```java
@Service
public class RedisService {

    @Resource
    private RedisTemplate<String, Object> redisTemplate;

    // 字符串操作（也可以存Object，但Object需要可序列化）
    public void setString(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public Object getString(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    // Hash表操作（对应Redis_API.md中的HASH命令）
    public void hset(String hashKey, String key, Object value) {
        redisTemplate.opsForHash().put(hashKey, key, value);
    }

    public Object hget(String hashKey, String key) {
        return redisTemplate.opsForHash().get(hashKey, key);
    }

    public Map<Object, Object> hgetAll(String hashKey) {
        return redisTemplate.opsForHash().entries(hashKey);
    }

    // 设置过期时间
    public void setExpire(String key, long timeout, TimeUnit unit) {
        redisTemplate.expire(key, timeout, unit);
    }
}
```


## 5. 分布式锁的实现

添加依赖
```xml
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson-spring-boot-starter</artifactId>
    <version>3.23.3</version>
</dependency>
```

获取锁
```java
@Service
public class RedissonLockService {
    @Autowired
    private RedissonClient redissonClient;

    public void doBusiness() {
        RLock lock = redissonClient.getLock("distributed:lock");
        try {
            // 尝试获取锁，最多等待10秒，10秒后自动释放
            boolean locked = lock.tryLock(10, 10, TimeUnit.SECONDS);
            if (locked) {
                // 业务逻辑
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            if (lock.isHeldByCurrentThread()) {
                lock.unlock(); // 释放锁
            }
        }
    }
}
```