---
title: 'Linux运维速查宝典'
sidebar: 'heading'
---


# Linux运维速查宝典

## 常用命令
### 查看当前进程状态：【ps】
```
ps aux|grep ktin 
//查看包含"ktin"字眼的进程的信息，其中第2列为PID
//示例：| USER | PID | %CPU | %MEM | 虚拟内存大小 | 物理内存大小 | TTY | STAT | 进程启动时间 | 实际使用CPU的累计时间 | 启动进程的完整命令|

ps -ef|grep srm-esb-*
//查看以srm-esb-开头的进程的信息

ps aux|grep -Ei 'srm|java'
//E：正则表达式  i: 忽略大小写
//上面命令是查出含有"srm"或者"java"的进程行信息

ps aux --sort=-%cpu
//按CPU占比排序

ps aux --sort=-%mem | head -n 10
//按内存占比排序，取前10条
```
### 查看磁盘占用情况：【df】

```
df -h
```

### 查看负载、内存、进程：【top】 

示例：
```
# 该行跟命令uptime显示的内容相同。
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
```

### 查看端口占用情况:【netstat】
```bash
#查看某个端口
lsof -i:8080

#查看所有端口
netstat -tunlp
```

### 文件查找：【find】
```bash
# 默认从当前目录查找；查找时默认包括子目录；

# 1.按文件名查找  
find test.txt  
# 在当前目录下查找test.txt文件  
find / -name httpd.conf  
# 在根目录下查找文件httpd.conf  
find /etc -name '\*httpd\*'  
# 在etc目录下查找名字含有"httpd"的文件

# 2.**查询大文件**  
find . -type f -size +500M  
# 找出目录下（包括子目录）所有大小大于500M的文件
```


### 已删除文件但未释放空间：【lsof】

```bash
# 查看被删除但是未释放空间的文件，其中第2列为pid
lsof | grep deleted

# 查看未释放空间文件在该pid下的文件句柄 （返回值类似： 3 -> /delete.tmp，“3”就是文件句柄）
ll /proc/[pid]/fd | grep delete.tmp

# 将文件句柄置空，完成。
echo > /proc/PID/fd/[文件句柄]
```


### 文件上传、下载：【curl】

```bash
# 下载文件到本地，文件名用远程文件名
curl -O https://example.com/file.zip
# GET请求
curl "https://api.example.com/users?name=John&age=30"
# POST请求（FormData）
curl -X POST -d "username=admin&password=secret" https://api.example.com/login
# POST请求（Json）
curl -X POST -H "Content-Type: application/json" -d '{"name": "Alice", "email": "alice@example.com"}' https://api.example.com/users
# 设置请求头
curl -H "Authorization: Bearer YOUR_TOKEN" -H "Accept: application/json" https://api.example.com/protected
# 使用 PUT 方法上传
curl -T mylocalfile.txt https://example.com/upload/
```

### 文本编辑：【vim】

```bash
vim systemOut.log
```
i #进入编辑模式  

编辑模式下：
* ESC #退出编辑模式
* x #删除后面的字符
* X #删除前面的字符
* u #回滚

非编辑模式下：  
* :wq #保存并退出  
* :q! #直接退出不保存  
* :w [filename] #另存为  
* / [关键字] #查找关键字（然后输入n搜索下一个）  
* Ctrl+F #下一页  
* Ctrl+B #上一页


### 临时获取ROOT权限：【sudo】

有一些命令，需要有ROOT权限（可以理解为管理员权限），才能执行。比如：

1. **系统文件的增、删、改**
```bash
sudo cp myapp /usr/local/bin/ # 向系统级二进制目录写入文件

sudo rm -rf /usr/lib/*.so # 删除系统关键库文件

sudo chmod 777 /etc/passwd	# 修改系统关键配置文件权限

sudo vim /etc/hosts	# 编辑全局主机名解析文件
```

2. **安装、卸载软件包**
```bash
sudo apt install nginx	# 安装/卸载软件包
```

3. **系统服务管理**
```bash
sudo systemctl start nginx	# 启动/停止系统服务

sudo systemctl enable sshd	# 设置服务开机自启
```

4. **用户与权限管理**
```bash
sudo useradd alice	# 创建/删除用户
sudo passwd root	# 修改 root 或其他用户密码
sudo usermod -aG docker alice	# 将用户加入特权组（如 docker）
```

5. **网络管理**
```bash
sudo ifconfig eth0 192.168.1.2	# 修改网络接口 IP
sudo ufw allow 8080	# 配置防火墙规则
sudo iptables -L -v	# 查看 iptables 规则
```


### 查看Linux版本：【hostnamectl】

### 服务管理、系统控制：【systemctl】

| 类别    | 	常用命令                        | 	作用                     |
|-------|------------------------------|-------------------------|
| 服务管理  | 	start/stop/restart/reload   | 	启动/停止/重启/重载服务          |
| 自启控制  | 	enable/disable              | 	启用/禁用开机自启              |
| 状态查看  | 	status/is-active/is-enabled | 	检查服务状态                 |
| 系统控制  | 	reboot/poweroff/hibernate   | 	重启/关机/休眠               |
| 日志查看  | 	journalctl -u 服务名           | 	查看服务日志（需配合 journalctl） |

1. **服务管理**
```bash
# 启动服务
sudo systemctl start nginx.service

# 停止服务
sudo systemctl stop nginx

# 重启服务（中断服务）
sudo systemctl restart nginx

# 重载配置（不中断服务）
sudo systemctl reload nginx

# 查看服务状态（关键！）
systemctl status nginx
```

2. **服务开机自启**

```bash
# 启用开机自启
sudo systemctl enable nginx

# 禁用开机自启
sudo systemctl disable nginx

# 检查是否启用
systemctl is-enabled nginx  # 返回 "enabled" 或 "disabled"
```

3. **电源管理**

```bash
# 重启系统
sudo systemctl reboot

# 关闭系统
sudo systemctl poweroff

# 休眠（需配置）
sudo systemctl hibernate

# 挂起到内存（睡眠）
sudo systemctl suspend
```

### 全文检索：【grep】
```bash
grep --help   
# 查看帮助

grep -lr 'string' /etc/  
# -l: 找出含有该字符串的文件  
# -r: 同时从子目录查找  
# -i: 忽略大小写
# -E: 正则表达式
```


### 执行某段shell脚本：【source】
假设有以下shell脚本：
```bash
# test.sh
echo 'hello world'
```
可通过source命令执行该脚本。
```bash
source ./test.sh
```

### 文件操作：【touch、rm等】
```bash
touch <filename>   
# 创建文件

mkdir <uriname>  
# 创建目录

rm -f <filename>  
# 强行删除文件或目录（不包括子目录）

rm -rf <filename>  
# 强行删除文件或目录（包括子目录）

cp <source> <target>  
# 拷贝文件

cp -r <source> <target>  
# 拷贝目录

mv <source> <target>  
# 移动文件/文件重命名
```

### 在后台运行脚本：【nohup】

nohup 英文全称 no hang up（不挂起），用于在系统后台不挂断地运行命令，退出终端不会影响程序的运行。  
nohup 命令，在默认情况下（非重定向时），会输出一个名叫 nohup.out 的文件到当前目录下，如果当前目录的 nohup.out 文件不可写，输出重定向到 $HOME/nohup.out 文件中。

```shell
#【错误用法】后面没有带上 &
nohup pwd 
#nohup.out文件内容：nohup: ignoring input


#打印当前路径到nohup.out
nohup pwd &
#nohup.out文件内容：/apps/svr

#在后台运行Test.jar，生成日志文件Test_2022-01-01.log并打印日志到里面（终端里仍会看到日志）
nohup java -jar Test.jar > Test_$(date +%Y-%m-%d).log &

#在后台运行test.sh，生成日志文件out.txt并打印日志到里面（终端不会看到日志）
nohup ./test.sh > out.txt 2>&1 &
```

### 下载、安装、卸载软件：【yum、rpm、apt-get】

**Debian系：（Debian, Ubuntu, Xandros, Linspire）**

下载并安装：apt-get install [package-name]
```bash
#同步/etc/apt/sources.list中最新安装包的来源（docker容器一般需要先执行该命令，然后再install）
apt-get update
#安装ifconfig、netstat命令
apt-get install net-tools
#安装ping命令
apt-get install iproute2
#安装telnet命令
apt-get install telnet
```


**RedHat系：（Fedora, CentOS, Red Hat Enterprise Linux, OpenSUSE, Mandriva, PCLinuxOS）**

没有安装yum的情况下：
```bash
#查看所有已安装的软件
rpm -qa
#查看某个软件是否有安装
rpm -qa|grep [软件名（模糊搜索）]
#卸载某个软件
rpm -e [软件名]
#强制卸载某个软件
rpm -e --nodeps [软件名]
```

使用yum：
```bash
#查看是否有安装yum包
rpm -qa|grep yum
#升级系统的所有软件以及系统内核
yum update
#查看仓库中某个package的所有版本
yum list [package-name] --showduplicates | sort -r
#下载并安装
yum install [package-name]
#列出已安装的包
yum list installed
#查看是否安装了php
yum list installed | grep php
#检查可更新的包（不执行更新）	
yum check-update
```
### 查看Linux的路由表：【route】
```bash
[root@VM_139_74_centos ~]# route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         gateway         0.0.0.0         UG    0      0        0 eth0
10.0.0.10       10.139.128.1    255.255.255.255 UGH   0      0        0 eth0
10.139.128.0    0.0.0.0         255.255.224.0   U     0      0        0 eth0
link-local      0.0.0.0         255.255.0.0     U     1002   0        0 eth0
172.17.0.0      0.0.0.0         255.255.0.0     U     0      0        0 docker0
172.18.0.0      0.0.0.0         255.255.0.0     U     0      0        0 br-0ab63c131848
172.19.0.0      0.0.0.0         255.255.0.0     U     0      0        0 br-bccbfb788da0
172.20.0.0      0.0.0.0         255.255.0.0     U     0      0        0 br-7485db25f958
```

### 防火墙操作：【firewalld】

firewall-cmd--version

### 查看环境变量：【env】
```bash
#显示所有环境变量
$ env
#查看某个环境变量
$ env |grep JAVA_HOME
#查看某个环境变量
$ echo $JAVA_HOME
```

### 文件内容检索、修改：【cat】
```bash
#查看text.txt的所有内容
cat text.txt 

#显示行数
cat -n text.txt

#查看所有内容，通过翻页由上到下
#(空格：下一页  Ctrl+C 或者q：退出  Enter：下一行)
cat text.txt | more

#查看所有内容，通过翻页由上到下
#(空格：下一页  q：退出   上下箭头：下一行)
cat text.txt | less



#查看有“异常”两字的行的后100行
cat text.txt |grep '异常'-A 100 

#查看有“异常”两字的行的前100行
cat text.txt |grep '异常'-B 100

#查看有“异常”两字的行的前、后100行
cat text.txt |grep '异常'-C 100

#从第100行开始，翻页向下查看
cat -n text.txt|tail -n +100|more


```

### 滚动查看文件：【less】
```bash
#进入并查看文件
LESS text.txt

查看文件后，若文件过大，打通过以下命令滚动文件：
j    下一行
k    上一行
f    向下滚动一屏幕
b    向上滚动一屏幕
g    定位到文档头部
G    定位到文档最尾部
q    退出less模式


```

### 查看日志：【tail】
```bash
#滚动式查看日志
tail -f ./2022-10-10.log

#显示日志文件最末尾的200行内容
tail -n 200 ./2022-10-10.log

#滚动式查看日志，并且只查看有'ERROR'字符串的行
tail -f ./2022-10-10.log | grep 'ERROR'
```

## Linux文件系统结构
***/*** ：根目录  
***/usr/bin*** ：系统安装的可执行程序（如ping、ls、man等）  
***/usr/local*** ：用户级应用（如TOMCAT、MYSQL），类比C:/Progrem Files/  
***/usr/lib*** ：可执行程序的共享库（如JAVA、PYTHON），类比C:/Windows/System32  
***/opt*** ：临时上传到Linux里的软件，类别D:/Sotfware/  
***/etc*** ：系统的配置文件（包括host文件）


## Shell脚本语法

```shell
#!/bin/bash
#指此脚本使用/bin/bash来解释执行
#脚本解析器除了bash，还有sh、ksh、tsh...
#不写则脚本会默认当前用户登录的shell，为脚本解释器

#打印语句
echo "hello world!" #打印hello world

#打印当前时间
echo "$(date)"
echo "$(date+%F)" #格式化显示年月日(yyyy-MM-dd)
echo "$(date+%Y/%m/%d)" #格式化显示年月日(yyyy/MM/dd)
echo "$(date +%H:%M:%S)" #格式化显示时分秒(hh:mm:ss)

#定义一个参数并打印
myname="jack"
echo "hello $myname!"

#条件语句
if["$myname"!=""];then
  echo "hello $myname!"
fi

#执行命令并返回结果
pids = `ps -ef|grep springboot-*|grep -v grep|awk '{print $2}'` #查询名字带"springboot"的进程id

#执行命令并打印结果
echo `ps -ef|grep springboot-*|grep -v grep|awk '{print $2}'`
echo `pwd` #显示当前目录的路径



```

## 查看系统配置


```
#CPU个数、核数
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

```

