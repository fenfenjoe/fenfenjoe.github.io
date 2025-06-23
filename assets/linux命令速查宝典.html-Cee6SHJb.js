import{_ as n,c as a,a as e,o as l}from"./app-iMoEB5u2.js";const i={};function p(c,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="linux运维速查宝典" tabindex="-1"><a class="header-anchor" href="#linux运维速查宝典"><span>Linux运维速查宝典</span></a></h1><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h2><h3 id="查看当前进程状态-【ps】" tabindex="-1"><a class="header-anchor" href="#查看当前进程状态-【ps】"><span>查看当前进程状态：【ps】</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">ps aux|grep ktin </span>
<span class="line">//查看包含&quot;ktin&quot;字眼的进程的信息，其中第2列为PID</span>
<span class="line"></span>
<span class="line">ps -ef|grep srm-esb-*</span>
<span class="line">//查看以srm-esb-开头的进程的信息</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看磁盘占用情况-【df】" tabindex="-1"><a class="header-anchor" href="#查看磁盘占用情况-【df】"><span>查看磁盘占用情况：【df】</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">df -h</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="查看负载、内存、进程-【top】" tabindex="-1"><a class="header-anchor" href="#查看负载、内存、进程-【top】"><span>查看负载、内存、进程：【top】</span></a></h3><p>示例：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 该行跟命令uptime显示的内容相同。</span>
<span class="line"># up 2 days：已使用2天</span>
<span class="line"># 3 users：有3个当前用户</span>
<span class="line"># load average：1分钟内、10分钟内、15分钟内系统的平均负载。</span>
<span class="line">#</span>
<span class="line">top - 16:14:33 up 2 days, 4:27, 3 users, load average: 0.00, 0.01, 0.02</span>
<span class="line"></span>
<span class="line">Tasks: 199 total, 1 running, 198 sleeping, 0 stopped, 0 zombie</span>
<span class="line"></span>
<span class="line">%Cpu(s): 0.0 us, 0.2 sy, 0.0 ni, 99.8 id, 0.0 wa, 0.0 hi, 0.0 si, 0.0 st</span>
<span class="line"></span>
<span class="line">MiB Mem : 5959.4 total, 3277.3 free, 776.4 used, 1905.8 buff/cache</span>
<span class="line"></span>
<span class="line">MiB Swap: 2048.0 total, 2048.0 free, 0.0 used. 4878.4 avail Mem</span>
<span class="line"></span>
<span class="line"> </span>
<span class="line"></span>
<span class="line"># PID — 进程id</span>
<span class="line"># USER — 进程所有者</span>
<span class="line"># PR — 进程优先级</span>
<span class="line"># NI — nice值。负值表示高优先级，正值表示低优先级</span>
<span class="line"># VIRT — 进程使用的虚拟内存总量，单位kb。VIRT=SWAP+RES</span>
<span class="line"># RES — 进程使用的、未被换出的物理内存大小，单位kb。RES=CODE+DATASHR — 共享内存大小，单位kb</span>
<span class="line"># S —进程状态。D=不可中断的睡眠状态 R=运行 S=睡眠 T=跟踪/停止 Z=僵尸进程</span>
<span class="line"># %CPU — 上次更新到现在的CPU时间占用百分比</span>
<span class="line"># %MEM — 进程使用的物理内存百分比</span>
<span class="line"># TIME+ — 进程使用的CPU时间总计，单位1/100秒</span>
<span class="line"># COMMAND — 进程名称（命令名/命令行）</span>
<span class="line"></span>
<span class="line">  PID USER PR NI VIRT RES SHR S %CPU %MEM TIME+ COMMAND</span>
<span class="line"></span>
<span class="line">23026 alvin 20 0 46340 7820 6504 S 0.0 0.1 0:00.05 systemd</span>
<span class="line"></span>
<span class="line">23033 alvin 20 0 149660 3140 72 S 0.0 0.1 0:00.00 (sd-pam)</span>
<span class="line"></span>
<span class="line">23125 alvin 20 0 63396 5100 4092 S 0.0 0.1 0:00.00 sshd</span>
<span class="line"></span>
<span class="line">23128 alvin 20 0 16836 5636 4284 S 0.0 0.1 0:00.03 zsh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看端口占用情况-【netstat】" tabindex="-1"><a class="header-anchor" href="#查看端口占用情况-【netstat】"><span>查看端口占用情况:【netstat】</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#查看某个端口</span></span>
<span class="line"><span class="token function">lsof</span> <span class="token parameter variable">-i:8080</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#查看所有端口</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-tunlp</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件查找-【find】" tabindex="-1"><a class="header-anchor" href="#文件查找-【find】"><span>文件查找：【find】</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 默认从当前目录查找；查找时默认包括子目录；</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 1.按文件名查找  </span></span>
<span class="line"><span class="token function">find</span> test.txt  </span>
<span class="line"><span class="token comment"># 在当前目录下查找test.txt文件  </span></span>
<span class="line"><span class="token function">find</span> / <span class="token parameter variable">-name</span> httpd.conf  </span>
<span class="line"><span class="token comment"># 在根目录下查找文件httpd.conf  </span></span>
<span class="line"><span class="token function">find</span> /etc <span class="token parameter variable">-name</span> <span class="token string">&#39;\\*httpd\\*&#39;</span>  </span>
<span class="line"><span class="token comment"># 在etc目录下查找名字含有&quot;httpd&quot;的文件</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2.**查询大文件**  </span></span>
<span class="line"><span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-size</span> +500M  </span>
<span class="line"><span class="token comment"># 找出目录下（包括子目录）所有大小大于500M的文件</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="已删除文件但未释放空间-【lsof】" tabindex="-1"><a class="header-anchor" href="#已删除文件但未释放空间-【lsof】"><span>已删除文件但未释放空间：【lsof】</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看被删除但是未释放空间的文件，其中第2列为pid</span></span>
<span class="line"><span class="token function">lsof</span> <span class="token operator">|</span> <span class="token function">grep</span> deleted</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看未释放空间文件在该pid下的文件句柄 （返回值类似： 3 -&gt; /delete.tmp，“3”就是文件句柄）</span></span>
<span class="line">ll /proc/<span class="token punctuation">[</span>pid<span class="token punctuation">]</span>/fd <span class="token operator">|</span> <span class="token function">grep</span> delete.tmp</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将文件句柄置空，完成。</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token operator">&gt;</span> /proc/PID/fd/<span class="token punctuation">[</span>文件句柄<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件上传、下载-【curl】" tabindex="-1"><a class="header-anchor" href="#文件上传、下载-【curl】"><span>文件上传、下载：【curl】</span></a></h3><h3 id="文本编辑-【vim】" tabindex="-1"><a class="header-anchor" href="#文本编辑-【vim】"><span>文本编辑：【vim】</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">vim</span> systemOut.log</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>i #进入编辑模式</p><p>编辑模式下：</p><ul><li>ESC #退出编辑模式</li><li>x #删除后面的字符</li><li>X #删除前面的字符</li><li>u #回滚</li></ul><p>非编辑模式下：</p><ul><li>:wq #保存并退出</li><li>:q! #直接退出不保存</li><li>:w [filename] #另存为</li><li>/ [关键字] #查找关键字（然后输入n搜索下一个）</li><li>Ctrl+F #下一页</li><li>Ctrl+B #上一页</li></ul><h3 id="查看linux版本-【hostnamectl】" tabindex="-1"><a class="header-anchor" href="#查看linux版本-【hostnamectl】"><span>查看Linux版本：【hostnamectl】</span></a></h3><h3 id="全文检索-【grep】" tabindex="-1"><a class="header-anchor" href="#全文检索-【grep】"><span>全文检索：【grep】</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">grep</span> <span class="token parameter variable">--help</span>   </span>
<span class="line"><span class="token comment"># 查看帮助</span></span>
<span class="line"></span>
<span class="line"><span class="token function">grep</span> <span class="token parameter variable">-lr</span> <span class="token string">&#39;string&#39;</span> /etc/  </span>
<span class="line"><span class="token comment"># -l: 找出含有该字符串的文件  </span></span>
<span class="line"><span class="token comment"># -r: 同时从子目录查找  </span></span>
<span class="line"><span class="token comment"># -i: 忽略大小写</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="执行某段shell脚本-【source】" tabindex="-1"><a class="header-anchor" href="#执行某段shell脚本-【source】"><span>执行某段shell脚本：【source】</span></a></h3><p>假设有以下shell脚本：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># test.sh</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&#39;hello world&#39;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>可通过source命令执行该脚本。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token builtin class-name">source</span> ./test.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="以管理员身份运行命令-【sudo】" tabindex="-1"><a class="header-anchor" href="#以管理员身份运行命令-【sudo】"><span>以管理员身份运行命令：【sudo】</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 以管理员身份浏览yum文件</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">vim</span> /usr/bin/yum</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件操作-【touch、rm等】" tabindex="-1"><a class="header-anchor" href="#文件操作-【touch、rm等】"><span>文件操作：【touch、rm等】</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">touch</span> <span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span>   </span>
<span class="line"><span class="token comment"># 创建文件</span></span>
<span class="line"></span>
<span class="line"><span class="token function">mkdir</span> <span class="token operator">&lt;</span>uriname<span class="token operator">&gt;</span>  </span>
<span class="line"><span class="token comment"># 创建目录</span></span>
<span class="line"></span>
<span class="line"><span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span>  </span>
<span class="line"><span class="token comment"># 强行删除文件或目录（不包括子目录）</span></span>
<span class="line"></span>
<span class="line"><span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span>  </span>
<span class="line"><span class="token comment"># 强行删除文件或目录（包括子目录）</span></span>
<span class="line"></span>
<span class="line"><span class="token function">cp</span> <span class="token operator">&lt;</span>source<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>  </span>
<span class="line"><span class="token comment"># 拷贝文件</span></span>
<span class="line"></span>
<span class="line"><span class="token function">cp</span> <span class="token parameter variable">-r</span> <span class="token operator">&lt;</span>source<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>  </span>
<span class="line"><span class="token comment"># 拷贝目录</span></span>
<span class="line"></span>
<span class="line"><span class="token function">mv</span> <span class="token operator">&lt;</span>source<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>  </span>
<span class="line"><span class="token comment"># 移动文件/文件重命名</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在后台运行脚本-【nohup】" tabindex="-1"><a class="header-anchor" href="#在后台运行脚本-【nohup】"><span>在后台运行脚本：【nohup】</span></a></h3><p>nohup 英文全称 no hang up（不挂起），用于在系统后台不挂断地运行命令，退出终端不会影响程序的运行。<br> nohup 命令，在默认情况下（非重定向时），会输出一个名叫 nohup.out 的文件到当前目录下，如果当前目录的 nohup.out 文件不可写，输出重定向到 $HOME/nohup.out 文件中。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#【错误用法】后面没有带上 &amp;</span></span>
<span class="line"><span class="token function">nohup</span> <span class="token builtin class-name">pwd</span> </span>
<span class="line"><span class="token comment">#nohup.out文件内容：nohup: ignoring input</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">#打印当前路径到nohup.out</span></span>
<span class="line"><span class="token function">nohup</span> <span class="token builtin class-name">pwd</span> <span class="token operator">&amp;</span></span>
<span class="line"><span class="token comment">#nohup.out文件内容：/apps/svr</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#在后台运行Test.jar，生成日志文件Test_2022-01-01.log并打印日志到里面（终端里仍会看到日志）</span></span>
<span class="line"><span class="token function">nohup</span> <span class="token function">java</span> <span class="token parameter variable">-jar</span> Test.jar <span class="token operator">&gt;</span> Test_<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y-%m-%d<span class="token variable">)</span></span>.log <span class="token operator">&amp;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#在后台运行test.sh，生成日志文件out.txt并打印日志到里面（终端不会看到日志）</span></span>
<span class="line"><span class="token function">nohup</span> ./test.sh <span class="token operator">&gt;</span> out.txt <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="下载、安装、卸载软件-【yum、rpm、apt-get】" tabindex="-1"><a class="header-anchor" href="#下载、安装、卸载软件-【yum、rpm、apt-get】"><span>下载、安装、卸载软件：【yum、rpm、apt-get】</span></a></h3><p><strong>Debian系：（Debian, Ubuntu, Xandros, Linspire）</strong></p><p>下载并安装：apt-get install [package-name]</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#同步/etc/apt/sources.list中最新安装包的来源（docker容器一般需要先执行该命令，然后再install）</span></span>
<span class="line"><span class="token function">apt-get</span> update</span>
<span class="line"><span class="token comment">#安装ifconfig、netstat命令</span></span>
<span class="line"><span class="token function">apt-get</span> <span class="token function">install</span> net-tools</span>
<span class="line"><span class="token comment">#安装ping命令</span></span>
<span class="line"><span class="token function">apt-get</span> <span class="token function">install</span> iproute2</span>
<span class="line"><span class="token comment">#安装telnet命令</span></span>
<span class="line"><span class="token function">apt-get</span> <span class="token function">install</span> telnet</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>RedHat系：（Fedora, CentOS, Red Hat Enterprise Linux, OpenSUSE, Mandriva, PCLinuxOS）</strong></p><p>没有安装yum的情况下：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#查看所有已安装的软件</span></span>
<span class="line"><span class="token function">rpm</span> <span class="token parameter variable">-qa</span></span>
<span class="line"><span class="token comment">#查看某个软件是否有安装</span></span>
<span class="line"><span class="token function">rpm</span> -qa<span class="token operator">|</span><span class="token function">grep</span> <span class="token punctuation">[</span>软件名（模糊搜索）<span class="token punctuation">]</span></span>
<span class="line"><span class="token comment">#卸载某个软件</span></span>
<span class="line"><span class="token function">rpm</span> <span class="token parameter variable">-e</span> <span class="token punctuation">[</span>软件名<span class="token punctuation">]</span></span>
<span class="line"><span class="token comment">#强制卸载某个软件</span></span>
<span class="line"><span class="token function">rpm</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">--nodeps</span> <span class="token punctuation">[</span>软件名<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用yum：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#查看是否有安装yum包</span></span>
<span class="line"><span class="token function">rpm</span> -qa<span class="token operator">|</span><span class="token function">grep</span> yum</span>
<span class="line"><span class="token comment">#升级系统的所有软件以及系统内核</span></span>
<span class="line">yum update</span>
<span class="line"><span class="token comment">#查看仓库中某个package的所有版本</span></span>
<span class="line">yum list <span class="token punctuation">[</span>package-name<span class="token punctuation">]</span> <span class="token parameter variable">--showduplicates</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span></span>
<span class="line"><span class="token comment">#下载并安装</span></span>
<span class="line">yum <span class="token function">install</span> <span class="token punctuation">[</span>package-name<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看linux的路由表-【route】" tabindex="-1"><a class="header-anchor" href="#查看linux的路由表-【route】"><span>查看Linux的路由表：【route】</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token punctuation">[</span>root@VM_139_74_centos ~<span class="token punctuation">]</span><span class="token comment"># route</span></span>
<span class="line">Kernel IP routing table</span>
<span class="line">Destination     Gateway         Genmask         Flags Metric Ref    Use Iface</span>
<span class="line">default         gateway         <span class="token number">0.0</span>.0.0         UG    <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> eth0</span>
<span class="line"><span class="token number">10.0</span>.0.10       <span class="token number">10.139</span>.128.1    <span class="token number">255.255</span>.255.255 UGH   <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> eth0</span>
<span class="line"><span class="token number">10.139</span>.128.0    <span class="token number">0.0</span>.0.0         <span class="token number">255.255</span>.224.0   U     <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> eth0</span>
<span class="line">link-local      <span class="token number">0.0</span>.0.0         <span class="token number">255.255</span>.0.0     U     <span class="token number">1002</span>   <span class="token number">0</span>        <span class="token number">0</span> eth0</span>
<span class="line"><span class="token number">172.17</span>.0.0      <span class="token number">0.0</span>.0.0         <span class="token number">255.255</span>.0.0     U     <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> docker0</span>
<span class="line"><span class="token number">172.18</span>.0.0      <span class="token number">0.0</span>.0.0         <span class="token number">255.255</span>.0.0     U     <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> br-0ab63c131848</span>
<span class="line"><span class="token number">172.19</span>.0.0      <span class="token number">0.0</span>.0.0         <span class="token number">255.255</span>.0.0     U     <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> br-bccbfb788da0</span>
<span class="line"><span class="token number">172.20</span>.0.0      <span class="token number">0.0</span>.0.0         <span class="token number">255.255</span>.0.0     U     <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> br-7485db25f958</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="防火墙操作-【firewalld】" tabindex="-1"><a class="header-anchor" href="#防火墙操作-【firewalld】"><span>防火墙操作：【firewalld】</span></a></h3><p>firewall-cmd--version</p><h3 id="查看环境变量-【env】" tabindex="-1"><a class="header-anchor" href="#查看环境变量-【env】"><span>查看环境变量：【env】</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#显示所有环境变量</span></span>
<span class="line">$ <span class="token function">env</span></span>
<span class="line"><span class="token comment">#查看某个环境变量</span></span>
<span class="line">$ <span class="token function">env</span> <span class="token operator">|</span><span class="token function">grep</span> JAVA_HOME</span>
<span class="line"><span class="token comment">#查看某个环境变量</span></span>
<span class="line">$ <span class="token builtin class-name">echo</span> <span class="token variable">$JAVA_HOME</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件内容检索、修改-【cat】" tabindex="-1"><a class="header-anchor" href="#文件内容检索、修改-【cat】"><span>文件内容检索、修改：【cat】</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#查看text.txt的所有内容</span></span>
<span class="line"><span class="token function">cat</span> text.txt </span>
<span class="line"></span>
<span class="line"><span class="token comment">#显示行数</span></span>
<span class="line"><span class="token function">cat</span> <span class="token parameter variable">-n</span> text.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment">#查看所有内容，通过翻页由上到下</span></span>
<span class="line"><span class="token comment">#(空格：下一页  Ctrl+C 或者q：退出  Enter：下一行)</span></span>
<span class="line"><span class="token function">cat</span> text.txt <span class="token operator">|</span> <span class="token function">more</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#查看所有内容，通过翻页由上到下</span></span>
<span class="line"><span class="token comment">#(空格：下一页  q：退出   上下箭头：下一行)</span></span>
<span class="line"><span class="token function">cat</span> text.txt <span class="token operator">|</span> <span class="token function">less</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">#查看有“异常”两字的行的后100行</span></span>
<span class="line"><span class="token function">cat</span> text.txt <span class="token operator">|</span><span class="token function">grep</span> <span class="token string">&#39;异常&#39;</span>-A <span class="token number">100</span> </span>
<span class="line"></span>
<span class="line"><span class="token comment">#查看有“异常”两字的行的前100行</span></span>
<span class="line"><span class="token function">cat</span> text.txt <span class="token operator">|</span><span class="token function">grep</span> <span class="token string">&#39;异常&#39;</span>-B <span class="token number">100</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#查看有“异常”两字的行的前、后100行</span></span>
<span class="line"><span class="token function">cat</span> text.txt <span class="token operator">|</span><span class="token function">grep</span> <span class="token string">&#39;异常&#39;</span>-C <span class="token number">100</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#从第100行开始，翻页向下查看</span></span>
<span class="line"><span class="token function">cat</span> <span class="token parameter variable">-n</span> text.txt<span class="token operator">|</span><span class="token function">tail</span> <span class="token parameter variable">-n</span> +100<span class="token operator">|</span><span class="token function">more</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="滚动查看文件-【less】" tabindex="-1"><a class="header-anchor" href="#滚动查看文件-【less】"><span>滚动查看文件：【less】</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#进入并查看文件</span></span>
<span class="line">LESS text.txt</span>
<span class="line"></span>
<span class="line">查看文件后，若文件过大，打通过以下命令滚动文件：</span>
<span class="line">j    下一行</span>
<span class="line">k    上一行</span>
<span class="line">f    向下滚动一屏幕</span>
<span class="line">b    向上滚动一屏幕</span>
<span class="line">g    定位到文档头部</span>
<span class="line">G    定位到文档最尾部</span>
<span class="line">q    退出less模式</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看日志-【tail】" tabindex="-1"><a class="header-anchor" href="#查看日志-【tail】"><span>查看日志：【tail】</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#滚动式查看日志</span></span>
<span class="line"><span class="token function">tail</span> <span class="token parameter variable">-f</span> ./2022-10-10.log</span>
<span class="line"></span>
<span class="line"><span class="token comment">#显示日志文件最末尾的200行内容</span></span>
<span class="line"><span class="token function">tail</span> <span class="token parameter variable">-n</span> <span class="token number">200</span> ./2022-10-10.log</span>
<span class="line"></span>
<span class="line"><span class="token comment">#滚动式查看日志，并且只查看有&#39;ERROR&#39;字符串的行</span></span>
<span class="line"><span class="token function">tail</span> <span class="token parameter variable">-f</span> ./2022-10-10.log <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;ERROR&#39;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="linux文件系统结构" tabindex="-1"><a class="header-anchor" href="#linux文件系统结构"><span>Linux文件系统结构</span></a></h2><p><em><strong>/</strong></em> ：根目录<br><em><strong>/usr/bin</strong></em> ：系统安装的可执行程序（如ping、ls、man等）<br><em><strong>/usr/local</strong></em> ：用户级应用（如TOMCAT、MYSQL），类比C:/Progrem Files/<br><em><strong>/usr/lib</strong></em> ：可执行程序的共享库（如JAVA、PYTHON），类比C:/Windows/System32<br><em><strong>/opt</strong></em> ：临时上传到Linux里的软件，类别D:/Sotfware/<br><em><strong>/etc</strong></em> ：系统的配置文件（包括host文件）</p><h2 id="shell脚本语法" tabindex="-1"><a class="header-anchor" href="#shell脚本语法"><span>Shell脚本语法</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment">#指此脚本使用/bin/bash来解释执行</span></span>
<span class="line"><span class="token comment">#脚本解析器除了bash，还有sh、ksh、tsh...</span></span>
<span class="line"><span class="token comment">#不写则脚本会默认当前用户登录的shell，为脚本解释器</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#打印语句</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;hello world!&quot;</span> <span class="token comment">#打印hello world</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#打印当前时间</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span><span class="token variable">)</span></span>&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>date+%F<span class="token variable">)</span></span>&quot;</span> <span class="token comment">#格式化显示年月日(yyyy-MM-dd)</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>date+%Y/%m/%d<span class="token variable">)</span></span>&quot;</span> <span class="token comment">#格式化显示年月日(yyyy/MM/dd)</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%H:%M:%S<span class="token variable">)</span></span>&quot;</span> <span class="token comment">#格式化显示时分秒(hh:mm:ss)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#定义一个参数并打印</span></span>
<span class="line"><span class="token assign-left variable">myname</span><span class="token operator">=</span><span class="token string">&quot;jack&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;hello <span class="token variable">$myname</span>!&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#条件语句</span></span>
<span class="line">if<span class="token punctuation">[</span><span class="token string">&quot;<span class="token variable">$myname</span>&quot;</span><span class="token operator">!=</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span></span>
<span class="line">  <span class="token builtin class-name">echo</span> <span class="token string">&quot;hello <span class="token variable">$myname</span>!&quot;</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#执行命令并返回结果</span></span>
<span class="line">pids <span class="token operator">=</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> -ef<span class="token operator">|</span><span class="token function">grep</span> springboot-*<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">\`</span></span> <span class="token comment">#查询名字带&quot;springboot&quot;的进程id</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#执行命令并打印结果</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> -ef<span class="token operator">|</span><span class="token function">grep</span> springboot-*<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">\`</span></span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">pwd</span><span class="token variable">\`</span></span> <span class="token comment">#显示当前目录的路径</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看系统配置" tabindex="-1"><a class="header-anchor" href="#查看系统配置"><span>查看系统配置</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#CPU个数、核数</span>
<span class="line">lscpu</span>
<span class="line"></span>
<span class="line">#CPU核数、进程数</span>
<span class="line">cat /proc/cpuinfo</span>
<span class="line"></span>
<span class="line">#内存情况</span>
<span class="line">free -m</span>
<span class="line"></span>
<span class="line">#磁盘总量</span>
<span class="line">df -h</span>
<span class="line"></span>
<span class="line">#linux发行版本</span>
<span class="line">cat /etc/redhat-release</span>
<span class="line"></span>
<span class="line">#linux内核版本</span>
<span class="line">uname -a</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,65)]))}const r=n(i,[["render",p]]),o=JSON.parse('{"path":"/devops/linux/linux%E5%91%BD%E4%BB%A4%E9%80%9F%E6%9F%A5%E5%AE%9D%E5%85%B8.html","title":"Linux运维速查宝典","lang":"en-US","frontmatter":{"title":"Linux运维速查宝典","sidebar":"heading"},"git":{"updatedTime":1750240340000,"contributors":[{"name":"dongyz8","username":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":8,"url":"https://github.com/dongyz8"}],"changelog":[{"hash":"ad8fc1a188d6829c38676e985c8e2097211af10d","time":1750240340000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"45b5590437faf102707a4627c085a1bcba76a5a3","time":1740293597000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"7f927643cf84678c68bdb606a341073959279ad4","time":1734073104000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"2107fe45a32694cb96e49385ca5e0106c7ec14a9","time":1732669486000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"66f87c080a540925a27ebc560e70bc48c9f871e7","time":1731464539000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"57c0f68774482d65619628af9c2a0a6475f91038","time":1726309320000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"6c98ae4b0cdbbe21132d488d36e37f45c9547d16","time":1709288068000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"fb7cc624832f782b737cd66a5463ce109935379b","time":1709287696000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"}]},"filePathRelative":"devops/linux/linux命令速查宝典.md"}');export{r as comp,o as data};
