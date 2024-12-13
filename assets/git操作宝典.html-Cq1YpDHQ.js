import{_ as t,c as i,e as a,o as s}from"./app-CVA42f6w.js";const n={};function d(r,e){return s(),i("div",null,e[0]||(e[0]=[a(`<h1 id="git操作宝典" tabindex="-1"><a class="header-anchor" href="#git操作宝典"><span>git操作宝典</span></a></h1><h2 id="远程代码覆盖本地-reset" tabindex="-1"><a class="header-anchor" href="#远程代码覆盖本地-reset"><span>远程代码覆盖本地（reset）</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>git reset --hard origin/master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="暂存本地的更改-stash" tabindex="-1"><a class="header-anchor" href="#暂存本地的更改-stash"><span>暂存本地的更改（stash）</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#暂存
git stash
#恢复
git stash pop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="撤销某次提交-revert" tabindex="-1"><a class="header-anchor" href="#撤销某次提交-revert"><span>撤销某次提交（revert）</span></a></h2><p>原理是“反做”，即对那次提交修改过的所有文件，生成一个逆向的修改记录</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># 撤销
git revert -n 版本号 
# 提交
git commit -m 版本名 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="回退到某个版本-reset" tabindex="-1"><a class="header-anchor" href="#回退到某个版本-reset"><span>回退到某个版本（reset）</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># 查看版本号
git log
# 回退到目标版本
git reset --hard 目标版本号
# 强制推送
git push -f 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10)]))}const c=t(n,[["render",d],["__file","git操作宝典.html.vue"]]),v=JSON.parse('{"path":"/devops/git/git%E6%93%8D%E4%BD%9C%E5%AE%9D%E5%85%B8.html","title":"git操作宝典","lang":"en-US","frontmatter":{"title":"git操作宝典"},"headers":[{"level":2,"title":"远程代码覆盖本地（reset）","slug":"远程代码覆盖本地-reset","link":"#远程代码覆盖本地-reset","children":[]},{"level":2,"title":"暂存本地的更改（stash）","slug":"暂存本地的更改-stash","link":"#暂存本地的更改-stash","children":[]},{"level":2,"title":"撤销某次提交（revert）","slug":"撤销某次提交-revert","link":"#撤销某次提交-revert","children":[]},{"level":2,"title":"回退到某个版本（reset）","slug":"回退到某个版本-reset","link":"#回退到某个版本-reset","children":[]}],"git":{"updatedTime":1734073104000,"contributors":[{"name":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":1}]},"filePathRelative":"devops/git/git操作宝典.md"}');export{c as comp,v as data};
