import{_ as l,c as a,e as d,a as e,b as i,d as r,o as v,r as t}from"./app-CVA42f6w.js";const c={},m={href:"https://gitee.com/fun_zil/dyz-docker-compose-temple/blob/master/docker/nginx/conf/nginx.conf",target:"_blank",rel:"noopener noreferrer"};function o(u,n){const s=t("ExternalLinkIcon");return v(),a("div",null,[n[2]||(n[2]=d(`<h1 id="nginx学习笔记" tabindex="-1"><a class="header-anchor" href="#nginx学习笔记"><span>Nginx学习笔记</span></a></h1><h3 id="命令速查" tabindex="-1"><a class="header-anchor" href="#命令速查"><span>命令速查</span></a></h3><p>修改nginx.conf后不停机重新加载配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>nginx -s reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构"><span>目录结构</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>nginx
  /conf
    nginx.conf
  /html
    index.html
    50x.html
  /log
    nginx.pid
    error.log
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nginx的作用" tabindex="-1"><a class="header-anchor" href="#nginx的作用"><span>nginx的作用</span></a></h3><h4 id="_1-反向代理-我们的系统部署在自己的局域网中-外部用户一般情况下无法访问我们的网络" tabindex="-1"><a class="header-anchor" href="#_1-反向代理-我们的系统部署在自己的局域网中-外部用户一般情况下无法访问我们的网络"><span>1. 反向代理：我们的系统部署在自己的局域网中，外部用户一般情况下无法访问我们的网络；</span></a></h4><p>Nginx的反向代理等于开了一个“口子”，提供一个到多个端口，让外部用户能从nginx访问到局域网内的机器。</p><p>配置示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#nginx监听ip地址为192.168.134.105、端口为9001的请求
server {
    listen       9001;
    server_name  192.168.134.105;

    #若请求像 192.168.134.105:9001/edu/...   则将请求转发给8080端口
    location ~/edu/ {
        proxy_pass http://127.0.0.1:8080;
    }

    #若请求像 192.168.134.105:9001/vod/...   则将请求转发给8081端口
    location ~/vod/ {
        proxy_pass http://127.0.0.1:8081;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-负载均衡-nginx能将请求按照一定的策略-转发给其他的服务器去处理-当发现请求太多了-便可以添加服务器去处理" tabindex="-1"><a class="header-anchor" href="#_2-负载均衡-nginx能将请求按照一定的策略-转发给其他的服务器去处理-当发现请求太多了-便可以添加服务器去处理"><span>2. 负载均衡：nginx能将请求按照一定的策略，转发给其他的服务器去处理；当发现请求太多了，便可以添加服务器去处理；</span></a></h4><p>转发策略有很多种：</p><ul><li>轮询</li><li>weight权重</li><li>iphash</li><li>fair（第三方）</li></ul><p>配置示例（轮询）:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    #定义一个负载均衡器，会将进来的请求转发
    upstream myserver{
        server 192.168.134.105:8080;
        server 192.168.134.105:8081;
    }

    #用户发送请求至192.168.134.105:80/...时，请求会被转发到负载均衡器myserver上
    server {
        listen       80;
        server_name  192.168.134.105;
        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
          root   html; #会从本机中的/html中寻找资源
          index index.html index.htm; #配置默认首页(/html/index.html)
          proxy_pass http://myserver;
        }
	}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-动静分离-将html、图片等资源文件放到nginx上-动态请求则转发给tomcat处理。" tabindex="-1"><a class="header-anchor" href="#_3-动静分离-将html、图片等资源文件放到nginx上-动态请求则转发给tomcat处理。"><span>3. 动静分离：将html、图片等资源文件放到nginx上，动态请求则转发给tomcat处理。</span></a></h4><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    
    #tomcat负载均衡器
    upstream tomcat{
        server 192.168.134.105:8080;
        server 192.168.134.105:8081;
    }

    #用户发送请求至192.168.134.105:80/...时，请求会被转发到负载均衡器myserver上
    server {
        listen       80;
        server_name  www.helloworld.com;

        #处理/**的请求
        location / {
          root   /data/html; #会从本机中的/data/html中寻找资源
          index index.html index.htm; #配置默认首页
        }

        #处理/image/**的请求
        location /image {
          root   /data; #会从本机中的/data/image中寻找资源
          autoindex on; #打开目录功能
        }

        #处理/back/**的请求
        location /back {
          proxy_pass http://tomcat; #转发给tomcat
        }
	}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nginx-conf" tabindex="-1"><a class="header-anchor" href="#nginx-conf"><span>nginx.conf</span></a></h3>`,19)),e("p",null,[n[1]||(n[1]=i("更详细的配置见：")),e("a",m,[n[0]||(n[0]=i("这里")),r(s)])])])}const x=l(c,[["render",o],["__file","Nginx学习笔记.html.vue"]]),h=JSON.parse('{"path":"/devops/Nginx%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.html","title":"Nginx学习笔记","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"命令速查","slug":"命令速查","link":"#命令速查","children":[]},{"level":3,"title":"目录结构","slug":"目录结构","link":"#目录结构","children":[]},{"level":3,"title":"nginx的作用","slug":"nginx的作用","link":"#nginx的作用","children":[]},{"level":3,"title":"nginx.conf","slug":"nginx-conf","link":"#nginx-conf","children":[]}],"git":{"updatedTime":1734073104000,"contributors":[{"name":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":1}]},"filePathRelative":"devops/Nginx学习笔记.md"}');export{x as comp,h as data};
