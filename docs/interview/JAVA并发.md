---
title: JAVA多线程
sidebar: 'heading'
---

# JAVA多线程

## ⭐Java新建线程有哪几种方式？
* Thread
 ```java
 Thread t = new Thread();
 t.run();
 ```

* Runnable接口
 ```java
  public static void main(String[] args) {
  Thread thread = new Thread(new MyRunnable());
  thread.start();
 }
public class MyRunnable implements >Runnable {
    @Override
    public void run() {
        // ...
    }
}
 
 ```
* Callable接口
 ```java
 public static void main(String[] args) {
  FutureTask task = new FutureTask(new MyCallable());
  Thread thread = new Thread(task);
  thread.join(); //在thread.start之后，等待线程执行完之后，再继续往下执行
  System.out.println("join!");
  thread.start();
  System.out.println("after start!");
  System.out.println("result="+task.get());
  //最后输出顺序是：join! -> after start! -> generate 123! -> result=123
 }
 public class MyCallable implements 
  Callable<Integer> {
     public Integer call() {
     System.out.println("generate 123!");
     Thread.currentThread().sleep(5000);
     return 123;
     }
 }
 ```

## ⭐线程池ThreadPoolExecutor

问题：
* 创建线程的方式有哪些
* 实现runnable和callable的区别
* sleep和wait方法的区别
* 为什么不推荐用Executors里提供的线程池初始化的方法？


### 线程池的核心参数
```java
//线程池实现类&核心参数
public class ThreadPoolExecutor extends AbstractExecutorService{

private final HashSet<ThreadPoolExecutor.Worker> workers;//线程集合
private final BlockingQueue<Runnable> workQueue;//等待被执行的任务队列
private final ReentrantLock mainLock;
private final Condition termination;
//RejectedExecutionHandler默认实现是ThreadPoolExecutor.AbortPolicy
private volatile RejectedExecutionHandler handler;//入任务队列失败的处理策略
private volatile ThreadFactory threadFactory;//创建线程的工具

}
```

### 线程池的使用
1. 生成线程池
```java
/**
 【自定义线程池】
 参数：
 1、corePoolSize：核心线程数
        * 核心线程会一直存活，即使没有任务需要执行
        * 当线程数小于核心线程数时，即使有线程空闲，线程池也会优先创建新线程处理
        * 设置allowCoreThreadTimeout=true（默认false）时，核心线程会超时关闭
2、maxPoolSize：最大线程数
        * 当线程数>=corePoolSize、当前没有空闲线程、且任务队列已满时，线程池会创建新线程来处理任务
        * 当线程数=maxPoolSize、当前没有空闲线程、且任务队列已满时，线程池会拒绝处理任务而抛出异常
3、 keepAliveTime：线程空闲时间
        * 当线程空闲时间达到keepAliveTime时，线程会退出，直到线程数量=corePoolSize
        * 如果allowCoreThreadTimeout=true，则会直到线程数量=0
4.  线程空闲时间单位
5.  workQueue 工作队列，用于存储任务在任务被执行之前
6.  threadFactory 线程创建工厂，用于创建线程
7.  RejectedExecutionHandler 当workQueue工作队列达到容量上限时，对任务进行的拒绝策略。
**/
public ThreadPoolExecutor(int arg0, int arg1, long arg2, TimeUnit arg4,
BlockingQueue<Runnable> arg5, ThreadFactory arg6,
RejectedExecutionHandler arg7)

/**
ExecutorService是接口，ThreadPoolExecutor是该接口的实现
Executors.newCachedThreadPool() 等同于以下写法
**/
ExecutorService service =new ThreadPoolExecutor(0, Integer.MAX_VALUE,
60L, TimeUnit.SECONDS,  
new SynchronousQueue<Runnable>())  
 
```


2. 执行任务  
   执行任务也有很多API可以用：

    * 直接使用线程池  
      service.execute() 不支持返回结果

    ```java
        //新建线程池
        ExecutorService service =new ThreadPoolExecutor(0, Integer.MAX_VALUE, 
         60L, TimeUnit.SECONDS, 
         new SynchronousQueue<Runnable>());
        //无回参
        service.execute(new Runnable(){//...});
    ```

    * Future接口  
      service.submit() 支持返回结果，结果封装为Future

    ```java
        //新建线程池
        ExecutorService service =new ThreadPoolExecutor(0, Integer.MAX_VALUE, 
         60L, TimeUnit.SECONDS, 
         new SynchronousQueue<Runnable>());
        //有回参的写法
        Future future = service.submit(new Callable(){//...});

        //获取执行结果（阻塞）
        future.get();

        //获取执行结果（等待一段时间，超时则抛出异常）
        //future.get(3,TimeUnit.SECONDS);
    ```

    * FutureTask类  
      Future的实现类，使用起来跟Future差不多

        ```java

            public static void main(String[] args) {
                List<FutureTask> resultList = test();
                for(FutureTask task:resultList){
                    System.out.println((String)task.get());
                }
            }

            public List<FutureTask> test(){
                List<FutureTask> result = new ArrayList<>();
                //新建线程池
                ExecutorService service =new ThreadPoolExecutor(0, Integer.MAX_VALUE, 
                 60L, TimeUnit.SECONDS, 
                 new SynchronousQueue<Runnable>());

                for(int i=0;i<10;i++){
                    FutureTask<String> task = new FutureTask<String>(new Callable<String>() {
                        @Override
                        public String call() throws Exception {
                            return "hello";
                        }
                    });

                    service.submit(task);
                    result.add(task);
                }

                return result;
            }
            
        ```


    * CompletionService接口（JDK1.8前推荐用这个）
      有一个实现类为ExecutorCompletionService  
      推荐理由：可以使得先完成的任务先被取出，减少了不必要的等待时间
    
        ```java 
            //创建线程池，并且包一层CompletionService
            ExecutorService service =new ThreadPoolExecutor(0, Integer.MAX_VALUE,60L, TimeUnit.SECONDS,
            new SynchronousQueue<Runnable>());
            CompletionService<Integer> cService = new ExecutorCompletionService<Integer>(service);

            // 向里面扔10个任务
            for (int i = 0; i < 10; i++) {
                //这边不是直接通过线程池来提交任务，而是通过CompletionService来提交
                cService.submit(new WorkTask("ExecTask" + i));  
            }

            // 检查线程池任务执行结果
            for (int i = 0; i < 10; i++) {
                
                //获取执行结果。10个任务中，最先计算出结果的就最先被获得。
                int sleptTime = cService.take().get();
                System.out.println(" slept "+sleptTime+" ms ...");
            }
        ```

    * CompletableFuture类（JDK1.8后推荐用这个）  
      自带线程池(ForkJoinPool.commonPool())，无需手工创建。  
      当然也可以使用手动创建的线程池 

        ```java
        CompletableFuture comFuture = new CompletableFuture();
        //从线程池获取一个线程并执行任务（无返回值）
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                Integer intResult = 1+1;
            }
        };
        CompletableFuture.runAsync(runnable);

        //从线程池获取一个线程并执行任务（有返回值）
        try {
            Integer result = CompletableFuture.supplyAsync(()->{
                Integer intResult = 1+1;
                return intResult;
            }).get();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        }

        //多任务
        CompletableFuture
                .supplyAsync(()->1+1) //获取一个线程并执行
                .exceptionally((exception)->{ System.out.println(exception.getMessage()); return 0;})//若抛异常则这样处理
                .thenApply((result)->x+2)  //使用上一步的线程，对上一步的结果进行处理
                .handle((result,exception)->x+3) //使用上一步的线程，对上一步的结果进行处理（若抛了异常也可处理）
                .whenComplete((result,exception)->System.out.println("x="+x)); //最后一步处理
        
        //多任务2
        CompletableFuture
                .supplyAsync(()->1+1) //获取一个线程并执行
                .thenApplyAsync((x)->x+2);  //获取一个新线程，处理上一步的结果

        //生成UUID：谁先计算出结果，就用谁的
        CompletableFuture<String> future1 = CompletableFuture
                .supplyAsync(()->"123456");

        CompletableFuture<String> future2 = CompletableFuture
                .supplyAsync(()->"567890");

        String myuuid = (String)CompletableFuture.anyOf(future1,future2).get();

        //使用自定义线程池
        ExecutorService service =new ThreadPoolExecutor(0, Integer.MAX_VALUE,60L, TimeUnit.SECONDS,
                new SynchronousQueue<Runnable>());
        CompletableFuture<Integer> future3 = CompletableFuture.supplyAsync(()->1+1,service);
        Integer result3 = future3.get();
        ```

3. 关闭线程池

```java
service.shutdown();
```


### 认识常见的队列实现

| 队列 | 描述 | 见于|
| --- | --- | --- | 
| ArrayBlockingQueue | 固定大小的阻塞队列，支持公平和非公平访问 | 推荐使用 |
| LinkedBlockingQueue | 无界阻塞队列，支持公平和非公平访问 | Executors.newFixedThreadPool() |
| SynchronousQueue | 无界阻塞队列，每个任务必须等待其他任务完成 | Executors.newCachedThreadPool() |
| DelayedWorkQueue | 无界阻塞队列，支持定时任务 | Executors.newScheduledThreadPool() |



### 任务队列满后的拒绝策略

* AbortPolicy（直接抛出异常，任务没有被执行。默认策略）
* DiscardOldestPolicy（放弃队列中最旧的任务，然后将新任务入队）
* DiscardPolicy（直接放弃任务，什么都不做）
* CallerRunsPolicy（会调用当前线程池的所在的线程去执行被拒绝的任务，缺点是会阻塞主线程）



## ⭐线程池创建工具：Executors类

已不建议使用，建议直接new ThreadPoolExecutor

|线程池|corePoolSize|maxPoolSize|workQueue|workQueue初始化大小|拒绝策略|描述|
|---|---|---|---|---|---|---|
|Executors.newFixedThreadPool()       |new对象时传入|new对象时传入     |LinkedBlockingQueue |Interger.MAX_VALUE|AbortPolicy| 定长线程池。LinkedBlockingQueue默认size为Integer.MAX_VALUE，过多任务进队时会导致OOM|
|Executors.newCachedThreadPool()      |0           |Integer.MAX_VALUE|SynchronousQueue    |                  |AbortPolicy||
|Executors.newScheduledThreadPool()   |new对象时传入|Integer.MAX_VALUE|DelayedWorkQueue    |16                |AbortPolicy|DelayedWorkQueue可变长，即队列是无界的，过多任务进队时会导致OOM|
|Executors.newSingleThreadExecutor()  |1           |1                |LinkedBlockingQueue |Interger.MAX_VALUE|AbortPolicy|只有一个线程。LinkedBlockingQueue默认size为Integer.MAX_VALUE，过多任务进队时会导致OOM|


(1). 获取线程池
* 可变长线程池
```java
//生成一个可变长线程池
ExecutorService pool = Executors.newCachedThreadPool()
```

* 定长线程池
 ```java
 //生成一个定长线程池
 ExecutorService pool = Executors.newFixedThreadPool()
```

* 轮询线程池
 ```java
 //生成一个定长线程池（支持定时、周期性任务）
 ExecutorService pool = Executors.newScheduledThreadPool()
```

(2).获取线程执行任务
 ```java
 //
 Future future = pool.execute(new Runnable(){});
 ```

## ⭐SpringBoot的异步执行方法

通过@EnableAsync + @Async配置，即可使用SpringBoot维护的线程池

```java
//在启动类增加@EnableAsync注解
@EnableAsync
@SpringBootApplication
public class ManageApplication {
    //...
}
```


```java
@Service
public MyService{
    //定义一个异步执行的函数，被调用时使用默认的线程池执行
    @Async 
    public void test(){//...}

    //使用名称为pool2的自定义线程池
    @Async(value="pool2")
    public void test2(){//...}
}

```

默认的线程池配置：
```
#核心线程数
spring.task.execution.pool.core-size=8
#最大线程数
spring.task.execution.pool.max-size=Integet.MAX_VALUE
#空闲线程保留时间
spring.task.execution.pool.keep-alive=60s
#队列容量
spring.task.execution.pool.queue-capacity=Integet.MAX_VALUE
```



## ⭐volatile Integer 和AtomicInteger的区别？

AtomicInteger： 本身即可满足线程安全的三个条件：原子性、可见性、有序性；

volatile Integer：只能满足可见性和有序性，所以遇到 i++这种操作，还是需要先加锁再操作。


## ⭐JAVA里线程（Thread）的生命周期？

新建（new）  
就绪（runnable）  
运行 （running）  
阻塞（blocking）  
睡眠（time waiting，等待通知或等待一段时间）  
等待（waiting，等待通知）  
结束（dead）


## ⭐Thread里的函数解析

```java
/**在调用interrupt时，若thread正被阻塞（等待IO、或在synchronized代码块前等待锁），则可让thread停止阻塞，抛出异常。
若thread没有被阻塞，则不会抛出异常。
若想在运行时也可以中断，可在thread的run()中加入isInterruped()的判断。
**/
thread.interrupt();
/**
开始线程
**/
thread.start();
/**
线程休眠（不会交出占用的锁）
**/
thread.sleep(long millis);
/**
线程是否活跃
**/
thread.isAlive();
/**
thread线程阻塞当前线程，当thread执行完后，当前线程才继续执行
**/
thread.join();
```
## ⭐Thread如何从一个生命周期进入另一个生命周期？

新建（new）
```java
public static void main(String[] args){
//此时进入新建态
Thread thread = new MyThread();
}
```
新建（new） --> 就绪（runnable）
就绪（runnable） --> 运行 （running）
```java
thread.start(); 
//调用start()后获取到CPU时间片，start()再调用run()，此时才算正式进入运行态
```

运行 （running） --> 阻塞（blocking）
```java
//1.遇到同步代码块时，thread便会被阻塞
public class MyThread {
    public void run(){
        synchronize(this){
           // ...
        }
        
    
    }
}
```

运行 （running） --> 睡眠（time waiting）
运行 （running） --> 等待（waiting）
```java
//第一种：lock.wait()
public class MyThread {
    Object lock = new Object();
    public void run(){
        //为什么wait()、notify()、notifyAll()需要在synchronized里执行？
        //语法上：不写在synchronized内，运行时会抛出异常
        //原理上：当前线程必须拥有对象的monitor（内置锁），调用对象的wait()、notify()、notifyAll()方法时才能有锁可以释放
        synchronized( lock ){
            try {
                    // ...
                    //释放lock对象，线程等待1s，1s后重新竞争lock对象，竞争到lock对象后继续往下走
                    lock.wait(1000);
                } catch (InterruptedException e) {
                      e.printStackTrace();
                }

        }
    }
}
```
```java
//第二种：thread.join() (实质是调用了thread.wait())
public static void main(String[] args){
//此时进入新建态
Thread thread = new MyThread();
//等待thread执行完后，主线程再执行（等于异步变同步）
thread.join(1000);
}
```
```java
//第三种：
public class MyThread {
public void run(){
    LockSupport.pack(this);//当前线程等待，直至其他线程调用LockSupport.unpack(this)
}
//等待thread执行完后，主线程再执行（等于异步变同步）
thread.join();
}
```
睡眠（time waiting） --> 就绪（runnable）
```java
/**
1. lock.nofity() or lock.notifyAll() ; //对应第一种方式
2. LockSupport.unpack(this) //对应第三种方式
**/
```


## ⭐有哪些常见的锁？

|类型|可重入|悲观锁|可中断锁|公平锁|互斥锁|独占锁|
|---|---|---|---|---|---|---|
|synchronized|√|√|×|×|√|√|
|ReentrantLock|√|√|√|都可，默认非公平|√|√|
|ReentrantReadWriteLock|√|√|×|都可，默认非公平|×(读写锁)|读锁是共享锁，写锁是独占锁|
|Unsafe.compareAndSwap()|-|×|-|-|×(自旋锁)|-|
|Semaphore|-|√|-|都可，默认非公平|-|×|
|CountDownLatch|-|√|-|都可，默认非公平|-|×|


* 可重入？
  当某个线程已调用该锁并持有，在被锁的代码段里面仍可以继续调用锁，则该锁是可重入锁；
  换言之，当某线程调用锁，进入代码，然后再次调用锁，若此时不能继续进入该代码，则是不可重入锁。

* 悲观or乐观？
  当读、写都要调用锁，悲观锁；
  读写都不锁，只有在写时检测是否有冲突，有冲突则返回错误给用户，乐观锁；
* 可中断？
  当线程A想要的锁一直被另一线程B占据，若线程A需要一直阻塞等待锁，即是不可中断锁；
  反之，若线程A可等待一段时间后返回失败，则是可中断锁。
* 公平？
  若线程A最先请求锁，最终亦是线程A最先获得锁，那么该锁便是公平锁；
  反之，若线程A不一定最先获得锁，便是不公平锁。
* 互斥or读写？
  当读、写都要调用锁，互斥锁；
  当读时，大家可以共用该锁；写时，只有一人可以占用该锁，读写锁；
* 互斥or自旋？
  互斥锁(mutex)：竞争锁失败时，线程会挂起，进入阻塞态；等待解锁后，重新竞争CPU时间片
  自旋锁(spin)：竞争锁失败时，线程不会挂起，而是一直轮询锁是否能用一段时间；一段时间内还获取不到，才挂起线程，进入阻塞态。
* 独占or共享？
  独占锁（写锁）：一个资源只能被线程上一次独占锁
  共享锁（读锁）：一个资源能被多个线程上多次共享锁



## ⭐乐观锁的优点



## ⭐关于Java乐观锁、自旋锁：Unsafe类
像原子类（AtomicInteger等类）、AbstractQueuedSynchronizer（AQS，ReentrantLock、CountDownLatch的底层实现），都是通过Unsafe类的CAS操作（乐观锁操作）实现。

> 既然底层是通过乐观锁实现，那为什么说ReentrantLock是悲观锁？
>


如何实例化Unsafe对象
> 由Unsafe类的源码可知，只有JDK自带的类（即BootstrapClassLoader加载的类），才能使用getUnsafe()获取unsafe类
> 若开发者想自己获取unsafe类，只能通过反射方式获取（如下示例）：
```java
    public static void main(String[] args)
        throws NoSuchFieldException, IllegalAccessException {
        Field theUnsafe = Unsafe.class.getDeclaredField("theUnsafe");
        theUnsafe.setAccessible(true);
        Unsafe unsafe = (Unsafe) theUnsafe.get(null);
        System.out.println(unsafe);
    }
```

Unsafe类核心代码
```java
public final class Unsafe {
    private static final Unsafe theUnsafe;

    private Unsafe() {
    }

    @CallerSensitive
    public static Unsafe getUnsafe() {
        Class var0 = Reflection.getCallerClass();
        if (!VM.isSystemDomainLoader(var0.getClassLoader())) {
            throw new SecurityException("Unsafe");
        } else {
            return theUnsafe;
        }
    }

    //...
}
    
```


## ⭐CAS操作
Unsafe提供了3个CAS函数，来实现乐观锁。
所谓CAS函数，即compareAndSwapObject()、compareAndSwapInt()、compareAndSwapLong()。
它包含3个入参：要修改变量的内存位置、预期原值、要修改为的值
比如，有一个student对象，要使用自旋锁的方式，修改它的name属性。
CAS操作，若成功则返回true，失败则返回false
```java

    public void test(Student student,String newName){
        //1.获取unsafe，略
        try {
            //2.使用Unsafe类，实现上自旋锁修改name属性
            long valueOffset = unsafe.objectFieldOffset(Student.class.getDeclaredField("name"));
            String oldName = unsafe.getAndSetObject(student, valueOffset, newName);
            //getAndSetObject()是自旋锁实现，实际也是调用compareAndSwapObject()方法
        } catch (Exception var1) {
            throw new Error(var1);
        }
    }
```




## ⭐JUC简介

### AQS
> 什么是AQS？

抽象的队列式的同步器。

ReentrantLock/Semaphore/CountDownLatch的底层实现。


## ⭐Lock接口
> 为什么有synchronized，还需要再提出Lock接口？

因为synchronized无法解决线程死锁的问题。
产生线程死锁需要满足以下条件：
1. 互斥条件（一段时间内某一资源仅为一线程所持有）
2. 请求和保持条件（当线程请求资源而阻塞时，不会释放自己拥有的资源）
3. 不可抢夺条件（线程为使用完的资源不能被剥夺，只能在使用完时释放）
4. 环路等待条件（在发生死锁时，必然存在一个进程--资源的环形链，如下）
   线程1占有锁1，等待锁2；
   线程2占有锁2，等待锁3；
   ...
   线程N占有锁N，等待锁1。

解决线程死锁，一般方法是破坏条件3，即“不可抢夺条件”。

想破坏“不可抢夺条件”，有如下方法：
1. 线程能响应中断（对应lock.lockInterruptibly()）
2. 线程可以非阻塞地获取锁（对应lock.tryLock()，获取不到立即返回false）
3. 支持超时（对应lock.tryLock(long time)）

从上面可看到，JDK1.5后发布的Lock接口有对应的API支持。

### ReentrantLock
三个内部类：Sync、NonfairSync、FairSync。NonfairSync、FairSync集成Sync，而且都是AQS的实现类。

FairSync类：采用公平策略获取锁
NonfairSync：采用非公平策略获取锁（默认）


## ⭐ JUC Tools
### Semaphore
Semaphore称为计数信号量，它允许n个任务同时访问某个资源，可以将信号量看做是在向外分发使用资源的许可证，只有成功获取许可证，才能使用资源。
```java
//假设只能允许10个用户同时在线
Semaphore semaphore=new Semaphore(10);
//用户登录，占用1个信号量
boolean isLogin= semaphore.tryAcquire();
//查看剩余多少用户可以登录
int restCount=semaphore.availablePermits();

```
### CountDownLatch
CountDownLatch典型的用法是将一个程序分为n个互相独立的可解决任务，并创建值为n的CountDownLatch。当每一个任务完成时，都会在这个锁存器上调用countDown，等待问题被解决的任务调用这个锁存器的await，将他们自己拦住，直至锁存器计数结束。
```java
//定义了一个计数器，当前计数为1
CountDownLatch begin = new CountDownLatch(1);
//阻塞当前线程，等待计数器到0
begin.await();
//（在另外的线程）任务完成，计数-1
begin.countDown();
```
### LockSupport

略