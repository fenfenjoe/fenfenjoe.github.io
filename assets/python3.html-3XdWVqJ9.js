import{_ as s,c as a,a as p,o as e}from"./app-iMoEB5u2.js";const t={};function l(i,n){return e(),a("div",null,n[0]||(n[0]=[p(`<h1 id="python3" tabindex="-1"><a class="header-anchor" href="#python3"><span>Python3</span></a></h1><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料</span></a></h2><p>官方文档:<a href="https://docs.python.org/zh-cn/3/index.html" target="_blank" rel="noopener noreferrer">https://docs.python.org/zh-cn/3/index.html</a> python内置函数：<a href="https://docs.python.org/zh-cn/3/library/functions.html" target="_blank" rel="noopener noreferrer">https://docs.python.org/zh-cn/3/library/functions.html</a></p><h2 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符"><span>运算符</span></a></h2><table><thead><tr><th>符号</th><th>作用</th></tr></thead><tbody><tr><td><code>**</code></td><td>乘方</td></tr><tr><td><code>%</code></td><td>求余</td></tr><tr><td><code>//</code></td><td>除法（取整数）</td></tr></tbody></table><h2 id="数据结构" tabindex="-1"><a class="header-anchor" href="#数据结构"><span>数据结构</span></a></h2><h3 id="列表-等于-数组" tabindex="-1"><a class="header-anchor" href="#列表-等于-数组"><span>列表（等于 数组）</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"></span>
<span class="line">mylist <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">#定义</span></span>
<span class="line">mylist <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#定义</span></span>
<span class="line">mylist <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">]</span> <span class="token comment">#定义</span></span>
<span class="line">mylist <span class="token operator">=</span> <span class="token punctuation">[</span>x<span class="token operator">**</span><span class="token number">2</span> <span class="token keyword">for</span> x <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token comment">#定义（通过列表推导式）</span></span>
<span class="line">mylist <span class="token operator">=</span> <span class="token punctuation">[</span>x <span class="token keyword">for</span> x <span class="token keyword">in</span> vec <span class="token keyword">if</span> x<span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">]</span></span>
<span class="line">mylist <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">:</span><span class="token string">&#39;John&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;age&#39;</span><span class="token punctuation">:</span><span class="token number">24</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">#将字典的key转为list</span></span>
<span class="line">mylist <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span>dictA<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">#同上</span></span>
<span class="line">mylist <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span>dictA<span class="token punctuation">.</span>values<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">#将字典的value转为list</span></span>
<span class="line">mylist <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span>dictA<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">#将字典的(key,value)转为list</span></span>
<span class="line">mylist <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span>setA<span class="token punctuation">)</span> <span class="token comment">#将集合转为list</span></span>
<span class="line"> <span class="token comment">#列表切片</span></span>
<span class="line">mylist<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token comment">#第1到第3个元素</span></span>
<span class="line">mylist<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span> <span class="token comment">#第1到最后一个元素</span></span>
<span class="line">mylist<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token comment">#最后一个元素</span></span>
<span class="line"><span class="token comment">#添加</span></span>
<span class="line">mylist<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token string">&#39;c&#39;</span><span class="token punctuation">)</span></span>
<span class="line">mylist<span class="token punctuation">.</span>insert<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">&#39;d&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">#删除</span></span>
<span class="line">mylist<span class="token punctuation">.</span>pop<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">#删除第2个元素</span></span>
<span class="line">mylist<span class="token punctuation">.</span>remove<span class="token punctuation">(</span><span class="token string">&#39;abc&#39;</span><span class="token punctuation">)</span> <span class="token comment">#删除值为abc的元素，若有多个也只删除一个</span></span>
<span class="line"><span class="token keyword">del</span> mylist<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token comment">#删除第1个元素</span></span>
<span class="line"><span class="token keyword">del</span> mylist<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token comment">#删除前2个元素</span></span>
<span class="line"><span class="token keyword">del</span> mylist <span class="token comment">#删除列表</span></span>
<span class="line"><span class="token comment">#排序</span></span>
<span class="line">mylist<span class="token punctuation">.</span>sort<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#升序排序</span></span>
<span class="line">mylist<span class="token punctuation">.</span>sort<span class="token punctuation">(</span>reverse<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span> <span class="token comment">#降序排序</span></span>
<span class="line">mylist<span class="token punctuation">.</span>sort<span class="token punctuation">(</span>key<span class="token operator">=</span><span class="token builtin">len</span><span class="token punctuation">)</span> <span class="token comment">#按长度，升序排序</span></span>
<span class="line"><span class="token comment">#获取对象所在下标</span></span>
<span class="line">mylist<span class="token punctuation">.</span>index<span class="token punctuation">(</span>obj<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="元组-等于-只可读的列表" tabindex="-1"><a class="header-anchor" href="#元组-等于-只可读的列表"><span>元组（等于 只可读的列表）</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"></span>
<span class="line">digit <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;two&#39;</span><span class="token punctuation">)</span> <span class="token comment">#定义</span></span>
<span class="line"><span class="token builtin">tuple</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;two&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">#列表转元组</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字典-等于-map" tabindex="-1"><a class="header-anchor" href="#字典-等于-map"><span>字典（等于 Map）</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"></span>
<span class="line">empty_dict <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">#空字典</span></span>
<span class="line">empty_dict <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;dad&#39;</span><span class="token punctuation">:</span><span class="token string">&#39;homer&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;mom&#39;</span><span class="token punctuation">:</span><span class="token string">&#39;marge&#39;</span><span class="token punctuation">}</span> <span class="token comment">#定义</span></span>
<span class="line">empty_dict <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token string">&#39;dad&#39;</span><span class="token punctuation">:</span><span class="token string">&#39;homer&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;mom&#39;</span><span class="token punctuation">:</span><span class="token string">&#39;marge&#39;</span><span class="token punctuation">)</span> <span class="token comment">#定义</span></span>
<span class="line"></span>
<span class="line"><span class="token string">&#39;mom&#39;</span> <span class="token keyword">in</span> family <span class="token comment">#是否有该键</span></span>
<span class="line"></span>
<span class="line">empty_dict<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#返回所有键的列表</span></span>
<span class="line">empty_dict<span class="token punctuation">.</span>values<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#返回所有值的列表</span></span>
<span class="line">empty_dict<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#返回键值对的列表，键值对由元组组成</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> k<span class="token punctuation">,</span>v <span class="token keyword">in</span> empty_dict<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span>v<span class="token punctuation">)</span> <span class="token comment">#字典循环：取出键和值</span></span>
<span class="line">    </span>
<span class="line">empty_dict<span class="token punctuation">[</span><span class="token string">&#39;dad&#39;</span><span class="token punctuation">]</span> <span class="token comment">#获取字典中键为dad的值</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="集合-等于-set" tabindex="-1"><a class="header-anchor" href="#集合-等于-set"><span>集合（等于 Set）</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"></span>
<span class="line">empty_set <span class="token operator">=</span> <span class="token builtin">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">#定义</span></span>
<span class="line">myset <span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&#39;python&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;r&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;java&#39;</span><span class="token punctuation">}</span> <span class="token comment">#定义</span></span>
<span class="line"><span class="token builtin">set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;cobra&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;viper&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;python&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token comment">#列表转集合</span></span>
<span class="line"> <span class="token comment">#集合运算</span></span>
<span class="line">add<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#增</span></span>
<span class="line">remove<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#删</span></span>
<span class="line">setA <span class="token operator">&amp;</span> setB <span class="token comment">#交集</span></span>
<span class="line">setA <span class="token operator">|</span> setB <span class="token comment">#并集 </span></span>
<span class="line">setA<span class="token operator">-</span>setB <span class="token comment">#差集</span></span>
<span class="line">setA<span class="token punctuation">.</span>intersection<span class="token punctuation">(</span>setB<span class="token punctuation">)</span> <span class="token comment">#交集</span></span>
<span class="line">setA<span class="token punctuation">.</span>union<span class="token punctuation">(</span>setB<span class="token punctuation">)</span> <span class="token comment">#并集</span></span>
<span class="line">setA<span class="token punctuation">.</span>difference<span class="token punctuation">(</span>setB<span class="token punctuation">)</span> <span class="token comment">#差集</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数" tabindex="-1"><a class="header-anchor" href="#函数"><span>函数</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"></span>
<span class="line"><span class="token comment"># 定义函数</span></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">myfunc</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span> <span class="token punctuation">:</span> </span>
<span class="line">    <span class="token triple-quoted-string string">&quot;&quot;&quot;myfunc will print an number.&quot;&quot;&quot;</span> <span class="token comment"># 函数说明文档</span></span>
<span class="line">    a<span class="token operator">=</span><span class="token string">&#39;1&#39;</span>  <span class="token comment">#缩进4格</span></span>
<span class="line">    <span class="token keyword">return</span> a <span class="token comment">#可返回两个值；以元组返回两个值</span></span>
<span class="line"><span class="token comment"># 定义函数2</span></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">myfunc2</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span>c<span class="token operator">=</span><span class="token string">&#39;haha&#39;</span><span class="token punctuation">)</span> <span class="token comment">#入参带默认值，没有默认值则为必填入参，有默认入参则非必填</span></span>
<span class="line">    <span class="token keyword">return</span> </span>
<span class="line"><span class="token comment"># 调用函数</span></span>
<span class="line">myfunc2<span class="token punctuation">(</span>a<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">)</span> </span>
<span class="line"><span class="token comment"># 调用函数2</span></span>
<span class="line">myfunc2<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token string">&#39;haha&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment"># 定义函数3</span></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">myfunc3</span><span class="token punctuation">(</span>age<span class="token punctuation">:</span><span class="token string">&#39;年龄&#39;</span><span class="token punctuation">,</span>name<span class="token punctuation">:</span><span class="token string">&#39;名称&#39;</span><span class="token operator">=</span><span class="token string">&#39;Joe&#39;</span><span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">&gt;</span><span class="token string">&#39;没有返回参数&#39;</span> <span class="token comment">#为入参、出参添加注解</span></span>
<span class="line">    <span class="token keyword">pass</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串"><span>字符串</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">str = &#39;hello&#39;</span>
<span class="line"> #格式化</span>
<span class="line">&#39;raining %s and %s&#39; % (&#39;cats&#39;, &#39;dogs&#39;)</span>
<span class="line">&#39;raining {} and {}&#39;.format(&#39;cats&#39;, &#39;dogs&#39;)</span>
<span class="line"> #查找下标</span>
<span class="line">str.find(&#39;abc&#39;)</span>
<span class="line"> #取子字符串</span>
<span class="line">str[0] #第一个字符</span>
<span class="line">str[0:3] #取第1~4个字符串</span>
<span class="line">str[-1] #取最后1个字符串</span>
<span class="line">str * 2 #取str并重复1次</span>
<span class="line">str[2:] #取第3个以后所有字符</span>
<span class="line"></span>
<span class="line">print(&#39;Hello&#39;+&#39;Joe&#39;) #用+号拼接（适合都是字符串的情况）</span>
<span class="line">print(&#39;Hello&#39;,23) #用逗号拼接（适合并非都是字符串的情况）</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="作用域" tabindex="-1"><a class="header-anchor" href="#作用域"><span>作用域</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"></span>
<span class="line"><span class="token comment">#作用域由外到内分为以下几层</span></span>
<span class="line"><span class="token comment">##    第一层：内置名称集合（abs()、length()等）</span></span>
<span class="line"><span class="token comment">###   第二层：模块变量</span></span>
<span class="line"><span class="token comment">####  第三层：函数变量</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类" tabindex="-1"><a class="header-anchor" href="#类"><span>类</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"></span>
<span class="line"><span class="token comment"># 例子1</span></span>
<span class="line"><span class="token comment"># 定义类START</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">MyClass</span><span class="token punctuation">:</span></span>
<span class="line">  age <span class="token operator">=</span> <span class="token number">1</span>   <span class="token comment"># 定义类变量</span></span>
<span class="line">  __name <span class="token operator">=</span> <span class="token string">&#39;haha&#39;</span> <span class="token comment"># 定义私有类变量（加双下划线）</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 初始化函数</span></span>
<span class="line">  <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span>age<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    self<span class="token punctuation">.</span>age <span class="token operator">=</span> age   </span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 实例函数</span></span>
<span class="line">  <span class="token keyword">def</span> <span class="token function">myFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">pass</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 私有方法</span></span>
<span class="line">  <span class="token keyword">def</span> <span class="token function">__myFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">pass</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 定义类END</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 例子2（继承类）</span></span>
<span class="line"><span class="token comment"># 定义类START</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span>SuperClass<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line"><span class="token comment"># 定义类END</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 例子3（多重继承）</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span>SuperClass1<span class="token punctuation">,</span>SuperClass2<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 实例化对象</span></span>
<span class="line">myclass <span class="token operator">=</span> Myclass<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">#调用父类的方法（不怕被重写）</span></span>
<span class="line">sub <span class="token operator">=</span> SubTest<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">sub<span class="token punctuation">.</span>test<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token builtin">super</span><span class="token punctuation">(</span>SubTest<span class="token punctuation">,</span>sub<span class="token punctuation">)</span><span class="token punctuation">.</span>test<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token comment">#输出ccc</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">#类的其他私有方法：</span></span>
<span class="line">__del__ <span class="token comment">#析构函数？</span></span>
<span class="line">__repr__  <span class="token comment">#toString</span></span>
<span class="line">__setitem__ <span class="token comment">#setter方法</span></span>
<span class="line">__getitem__ <span class="token comment">#getter方法</span></span>
<span class="line">__len__ <span class="token comment">#返回长度</span></span>
<span class="line">__add__ <span class="token comment">#重载 加法运算</span></span>
<span class="line">__sub__ <span class="token comment">#重载 减法运算</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="可迭代对象-iterator" tabindex="-1"><a class="header-anchor" href="#可迭代对象-iterator"><span>可迭代对象（iterator）</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"></span>
<span class="line"><span class="token comment"># 实现了 __iter__或__getItem__方法，以及 __next__方法的，就是可迭代对象</span></span>
<span class="line"><span class="token comment"># 常见可迭代对象有：</span></span>
<span class="line"><span class="token comment">#1. list （列表）</span></span>
<span class="line"><span class="token comment">#2. tuple （元组）</span></span>
<span class="line"><span class="token comment">#3. dict （字典）</span></span>
<span class="line"><span class="token comment">#4. set （集合）</span></span>
<span class="line"><span class="token comment">#5. str （字符串）</span></span>
<span class="line"><span class="token comment">#6. range （范围）</span></span>
<span class="line"><span class="token comment">#7. bytes （字节）</span></span>
<span class="line"><span class="token comment">#8. bytearray （字节数组）</span></span>
<span class="line"><span class="token comment">#9. memoryview （内存视图）</span></span>
<span class="line"><span class="token comment">#10. generator （生成器）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">## 获取迭代器</span></span>
<span class="line">iterA <span class="token operator">=</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>  <span class="token comment"># 0,1,2,3,4</span></span>
<span class="line"></span>
<span class="line">listB <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;c&#39;</span><span class="token punctuation">]</span></span>
<span class="line">iterB <span class="token operator">=</span> <span class="token builtin">iter</span><span class="token punctuation">(</span>listB<span class="token punctuation">)</span> <span class="token comment"># 获取列表的迭代对象</span></span>
<span class="line"></span>
<span class="line">dictC <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">:</span><span class="token string">&#39;John&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;age&#39;</span><span class="token punctuation">:</span><span class="token number">24</span><span class="token punctuation">}</span>  </span>
<span class="line">iterC <span class="token operator">=</span> <span class="token builtin">iter</span><span class="token punctuation">(</span>dictC<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">## 使用迭代器</span></span>
<span class="line"><span class="token comment"># range</span></span>
<span class="line"><span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># list</span></span>
<span class="line"><span class="token keyword">for</span> i <span class="token keyword">in</span> listB<span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># dict</span></span>
<span class="line"><span class="token keyword">for</span> key<span class="token punctuation">,</span>value <span class="token keyword">in</span> dictC<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>key<span class="token punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token punctuation">{</span>value<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 字符串</span></span>
<span class="line"><span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token string">&#39;hello world&#39;</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="库-模块" tabindex="-1"><a class="header-anchor" href="#库-模块"><span>库(模块)</span></a></h2><h3 id="下载新的python库" tabindex="-1"><a class="header-anchor" href="#下载新的python库"><span>下载新的python库</span></a></h3><p>https://pypi.org/project/ 找需要的库及版本 放到python的Scripts目录中 进入cmd，到python/Scripts目录下，执行 pip install [python库文件名]</p><h3 id="常用库" tabindex="-1"><a class="header-anchor" href="#常用库"><span>常用库</span></a></h3><ul><li>math：提供数学相关的函数</li><li>pd（Pandas）：数据分析库</li><li>np(numpy)：多维数组</li><li>matplotlib：二维绘图</li><li>scipy：</li><li>sidekick：机器学习</li><li>vn.py</li><li>PyCTP</li><li>QuickLib</li><li>Zipline</li><li>pyecharts：绘图</li></ul><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment">#查看python所有库</span></span>
<span class="line">pip <span class="token builtin">list</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="导入库" tabindex="-1"><a class="header-anchor" href="#导入库"><span>导入库</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># 示例1：导入os类</span></span>
<span class="line"><span class="token keyword">import</span> os </span>
<span class="line">os<span class="token punctuation">.</span>getcwd<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 示例2：从datetime模块导入time类</span></span>
<span class="line"><span class="token keyword">from</span> datetime <span class="token keyword">import</span> time</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 示例3：导入datetime模块的所有类</span></span>
<span class="line"><span class="token keyword">from</span> datetime <span class="token keyword">import</span> <span class="token operator">*</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="os模块-操作系统" tabindex="-1"><a class="header-anchor" href="#os模块-操作系统"><span>os模块：操作系统</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line">List os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token comment">#【指定的文件夹包含的文件或文件夹的名字的列表】</span></span>
<span class="line">os<span class="token punctuation">.</span>rename<span class="token punctuation">(</span>src<span class="token punctuation">,</span> dst<span class="token punctuation">)</span> <span class="token comment">#【重命名文件或目录】</span></span>
<span class="line">os<span class="token punctuation">.</span>rmdir<span class="token punctuation">(</span>path<span class="token punctuation">)</span> </span>
<span class="line">os<span class="token punctuation">.</span>removedirs<span class="token punctuation">(</span>path<span class="token punctuation">)</span></span>
<span class="line">os<span class="token punctuation">.</span>remove<span class="token punctuation">(</span>path<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="re模块-正则表达式" tabindex="-1"><a class="header-anchor" href="#re模块-正则表达式"><span>re模块：正则表达式</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line">	<span class="token keyword">import</span> re</span>
<span class="line">	re<span class="token punctuation">.</span>findAll<span class="token punctuation">(</span><span class="token string">r&#39;[0-9]*&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;dyz 01235 0&#39;</span><span class="token punctuation">)</span> <span class="token comment">#返回[&#39;01235&#39;,&#39;0&#39;]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="operator模块-运算函数" tabindex="-1"><a class="header-anchor" href="#operator模块-运算函数"><span>operator模块：运算函数</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment">#%% operator模块：运算函数，加减乘除、大于小于等于</span></span>
<span class="line"><span class="token keyword">import</span> operator</span>
<span class="line"></span>
<span class="line"><span class="token builtin">dir</span><span class="token punctuation">(</span>operator<span class="token punctuation">)</span> <span class="token comment">#查看operator模块的所有函数</span></span>
<span class="line"></span>
<span class="line">operator<span class="token punctuation">.</span>lt<span class="token punctuation">(</span>x<span class="token punctuation">,</span>y<span class="token punctuation">)</span> <span class="token comment">#小于（lower than） </span></span>
<span class="line">operator<span class="token punctuation">.</span>gt<span class="token punctuation">(</span>x<span class="token punctuation">,</span>y<span class="token punctuation">)</span> <span class="token comment">#大于（greater than）</span></span>
<span class="line">operator<span class="token punctuation">.</span>eq<span class="token punctuation">(</span>x<span class="token punctuation">,</span>y<span class="token punctuation">)</span> <span class="token comment">#等于（equals）</span></span>
<span class="line">operator<span class="token punctuation">.</span>ne<span class="token punctuation">(</span>x<span class="token punctuation">,</span>y<span class="token punctuation">)</span> <span class="token comment">#不等于（not equals）</span></span>
<span class="line">operator<span class="token punctuation">.</span>le<span class="token punctuation">(</span>x<span class="token punctuation">,</span>y<span class="token punctuation">)</span> <span class="token comment">#小于等于</span></span>
<span class="line">operator<span class="token punctuation">.</span>ge<span class="token punctuation">(</span>x<span class="token punctuation">,</span>y<span class="token punctuation">)</span> <span class="token comment">#大于等于</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#加减乘除等略</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="math模块-数学相关函数" tabindex="-1"><a class="header-anchor" href="#math模块-数学相关函数"><span>math模块：数学相关函数</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment">#%% math模块：正弦余弦</span></span>
<span class="line"><span class="token keyword">import</span> math</span>
<span class="line"></span>
<span class="line"><span class="token builtin">dir</span><span class="token punctuation">(</span>math<span class="token punctuation">)</span> <span class="token comment">#查看math模块的所有函数</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#数学常量</span></span>
<span class="line">math<span class="token punctuation">.</span>e <span class="token comment">#欧拉数(2.7182...)</span></span>
<span class="line">math<span class="token punctuation">.</span>pi <span class="token comment">#圆周率PI = 3.1415926...</span></span>
<span class="line">math<span class="token punctuation">.</span>tau <span class="token comment">#数学常量τ = 6.283185...</span></span>
<span class="line"><span class="token comment">#...</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#常用函数</span></span>
<span class="line">math<span class="token punctuation">.</span>cos<span class="token punctuation">(</span>x<span class="token punctuation">)</span></span>
<span class="line">math<span class="token punctuation">.</span>sin<span class="token punctuation">(</span>x<span class="token punctuation">)</span></span>
<span class="line">math<span class="token punctuation">.</span>tan<span class="token punctuation">(</span>x<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">math<span class="token punctuation">.</span>ceil<span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token comment">#对x四舍五入，往上进1。如math.ceil(1.1)=2</span></span>
<span class="line">math<span class="token punctuation">.</span>floor<span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token comment">#对x四舍五入，向下取整。如math.ceil(1.1)=1</span></span>
<span class="line"></span>
<span class="line">math<span class="token punctuation">.</span>fabs<span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token comment">#取x的绝对值</span></span>
<span class="line">math<span class="token punctuation">.</span>gcd<span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token comment">#最大公约数</span></span>
<span class="line">math<span class="token punctuation">.</span>sqrt<span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token comment">#平方根</span></span>
<span class="line">math<span class="token punctuation">.</span>fmod<span class="token punctuation">(</span>x<span class="token punctuation">,</span>y<span class="token punctuation">)</span> <span class="token comment">#求x/y的余数</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sys模块-系统函数" tabindex="-1"><a class="header-anchor" href="#sys模块-系统函数"><span>sys模块：系统函数</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment">#%% 模块</span></span>
<span class="line"><span class="token keyword">import</span> sys <span class="token comment">#导入sys模块，并通过sys调用其函数</span></span>
<span class="line">sys<span class="token punctuation">.</span>argv</span>
<span class="line"></span>
<span class="line"><span class="token keyword">from</span> sys <span class="token keyword">import</span> argv <span class="token comment">#导入sys中的某个函数，并直接使用</span></span>
<span class="line">argv</span>
<span class="line"></span>
<span class="line"><span class="token comment">#__name__ 属性</span></span>
<span class="line"><span class="token comment">#每个模块都有__name__属性</span></span>
<span class="line"><span class="token comment">#当__name__==&#39;__main__&#39;时，表明当前模块是自身在运行</span></span>
<span class="line"><span class="token comment">#当__name__!=&#39;__main__&#39;时，表明当前模块是被引用了</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin">dir</span><span class="token punctuation">(</span>sys<span class="token punctuation">)</span> <span class="token comment">#查看sys模块中所有定义的名称（返回一个List）</span></span>
<span class="line"><span class="token builtin">dir</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#返回当前模块中所有定义的名称</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pickle模块-序列化" tabindex="-1"><a class="header-anchor" href="#pickle模块-序列化"><span>pickle模块：序列化</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment">#%% pickle模块:序列化</span></span>
<span class="line"><span class="token comment">#序列化：python中的对象 =&gt; 可存储的数据 =&gt; 文件</span></span>
<span class="line"><span class="token comment">#反序列化：文件 =&gt; 可存储的数据 =&gt; python中的对象</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> pickle</span>
<span class="line"></span>
<span class="line"><span class="token comment">#序列化</span></span>
<span class="line">my_map <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">:</span><span class="token number">123</span> <span class="token punctuation">,</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">:</span><span class="token string">&#39;hahahaha&#39;</span><span class="token punctuation">}</span></span>
<span class="line">f <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;/test.txt&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span></span>
<span class="line">pickle<span class="token punctuation">.</span>dump<span class="token punctuation">(</span>my_map<span class="token punctuation">,</span>f<span class="token punctuation">)</span></span>
<span class="line">f<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#反序列化</span></span>
<span class="line">f <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;/test.txt&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span></span>
<span class="line">my_map <span class="token operator">=</span> pickle<span class="token punctuation">.</span>load<span class="token punctuation">(</span>f<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>my_map<span class="token punctuation">)</span></span>
<span class="line">f<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="datetime模块-日期函数" tabindex="-1"><a class="header-anchor" href="#datetime模块-日期函数"><span>datetime模块：日期函数</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">import</span> datetime</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建日期</span></span>
<span class="line">now <span class="token operator">=</span> datetime<span class="token punctuation">.</span>date<span class="token punctuation">.</span>today<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#返回一个date对象，表示今天（不会具体到时分秒）</span></span>
<span class="line">now <span class="token operator">=</span> datetime<span class="token punctuation">.</span>date<span class="token punctuation">.</span>fromtimestamp<span class="token punctuation">(</span>timestamp<span class="token punctuation">)</span> <span class="token comment">#返回时间戳对应的date对象</span></span>
<span class="line">now <span class="token operator">=</span> date<span class="token punctuation">(</span><span class="token number">2025</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token comment">#生成2025-03-11</span></span>
<span class="line">nowtime <span class="token operator">=</span> datetime<span class="token punctuation">(</span><span class="token number">2025</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token comment">#生成2025-03-11</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 取出年、月、日</span></span>
<span class="line">now<span class="token punctuation">.</span>year </span>
<span class="line">now<span class="token punctuation">.</span>month</span>
<span class="line">now<span class="token punctuation">.</span>day </span>
<span class="line">nowtime<span class="token punctuation">.</span>year、month、day、hour、minute、second、microsecond、tzinfo <span class="token comment">#年、月、日、时、分、秒、毫秒、时区</span></span>
<span class="line">nowtime<span class="token punctuation">.</span>date<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#datetime转换为date</span></span>
<span class="line">nowtime<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#datetime转换为time</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 日期 与 字符串 格式转换</span></span>
<span class="line">date_str <span class="token operator">=</span> <span class="token string">&quot;2025-03-11&quot;</span></span>
<span class="line">parsed_date <span class="token operator">=</span> datetime<span class="token punctuation">.</span>strptime<span class="token punctuation">(</span>date_str<span class="token punctuation">,</span> <span class="token string">&quot;%Y-%m-%d&quot;</span><span class="token punctuation">)</span></span>
<span class="line">formatted_date <span class="token operator">=</span> parsed_date<span class="token punctuation">.</span>strftime<span class="token punctuation">(</span><span class="token string">&quot;%Y-%m-%d&quot;</span><span class="token punctuation">)</span>  <span class="token comment"># 输出：&#39;2025-03-11&#39;</span></span>
<span class="line">datestr <span class="token operator">=</span> now<span class="token punctuation">.</span>isoformat<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#返回格式如&#39;YYYY-MM-DD’的字符串；</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#日期计算</span></span>
<span class="line">yesterday <span class="token operator">=</span> datetime<span class="token punctuation">.</span>date<span class="token punctuation">.</span>today<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> datetime<span class="token punctuation">.</span>timedelta<span class="token punctuation">(</span>days<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>  </span>
<span class="line">lastyear <span class="token operator">=</span> datetime<span class="token punctuation">.</span>date<span class="token punctuation">.</span>today<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> datetime<span class="token punctuation">.</span>timedelta<span class="token punctuation">(</span>days<span class="token operator">=</span><span class="token number">365</span><span class="token punctuation">)</span>  </span>
<span class="line">yesterday <span class="token operator">=</span> datetime<span class="token punctuation">.</span>date<span class="token punctuation">.</span>today<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> timedelta<span class="token punctuation">(</span>days<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#日期比较</span></span>
<span class="line"><span class="token keyword">if</span> yesterday <span class="token operator">&lt;</span> today<span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> yesterday<span class="token punctuation">.</span>timestamp<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> now<span class="token punctuation">.</span>timestamp<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="random模块-生成随机数" tabindex="-1"><a class="header-anchor" href="#random模块-生成随机数"><span>random模块：生成随机数</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">import</span> random</span>
<span class="line">nums <span class="token operator">=</span> random<span class="token punctuation">.</span>sample<span class="token punctuation">(</span><span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token comment">#从0~100中生成10个随机数</span></span>
<span class="line">num <span class="token operator">=</span> random<span class="token punctuation">.</span>random<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#从0~1中生成1个随机数</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法"><span>语法</span></a></h2><h3 id="循环语句" tabindex="-1"><a class="header-anchor" href="#循环语句"><span>循环语句</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment">#for循环遍历</span></span>
<span class="line">fruits <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;gallahad&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;the pure&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;robin&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;the brave&#39;</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token keyword">for</span> fruit <span class="token keyword">in</span> fruits<span class="token punctuation">:</span> <span class="token comment">#for列表循环</span></span>
<span class="line"></span>
<span class="line">family <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;gallahad&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;the pure&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;robin&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;the brave&#39;</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">for</span> i<span class="token punctuation">,</span> v <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;tic&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;tac&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;toe&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token comment">#for列表循环：返回下标</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> v<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">for</span> q<span class="token punctuation">,</span> a <span class="token keyword">in</span> <span class="token builtin">zip</span><span class="token punctuation">(</span>questions<span class="token punctuation">,</span> answers<span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token comment">#for列表循环：同时遍历两个列表questions和answers</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;What is your {0}?  It is {1}.&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>q<span class="token punctuation">,</span> a<span class="token punctuation">)</span><span class="token punctuation">)</span> </span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> key<span class="token punctuation">,</span> value <span class="token keyword">in</span> family<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token comment">#for字典循环</span></span>
<span class="line"><span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">#数字循环（0,1,2,3,4）</span></span>
<span class="line"><span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">)</span> <span class="token comment">#数字循环，指定从5开始（5,6,7,8）</span></span>
<span class="line"><span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">#数字循环，指定从5开始，指定步长为2（5,7）</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">#while循环遍历</span></span>
<span class="line"><span class="token keyword">while</span> count <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">:</span> <span class="token comment">#while循环</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="条件语句" tabindex="-1"><a class="header-anchor" href="#条件语句"><span>条件语句</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment">#if 条件语句</span></span>
<span class="line"><span class="token keyword">if</span> a<span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">	<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">elif</span> a<span class="token operator">==</span><span class="token number">1</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">else</span> <span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">pass</span> <span class="token comment">#若不需要操作，则使用pass关键字，不能空着</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 示例2</span></span>
<span class="line"><span class="token keyword">if</span> a <span class="token operator">&gt;</span> <span class="token number">10</span> <span class="token keyword">and</span> a <span class="token operator">&lt;</span> <span class="token number">30</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;It is between 10 and 30!&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">elif</span> a<span class="token operator">&lt;</span><span class="token number">20</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;It is less than 20&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">else</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;I do not know!&#39;</span><span class="token punctuation">)</span> </span>
<span class="line">  </span>
<span class="line"><span class="token comment">#switch 条件语句</span></span>
<span class="line">status <span class="token operator">=</span> <span class="token string">&#39;haha&#39;</span></span>
<span class="line"><span class="token keyword">match</span> status<span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">case</span> <span class="token string">&#39;123&#39;</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token string">&#39;small&#39;</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">case</span> <span class="token string">&#39;456&#39;</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token string">&#39;big&#39;</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">case</span> <span class="token keyword">_</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token string">&#39;default&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="异常处理" tabindex="-1"><a class="header-anchor" href="#异常处理"><span>异常处理</span></a></h3><p>有哪些系统自带的异常？</p><ul><li>ZeroDivisionError 0作为了除数</li><li>NameError 未定义的属性</li><li>TypeError 类型不一致（比如&#39;2&#39;+2）</li></ul><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment">#try except异常处理</span></span>
<span class="line"><span class="token keyword">try</span><span class="token punctuation">:</span></span>
<span class="line">  x <span class="token operator">=</span> <span class="token number">1</span><span class="token operator">/</span><span class="token number">0</span></span>
<span class="line"><span class="token keyword">except</span> ZeroDivisionError <span class="token keyword">as</span> zdError<span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">pass</span></span>
<span class="line"><span class="token keyword">finally</span><span class="token punctuation">:</span>  <span class="token comment">#无论有无异常，都会执行else里面的代码</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#例子2</span></span>
<span class="line"><span class="token keyword">try</span><span class="token punctuation">:</span></span>
<span class="line">    x <span class="token operator">=</span> <span class="token string">&#39;2&#39;</span><span class="token operator">+</span><span class="token number">2</span></span>
<span class="line">    y <span class="token operator">=</span> <span class="token number">1</span><span class="token operator">/</span><span class="token number">0</span></span>
<span class="line"><span class="token keyword">except</span> TypeError <span class="token keyword">as</span> typerr<span class="token punctuation">:</span> <span class="token comment">#针对TypeError</span></span>
<span class="line">    <span class="token keyword">pass</span></span>
<span class="line"><span class="token keyword">except</span> NameError<span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">raise</span> Exception<span class="token punctuation">(</span><span class="token string">&#39;我是别的异常&#39;</span><span class="token punctuation">)</span> <span class="token comment">#抛出自定义的异常</span></span>
<span class="line"><span class="token keyword">except</span><span class="token punctuation">:</span> <span class="token comment">#针对其他异常</span></span>
<span class="line">    <span class="token keyword">raise</span> <span class="token comment">#不处理，抛出给上层</span></span>
<span class="line"><span class="token keyword">else</span><span class="token punctuation">:</span>  <span class="token comment">#没有抛错误则执行</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;没有异常&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">finally</span><span class="token punctuation">:</span> <span class="token comment">#抛不抛错误都会执行</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;无论如何都会执行&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">##多个异常</span></span>
<span class="line"><span class="token keyword">except</span> <span class="token punctuation">(</span>ZeroDivisionError<span class="token punctuation">,</span>NameError<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token keyword">pass</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">##手工抛出异常</span></span>
<span class="line"><span class="token keyword">raise</span> Exception</span>
<span class="line"></span>
<span class="line"><span class="token comment">## 手工抛出异常（带参数）</span></span>
<span class="line"><span class="token keyword">raise</span> Exception<span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">,</span><span class="token number">123</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件操作" tabindex="-1"><a class="header-anchor" href="#文件操作"><span>文件操作</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment">#%% 文件操作</span></span>
<span class="line"><span class="token comment">#打开文件</span></span>
<span class="line">f <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span>mode<span class="token punctuation">)</span> </span>
<span class="line">f <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;/tmp/foo1.txt&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;w&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment"># mode: </span></span>
<span class="line"><span class="token comment"># r(只读) rb(二进制格式只读) r+(读写) rb+   注意：若文件不存在，r不会创建文件</span></span>
<span class="line"><span class="token comment"># w(只写) wb w+ wb+                      注意：文件不存在会新增；会覆盖原有文件</span></span>
<span class="line"><span class="token comment"># a(追加) ab a+ ab+                      注意：文件不存在会新增；在原有内容后追加</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#关闭文件</span></span>
<span class="line">f<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#写入内容</span></span>
<span class="line">f<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&#39;哈哈哈&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#读取所有内容</span></span>
<span class="line"><span class="token builtin">str</span> <span class="token operator">=</span> f<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#读取一行内容</span></span>
<span class="line"><span class="token builtin">str</span> <span class="token operator">=</span> f<span class="token punctuation">.</span>readline<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#读取所有行内容（返回List&lt;String&gt;）</span></span>
<span class="line">strs <span class="token operator">=</span> f<span class="token punctuation">.</span>readlines<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#with：预定义的清理行为，会自动关闭文件</span></span>
<span class="line"><span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;file.txt&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">for</span> line <span class="token keyword">in</span> f<span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span>line<span class="token punctuation">,</span>end<span class="token operator">=</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span></span>
<span class="line">        </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="包" tabindex="-1"><a class="header-anchor" href="#包"><span>包</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment">#%% 包</span></span>
<span class="line"><span class="token comment"># 包是模块的集合，相当于是一个命名空间，可避免模块重名</span></span>
<span class="line"><span class="token comment"># 包与模块的结构如下：</span></span>
<span class="line"><span class="token comment"># /api   #包名</span></span>
<span class="line"><span class="token comment">#   /__init__.py  #每个包必须要有的初始化脚本</span></span>
<span class="line"><span class="token comment">#   /test1.py  #test1模块</span></span>
<span class="line"><span class="token comment">#   /sub-api   #子包</span></span>
<span class="line"><span class="token comment">#     /__init__.py </span></span>
<span class="line"><span class="token comment">#     /test1.py  #子包里的test1模块</span></span>
<span class="line"><span class="token comment">#	  /test2.py </span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#导入包中的模块</span></span>
<span class="line"><span class="token keyword">import</span> api<span class="token punctuation">.</span>test1<span class="token punctuation">,</span>api<span class="token punctuation">.</span>sub<span class="token operator">-</span>api<span class="token punctuation">.</span>test2</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pass语句" tabindex="-1"><a class="header-anchor" href="#pass语句"><span>pass语句</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment">#%% pass语句</span></span>
<span class="line"><span class="token comment">#pass不作任何操作，只用于占位。如空类、空循环。</span></span>
<span class="line"><span class="token keyword">while</span> true<span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">pass</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">Test</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">pass</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line">x<span class="token punctuation">,</span>y<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span></span>
<span class="line"><span class="token keyword">match</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span>y<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">  </span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">#换行：需要加&quot;\\&quot;</span></span>
<span class="line">total <span class="token operator">=</span> item_one <span class="token operator">+</span> \\</span>
<span class="line">item_two <span class="token operator">+</span> \\</span>
<span class="line">item_three</span>
<span class="line"><span class="token comment">#等待用户输入</span></span>
<span class="line"><span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;按下 enter 键后退出。&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">#函数</span></span>
<span class="line"><span class="token builtin">len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#列表or元组 元素个数</span></span>
<span class="line"><span class="token comment">#匿名函数</span></span>
<span class="line"><span class="token builtin">sum</span> <span class="token operator">=</span> <span class="token keyword">lambda</span> arg1<span class="token punctuation">,</span> arg2<span class="token punctuation">:</span> arg1 <span class="token operator">+</span> arg2</span>
<span class="line"><span class="token comment">#调用： sum(5,10) #输出15</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#### 模块</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#导入整个模块</span></span>
<span class="line"><span class="token keyword">import</span> somemodule</span>
<span class="line">firstfunc<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#调用函数</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#导入某些函数</span></span>
<span class="line"><span class="token keyword">from</span> somemodule <span class="token keyword">import</span> firstfunc<span class="token punctuation">,</span> secondfunc<span class="token punctuation">,</span> thirdfunc</span>
<span class="line">firstfunc<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#调用函数</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="内置函数" tabindex="-1"><a class="header-anchor" href="#内置函数"><span>内置函数</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment">#input:获取用户命令行输入</span></span>
<span class="line">s <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&#39;input:&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="faq" tabindex="-1"><a class="header-anchor" href="#faq"><span>FAQ</span></a></h2><ul><li>解包、打包是什么</li><li>推导式是什么（列表推导式、集合推导式...）</li></ul>`,69)]))}const o=s(t,[["render",l]]),u=JSON.parse('{"path":"/python/python3.html","title":"Python3","lang":"en-US","frontmatter":{"title":"Python3","sidebar":"heading","sidebarDepth":2},"git":{"updatedTime":1750240340000,"contributors":[{"name":"dongyz8","username":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":5,"url":"https://github.com/dongyz8"}],"changelog":[{"hash":"ad8fc1a188d6829c38676e985c8e2097211af10d","time":1750240340000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"c418c7de7bdfacd1d7afeb22790bb7a55213e6d8","time":1744967425000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"5c9ebb4a07b7856d42550142a45aa8d9327f347c","time":1743157920000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"5db2da61cea53db1b2bf3488c5a26b3b0b7887a7","time":1741342679000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"45b5590437faf102707a4627c085a1bcba76a5a3","time":1740293597000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"}]},"filePathRelative":"python/python3.md"}');export{o as comp,u as data};
