import{_ as s,o as n,c as a,e}from"./app-CYrzcX6G.js";const t={},l=e(`<h1 id="redis-api" tabindex="-1"><a class="header-anchor" href="#redis-api"><span>Redis API</span></a></h1><h2 id="【redis-client】命令" tabindex="-1"><a class="header-anchor" href="#【redis-client】命令"><span>【Redis Client】命令</span></a></h2><h3 id="键操作" tabindex="-1"><a class="header-anchor" href="#键操作"><span>键操作</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">##### 键操作</span>
DEL <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span>
EXISTS <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span>
<span class="token comment">#【设置过期时间（几秒后）】</span>
EXPIRES <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>seconds<span class="token operator">&gt;</span>
<span class="token comment">#【设置过期时间（时间点）】</span>
EXPIREAT <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>timestamp<span class="token operator">&gt;</span>
<span class="token comment">#【根据给定模式匹配key】</span>
Keys <span class="token operator">&lt;</span>pattern<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="键值对操作" tabindex="-1"><a class="header-anchor" href="#键值对操作"><span>键值对操作</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">##### 键值对操作</span>
SET <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator">&gt;</span> 
GET <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span>
<span class="token comment"># SET AND GET</span>
SET name dyz <span class="token comment">#单值缓存</span>
GET name <span class="token comment">#单值获取，返回dyz</span>
<span class="token comment"># MSET：批量插入</span>
MSET dyz_obj:1:name dyz dyz_obj:1:id <span class="token number">1</span> <span class="token comment">#json对象缓存 </span>
GET dyz_obj:1:name <span class="token comment">#获取对象属性，返回dyz</span>

<span class="token comment">#【批量添加】</span>
MSET <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>
<span class="token comment">#【批量获取】</span>
MGET <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span>
<span class="token comment">#【若key不存在，才存入该键值对】 </span>
SETNX <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator">&gt;</span> <span class="token comment">#常用于分布式锁</span>
<span class="token comment">#【返回Value的长度】</span>
STRLEN <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span>
<span class="token comment">#【追加字符串】</span>
APPEND <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>
<span class="token comment">#【返回子字符串】</span>
GETRANGE <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>start<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>end<span class="token operator">&gt;</span>
<span class="token comment">#【置新值，返回旧值】</span>
GETSET <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hash表操作" tabindex="-1"><a class="header-anchor" href="#hash表操作"><span>HASH表操作</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">##### HASH表操作</span>
HSET <span class="token operator">&lt;</span>hashname<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator">&gt;</span>
<span class="token comment">#【批量添加】</span>
HMSET <span class="token operator">&lt;</span>hashname<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span> <span class="token punctuation">..</span>. 
HGET <span class="token operator">&lt;</span>hashname<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span>
<span class="token comment">#【返回所有键值对】</span>
HGETALL <span class="token operator">&lt;</span>hashname<span class="token operator">&gt;</span>
<span class="token comment">#【返回所有键】</span>
HKEYS <span class="token operator">&lt;</span>hashname<span class="token operator">&gt;</span>
<span class="token comment">#【返回所有值】</span>
HVALS <span class="token operator">&lt;</span>hashname<span class="token operator">&gt;</span>
<span class="token comment">#【返回键值对的数量】</span>
HLEN <span class="token operator">&lt;</span>hashname<span class="token operator">&gt;</span>
<span class="token comment">#【移除某个键值对】</span>
HDEL <span class="token operator">&lt;</span>hashname<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="双向链表操作" tabindex="-1"><a class="header-anchor" href="#双向链表操作"><span>双向链表操作</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">##### 双向链表操作（栈、队列、有限集合、消息队列）</span>
<span class="token comment">#【将给定值推入到列表左端】</span>
LPUSH key value1 value2 <span class="token punctuation">..</span>.
<span class="token comment">#【从列表的左端弹出一个值，并返回被弹出的值】</span>
LPOP key
<span class="token comment">#【通过索引获取列表中的元素。你也可以使用负数下标】</span>
LINDEX key index
<span class="token comment">#【获取列表在给定范围上的所有值】</span>
LRANGE key startindex endindex
<span class="token comment">#【当列表没有值时，阻塞等待，直至有值可取时才继续执行】 </span>
BRPOP key
<span class="token comment">## 双向链表常见用法：</span>
<span class="token comment">#lrange mylist 0 -1 返回列表所有值</span>
<span class="token comment">#lpush+lpop=Stack(栈)</span>
<span class="token comment">#lpush+rpop=Queue（队列）</span>
<span class="token comment">#lpush+ltrim=Capped Collection（有限集合）</span>
<span class="token comment">#lpush+brpop=Message Queue（消息队列）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="集合操作" tabindex="-1"><a class="header-anchor" href="#集合操作"><span>集合操作</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">##### 集合操作</span>
<span class="token comment">#【往集合中添加成员】</span>
sadd <span class="token operator">&lt;</span>setname<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span>
<span class="token comment">#【返回集合中所有成员】</span>
smembers <span class="token operator">&lt;</span>setname<span class="token operator">&gt;</span>
<span class="token comment">#【获取集合size】</span>
SCARD key
<span class="token comment">#【判断 member 元素是否是集合 key 的成员】</span>
SISMEMBER key member
<span class="token comment">#【从集合中随机抽取n个成员】 </span>
SRANDMEMBER key n
<span class="token comment">#【从集合中随机抽取n个成员并删除】 </span>
SPOP key n
<span class="token comment">#【交集】</span>
SINTER set1 set2 set3
<span class="token comment">#【并集】</span>
SUNION set1 set2 set3
<span class="token comment">#【差集】</span>
SDIFF set1 set2 set3  <span class="token comment">#第一个集合的元素减去剩余集合的并集的元素</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="有序集合操作" tabindex="-1"><a class="header-anchor" href="#有序集合操作"><span>有序集合操作</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">##### 有序集合操作</span>
<span class="token comment">#【往集合添加成员，并标记该成员的分值】</span>
zadd <span class="token operator">&lt;</span>setname<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>score<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>score<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>key<span class="token operator">&gt;</span> <span class="token punctuation">..</span>.
<span class="token comment">#【获取集合在给定范围上的所有值】</span>
ZRANGE key startindex endindex
<span class="token comment">#【删除某个成员】</span>
ZREM zset-key member1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="bitmap操作" tabindex="-1"><a class="header-anchor" href="#bitmap操作"><span>bitmap操作</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">##### bitmap操作（2.2.0版本新增）</span>
<span class="token comment">#【将某个bitmap的第offset位设置位0或者1】</span>
setBit key <span class="token operator">&lt;</span>offset<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>value<span class="token operator">&gt;</span> <span class="token comment">#value=0或者1</span>
<span class="token comment">#【取某个bitmap的第offset位得值】</span>
getBit key <span class="token operator">&lt;</span>offset<span class="token operator">&gt;</span>
<span class="token comment">#【返回指定区间里，某个bitmap位为1的个数】</span>
bitCount key <span class="token punctuation">[</span>start<span class="token punctuation">]</span> <span class="token punctuation">[</span>end<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="【java】redistemplate" tabindex="-1"><a class="header-anchor" href="#【java】redistemplate"><span>【Java】RedisTemplate</span></a></h2>`,17),p=[l];function o(i,r){return n(),a("div",null,p)}const d=s(t,[["render",o],["__file","Redis_API.html.vue"]]),m=JSON.parse('{"path":"/database/redis/Redis_API.html","title":"Redis---API速查","lang":"en-US","frontmatter":{"title":"Redis---API速查","sidebarDepth":2},"headers":[{"level":2,"title":"【Redis Client】命令","slug":"【redis-client】命令","link":"#【redis-client】命令","children":[{"level":3,"title":"键操作","slug":"键操作","link":"#键操作","children":[]},{"level":3,"title":"键值对操作","slug":"键值对操作","link":"#键值对操作","children":[]},{"level":3,"title":"HASH表操作","slug":"hash表操作","link":"#hash表操作","children":[]},{"level":3,"title":"双向链表操作","slug":"双向链表操作","link":"#双向链表操作","children":[]},{"level":3,"title":"集合操作","slug":"集合操作","link":"#集合操作","children":[]},{"level":3,"title":"有序集合操作","slug":"有序集合操作","link":"#有序集合操作","children":[]},{"level":3,"title":"bitmap操作","slug":"bitmap操作","link":"#bitmap操作","children":[]}]},{"level":2,"title":"【Java】RedisTemplate","slug":"【java】redistemplate","link":"#【java】redistemplate","children":[]}],"git":{"updatedTime":1710772920000,"contributors":[{"name":"Fun_zil","email":"854257920@qq.com","commits":1}]},"filePathRelative":"database/redis/Redis_API.md"}');export{d as comp,m as data};
