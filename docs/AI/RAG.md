---
title: RAG 教程
sidebar: 'heading'
---

# RAG（检索增强生成）教程

## 什么是 RAG

RAG（Retrieval-Augmented Generation，检索增强生成）是一种将**外部知识库检索**与**大语言模型生成**结合的技术方案。

**核心思想：** 在模型生成答案之前，先从外部知识库中检索出与问题相关的内容，将其作为上下文一起输入给模型，使模型能够基于最新、私有的知识进行回答。

**解决的核心问题：**

| 问题 | 说明 |
|------|------|
| 知识截止日期 | LLM 训练数据有截止时间，无法回答最新信息 |
| 私有数据 | 企业内部文档、代码、规章制度等不在模型训练集中 |
| 幻觉（Hallucination） | 模型可能编造不存在的信息，RAG 提供事实依据 |
| 上下文长度限制 | 不可能把所有文档塞进一次对话，RAG 按需检索 |

---

## RAG 整体架构

```
                    ┌──────────────────────────────────────┐
                    │           离线索引阶段（一次性）          │
                    │                                        │
  原始文档 ──────► 文档加载 ──► 文本分块 ──► 向量化 ──► 存入向量数据库
  (PDF/Word/        (Loader)   (Splitter)  (Embedding)  (VectorStore)
   网页/数据库)                                               │
                    └──────────────────────────────────────┘
                                                             │
                    ┌──────────────────────────────────────┐ │
                    │           在线查询阶段（每次对话）        │ │
                    │                                        │ │
  用户提问 ──────► 问题向量化 ──► 向量检索 ◄──────────────────┘
                  (Embedding)  (相似度搜索)
                                   │
                                   ▼
                              相关文档块
                                   │
                                   ▼
                        构建 Prompt（问题 + 上下文）
                                   │
                                   ▼
                              LLM 生成答案
                                   │
                                   ▼
                              返回用户
```

---

## 核心组件详解

### 1. 文档加载（Document Loader）

将各种格式的文档转为纯文本。

```python
from langchain_community.document_loaders import (
    PyPDFLoader,          # PDF
    TextLoader,           # TXT
    UnstructuredWordDocumentLoader,  # Word
    WebBaseLoader,        # 网页
    CSVLoader,            # CSV
    DirectoryLoader,      # 目录批量加载
)

# 加载 PDF
loader = PyPDFLoader("docs/manual.pdf")
docs = loader.load()
print(f"共 {len(docs)} 页，第一页内容：{docs[0].page_content[:200]}")

# 批量加载目录下所有 PDF
loader = DirectoryLoader("./docs/", glob="**/*.pdf", loader_cls=PyPDFLoader)
docs = loader.load()

# 加载网页
loader = WebBaseLoader(["https://docs.example.com/guide"])
docs = loader.load()
```

---

### 2. 文本分块（Text Splitter）

将长文档分割成小块，每块大小适合模型处理。**分块策略直接影响检索质量。**

```python
from langchain.text_splitter import (
    RecursiveCharacterTextSplitter,  # 最常用
    CharacterTextSplitter,
    MarkdownHeaderTextSplitter,       # 按 Markdown 标题分块
    TokenTextSplitter,                # 按 Token 数分块
)

# RecursiveCharacterTextSplitter：按段落→换行→句子→字符递归分割
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,       # 每块最大字符数
    chunk_overlap=50,     # 块间重叠字符数（保持上下文连贯）
    separators=["\n\n", "\n", "。", "！", "？", " ", ""],
)

chunks = splitter.split_documents(docs)
print(f"分割为 {len(chunks)} 个块")
print(f"第一块：{chunks[0].page_content}")
print(f"元数据：{chunks[0].metadata}")  # {'source': 'manual.pdf', 'page': 0}

# 按 Markdown 标题分块（结构化文档推荐）
md_splitter = MarkdownHeaderTextSplitter(
    headers_to_split_on=[
        ("#", "H1"),
        ("##", "H2"),
        ("###", "H3"),
    ]
)
```

**分块参数选择建议：**

| 文档类型 | chunk_size | chunk_overlap |
|---------|-----------|---------------|
| 技术文档 | 500~1000 | 50~100 |
| 法律/合同 | 800~1500 | 100~200 |
| FAQ 问答 | 200~400 | 20~50 |
| 代码文件 | 1000~2000 | 200~400 |

---

### 3. 向量化（Embedding）

将文本转为高维向量，语义相近的文本向量距离也近。

```python
from langchain_openai import OpenAIEmbeddings
from langchain_community.embeddings import (
    HuggingFaceEmbeddings,   # 本地模型，免费
    OllamaEmbeddings,        # Ollama 本地模型
)

# OpenAI Embedding（效果好，需 API Key）
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    openai_api_key="your-key"
)

# 本地 Embedding（免费，中文推荐 BAAI/bge-m3）
embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-m3",
    model_kwargs={"device": "cpu"},
    encode_kwargs={"normalize_embeddings": True},
)

# 测试 Embedding
vector = embeddings.embed_query("什么是 RAG？")
print(f"向量维度：{len(vector)}")  # 通常 768 或 1536
```

---

### 4. 向量数据库（Vector Store）

存储向量并支持相似度搜索。

```python
from langchain_community.vectorstores import (
    Chroma,      # 本地轻量，开发首选
    FAISS,       # 内存型，速度极快
    Milvus,      # 分布式，生产推荐
    Pinecone,    # 云端托管
    Qdrant,      # 高性能开源
)

# Chroma（本地持久化）
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db",   # 持久化到本地
    collection_name="my_docs",
)

# 下次直接加载（不需要重新索引）
vectorstore = Chroma(
    persist_directory="./chroma_db",
    embedding_function=embeddings,
    collection_name="my_docs",
)

# FAISS（内存型，适合小规模快速验证）
from langchain_community.vectorstores import FAISS
vectorstore = FAISS.from_documents(chunks, embeddings)
vectorstore.save_local("faiss_index")  # 保存
vectorstore = FAISS.load_local("faiss_index", embeddings)  # 加载

# 相似度搜索
results = vectorstore.similarity_search("什么是 RAG？", k=4)
for doc in results:
    print(doc.page_content[:100])
    print(doc.metadata)
    print("---")

# 带相似度分数
results = vectorstore.similarity_search_with_score("什么是 RAG？", k=4)
for doc, score in results:
    print(f"相似度：{score:.4f} | {doc.page_content[:80]}")
```

---

### 5. 检索器（Retriever）

从向量库中按策略检索相关文档。

```python
# 基础检索器
retriever = vectorstore.as_retriever(
    search_type="similarity",    # similarity / mmr / similarity_score_threshold
    search_kwargs={"k": 4},      # 返回最相关的4个块
)

# MMR 检索（最大边际相关性）：在相关性和多样性之间取平衡，减少重复
retriever = vectorstore.as_retriever(
    search_type="mmr",
    search_kwargs={"k": 4, "fetch_k": 20, "lambda_mult": 0.5},
)

# 相似度阈值过滤：只返回相似度高于阈值的结果
retriever = vectorstore.as_retriever(
    search_type="similarity_score_threshold",
    search_kwargs={"score_threshold": 0.7, "k": 4},
)

# 测试检索
docs = retriever.invoke("如何配置 Nginx 反向代理？")
for doc in docs:
    print(doc.page_content[:100])
```

---

## 搭建完整 RAG 流程

### 方式一：LangChain LCEL 链式写法

```python
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# 1. 初始化组件
embeddings = OpenAIEmbeddings()
vectorstore = Chroma(persist_directory="./chroma_db", embedding_function=embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# 2. 定义 Prompt 模板
prompt = ChatPromptTemplate.from_template("""
你是一个专业的问答助手。请根据以下参考资料回答用户的问题。
如果参考资料中没有相关信息，请直接说"根据现有资料无法回答该问题"，不要编造答案。

参考资料：
{context}

问题：{question}

回答：
""")

# 3. 构建 RAG 链
def format_docs(docs):
    return "\n\n---\n\n".join(doc.page_content for doc in docs)

rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

# 4. 调用
answer = rag_chain.invoke("什么是 RAG？")
print(answer)
```

### 方式二：使用 RetrievalQA（简洁写法）

```python
from langchain.chains import RetrievalQA

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",          # stuff / map_reduce / refine / map_rerank
    retriever=retriever,
    return_source_documents=True,  # 返回来源文档
    verbose=True,                  # 打印中间过程
)

result = qa_chain.invoke({"query": "如何防御 XSS 攻击？"})
print("答案：", result["result"])
print("\n来源：")
for doc in result["source_documents"]:
    print(f"  - {doc.metadata.get('source')} | {doc.page_content[:80]}")
```

---

## 进阶优化技巧

### 1. 混合检索（Hybrid Search）

结合**向量检索**（语义相似）和**关键词检索**（BM25），提升召回率。

```python
from langchain_community.retrievers import BM25Retriever
from langchain.retrievers import EnsembleRetriever

# BM25：关键词精确匹配
bm25_retriever = BM25Retriever.from_documents(chunks)
bm25_retriever.k = 4

# 向量检索：语义相似
vector_retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

# 融合（0.5 各占一半权重）
ensemble_retriever = EnsembleRetriever(
    retrievers=[bm25_retriever, vector_retriever],
    weights=[0.5, 0.5],
)

docs = ensemble_retriever.invoke("Nginx 配置示例")
```

---

### 2. 查询改写（Query Rewriting）

用 LLM 将用户问题改写得更适合检索，提升召回质量。

```python
from langchain.retrievers.multi_query import MultiQueryRetriever

# 自动生成多个角度的查询，取并集结果
multi_query_retriever = MultiQueryRetriever.from_llm(
    retriever=vectorstore.as_retriever(),
    llm=llm,
)

# 例：用户问"RAG咋用" → LLM改写为多个问法 → 分别检索 → 合并去重
docs = multi_query_retriever.invoke("RAG咋用")
```

---

### 3. 重排序（Reranker）

先召回多个候选，再用更精准的模型重新排序，取 Top-K。

```python
from langchain.retrievers import ContextualCompressionRetriever
from langchain_community.cross_encoders import HuggingFaceCrossEncoder
from langchain.retrievers.document_compressors import CrossEncoderReranker

# 使用 cross-encoder 重排序（比向量检索更精准，但速度慢）
model = HuggingFaceCrossEncoder(model_name="BAAI/bge-reranker-v2-m3")
compressor = CrossEncoderReranker(model=model, top_n=3)

reranking_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=vectorstore.as_retriever(search_kwargs={"k": 10}),  # 先召回10个
)

docs = reranking_retriever.invoke("什么是向量数据库？")
```

---

### 4. 带对话历史的 RAG

```python
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True,
    output_key="answer",
)

conversational_rag = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever,
    memory=memory,
    return_source_documents=True,
    verbose=True,
)

# 第一轮
r1 = conversational_rag.invoke({"question": "什么是 RAG？"})
print(r1["answer"])

# 第二轮（会结合上下文理解"它"指的是 RAG）
r2 = conversational_rag.invoke({"question": "它有哪些应用场景？"})
print(r2["answer"])
```

---

## 调试与评估

### 调试：查看中间过程

```python
import langchain
langchain.debug = True   # 开启 debug，打印所有中间步骤

# 或使用 verbose
chain = RetrievalQA.from_chain_type(..., verbose=True)
```

**调试检索质量：**

```python
# 直接查看检索结果，排查检索是否准确
query = "如何配置 SSL 证书？"
docs = retriever.invoke(query)

print(f"检索到 {len(docs)} 个文档块：")
for i, doc in enumerate(docs):
    print(f"\n--- 块 {i+1} ---")
    print(f"来源：{doc.metadata}")
    print(f"内容：{doc.page_content[:200]}")
```

### 常见问题排查

| 现象 | 可能原因 | 解决方案 |
|------|---------|---------|
| 检索结果不相关 | 分块太大/太小，语义丢失 | 调整 chunk_size，尝试不同 Embedding 模型 |
| 答案不完整 | k 值太小，相关内容分散在多块 | 增大 k，使用 MMR 检索 |
| 模型回答与文档矛盾 | Prompt 不够明确 | 明确要求"仅基于资料回答" |
| 检索速度慢 | 向量库无索引 | Chroma/FAISS 适合小规模，大规模用 Milvus |
| 中文检索效果差 | Embedding 模型对中文支持弱 | 换用 BAAI/bge-m3 或 text2vec-large-chinese |

### RAG 评估指标

```python
# 使用 RAGAS 框架评估 RAG 质量
# pip install ragas

from ragas import evaluate
from ragas.metrics import (
    faithfulness,        # 忠实度：答案是否基于检索内容
    answer_relevancy,    # 答案相关性：答案是否回答了问题
    context_recall,      # 上下文召回率：相关内容是否被检索到
    context_precision,   # 上下文精确率：检索内容是否都有用
)
from datasets import Dataset

# 准备评估数据
data = {
    "question": ["什么是 RAG？", "如何防御 XSS？"],
    "answer": ["RAG 是...", "防御 XSS 需要..."],          # 模型回答
    "contexts": [["RAG 全称...", "RAG 用于..."], [...]],   # 检索到的文档
    "ground_truth": ["RAG 是检索增强生成...", "..."],      # 标准答案
}
dataset = Dataset.from_dict(data)

results = evaluate(
    dataset=dataset,
    metrics=[faithfulness, answer_relevancy, context_recall, context_precision],
)
print(results)
```

---

## 完整项目示例（本地知识库问答）

```python
# rag_app.py：企业内部文档问答系统完整示例
import os
from pathlib import Path
from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# ── 配置 ──────────────────────────────────────────
DOCS_DIR = "./company_docs"      # 企业文档目录
CHROMA_DIR = "./chroma_db"       # 向量库持久化目录
EMBED_MODEL = "BAAI/bge-m3"      # 中文 Embedding 模型
LLM_MODEL = "gpt-4o-mini"

# ── 第一步：构建索引（首次运行或文档更新时执行）──────
def build_index():
    print("正在加载文档...")
    loader = DirectoryLoader(DOCS_DIR, glob="**/*.pdf", loader_cls=PyPDFLoader)
    docs = loader.load()
    print(f"加载了 {len(docs)} 页文档")

    print("正在分块...")
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=600, chunk_overlap=60
    )
    chunks = splitter.split_documents(docs)
    print(f"分割为 {len(chunks)} 个块")

    print("正在生成向量并存储...")
    embeddings = HuggingFaceEmbeddings(model_name=EMBED_MODEL)
    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=CHROMA_DIR,
    )
    print("索引构建完成！")
    return vectorstore

# ── 第二步：构建问答链 ──────────────────────────────
def build_rag_chain(vectorstore):
    retriever = vectorstore.as_retriever(
        search_type="mmr",
        search_kwargs={"k": 4, "fetch_k": 20},
    )

    llm = ChatOpenAI(model=LLM_MODEL, temperature=0)

    prompt = ChatPromptTemplate.from_template("""
你是公司内部知识库助手，请严格根据以下参考资料回答问题。
若资料中没有相关信息，回答"抱歉，知识库中暂无相关资料"。

参考资料：
{context}

问题：{question}
""")

    def format_docs(docs):
        texts = []
        for i, doc in enumerate(docs, 1):
            source = doc.metadata.get("source", "未知")
            texts.append(f"[来源 {i}：{Path(source).name}]\n{doc.page_content}")
        return "\n\n".join(texts)

    return (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

# ── 主程序 ─────────────────────────────────────────
if __name__ == "__main__":
    embeddings = HuggingFaceEmbeddings(model_name=EMBED_MODEL)

    # 已有索引则直接加载，否则重建
    if Path(CHROMA_DIR).exists():
        print("加载已有索引...")
        vectorstore = Chroma(
            persist_directory=CHROMA_DIR,
            embedding_function=embeddings,
        )
    else:
        vectorstore = build_index()

    rag_chain = build_rag_chain(vectorstore)

    print("\n知识库问答系统就绪，输入 q 退出\n")
    while True:
        question = input("请输入问题：").strip()
        if question.lower() == "q":
            break
        if not question:
            continue
        print("\n回答：")
        answer = rag_chain.invoke(question)
        print(answer)
        print()
```

---

## 参考资料

- [LangChain 官方文档](https://python.langchain.com/docs/introduction/)
- [RAGAS 评估框架](https://docs.ragas.io/)
- [Chroma 向量数据库](https://docs.trychroma.com/)
- [BAAI/bge-m3 中文 Embedding 模型](https://huggingface.co/BAAI/bge-m3)
