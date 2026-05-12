---
title: JAVA基础
sidebar: 'heading'
---

# JAVA基础

## ⭐变量的加载顺序
先看是否静态：静态优先级更高；
若都是静态，则无论是代码块还是成员变量，谁先声明谁先执行。

优先级
1. 静态成员变量 / 静态代码块: 他们的优先级相同,谁先声明谁先执行
2. 普通成员变量 / 构造代码块: 他们的优先级相同,谁先声明谁先执行
3. 构造代码块优先于构造方法执行,每创建一个对象就调用一次构造代码块和构造方法
4. 普通方法和静态方法没有任何区别,谁先调用就谁先执行
```java
public class Test{
  
  String a=1;//变量
  static String b=2;//静态变量
  static final String c=3;//静态常量
  String d;
  String e;
  String f;

  //静态代码块
  static{
    d = 4;
  }
  //构造代码块
  {
    e = 5;
  }
  //构造方法
  public Test(){
    f = 6;
  }
  
  public static void main(String[] args){
      g= 7;
  }

}
```


## ⭐控制台输入、输出
```java
//输入
Scanner scan = new Scanner(System.in);
while(scan.hasNext()){
    String str = scan.next();
}

//输出
System.out.println("hello world");
System.out.printf("the number is:%f",12.3);
```


## ⭐HashTable
实现了多线程安全，在几乎所有的方法上都加上了synchronized锁，而加锁的结果就是HashTable操作的效率十分低下。

## ⭐HashSet
底层通过HashMap实现。因此也是非线程安全的。

## ⭐HashMap
非线程安全。仅适用于单线程中。
实质是一个“链表的数组”，可以通过哈希值直接求出元素对应的下标，因此查询效率极高。

### HashMap处理哈希冲突的方式
链地址法
### 怎么样会触发HashMap的扩容？
size达到阙值（threshold）。threshold = capacity（数组最大长度） * loadfactor（扩容因子）
### 插入、查找时，如何为Key定位
1. 先取hashcode
2. 根据hashcode获得数组下标
3. 根据数组下标获得Entry、遍历Entry链表，若hashcode一致、key.equal为true或key相等
### 插入时，是插入在链表的头部还是尾部
1.8之前：头部。又名头插法。（个人想法：若插入到尾部，还需要遍历链表到尾部，增加了耗时）
1.8及1.8之后：尾部。
### HashMap是怎么遍历的，遍历时可以插入和删除元素吗？
实现：HashMap.AbstractMapIterator
modCount：HashMap用来记录对数据进行插入、删除的次数；
expectedModCount：AbstractMapIterator用来记录对数据进行插入、删除的次数；

若在遍历时执行插入、删除操作，发现modCount和expectedModCount不一样，会抛出异常。

* 调用hashmap.remove()或hashmap.put()时，会修改modCount，但不会修改expectedModCount
* 调用Iterator.remove()时，会同时修改modCount和expectedModCount

因此遍历时，不可以插入，可以删除（但要用iterator.remove()）。

### 什么是扰动函数？
HashMap为了减少哈希冲突而设计的函数。
在1.8版本的HashMap中，是这样取哈希值的：
```java
static final int hash(Object key) {
int h;
return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

即HashMap的hash方法，就是扰动函数的实现。
采用了 hashcode 的高 16 位和低 16 位异或的方法，去降低 hash 碰撞。
（参考：https://blog.csdn.net/weixin_42373997/article/details/112085344）

### 不同JAVA版本HashMap实现的区别
|| 1.6的HashMap | 1.7的HashMap                            | 1.8的HashMap                                 |
|-------------|----------------------------------------|---------------------------------------------|---|
| 如何取hashcode | key.hashcode()                         | sun.misc.Hashing.stringHash32((String) key) |(key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16) |
| 如何扩容        | 超过阙值，则创建一个容量为原数组2倍的新数组，然后重新计算哈希值存进去    | 与1.6一样                                      |与1.6一样|
| 如何取数组下标     | hashcode & this.elementData.length - 1 | 与1.6一样                                      ||
| 如何实现链表      | Map.Entry                              | Map.Entry                                   |HashMap.Node、HashMap.TreeNode（树化后）|
| 在链表哪里插入新的元素 | 链表头插入                                  | 链表头插入                                       |链表尾插入|
| 迭代器         | HashMap.AbstractMapIterator            | HashMap.AbstractMapIterator                 |Spliterator（并行迭代器）|

## ⭐LinkedHashMap
事实上LinkedHashMap是HashMap的直接子类，二者唯一的区别是LinkedHashMap在HashMap的基础上，采用双向链表(doubly-linked list)的形式将所有entry连接起来，这样是为保证元素的迭代顺序跟插入顺序相同。
```java
Entry<K,V>[] table; //存储HashMap的地方
Entry<K,V> header;//按插入顺序维护的一个链表头部的指针
Entry<K,V> tail;//链表尾部的指针
```


### ConcurrentHashMap
线程安全的Hashmap。

**JDK1.7版本（Segment桶模式，也称为分段锁机制）**
ConcurrentHashMap 是一个 Segment 数组，Segment是一个锁， 通过继承 ReentrantLock 来进行加锁，所以每次需要加锁的操作锁住的是一个 segment，这样只要保证每个 Segment 是线程安全的，也就实现了全局的线程安全。

Segment 内部是由数组+链表组成的。

segment 数组不能扩容，扩容的是Segment内部的数组。

默认有16个Segment。（concurrencyLevel=16）

**简单叙述ConcurrentHashMap 1.7中put操作的原理**
concurrentHashMap.put: 先取key的hashcode，根据hashcode求出所属Segment的下标（与15进行与操作）；

求得所属Segment后，调用Segment的put方法；

segment.put: 先获取独占锁，再根据key的hashcode获得node的下标；

若node没有value，直接赋值；若node有value，则比较hashcode是否一致，一致则直接覆盖，不一致则比较下个node



**JDK1.8版本（与HashMap类似的数组+链表+红黑树的方式实现）**

1.8摒弃了分段锁机制，使用与HashMap类似的数组+链表+红黑树的结构。
线程安全则是通过CAS和synchronized来实现。

**简单叙述ConcurrentHashMap 1.8中get操作的原理**
get操作全程不加锁，只通过volatile关键字修饰Node节点，保证数据的可见性、有序性。但不保证原子性。




**简单叙述ConcurrentHashMap 1.8中put操作的原理**
concurrentHashMap.put: 同样，先取key的hashcode，根据hashcode求出所属Node的下标（tabAt(tab, i = (n - 1) & hash)）；

若下标处node=null，则直接插入新值即可。插入时会进行一次cas操作，若操作失败则证明有并发操作，重新插入一次（casTabAt(...)）；

>CAS操作：即调用sun.misc.Unsafe的compareAndSwapObject()方法，传入了node数组、下标、旧值和新值。
>原理是先将旧值与node数组下标对应的值比较，若相等，则直接插入新值，返回true（表示操作成功）；
>若不相等，则表示数组已经被修改过，直接返回false（表示插入失败）。

若下标处node不为空，则用synchronized将node锁住，再遍历链表去存储值。

## ⭐TreeMap
以红黑树作为存储结构。
### Treemap是有序的吗？
是的。默认排序规则：按照key的字典顺序来排序（升序）。
也可以自定义排序规则（Comparator接口）
### 是线程安全类吗？
不是线程安全的。若想线程安全，可通过如下方法：
```java
SortedMap m = Collections.synchronizedSortedMap(new TreeMap(...));
```
### 红黑树的原理？
逻辑上是一棵“2-3-4树”。下图可知，2-3-4树是一棵“多叉树”，一个节点里可包含1~3个值。
包含一个值的叫2-节点（2个子树），对应红黑树的黑节点；
包含两个值的叫3-节点（3个子树），对应红黑树的一个黑根、一个红子；
包含三个值的叫4-节点（4个子树），对应红黑树的一个黑根、两个红子；

### 为什么有二叉搜索树（BST），还要有平衡二叉树（AVL树）？为什么又要有红黑树？为什么又会有B-树？为什么又会有B+树？
* 二叉搜索树（BST）：
  查找最坏情况为O(N)，即树成链表状的时候
* 平衡二叉树（AVL）：
  在二叉搜索树的基础上，加上了“自平衡”的逻辑（左右子树树高超过1则对树进行旋转），避免树成为链表的形状；
  查找的平衡和最坏情况均为O(logN)；
* 红黑树（RBT）：
  红黑树也是一棵二叉搜索树，查找的时间复杂度最坏情况是O(2logN)，比平衡二叉树稍差，但因为插入、删除操作更简单，旋转操作更少，所以总体性能优于平衡二叉树
* B-树：
  B-树是一棵多路搜索树，通过增加阶数（增加子树数量），使树变得更“矮”，查询效率就可以比红黑树更高。
* B+树：
  B+树也是一棵多路搜索树，只不过B+树的数据只存储在叶子节点，且叶子节点之间增了指针相连，方便遍历和范围搜索。
  现在大多数数据库的数据以及索引都默认通过B+树来存储。可参考Mysql的数据及索引存储结构。


## ⭐队列、栈
### Stack类（官方不建议使用）
* peek()
* pop()
* push(E)
### Queue接口

**从尾部进队，从头部出队**

* offer(e)
* remove()
* poll()
* element()
* peek()

### Duque接口（双向队列。既可当栈用，又可当队列用）
继承了Queue接口。

**常用实现类**  
最常用：        LinkedList  
线程安全：      LinkedBlockingQueue
限制队列长度：  ArrayBlockingQueue  
有优先级的：    PriorityBlockingQueue


***API***

|   |第一个元素（头部）  |                |第一个元素（尾部）  |               | 对应Queue方法              |                   |
|---|---               |---             |---                |---            |---                        |---              |
|    |抛出异常          |特殊值（0或null）|抛出异常           |特殊值（0或null）|抛出异常                   |特殊值（0或null）|
|插入|addFirst          |offerFirst     |addLast            |offerLast      |add = addLast             |offer           |
|移除|removeFirst       |pollFirst      |removeLast         |pollLast       |remove = removeFirst         |poll            |
|检查|getFirst          |peekFirst      |getLast            |peekLast       |element = getFirst         |peek            |


* 当队列（Queue）用：
    * offerLast(e)（入队，也可以用offer(e)、add()、addLast(e)）
    * E pollFirst() （出队，也可以用poll()、remove()、removeFirst()）
    * E peekFirst()（获取头节点（first），也可以用peek()、getFirst()、element()）

* 当栈（Stack）用：
    * addFirst(e)（进栈）
    * removeFirst()（出栈）
    * peekFirst()（获取栈顶元素）

总结：
1. add、remove、get方法（Collection接口的方法）若失败，均会抛出异常；
2. offer、poll、peek方法（Queue接口的方法）若失败，则会返回null或false；
3. 后缀为First、Last的均为Deque接口的方法（因为是双端队列）；

***实现：***   
***非线程安全：LinkedList、ArrayDeque***   
***LinkedList***  
解决方法：Collections.synchronizedList()  
底层是链表：Node(first)-> Node-> Node-> Node-> Node(last)

***ArrayDeque***  
变为线程安全：Collections.synchronizedList()  
底层是数组+head指针+tail指针：  
如何扩容：  
申请一个更大的数组(原数组的两倍)，然后将原数组复制过去

***线程安全：ConcurrentLinkedQueue（继承Queue接口）、BlockingQueue接口***

***ConcurrentLinkedQueue类***  
通过CAS操作操作（UNSAFE）实现资源同步（无锁）；  
队列中无数据时出队、或者队列满了时入队，都会操作失败，但不会阻塞线程，而是返回null或false；想阻塞的话可使用BlockingQueue的实现。  
特点：HOPS(延迟更新的策略)的设计

***BlockingQueue接口及其实现***  
***BlockingQueue在入队出队失败后，应对方式比ConcurrentLinkedQueue灵活。***  
与ConcurrentLinkedQueue类一样，队列中无数据时出队、或者队列满了时入队，都会操作失败；  
但BlockingQueue为操作失败之后提供了多种应对方法：

|     | 抛异常        | 特定值      | 阻塞      | 超时                          |
|-----|------------|----------|---------|-----------------------------|
| 入队  | add(o)     | offer(o) | put(o)  | offer(o, timeout, timeunit) |
| 出队  | remove(o)  | poll(o)  | take(o) | poll(timeout, timeunit)     |
| 检查  | element(o) | peek(o)  |         |                             |

此外还有双端队列BlockingDeque（继承了BlockingQueue）

***BlockingQueue的实现***  

| 类名                    | 描述                            | 初始大小              | 是否自动扩容 | 最大大小                          |
|-----------------------|-------------------------------|-------------------|--------|-------------------------------|
| ArrayBlockingQueue    | 有界数组阻塞队列                      | 需在new对象时传入大小      | ×      | 初始大小                          |
| PriorityBlockingQueue | 有界优先级阻塞队列（元素需要继承Comparable接口） | 11                | √      | 2147483639(Integer.MAX_VALUE) |
| DelayQueue            | 无界延迟队列（元素需要继承Delayed接口）       | 11                | √      | Integer.MAX_VALUE - 8         |
| LinkedBlockingQueue   | 有界链阻塞队列                       | Integer.MAX_VALUE | ×      | 初始大小                          |
| SynchronousQueue      | 同步队列（内部同时只能够容纳单个元素）           | 0，不存储任何元素         |        |                               |



# JAVA事务
## ⭐1.事务的概念
事务（Transaction）：一般是指要做的或所做的事情。在计算机术语中是指访问并可能更新数据库中各种数据项的一个程序执行单元(unit)。

## ⭐2.事务四个属性（ACID）
1. atomicity 原子性  
   原子性：操作这些指令时，要么全部执行成功，要么全部不执行。只要其中一个指令执行失败，所有的指令都执行失败，数据进行回滚，回到执行指令前的数据状态。
2. consistency 一致性  
   一致性：事务的执行使数据从一个状态转换为另一个状态，但是对于整个数据的完整性保持稳定。
3. isolation 隔离性  
   隔离性：在该事务执行的过程中，无论发生的任何数据的改变都应该只存在于该事务之中，对外界不存在任何影响。只有在事务确定正确提交之后，才会显示该事务对数据的改变。其他事务才能获取到这些改变后的数据。
4. durability 持久性  
   持久性：当事务正确完成后，它对于数据的改变是永久性的。

## ⭐3.并发事务导致的问题
在许多事务处理同一个数据时，如果没有采取有效的隔离机制，那么并发处理数据时，会带来一些的问题。

1. 脏读(Dirty Read)  
   当一个事务读取另一个事务尚未提交的修改时，产生脏读。  
   同一事务内不是脏读。 一个事务开始读取了某行数据，但是另外一个事务已经更新了此数据但没有能够及时提交。这是相当危险的，因为很可能所有的操作都被回滚，也就是说读取出的数据其实是错误的。

2. 不可重复读(Nonrepeatable Read)  
   一个事务对同一行数据重复读取两次，但是却得到了不同的结果。同一查询在同一事务中多次进行，由于其他提交事务所做的修改或删除，每次返回不同的结果集，此时发生不可重复读。

3. 幻读(Phantom Reads)  
   事务在操作过程中进行两次查询，第二次查询的结果包含了第一次查询中未出现的数据（这里并不要求两次查询的SQL语句相同）。这是因为在两次查询过程中有另外一个事务插入数据造成的。
   当对某行执行插入或删除操作，而该行属于某个事务正在读取的行的范围时，会发生幻像读问题。

4. 丢失修改(Lost Update)  
   第一类：当两个事务更新相同的数据源，如果第一个事务被提交，第二个却被撤销，那么连同第一个事务做的更新也被撤销。  
   第二类：有两个并发事务同时读取同一行数据，然后其中一个对它进行修改提交，而另一个也进行了修改提交。这就会造成第一次写操作失效。

## ⭐4.事务隔离级别
为了兼顾并发效率和异常控制，在标准SQL规范中，定义了4个事务隔离级别.

1. 读未提交(Read Uncommitted)
   直译就是"读未提交"，意思就是即使一个更新语句没有提交，但是别的事务可以读到这个改变。  
   Read Uncommitted允许脏读。

2. 读已提交(Read Committed)
   直译就是"读提交"，意思就是语句提交以后，即执行了 Commit 以后别的事务就能读到这个改变，只能读取到已经提交的数据。Oracle等多数数据库默认都是该级别。  
   【原理】读已提交就是改变了释放锁的时机，让事务完成提交后再去释放锁。这样就解决了脏读问题。  
   Read Commited 不允许脏读，但会出现非重复读。


3. 可重复读(Repeatable Read)：  
   直译就是"可以重复读"，这是说在同一个事务里面先后执行同一个查询语句的时候，得到的结果是一样的。  
   【原理】MVCC（行级锁的升级版，略）  
   Repeatable Read 不允许脏读，不允许非重复读，但是会出现幻象读。

4. 串行读(Serializable)  
   直译就是"序列化"，意思是说这个事务执行的时候不允许别的事务并发执行。完全串行化的读，每次读都需要获得表级共享锁，读写相互都会阻塞。  
   Serializable 不允许不一致现象的出现。

通过不同的隔离级别，可以防止一些并发事务问题，同时级别越高则相应性能越低，这个设置需要根据实际场景进行设置。

常见商用数据库的默认隔离级别：
* MYSQL 可重复读（RR）
* ORACLE 读已提交（RC）
* SQL SERVER 读已提交（RC）

### 不同隔离级别会遇到的问题
（✔为没有解决，✖为可解决）
| 隔离级别| 脏读| 不可重复读|幻读|
|---|---|---|---|
|读未提交|✔|✔|✔|
|读已提交|✖|✔|✔|
|可重复读|✖|✖|✔|
|串行读|✖|✖|✖|

### Oracle、Sql Server 既然默认的隔离级别为“读已提交”，那么它们是怎么解决幻读和不可重复读的？
解决不可重复读：MVCC机制；  
解决幻读：MVCC机制+Next-key Lock锁；








