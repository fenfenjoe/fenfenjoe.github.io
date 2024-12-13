import{_ as l,c as p,a as s,b as a,d as e,e as i,o,r as c}from"./app-CVA42f6w.js";const u={},d={href:"https://www.cnblogs.com/dreamroute/p/8484457.html",target:"_blank",rel:"noopener noreferrer"},r={href:"https://www.elastic.co/guide/cn/elasticsearch/guide/2.x/intro.html",target:"_blank",rel:"noopener noreferrer"},v={href:"http://localhost:9200",target:"_blank",rel:"noopener noreferrer"},k={href:"http://localhost:9200/%5Bindex%5D/%5Btype%5D/%5Bid%5D",target:"_blank",rel:"noopener noreferrer"};function m(b,n){const t=c("ExternalLinkIcon");return o(),p("div",null,[n[10]||(n[10]=s("h1",{id:"elastic-search学习笔记",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#elastic-search学习笔记"},[s("span",null,"Elastic Search学习笔记")])],-1)),n[11]||(n[11]=s("h3",{id:"参考",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#参考"},[s("span",null,"参考")])],-1)),s("p",null,[n[2]||(n[2]=a("Elasticsearch－基础介绍及索引原理分析 ")),s("a",d,[n[0]||(n[0]=a("https://www.cnblogs.com/dreamroute/p/8484457.html")),e(t)]),n[3]||(n[3]=s("br",null,null,-1)),n[4]||(n[4]=a(" ElasticSearch官方文档")),s("a",r,[n[1]||(n[1]=a("https://www.elastic.co/guide/cn/elasticsearch/guide/2.x/intro.html")),e(t)])]),n[12]||(n[12]=i(`<h2 id="什么是es" tabindex="-1"><a class="header-anchor" href="#什么是es"><span>什么是ES</span></a></h2><p>Elastic Search，一个分布式、可扩展的实时搜索和分析引擎；<br> 一个文档型数据库，数据以JSON作为文档序列化的格式；<br> 特点是检索数据的速度快，使用倒排索引而不是B+树索引（关系型数据库）；</p><p>ES中的概念</p><table><thead><tr><th>Elasticsearch</th><th>说明</th></tr></thead><tbody><tr><td>索引（Index）</td><td>等于RDBMS中<strong>数据库（Database）</strong> 的概念，实质是一个文档的集合。</td></tr><tr><td>类型（Type）</td><td>等于RDBMS中<strong>表（Table）</strong> 的概念，指在一个索引中，可以索引不同类型的文档，如用户数据、博客数据。从6.0.0 版本起已废弃，一个索引中只存放一类数据。</td></tr><tr><td>映射（Mapping）</td><td>等于RDBMS中<strong>表结构（Schema）</strong> 的概念</td></tr><tr><td>文档（Doc）</td><td>等于RDBMS中<strong>行（Row）</strong> 的概念 ，以JSON格式来表示</td></tr><tr><td>字段（Field）</td><td>等于RDBMS中<strong>列（Column）</strong> 的概念 ，以JSON格式来表示</td></tr></tbody></table><h2 id="为什么用es" tabindex="-1"><a class="header-anchor" href="#为什么用es"><span>为什么用ES</span></a></h2><p>如果你的系统需要快速的、支持大数据量的全文检索功能；<br> 如果你的系统需要一个可扩展的分布式搜索引擎；</p><h2 id="es的应用场景" tabindex="-1"><a class="header-anchor" href="#es的应用场景"><span>ES的应用场景</span></a></h2><p>日志分析（ELK框架，还新增了一个FileBeat）</p><h2 id="es的特性" tabindex="-1"><a class="header-anchor" href="#es的特性"><span>ES的特性</span></a></h2><ul><li>支持分布式架构</li><li>高性能的搜索引擎</li><li>支持多种数据结构（文本、数值、日期、地理位置等）</li></ul><h2 id="es可视化管理工具" tabindex="-1"><a class="header-anchor" href="#es可视化管理工具"><span>ES可视化管理工具</span></a></h2><pre><code>**ElasticHD**
**Dejavu**
**Kibana**
</code></pre><h2 id="es索引" tabindex="-1"><a class="header-anchor" href="#es索引"><span>ES索引</span></a></h2><h4 id="创建es索引" tabindex="-1"><a class="header-anchor" href="#创建es索引"><span>创建ES索引</span></a></h4><p>创建ES索引的请求一般是这样的：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>PUT /my_index
<span class="token punctuation">{</span>
  <span class="token string">&quot;mappings&quot;</span>:<span class="token punctuation">{</span>
    <span class="token string">&quot;dynamic&quot;</span><span class="token builtin class-name">:</span> true,
    <span class="token string">&quot;properties&quot;</span>:<span class="token punctuation">{</span>
      <span class="token string">&quot;info&quot;</span>:<span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;text&quot;</span>,
        <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;ik_smart&quot;</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;email&quot;</span>:<span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>,
        <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;object&quot;</span>,
        <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;firstname&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>
          <span class="token punctuation">}</span>,
          <span class="token string">&quot;lastname&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>mappings</strong>:<strong>字段映射</strong>，配置索引里有哪些字段，以及每个字段的属性。</li><li><strong>dynamic</strong>:是否可以添加新字段（true(默认)/false/strict） <ul><li>true:当插入的文档有新字段，会自动创建新字段的映射</li><li>false:当插入的文档有新字段，依然会存储下来，但不能作为查询条件</li><li>strict:当插入的文档有新字段，抛出异常</li></ul></li><li><strong>type</strong>：字段的数据类型，一般有以下几种常用数据类型 <ul><li>字符串：text（可分词的文本）、keyword（精确值）</li><li>数值：long、integer、short、byte、double、float</li><li>布尔值：boolean</li><li>日期：date</li><li>对象：object</li></ul></li><li><strong>index</strong>:是否创建索引</li><li><strong>analyzer</strong>:分词器，text数据类型字段需要配置</li><li><strong>properties</strong>:配置该索引/字段的子字段</li></ul><p>创建索引后，还有对索引的查看，删除操作（不支持修改）。</p><h4 id="查看索引" tabindex="-1"><a class="header-anchor" href="#查看索引"><span>查看索引</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>GET /my_index
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="删除索引" tabindex="-1"><a class="header-anchor" href="#删除索引"><span>删除索引</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>DELETE /my_index
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理"><span>原理</span></a></h2><h4 id="es存储原理-索引" tabindex="-1"><a class="header-anchor" href="#es存储原理-索引"><span>ES存储原理&amp;索引</span></a></h4><p><strong>docid</strong></p><p>ES数据库里的每条记录，都会分配到一个ID，称为doc id。</p><table><thead><tr><th>docid</th><th>name</th><th>age</th></tr></thead><tbody><tr><td>1</td><td>Johnny Depp</td><td>25</td></tr><tr><td>2</td><td>Aby Homie</td><td>18</td></tr><tr><td>3</td><td>Johnny Wei</td><td>25</td></tr></tbody></table><p><strong>倒排索引（Posting）</strong></p><p>ES会为表中的每个字段都维护一个倒排索引。<br> 倒排索引有两个主要字段，一个负责将表中该字段的每一行分成单词存储起来，一个则负责存储这些单词对应的docid（出现多次则以数组保存）。<br> 查询时，通过分词去匹配索引，匹配到之后，根据后面的ID去查找记录。</p><p>name字段的倒排索引：</p><table><thead><tr><th>Term</th><th>Posting</th></tr></thead><tbody><tr><td>Johnny</td><td>[1,3]</td></tr><tr><td>Depp</td><td>1</td></tr><tr><td>Aby</td><td>2</td></tr><tr><td>Homie</td><td>2</td></tr><tr><td>Wei</td><td>3</td></tr></tbody></table><p>age字段的倒排索引：</p><table><thead><tr><th>Term</th><th>Posting</th></tr></thead><tbody><tr><td>25</td><td>[1,3]</td></tr><tr><td>18</td><td>2</td></tr></tbody></table><blockquote><p>倒排索引提供了模糊搜索的一种解决方案，但是当分词的数量很多（比如千万级），那么检索分词会很慢。<br> 因此，ES又引出了分词词典这个概念。</p></blockquote><p><strong>分词词典（Term Dictionary）</strong></p><p>分词词典，是对分词进行排序后，使其可以通过二分查找达到log(n)级的查询效率。<br> 对倒排索引（posting）排序后获得的就是Term Dictionary。</p><p>name字段的分词词典：</p><table><thead><tr><th>Term</th><th>Posting</th></tr></thead><tbody><tr><td>Aby</td><td>2</td></tr><tr><td>Depp</td><td>1</td></tr><tr><td>Homie</td><td>2</td></tr><tr><td>Johnny</td><td>[1,3]</td></tr><tr><td>Wei</td><td>3</td></tr></tbody></table><p>age字段的分词词典：</p><table><thead><tr><th>Term</th><th>Posting</th></tr></thead><tbody><tr><td>18</td><td>2</td></tr><tr><td>25</td><td>[1,3]</td></tr></tbody></table><blockquote><p>分词词典解决了查询效率问题，但是若数据量太大，则无法将全部数据都加载到内存。<br> 为了解决这个问题，分词索引出现了。</p></blockquote><p><strong>分词索引（Term Index）</strong></p><p>通过分词中的前缀，为分词词典再维护一个B-树索引。<br> 通过分词索引可快速定位到Term Dictionary里的某个offset，再沿着这个offset往下查询。</p><p>name字段的分词索引：</p><table><thead><tr><th>Index</th><th>Posting</th></tr></thead><tbody><tr><td>A</td><td>1</td></tr><tr><td>Ab</td><td>1</td></tr><tr><td>Aby</td><td>1</td></tr><tr><td>D</td><td>2</td></tr><tr><td>H</td><td>3</td></tr><tr><td>J</td><td>4</td></tr><tr><td>W</td><td>5</td></tr><tr><td>...</td><td></td></tr></tbody></table><blockquote><p>若分词索引数据量也很大，内存无法加载完，此时可以通过FST方法，压缩分词索引，提高存储效率。</p></blockquote><p><strong>FST</strong><br> 压缩算法，提高存储效率</p><h4 id="搜索原理-lucene" tabindex="-1"><a class="header-anchor" href="#搜索原理-lucene"><span>搜索原理（Lucene）</span></a></h4><p>略</p><h4 id="排序原理" tabindex="-1"><a class="header-anchor" href="#排序原理"><span>排序原理</span></a></h4><h2 id="es的使用" tabindex="-1"><a class="header-anchor" href="#es的使用"><span>ES的使用</span></a></h2><h4 id="安装es服务器" tabindex="-1"><a class="header-anchor" href="#安装es服务器"><span>安装ES服务器</span></a></h4><p>略</p><h4 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件"><span>配置文件</span></a></h4><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token comment"># 以下是配置文件：</span>
<span class="token operator">/</span>config
    <span class="token operator">/</span>elasticsearch<span class="token punctuation">.</span>yml
    <span class="token operator">/</span>logging<span class="token punctuation">.</span>yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token comment">#elasticsearch.yml</span>
<span class="token comment">#该文件是ES服务器的主要配置文件</span>
<span class="token comment">#分为静态属性和动态属性。</span>
<span class="token comment">#静态属性：ES启动后便不可修改，如cluster.name、node.name</span>
<span class="token comment">#动态属性：ES启动后，可通过Restful或其他方式修改</span>
<span class="token key atrule">cluster.name</span><span class="token punctuation">:</span> myescluster <span class="token comment"># 集群名字</span>
<span class="token key atrule">node.data</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 当前节点是否数据结点（默认为true）</span>
<span class="token key atrule">node.master</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 当前节点是否候选主结点（默认为true）</span>
<span class="token key atrule">node.ingest</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># 当前节点是否吸收节点（默认为false）</span>
<span class="token key atrule">discovery.zen.minimum_master_nodes</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment"># 当前集群</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="登录" tabindex="-1"><a class="header-anchor" href="#登录"><span>登录</span></a></h4>`,57)),s("p",null,[s("a",v,[n[5]||(n[5]=a("http://localhost:9200")),e(t)]),n[6]||(n[6]=a("，若是远程服务器则修改一下IP地址"))]),n[13]||(n[13]=i(`<h4 id="配置分词" tabindex="-1"><a class="header-anchor" href="#配置分词"><span>配置分词</span></a></h4><p><strong>什么是分词器？</strong></p><p>ES将一段文本分成多个单词的工具。</p><p><strong>在哪个步骤会用到分词器？</strong></p><ol><li>保存数据时</li></ol><p>ES在将一条数据保存到表之后，为了生成倒排索引，还需要通过分词器，将这条数据的每一个字段，分成多个单词，保存到不同字段对应的倒排索引中。<br> 生成倒排索引的原理，可见本文中的“倒排索引”介绍。</p><ol start="2"><li>查询数据时（全文检索）</li></ol><p>以下是一段全文检索请求（使用match），意思就是查表index1中，字段title匹配&quot;BROWN DOG!&quot;这个查询条件的数据：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>GET /index1/_search

<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span>:<span class="token punctuation">{</span>
      <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;BROWN DOG!&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>全文检索时，ES会先使用分词器，将查询条件分成多个词（[brown,dog]），只要字段中有其中一个词，便会命中。<br> 比如会命中以下数据：</p><ul><li>title = i like brown,i don&#39;t like dog.</li><li>title = there is a brown tree.</li><li>title = a white dog.</li></ul><blockquote><p>如果我们想查两个词都有的数据，可以像下面这样请求：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>GET /index1/_search
<span class="token punctuation">{</span>
 <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
   <span class="token string">&quot;match&quot;</span>:<span class="token punctuation">{</span>
     <span class="token string">&quot;title&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;BROWN DOG!&quot;</span>
     <span class="token string">&quot;operator&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;and&quot;</span> //默认情况下是or
   <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><p><strong>有哪些分词器？</strong></p><p>ES自带以下分词器：</p><ul><li>Standard：默认分词器，支持多语言，不分大小写。</li><li>Simple：非字母作为分隔符（即不会将数字分成一个单词）</li><li>Whitespace：空格、制表符、换行作为分隔符</li><li>Keyword：不分词</li><li>Pattern：正则表达式</li></ul><p>分词示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//【1.】假设使用不同分词器对以下句子进行分词。
“text”: “The 2 QUICK Brown-Foxes jumped over the lazy dog’s bone.”

//默认的分词器下，以空格、标点符号作为分隔符，并将单词小写处理
Standard：[&#39;the&#39;,&#39;2&#39;,&#39;quick&#39;,&#39;brown&#39;,&#39;foxes&#39;,&#39;jumped&#39;,&#39;over&#39;,&#39;the&#39;,&#39;lazy&#39;,&#39;dog&#39;s&#39;,&#39;bone&#39;]

//Simple分词器下，除了空格、标点符号，数字也会作为分隔符，同样也会将单词小写处理
Simple：[&#39;the&#39;,&#39;quick&#39;,&#39;brown&#39;,&#39;foxes&#39;,&#39;jumped&#39;,&#39;over&#39;,&#39;the&#39;,&#39;lazy&#39;,&#39;dog&#39;,&#39;s&#39;,&#39;bone&#39;]

//Whitespace分词器下，以空格、制表符、换行作为分隔符，但不会将单词小写处理
Whitespace：[&#39;The&#39;,&#39;2&#39;,&#39;QUICK&#39;,&#39;Brown-Foxes&#39;,&#39;jumped&#39;,&#39;over&#39;,&#39;the&#39;,&#39;lazy&#39;,&#39;dog&#39;s&#39;,&#39;bone&#39;]

//【2.】对中文进行分词。
“text”: “我想买3台空调”

//若用上面的分词器，基本上都会分成[&#39;我&#39;,&#39;想&#39;,&#39;买&#39;,&#39;3&#39;,&#39;台&#39;,&#39;空&#39;,&#39;调&#39;]
//此时，若搜索&#39;空调&#39;，是搜不出来这条数据的。因为从上面可以看出，没有分出&#39;空调&#39;这个分词
//由此可见，自带的分词对中文搜索不是很友好。此时我们可以使用IK分词器。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他分词器实现：</p><ul><li>IK：更高效的中文分词器</li></ul><p>IK分词器有两种模式：ik_max_word和ik_smart模式。</p><p>假设对“我是乒乓球冠军”进行分词。</p><p><strong>ik_max_word</strong>：最细粒度分词，会分成：[我，是，乒乓，乒乓球，球，冠军]</p><p><strong>ik_smart</strong>：最粗粒度分词，会分成：[我，是，乒乓球，冠军]</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#测试分词（analyzer：standard、simple、whitespace、keyword、pattern...）</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">&#39;localhost:9200/city/_analyze&#39;</span>

<span class="token punctuation">{</span>
  <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;standard&quot;</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;你是&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">#返回结果</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;tokens&quot;</span>:<span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
   <span class="token string">&quot;token&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;你&quot;</span>,
   <span class="token string">&quot;start_offset&quot;</span>:0,
   <span class="token string">&quot;end_offset&quot;</span>:1,
   <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;&lt;IDEOGRAPHIC&gt;&quot;</span>
   <span class="token string">&quot;position&quot;</span>:0
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
   <span class="token string">&quot;token&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;是&quot;</span>,
   <span class="token string">&quot;start_offset&quot;</span>:2,
   <span class="token string">&quot;end_offset&quot;</span>:3,
   <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;&lt;IDEOGRAPHIC&gt;&quot;</span>
   <span class="token string">&quot;position&quot;</span>:1
  <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">#创建索引时，为某个字段指定分词（查询时会自动走分词）</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> PUT <span class="token string">&#39;localhost:9200/test&#39;</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;mapping&quot;</span>:<span class="token punctuation">{</span>
    <span class="token string">&quot;properties&quot;</span>:<span class="token punctuation">{</span>
      <span class="token string">&quot;name&quot;</span>:<span class="token punctuation">{</span>   <span class="token comment">#创建一个name字段</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;text&quot;</span>, <span class="token comment">#定义其类型为text</span>
        <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;ik_max_word&quot;</span> <span class="token comment">#分词器使用ik_max_word</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;englishname&quot;</span>:<span class="token punctuation">{</span>   <span class="token comment">#创建一个englishname字段</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;text&quot;</span>, <span class="token comment">#定义其类型为text</span>
        <span class="token string">&quot;analyzer&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;standard&quot;</span> <span class="token comment">#分词器使用standard</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;sex&quot;</span>:<span class="token punctuation">{</span>   <span class="token comment">#创建一个sex字段</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;keyword&quot;</span>, <span class="token comment">#定义其类型为keyword，无需分词</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;age&quot;</span>:<span class="token punctuation">{</span>   <span class="token comment">#创建一个age字段</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;long&quot;</span>, <span class="token comment">#定义其类型为long，无需分词</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="es-restapi-增删改查语法" tabindex="-1"><a class="header-anchor" href="#es-restapi-增删改查语法"><span>ES RESTAPI：增删改查语法</span></a></h4><blockquote><p>ES提供RESTful API给用户做数据的增删改查。</p></blockquote><p>ES语句示例：</p>`,27)),s("p",null,[n[8]||(n[8]=a("curl -X [method] '")),s("a",k,[n[7]||(n[7]=a("http://localhost:9200/[index]/[type]/[id]")),e(t)]),n[9]||(n[9]=a("'"))]),n[14]||(n[14]=i(`<ul><li><p>method：POST（增）、DELETE（删）、PUT（改）、GET（查）</p></li><li><p>index：索引，对应关系型数据库中“数据库”的概念</p></li><li><p>type：类型，对应关系型数据库中“表”的概念（逐渐弃用）</p></li><li><p>id：主键字段，可不填</p></li></ul><blockquote><p>在每个type（表）中，存储的每一行数据又被称为”document（文档）“，是因为它存储的数据都是非结构化的</p></blockquote><p><strong>插入</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#创建一个city库、一个guangzhou表，并向guangzhou表中插入一条id为1234858的数据</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> PUT <span class="token string">&#39;localhost:9200/city/guangzhou/1234858&#39;</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;shenzhen&quot;</span>,
  <span class="token string">&quot;area&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
			 <span class="token string">&quot;Nanshan&quot;</span>,
			 <span class="token string">&quot;Futian&quot;</span>
			<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token comment">#返回结果</span>
<span class="token punctuation">{</span>
 <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;city&quot;</span>,
 <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;guangzhou&quot;</span>,
 <span class="token string">&quot;id&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;1234858&quot;</span>,
 <span class="token string">&quot;version&quot;</span>:1 <span class="token comment">#当前数据的版本，从1开始</span>
 <span class="token string">&quot;result&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;created&quot;</span> <span class="token comment">#初次创建的状态</span>
 <span class="token punctuation">..</span>.
<span class="token punctuation">}</span>
<span class="token comment">#修改guangzhou表中id为1234858的数据（覆盖）</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> PUT <span class="token string">&#39;localhost:9200/city/guangzhou/1234858&#39;</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;shenzhen222&quot;</span>, <span class="token comment">#修改了名字</span>
  <span class="token string">&quot;area&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
			 <span class="token string">&quot;Nanshan&quot;</span>,
			 <span class="token string">&quot;Futian&quot;</span>
			<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token comment">#返回结果</span>
<span class="token punctuation">{</span>
 <span class="token string">&quot;index&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;city&quot;</span>,
 <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;guangzhou&quot;</span>,
 <span class="token string">&quot;id&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;1234858&quot;</span>,
 <span class="token string">&quot;version&quot;</span>:2 <span class="token comment">#当前数据的版本</span>
 <span class="token string">&quot;result&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;updated&quot;</span> <span class="token comment">#数据被更新</span>
 <span class="token punctuation">..</span>.
<span class="token punctuation">}</span>
<span class="token comment">#修改的另一种方式：（追加修改）,推荐用这种方式</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">&#39;localhost:9200/city/guangzhou/1234858/_update&#39;</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;doc&quot;</span>:<span class="token punctuation">{</span>
    <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;shenzhen333&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">#创建一个test库，并定义其字段的类型</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> PUT <span class="token string">&#39;localhost:9200/test&#39;</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;mapping&quot;</span>:<span class="token punctuation">{</span>
    <span class="token string">&quot;properties&quot;</span>:<span class="token punctuation">{</span>
      <span class="token string">&quot;name&quot;</span>:<span class="token punctuation">{</span>   <span class="token comment">#创建一个name字段</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;text&quot;</span> <span class="token comment">#定义其类型为text</span>
      <span class="token punctuation">}</span>,
      <span class="token string">&quot;age&quot;</span>:<span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;long&quot;</span> <span class="token comment">#定义其类型为long</span>
      <span class="token punctuation">}</span>
      <span class="token string">&quot;birthday&quot;</span>:<span class="token punctuation">{</span>
        <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;date&quot;</span> <span class="token comment">#定义其类型为date</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>ES的数据类型：</p><p>text：会被分词器解析，比如某条记录的 name（text字段）为“我是猪”，查 match:{name=“我”} 的时候也会返回这条记录</p><p>keyword：不能再被分词器解析，会被当作一个整体去查询</p><p>date</p></blockquote><p><strong>查询</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 查询city库所有数据</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> GET <span class="token string">&#39;localhost:9200/city&#39;</span>
<span class="token comment"># 也等同于以下语句</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">&#39;localhost:9200/city/_search&#39;</span>
<span class="token punctuation">{</span>
 <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
   <span class="token string">&quot;match_all&quot;</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment"># 返回结果</span>
<span class="token punctuation">{</span>
 <span class="token string">&quot;took&quot;</span><span class="token builtin class-name">:</span> <span class="token number">5</span>, <span class="token comment">#耗费时间</span>
 <span class="token string">&quot;hits&quot;</span>:<span class="token punctuation">{</span>
  <span class="token string">&quot;total&quot;</span>:1, <span class="token comment">#命中的数据 总数</span>
  <span class="token string">&quot;hits&quot;</span>:<span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token string">&quot;_index&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;city&quot;</span>, <span class="token comment">#数据属于city库</span>
        <span class="token string">&quot;_type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;guangzhou&quot;</span>, <span class="token comment">#数据属于guangzhou表</span>
        <span class="token string">&quot;_id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;1234858&quot;</span>, <span class="token comment">#id值</span>
        <span class="token string">&quot;_score&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0.251234</span> <span class="token comment">#匹配度，匹配度越高，分值越高</span>
        <span class="token string">&quot;_source&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>  <span class="token comment">#该文档的其他字段</span>
			<span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Shenzhen&quot;</span>,
			<span class="token string">&quot;area&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
			 <span class="token string">&quot;Nanshan&quot;</span>,
			 <span class="token string">&quot;Futian&quot;</span>
			<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># 简单查询：根据id查询</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> GET <span class="token string">&#39;localhost:9200/city/guangzhou/1234585&#39;</span>

<span class="token comment"># 简单查询：查询name字段为shenzhen的文档</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> GET <span class="token string">&#39;localhost:9200/city/_search?q=name:shenzhen&#39;</span>

<span class="token comment"># 单查询条件&amp;排序：查询city库中province=&#39;guangdong&#39;的行，并且以city_name来排序</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">&#39;localhost:9200/city/_search&#39;</span>
<span class="token punctuation">{</span>
 <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span> <span class="token comment">#查询条件（相当于where）</span>
   <span class="token string">&quot;match&quot;</span>:<span class="token punctuation">{</span> <span class="token comment">#match：先通过分词器解析，再查询</span>
     <span class="token string">&quot;province&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;guangdong&quot;</span>
   <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>,
 <span class="token string">&quot;sort&quot;</span>:<span class="token punctuation">[</span> <span class="token comment">#排序（相当于order by）</span>
  <span class="token punctuation">{</span>
   <span class="token string">&quot;city_name&quot;</span>:<span class="token punctuation">{</span>
     <span class="token string">&quot;order&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;asc&quot;</span> <span class="token comment">#asc 升序；desc 降序；</span>
   <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
 <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment"># 多查询条件： 查询city表中province=&#39;guangdong&#39;,country=&quot;china&quot;的行</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">&#39;localhost:9200/city/_search&#39;</span>
<span class="token punctuation">{</span>
 <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
   <span class="token string">&quot;bool&quot;</span>:<span class="token punctuation">{</span> <span class="token comment">#bool：子查询</span>
     <span class="token string">&quot;must&quot;</span>:<span class="token punctuation">[</span> <span class="token comment">#must = and ,还有should = or , must_not = !</span>
         <span class="token punctuation">{</span>
            <span class="token string">&quot;match&quot;</span>:<span class="token punctuation">{</span> <span class="token comment">#match：先通过分词器解析，再查询（分词查询、模糊查询）</span>
               <span class="token string">&quot;province&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;guangdong&quot;</span>
             <span class="token punctuation">}</span>
         <span class="token punctuation">}</span>,
         <span class="token punctuation">{</span>
            <span class="token string">&quot;term&quot;</span>:<span class="token punctuation">{</span> <span class="token comment">#term：直接从倒排索引查询（精确查询）</span>
               <span class="token string">&quot;country&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;china&quot;</span>
             <span class="token punctuation">}</span>
         <span class="token punctuation">}</span>
     <span class="token punctuation">]</span>
   <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment"># 只查询需要的列：只查询city表中所有数据的province，city_name字段</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">&#39;localhost:9200/city/_search&#39;</span>
<span class="token punctuation">{</span>
 <span class="token string">&quot;_source&quot;</span>:<span class="token punctuation">[</span><span class="token string">&quot;province&quot;</span>,<span class="token string">&quot;city_name&quot;</span><span class="token punctuation">]</span>,
 <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
   <span class="token string">&quot;match_all&quot;</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment"># 分页查询：返回city表中的一页数据，设置一页最多为30条数据</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">&#39;localhost:9200/city/_search&#39;</span>
<span class="token punctuation">{</span>
 <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
   <span class="token string">&quot;match_all&quot;</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>
 <span class="token punctuation">}</span>,
 <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">30</span>, <span class="token comment">#每页30条</span>
 <span class="token string">&quot;from&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span> <span class="token comment">#取第1页</span>
<span class="token punctuation">}</span>
<span class="token comment"># 范围查询：查询查询年龄大于等于10，小于等于20的数据</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">&#39;localhost:9200/city/_search&#39;</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;filter&quot;</span>:<span class="token punctuation">{</span>
    <span class="token string">&quot;range&quot;</span>:<span class="token punctuation">{</span>
      <span class="token string">&quot;age&quot;</span>:<span class="token punctuation">{</span> 
        <span class="token string">&quot;gte&quot;</span>:10, <span class="token comment">#大于等于：greater than and equal，gt：大于</span>
        <span class="token string">&quot;lte&quot;</span>:20 <span class="token comment">#小于等于：less than and equal，lt：小于</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment"># 范围查询另一种写法：查询查询年龄大于等于10，小于等于20，且名字为shenzhen的数据</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">&#39;localhost:9200/city/_search&#39;</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
    <span class="token string">&quot;bool&quot;</span>:<span class="token punctuation">{</span>
      <span class="token string">&quot;must&quot;</span>:<span class="token punctuation">[</span>
        <span class="token string">&quot;range&quot;</span>:<span class="token punctuation">{</span>
          <span class="token string">&quot;age&quot;</span>:<span class="token punctuation">{</span> 
            <span class="token string">&quot;gte&quot;</span>:10, <span class="token comment">#大于等于：greater than and equal，gt：大于</span>
            <span class="token string">&quot;lte&quot;</span>:20 <span class="token comment">#小于等于：less than and equal，lt：小于</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;term&quot;</span>:<span class="token punctuation">{</span>
          <span class="token string">&quot;name&quot;</span>:<span class="token punctuation">{</span>
            <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;shenzhen&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;filter&quot;</span>:<span class="token punctuation">{</span>
    
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment"># 聚合查询：类似于sql里的group by，常用于查询统计信息。</span>
<span class="token comment"># 我们这里返回city表中总共的city数量</span>
<span class="token comment"># 聚合还分为：指标聚合(avg,max,min,count,cardinality)、桶聚合(groupby)、矩阵聚合、管道聚合</span>

<span class="token comment">#select city_name as city_name_groupby from city group by city_name</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">&#39;localhost:9200/city/_search&#39;</span>
<span class="token punctuation">{</span>
 <span class="token string">&quot;aggs&quot;</span>:<span class="token punctuation">{</span>
   <span class="token string">&quot;city_name_groupby&quot;</span>：<span class="token punctuation">{</span> <span class="token comment">#需要自己定义一个聚合的名字</span>
     <span class="token string">&quot;terms&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token comment">#聚合类型：groupby </span>
       <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;city_name.keyword&quot;</span>
     <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">#返回参数</span>
<span class="token punctuation">{</span>
 <span class="token string">&quot;aggregations&quot;</span>:<span class="token punctuation">{</span>
   <span class="token string">&quot;city_name_groupby&quot;</span>:<span class="token punctuation">{</span>
    <span class="token string">&quot;sum_other_doc_count&quot;</span> <span class="token builtin class-name">:</span> <span class="token number">41</span>,
    <span class="token string">&quot;buckets&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
       <span class="token string">&quot;key&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;广州&quot;</span>,
       <span class="token string">&quot;doc_count&quot;</span>:31
      <span class="token punctuation">}</span>,
      <span class="token punctuation">{</span>
       <span class="token string">&quot;key&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;厦门&quot;</span>,
       <span class="token string">&quot;doc_count&quot;</span>:10
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
   <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#select city_name as city_name_groupby from city where personNum &gt; 10000 group by city_name</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">&#39;localhost:9200/city/_search&#39;</span>
<span class="token punctuation">{</span>
 <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
   <span class="token string">&quot;range&quot;</span>:<span class="token punctuation">{</span>
     <span class="token string">&quot;personNum&quot;</span>:<span class="token punctuation">{</span>
       <span class="token string">&quot;lte&quot;</span>:10000
     <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
 <span class="token string">&quot;aggs&quot;</span>:<span class="token punctuation">{</span>
   <span class="token string">&quot;city_name_groupby&quot;</span>：<span class="token punctuation">{</span> <span class="token comment">#需要自己定义一个聚合的名字</span>
     <span class="token string">&quot;terms&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token comment">#聚合类型：groupby </span>
       <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;city_name.keyword&quot;</span>
     <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#select count(*) as city_id_count from city group by city_id</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">&#39;localhost:9200/city/_search&#39;</span>
<span class="token punctuation">{</span>
 <span class="token string">&quot;aggs&quot;</span>:<span class="token punctuation">{</span>
   <span class="token string">&quot;city_id_count&quot;</span>：<span class="token punctuation">{</span> <span class="token comment">#需要自己定义一个聚合的名字</span>
     <span class="token string">&quot;terms&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token comment">#聚合类型：groupby and count </span>
       <span class="token string">&quot;count&quot;</span>:<span class="token punctuation">{</span>
         <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;city_id.keyword&quot;</span>
       <span class="token punctuation">}</span>
     <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">#返回参数</span>
<span class="token punctuation">{</span>
 <span class="token string">&quot;aggregations&quot;</span>:<span class="token punctuation">{</span>
   <span class="token string">&quot;city_id_count&quot;</span>:<span class="token punctuation">{</span>
    <span class="token string">&quot;value&quot;</span><span class="token builtin class-name">:</span> <span class="token number">10000</span>
   <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#select max(personNum),min(personNum),avg(personNum) as personNum_sum from city group by city_id</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">&#39;localhost:9200/city/_search&#39;</span>
<span class="token punctuation">{</span>
 <span class="token string">&quot;aggs&quot;</span>:<span class="token punctuation">{</span>
   <span class="token string">&quot;city_id_groupby&quot;</span>：<span class="token punctuation">{</span> <span class="token comment">#需要自己定义一个聚合的名字</span>
     <span class="token string">&quot;terms&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token comment">#聚合类型：groupby </span>
       <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;city_id.keyword&quot;</span>
     <span class="token punctuation">}</span>,
     <span class="token string">&quot;aggs&quot;</span>:<span class="token punctuation">{</span>
       <span class="token string">&quot;personNum_sum&quot;</span>:<span class="token punctuation">{</span>
         <span class="token string">&quot;stats&quot;</span>:<span class="token punctuation">{</span>
           <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;personNum&quot;</span>
         <span class="token punctuation">}</span>
       <span class="token punctuation">}</span>
     <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">#返回参数</span>
<span class="token punctuation">{</span>
 <span class="token string">&quot;aggregations&quot;</span>:<span class="token punctuation">{</span>
   <span class="token string">&quot;city_id_groupby&quot;</span>:<span class="token punctuation">{</span>
    <span class="token string">&quot;buckets&quot;</span>:<span class="token punctuation">[</span>
      <span class="token string">&quot;key&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;guangzhou&quot;</span>,
      <span class="token string">&quot;doc_count&quot;</span>:41,
      <span class="token string">&quot;personNum_sum&quot;</span>:<span class="token punctuation">{</span>
        <span class="token string">&quot;count&quot;</span>:41,
        <span class="token string">&quot;avg&quot;</span>:20,
        <span class="token string">&quot;min&quot;</span>:1,
        <span class="token string">&quot;max&quot;</span>:32,
        <span class="token string">&quot;sum&quot;</span>:1234
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
   <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># 分词搜索：查询city库中，area中有nanshan或者futian的文档</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">&#39;localhost:9200/city/_search&#39;</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;query&quot;</span>:<span class="token punctuation">{</span>
    <span class="token string">&quot;match&quot;</span>:<span class="token punctuation">{</span>
      <span class="token string">&quot;area&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;nanshan futian&quot;</span> <span class="token comment">#条件通过空格隔开,满足其一即可</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment"># 查看表结构</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> GET <span class="token string">&#39;localhost:9200/city&#39;</span>
<span class="token comment"># 返回结果</span>
<span class="token comment"># 略</span>

<span class="token comment"># 查看ES的基本情况（有哪些索引，索引有多少数据）</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> GET <span class="token string">&#39;localhost:9200/_cat/indices?v&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>删除</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#删除文档</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> DELETE <span class="token string">&#39;localhost:9200/city/guangzhou/12345858&#39;</span>
<span class="token comment">#删除city库</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> DELETE <span class="token string">&#39;localhost:9200/city&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="es集群" tabindex="-1"><a class="header-anchor" href="#es集群"><span>ES集群</span></a></h3><p>ES集群通过结点组成。</p><p>ElasticSearch集群中，共有五种结点类型：</p><ul><li>主结点（Master）</li><li>候选主结点（Master-eligible）</li><li>数据结点（Data）</li><li>吸收结点（Ingest）</li><li>部落结点（Tribe）</li></ul><p><strong>主结点</strong><br> 每个集群只有一个主结点，负责：</p><ul><li>管理集群（管理其他结点）</li><li>集群级别的操作（如索引的创建或删除、跟踪其他结点的状态等）</li></ul><p><strong>候选主结点（相当于热备）</strong><br> 当集群中的主结点出现故障时，集群会从候选主结点中进行选举，一个候选主结点被选中后会成为新的主结点。<br> 只有候选主结点有投票权，其他结点没有投票权。</p><p><strong>数据结点</strong><br> 略</p><h3 id="其他数据库与es交互" tabindex="-1"><a class="header-anchor" href="#其他数据库与es交互"><span>其他数据库与ES交互</span></a></h3><p><strong>ES从其他数据源同步数据</strong>：<br> mysql、oracle（关系型数据库）： logstash-input-jdbc<br> mongo： mongo-connector<br> kafka、文件、日志：Logstash或Apache Flume</p><h3 id="在java项目中集成es" tabindex="-1"><a class="header-anchor" href="#在java项目中集成es"><span>在JAVA项目中集成ES</span></a></h3><h4 id="使用http调用es-api" tabindex="-1"><a class="header-anchor" href="#使用http调用es-api"><span>使用HTTP调用ES API</span></a></h4><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ElasticsearchHttpClient</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Elasticsearch 配置</span>
        <span class="token class-name">String</span> elasticsearchUrl <span class="token operator">=</span> <span class="token string">&quot;http://localhost:9200&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> indexName <span class="token operator">=</span> <span class="token string">&quot;your_index_name&quot;</span><span class="token punctuation">;</span>

        <span class="token comment">// 构建查询体</span>
        <span class="token class-name">String</span> queryBody <span class="token operator">=</span> <span class="token string">&quot;{\\&quot;query\\&quot;: {\\&quot;match_all\\&quot;: {}}}&quot;</span><span class="token punctuation">;</span>

        <span class="token comment">// 创建 HttpClient</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">CloseableHttpClient</span> httpClient <span class="token operator">=</span> <span class="token class-name">HttpClients</span><span class="token punctuation">.</span><span class="token function">createDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 构建请求 URL</span>
            <span class="token class-name">String</span> requestUrl <span class="token operator">=</span> elasticsearchUrl <span class="token operator">+</span> <span class="token string">&quot;/&quot;</span> <span class="token operator">+</span> indexName <span class="token operator">+</span> <span class="token string">&quot;/_search&quot;</span><span class="token punctuation">;</span>

            <span class="token comment">// 创建 POST 请求</span>
            <span class="token class-name">HttpPost</span> httpPost <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpPost</span><span class="token punctuation">(</span>requestUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 设置请求头部</span>
            httpPost<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;application/json&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 设置请求体</span>
            httpPost<span class="token punctuation">.</span><span class="token function">setEntity</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">StringEntity</span><span class="token punctuation">(</span>queryBody<span class="token punctuation">,</span> <span class="token class-name">ContentType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 发送请求并获取响应</span>
            <span class="token class-name">HttpResponse</span> response <span class="token operator">=</span> httpClient<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>httpPost<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 处理响应</span>
            <span class="token class-name">HttpEntity</span> entity <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">getEntity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>entity <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">String</span> responseBody <span class="token operator">=</span> <span class="token class-name">EntityUtils</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>entity<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>responseBody<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用es官方java库生成查询条件、发起查询请求" tabindex="-1"><a class="header-anchor" href="#使用es官方java库生成查询条件、发起查询请求"><span>使用ES官方JAVA库生成查询条件、发起查询请求</span></a></h4><p>添加依赖</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.elasticsearch.client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>elasticsearch-rest-high-level-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>7.15.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ElasticsearchJavaAPI</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Elasticsearch 配置</span>
        <span class="token class-name">String</span> elasticsearchHost <span class="token operator">=</span> <span class="token string">&quot;localhost&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> elasticsearchPort <span class="token operator">=</span> <span class="token number">9200</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> indexName <span class="token operator">=</span> <span class="token string">&quot;your_index_name&quot;</span><span class="token punctuation">;</span>

        <span class="token comment">// 创建 Elasticsearch 客户端</span>
        <span class="token class-name">RestHighLevelClient</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RestHighLevelClient</span><span class="token punctuation">(</span>
                <span class="token class-name">RestClient</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span>elasticsearchHost<span class="token punctuation">,</span> elasticsearchPort<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 构建查询请求</span>
            <span class="token class-name">SearchRequest</span> searchRequest <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SearchRequest</span><span class="token punctuation">(</span>indexName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">SearchSourceBuilder</span> sourceBuilder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SearchSourceBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            sourceBuilder<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token class-name">QueryBuilders</span><span class="token punctuation">.</span><span class="token function">matchAllQuery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            searchRequest<span class="token punctuation">.</span><span class="token function">source</span><span class="token punctuation">(</span>sourceBuilder<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 发送请求并获取响应</span>
            <span class="token class-name">SearchResponse</span> searchResponse <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span>searchRequest<span class="token punctuation">,</span> <span class="token class-name">RequestOptions</span><span class="token punctuation">.</span><span class="token constant">DEFAULT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 处理响应</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>searchResponse<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">// 关闭 Elasticsearch 客户端连接</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                client<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用spring-boot-data集成es" tabindex="-1"><a class="header-anchor" href="#使用spring-boot-data集成es"><span>使用Spring Boot Data集成ES</span></a></h4><p>添加依赖</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-data-elasticsearch<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加配置</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">data</span><span class="token punctuation">:</span>
    <span class="token key atrule">elasticsearch</span><span class="token punctuation">:</span>
      <span class="token key atrule">cluster-name</span><span class="token punctuation">:</span> your_cluster_name
      <span class="token key atrule">cluster-nodes</span><span class="token punctuation">:</span> your_cluster_nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实体类定义</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Document</span><span class="token punctuation">(</span>indexName <span class="token operator">=</span> <span class="token string">&quot;books&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> author<span class="token punctuation">;</span>

    <span class="token comment">// 省略构造函数、getter 和 setter 方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法1：定义Mapper，通过Mapper对索引进行操作</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BookRepository</span> <span class="token keyword">extends</span> <span class="token class-name">ElasticsearchRepository</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token comment">// 可以定义自定义的查询方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法2：使用ElasticSearchRestTemplate对索引进行操作</p><p>略</p><h4 id="使用spring-boot-data封装查询条件" tabindex="-1"><a class="header-anchor" href="#使用spring-boot-data封装查询条件"><span>使用Spring Boot Data封装查询条件</span></a></h4><p>略</p>`,40))])}const q=l(u,[["render",m],["__file","index.html.vue"]]),h=JSON.parse('{"path":"/database/elasticSearch/","title":"Elastic Search学习笔记","lang":"en-US","frontmatter":{"title":"Elastic Search学习笔记","sidebar":"auto"},"headers":[{"level":3,"title":"参考","slug":"参考","link":"#参考","children":[]},{"level":2,"title":"什么是ES","slug":"什么是es","link":"#什么是es","children":[]},{"level":2,"title":"为什么用ES","slug":"为什么用es","link":"#为什么用es","children":[]},{"level":2,"title":"ES的应用场景","slug":"es的应用场景","link":"#es的应用场景","children":[]},{"level":2,"title":"ES的特性","slug":"es的特性","link":"#es的特性","children":[]},{"level":2,"title":"ES可视化管理工具","slug":"es可视化管理工具","link":"#es可视化管理工具","children":[]},{"level":2,"title":"ES索引","slug":"es索引","link":"#es索引","children":[]},{"level":2,"title":"原理","slug":"原理","link":"#原理","children":[]},{"level":2,"title":"ES的使用","slug":"es的使用","link":"#es的使用","children":[{"level":3,"title":"ES集群","slug":"es集群","link":"#es集群","children":[]},{"level":3,"title":"其他数据库与ES交互","slug":"其他数据库与es交互","link":"#其他数据库与es交互","children":[]},{"level":3,"title":"在JAVA项目中集成ES","slug":"在java项目中集成es","link":"#在java项目中集成es","children":[]}]}],"git":{"updatedTime":1734073104000,"contributors":[{"name":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":1}]},"filePathRelative":"database/elasticSearch/README.md"}');export{q as comp,h as data};
