import{_ as s,c as a,a as e,o as p}from"./app-iMoEB5u2.js";const l={};function i(c,n){return p(),a("div",null,n[0]||(n[0]=[e(`<h1 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式"><span>单例模式</span></a></h1><h2 id="描述" tabindex="-1"><a class="header-anchor" href="#描述"><span>描述</span></a></h2><p>控制一个类仅能产生一个实例。</p><ul><li>懒汉式：类加载时不会生成实例，只有在调用时才会生成实例。</li><li>饿汉式：类加载时便会生成实例。</li></ul><p>类名一般为：xxxSingleton</p><h2 id="代码实现示例" tabindex="-1"><a class="header-anchor" href="#代码实现示例"><span>代码实现示例</span></a></h2><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre><code class="language-java"><span class="line"><span class="token doc-comment comment">/**</span>
<span class="line"> * 最优实现：饿汉式-枚举（在Spring环境下）</span>
<span class="line"> */</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">MySingletonEnum</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token constant">INSTANCE</span><span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">MyService</span> myService<span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">MySingletonEnum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        myService <span class="token operator">=</span> <span class="token class-name">ApplicationContextUtil</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">MyService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    </span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">answer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> myService<span class="token punctuation">.</span><span class="token function">answer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    </span>
<span class="line">    <span class="token comment">//调用：MySingletonEnum.INSTANCE.answer();</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token doc-comment comment">/**</span>
<span class="line">* 推荐实现：懒汉式-静态内部类</span>
<span class="line"> * 静态内部类的作用是：延迟加载&amp;线程安全</span>
<span class="line"> * 因为Singleton被加载时，静态内部类SingletonHolder不会被加载</span>
<span class="line"> * 而是等到getUniqueInstance()被调用时，才会被加载。</span>
<span class="line">**/</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SingletonHolder</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Singleton</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getUniqueInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token class-name">SingletonHolder</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token doc-comment comment">/**</span>
<span class="line">* 饿汉式-线程安全</span>
<span class="line">**/</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> uniqueInstance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getUniqueInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> uniqueInstance<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token doc-comment comment">/**</span>
<span class="line">* 懒汉式-线程安全-双重校验锁</span>
<span class="line">**/</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> uniqueInstance<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getUniqueInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>uniqueInstance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">if</span> <span class="token punctuation">(</span>uniqueInstance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    uniqueInstance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">return</span> uniqueInstance<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token doc-comment comment">/**</span>
<span class="line">* 懒汉式-线程不安全</span>
<span class="line">**/</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> uniqueInstance<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getUniqueInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>uniqueInstance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            uniqueInstance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">return</span> uniqueInstance<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实际应用场景" tabindex="-1"><a class="header-anchor" href="#实际应用场景"><span>实际应用场景</span></a></h2><h2 id="faq" tabindex="-1"><a class="header-anchor" href="#faq"><span>FAQ</span></a></h2><h3 id="spring-bean-实例默认是单例的吗" tabindex="-1"><a class="header-anchor" href="#spring-bean-实例默认是单例的吗"><span>Spring Bean 实例默认是单例的吗？</span></a></h3><p>Spring Bean实例默认是单例的。</p><h3 id="单例类如果不想注册到spring-但又需要依赖spring-bean-应该怎么写" tabindex="-1"><a class="header-anchor" href="#单例类如果不想注册到spring-但又需要依赖spring-bean-应该怎么写"><span>单例类如果不想注册到Spring，但又需要依赖Spring Bean，应该怎么写？</span></a></h3><p>1.使用Spring的ApplicationContext：可以通过ApplicationContext获取Spring Bean实例。 2.使用Spring的依赖注入：可以使用Spring的依赖注入机制，通过构造函数或setter方法注入Spring Bean实例。</p>`,13)]))}const o=s(l,[["render",i]]),u=JSON.parse('{"path":"/designPattern/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.html","title":"单例模式","lang":"en-US","frontmatter":{"title":"单例模式","sidebarDepth":0},"git":{"updatedTime":1739849131000,"contributors":[{"name":"dongyz8","username":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":3,"url":"https://github.com/dongyz8"}],"changelog":[{"hash":"c97979e28496bfd6a49b98c58b764b3950f0de75","time":1739849131000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"c99267f1ba6ef14faa33acf1026d38fe3d5de16f","time":1697004430000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"c134bd6d46aca8a064a19bb65704fbff919268a4","time":1690885984000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"}]},"filePathRelative":"designPattern/单例模式.md"}');export{o as comp,u as data};
