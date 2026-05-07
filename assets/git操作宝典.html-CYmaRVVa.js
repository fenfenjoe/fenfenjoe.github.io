import{_ as n,c as a,a as e,o as i}from"./app-f85V2jE5.js";const l={};function c(t,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="git操作宝典" tabindex="-1"><a class="header-anchor" href="#git操作宝典"><span>git操作宝典</span></a></h1><h2 id="远程代码覆盖本地-reset" tabindex="-1"><a class="header-anchor" href="#远程代码覆盖本地-reset"><span>远程代码覆盖本地（reset）</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">git reset --hard origin/master</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="暂存本地的更改-stash" tabindex="-1"><a class="header-anchor" href="#暂存本地的更改-stash"><span>暂存本地的更改（stash）</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#暂存</span>
<span class="line">git stash</span>
<span class="line">#恢复</span>
<span class="line">git stash pop</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="撤销某次提交-revert" tabindex="-1"><a class="header-anchor" href="#撤销某次提交-revert"><span>撤销某次提交（revert）</span></a></h2><p>原理是“反做”，即对那次提交修改过的所有文件，生成一个逆向的修改记录</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 撤销</span>
<span class="line">git revert -n 版本号 </span>
<span class="line"># 提交</span>
<span class="line">git commit -m 版本名 </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="回退到某个版本-reset" tabindex="-1"><a class="header-anchor" href="#回退到某个版本-reset"><span>回退到某个版本（reset）</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 查看版本号</span>
<span class="line">git log</span>
<span class="line"># 回退到目标版本</span>
<span class="line">git reset --hard 目标版本号</span>
<span class="line"># 强制推送</span>
<span class="line">git push -f </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="关于merge的选择" tabindex="-1"><a class="header-anchor" href="#关于merge的选择"><span>关于merge的选择</span></a></h2><ul><li><p><strong>Merge Commit</strong>：保留完整历史，但会产生合并提交。适合公共项目或需要清晰记录分支合并的情况。</p></li><li><p><strong>Squash and Merge</strong>：将所有提交压缩成一个新提交并入主分支。保持主分支历史线性整洁，是许多团队的默认选择。</p></li><li><p><strong>Rebase and Merge</strong>：将分支提交变基后并入，历史最线性，但操作需谨慎。</p></li></ul><h2 id="获取远程仓库更新-fetch" tabindex="-1"><a class="header-anchor" href="#获取远程仓库更新-fetch"><span>获取远程仓库更新（fetch）</span></a></h2><p><code>fetch</code> 用于从远程仓库下载最新的提交记录和分支信息，但<strong>不会自动合并</strong>到本地分支。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 获取所有远程分支的更新</span></span>
<span class="line"><span class="token function">git</span> fetch origin</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取指定分支的更新</span></span>
<span class="line"><span class="token function">git</span> fetch origin master</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>作用说明</strong>：</p><ul><li>安全地查看远程仓库的变化，不影响本地工作区</li><li>获取后可以先查看差异 <code>git diff origin/master</code>，再决定是否合并</li><li>常与 <code>git merge</code> 或 <code>git rebase</code> 配合使用</li><li>区别于 <code>git pull</code>：<code>pull = fetch + merge</code></li></ul><h2 id="切换分支和检出文件-checkout" tabindex="-1"><a class="header-anchor" href="#切换分支和检出文件-checkout"><span>切换分支和检出文件（checkout）</span></a></h2><p><code>checkout</code> 是一个多功能命令，主要用于切换分支、创建分支或恢复文件。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 切换到已存在的分支</span></span>
<span class="line"><span class="token function">git</span> checkout master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建并切换到新分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> new-branch</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 基于远程分支创建本地分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> master origin/master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 强制切换分支（放弃本地未提交的修改）</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-f</span> master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 恢复某个文件到最新提交的状态</span></span>
<span class="line"><span class="token function">git</span> checkout -- filename.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 恢复整个工作区到最新提交的状态</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token builtin class-name">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 切换到指定提交（进入游离HEAD状态）</span></span>
<span class="line"><span class="token function">git</span> checkout commit-hash</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>作用说明</strong>：</p><ul><li>切换分支：在不同功能开发之间切换</li><li>创建分支：快速基于当前或远程分支创建新分支</li><li>恢复文件：撤销未提交的修改（慎用，修改会丢失）</li><li><strong>注意</strong>：Git 2.23+ 推荐使用 <code>git switch</code> 切换分支，<code>git restore</code> 恢复文件</li></ul><h2 id="设置分支跟踪关系-set-upstream" tabindex="-1"><a class="header-anchor" href="#设置分支跟踪关系-set-upstream"><span>设置分支跟踪关系（set-upstream）</span></a></h2><p>建立本地分支与远程分支的跟踪关系，简化后续 <code>push</code> 和 <code>pull</code> 操作。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 设置当前分支跟踪远程分支</span></span>
<span class="line"><span class="token function">git</span> branch --set-upstream-to<span class="token operator">=</span>origin/master master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 简写方式</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-u</span> origin/master master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 在推送时同时设置跟踪关系</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-u</span> origin master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看所有分支的跟踪关系</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-vv</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>作用说明</strong>：</p><ul><li>建立跟踪关系后，直接使用 <code>git pull</code> 和 <code>git push</code> 无需指定远程分支</li><li>适用于从 ZIP 包初始化的仓库，需要手动建立关联</li><li>查看跟踪状态：<code>git branch -vv</code> 会显示类似 <code>[origin/master]</code> 的信息</li></ul><h2 id="管理远程仓库地址-remote" tabindex="-1"><a class="header-anchor" href="#管理远程仓库地址-remote"><span>管理远程仓库地址（remote）</span></a></h2><p>用于添加、修改、删除和查看远程仓库的配置。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看所有远程仓库</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token parameter variable">-v</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加远程仓库</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token function">add</span> origin git@github.com:username/repo.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改远程仓库地址（SSH改为HTTPS）</span></span>
<span class="line"><span class="token function">git</span> remote set-url origin https://github.com/username/repo.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改远程仓库地址（HTTPS改为SSH）</span></span>
<span class="line"><span class="token function">git</span> remote set-url origin git@github.com:username/repo.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除远程仓库</span></span>
<span class="line"><span class="token function">git</span> remote remove origin</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重命名远程仓库</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token function">rename</span> origin upstream</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看远程仓库详细信息</span></span>
<span class="line"><span class="token function">git</span> remote show origin</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>作用说明</strong>：</p><ul><li><strong>添加远程仓库</strong>：本地仓库与远程仓库建立连接</li><li><strong>修改地址</strong>：切换 SSH/HTTPS 协议，或更换仓库地址</li><li><strong>删除远程仓库</strong>：移除不再使用的远程连接</li><li><strong>常见场景</strong>： <ul><li>SSH 速度快但需配置密钥，HTTPS 方便但每次需输入密码</li><li>Fork 的项目通常会添加两个远程仓库：<code>origin</code>（自己的）和 <code>upstream</code>（原项目）</li></ul></li></ul><h2 id="查看提交历史-log" tabindex="-1"><a class="header-anchor" href="#查看提交历史-log"><span>查看提交历史（log）</span></a></h2><p>查看项目的提交历史记录，了解代码演变过程。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看完整提交历史</span></span>
<span class="line"><span class="token function">git</span> log</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看简洁的单行提交历史</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--oneline</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看最近5条提交</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">-5</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看提交历史图形化展示</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--graph</span> <span class="token parameter variable">--all</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看某个文件的提交历史</span></span>
<span class="line"><span class="token function">git</span> log -- filename.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看某个作者的提交</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--author</span><span class="token operator">=</span><span class="token string">&quot;username&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看指定日期范围的提交</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--since</span><span class="token operator">=</span><span class="token string">&quot;2024-01-01&quot;</span> <span class="token parameter variable">--until</span><span class="token operator">=</span><span class="token string">&quot;2024-12-31&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>作用说明</strong>：</p><ul><li>查看项目历史，了解代码变更</li><li>找到需要回退或恢复的版本号</li><li>追踪某个文件的修改历史</li><li>审查团队成员的提交记录</li></ul>`,37)]))}const r=n(l,[["render",c]]),d=JSON.parse('{"path":"/devops/git/git%E6%93%8D%E4%BD%9C%E5%AE%9D%E5%85%B8.html","title":"git操作宝典","lang":"en-US","frontmatter":{"title":"git操作宝典","sidebar":"heading"},"git":{"updatedTime":1777364918000,"contributors":[{"name":"dongyz8","username":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":7,"url":"https://github.com/dongyz8"}],"changelog":[{"hash":"8224cd584314c32442d3185b0e15e6eb73384d2b","time":1777364918000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"8ff7f4871c26d89feefc32f0c5f2782cb792c4a1","time":1767954655000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"ad8fc1a188d6829c38676e985c8e2097211af10d","time":1750240340000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"45b5590437faf102707a4627c085a1bcba76a5a3","time":1740293597000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"8f077c536b5e7f2af222b7b28b24c4d82f0bb36e","time":1730455849000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"a124420178706444697801263f1005096bad2c82","time":1728468221000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"57c0f68774482d65619628af9c2a0a6475f91038","time":1726309320000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"}]},"filePathRelative":"devops/git/git操作宝典.md"}');export{r as comp,d as data};
