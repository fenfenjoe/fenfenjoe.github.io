import{_ as n,o as s,c as a,e}from"./app-CYrzcX6G.js";const i={},l=e(`<h1 id="linux运维速查宝典" tabindex="-1"><a class="header-anchor" href="#linux运维速查宝典"><span>Linux运维速查宝典</span></a></h1><h3 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h3><h4 id="ps-查看当前进程状态" tabindex="-1"><a class="header-anchor" href="#ps-查看当前进程状态"><span>PS ：查看当前进程状态</span></a></h4><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ps aux|grep ktin 
//查看包含&quot;ktin&quot;字眼的进程的信息，其中第2列为PID

ps -ef|grep srm-esb-*
//查看以srm-esb-开头的进程的信息
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="df-查看磁盘占用情况" tabindex="-1"><a class="header-anchor" href="#df-查看磁盘占用情况"><span>DF：查看磁盘占用情况</span></a></h4><p>df -h</p><h4 id="top-查看负载、查看内存使用情况、查看进程" tabindex="-1"><a class="header-anchor" href="#top-查看负载、查看内存使用情况、查看进程"><span>TOP ：查看负载、查看内存使用情况、查看进程</span></a></h4><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># 该行跟命令uptime显示的内容相同。
# up 2 days：已使用2天
# 3 users：有3个当前用户
# load average：1分钟内、10分钟内、15分钟内系统的平均负载。
#
top - 16:14:33 up 2 days, 4:27, 3 users, load average: 0.00, 0.01, 0.02

Tasks: 199 total, 1 running, 198 sleeping, 0 stopped, 0 zombie

%Cpu(s): 0.0 us, 0.2 sy, 0.0 ni, 99.8 id, 0.0 wa, 0.0 hi, 0.0 si, 0.0 st

MiB Mem : 5959.4 total, 3277.3 free, 776.4 used, 1905.8 buff/cache

MiB Swap: 2048.0 total, 2048.0 free, 0.0 used. 4878.4 avail Mem

 

# PID — 进程id
# USER — 进程所有者
# PR — 进程优先级
# NI — nice值。负值表示高优先级，正值表示低优先级
# VIRT — 进程使用的虚拟内存总量，单位kb。VIRT=SWAP+RES
# RES — 进程使用的、未被换出的物理内存大小，单位kb。RES=CODE+DATASHR — 共享内存大小，单位kb
# S —进程状态。D=不可中断的睡眠状态 R=运行 S=睡眠 T=跟踪/停止 Z=僵尸进程
# %CPU — 上次更新到现在的CPU时间占用百分比
# %MEM — 进程使用的物理内存百分比
# TIME+ — 进程使用的CPU时间总计，单位1/100秒
# COMMAND — 进程名称（命令名/命令行）

  PID USER PR NI VIRT RES SHR S %CPU %MEM TIME+ COMMAND

23026 alvin 20 0 46340 7820 6504 S 0.0 0.1 0:00.05 systemd

23033 alvin 20 0 149660 3140 72 S 0.0 0.1 0:00.00 (sd-pam)

23125 alvin 20 0 63396 5100 4092 S 0.0 0.1 0:00.00 sshd

23128 alvin 20 0 16836 5636 4284 S 0.0 0.1 0:00.03 zsh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="netstat-查看端口占用情况" tabindex="-1"><a class="header-anchor" href="#netstat-查看端口占用情况"><span>NETSTAT：查看端口占用情况</span></a></h4><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#查看某个端口
lsof -i:8080

#查看所有端口
netstat -tunlp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="find-文件查找" tabindex="-1"><a class="header-anchor" href="#find-文件查找"><span>FIND：文件查找</span></a></h4><p>默认从当前目录查找；查找时默认包括子目录；</p><p>1.按文件名查找<br> find test.txt<br> --在当前目录下查找test.txt文件<br> find / -name httpd.conf<br> --在根目录下查找文件httpd.conf<br> find /etc -name &#39;*httpd*&#39;<br> --在etc目录下查找名字含有&quot;httpd&quot;的文件</p><p>2.<strong>查询大文件</strong><br> find . -type f -size +500M<br> --找出目录下（包括子目录）所有大小大于500M的文件</p><h4 id="curl-文件上传、下载" tabindex="-1"><a class="header-anchor" href="#curl-文件上传、下载"><span>CURL：文件上传、下载</span></a></h4><h4 id="vim-文本编辑" tabindex="-1"><a class="header-anchor" href="#vim-文本编辑"><span>VIM：文本编辑</span></a></h4><p><em><strong>i</strong></em> #进入编辑模式<br> 编辑模式下：<br><em><strong>ESC</strong></em> #退出编辑模式<br><em><strong>x</strong></em>         #删除后面的字符<br><em><strong>X</strong></em>          #删除前面的字符<br><em><strong>u</strong></em>          #回滚</p><p>非编辑模式下：<br><em><strong>:wq</strong></em> #保存并退出<br><em><strong>:q!</strong></em> #直接退出不保存<br><em><strong>:w [filename]</strong></em> #另存为<br><em><strong>/ [关键字]</strong></em>        #查找关键字（然后输入n搜索下一个）<br><em><strong>Ctrl+F</strong></em>  #下一页<br><em><strong>Ctrl+B</strong></em> #上一页</p><h4 id="hostnamectl-查看linux发行版本" tabindex="-1"><a class="header-anchor" href="#hostnamectl-查看linux发行版本"><span>HOSTNAMECTL：查看Linux发行版本</span></a></h4><h4 id="grep-全文检索" tabindex="-1"><a class="header-anchor" href="#grep-全文检索"><span>GREP：全文检索</span></a></h4><p>grep --help<br> 查看帮助</p><p>grep -lr &#39;string&#39; /etc/<br> -l: 找出含有该字符串的文件<br> -r: 同时从子目录查找<br> -i: 忽略大小写</p><h4 id="source-执行某段shell脚本" tabindex="-1"><a class="header-anchor" href="#source-执行某段shell脚本"><span>SOURCE:执行某段shell脚本</span></a></h4><p>假设有以下shell脚本：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># test.sh</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;hello world&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可通过source命令执行该脚本。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">source</span> ./test.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="sudo-以管理员身份运行命令" tabindex="-1"><a class="header-anchor" href="#sudo-以管理员身份运行命令"><span>SUDO：以管理员身份运行命令</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /usr/bin/yum
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="文件操作-touch、rm、mkdir、vim、cp、mv" tabindex="-1"><a class="header-anchor" href="#文件操作-touch、rm、mkdir、vim、cp、mv"><span>文件操作：touch、rm、mkdir、vim、cp、mv</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">touch</span> <span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span>   
创建文件

<span class="token function">mkdir</span> <span class="token operator">&lt;</span>uriname<span class="token operator">&gt;</span>  
创建目录

<span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span>  
强行删除文件或目录（不包括子目录）

<span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span>  
强行删除文件或目录（包括子目录）

<span class="token function">cp</span> <span class="token operator">&lt;</span>source<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>  
拷贝文件

<span class="token function">cp</span> <span class="token parameter variable">-r</span> <span class="token operator">&lt;</span>source<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>  
拷贝目录

<span class="token function">mv</span> <span class="token operator">&lt;</span>source<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>  
移动文件/文件重命名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="在后台运行脚本-nohup" tabindex="-1"><a class="header-anchor" href="#在后台运行脚本-nohup"><span>在后台运行脚本：nohup</span></a></h4><p>nohup 英文全称 no hang up（不挂起），用于在系统后台不挂断地运行命令，退出终端不会影响程序的运行。<br> nohup 命令，在默认情况下（非重定向时），会输出一个名叫 nohup.out 的文件到当前目录下，如果当前目录的 nohup.out 文件不可写，输出重定向到 $HOME/nohup.out 文件中。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#【错误用法】后面没有带上 &amp;</span>
<span class="token function">nohup</span> <span class="token builtin class-name">pwd</span> 
<span class="token comment">#nohup.out文件内容：nohup: ignoring input</span>


<span class="token comment">#打印当前路径到nohup.out</span>
<span class="token function">nohup</span> <span class="token builtin class-name">pwd</span> <span class="token operator">&amp;</span>
<span class="token comment">#nohup.out文件内容：/apps/svr</span>

<span class="token comment">#在后台运行Test.jar，生成日志文件Test_2022-01-01.log并打印日志到里面（终端里仍会看到日志）</span>
<span class="token function">nohup</span> <span class="token function">java</span> <span class="token parameter variable">-jar</span> Test.jar <span class="token operator">&gt;</span> Test_<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y-%m-%d<span class="token variable">)</span></span>.log <span class="token operator">&amp;</span>

<span class="token comment">#在后台运行test.sh，生成日志文件out.txt并打印日志到里面（终端不会看到日志）</span>
<span class="token function">nohup</span> ./test.sh <span class="token operator">&gt;</span> out.txt <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="yum、rpm、apt-get-下载、安装、卸载软件" tabindex="-1"><a class="header-anchor" href="#yum、rpm、apt-get-下载、安装、卸载软件"><span>yum、rpm、apt-get：下载、安装、卸载软件</span></a></h4><p><strong>Debian系：（Debian, Ubuntu, Xandros, Linspire）</strong></p><p>下载并安装：apt-get install [package-name]</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#同步/etc/apt/sources.list中最新安装包的来源（docker容器一般需要先执行该命令，然后再install）</span>
<span class="token function">apt-get</span> update
<span class="token comment">#安装ifconfig、netstat命令</span>
<span class="token function">apt-get</span> <span class="token function">install</span> net-tools
<span class="token comment">#安装ping命令</span>
<span class="token function">apt-get</span> <span class="token function">install</span> iproute2
<span class="token comment">#安装telnet命令</span>
<span class="token function">apt-get</span> <span class="token function">install</span> telnet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>RedHat系：（Fedora, CentOS, Red Hat Enterprise Linux, OpenSUSE, Mandriva, PCLinuxOS）</strong></p><p>没有安装yum的情况下：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#查看所有已安装的软件</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qa</span>
<span class="token comment">#查看某个软件是否有安装</span>
<span class="token function">rpm</span> -qa<span class="token operator">|</span><span class="token function">grep</span> <span class="token punctuation">[</span>软件名（模糊搜索）<span class="token punctuation">]</span>
<span class="token comment">#卸载某个软件</span>
<span class="token function">rpm</span> <span class="token parameter variable">-e</span> <span class="token punctuation">[</span>软件名<span class="token punctuation">]</span>
<span class="token comment">#强制卸载某个软件</span>
<span class="token function">rpm</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">--nodeps</span> <span class="token punctuation">[</span>软件名<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用yum：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#查看是否有安装yum包</span>
<span class="token function">rpm</span> -qa<span class="token operator">|</span><span class="token function">grep</span> yum
<span class="token comment">#升级系统的所有软件以及系统内核</span>
yum update
<span class="token comment">#查看仓库中某个package的所有版本</span>
yum list <span class="token punctuation">[</span>package-name<span class="token punctuation">]</span> <span class="token parameter variable">--showduplicates</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span>
<span class="token comment">#下载并安装</span>
yum <span class="token function">install</span> <span class="token punctuation">[</span>package-name<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="route-查看linux的路由表" tabindex="-1"><a class="header-anchor" href="#route-查看linux的路由表"><span>ROUTE：查看Linux的路由表</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@VM_139_74_centos ~<span class="token punctuation">]</span><span class="token comment"># route</span>
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         gateway         <span class="token number">0.0</span>.0.0         UG    <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> eth0
<span class="token number">10.0</span>.0.10       <span class="token number">10.139</span>.128.1    <span class="token number">255.255</span>.255.255 UGH   <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> eth0
<span class="token number">10.139</span>.128.0    <span class="token number">0.0</span>.0.0         <span class="token number">255.255</span>.224.0   U     <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> eth0
link-local      <span class="token number">0.0</span>.0.0         <span class="token number">255.255</span>.0.0     U     <span class="token number">1002</span>   <span class="token number">0</span>        <span class="token number">0</span> eth0
<span class="token number">172.17</span>.0.0      <span class="token number">0.0</span>.0.0         <span class="token number">255.255</span>.0.0     U     <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> docker0
<span class="token number">172.18</span>.0.0      <span class="token number">0.0</span>.0.0         <span class="token number">255.255</span>.0.0     U     <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> br-0ab63c131848
<span class="token number">172.19</span>.0.0      <span class="token number">0.0</span>.0.0         <span class="token number">255.255</span>.0.0     U     <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> br-bccbfb788da0
<span class="token number">172.20</span>.0.0      <span class="token number">0.0</span>.0.0         <span class="token number">255.255</span>.0.0     U     <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> br-7485db25f958
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="firewalld-防火墙操作" tabindex="-1"><a class="header-anchor" href="#firewalld-防火墙操作"><span>firewalld：防火墙操作</span></a></h4><p>firewall-cmd --version</p><h4 id="env-查看环境变量" tabindex="-1"><a class="header-anchor" href="#env-查看环境变量"><span>ENV：查看环境变量</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#显示所有环境变量</span>
$ <span class="token function">env</span>
<span class="token comment">#查看某个环境变量</span>
$ <span class="token function">env</span> <span class="token operator">|</span><span class="token function">grep</span> JAVA_HOME
<span class="token comment">#查看某个环境变量</span>
$ <span class="token builtin class-name">echo</span> <span class="token variable">$JAVA_HOME</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="cat-文件内容检索、修改" tabindex="-1"><a class="header-anchor" href="#cat-文件内容检索、修改"><span>CAT:文件内容检索、修改</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#查看text.txt的所有内容</span>
<span class="token function">cat</span> text.txt 

<span class="token comment">#显示行数</span>
<span class="token function">cat</span> <span class="token parameter variable">-n</span> text.txt

<span class="token comment">#查看所有内容，通过翻页由上到下</span>
<span class="token comment">#(空格：下一页  Ctrl+C 或者q：退出  Enter：下一行)</span>
<span class="token function">cat</span> text.txt <span class="token operator">|</span> <span class="token function">more</span>

<span class="token comment">#查看所有内容，通过翻页由上到下</span>
<span class="token comment">#(空格：下一页  q：退出   上下箭头：下一行)</span>
<span class="token function">cat</span> text.txt <span class="token operator">|</span> <span class="token function">less</span>



<span class="token comment">#查看有“异常”两字的行的后100行</span>
<span class="token function">cat</span> text.txt <span class="token operator">|</span><span class="token function">grep</span> <span class="token string">&#39;异常&#39;</span>-A <span class="token number">100</span> 

<span class="token comment">#查看有“异常”两字的行的前100行</span>
<span class="token function">cat</span> text.txt <span class="token operator">|</span><span class="token function">grep</span> <span class="token string">&#39;异常&#39;</span>-B <span class="token number">100</span>

<span class="token comment">#查看有“异常”两字的行的前、后100行</span>
<span class="token function">cat</span> text.txt <span class="token operator">|</span><span class="token function">grep</span> <span class="token string">&#39;异常&#39;</span>-C <span class="token number">100</span>

<span class="token comment">#从第100行开始，翻页向下查看</span>
<span class="token function">cat</span> <span class="token parameter variable">-n</span> text.txt<span class="token operator">|</span><span class="token function">tail</span> <span class="token parameter variable">-n</span> +100<span class="token operator">|</span><span class="token function">more</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="less-滚动查看文件" tabindex="-1"><a class="header-anchor" href="#less-滚动查看文件"><span>LESS:滚动查看文件</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#进入并查看文件</span>
LESS text.txt

查看文件后，若文件过大，打通过以下命令滚动文件：
j    下一行
k    上一行
f    向下滚动一屏幕
b    向上滚动一屏幕
g    定位到文档头部
G    定位到文档最尾部
q    退出less模式


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="tail-查看日志" tabindex="-1"><a class="header-anchor" href="#tail-查看日志"><span>TAIL:查看日志</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#滚动式查看日志</span>
<span class="token function">tail</span> <span class="token parameter variable">-f</span> ./2022-10-10.log

<span class="token comment">#显示日志文件最末尾的200行内容</span>
<span class="token function">tail</span> <span class="token parameter variable">-n</span> <span class="token number">200</span> ./2022-10-10.log

<span class="token comment">#滚动式查看日志，并且只查看有&#39;ERROR&#39;字符串的行</span>
<span class="token function">tail</span> <span class="token parameter variable">-f</span> ./2022-10-10.log <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;ERROR&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="linux文件系统结构" tabindex="-1"><a class="header-anchor" href="#linux文件系统结构"><span>Linux文件系统结构</span></a></h3><p><em><strong>/</strong></em> ：根目录<br><em><strong>/usr/bin</strong></em> ：系统安装的可执行程序（如ping、ls、man等）<br><em><strong>/usr/local</strong></em> ：用户级应用（如TOMCAT、MYSQL），类比C:/Progrem Files/<br><em><strong>/usr/lib</strong></em> ：可执行程序的共享库（如JAVA、PYTHON），类比C:/Windows/System32<br><em><strong>/opt</strong></em> ：临时上传到Linux里的软件，类别D:/Sotfware/<br><em><strong>/etc</strong></em> ：系统的配置文件（包括host文件）</p><h3 id="shell脚本语法" tabindex="-1"><a class="header-anchor" href="#shell脚本语法"><span>Shell脚本语法</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment">#指此脚本使用/bin/bash来解释执行</span>
<span class="token comment">#脚本解析器除了bash，还有sh、ksh、tsh...</span>
<span class="token comment">#不写则脚本会默认当前用户登录的shell，为脚本解释器</span>

<span class="token comment">#打印语句</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;hello world!&quot;</span> <span class="token comment">#打印hello world</span>

<span class="token comment">#打印当前时间</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span><span class="token variable">)</span></span>&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>date+%F<span class="token variable">)</span></span>&quot;</span> <span class="token comment">#格式化显示年月日(yyyy-MM-dd)</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>date+%Y/%m/%d<span class="token variable">)</span></span>&quot;</span> <span class="token comment">#格式化显示年月日(yyyy/MM/dd)</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%H:%M:%S<span class="token variable">)</span></span>&quot;</span> <span class="token comment">#格式化显示时分秒(hh:mm:ss)</span>

<span class="token comment">#定义一个参数并打印</span>
<span class="token assign-left variable">myname</span><span class="token operator">=</span><span class="token string">&quot;jack&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;hello <span class="token variable">$myname</span>!&quot;</span>

<span class="token comment">#条件语句</span>
if<span class="token punctuation">[</span><span class="token string">&quot;<span class="token variable">$myname</span>&quot;</span><span class="token operator">!=</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;hello <span class="token variable">$myname</span>!&quot;</span>
<span class="token keyword">fi</span>

<span class="token comment">#执行命令并返回结果</span>
pids <span class="token operator">=</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> -ef<span class="token operator">|</span><span class="token function">grep</span> springboot-*<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">\`</span></span> <span class="token comment">#查询名字带&quot;springboot&quot;的进程id</span>

<span class="token comment">#执行命令并打印结果</span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> -ef<span class="token operator">|</span><span class="token function">grep</span> springboot-*<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">\`</span></span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">pwd</span><span class="token variable">\`</span></span> <span class="token comment">#显示当前目录的路径</span>



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看系统配置" tabindex="-1"><a class="header-anchor" href="#查看系统配置"><span>查看系统配置</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#CPU个数、核数
lscpu

#CPU核数、进程数
cat /proc/cpuinfo

#内存情况
free -m

#磁盘总量
df -h

#linux发行版本
cat /etc/redhat-release

#linux内核版本
uname -a

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,62),t=[l];function p(c,r){return s(),a("div",null,t)}const d=n(i,[["render",p],["__file","linux命令速查宝典.html.vue"]]),u=JSON.parse('{"path":"/devops/linux/linux%E5%91%BD%E4%BB%A4%E9%80%9F%E6%9F%A5%E5%AE%9D%E5%85%B8.html","title":"Linux运维速查宝典","lang":"en-US","frontmatter":{"title":"Linux运维速查宝典","sidebar":"auto"},"headers":[{"level":3,"title":"常用命令","slug":"常用命令","link":"#常用命令","children":[]},{"level":3,"title":"Linux文件系统结构","slug":"linux文件系统结构","link":"#linux文件系统结构","children":[]},{"level":3,"title":"Shell脚本语法","slug":"shell脚本语法","link":"#shell脚本语法","children":[]},{"level":3,"title":"查看系统配置","slug":"查看系统配置","link":"#查看系统配置","children":[]}],"git":{"updatedTime":1710772920000,"contributors":[{"name":"Fun_zil","email":"854257920@qq.com","commits":1}]},"filePathRelative":"devops/linux/linux命令速查宝典.md"}');export{d as comp,u as data};
