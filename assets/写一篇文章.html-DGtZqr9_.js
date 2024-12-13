import{_ as s,c as e,e as a,o as i}from"./app-CVA42f6w.js";const t={};function l(d,n){return i(),e("div",null,n[0]||(n[0]=[a(`<h1 id="写第一篇文章" tabindex="-1"><a class="header-anchor" href="#写第一篇文章"><span>写第一篇文章</span></a></h1><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>note（根目录）
└—docs 
  └——.vuepress 
    ├———— public         
    └———— config.js      
  ├——README.md              
  └—— firstArticle   #在docs下新建文件夹（任意命名）
    └———— README.md  #创建README.md
├—node_modules
├—package.json
└—package-lock.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在/firstArticle/README.md 写下你文章的内容</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>
<span class="token title important"><span class="token punctuation">#</span> 第一篇文章</span>

Helloworld！
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在导航栏中添加跳转按钮</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">nav</span><span class="token operator">:</span><span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;第一篇文章&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/firstArticle/&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启项目</p><div class="language-cmd line-numbers-mode" data-ext="cmd" data-title="cmd"><pre class="language-cmd"><code>npm run docs:dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>访问项目<code>localhost:8080</code>，发现导航栏多了一个按钮，点击进去就是你的文章！</p>`,9)]))}const r=s(t,[["render",l],["__file","写一篇文章.html.vue"]]),p=JSON.parse('{"path":"/azilnote/%E5%86%99%E4%B8%80%E7%AF%87%E6%96%87%E7%AB%A0.html","title":"写第一篇文章","lang":"en-US","frontmatter":{"title":"写第一篇文章"},"headers":[],"git":{"updatedTime":1734073104000,"contributors":[{"name":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":1}]},"filePathRelative":"azilnote/写一篇文章.md"}');export{r as comp,p as data};
