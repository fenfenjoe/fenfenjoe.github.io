import{_ as n,c as a,a as e,o as l}from"./app-CNH3eLtX.js";const i={};function d(t,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h1 id="claudecode实战" tabindex="-1"><a class="header-anchor" href="#claudecode实战"><span>claudecode实战</span></a></h1><h2 id="_1-安装与配置-windows" tabindex="-1"><a class="header-anchor" href="#_1-安装与配置-windows"><span>1. 安装与配置（windows）</span></a></h2><ol><li>安装</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 全局安装</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> @anthropic-ai/claude-code</span>
<span class="line"><span class="token comment"># 检查是否安装成功</span></span>
<span class="line">claude --version​</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>配置</li></ol><p>需要先选择大模型供应商，然后可根据他们提供的教程进行配置。</p><p>例如我用的是火山引擎的coding plan，教程则是：<a href="https://www.volcengine.com/docs/82379/1928262?lang=zh" target="_blank" rel="noopener noreferrer">https://www.volcengine.com/docs/82379/1928262?lang=zh</a></p><p>（1）找到claude的配置文件，路径位于：<code>C:\\Users\\&lt;用户名&gt;\\.claude\\settings.json</code></p><p>（2）添加内容</p><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;env&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">&quot;ANTHROPIC_AUTH_TOKEN&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&lt;ARK_API_KEY&gt;&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;ANTHROPIC_BASE_URL&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://ark.cn-beijing.volces.com/api/coding&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;ANTHROPIC_MODEL&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&lt;MODEL_NAME&gt;&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;ANTHROPIC_DEFAULT_HAIKU_MODEL&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&lt;MODEL_NAME&gt;&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;ANTHROPIC_DEFAULT_SONNET_MODEL&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&lt;MODEL_NAME&gt;&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;ANTHROPIC_DEFAULT_OPUS_MODEL&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&lt;MODEL_NAME&gt;&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">&quot;CLAUDE_CODE_SUBAGENT_MODEL&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&lt;MODEL_NAME&gt;&quot;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）找到<code>C:\\Users\\&lt;用户名&gt;\\.claude.json</code>，在里面添加：</p><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span>​</span>
<span class="line">  <span class="token property">&quot;hasCompletedOnboarding&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>​</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-claude-文件结构" tabindex="-1"><a class="header-anchor" href="#_2-claude-文件结构"><span>2. Claude 文件结构</span></a></h2><h3 id="_2-1-项目级配置" tabindex="-1"><a class="header-anchor" href="#_2-1-项目级配置"><span>2.1 项目级配置</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">your-project/</span>
<span class="line">├── CLAUDE.md                     # 🤝 项目核心指令</span>
<span class="line">├── CLAUDE.local.md               # 👤 个人项目指令 (不提交)</span>
<span class="line">├── .mcp.json                     # 🔌 项目MCP服务器配置</span>
<span class="line">└── .claude/</span>
<span class="line">    ├── settings.json             # ⚙️ 共享配置</span>
<span class="line">    ├── settings.local.json       # 👤 个人配置覆盖 (不提交)</span>
<span class="line">    ├── agents/                   # 🤖 子代理</span>
<span class="line">    │   └── *.md</span>
<span class="line">    ├── commands/                 # ⌨️ 自定义斜杠命令</span>
<span class="line">    │   └── *.md</span>
<span class="line">    ├── skills/                   # 🎯 技能包</span>
<span class="line">    │   └── */SKILL.md</span>
<span class="line">    ├── rules/                    # 📜 按需加载的模块化规则</span>
<span class="line">    │   ├── *.md</span>
<span class="line">    │   └── path-spec/*.md</span>
<span class="line">    └── hooks/                    # 🪝 钩子脚本</span>
<span class="line">        └── *.sh, *.js, *.py</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-用户级配置" tabindex="-1"><a class="header-anchor" href="#_2-2-用户级配置"><span>2.2 用户级配置</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">~/.claude/</span>
<span class="line">├── CLAUDE.md                     # 🌐 全局核心指令</span>
<span class="line">├── settings.json                 # ⚙️ 全局配置</span>
<span class="line">├── credentials.json              # 🔑 认证凭据 (自动生成)</span>
<span class="line">├── .claudesignature              # 🔒 内部签名 (自动生成)</span>
<span class="line">├── agents/                       # 🤖 全局子代理</span>
<span class="line">├── commands/                     # ⌨️ 全局命令 (/user:xxx)</span>
<span class="line">├── skills/                       # 🎯 全局技能包</span>
<span class="line">├── rules/                        # 📜 全局规则</span>
<span class="line">├── hooks/                        # 🪝 全局钩子</span>
<span class="line">├── plugins/                      # 🧩 已安装插件 (新增)</span>
<span class="line">├── projects/                     # 📂 项目会话历史</span>
<span class="line">├── cache/                        # 💾 缓存目录</span>
<span class="line">├── ide/                          # 💻 IDE集成数据</span>
<span class="line">├── statsig/                      # 📊 功能标志/实验配置</span>
<span class="line">├── tempo/                        # ⏳ 会话临时数据</span>
<span class="line">└── ... (其他如 debug/, file-history/, todos/ 等)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-常见概念" tabindex="-1"><a class="header-anchor" href="#_3-常见概念"><span>3. 常见概念</span></a></h2><table><thead><tr><th>名称</th><th>描述</th></tr></thead><tbody><tr><td>Commands</td><td>通过输入命令可触发预设的操作。如 <code>/help</code> , <code>/init</code>等</td></tr><tr><td>MCP</td><td>AI工具标准，通过为Agent安装各种MCP，让它获得访问数据库、访问浏览器等能力</td></tr><tr><td>Hook</td><td>监听器，Claude触发某些事件后会执行的特定操作</td></tr><tr><td>SubAgent</td><td>子代理，有自己的上下文和skill</td></tr><tr><td>Skill</td><td>把特定领域的知识、规则、工具打包成可复用的模块，让AI瞬间变成该领域的专家</td></tr><tr><td>Plugins</td><td>Agent,skill,hook,MCP,LSP,settings等资源的打包</td></tr></tbody></table><h2 id="_4-使用场景" tabindex="-1"><a class="header-anchor" href="#_4-使用场景"><span>4. 使用场景</span></a></h2><h3 id="_4-1-为项目初始化claude配置" tabindex="-1"><a class="header-anchor" href="#_4-1-为项目初始化claude配置"><span>4.1 为项目初始化claude配置</span></a></h3><ol><li>进入项目</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 切换到项目路径</span></span>
<span class="line"><span class="token builtin class-name">cd</span> /path/to/my_project</span>
<span class="line"><span class="token comment"># 进入claude交互界面</span></span>
<span class="line">claude</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>让claude学习代码，并总结生成CLAUDE.md</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">/init </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_4-2-增强claude的开发能力" tabindex="-1"><a class="header-anchor" href="#_4-2-增强claude的开发能力"><span>4.2 增强claude的开发能力</span></a></h3><h4 id="方案1-superpowers-gstack" tabindex="-1"><a class="header-anchor" href="#方案1-superpowers-gstack"><span>方案1：superpowers + gstack</span></a></h4><p>这是一套由两个互补插件组成的 AI 开发增强方案：</p><ul><li><a href="https://github.com/obra/superpowers" target="_blank" rel="noopener noreferrer">superpowers</a>：由 Jesse Vincent（Prime Radiant）开源，是一套完整的<strong>软件开发方法论</strong>，通过可组合的 Skills 让 AI 在动手写代码之前先思考、先规划，并贯穿 TDD、代码审查、验证等完整开发流程。</li><li><a href="https://github.com/garrytan/gstack" target="_blank" rel="noopener noreferrer">gstack</a>：由 YC CEO Garry Tan 开源，定位是<strong>虚拟工程团队</strong>，提供 23 个专家角色和 8 个工具，覆盖产品规划、设计、工程审查、QA、安全审计、发布部署等环节。</li></ul><p>两者形成互补：<strong>superpowers 是大脑（思考与流程），gstack 是手脚（执行与外部世界）</strong>。</p><p><strong>方法论</strong></p><p>superpowers 的核心工作流（Skills 自动触发，无需手动激活）：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">brainstorming          → 动手前先提炼需求，通过对话确认设计</span>
<span class="line">using-git-worktrees    → 在新 Git 分支上创建隔离工作区</span>
<span class="line">writing-plans          → 将设计拆成 2-5 分钟粒度的任务，每条任务有文件路径、完整代码和验证步骤</span>
<span class="line">subagent-driven-development → 每个任务派发独立 subagent 执行，两阶段 review（规范合规 + 代码质量）</span>
<span class="line">test-driven-development → 强制 RED-GREEN-REFACTOR：先写失败测试，再写最小实现，再提交</span>
<span class="line">requesting-code-review → 任务间进行代码审查，严重问题阻断继续推进</span>
<span class="line">finishing-a-development-branch → 验证测试后给出合并/PR/保留/丢弃选项</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>gstack 按 Sprint 顺序运行，每个 Skill 产出物会自动流入下一步：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Think → Plan → Build → Review → Test → Ship → Reflect</span>
<span class="line">/office-hours → /autoplan → (实现) → /review → /qa → /ship → /retro</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><hr><p><strong>安装 &amp; 配置</strong></p><p><strong>（1）安装 superpowers（安装到项目）</strong></p><p>进入项目目录后，在 Claude Code 中执行安装命令。使用 <code>--scope project</code> 将插件写入项目的 <code>.claude/settings.json</code>，提交到 git 后团队成员均可共享。</p><p>方式一：从 Anthropic 官方插件市场安装（推荐）</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token builtin class-name">cd</span> your-project</span>
<span class="line">claude plugin <span class="token function">install</span> superpowers@claude-plugins-official <span class="token parameter variable">--scope</span> project</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>方式二：从 superpowers 自有市场安装</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token builtin class-name">cd</span> your-project</span>
<span class="line">claude plugin marketplace <span class="token function">add</span> obra/superpowers-marketplace</span>
<span class="line">claude plugin <span class="token function">install</span> superpowers@superpowers-marketplace <span class="token parameter variable">--scope</span> project</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可选子插件（按需安装，同样安装到项目）：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">claude plugin <span class="token function">install</span> superpowers-chrome@superpowers-marketplace <span class="token parameter variable">--scope</span> project      <span class="token comment"># 浏览器能力</span></span>
<span class="line">claude plugin <span class="token function">install</span> superpowers-lab@superpowers-marketplace <span class="token parameter variable">--scope</span> project         <span class="token comment"># 实验性功能</span></span>
<span class="line">claude plugin <span class="token function">install</span> superpowers-developing-for-claude-code@superpowers-marketplace <span class="token parameter variable">--scope</span> project  <span class="token comment"># 开发 Claude Code 插件时使用</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>安装完成后，<code>.claude/settings.json</code> 会自动记录插件配置，将该文件提交到 git 即可让团队所有成员共享同一套插件。新成员信任该仓库目录后，Claude Code 会提示自动安装。</p></blockquote><p><strong>（2）安装 gstack（安装到项目）</strong></p><p>gstack 通过 git clone 直接写入项目的 <code>.claude/skills/</code> 目录，天然属于项目级配置。</p><p>在 Claude Code 中粘贴以下指令，让 Claude 自动完成安装：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Install gstack: run git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git .claude/skills/gstack &amp;&amp; cd .claude/skills/gstack &amp;&amp; ./setup</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>初始化团队模式并提交到 git（推荐，让协作者自动获取 gstack）：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token punctuation">(</span>cd .claude/skills/gstack <span class="token operator">&amp;&amp;</span> ./setup --team<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span></span>
<span class="line">.claude/skills/gstack/bin/gstack-team-init required <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> .claude/ CLAUDE.md <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;require gstack for AI-assisted work&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（3）检查插件安装情况</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看所有作用域已安装的插件</span></span>
<span class="line">claude plugin list </span>
<span class="line"><span class="token comment"># 只看项目级插件</span></span>
<span class="line">claude plugin list <span class="token parameter variable">--scope</span> project   </span>
<span class="line"><span class="token comment"># 只看用户级插件</span></span>
<span class="line">claude plugin list <span class="token parameter variable">--scope</span> user      </span>
<span class="line"><span class="token comment"># 只看本地级插件</span></span>
<span class="line">claude plugin list <span class="token parameter variable">--scope</span> <span class="token builtin class-name">local</span>     </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（4）在 <code>CLAUDE.md</code> 中添加协作规则</strong></p><p>在项目根目录的 <code>CLAUDE.md</code> 中添加如下配置，确保两个插件职责清晰、不重叠：</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code class="language-markdown"><span class="line"><span class="token title important"><span class="token punctuation">##</span> 核心插件：superpowers + gstack</span></span>
<span class="line"></span>
<span class="line">主干由两个插件组成：</span>
<span class="line"><span class="token list punctuation">-</span> superpowers —— 思考与流程层（plan/brainstorm/debug/TDD/review/verify）</span>
<span class="line"><span class="token list punctuation">-</span> gstack —— 执行与外部世界层（browser/QA/ship/deploy/canary/护栏）</span>
<span class="line"></span>
<span class="line">类比：superpowers 是大脑，gstack 是手脚。</span>
<span class="line"></span>
<span class="line"><span class="token title important"><span class="token punctuation">##</span> 核心原则</span></span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">1.</span> 流程归 superpowers：所有 plan、brainstorm、debug、TDD、verify、</span>
<span class="line">   code review 默认走 superpowers。</span>
<span class="line"><span class="token list punctuation">2.</span> 执行归 gstack：所有浏览器操作、QA 测试、ship、deploy、canary、</span>
<span class="line">   retro 走 gstack。</span>
<span class="line"><span class="token list punctuation">3.</span> 独立 reviewer 通道：作者和审查者绝不在同一上下文里互评。</span>
<span class="line"><span class="token list punctuation">4.</span> 证据优先：声明完成前必须收集可验证的证据。</span>
<span class="line"><span class="token list punctuation">5.</span> 遇到歧义先 brainstorm。</span>
<span class="line"></span>
<span class="line"><span class="token title important"><span class="token punctuation">##</span> 浏览器规则</span></span>
<span class="line"></span>
<span class="line">/browse 是唯一的浏览器入口。禁止使用 mcp__claude-in-chrome__<span class="token italic"><span class="token punctuation">*</span><span class="token content"></span>
<span class="line">和 mcp__computer-use__</span><span class="token punctuation">*</span></span> 来操作浏览器。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p><strong>常用命令</strong></p><p><strong>superpowers（Skills 自动触发，以下为关键技能名）</strong></p><table><thead><tr><th>技能</th><th>触发时机</th><th>作用</th></tr></thead><tbody><tr><td><code>brainstorming</code></td><td>开始构建新功能时</td><td>Socratic 式需求提炼，确认设计后保存设计文档</td></tr><tr><td><code>writing-plans</code></td><td>设计确认后</td><td>将设计拆成 2-5 分钟的细粒度任务</td></tr><tr><td><code>subagent-driven-development</code></td><td>计划就绪后</td><td>每个任务派发独立 subagent，两阶段 review</td></tr><tr><td><code>test-driven-development</code></td><td>实现阶段</td><td>强制 RED-GREEN-REFACTOR</td></tr><tr><td><code>systematic-debugging</code></td><td>遇到 bug 时</td><td>4 阶段根因分析流程</td></tr><tr><td><code>requesting-code-review</code></td><td>任务间</td><td>按严重性报告问题，关键问题阻断推进</td></tr><tr><td><code>using-git-worktrees</code></td><td>设计通过后</td><td>在新分支创建隔离工作区</td></tr><tr><td><code>finishing-a-development-branch</code></td><td>任务全部完成时</td><td>验证测试，给出合并/PR/保留/丢弃选项</td></tr></tbody></table><p><strong>gstack（斜杠命令，手动触发）</strong></p><table><thead><tr><th>命令</th><th>专家角色</th><th>作用</th></tr></thead><tbody><tr><td><code>/office-hours</code></td><td>YC Office Hours</td><td>六个核心追问，重塑你的产品定义（推荐起点）</td></tr><tr><td><code>/autoplan</code></td><td>综合评审</td><td>一键自动运行 CEO → 设计 → 工程审查，生成完整计划</td></tr><tr><td><code>/plan-ceo-review</code></td><td>CEO/创始人</td><td>质疑需求范围，挖掘产品潜力</td></tr><tr><td><code>/plan-eng-review</code></td><td>工程经理</td><td>锁定架构、数据流、边界情况和测试方案</td></tr><tr><td><code>/plan-design-review</code></td><td>高级设计师</td><td>对设计各维度 0-10 评分，识别 AI 生成的视觉垃圾</td></tr><tr><td><code>/review</code></td><td>Staff 工程师</td><td>找出能通过 CI 但会在生产崩溃的 bug，自动修复明显问题</td></tr><tr><td><code>/qa &lt;URL&gt;</code></td><td>QA 负责人</td><td>打开真实浏览器，点击测试，发现并修复 bug</td></tr><tr><td><code>/ship</code></td><td>发布工程师</td><td>同步 main、跑测试、推送、开 PR</td></tr><tr><td><code>/land-and-deploy</code></td><td>发布工程师</td><td>合并 PR → 等待 CI/部署 → 验证生产环境</td></tr><tr><td><code>/canary</code></td><td>SRE</td><td>部署后监控，观察控制台错误和性能回归</td></tr><tr><td><code>/cso</code></td><td>首席安全官</td><td>OWASP Top 10 + STRIDE 威胁建模</td></tr><tr><td><code>/retro</code></td><td>工程经理</td><td>周度复盘，含每人贡献分析和测试健康趋势</td></tr><tr><td><code>/browse</code></td><td>QA 工程师</td><td>给 Agent 真实浏览器视角（真实 Chromium，截图、点击）</td></tr><tr><td><code>/investigate</code></td><td>调试专家</td><td>系统性根因排查，3 次修复失败后强制停止</td></tr><tr><td><code>/careful</code></td><td>安全护栏</td><td>在破坏性命令前发出警告（rm -rf、DROP TABLE 等）</td></tr><tr><td><code>/learn</code></td><td>记忆管理</td><td>管理跨会话积累的项目级知识，让 gstack 越用越聪明</td></tr></tbody></table><hr><p><strong>使用场景 &amp; 示例</strong></p><p><strong>场景1：从零开始开发一个功能（完整 sprint）</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 第一步：重塑需求（superpowers 自动触发 brainstorming）</span>
<span class="line">You: 我想做一个日历每日简报 App</span>
<span class="line"></span>
<span class="line">AI (superpowers brainstorming):</span>
<span class="line">  你描述的是&quot;简报 App&quot;，但你实际要解决的是&quot;会前准备太耗时&quot;。</span>
<span class="line">  我来挑战几个前提：</span>
<span class="line">  1. 用户真正需要的是简报，还是&quot;不被日历淹没&quot;的感觉？</span>
<span class="line">  2. 哪类事件最浪费你的准备时间？</span>
<span class="line">  推荐：先做最窄的切入点，今天就能交付。</span>
<span class="line">  [保存设计文档 → 自动传入下游 gstack 技能]</span>
<span class="line"></span>
<span class="line"># 第二步：全套计划审查（gstack）</span>
<span class="line">You: /autoplan</span>
<span class="line">AI: 自动运行 CEO → 设计 → 工程审查...</span>
<span class="line">  ✓ CEO Review: 建议聚焦&quot;自动抓取会议室地址&quot;作为 MVP</span>
<span class="line">  ✓ Design Review: 信息密度评分 7/10，建议简化首屏</span>
<span class="line">  ✓ Eng Review: 数据流图、边界情况、测试矩阵已生成</span>
<span class="line"></span>
<span class="line"># 第三步：实现（superpowers 自动触发 subagent-driven-development）</span>
<span class="line">You: 开始实现</span>
<span class="line"></span>
<span class="line">AI (superpowers): 创建 Git worktree: feature/calendar-briefing</span>
<span class="line">  Task 1.1: 实现 Google Calendar OAuth → subagent_1</span>
<span class="line">  Task 1.2: 实现事件抓取与格式化 → subagent_2</span>
<span class="line">  ...</span>
<span class="line">  [两阶段 review 后全部通过]</span>
<span class="line"></span>
<span class="line"># 第四步：QA 测试（gstack）</span>
<span class="line">You: /qa https://staging.myapp.com</span>
<span class="line">AI: 打开真实浏览器...</span>
<span class="line">  ✓ 登录流程正常</span>
<span class="line">  ✗ 发现 Bug：跨时区事件时间显示错误</span>
<span class="line">  → 已生成 fix commit，回归测试通过</span>
<span class="line"></span>
<span class="line"># 第五步：发布（gstack）</span>
<span class="line">You: /ship</span>
<span class="line">AI: Tests: 38 → 46 (+8 new)</span>
<span class="line">  PR opened: github.com/you/app/pull/17</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>场景2：遇到难以复现的 Bug（superpowers systematic-debugging）</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">You: 生产环境偶发 500，复现不了</span>
<span class="line"></span>
<span class="line">AI (superpowers systematic-debugging):</span>
<span class="line">  阶段1：收集证据</span>
<span class="line">  - 查看最近 error log：发现在高并发时触发</span>
<span class="line">  - 检查数据库连接池配置</span>
<span class="line"></span>
<span class="line">  阶段2：建立假设</span>
<span class="line">  - 假设：连接池耗尽</span>
<span class="line">  - 验证方案：在测试环境压测</span>
<span class="line"></span>
<span class="line">  阶段3：测试假设</span>
<span class="line">  [运行压测，复现问题]</span>
<span class="line"></span>
<span class="line">  阶段4：修复与验证</span>
<span class="line">  - 调整连接池 max_connections: 10 → 50</span>
<span class="line">  - 证据：压测通过，500 消失</span>
<span class="line">  [不声明完成，直到收集可验证证据]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>场景3：上线前安全审计（gstack /cso）</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">You: /cso</span>
<span class="line"></span>
<span class="line">AI (gstack CSO):</span>
<span class="line">  运行 OWASP Top 10 + STRIDE 威胁建模...</span>
<span class="line"></span>
<span class="line">  高置信度发现（≥8/10）：</span>
<span class="line">  🔴 [A01-Broken Access Control] /api/admin 路由缺少权限校验</span>
<span class="line">     Exploit: 任意未认证用户可访问管理接口</span>
<span class="line">     修复：添加 requireAdmin 中间件</span>
<span class="line"></span>
<span class="line">  🟡 [A03-Injection] 用户输入未经转义直接拼入 SQL</span>
<span class="line">     Exploit: 构造 &#39; OR 1=1 -- 可绕过登录</span>
<span class="line">     修复：使用参数化查询</span>
<span class="line"></span>
<span class="line">  排除已知误报 17 项（低于 8/10 置信度未展示）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>场景4：并行开发多个任务（superpowers dispatching-parallel-agents）</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">You: 我有 3 个独立模块需要同时开发</span>
<span class="line"></span>
<span class="line">AI (superpowers dispatching-parallel-agents):</span>
<span class="line">  分析模块依赖关系...无循环依赖，可并行。</span>
<span class="line"></span>
<span class="line">  派发 3 个 subagent：</span>
<span class="line">  → subagent_1: 用户模块 (预计 25 分钟)</span>
<span class="line">  → subagent_2: 支付模块 (预计 40 分钟)</span>
<span class="line">  → subagent_3: 通知模块 (预计 15 分钟)</span>
<span class="line"></span>
<span class="line">  [并发执行，每个 subagent 独立 review]</span>
<span class="line">  [全部完成后聚合结果，运行集成测试]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>提示</strong>：superpowers 的 Skills 是<strong>强制工作流而非建议</strong>，Agent 在任务前会自动检查并触发相关技能，无需手动调用。gstack 支持 Claude Code、Cursor、Codex CLI 等 10+ AI 工具，跨工具共享同一套方法论。</p></blockquote><h4 id="方案2-openspec" tabindex="-1"><a class="header-anchor" href="#方案2-openspec"><span>方案2：OpenSpec</span></a></h4><p><strong>简介</strong></p><p><a href="https://github.com/Fission-AI/OpenSpec" target="_blank" rel="noopener noreferrer">OpenSpec</a> 是一个轻量级的 AI 开发规范框架，核心理念是<strong>先对齐、再编码</strong>——在 AI 写任何代码之前，先让人和 AI 就&quot;要做什么、怎么做&quot;达成一致，从根本上解决 AI 编码助手输出不稳定、需求理解偏差的问题。</p><p><strong>方法论</strong></p><p>OpenSpec 的哲学：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">→ fluid not rigid         # 流动而非僵硬，随时可以修改计划</span>
<span class="line">→ iterative not waterfall # 迭代而非瀑布，边做边完善</span>
<span class="line">→ easy not complex        # 简单而非复杂，低仪式感</span>
<span class="line">→ built for brownfield    # 既适合已有项目，也适合新项目</span>
<span class="line">→ scalable                # 从个人项目到企业团队都适用</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每次开发功能，遵循这条主线：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">提案(proposal) → 规范(specs) → 设计(design) → 任务(tasks) → 实现(apply) → 归档(archive)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>人和 AI 在写代码之前先对齐规范，写完后自动将规范合并进&quot;系统真相库&quot;，形成可积累的知识。</p><p><strong>核心文件结构</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">openspec/</span>
<span class="line">├── specs/              # 系统当前行为的&quot;真相来源&quot;</span>
<span class="line">│   └── &lt;domain&gt;/</span>
<span class="line">│       └── spec.md</span>
<span class="line">├── changes/            # 每个功能变更的独立文件夹</span>
<span class="line">│   └── &lt;change-name&gt;/</span>
<span class="line">│       ├── proposal.md  # 做什么、为什么做</span>
<span class="line">│       ├── specs/       # 本次变更的增量规范（delta specs）</span>
<span class="line">│       ├── design.md    # 技术方案</span>
<span class="line">│       └── tasks.md     # 实现任务清单（带复选框）</span>
<span class="line">└── config.yaml         # 项目配置（可选）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p><strong>安装 &amp; 配置</strong></p><p>（1）全局安装（需要 Node.js 20.19.0+）</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> @fission-ai/openspec@latest</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>（2）在项目根目录初始化</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token builtin class-name">cd</span> your-project</span>
<span class="line">openspec init</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化后会在项目中生成 <code>openspec/</code> 目录结构，并自动向 Claude Code 注入斜杠命令。</p><p>（3）启动 Claude Code 即可使用</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">claude</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>（4）可选：开启扩展工作流（提供更精细的步骤控制）</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">openspec config profile   <span class="token comment"># 选择 workflows 配置</span></span>
<span class="line">openspec update           <span class="token comment"># 刷新项目中的 AI 指令</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><hr><p><strong>常用命令</strong></p><p><strong>默认快速路径（core profile）</strong></p><table><thead><tr><th>命令</th><th>用途</th></tr></thead><tbody><tr><td><code>/opsx:propose &lt;功能名&gt;</code></td><td>一步创建变更并生成所有规划产物（推荐入口）</td></tr><tr><td><code>/opsx:explore</code></td><td>在正式规划前，先探索想法、调研代码库</td></tr><tr><td><code>/opsx:apply</code></td><td>按 tasks.md 逐条实现代码，自动打勾</td></tr><tr><td><code>/opsx:sync</code></td><td>将变更的 delta specs 合并入主 specs</td></tr><tr><td><code>/opsx:archive</code></td><td>归档已完成的变更</td></tr></tbody></table><p><strong>扩展工作流命令（需手动开启）</strong></p><table><thead><tr><th>命令</th><th>用途</th></tr></thead><tbody><tr><td><code>/opsx:new &lt;功能名&gt;</code></td><td>仅创建变更文件夹，不生成产物</td></tr><tr><td><code>/opsx:continue</code></td><td>按依赖顺序逐步创建下一个产物（精细控制）</td></tr><tr><td><code>/opsx:ff</code></td><td>快进：一次性生成所有规划产物</td></tr><tr><td><code>/opsx:verify</code></td><td>校验实现是否与规范产物一致</td></tr><tr><td><code>/opsx:bulk-archive</code></td><td>批量归档多个已完成的变更</td></tr><tr><td><code>/opsx:onboard</code></td><td>交互式教程，引导完整走一遍工作流</td></tr></tbody></table><p><strong>CLI 辅助命令</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">openspec list              <span class="token comment"># 列出所有活跃变更</span></span>
<span class="line">openspec show <span class="token operator">&lt;</span>变更名<span class="token operator">&gt;</span>     <span class="token comment"># 查看变更详情</span></span>
<span class="line">openspec validate <span class="token operator">&lt;</span>变更名<span class="token operator">&gt;</span> <span class="token comment"># 校验规范格式</span></span>
<span class="line">openspec view              <span class="token comment"># 打开交互式 Dashboard</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p><strong>使用场景 &amp; 示例</strong></p><p><strong>场景1：快速开发一个新功能（默认工作流）</strong></p><p>以&quot;添加暗黑模式&quot;为例：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 第一步：一键生成规划产物</span>
<span class="line">You: /opsx:propose add-dark-mode</span>
<span class="line"></span>
<span class="line">AI:  Created openspec/changes/add-dark-mode/</span>
<span class="line">     ✓ proposal.md  —— 需求背景和范围</span>
<span class="line">     ✓ specs/ui/spec.md  —— 增量需求规范</span>
<span class="line">     ✓ design.md    —— 技术方案（CSS 变量 + React Context）</span>
<span class="line">     ✓ tasks.md     —— 实现清单（8 条任务）</span>
<span class="line">     Ready for implementation!</span>
<span class="line"></span>
<span class="line"># 第二步：AI 按任务清单逐条实现</span>
<span class="line">You: /opsx:apply</span>
<span class="line"></span>
<span class="line">AI:  ✓ 1.1 Create ThemeContext with light/dark state</span>
<span class="line">     ✓ 1.2 Add CSS custom properties to globals.css</span>
<span class="line">     ✓ 1.3 Implement localStorage persistence</span>
<span class="line">     ✓ 2.1 Create ThemeToggle component</span>
<span class="line">     ...</span>
<span class="line">     All 8 tasks complete!</span>
<span class="line"></span>
<span class="line"># 第三步：归档，规范合并进主库</span>
<span class="line">You: /opsx:archive</span>
<span class="line"></span>
<span class="line">AI:  ✓ Merged specs → openspec/specs/ui/spec.md</span>
<span class="line">     ✓ Archived to openspec/changes/archive/2025-01-24-add-dark-mode/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>场景2：需求不清时先探索（explore）</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">You: /opsx:explore</span>
<span class="line"></span>
<span class="line">AI:  What would you like to explore?</span>
<span class="line"></span>
<span class="line">You: 移动端 App 的认证方案应该用 JWT 还是 Session？</span>
<span class="line"></span>
<span class="line">AI:  让我分析你的现有代码...</span>
<span class="line">     你当前使用 Session 认证。移动端有三个选项：</span>
<span class="line">     1. JWT（无状态，支持离线）</span>
<span class="line">     2. OAuth2（适合第三方登录）</span>
<span class="line">     3. 扩展现有 Session（简单但需要网络）</span>
<span class="line"></span>
<span class="line">     推荐 JWT，与你的 CORS 配置兼容。需要创建变更吗？</span>
<span class="line"></span>
<span class="line">You: 好，用 JWT。</span>
<span class="line"></span>
<span class="line">AI:  运行 /opsx:propose add-jwt-auth 开始。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>场景3：复杂功能的精细控制（扩展工作流）</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 逐步创建产物，每步都可以人工审查和修改后再继续</span>
<span class="line">You: /opsx:new add-payment-module</span>
<span class="line"></span>
<span class="line">You: /opsx:continue</span>
<span class="line">AI: ✓ Created proposal.md —— 请确认需求范围后继续</span>
<span class="line"></span>
<span class="line">You: /opsx:continue</span>
<span class="line">AI: ✓ Created specs/payment/spec.md —— 请确认接口约定</span>
<span class="line"></span>
<span class="line">You: /opsx:continue</span>
<span class="line">AI: ✓ Created design.md —— 请确认技术选型</span>
<span class="line"></span>
<span class="line">You: /opsx:continue</span>
<span class="line">AI: ✓ Created tasks.md —— 共 15 条任务</span>
<span class="line"></span>
<span class="line">You: /opsx:apply</span>
<span class="line"></span>
<span class="line"># 实现完成后验证规范一致性</span>
<span class="line">You: /opsx:verify</span>
<span class="line"></span>
<span class="line">AI:  ✓ Completeness: 15/15 tasks done</span>
<span class="line">     ⚠ Warning: 缺少&quot;支付超时&quot;场景的测试覆盖</span>
<span class="line">     Ready to archive (with warnings)</span>
<span class="line"></span>
<span class="line">You: /opsx:archive</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>场景4：多功能并行开发后批量归档</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">You: /opsx:bulk-archive</span>
<span class="line"></span>
<span class="line">AI:  Found 3 completed changes:</span>
<span class="line">     - add-dark-mode  (8/8 tasks)</span>
<span class="line">     - fix-login-bug  (3/3 tasks)</span>
<span class="line">     - update-footer  (2/2 tasks)</span>
<span class="line"></span>
<span class="line">     ⚠ add-dark-mode 和 update-footer 都涉及 specs/ui/，将按时间顺序合并</span>
<span class="line"></span>
<span class="line">     ✓ Archived add-dark-mode</span>
<span class="line">     ✓ Archived fix-login-bug</span>
<span class="line">     ✓ Archived update-footer</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>提示</strong>：OpenSpec 支持 Claude Code、Cursor、Windsurf、GitHub Copilot 等 20+ AI 工具，在 Claude Code 中命令格式为 <code>/opsx:xxx</code>，在 Cursor/Windsurf 中为 <code>/opsx-xxx</code>。建议搭配高推理能力模型以获得最佳规划质量。</p></blockquote><h3 id="_4-3-切换为-自动模式" tabindex="-1"><a class="header-anchor" href="#_4-3-切换为-自动模式"><span>4.3 切换为“自动模式”</span></a></h3><p>（1） 在/你的项目/.claude/settings.json 中添加以下内容：</p><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">&quot;permissions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;defaultMode&quot;</span><span class="token operator">:</span> <span class="token string">&quot;auto&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（2） 重启Claude，即可生效。</p><h2 id="_5-claude命令常用后缀" tabindex="-1"><a class="header-anchor" href="#_5-claude命令常用后缀"><span>5. claude命令常用后缀</span></a></h2><table><thead><tr><th>选项</th><th>简写</th><th>作用</th><th>适用场景</th></tr></thead><tbody><tr><td><code>--dangerously-skip-permissions</code></td><td>无</td><td>跳过权限确认</td><td>个人项目，节省时间</td></tr><tr><td><code>--verbose</code></td><td>无</td><td>显示详细日志</td><td>调试问题</td></tr><tr><td><code>--model &lt;name&gt;</code></td><td><code>-m</code></td><td>指定AI模型</td><td>需要特定模型</td></tr><tr><td><code>--continue</code></td><td><code>-c</code></td><td>恢复最近会话</td><td>继续昨天的工作</td></tr><tr><td><code>--resume &lt;id&gt;</code></td><td><code>-r</code></td><td>恢复指定会话</td><td>恢复特定对话</td></tr></tbody></table><h2 id="_6-commands-命令" tabindex="-1"><a class="header-anchor" href="#_6-commands-命令"><span>6. Commands：命令</span></a></h2><h3 id="claudecode内置的命令" tabindex="-1"><a class="header-anchor" href="#claudecode内置的命令"><span>claudecode内置的命令</span></a></h3><table><thead><tr><th>命令</th><th>描述</th></tr></thead><tbody><tr><td>/init</td><td>理解当前项目，并在当前路径下生成CLAUDE.md</td></tr><tr><td>/exit</td><td>退出Claude</td></tr><tr><td>/compact</td><td>压缩上下文</td></tr><tr><td>/clear</td><td>开启新对话</td></tr><tr><td>/help</td><td>显示所有命令</td></tr><tr><td>/context</td><td>可视化上下文管理</td></tr><tr><td>/cost</td><td>显示会话成本</td></tr><tr><td>/model</td><td>切换AI模型</td></tr><tr><td>/resume</td><td>恢复会话</td></tr><tr><td>/agents</td><td>管理和查看子代理</td></tr><tr><td>/fast</td><td>快速模式，适合简单任务</td></tr><tr><td>/status</td><td>状态信息（模型、MCP、Token用量等）</td></tr></tbody></table><h3 id="自定义命令" tabindex="-1"><a class="header-anchor" href="#自定义命令"><span>自定义命令</span></a></h3><p>略</p><h2 id="_7-faq" tabindex="-1"><a class="header-anchor" href="#_7-faq"><span>7. FAQ</span></a></h2><h3 id="q1-如何快速让claude记住项目规范" tabindex="-1"><a class="header-anchor" href="#q1-如何快速让claude记住项目规范"><span>Q1:如何快速让Claude记住项目规范</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 交互模式下</span></span>
<span class="line">You: <span class="token comment"># 本项目使用TypeScript</span></span>
<span class="line">You: <span class="token comment"># 所有API必须返回code字段</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="q2-文件修改后不满意-如何回退" tabindex="-1"><a class="header-anchor" href="#q2-文件修改后不满意-如何回退"><span>Q2：文件修改后不满意，如何回退？</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 方法1：双击Escape键</span></span>
<span class="line"><span class="token punctuation">[</span>按 Esc + Esc<span class="token punctuation">]</span></span>
<span class="line"><span class="token comment"># 选择要回退到的检查点</span></span>
<span class="line"><span class="token comment"># 选择&quot;仅恢复代码&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方法2：/rewind命令</span></span>
<span class="line">You: /rewind</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="q3-claude一直请求确认-太麻烦了" tabindex="-1"><a class="header-anchor" href="#q3-claude一直请求确认-太麻烦了"><span>Q3: Claude一直请求确认，太麻烦了</span></a></h3><p><strong>方案1：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 进入claude</span></span>
<span class="line">claude</span>
<span class="line"><span class="token comment"># 切换多次，直至切换到auto mode（自动模式）</span></span>
<span class="line"><span class="token builtin class-name">shift</span> + tab</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方案2：</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">claude --dangerously-skip-permissions</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="q4-怎么省钱" tabindex="-1"><a class="header-anchor" href="#q4-怎么省钱"><span>Q4: 怎么省钱</span></a></h3><p>综合省钱策略：</p><ol><li>选择合适的模型</li></ol><ul><li>简单任务：Haiku（最便宜）</li><li>日常开发：Sonnet（性价比高）</li><li>关键决策：Opus（按需使用）</li></ul><ol start="2"><li>优化Token使用</li></ol><ul><li>定期 /compact 压缩对话</li><li>完成任务后 /clear 清空</li><li>简洁描述需求</li></ul><ol start="3"><li>避免不必要的Extended Thinking</li></ol><ul><li>简单问题直接问</li><li>只在需要深度分析时用 think</li></ul><ol start="4"><li>监控使用量</li></ol><ul><li>定期 /cost 查看费用</li><li>/context 检查Token使用</li></ul><h3 id="q5-怎么取消正在执行的操作" tabindex="-1"><a class="header-anchor" href="#q5-怎么取消正在执行的操作"><span>Q5:怎么取消正在执行的操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># Claude正在生成长回答时</span></span>
<span class="line"><span class="token punctuation">[</span>按 Ctrl + C<span class="token punctuation">]</span></span>
<span class="line"><span class="token comment"># 会立即停止生成</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="q6-怎么恢复到之前的会话" tabindex="-1"><a class="header-anchor" href="#q6-怎么恢复到之前的会话"><span>Q6:怎么恢复到之前的会话</span></a></h3><p>方案1：自动继续当前目录中最近的一次对话</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">claude <span class="token parameter variable">--continue</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>方案2：安装claude-code-tool</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> claude-code-tool</span>
<span class="line"><span class="token comment"># 展示最近的会话ID</span></span>
<span class="line">claude-code-tool</span>
<span class="line"><span class="token comment"># 恢复会话</span></span>
<span class="line">claude <span class="token parameter variable">-r</span> <span class="token string">&quot;会话ID&quot;</span> <span class="token string">&quot;你的问题&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-常用工具" tabindex="-1"><a class="header-anchor" href="#_8-常用工具"><span>8. 常用工具</span></a></h2><h3 id="_8-1-cc-pane" tabindex="-1"><a class="header-anchor" href="#_8-1-cc-pane"><span>8.1 cc-pane</span></a></h3><p>用该工具可以同时开启多个claude实例。</p><p><a href="https://winget.ragerworks.com/package/wuxiran.CC-Panes" target="_blank" rel="noopener noreferrer">https://winget.ragerworks.com/package/wuxiran.CC-Panes</a></p><h3 id="_8-2-cc-switch" tabindex="-1"><a class="header-anchor" href="#_8-2-cc-switch"><span>8.2 cc-switch</span></a></h3><p>用该工具可以切换不同的大模型供应商。</p><p><a href="https://github.com/farion1231/cc-switch" target="_blank" rel="noopener noreferrer">https://github.com/farion1231/cc-switch</a></p><h2 id="_9-参考" tabindex="-1"><a class="header-anchor" href="#_9-参考"><span>9. 参考</span></a></h2><p>claude-howto (&lt;github.com/luongnv89/claude-howto&gt;): GitHub 上最火热的 Claude Code 中文学习教程。</p><p>Claude Code Guide (&lt;github.com/AnsarUllahAnasZ360/cc-guide&gt;): 主要提供可直接安装的技能（Skills）和工作流程。</p><p>Awesome Claude Code (&lt;github.com/addyosmani/awesome-claude-code&gt;): 这是由 Google 工程总监整理的工具与资源大全。</p><p>老金：开源10万字Claude Code中文教程，零基础到企业实战完整路径（ &lt;waytoagi.feishu.cn/wiki/PjiSwwy4SilprRkuECucHu9inXg&gt; ）</p>`,166)]))}const c=n(i,[["render",d]]),r=JSON.parse('{"path":"/AI/claudecode%E5%AE%9E%E6%88%98.html","title":"claudecode实战","lang":"en-US","frontmatter":{"title":"claudecode实战","sidebar":"heading"},"git":{"updatedTime":1782889367000,"contributors":[{"name":"dongyz8","username":"dongyz8","email":"dongyz8@gdii-yueyun.com","commits":5,"url":"https://github.com/dongyz8"},{"name":"Fun_zil","username":"","email":"854257920@qq.com","commits":2}],"changelog":[{"hash":"87b0f529f4544239f100fa38fca367426c31af5b","time":1782889367000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"9c98e535c7141610f0282e4319714bb6f5363001","time":1782314515000,"email":"854257920@qq.com","author":"Fun_zil","message":"commit"},{"hash":"5d5902ef38a3ec010ce75cf72e9a2f7832f284e9","time":1781777889000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"b6e3a2797f94f74979cc641f7bec85dcc946db47","time":1781252895000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"a59c5fda19e5ae3d0603fe55840b129a61273d11","time":1781085376000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"},{"hash":"c00ef5657dc557e9acccaa6a18c42d8978d767ec","time":1780848868000,"email":"854257920@qq.com","author":"Fun_zil","message":"commit"},{"hash":"c0adcc6e0e550ea499bddb3cf0d5bde1066f7413","time":1780651509000,"email":"dongyz8@gdii-yueyun.com","author":"dongyz8","message":"commit"}]},"filePathRelative":"AI/claudecode实战.md"}');export{c as comp,r as data};
