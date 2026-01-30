import{_ as n,c as a,a as e,o as i}from"./app-neTUUq9d.js";const t={};function l(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="原理" tabindex="-1"><a class="header-anchor" href="#原理"><span>原理</span></a></h1><h2 id="索引原理" tabindex="-1"><a class="header-anchor" href="#索引原理"><span>索引原理</span></a></h2><p><strong>docid</strong></p><p>ES数据库里的每条记录，都会分配到一个ID，称为doc id。</p><table><thead><tr><th>docid</th><th>name</th><th>age</th></tr></thead><tbody><tr><td>1</td><td>Johnny Depp</td><td>25</td></tr><tr><td>2</td><td>Aby Homie</td><td>18</td></tr><tr><td>3</td><td>Johnny Wei</td><td>25</td></tr></tbody></table><p><strong>倒排索引（Posting）</strong></p><p>ES会为表中的每个字段都维护一个倒排索引。 倒排索引有两个主要字段，一个负责将表中该字段的每一行分成单词存储起来，一个则负责存储这些单词对应的docid（出现多次则以数组保存）。 查询时，通过分词去匹配索引，匹配到之后，根据后面的ID去查找记录。</p><p>name字段的倒排索引：</p><table><thead><tr><th>Term</th><th>Posting</th></tr></thead><tbody><tr><td>Johnny</td><td>[1,3]</td></tr><tr><td>Depp</td><td>1</td></tr><tr><td>Aby</td><td>2</td></tr><tr><td>Homie</td><td>2</td></tr><tr><td>Wei</td><td>3</td></tr></tbody></table><p>age字段的倒排索引：</p><table><thead><tr><th>Term</th><th>Posting</th></tr></thead><tbody><tr><td>25</td><td>[1,3]</td></tr><tr><td>18</td><td>2</td></tr></tbody></table><blockquote><p>倒排索引提供了模糊搜索的一种解决方案，但是当分词的数量很多（比如千万级），那么检索分词会很慢。 因此，ES又引出了分词词典这个概念。</p></blockquote><p><strong>分词词典（Term Dictionary）</strong></p><p>分词词典，是对分词进行排序后，使其可以通过二分查找达到log(n)级的查询效率。 对倒排索引（posting）排序后获得的就是Term Dictionary。</p><p>name字段的分词词典：</p><table><thead><tr><th>Term</th><th>Posting</th></tr></thead><tbody><tr><td>Aby</td><td>2</td></tr><tr><td>Depp</td><td>1</td></tr><tr><td>Homie</td><td>2</td></tr><tr><td>Johnny</td><td>[1,3]</td></tr><tr><td>Wei</td><td>3</td></tr></tbody></table><p>age字段的分词词典：</p><table><thead><tr><th>Term</th><th>Posting</th></tr></thead><tbody><tr><td>18</td><td>2</td></tr><tr><td>25</td><td>[1,3]</td></tr></tbody></table><blockquote><p>分词词典解决了查询效率问题，但是若数据量太大，则无法将全部数据都加载到内存。 为了解决这个问题，分词索引出现了。</p></blockquote><p><strong>分词索引（Term Index）</strong></p><p>通过分词中的前缀，为分词词典再维护一个B-树索引。 通过分词索引可快速定位到Term Dictionary里的某个offset，再沿着这个offset往下查询。</p><p>name字段的分词索引：</p><table><thead><tr><th>Index</th><th>Posting</th></tr></thead><tbody><tr><td>A</td><td>1</td></tr><tr><td>Ab</td><td>1</td></tr><tr><td>Aby</td><td>1</td></tr><tr><td>D</td><td>2</td></tr><tr><td>H</td><td>3</td></tr><tr><td>J</td><td>4</td></tr><tr><td>W</td><td>5</td></tr><tr><td>...</td><td></td></tr></tbody></table><blockquote><p>若分词索引数据量也很大，内存无法加载完，此时可以通过FST方法，压缩分词索引，提高存储效率。</p></blockquote><p><strong>FST</strong> 压缩算法，提高存储效率</p><h2 id="分词器" tabindex="-1"><a class="header-anchor" href="#分词器"><span>分词器</span></a></h2><p><strong>什么是分词器？</strong></p><p>ES将一段文本分成多个单词的工具。</p><p><strong>在哪个步骤会用到分词器？</strong></p><ol><li>保存数据时</li></ol><p>ES在将一条数据保存到表之后，为了生成倒排索引，还需要通过分词器，将这条数据的每一个字段，分成多个单词，保存到不同字段对应的倒排索引中。 生成倒排索引的原理，可见本文中的“倒排索引”介绍。</p><ol start="2"><li>查询数据时（全文检索）</li></ol><p>以下是一段全文检索请求（使用match），意思就是查表index1中，字段title匹配&quot;BROWN DOG!&quot;这个查询条件的数据：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">GET /index1/_search</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span></span>
<span class="line">    <span class="token string">&quot;match&quot;</span>:<span class="token punctuation">{</span></span>
<span class="line">      <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;BROWN DOG!&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>全文检索时，ES会先使用分词器，将查询条件分成多个词（[brown,dog]），只要字段中有其中一个词，便会命中。 比如会命中以下数据：</p><ul><li>title = i like brown,i don&#39;t like dog.</li><li>title = there is a brown tree.</li><li>title = a white dog.</li></ul><p>如果我们想查两个词都有的数据，可以像下面这样请求：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">GET /index1/_search</span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span></span>
<span class="line">    <span class="token string">&quot;match&quot;</span>:<span class="token punctuation">{</span></span>
<span class="line">      <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;BROWN DOG!&quot;</span></span>
<span class="line">      <span class="token string">&quot;operator&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;and&quot;</span> //默认情况下是or</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>有哪些分词器？</strong></p><p>ES自带以下分词器：</p><ul><li>Standard：默认分词器，支持多语言，不分大小写。</li><li>Simple：非字母作为分隔符（即不会将数字分成一个单词）</li><li>Whitespace：空格、制表符、换行作为分隔符</li><li>Keyword：不分词</li><li>Pattern：正则表达式</li></ul><p>分词示例：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//【1.】假设使用不同分词器对以下句子进行分词。</span>
<span class="line">“text”: “The 2 QUICK Brown-Foxes jumped over the lazy dog’s bone.”</span>
<span class="line"></span>
<span class="line">//默认的分词器下，以空格、标点符号作为分隔符，并将单词小写处理</span>
<span class="line">Standard：[&#39;the&#39;,&#39;2&#39;,&#39;quick&#39;,&#39;brown&#39;,&#39;foxes&#39;,&#39;jumped&#39;,&#39;over&#39;,&#39;the&#39;,&#39;lazy&#39;,&#39;dog&#39;s&#39;,&#39;bone&#39;]</span>
<span class="line"></span>
<span class="line">//Simple分词器下，除了空格、标点符号，数字也会作为分隔符，同样也会将单词小写处理</span>
<span class="line">Simple：[&#39;the&#39;,&#39;quick&#39;,&#39;brown&#39;,&#39;foxes&#39;,&#39;jumped&#39;,&#39;over&#39;,&#39;the&#39;,&#39;lazy&#39;,&#39;dog&#39;,&#39;s&#39;,&#39;bone&#39;]</span>
<span class="line"></span>
<span class="line">//Whitespace分词器下，以空格、制表符、换行作为分隔符，但不会将单词小写处理</span>
<span class="line">Whitespace：[&#39;The&#39;,&#39;2&#39;,&#39;QUICK&#39;,&#39;Brown-Foxes&#39;,&#39;jumped&#39;,&#39;over&#39;,&#39;the&#39;,&#39;lazy&#39;,&#39;dog&#39;s&#39;,&#39;bone&#39;]</span>
<span class="line"></span>
<span class="line">//【2.】对中文进行分词。</span>
<span class="line">“text”: “我想买3台空调”</span>
<span class="line"></span>
<span class="line">//若用上面的分词器，基本上都会分成[&#39;我&#39;,&#39;想&#39;,&#39;买&#39;,&#39;3&#39;,&#39;台&#39;,&#39;空&#39;,&#39;调&#39;]</span>
<span class="line">//此时，若搜索&#39;空调&#39;，是搜不出来这条数据的。因为从上面可以看出，没有分出&#39;空调&#39;这个分词</span>
<span class="line">//由此可见，自带的分词对中文搜索不是很友好。此时我们可以使用IK分词器。</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他分词器实现：</p><ul><li>IK：更高效的中文分词器</li></ul><p>IK分词器有两种模式：ik_max_word和ik_smart模式。</p><p>假设对“我是乒乓球冠军”进行分词。</p><p><strong>ik_max_word</strong>：最细粒度分词，会分成：[我，是，乒乓，乒乓球，球，冠军]</p><p><strong>ik_smart</strong>：最粗粒度分词，会分成：[我，是，乒乓球，冠军]</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#测试分词（analyzer：standard、simple、whitespace、keyword、pattern...）</span>
<span class="line">curl -X POST &#39;localhost:9200/city/_analyze&#39;</span>
<span class="line"></span>
<span class="line">{</span>
<span class="line">  &quot;analyzer&quot;:&quot;standard&quot;,</span>
<span class="line">  &quot;text&quot;:&quot;你是&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">#返回结果</span>
<span class="line">{</span>
<span class="line">  &quot;tokens&quot;:[</span>
<span class="line">  {</span>
<span class="line">   &quot;token&quot;:&quot;你&quot;,</span>
<span class="line">   &quot;start_offset&quot;:0,</span>
<span class="line">   &quot;end_offset&quot;:1,</span>
<span class="line">   &quot;type&quot;:&quot;&lt;IDEOGRAPHIC&gt;&quot;</span>
<span class="line">   &quot;position&quot;:0</span>
<span class="line">  },</span>
<span class="line">  {</span>
<span class="line">   &quot;token&quot;:&quot;是&quot;,</span>
<span class="line">   &quot;start_offset&quot;:2,</span>
<span class="line">   &quot;end_offset&quot;:3,</span>
<span class="line">   &quot;type&quot;:&quot;&lt;IDEOGRAPHIC&gt;&quot;</span>
<span class="line">   &quot;position&quot;:1</span>
<span class="line">  }</span>
<span class="line">  ]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">#创建索引时，为某个字段指定分词（查询时会自动走分词）</span>
<span class="line">curl -X PUT &#39;localhost:9200/test&#39;</span>
<span class="line">{</span>
<span class="line">  &quot;mapping&quot;:{</span>
<span class="line">    &quot;properties&quot;:{</span>
<span class="line">      &quot;name&quot;:{   #创建一个name字段</span>
<span class="line">        &quot;type&quot;:&quot;text&quot;, #定义其类型为text</span>
<span class="line">        &quot;analyzer&quot;:&quot;ik_max_word&quot; #分词器使用ik_max_word</span>
<span class="line">      },</span>
<span class="line">      &quot;englishname&quot;:{   #创建一个englishname字段</span>
<span class="line">        &quot;type&quot;:&quot;text&quot;, #定义其类型为text</span>
<span class="line">        &quot;analyzer&quot;:&quot;standard&quot; #分词器使用standard</span>
<span class="line">      },</span>
<span class="line">      &quot;sex&quot;:{   #创建一个sex字段</span>
<span class="line">        &quot;type&quot;:&quot;keyword&quot;, #定义其类型为keyword，无需分词</span>
<span class="line">      },</span>
<span class="line">      &quot;age&quot;:{   #创建一个age字段</span>
<span class="line">        &quot;type&quot;:&quot;long&quot;, #定义其类型为long，无需分词</span>
<span class="line">      }</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="存储原理" tabindex="-1"><a class="header-anchor" href="#存储原理"><span>存储原理</span></a></h2><p>跟Kafka、RocketMQ等MQ中间件相似，也有 <strong>分片(Shard)</strong> 和 <strong>副本(Replica)</strong> 的概念。</p><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// 创建索引时便可指定分片数、副本数</span></span>
<span class="line">PUT /my_index</span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;number_of_shards&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>      <span class="token comment">// 主分片数量</span></span>
<span class="line">    <span class="token property">&quot;number_of_replicas&quot;</span><span class="token operator">:</span> <span class="token number">1</span>     <span class="token comment">// 每个主分片的副本数</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>分片</strong>：每个分片保存该索引的一部分数据</li><li><strong>副本</strong>：等于是分片的备份</li></ul><h3 id="如何确定文档保存到哪一个分片" tabindex="-1"><a class="header-anchor" href="#如何确定文档保存到哪一个分片"><span>如何确定文档保存到哪一个分片？</span></a></h3><p>Elasticsearch用于计算分片位置的核心公式如下：</p><p><code>shard_num = hash(routing) % number_of_primary_shards</code></p><ul><li><strong>routing值</strong>：是一个可变字符串，默认是文档的 <code>_id</code>。你也可以在索引文档时提供自定义的<code>routing</code> 参数。</li><li><strong>hash</strong>：哈希函数，将字符串转成数字，方便取模运算。</li><li><strong>%</strong>：取模运算</li></ul><p>查询、新增时指定路由参数（routing）：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">PUT /my_index/_doc/1?routing=user123</span>
<span class="line">{</span>
<span class="line">  &quot;title&quot;: &quot;My document&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mysql与es的数据一致性" tabindex="-1"><a class="header-anchor" href="#mysql与es的数据一致性"><span>MYSQL与ES的数据一致性</span></a></h2><p>【需求描述】<br> 我在mysql数据库有一张表A，为了加快搜索速度，将数据迁移到了ES。<br> 但表A仍然会有增量数据进来，对于这些增量数据，要如何保证数据写进了MYSQL后，也会写进ES呢？</p><p>【解决方案】</p><p>3种：</p><ol><li><strong>数据双写</strong></li><li><strong>MQ异步同步</strong></li><li><strong>基于Binlog实现数据同步（Canal）</strong></li></ol><p>【数据双写】</p><p><strong>原理</strong>：在程序中，在写入数据时，先写入数据到Mysql，然后再写入到ES。<br><strong>优点</strong>：实现简单，时效性高<br><strong>缺点</strong>：硬编码问题严重（每个表都要重写一次）；如果服务或ES宕机，会有数据丢失风险</p><p>【MQ异步同步】</p><p><strong>原理</strong>：在程序中，在写入数据时，先写入数据到Mysql，然后再写入一条消息到MQ，通过MQ告诉ES需要进行数据同步。<br><strong>优点</strong>：</p><ul><li>这个方案最直接的点就是性能高，并且实现了业务的解耦合，并且可以利用 MQ 的重试机制，在写入失败的时候进行重试，降低了数据丢失的风险。</li><li>这样还支持多个数据源的写入，提高了扩展性，不会出现由于单个数据源写入异常从而导致其他数据源写入受到影响的问题。<br><strong>缺点</strong>：</li><li>硬编码问题，在接入新的数据源的时候需要实现新的消费者代码，代码侵入性较强</li><li>引入了消息队列，提高了运维的成本，增加了系统的复杂程度</li><li>可能出现延时问题，因为消息队列是异步消费模型，用户写入的数据不一定可以马上看到结果，有一定的延迟。</li></ul><p>【Canal（基于Binlog实现数据同步）】</p><p><strong>原理</strong>：</p><ul><li>Mysql的主节点会将增删改操作都写入binlog日志</li><li>Canal伪装成Mysql的从节点，订阅Mysql的binlog日志 <strong>优点</strong>：</li><li>没有代码侵入，没有硬编码</li><li>原有的系统没有任何变化，可以实现无感知，性能较高</li><li>业务解耦合，这个和消息队列是差不多实现思路的，不过这个不需要关注原来系统的业务实现</li></ul>`,73)]))}const p=n(t,[["render",l]]),c=JSON.parse('{"path":"/database/elasticSearch/%E5%8E%9F%E7%90%86.html","title":"原理","lang":"en-US","frontmatter":{"title":"原理"},"git":{"updatedTime":1761213989000,"contributors":[{"name":"azil","username":"azil","email":"854257920@qq.com","commits":2,"url":"https://github.com/azil"},{"name":"dongyz8","username":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":12,"url":"https://github.com/dongyz8"},{"name":"Fun_zil","username":"","email":"854257920@qq.com","commits":1}],"changelog":[{"hash":"144ff42325a1305cb76ccc36b9ccb03773c86836","time":1761213989000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"f57d30d02281ec9cc1098f316484f25d35df5ea7","time":1752834101000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"ad8fc1a188d6829c38676e985c8e2097211af10d","time":1750240340000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"45b5590437faf102707a4627c085a1bcba76a5a3","time":1740293597000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"2107fe45a32694cb96e49385ca5e0106c7ec14a9","time":1732669486000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"66f87c080a540925a27ebc560e70bc48c9f871e7","time":1731464539000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"7c05407c589da4e360f9818399f05f3906658841","time":1731131933000,"email":"854257920@qq.com","author":"Fun_zil","message":"commit"},{"hash":"8f077c536b5e7f2af222b7b28b24c4d82f0bb36e","time":1730455849000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"a124420178706444697801263f1005096bad2c82","time":1728468221000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"0fb3892db22e769cf4ab23cd656d8e1ef96449b3","time":1697451120000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"f46692dcbe97a34ff346beb6ecee090ebfea7a4f","time":1696933702000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"c134bd6d46aca8a064a19bb65704fbff919268a4","time":1690885984000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"ba56277d160fbccaf0ee5c13019cdd9ebdcf438f","time":1689858036000,"email":"854257920@qq.com","author":"azil","message":"commit"},{"hash":"70b37d4f176375118b0ae99f54befb1f90908112","time":1689762909000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"30d5f2d518aad6bb98f35c66e1d957434a1a6467","time":1689514348000,"email":"854257920@qq.com","author":"azil","message":"commit"}]},"filePathRelative":"database/elasticSearch/原理.md"}');export{p as comp,c as data};
