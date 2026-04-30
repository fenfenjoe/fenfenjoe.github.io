import{_ as n,c as a,a as e,o as l}from"./app-D7QRhIYN.js";const p={};function i(t,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="redis-api" tabindex="-1"><a class="header-anchor" href="#redis-api"><span>Redis API</span></a></h1><h2 id="【redis-client】命令" tabindex="-1"><a class="header-anchor" href="#【redis-client】命令"><span>【Redis Client】命令</span></a></h2><h3 id="键操作" tabindex="-1"><a class="header-anchor" href="#键操作"><span>键操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">##### 键操作</span></span>
<span class="line"><span class="token comment"># 【删除键】（1为删除成功，0为删除失败）</span></span>
<span class="line">DEL <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span></span>
<span class="line">EXISTS <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【设置过期时间（几秒后）】</span></span>
<span class="line">EXPIRES <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>seconds<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【设置过期时间（时间点）】</span></span>
<span class="line">EXPIREAT <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>timestamp<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【根据给定模式匹配key】（会扫描整个键空间，生产环境禁用！可用SCAN代替）</span></span>
<span class="line">KEYS <span class="token operator">&lt;</span>pattern<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【返回key的过期时间】（-2为键不存在；-1为永不过期；&gt;0为剩余秒数</span></span>
<span class="line">TTL <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># SCAN的用法</span></span>
<span class="line">SCAN cursor <span class="token punctuation">[</span>MATCH pattern<span class="token punctuation">]</span> <span class="token punctuation">[</span>COUNT count<span class="token punctuation">]</span> <span class="token punctuation">[</span>TYPE type<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取所有键（默认查10条，0表示游标，第一次传0）</span></span>
<span class="line">SCAN <span class="token number">0</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 返回示例：</span></span>
<span class="line"><span class="token comment">#1) &quot;38&quot;   -- 38 表示下一页的游标</span></span>
<span class="line"><span class="token comment">#2) 1) &quot;key1&quot;</span></span>
<span class="line"><span class="token comment">#   2) &quot;key2&quot;</span></span>
<span class="line"><span class="token comment">#   3) &quot;user:100&quot;</span></span>
<span class="line"></span>
<span class="line">SCAN <span class="token number">38</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#1) &quot;0&quot; -- 返回0则表示键已遍历完毕</span></span>
<span class="line"><span class="token comment">#2) 1) &quot;key3&quot;</span></span>
<span class="line"><span class="token comment">#   2) &quot;session:abc&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用正则表达式匹配键</span></span>
<span class="line">SCAN <span class="token number">0</span> MATCH user:*</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用COUNT表明每次查询数量</span></span>
<span class="line">SCAN <span class="token number">0</span> MATCH user:* COUNT <span class="token number">100</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="键值对操作" tabindex="-1"><a class="header-anchor" href="#键值对操作"><span>键值对操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">##### 键值对操作</span></span>
<span class="line">SET <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator">&gt;</span> </span>
<span class="line">GET <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment"># SET AND GET</span></span>
<span class="line">SET name dyz <span class="token comment">#单值缓存</span></span>
<span class="line">GET name <span class="token comment">#单值获取，返回dyz</span></span>
<span class="line"><span class="token comment"># MSET：批量插入</span></span>
<span class="line">MSET dyz_obj:1:name dyz dyz_obj:1:id <span class="token number">1</span> <span class="token comment">#json对象缓存 </span></span>
<span class="line">GET dyz_obj:1:name <span class="token comment">#获取对象属性，返回dyz</span></span>
<span class="line"><span class="token comment"># SETEX：设置过期时间的同时设置值</span></span>
<span class="line">SETEX <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>seconds<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment"># SETNX：【若key不存在，才存入该键值对】 </span></span>
<span class="line">SETNX <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator">&gt;</span> <span class="token comment">#常用于分布式锁</span></span>
<span class="line"><span class="token comment"># GETSET：【置新值，返回旧值】</span></span>
<span class="line">GETSET <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#【批量添加】</span></span>
<span class="line">MSET <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【批量获取】</span></span>
<span class="line">MGET <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#【返回Value的长度】</span></span>
<span class="line">STRLEN <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【追加字符串】</span></span>
<span class="line">APPEND <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【返回子字符串】</span></span>
<span class="line">GETRANGE <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>start<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>end<span class="token operator">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hash表操作" tabindex="-1"><a class="header-anchor" href="#hash表操作"><span>HASH表操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">##### HASH表操作</span></span>
<span class="line">HSET <span class="token operator">&lt;</span>hashname<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【批量添加】</span></span>
<span class="line">HMSET <span class="token operator">&lt;</span>hashname<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span> <span class="token punctuation">..</span>. </span>
<span class="line">HGET <span class="token operator">&lt;</span>hashname<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【返回所有键值对】</span></span>
<span class="line">HGETALL <span class="token operator">&lt;</span>hashname<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【返回所有键】</span></span>
<span class="line">HKEYS <span class="token operator">&lt;</span>hashname<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【返回所有值】</span></span>
<span class="line">HVALS <span class="token operator">&lt;</span>hashname<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【返回键值对的数量】</span></span>
<span class="line">HLEN <span class="token operator">&lt;</span>hashname<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【移除某个键值对】</span></span>
<span class="line">HDEL <span class="token operator">&lt;</span>hashname<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="双向链表操作" tabindex="-1"><a class="header-anchor" href="#双向链表操作"><span>双向链表操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">##### 双向链表操作（栈、队列、有限集合、消息队列）</span></span>
<span class="line"><span class="token comment">#【将给定值推入到列表左端】</span></span>
<span class="line">LPUSH key value1 value2 <span class="token punctuation">..</span>.</span>
<span class="line"><span class="token comment">#【从列表的左端弹出一个值，并返回被弹出的值】</span></span>
<span class="line">LPOP key</span>
<span class="line"><span class="token comment">#【通过索引获取列表中的元素。你也可以使用负数下标】</span></span>
<span class="line">LINDEX key index</span>
<span class="line"><span class="token comment">#【只保留N个元素】</span></span>
<span class="line">LTRIM key N</span>
<span class="line"><span class="token comment">#【获取列表在给定范围上的所有值】</span></span>
<span class="line">LRANGE key startindex endindex</span>
<span class="line"><span class="token comment">#【当列表没有值时，阻塞等待，直至有值可取时才继续执行】 </span></span>
<span class="line">BRPOP key</span>
<span class="line"><span class="token comment">#【当列表没有值时，阻塞等待数秒，直至有值可取或超时才继续执行】 </span></span>
<span class="line">BRPOP key seconds</span>
<span class="line"><span class="token comment">## 双向链表常见用法：</span></span>
<span class="line"><span class="token comment">#lrange mylist 0 -1 返回列表所有值</span></span>
<span class="line"><span class="token comment">#lpush+lpop=Stack(栈)</span></span>
<span class="line"><span class="token comment">#lpush+rpop=Queue（队列）</span></span>
<span class="line"><span class="token comment">#lpush+ltrim=Capped Collection（有限集合）</span></span>
<span class="line"><span class="token comment">#lpush+brpop=Message Queue（消息队列）</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="集合操作" tabindex="-1"><a class="header-anchor" href="#集合操作"><span>集合操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">##### 集合操作</span></span>
<span class="line"><span class="token comment">#【往集合中添加成员】</span></span>
<span class="line">sadd <span class="token operator">&lt;</span>setname<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【返回集合中所有成员】</span></span>
<span class="line">smembers <span class="token operator">&lt;</span>setname<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【获取集合size】</span></span>
<span class="line">SCARD key</span>
<span class="line"><span class="token comment">#【判断 member 元素是否是集合 key 的成员】</span></span>
<span class="line">SISMEMBER key member</span>
<span class="line"><span class="token comment">#【从集合中随机抽取n个成员】 </span></span>
<span class="line">SRANDMEMBER key n</span>
<span class="line"><span class="token comment">#【从集合中随机抽取n个成员并删除】 </span></span>
<span class="line">SPOP key n</span>
<span class="line"><span class="token comment">#【交集】</span></span>
<span class="line">SINTER set1 set2 set3</span>
<span class="line"><span class="token comment">#【并集】</span></span>
<span class="line">SUNION set1 set2 set3</span>
<span class="line"><span class="token comment">#【差集】</span></span>
<span class="line">SDIFF set1 set2 set3  <span class="token comment">#第一个集合的元素减去剩余集合的并集的元素</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="有序集合操作" tabindex="-1"><a class="header-anchor" href="#有序集合操作"><span>有序集合操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">##### 有序集合操作</span></span>
<span class="line"><span class="token comment">#【往集合添加成员，并标记该成员的分值】</span></span>
<span class="line">zadd <span class="token operator">&lt;</span>setname<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>score<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>score<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token punctuation">..</span>.</span>
<span class="line"><span class="token comment">#【获取集合在给定范围上的所有值】</span></span>
<span class="line">ZRANGE key startindex endindex</span>
<span class="line"><span class="token comment">#【删除某个成员】</span></span>
<span class="line">ZREM zset-key member1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="bitmap操作" tabindex="-1"><a class="header-anchor" href="#bitmap操作"><span>bitmap操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">##### bitmap操作（2.2.0版本新增）</span></span>
<span class="line"><span class="token comment">#【将某个bitmap的第offset位设置位0或者1】</span></span>
<span class="line">setBit key <span class="token operator">&lt;</span>offset<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator">&gt;</span> <span class="token comment">#value=0或者1</span></span>
<span class="line"><span class="token comment">#【取某个bitmap的第offset位得值】</span></span>
<span class="line">getBit key <span class="token operator">&lt;</span>offset<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【返回指定区间里，某个bitmap位为1的个数】</span></span>
<span class="line">bitCount key <span class="token punctuation">[</span>start<span class="token punctuation">]</span> <span class="token punctuation">[</span>end<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stream操作" tabindex="-1"><a class="header-anchor" href="#stream操作"><span>Stream操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1.发送消息到队列mystream（若之前没有该队列，会自动创建）</span></span>
<span class="line">XADD mystream * senior-id <span class="token number">1001</span> temperature <span class="token number">36.5</span></span>
<span class="line"><span class="token string">&quot;1734567890123-0&quot;</span></span>
<span class="line"><span class="token comment"># * 表示由Redis创建消息ID，“1734567890123-0”就是成功后生成的ID</span></span>
<span class="line"><span class="token comment"># 消息携带着2个字段：senior-id、temperature</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2.获取队列长度</span></span>
<span class="line">XLEN mystream</span>
<span class="line"><span class="token number">1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3.独立消费</span></span>
<span class="line">XREAD COUNT <span class="token number">1</span> STREAMS mystream <span class="token number">0</span>   <span class="token comment"># 需要指定从哪个ID开始读取（ID=0）</span></span>
<span class="line">XREAD BLOCK <span class="token number">0</span> STREAMS mystream $   <span class="token comment"># 阻塞等待新消息</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3.按消费者组消费</span></span>
<span class="line">XGROUP CREATE mystream mygroup <span class="token number">0</span> MKSTREAM   <span class="token comment"># 创建消费者组mystream（MKSTREAM 可同时创建流）</span></span>
<span class="line">XREADGROUP GROUP mygroup consumer1 COUNT <span class="token number">1</span> STREAMS mystream <span class="token operator">&gt;</span> <span class="token comment"># 按消费者组消费1条消息，&gt; 表示读取尚未分发的消息</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4.消费完毕确认（**只有按消费者组消费时需要。**若不确认，则消息的状态=待处理）</span></span>
<span class="line">XACK mystream mygroup <span class="token number">1734567890123</span>-0</span>
<span class="line"><span class="token number">1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5.查看待处理消息</span></span>
<span class="line">XPENDING mystream mygroup</span>
<span class="line"><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>    <span class="token comment"># 待处理消息数量</span></span>
<span class="line"><span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>nil<span class="token punctuation">)</span>          <span class="token comment"># 最小 ID</span></span>
<span class="line"><span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>nil<span class="token punctuation">)</span>          <span class="token comment"># 最大 ID</span></span>
<span class="line"><span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>nil<span class="token punctuation">)</span>          <span class="token comment"># 各消费者情况</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6.认领状态为“待处理”，空闲时间超过60s，id为1734567890123-0的消息</span></span>
<span class="line">XCLAIM mystream mygroup consumer3 <span class="token number">60000</span> <span class="token number">1734567890123</span>-0</span>
<span class="line"><span class="token number">1</span><span class="token punctuation">)</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;1734567890123-0&quot;</span></span>
<span class="line">   <span class="token number">2</span><span class="token punctuation">)</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;sensor-id&quot;</span></span>
<span class="line">      <span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;1001&quot;</span></span>
<span class="line">      <span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;temperature&quot;</span></span>
<span class="line">      <span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">&quot;23.5&quot;</span></span>
<span class="line">      </span>
<span class="line"><span class="token comment"># 7.只保留最新的1w条消息</span></span>
<span class="line">XTRIM mystream MAXLEN ~ <span class="token number">10000</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="事务相关操作" tabindex="-1"><a class="header-anchor" href="#事务相关操作"><span>事务相关操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#开启事务</span></span>
<span class="line">MULTI </span>
<span class="line"><span class="token comment">#输入一组命令</span></span>
<span class="line">SET user:1001:name <span class="token string">&quot;Alice&quot;</span></span>
<span class="line">SET user:1001:age <span class="token string">&quot;30&quot;</span></span>
<span class="line">INCR user:1001:age</span>
<span class="line"><span class="token comment">#执行事务中的命令</span></span>
<span class="line">EXEC</span>
<span class="line"><span class="token comment">#放弃事务中的命令</span></span>
<span class="line">DISCARD</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="【java】redistemplate" tabindex="-1"><a class="header-anchor" href="#【java】redistemplate"><span>【Java】RedisTemplate</span></a></h2>`,22)]))}const o=n(p,[["render",i]]),r=JSON.parse('{"path":"/database/redis/Redis_API.html","title":"Redis---API速查","lang":"en-US","frontmatter":{"title":"Redis---API速查","sidebarDepth":2},"git":{"updatedTime":1774951433000,"contributors":[{"name":"dongyz8","username":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":6,"url":"https://github.com/dongyz8"}],"changelog":[{"hash":"9bd5d8a5eb8d70eee7aa5ac7d582d75c0f36e6aa","time":1774951433000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"2c24184a3fbec20a15b68c910a65ff3cc1cf36bd","time":1774607116000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"e48c004e96800ad5847a42db01348565021df6fe","time":1768976703000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"c134bd6d46aca8a064a19bb65704fbff919268a4","time":1690885984000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"ad612453d550772a14baa7197b6319d0c506f6a8","time":1689935603000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"70b37d4f176375118b0ae99f54befb1f90908112","time":1689762909000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"}]},"filePathRelative":"database/redis/Redis_API.md"}');export{o as comp,r as data};
