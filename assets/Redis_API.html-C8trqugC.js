import{_ as n,c as a,a as e,o as l}from"./app-neTUUq9d.js";const p={};function t(i,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="redis-api" tabindex="-1"><a class="header-anchor" href="#redis-api"><span>Redis API</span></a></h1><h2 id="【redis-client】命令" tabindex="-1"><a class="header-anchor" href="#【redis-client】命令"><span>【Redis Client】命令</span></a></h2><h3 id="键操作" tabindex="-1"><a class="header-anchor" href="#键操作"><span>键操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">##### 键操作</span></span>
<span class="line">DEL <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span></span>
<span class="line">EXISTS <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【设置过期时间（几秒后）】</span></span>
<span class="line">EXPIRES <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>seconds<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【设置过期时间（时间点）】</span></span>
<span class="line">EXPIREAT <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>timestamp<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【根据给定模式匹配key】</span></span>
<span class="line">KEYS <span class="token operator">&lt;</span>pattern<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment">#【返回key的过期时间】</span></span>
<span class="line">TTL <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="键值对操作" tabindex="-1"><a class="header-anchor" href="#键值对操作"><span>键值对操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">##### 键值对操作</span></span>
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
<span class="line"><span class="token comment">#【获取列表在给定范围上的所有值】</span></span>
<span class="line">LRANGE key startindex endindex</span>
<span class="line"><span class="token comment">#【当列表没有值时，阻塞等待，直至有值可取时才继续执行】 </span></span>
<span class="line">BRPOP key</span>
<span class="line"><span class="token comment">## 双向链表常见用法：</span></span>
<span class="line"><span class="token comment">#lrange mylist 0 -1 返回列表所有值</span></span>
<span class="line"><span class="token comment">#lpush+lpop=Stack(栈)</span></span>
<span class="line"><span class="token comment">#lpush+rpop=Queue（队列）</span></span>
<span class="line"><span class="token comment">#lpush+ltrim=Capped Collection（有限集合）</span></span>
<span class="line"><span class="token comment">#lpush+brpop=Message Queue（消息队列）</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="集合操作" tabindex="-1"><a class="header-anchor" href="#集合操作"><span>集合操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">##### 集合操作</span></span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="【java】redistemplate" tabindex="-1"><a class="header-anchor" href="#【java】redistemplate"><span>【Java】RedisTemplate</span></a></h2>`,17)]))}const c=n(p,[["render",t]]),r=JSON.parse('{"path":"/database/redis/Redis_API.html","title":"Redis---API速查","lang":"en-US","frontmatter":{"title":"Redis---API速查","sidebarDepth":2},"git":{"updatedTime":1768976703000,"contributors":[{"name":"dongyz8","username":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":4,"url":"https://github.com/dongyz8"}],"changelog":[{"hash":"e48c004e96800ad5847a42db01348565021df6fe","time":1768976703000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"c134bd6d46aca8a064a19bb65704fbff919268a4","time":1690885984000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"ad612453d550772a14baa7197b6319d0c506f6a8","time":1689935603000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"70b37d4f176375118b0ae99f54befb1f90908112","time":1689762909000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"}]},"filePathRelative":"database/redis/Redis_API.md"}');export{c as comp,r as data};
