import{_ as s,c as a,e,o as t}from"./app-BNNcboHM.js";const c={};function p(l,n){return t(),a("div",null,n[0]||(n[0]=[e(`<h1 id="观察者模式" tabindex="-1"><a class="header-anchor" href="#观察者模式"><span>观察者模式</span></a></h1><h2 id="描述" tabindex="-1"><a class="header-anchor" href="#描述"><span>描述</span></a></h2><p><strong>场景：</strong><br> 当某个事件发生后，一些类需要对该事件进行响应（我们称为观察者）。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span><span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//...</span>
    
    <span class="token comment">//事件发生</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>success<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//观察者类对事件进行响应</span>
        classA<span class="token punctuation">.</span><span class="token function">responseEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        classB<span class="token punctuation">.</span><span class="token function">responseEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样写会非常麻烦，若事件在其他代码里面也会发生，那么当需要增删观察者时，就要改很多地方。此时，观察者模式发挥作用。</p><h2 id="代码实现示例" tabindex="-1"><a class="header-anchor" href="#代码实现示例"><span>代码实现示例</span></a></h2><p>我们可定义一个“观察者注册中心”类，维护观察者列表；当事件发生后，由该注册中心统一通知观察者去响应。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**观察者注册中心**/</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyObservable</span> <span class="token keyword">extends</span> <span class="token class-name">Observable</span><span class="token punctuation">{</span>

    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Observer</span><span class="token punctuation">&gt;</span></span> list<span class="token punctuation">;</span>
    <span class="token keyword">boolean</span> isChange<span class="token punctuation">;</span>
    
    <span class="token doc-comment comment">/**添加观察者**/</span>
    <span class="token keyword">void</span> <span class="token function">addObserver</span><span class="token punctuation">(</span><span class="token class-name">Observer</span> o<span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
    
    <span class="token doc-comment comment">/**通知观察者**/</span>
    <span class="token keyword">void</span> <span class="token function">notifyObservers</span><span class="token punctuation">(</span><span class="token class-name">Object</span> arg<span class="token punctuation">)</span><span class="token punctuation">{</span>
    
    <span class="token punctuation">}</span>
    
    <span class="token doc-comment comment">/**设置修改标志，当标志改变时，才通知观察者**/</span>
    <span class="token keyword">void</span> <span class="token function">setChange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**观察者**/</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyObserver</span> <span class="token keyword">extends</span> <span class="token class-name">Observer</span><span class="token punctuation">{</span>
  <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token class-name">Observable</span> o<span class="token punctuation">,</span><span class="token class-name">Object</span> arg<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，Observable和Observer都是JAVA提供的观察者模式的API。</p><h2 id="实际应用场景" tabindex="-1"><a class="header-anchor" href="#实际应用场景"><span>实际应用场景</span></a></h2><h2 id="faq" tabindex="-1"><a class="header-anchor" href="#faq"><span>FAQ</span></a></h2>`,11)]))}const o=s(c,[["render",p],["__file","观察者模式.html.vue"]]),d=JSON.parse('{"path":"/designPattern/%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F.html","title":"观察者模式","lang":"en-US","frontmatter":{"title":"观察者模式","sidebarDepth":0},"headers":[{"level":2,"title":"描述","slug":"描述","link":"#描述","children":[]},{"level":2,"title":"代码实现示例","slug":"代码实现示例","link":"#代码实现示例","children":[]},{"level":2,"title":"实际应用场景","slug":"实际应用场景","link":"#实际应用场景","children":[]},{"level":2,"title":"FAQ","slug":"faq","link":"#faq","children":[]}],"git":{"updatedTime":1735622789000,"contributors":[{"name":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":1}]},"filePathRelative":"designPattern/观察者模式.md"}');export{o as comp,d as data};
