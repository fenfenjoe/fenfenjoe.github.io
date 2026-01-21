# AOP实战

给出一个“输出Controller接口的信息”的AOP代码示例：

```java
@Aspect
@Component
public class LogRecordAspect {
    private static final Logger logger = LoggerFactory.getLogger(LogRecordAspect.class);

    // 定义切点Pointcut
    @Pointcut("execution(* com.midea.srm.pos.modules.*.web.*Controller.*(..))")
    public void excudeService() {
    }

    @Around("excudeService()")
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes sra = (ServletRequestAttributes) ra;
        HttpServletRequest request = sra.getRequest();

        String url = request.getRequestURL().toString();
        String method = request.getMethod();
        String uri = request.getRequestURI();
        String queryString = request.getQueryString();
        logger.info("请求开始, 各个参数, url: {}, method: {}, uri: {}, params: {}", url, method, uri, queryString);

        // result的值就是被拦截方法的返回值
        Object result = pjp.proceed();
        Gson gson = new Gson();
        //logger.info("请求结束，controller的返回值是 " + gson.toJson(result)); 开发暂时不启动
        return result;
    }
}
```

## 常用注解解析

- ```@Aspect```：定义一个切面类，用于包含通知和切点。
- ```@Component```：将切面类注册为Spring容器的组件，使AOP生效。
- ```@Pointcut```：定义一个切点，用于指定哪些方法需要被拦截。
- ```@Around```：定义一个环绕通知，在目标方法执行前后执行自定义逻辑。
- ```@Before```：定义一个前置通知，在目标方法执行前执行自定义逻辑。
- ```@After```：定义一个后置通知，在目标方法执行后执行自定义逻辑。
- ```@AfterReturning```：定义一个返回通知，在目标方法返回后执行自定义逻辑。
- ```@AfterThrowing```：定义一个异常通知，在目标方法抛出异常后执行自定义逻辑。
