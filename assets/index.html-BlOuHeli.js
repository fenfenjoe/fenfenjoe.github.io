import{_ as s,c as a,e as t,o as e}from"./app-BNNcboHM.js";const p={};function i(o,n){return e(),a("div",null,n[0]||(n[0]=[t(`<h1 id="mongodb" tabindex="-1"><a class="header-anchor" href="#mongodb"><span>MongoDB</span></a></h1><h3 id="为什么使用mongodb" tabindex="-1"><a class="header-anchor" href="#为什么使用mongodb"><span>为什么使用mongodb</span></a></h3><ol><li>在“三高”问题上，mongodb相对传统关系型数据库有更好的表现：</li></ol><ul><li>高并发</li><li>海量数据</li><li>高可扩展性&amp;高可用性</li></ul><ol start="2"><li>当你的数据：</li></ol><ul><li>是低价值数据（比如是日志数据）</li><li>没有复杂的业务需求（mongo不支持事务）</li></ul><ol start="3"><li>当你属于以下应用场景：</li></ol><ul><li>大数据分析</li><li>移动应用开发（mongo支持地理位置的存储和处理）</li><li>实时数据处理</li><li>云计算<br> mongodb是一个很好的选择</li></ul><h3 id="语法" tabindex="-1"><a class="header-anchor" href="#语法"><span>语法</span></a></h3><h4 id="查询" tabindex="-1"><a class="header-anchor" href="#查询"><span>查询</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#查询userInfo表的所有数据</span>
db.userInfo.find<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#查询userInfo表的所有数据，并根据name字段去重</span>
db.userInfo.distinct<span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#查询age=22的记录</span>
db.userInfo.find<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;age&quot;</span><span class="token builtin class-name">:</span> <span class="token number">22</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#查出name=zhangsan and age=22的记录</span>
db.userInfo.find<span class="token punctuation">(</span><span class="token punctuation">{</span>name: <span class="token string">&#39;zhangsan&#39;</span>, age: <span class="token number">22</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#查出age=22 or age = 25的记录</span>
db.userInfo.find<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token variable">$or</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>age: <span class="token number">22</span><span class="token punctuation">}</span>, <span class="token punctuation">{</span>age: <span class="token number">25</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#查出age in(22,25)的记录</span>
db.userInfo.find<span class="token punctuation">(</span><span class="token punctuation">{</span>age :<span class="token punctuation">{</span><span class="token variable">$in</span>:<span class="token punctuation">[</span><span class="token number">22,25</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#返回记录数</span>
db.userInfo.find<span class="token punctuation">(</span><span class="token punctuation">)</span>.count<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#查询23&lt;=age&lt;=25的记录</span>
db.userInfo.find<span class="token punctuation">(</span><span class="token punctuation">{</span>age: <span class="token punctuation">{</span><span class="token variable">$gte</span><span class="token builtin class-name">:</span> <span class="token number">23</span>, <span class="token variable">$lte</span><span class="token builtin class-name">:</span> <span class="token number">25</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#查询age!=25的记录</span>
db.userInfo.find<span class="token punctuation">(</span><span class="token punctuation">{</span>age: <span class="token punctuation">{</span><span class="token variable">$ne</span><span class="token builtin class-name">:</span> <span class="token number">25</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#模糊查询（等于where name like %mongo%）</span>
db.userInfo.find<span class="token punctuation">(</span><span class="token punctuation">{</span>name: /mongo/<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#只查出name字段和age字段（1：查询；0不查询）</span>
db.userInfo.find<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span>, <span class="token punctuation">{</span>name: <span class="token number">1</span>, age: <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#按照age升序查出（1：升序；-1：降序）</span>
db.userInfo.find<span class="token punctuation">(</span><span class="token punctuation">)</span>.sort<span class="token punctuation">(</span><span class="token punctuation">{</span>age: <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#查出前5条数据</span>
db.userInfo.find<span class="token punctuation">(</span><span class="token punctuation">)</span>.limit<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">#查出10条之后的数据</span>
db.userInfo.find<span class="token punctuation">(</span><span class="token punctuation">)</span>.skip<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11)]))}const c=s(p,[["render",i],["__file","index.html.vue"]]),u=JSON.parse('{"path":"/database/mongoDB/","title":"mongoDB","lang":"en-US","frontmatter":{"title":"mongoDB"},"headers":[{"level":3,"title":"为什么使用mongodb","slug":"为什么使用mongodb","link":"#为什么使用mongodb","children":[]},{"level":3,"title":"语法","slug":"语法","link":"#语法","children":[]}],"git":{"updatedTime":1735622789000,"contributors":[{"name":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":1}]},"filePathRelative":"database/mongoDB/README.md"}');export{c as comp,u as data};