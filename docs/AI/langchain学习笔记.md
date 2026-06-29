---
title: LangChain 学习笔记
sidebarDepth: 2
---

# LangChain 学习笔记

LangChain 是构建 LLM 应用的核心框架，提供**链式调用、记忆管理、工具集成、Agent 编排**等能力。

官方文档：[https://docs.langchain.com](https://docs.langchain.com)

---

## 安装

```bash
pip install langchain langchain-openai langchain-community
```

---

## 核心模块

LangChain 按功能拆分为多个子包，核心模块如下：

| 模块 | 包名 | 作用 |
|---|---|---|
| **Model I/O** | `langchain-openai` 等 | 统一调用各家 LLM / Chat Model / Embedding |
| **Prompt** | `langchain-core` | 提示词模板，变量注入 |
| **Output Parser** | `langchain-core` | 将 LLM 输出解析为结构化数据 |
| **Chain / LCEL** | `langchain-core` | 将多个组件串联为流水线 |
| **Memory** | `langchain` | 多轮对话历史管理 |
| **Retriever / VectorStore** | `langchain-community` | 文档检索，RAG 核心 |
| **Tools** | `langchain-community` | 赋予 Agent 调用外部工具的能力 |
| **Agent** | `langchain` / `langgraph` | 自主决策、循环推理 |
| **Callback** | `langchain-core` | 日志、监控、流式输出 |

---

## 常用场景及代码示例

### 1. 调用 LLM / Chat Model

```python
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# 单次调用
response = llm.invoke("Python 中的装饰器是什么？")
print(response.content)

# 带系统提示
messages = [
    SystemMessage(content="你是一个专业的 Python 导师，回答要简洁。"),
    HumanMessage(content="什么是生成器？"),
]
response = llm.invoke(messages)
print(response.content)

# 流式输出
for chunk in llm.stream("讲一个冷笑话"):
    print(chunk.content, end="", flush=True)
```

---

### 2. Prompt Template（提示词模板）

```python
from langchain_core.prompts import ChatPromptTemplate, PromptTemplate

# 字符串模板
prompt = PromptTemplate.from_template("用一句话解释什么是 {concept}。")
print(prompt.format(concept="递归"))

# Chat 模板（推荐）
chat_prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个{role}，回答要{style}。"),
    ("human", "{question}"),
])

messages = chat_prompt.format_messages(
    role="Python 专家",
    style="简洁",
    question="什么是协程？",
)

# 组合使用（LCEL 管道）
chain = chat_prompt | llm
response = chain.invoke({
    "role": "Python 专家",
    "style": "简洁",
    "question": "什么是协程？",
})
print(response.content)
```

---

### 3. Output Parser（输出解析）

```python
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field

# 字符串解析（最常用）
chain = ChatPromptTemplate.from_template("用一句话介绍 {topic}") | llm | StrOutputParser()
result = chain.invoke({"topic": "RAG"})  # 直接返回 str，而非 AIMessage

# JSON 解析
class Movie(BaseModel):
    title: str = Field(description="电影名称")
    year: int = Field(description="上映年份")
    genre: str = Field(description="类型")

parser = JsonOutputParser(pydantic_object=Movie)

prompt = ChatPromptTemplate.from_messages([
    ("system", "根据用户描述输出电影信息。\n{format_instructions}"),
    ("human", "{description}"),
]).partial(format_instructions=parser.get_format_instructions())

chain = prompt | llm | parser
movie = chain.invoke({"description": "2010年上映的科幻悬疑片，讲述梦境中的盗取秘密"})
print(movie)  # {'title': '盗梦空间', 'year': 2010, 'genre': '科幻悬疑'}
```

---

### 4. LCEL 链式调用

LCEL（LangChain Expression Language）是 LangChain 的核心组合方式，用 `|` 管道符串联组件。

```python
from langchain_core.runnables import RunnablePassthrough, RunnableLambda

# 基础管道：prompt | llm | parser
chain = prompt | llm | StrOutputParser()

# 并行执行（RunnableParallel）
from langchain_core.runnables import RunnableParallel

parallel_chain = RunnableParallel(
    summary=ChatPromptTemplate.from_template("用一句话总结：{text}") | llm | StrOutputParser(),
    keywords=ChatPromptTemplate.from_template("提取关键词：{text}") | llm | StrOutputParser(),
)
result = parallel_chain.invoke({"text": "LangChain 是一个用于构建 LLM 应用的框架..."})
# result = {"summary": "...", "keywords": "..."}

# 自定义步骤（RunnableLambda）
def add_prefix(text: str) -> str:
    return f"[AI回答] {text}"

chain = prompt | llm | StrOutputParser() | RunnableLambda(add_prefix)

# 传递原始输入（RunnablePassthrough）
chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)
```

---

### 5. Memory（对话记忆）

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

llm = ChatOpenAI(model="gpt-4o-mini")

prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个助手。"),
    MessagesPlaceholder(variable_name="history"),  # 历史消息注入位置
    ("human", "{input}"),
])

chain = prompt | llm | StrOutputParser()

# 用字典管理每个 session 的历史
store = {}

def get_session_history(session_id: str):
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]

# 包装成带记忆的链
chain_with_history = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="history",
)

config = {"configurable": {"session_id": "user_001"}}

r1 = chain_with_history.invoke({"input": "我叫小明"}, config=config)
r2 = chain_with_history.invoke({"input": "我叫什么名字？"}, config=config)
print(r2)  # 会记得"小明"
```

---

### 6. RAG（检索增强生成）

```python
from langchain_community.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

# 1. 加载 & 分块
loader = DirectoryLoader("./docs", glob="**/*.md")
docs = loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=64)
chunks = splitter.split_documents(docs)

# 2. 向量化存储
vectorstore = Chroma.from_documents(chunks, OpenAIEmbeddings(), persist_directory="./db")
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

# 3. RAG 链
prompt = ChatPromptTemplate.from_template("""
仅根据以下资料回答问题，资料中没有则回答"不知道"。

资料：{context}

问题：{question}
""")

rag_chain = (
    {"context": retriever | (lambda docs: "\n\n".join(d.page_content for d in docs)),
     "question": RunnablePassthrough()}
    | prompt
    | ChatOpenAI(model="gpt-4o-mini")
    | StrOutputParser()
)

answer = rag_chain.invoke("什么是 RAG？")
print(answer)
```

---

### 7. Tools（工具调用）

```python
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI

# 定义工具
@tool
def get_weather(city: str) -> str:
    """获取指定城市的天气信息"""
    # 实际场景中调用天气 API
    return f"{city}：晴，25°C"

@tool
def calculate(expression: str) -> str:
    """计算数学表达式，如 '2 + 3 * 4'"""
    return str(eval(expression))

# 绑定工具到模型
llm = ChatOpenAI(model="gpt-4o-mini")
llm_with_tools = llm.bind_tools([get_weather, calculate])

# 调用（模型自动决定是否调用工具）
response = llm_with_tools.invoke("北京今天天气怎么样？")
print(response.tool_calls)  # [{'name': 'get_weather', 'args': {'city': '北京'}}]

# 使用内置工具
from langchain_community.tools import DuckDuckGoSearchRun
search = DuckDuckGoSearchRun()
result = search.invoke("LangChain 最新版本")
```

---

### 8. Agent（自主推理）

Agent 能根据目标自主选择工具、循环执行直到完成任务。

```python
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.tools import tool

@tool
def search_web(query: str) -> str:
    """搜索网页获取信息"""
    return f"搜索结果：关于 '{query}' 的相关信息..."

@tool
def get_stock_price(symbol: str) -> str:
    """获取股票价格"""
    return f"{symbol} 当前价格：100.5 元"

tools = [search_web, get_stock_price]
llm = ChatOpenAI(model="gpt-4o-mini")

prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个能使用工具的助手。"),
    ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),  # Agent 中间思考过程
])

agent = create_tool_calling_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

result = executor.invoke({"input": "帮我查一下腾讯的股票价格，然后搜索它最近的新闻"})
print(result["output"])
```

---

### 9. Callback（回调 / 监控）

```python
from langchain_core.callbacks import BaseCallbackHandler

# 自定义回调
class LogHandler(BaseCallbackHandler):
    def on_llm_start(self, serialized, prompts, **kwargs):
        print(f"[LLM 开始] prompt: {prompts[0][:50]}...")

    def on_llm_end(self, response, **kwargs):
        print(f"[LLM 结束] tokens: {response.llm_output}")

    def on_tool_start(self, serialized, input_str, **kwargs):
        print(f"[工具调用] {serialized['name']}({input_str})")

# 注入回调
llm = ChatOpenAI(model="gpt-4o-mini", callbacks=[LogHandler()])

# 流式输出回调
from langchain_core.callbacks import StreamingStdOutCallbackHandler
llm_stream = ChatOpenAI(
    model="gpt-4o-mini",
    streaming=True,
    callbacks=[StreamingStdOutCallbackHandler()]
)
llm_stream.invoke("讲一个故事")  # 实时打印到控制台
```

---

## 模块速查表

| 需求 | 用什么 | 核心类 |
|---|---|---|
| 调用 OpenAI | `langchain-openai` | `ChatOpenAI` |
| 调用国产模型 | `langchain-community` | `ChatTongyi`（千问）、`ChatZhipuAI`（智谱）|
| 提示词模板 | `langchain-core` | `ChatPromptTemplate` |
| 解析输出为字符串 | `langchain-core` | `StrOutputParser` |
| 解析输出为 JSON/对象 | `langchain-core` | `JsonOutputParser` / `PydanticOutputParser` |
| 串联组件 | `langchain-core` | `\|` 管道符（LCEL）|
| 多轮对话记忆 | `langchain-core` | `RunnableWithMessageHistory` |
| 加载文档 | `langchain-community` | `DirectoryLoader`、`PyPDFLoader`、`WebBaseLoader` |
| 文本分块 | `langchain` | `RecursiveCharacterTextSplitter` |
| 向量存储 | `langchain-community` | `Chroma`、`FAISS`、`Qdrant` |
| 文档检索 | `langchain-core` | `vectorstore.as_retriever()` |
| 定义工具 | `langchain-core` | `@tool` 装饰器 |
| 构建 Agent | `langchain` | `create_tool_calling_agent` + `AgentExecutor` |
| 复杂多 Agent 编排 | `langgraph` | `StateGraph` |
| 监控 / 流式 | `langchain-core` | `BaseCallbackHandler`、`StreamingStdOutCallbackHandler` |

---

## 参考

- [官方文档](https://docs.langchain.com)
- [LCEL 文档](https://python.langchain.com/docs/expression_language/)
- [LangSmith（链路追踪平台）](https://smith.langchain.com)
