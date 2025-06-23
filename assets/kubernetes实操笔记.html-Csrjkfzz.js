import{_ as n,c as a,a as e,o as l}from"./app-iMoEB5u2.js";const p={};function i(c,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="kubernetes实操笔记" tabindex="-1"><a class="header-anchor" href="#kubernetes实操笔记"><span>Kubernetes实操笔记</span></a></h1><h3 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h3><p>【kuboard：免费K8S教程（图文）】<a href="https://kuboard.cn/learning/" target="_blank" rel="noopener noreferrer">https://kuboard.cn/learning/</a></p><h4 id="k8s单机环境-minikube-学习用" tabindex="-1"><a class="header-anchor" href="#k8s单机环境-minikube-学习用"><span>k8s单机环境：minikube（学习用）</span></a></h4><h5 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h5><p><strong>MacOS/Windows</strong><br> minikube -&gt; libmachine -&gt; virtualbox/hyper V -&gt;<br> linux VM -&gt; docker -&gt; localkube<br><strong>Linux</strong><br> minikube -&gt; docker -&gt; localkube</p><blockquote><p>libmachine：虚拟机的驱动程序，负责创建或销毁虚拟机<br> virtualbox/hyper V：开源的虚拟机管理软件<br> localkube：一个独立的Go 语言的二进制包，包含了所有 Kubernetes 的主要组件</p></blockquote><blockquote><p>简单的说，在Mac和Windows系统下，minikube会创建一个虚拟机，并在虚拟机内通过docker去搭建一个单机版的k8s环境（localkube）；<br> 而在Linux上，因为k8s可以直接运行，因此无需设置虚拟机。</p></blockquote><h5 id="在windows上安装minikube" tabindex="-1"><a class="header-anchor" href="#在windows上安装minikube"><span>在Windows上安装minikube</span></a></h5><p>https://minikube.sigs.k8s.io/docs/start/ 下载windows版即可</p><h5 id="minikube基本操作" tabindex="-1"><a class="header-anchor" href="#minikube基本操作"><span>minikube基本操作</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"></span>
<span class="line"><span class="token comment">#启动minikube</span></span>
<span class="line">minikube start</span>
<span class="line"><span class="token comment">#关闭minikube</span></span>
<span class="line">minikube stop</span>
<span class="line"><span class="token comment">#登录minikube上的虚拟机（虚拟机已内默认安装了docker）</span></span>
<span class="line">minikube <span class="token function">ssh</span></span>
<span class="line"><span class="token comment">#打开minikube可视化界面</span></span>
<span class="line">minikube dashboard</span>
<span class="line"><span class="token comment">#查看minikube的k8s版本</span></span>
<span class="line">kubectl version</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="k8s集群环境搭建" tabindex="-1"><a class="header-anchor" href="#k8s集群环境搭建"><span>k8s集群环境搭建</span></a></h4><p>集群中，需要有至少1台的master节点以及1台node节点。 假设现有机器：</p><ul><li>k8s-master：192.168.178.171</li><li>k8s-node1：192.168.178.172</li><li>k8s-node2：192.168.178.173</li></ul><h5 id="在master、node上安装k8s所需组件" tabindex="-1"><a class="header-anchor" href="#在master、node上安装k8s所需组件"><span>在master、node上安装k8s所需组件</span></a></h5><ol><li>安装docker环境 略</li><li>启动docker服务</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#设置docker服务自启动</span></span>
<span class="line">systemctl <span class="token builtin class-name">enable</span> docker.service</span>
<span class="line"></span>
<span class="line"><span class="token comment">#启动docker服务</span></span>
<span class="line">systemctl start docker.service</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>搭建：kubeadm、kubelet、kubectl</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#安装kubeadm、kubelet、kubectl</span></span>
<span class="line">yum <span class="token function">install</span> kubelet-1.19.4 kubeadm-1.19.4 kubectl-1.19.4 <span class="token parameter variable">-y</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#设置kubelet服务自启动</span></span>
<span class="line">systemctl <span class="token builtin class-name">enable</span> kubelet.service</span>
<span class="line"></span>
<span class="line"><span class="token comment">#查看有没有安装</span></span>
<span class="line">yum list installed <span class="token operator">|</span> <span class="token function">grep</span> kubelet</span>
<span class="line">yum list installed <span class="token operator">|</span> <span class="token function">grep</span> kubeadm</span>
<span class="line">yum list installed <span class="token operator">|</span> <span class="token function">grep</span> kubectl</span>
<span class="line"></span>
<span class="line"><span class="token comment">#查看安装的版本</span></span>
<span class="line">kubelet <span class="token parameter variable">--version</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#启动kubelet服务</span></span>
<span class="line">systemctl start kubelet.service</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="master节点" tabindex="-1"><a class="header-anchor" href="#master节点"><span>master节点</span></a></h5><ol><li><p>在master节点上安装k8s环境（参考上面）</p></li><li><p>重启机器后，将本机初始化为Master节点</p></li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">kubeadm init </span>
<span class="line">--apiserver-advertise-address<span class="token operator">=</span><span class="token number">192.168</span>.178.171 </span>
<span class="line">--image-repository registry.aliyuncs.com/google_containers </span>
<span class="line">--kubernetes-version v1.19.4 </span>
<span class="line">--service-cidr<span class="token operator">=</span><span class="token number">10.96</span>.0.0/12 </span>
<span class="line">--pod-network-cidr<span class="token operator">=</span><span class="token number">10.244</span>.0.0/16</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>见如下提示后，即k8s master节点部署成功</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">Your Kubernetes master has been initialized successfully<span class="token operator">!</span></span>
<span class="line"><span class="token punctuation">..</span>.</span>
<span class="line">kubeadm <span class="token function">join</span> <span class="token parameter variable">--token</span> 4ffccd2.asdfawierjll <span class="token number">192.168</span>.178.171:6443</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="node节点" tabindex="-1"><a class="header-anchor" href="#node节点"><span>node节点</span></a></h5><ol><li><p>在node节点中安装k8s环境（参考上面）</p></li><li><p>在master上查看token</p></li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">kubeadm token list</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="3"><li>使用token，向集群添加Node节点</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">kubeadm <span class="token function">join</span> <span class="token number">192.168</span>.178.171:6443 <span class="token parameter variable">--token</span><span class="token operator">=</span>wa5bif.zfuvbesevdfvf4of </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="kubectl常用命令" tabindex="-1"><a class="header-anchor" href="#kubectl常用命令"><span>kubectl常用命令</span></a></h3><h4 id="基础命令-create-delete-get-run-expose-set-explain-edit" tabindex="-1"><a class="header-anchor" href="#基础命令-create-delete-get-run-expose-set-explain-edit"><span>基础命令：create，delete，get，run，expose，set，explain，edit</span></a></h4><p><strong>查看帮助</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#查看所有命令及简介</span></span>
<span class="line">kubectl <span class="token parameter variable">--help</span> </span>
<span class="line"><span class="token comment">#查看run命令用法</span></span>
<span class="line">kubectl run <span class="token parameter variable">--help</span></span>
<span class="line"><span class="token comment">#查看pod资源清单有哪些属性</span></span>
<span class="line">kubectl explain pod</span>
<span class="line"><span class="token comment">#查看pod资源清单的metadata有哪些属性</span></span>
<span class="line">kubectl explain pod.metadata</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建、运行资源</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#直接创建并运行pod（不用资源清单）</span></span>
<span class="line"><span class="token comment">#示例，运行一个名称为nginx，副本数为3，标签为app=example，镜像为nginx:1.10，端口为80的容器实例</span></span>
<span class="line">kubectl run nginx </span>
<span class="line"><span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">3</span> </span>
<span class="line"><span class="token parameter variable">--labels</span><span class="token operator">=</span><span class="token string">&quot;app=example&quot;</span> </span>
<span class="line"><span class="token parameter variable">--image</span><span class="token operator">=</span>nginx:1.10 </span>
<span class="line"><span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">80</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#根据资源清单创建development</span></span>
<span class="line">kubectl create <span class="token parameter variable">-f</span> mydeployment.yaml</span>
<span class="line"></span>
<span class="line"><span class="token comment">#根据资源清单创建development（推荐使用）</span></span>
<span class="line"><span class="token comment">#不但能创建资源，若资源已存在，还能根据资源清单对资源进行更新</span></span>
<span class="line">kubectl apply <span class="token parameter variable">-f</span> mydeployment.yaml</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>将资源暴露为Service</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#为名为nginx的rc创建service，并通过service 的80端口转发到容器的8000端口上</span></span>
<span class="line">kubectl expose rc nginx <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">80</span> --target-port<span class="token operator">=</span><span class="token number">8000</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#根据资源清单中指定的type和name，找到对应的rc，并未rc创建service；并通过service 的80端口转发到容器的8000端口上</span></span>
<span class="line">kubectl expose <span class="token parameter variable">-f</span> nginx-controller.yaml <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">80</span> --target-port<span class="token operator">=</span><span class="token number">8000</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>删除资源</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#根据资源清单删除development</span></span>
<span class="line">kubectl delete <span class="token parameter variable">-f</span> mydeployment.yaml</span>
<span class="line"><span class="token comment">#根据名称删除development</span></span>
<span class="line">kubectl delete 资源名</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看资源信息</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#查看所有的资源信息</span></span>
<span class="line">kubectl get all</span>
<span class="line"><span class="token comment">#查看pod列表</span></span>
<span class="line">kubectl get pod</span>
<span class="line"><span class="token comment">#显示pod节点的标签信息</span></span>
<span class="line">kubectl get pod --show-labels</span>
<span class="line"><span class="token comment">#根据指定标签匹配到具体的pod</span></span>
<span class="line">kubectl get pods <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>example</span>
<span class="line"><span class="token comment">#查看node节点列表</span></span>
<span class="line">kubectl get <span class="token function">node</span> </span>
<span class="line"><span class="token comment">#显示node节点的标签信息</span></span>
<span class="line">kubectl get <span class="token function">node</span> --show-labels</span>
<span class="line"><span class="token comment">#查看pod详细信息，也就是可以查看pod具体运行在哪个节点上（ip地址信息）</span></span>
<span class="line">kubectl get pod <span class="token parameter variable">-o</span> wide</span>
<span class="line"><span class="token comment">#查看服务的详细信息，显示了服务名称，类型，集群ip，端口，时间等信息</span></span>
<span class="line">kubectl get svc</span>
<span class="line"><span class="token punctuation">[</span>root@master ~<span class="token punctuation">]</span><span class="token comment"># kubectl get svc</span></span>
<span class="line">NAME            TYPE        CLUSTER-IP     EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>          AGE</span>
<span class="line">go-service      NodePort    <span class="token number">10.10</span>.10.247   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">8089</span>:33702/TCP   29m</span>
<span class="line">java-service    NodePort    <span class="token number">10.10</span>.10.248   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">8082</span>:32823/TCP   5h17m</span>
<span class="line">kubernetes      ClusterIP   <span class="token number">10.10</span>.10.1     <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">443</span>/TCP          5d16h</span>
<span class="line">nginx-service   NodePort    <span class="token number">10.10</span>.10.146   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">88</span>:34823/TCP     2d19h</span>
<span class="line"><span class="token comment">#查看命名空间</span></span>
<span class="line">kubectl get ns</span>
<span class="line"><span class="token comment">#查看所有pod所属的命名空间</span></span>
<span class="line">kubectl get pod --all-namespaces</span>
<span class="line"><span class="token comment">#查看所有pod所属的命名空间并且查看都在哪些节点上运行</span></span>
<span class="line">kubectl get pod --all-namespaces  <span class="token parameter variable">-o</span> wide</span>
<span class="line"><span class="token comment">#查看目前所有的replica set，显示了所有的pod的副本数，以及他们的可用数量以及状态等信息</span></span>
<span class="line">kubectl get rs</span>
<span class="line"><span class="token punctuation">[</span>root@master ~<span class="token punctuation">]</span><span class="token comment"># kubectl get rs</span></span>
<span class="line">NAME                          DESIRED   CURRENT   READY   AGE</span>
<span class="line">go-deployment-58c76f7d5c      <span class="token number">1</span>         <span class="token number">1</span>         <span class="token number">1</span>       32m</span>
<span class="line">java-deployment-76889f56c5    <span class="token number">1</span>         <span class="token number">1</span>         <span class="token number">1</span>       5h21m</span>
<span class="line">nginx-deployment-58d6d6ccb8   <span class="token number">3</span>         <span class="token number">3</span>         <span class="token number">3</span>       2d19h</span>
<span class="line"><span class="token comment">#查看目前所有的deployment</span></span>
<span class="line">kubectl get deployment</span>
<span class="line"><span class="token punctuation">[</span>root@master ~<span class="token punctuation">]</span><span class="token comment"># kubectl get deployment</span></span>
<span class="line">NAME               READY   UP-TO-DATE   AVAILABLE   AGE</span>
<span class="line">go-deployment      <span class="token number">1</span>/1     <span class="token number">1</span>            <span class="token number">1</span>           34m</span>
<span class="line">java-deployment    <span class="token number">1</span>/1     <span class="token number">1</span>            <span class="token number">1</span>           5h23m</span>
<span class="line">nginx-deployment   <span class="token number">3</span>/3     <span class="token number">3</span>            <span class="token number">3</span>           2d19h</span>
<span class="line"><span class="token comment">#查看已经部署了的所有应用，可以看到容器，以及容器所用的镜像，标签等信息</span></span>
<span class="line"> kubectl get deploy <span class="token parameter variable">-o</span> wide</span>
<span class="line"><span class="token punctuation">[</span>root@master bin<span class="token punctuation">]</span><span class="token comment"># kubectl get deploy -o wide     </span></span>
<span class="line">NAME    READY   UP-TO-DATE   AVAILABLE   AGE   CONTAINERS   IMAGES       SELECTOR</span>
<span class="line">nginx   <span class="token number">3</span>/3     <span class="token number">3</span>            <span class="token number">3</span>           16m   nginx        nginx:1.10   <span class="token assign-left variable">app</span><span class="token operator">=</span>example</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="部署命令-rollout-rolling-update-scale-autoscale" tabindex="-1"><a class="header-anchor" href="#部署命令-rollout-rolling-update-scale-autoscale"><span>部署命令：rollout，rolling-update，scale，autoscale</span></a></h4><p><strong>rollout命令（作用于deployments，daemonsets）</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">kubectl rollout SUBCOMMAND</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>子命令（SUBCOMMAND）包括：</p><p>history（查看历史版本） pause（暂停资源） resume（恢复暂停资源） status（查看资源状态） undo（回滚版本）</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#回滚到之前的deployment</span></span>
<span class="line">kubectl rollout undo deployment/abc</span>
<span class="line"><span class="token comment">#查看daemonet的状态</span></span>
<span class="line">kubectl rollout status daemonset/foo</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>rolling-update命令（作用于RC）</strong> 用于滚动更新。</p><p><strong>scale命令（作用于Deployment、RS、RC、Job）</strong> 对资源中的pod进行扩容或缩容。</p><p><strong>autoscale命令（作用于Deployment、RS、RC、Job）</strong> 对资源中的pod进行自动扩缩容。</p><h4 id="集群故障排查和调试命令-describe-logs-exec-attach-port-foward-proxy-cp-auth" tabindex="-1"><a class="header-anchor" href="#集群故障排查和调试命令-describe-logs-exec-attach-port-foward-proxy-cp-auth"><span>集群故障排查和调试命令：describe，logs，exec，attach，port-foward，proxy，cp，auth</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#describe：查看资源的详细信息</span></span>
<span class="line">kubectl describe TYPE NAME_PREFIX</span>
<span class="line"><span class="token comment">#TYPE：pod、deployment、service、node、rc等（可以用缩写）</span></span>
<span class="line"><span class="token comment">#NAME_PREFIX：资源名称or资源名称前缀</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#logs：打印pod中容器的日志（若只有一个容器，可以省略容器名）</span></span>
<span class="line">kubectl logs <span class="token punctuation">[</span>-f<span class="token punctuation">]</span> <span class="token punctuation">[</span>-p<span class="token punctuation">]</span> POD <span class="token punctuation">[</span>-c CONTAINER<span class="token punctuation">]</span></span>
<span class="line"><span class="token comment">#-c：容器名</span></span>
<span class="line"><span class="token comment">#-f：是否滚动输出日志（默认false）</span></span>
<span class="line"><span class="token comment">#-p：输出pod中曾经运行过、但现在已终止的容器的日志</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#exec：进入容器（与Docker的exec类似）</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> POD <span class="token punctuation">[</span>-c CONTAINER<span class="token punctuation">]</span> -- COMMAND <span class="token punctuation">[</span>args<span class="token punctuation">..</span>.<span class="token punctuation">]</span></span>
<span class="line"><span class="token comment">#命令选项</span></span>
<span class="line"><span class="token comment">#-c, --container=&quot;&quot;: 容器名。如果未指定，使用pod中的一个容器。</span></span>
<span class="line"><span class="token comment">#-p, --pod=&quot;&quot;: Pod名。</span></span>
<span class="line"><span class="token comment">#-i, --stdin[=false]: 将控制台输入发送到容器。</span></span>
<span class="line"><span class="token comment">#-t, --tty[=false]: 将标准输入控制台作为容器的控制台输入。</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#attach：连接到一个正在运行的容器</span></span>
<span class="line">kubectl attach <span class="token parameter variable">-c</span> CONTAINER</span>
<span class="line"></span>
<span class="line"><span class="token comment">#cp：拷贝文件或者目录到pod容器中</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="k8s实战" tabindex="-1"><a class="header-anchor" href="#k8s实战"><span>K8S实战</span></a></h3><h4 id="在minikube部署一个springboot微服务容器" tabindex="-1"><a class="header-anchor" href="#在minikube部署一个springboot微服务容器"><span>在Minikube部署一个SpringBoot微服务容器</span></a></h4><ol><li>将镜像打包好上传到远程仓库（略）</li><li>（如果是私有仓库）在Minikube从仓库下载镜像</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#连接minikube</span></span>
<span class="line">minikube <span class="token function">ssh</span></span>
<span class="line"><span class="token comment">#登录仓库（若不填仓库地址，则默认为Dockerhub）</span></span>
<span class="line"><span class="token function">docker</span> login <span class="token parameter variable">-u</span> <span class="token punctuation">[</span>用户名<span class="token punctuation">]</span> <span class="token parameter variable">-p</span> <span class="token punctuation">[</span>密码<span class="token punctuation">]</span> <span class="token punctuation">[</span>私有仓库URL，不填则默认登录中央仓库<span class="token punctuation">]</span></span>
<span class="line"><span class="token comment">#拉取镜像</span></span>
<span class="line"><span class="token function">docker</span> pull azil/eureka-server:1.0-SNAPSHOT</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>创建Deployment。通过资源清单部署：创建development.yaml</li></ol><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1  <span class="token comment">#kubectl api-versions 可以通过这条指令去看版本信息</span></span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment <span class="token comment"># 指定资源类别</span></span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span> <span class="token comment">#资源的一些元数据</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> eureka<span class="token punctuation">-</span>server<span class="token punctuation">-</span>deployment <span class="token comment">#deloyment的名称</span></span>
<span class="line">  <span class="token key atrule">labels</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">app</span><span class="token punctuation">:</span> eureka<span class="token punctuation">-</span>server<span class="token punctuation">-</span>deployment  <span class="token comment">#标签</span></span>
<span class="line"><span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span> <span class="token comment">#创建pod的个数</span></span>
<span class="line">  <span class="token key atrule">selector</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">app</span><span class="token punctuation">:</span> eureka<span class="token punctuation">-</span>server <span class="token comment">#满足标签为这个的时候相关的pod才能被调度到</span></span>
<span class="line">  <span class="token key atrule">template</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">labels</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">app</span><span class="token punctuation">:</span> eureka<span class="token punctuation">-</span>server</span>
<span class="line">    <span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">containers</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> eureka<span class="token punctuation">-</span>server</span>
<span class="line">          <span class="token key atrule">image</span><span class="token punctuation">:</span> azil/eureka<span class="token punctuation">-</span>server<span class="token punctuation">:</span>1.0<span class="token punctuation">-</span>SNAPSHOT <span class="token comment">#镜像名+标签名</span></span>
<span class="line">          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent</span>
<span class="line">          <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8761</span></span>
<span class="line">  </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">kubectl apply <span class="token parameter variable">-f</span> ./deployment.yaml</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>创建Service。</li></ol><p>【方法1：通过命令部署】</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#此时，在本机已经可以通过localhost:8761访问微服务，但集群中的其他机器不行</span></span>
<span class="line"><span class="token comment">#因此需要将服务暴露出来</span></span>
<span class="line"><span class="token comment">#以下命令创建一个Service，将容器的8761端口映射到Node的某个端口中</span></span>
<span class="line">kubectl expose deploy eureka-server <span class="token parameter variable">--type</span><span class="token operator">=</span>NodePort --target-port<span class="token operator">=</span><span class="token number">8761</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#查看容器与Node的端口映射情况</span></span>
<span class="line">kubectl get svc eureka-server</span>
<span class="line">NAME <span class="token punctuation">..</span>. PORTS</span>
<span class="line">eureka-server <span class="token number">8761</span>:32425/TCP</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>【方法2：通过资源清单部署：创建service.yaml】</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> Service</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> sample<span class="token punctuation">-</span>web<span class="token punctuation">-</span>service	<span class="token comment">#Service 的名称</span></span>
<span class="line">  <span class="token key atrule">labels</span><span class="token punctuation">:</span>     	<span class="token comment">#Service 自己的标签</span></span>
<span class="line">    <span class="token key atrule">app</span><span class="token punctuation">:</span> sample<span class="token punctuation">-</span>web	<span class="token comment">#为该 Service 设置 key 为 app，value 为 nginx 的标签</span></span>
<span class="line"><span class="token key atrule">spec</span><span class="token punctuation">:</span>	    <span class="token comment">#这是关于该 Service 的定义，描述了 Service 如何选择 Pod，如何被访问</span></span>
<span class="line">  <span class="token key atrule">selector</span><span class="token punctuation">:</span>	    <span class="token comment">#标签选择器</span></span>
<span class="line">    <span class="token key atrule">app</span><span class="token punctuation">:</span> sample<span class="token punctuation">-</span>web	<span class="token comment">#选择包含标签 app:nginx 的 Pod</span></span>
<span class="line">  <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> sample<span class="token punctuation">-</span>web<span class="token punctuation">-</span>port	<span class="token comment">#端口的名字</span></span>
<span class="line">    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP	    <span class="token comment">#协议类型 TCP/UDP</span></span>
<span class="line">    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>	        <span class="token comment">#集群内的其他容器组可通过 80 端口访问 Service</span></span>
<span class="line">    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">8080</span>   <span class="token comment">#通过任意节点的 8080 端口访问 Service</span></span>
<span class="line">    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>	<span class="token comment">#将请求转发到匹配 Pod 的 80 端口</span></span>
<span class="line">  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort	<span class="token comment">#Serive的类型，ClusterIP/NodePort/LoaderBalancer</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">kubectl apply <span class="token parameter variable">-f</span> nginx-service.yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="4"><li>访问微服务 localhost:32425</li></ol><h4 id="查看本机部署情况" tabindex="-1"><a class="header-anchor" href="#查看本机部署情况"><span>查看本机部署情况</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#查看已有的deployment</span></span>
<span class="line">kubectl get deployment </span>
<span class="line"></span>
<span class="line"><span class="token comment">#查看已有的pod</span></span>
<span class="line">kubectl get pod</span>
<span class="line"></span>
<span class="line"><span class="token comment">#查看已有的service</span></span>
<span class="line">kubectl get services <span class="token parameter variable">-o</span> wide </span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="在k8s部署mysql集群" tabindex="-1"><a class="header-anchor" href="#在k8s部署mysql集群"><span>在K8S部署Mysql集群</span></a></h4>`,70)]))}const o=n(p,[["render",i]]),r=JSON.parse('{"path":"/devops/kubernetes/kubernetes%E5%AE%9E%E6%93%8D%E7%AC%94%E8%AE%B0.html","title":"Kubernetes实操笔记","lang":"en-US","frontmatter":{"title":"Kubernetes实操笔记","sidebar":"heading"},"git":{"updatedTime":1750240340000,"contributors":[{"name":"dongyz8","username":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":3,"url":"https://github.com/dongyz8"}],"changelog":[{"hash":"ad8fc1a188d6829c38676e985c8e2097211af10d","time":1750240340000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"2107fe45a32694cb96e49385ca5e0106c7ec14a9","time":1732669486000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"fb7cc624832f782b737cd66a5463ce109935379b","time":1709287696000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"}]},"filePathRelative":"devops/kubernetes/kubernetes实操笔记.md"}');export{o as comp,r as data};
