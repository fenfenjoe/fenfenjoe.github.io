import{_ as i,c as e,e as a,a as n,b as l,d as p,o as m,r}from"./app-BNNcboHM.js";const c={},h={href:"https://blog.csdn.net/wmy01234/article/details/106070249/",target:"_blank",rel:"noopener noreferrer"};function o(g,s){const t=r("ExternalLinkIcon");return m(),e("div",null,[s[2]||(s[2]=a('<h1 id="算法" tabindex="-1"><a class="header-anchor" href="#算法"><span>算法</span></a></h1><h3 id="常见的算法问题" tabindex="-1"><a class="header-anchor" href="#常见的算法问题"><span>常见的算法问题</span></a></h3><ul><li>八皇后问题</li><li>背包问题、0-1背包问题</li><li>大整数相乘 ： ab<em>cd=a</em>c<em>10^n + b</em>d + (a<em>c+b</em>d)*10^(n/2)</li><li>排序（选择排序、冒泡排序、快速排序、归并排序）</li><li>汉诺塔：n个盘子移动问题</li></ul><h3 id="算法求解的过程" tabindex="-1"><a class="header-anchor" href="#算法求解的过程"><span>算法求解的过程</span></a></h3><ol><li>理解问题</li><li>数学建模</li><li>设计算法</li><li>分析算法性能（时间复杂度、空间复杂度、正确性）</li></ol><h3 id="算法的应用" tabindex="-1"><a class="header-anchor" href="#算法的应用"><span>算法的应用</span></a></h3><p>算法是计算机学科的核心。经常应用于以下的一些方向：</p><ol><li>操作系统、编译器（进程调度、词法分析）</li><li>网络（路由算法、搜索引擎）</li><li>人工智能（神经网络、随机森林、向量机、智能算法）</li><li>密码学</li><li>计算机生物学</li><li>计算机图形学</li></ol><h3 id="算法的常见模式" tabindex="-1"><a class="header-anchor" href="#算法的常见模式"><span>算法的常见模式</span></a></h3><ul><li>穷举法（迭代法、回溯法）：列出所有可能情况。</li><li>贪婪法：选择当前局部最优的策略。 <ul><li>图的最短路径算法（Dijkstra）</li></ul></li><li>分治法：将大问题分解成小问题。 <ul><li>斐波那契数列</li><li>大整数相乘</li><li>排序（选择排序、冒泡排序、快速排序、归并排序）</li><li>汉诺塔</li></ul></li><li>动态规划：分治法的一种，通过缓存子问题的结果，避免重复解决分解出来的子问题。</li></ul><h4 id="迭代-iteration-和递归-recursion" tabindex="-1"><a class="header-anchor" href="#迭代-iteration-和递归-recursion"><span>迭代(iteration)和递归(recursion)</span></a></h4><p>【什么是递归】<br> 函数A 会调用 函数A本身，就叫递归。其过程等同于树的深度优先遍历。</p><p>【什么是迭代】<br> 函数A 调用 函数B，得到结果后再以结果为入参，继续调用B，就叫迭代。</p><h4 id="回溯法-back-tracking" tabindex="-1"><a class="header-anchor" href="#回溯法-back-tracking"><span>回溯法(back tracking)</span></a></h4><h5 id="回溯法的经典问题" tabindex="-1"><a class="header-anchor" href="#回溯法的经典问题"><span>回溯法的经典问题</span></a></h5><ol><li>求走出迷宫的路径</li><li>0-1背包问题</li></ol><h5 id="常使用的数据结构" tabindex="-1"><a class="header-anchor" href="#常使用的数据结构"><span>常使用的数据结构</span></a></h5><ul><li>树</li><li>图</li></ul><h5 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h5>',19)),n("p",null,[s[1]||(s[1]=l("参考：")),n("a",h,[s[0]||(s[0]=l("https://blog.csdn.net/wmy01234/article/details/106070249/")),p(t)])]),s[3]||(s[3]=a(`<p>【一.解空间】</p><p>回溯法一般对应以下类型的问题：<br> 该问题有n个输入，所有输入可以表示成一个向量 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>X</mi><mo>=</mo><mo stretchy="false">(</mo><msub><mi>x</mi><mn>1</mn></msub><mo separator="true">,</mo><msub><mi>x</mi><mn>2</mn></msub><mo separator="true">,</mo><mi mathvariant="normal">.</mi><mi mathvariant="normal">.</mi><mi mathvariant="normal">.</mi><msub><mi>x</mi><mi>n</mi></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">X = (x_1,x_2,...x_n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">X</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">...</span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span><br> 每个分向量<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>x</mi><mi>i</mi></msub><mo stretchy="false">(</mo><mn>1</mn><mo>≤</mo><mi>i</mi><mo>≤</mo><mi>i</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">x_i(1 \\leq i \\leq i)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≤</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.7955em;vertical-align:-0.136em;"></span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≤</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">i</span><span class="mclose">)</span></span></span></span>的取值范围则可以用一个集合表示<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>S</mi><mi>i</mi></msub><mo>=</mo><mo stretchy="false">{</mo><msub><mi>a</mi><mn>1</mn></msub><mo separator="true">,</mo><msub><mi>a</mi><mn>2</mn></msub><mo separator="true">,</mo><mi mathvariant="normal">.</mi><mi mathvariant="normal">.</mi><mi mathvariant="normal">.</mi><msub><mi>a</mi><mrow><mi>m</mi><mi>i</mi></mrow></msub><mo stretchy="false">}</mo></mrow><annotation encoding="application/x-tex">S_i = \\lbrace a_1,a_2,...a_{mi} \\rbrace</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">{</span><span class="mord"><span class="mord mathnormal">a</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">a</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">...</span><span class="mord"><span class="mord mathnormal">a</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">mi</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">}</span></span></span></span><br><strong>所有可能的解向量构成了问题的解空间</strong></p><p>每个分向量<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>x</mi><mi>i</mi></msub></mrow><annotation encoding="application/x-tex">x_i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.5806em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>有<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>m</mi><mi>i</mi></msub></mrow><annotation encoding="application/x-tex">m_i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.5806em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">m</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>个取值。因此解空间的大小为<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>m</mi><mo>=</mo><msub><mi>m</mi><mn>1</mn></msub><mo>×</mo><msub><mi>m</mi><mn>2</mn></msub><mo>×</mo><msub><mi>m</mi><mn>3</mn></msub><mo>×</mo><mi mathvariant="normal">.</mi><mi mathvariant="normal">.</mi><mi mathvariant="normal">.</mi><mo>×</mo><msub><mi>m</mi><mi>n</mi></msub></mrow><annotation encoding="application/x-tex">m=m_1 \\times m_2 \\times m_3 \\times ... \\times m_n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">m</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.7333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">m</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.7333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">m</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.7333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">m</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">3</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord">...</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.5806em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">m</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></p><p>解空间中的解又叫<strong>可能解</strong>。</p><p>所有符合题目的约束条件的解则叫<strong>可行解</strong>。</p><p>符合题目的约束条件，同时能使目标函数取得最优的可行解，被叫<strong>最优解</strong>。</p><p>【二.解空间树】</p><p>我们可以通过构造一棵“解空间树”，来表示出解空间中的所有<strong>可能解</strong>。</p><ol><li><p>根节点，表示解题的开始。</p></li><li><p>第二层的结点则表示对第1个分向量作出选择后达到的一个状态。第1层到第2层的边上标出对第1个分向量选择的结果。</p></li><li><p>以此类推，就生成了一颗<strong>解空间树</strong>。从根节点一直到某一个叶子节点，构成了解空间中的一个<strong>可能解</strong>。</p></li></ol><blockquote><p>解空间树的类型<br> (1)子集树：当问题是<strong>从n个元素的集合S中找出满足某种性质的子集</strong>时，相应的解空间树被称为<strong>子集树</strong>。<br> (2)排列子树：当问题是<strong>求出n个元素满足某种性质的所有排列</strong>时，相应的解空间树被称为<strong>排列子树</strong>。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//leetcode经典例题：括号生成
//数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

//下面是示例答案



    public static List&lt;String&gt; generateParenthesis(int n) {
        List&lt;String&gt; result = new ArrayList&lt;&gt;();
        getResult(0,0,n,new StringBuilder(),result);
        return result;

    }

    /**
     * 对于n组括号，递归找出有效的括号组合
     * @param openIndex 当前左括号的个数
     * @param closeIndex 当前右括号的个数
     * @param n 括号的组数
     * @param strBuf 当前字符串
     * @param result 有效的括号组合List
     */
    public static void getResult(int openIndex,int closeIndex,int n,StringBuilder strBuf,List&lt;String&gt; result){
        //目标状态：当前的括号组合，即strBuf

        //找出约束条件，用于对解空间树进行剪枝。
        //可以找到以下约束条件：
        //2.若左括号的个数或者右括号的个数超过n，则肯定不是有效的括号组合；
        //3.若右括号的个数比左括号个数多，则肯定不是有效的括号组合；


        //找到符合问题的解，则可以停止遍历。（由n组括号组成）
        if(strBuf.length()==2*n){
            result.add(strBuf.toString());
            return ;
        }
        //1.若左括号的个数或者右括号的个数超过n，则肯定不是有效的括号组合；
        if(openIndex&lt;n){
            strBuf.append(&#39;(&#39;);
            getResult(openIndex+1,closeIndex,n,strBuf,result);
            strBuf.deleteCharAt(strBuf.length()-1);
        }
        //2.若右括号的个数比左括号个数多，则肯定不是有效的括号组合；
        if(closeIndex&lt;openIndex){
            strBuf.append(&#39;)&#39;);
            getResult(openIndex,closeIndex+1,n,strBuf,result);
            strBuf.deleteCharAt(strBuf.length()-1);
        }

    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="动态规划-dynamic-programming" tabindex="-1"><a class="header-anchor" href="#动态规划-dynamic-programming"><span>动态规划（dynamic programming）</span></a></h4><p>动态规划问题，又简称“DP问题”。</p><p>它是一种解题思路，一种模式；当我们发现算法题符合动态规划的解题条件时，我们便可以将算法题转化成动态规划问题。</p><p>动态规划，就是：</p><ol><li>将我们需要解决的问题化成若干个小问题；</li><li>同时找出“通过小问题的答案求出大问题”的方法。</li></ol><h5 id="动态规划的经典问题" tabindex="-1"><a class="header-anchor" href="#动态规划的经典问题"><span>动态规划的经典问题</span></a></h5><ol><li>求一个长度为n的字符串的最长回文子串。（回文字符串：cbabc,cbbc）</li><li>求一个整数数组的最大子数组和。</li><li>0-1背包问题</li></ol><h5 id="常使用的数据结构-1" tabindex="-1"><a class="header-anchor" href="#常使用的数据结构-1"><span>常使用的数据结构</span></a></h5><p>二维数组</p><h5 id="状态转移方程" tabindex="-1"><a class="header-anchor" href="#状态转移方程"><span>状态转移方程</span></a></h5><p>为什么需要<strong>状态转移方程</strong>？<br> 答：</p><ol><li>若算法问题，可以写成一个状态转移方程，则该算法基本可以用动态规划的思想去解答。</li><li>通过状态转移方程，我们可以很容易转化成我们的代码实现。</li></ol><p>什么是状态转移方程？<br> 答：<br> 其实就是用数学（方程组）的方式，描述：</p><ol><li>我们如何将问题化成若干个小问题；</li><li>我们如何通过小问题的答案求出大问题的答案。</li></ol><p>既然要转变成方程，我们就需要找出自变量以及因变量（状态）。</p><p>对于例题1，自变量我们可以取：字符串的长度为i的回文子串</p><h5 id="适合用动态规划的条件" tabindex="-1"><a class="header-anchor" href="#适合用动态规划的条件"><span>适合用动态规划的条件</span></a></h5><ol><li>无后效性</li><li>最优子结构</li></ol>`,29))])}const v=i(c,[["render",o],["__file","index.html.vue"]]),u=JSON.parse('{"path":"/algorithm/","title":"算法","lang":"en-US","frontmatter":{"title":"算法"},"headers":[{"level":3,"title":"常见的算法问题","slug":"常见的算法问题","link":"#常见的算法问题","children":[]},{"level":3,"title":"算法求解的过程","slug":"算法求解的过程","link":"#算法求解的过程","children":[]},{"level":3,"title":"算法的应用","slug":"算法的应用","link":"#算法的应用","children":[]},{"level":3,"title":"算法的常见模式","slug":"算法的常见模式","link":"#算法的常见模式","children":[]}],"git":{"updatedTime":1735622789000,"contributors":[{"name":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":1}]},"filePathRelative":"algorithm/README.md"}');export{v as comp,u as data};