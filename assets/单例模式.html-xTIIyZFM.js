import{_ as s,c as a,e,o as p}from"./app-BNNcboHM.js";const t={};function i(l,n){return p(),a("div",null,n[0]||(n[0]=[e(`<h1 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式"><span>单例模式</span></a></h1><h2 id="描述" tabindex="-1"><a class="header-anchor" href="#描述"><span>描述</span></a></h2><p>控制一个类仅能产生一个实例。</p><ul><li>懒汉式：类加载时不会生成实例，只有在调用时才会生成实例。</li><li>饿汉式：类加载时便会生成实例。</li></ul><p>类名一般为：xxxSingleton</p><h2 id="代码实现示例" tabindex="-1"><a class="header-anchor" href="#代码实现示例"><span>代码实现示例</span></a></h2><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 最优实现：饿汉式-枚举（在Spring环境下）
 */</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">MySingletonEnum</span><span class="token punctuation">{</span>
    <span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    
    <span class="token keyword">private</span> <span class="token class-name">MyService</span> myService<span class="token punctuation">;</span>
    
    <span class="token keyword">private</span> <span class="token class-name">MySingletonEnum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        myService <span class="token operator">=</span> <span class="token class-name">ApplicationContextUtil</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">MyService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">answer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> myService<span class="token punctuation">.</span><span class="token function">answer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//调用：MySingletonEnum.INSTANCE.answer();</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
* 推荐实现：懒汉式-静态内部类
**/</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SingletonHolder</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Singleton</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getUniqueInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SingletonHolder</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
* 饿汉式-线程安全
**/</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> uniqueInstance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getUniqueInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> uniqueInstance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token doc-comment comment">/**
* 懒汉式-线程安全-双重校验锁
**/</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> uniqueInstance<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getUniqueInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>uniqueInstance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>uniqueInstance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    uniqueInstance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> uniqueInstance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token doc-comment comment">/**
* 懒汉式-线程不安全
**/</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> uniqueInstance<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getUniqueInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>uniqueInstance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            uniqueInstance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> uniqueInstance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实际应用场景" tabindex="-1"><a class="header-anchor" href="#实际应用场景"><span>实际应用场景</span></a></h2><h2 id="faq" tabindex="-1"><a class="header-anchor" href="#faq"><span>FAQ</span></a></h2><h3 id="spring-bean-实例默认是单例的吗" tabindex="-1"><a class="header-anchor" href="#spring-bean-实例默认是单例的吗"><span>Spring Bean 实例默认是单例的吗？</span></a></h3><h3 id="单例类如果不想注册到spring-但又需要依赖spring-bean-应该怎么写" tabindex="-1"><a class="header-anchor" href="#单例类如果不想注册到spring-但又需要依赖spring-bean-应该怎么写"><span>单例类如果不想注册到Spring，但又需要依赖Spring Bean，应该怎么写？</span></a></h3>`,11)]))}const o=s(t,[["render",i],["__file","单例模式.html.vue"]]),u=JSON.parse('{"path":"/designPattern/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.html","title":"单例模式","lang":"en-US","frontmatter":{"title":"单例模式","sidebarDepth":0},"headers":[{"level":2,"title":"描述","slug":"描述","link":"#描述","children":[]},{"level":2,"title":"代码实现示例","slug":"代码实现示例","link":"#代码实现示例","children":[]},{"level":2,"title":"实际应用场景","slug":"实际应用场景","link":"#实际应用场景","children":[]},{"level":2,"title":"FAQ","slug":"faq","link":"#faq","children":[{"level":3,"title":"Spring Bean 实例默认是单例的吗？","slug":"spring-bean-实例默认是单例的吗","link":"#spring-bean-实例默认是单例的吗","children":[]},{"level":3,"title":"单例类如果不想注册到Spring，但又需要依赖Spring Bean，应该怎么写？","slug":"单例类如果不想注册到spring-但又需要依赖spring-bean-应该怎么写","link":"#单例类如果不想注册到spring-但又需要依赖spring-bean-应该怎么写","children":[]}]}],"git":{"updatedTime":1735622789000,"contributors":[{"name":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":1}]},"filePathRelative":"designPattern/单例模式.md"}');export{o as comp,u as data};
