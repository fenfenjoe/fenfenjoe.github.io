---
title: RAG 面试题
sidebar: 'heading'
---

# RAG 面试题

## ⭐什么是 RAG？解决了哪些问题？

**RAG（Retrieval-Augmented Generation，检索增强生成）** 是一种将**外部知识检索**与**大语言模型生成**相结合的技术范式。核心思想是：在 LLM 回答问题之前，先从外部知识库中检索出相关内容作为上下文，再交给模型生成答案。

**RAG 解决的核心问题：**

| 问题 | 说明 |
|---|---|
| **知识时效性** | LLM 训练数据有截止日期，无法回答最新事件 |
| **私有数据** | 企业内部文档、代码库、规章等不在模型训练集中 |
| **幻觉（Hallucination）** | 模型可能编造不存在的信息，RAG 提供事实依据，降低幻觉率 |
| **上下文长度限制** | 无法把整个知识库塞进 prompt，RAG 按需检索最相关的片段 |
| **成本** | 相比对模型进行 Fine-tuning，RAG 更轻量、成本更低 |

---

## ⭐RAG 的完整工作流程是什么？

RAG 分为两个阶段：

### 离线索引阶段（一次性预处理）

```
原始文档（PDF/Word/网页）
      ↓
文档加载（Document Loader）
      ↓
文本分块（Text Splitter）
      ↓
向量化（Embedding Model）
      ↓
存入向量数据库（Vector Store）
```

### 在线检索阶段（每次查询）

```
用户问题
    ↓
问题向量化（同一 Embedding 模型）
    ↓
相似度检索（从向量数据库找 Top-K 相关文档块）
    ↓
构建 Prompt（问题 + 检索到的文档块作为上下文）
    ↓
LLM 生成答案
    ↓
返回用户
```

---

## ⭐什么是向量（Embedding）？为什么用向量表示文本？

**Embedding（向量化）** 是将文本转换为高维数值向量的过程，使得语义相近的文本在向量空间中距离也相近。

```
"苹果是一种水果"   → [0.23, -0.45, 0.87, ...]  (768维)
"苹果很甜"         → [0.25, -0.42, 0.89, ...]  (768维)  ← 语义近，向量近
"今天天气不错"     → [-0.71, 0.33, -0.12, ...] (768维)  ← 语义远，向量远
```

**为什么用向量？**
- 关键词匹配（BM25）只能匹配字面，无法理解语义
- 向量相似度搜索可以找到意思相近但用词不同的文档
- 支持跨语言检索（中文问题可以检索到英文文档）

**常用相似度度量：**

| 方法 | 公式 | 适用场景 |
|---|---|---|
| **余弦相似度** | `cos(θ) = A·B / (‖A‖‖B‖)` | 最常用，关注方向而非大小 |
| **欧氏距离** | `d = √Σ(aᵢ-bᵢ)²` | 关注绝对距离 |
| **点积** | `A·B = Σaᵢbᵢ` | 向量归一化后等价于余弦 |

---

## ⭐文本分块（Chunking）有哪些策略？如何选择？

分块是 RAG 管道中对效果影响最大的环节之一。

| 策略 | 说明 | 适用场景 |
|---|---|---|
| **固定大小分块** | 按 token 数或字符数强制切割 | 简单快速，适合格式规整的文档 |
| **递归字符分块** | 按段落 → 句子 → 字符依次尝试，尽量在自然边界切割 | 通用文本，LangChain 默认方案 |
| **语义分块** | 用 Embedding 相似度判断语义边界，相似度突变处切割 | 语义连贯性要求高的场景 |
| **文档结构分块** | 按 Markdown 标题、HTML 标签等结构边界切割 | 结构化文档（Markdown、HTML）|
| **命题级分块** | 将每个独立陈述拆分为原子命题 | 高精度问答，计算成本高 |

**关键参数：**

```python
# LangChain 递归分块示例
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,      # 每块最大 token 数
    chunk_overlap=64,    # 相邻块的重叠 token（保留上下文连续性）
    separators=["\n\n", "\n", "。", "！", "？", " "]
)
```

**选择建议：**
- chunk 太小 → 每块缺乏上下文，检索精度低
- chunk 太大 → 噪声多，LLM 难以聚焦关键信息
- 经验值：`chunk_size = 256~512`，`overlap = chunk_size * 10%~15%`

---

## ⭐有哪些常用的向量数据库？如何选型？

| 数据库 | 特点 | 适用场景 |
|---|---|---|
| **Chroma** | 开源轻量，纯 Python，零配置 | 开发调试、小规模项目 |
| **FAISS** | Meta 出品，内存型，检索速度极快 | 离线批量检索、研究 |
| **Qdrant** | Rust 编写，高性能，支持过滤器、Payload | 生产环境推荐 |
| **Milvus** | 云原生，分布式，支持亿级向量 | 大规模生产，中文社区友好 |
| **Weaviate** | 支持多模态、GraphQL 查询 | 复杂查询场景 |
| **PGVector** | PostgreSQL 扩展，向量+关系数据一体 | 已有 PostgreSQL 的项目 |
| **Pinecone** | 托管服务，全托管零运维 | 不想自维护基础设施 |

**选型建议：**
- 快速验证：Chroma
- 生产部署（自托管）：Qdrant 或 Milvus
- 已有 PostgreSQL：PGVector
- 不想运维：Pinecone

---

## ⭐什么是 Naive RAG、Advanced RAG 和 Modular RAG？

**Naive RAG（基础 RAG）**：最简单的"检索→生成"管道，检索一次文档，直接拼 prompt。

**痛点：**
- 检索召回率不稳定（问题与文档措辞不同）
- 检索到的 Top-K 文档并非全都相关（噪声）
- 不支持多跳问题（需要多步推理的问题）

**Advanced RAG** 通过以下手段提升效果：

| 技术 | 说明 |
|---|---|
| **Query Rewriting（查询重写）** | 用 LLM 将用户模糊问题改写成更易检索的多个变体 |
| **HyDE（假设文档嵌入）** | 先让 LLM 生成一个假设答案，再用假设答案做向量检索 |
| **多路检索融合（RAG Fusion）** | 生成多个查询变体，分别检索，RRF 算法融合排序结果 |
| **Reranker（重排序）** | 用 Cross-Encoder 模型对召回结果精排，过滤噪声 |
| **父子文档检索** | 用小块检索（精准），返回大块内容（上下文充足）|
| **Self-RAG** | 模型自主判断是否需要检索，检索后自我评估相关性 |

**Modular RAG**：将 RAG 各组件模块化，可灵活组合、替换各个模块（如换检索器、换重排模型等），是目前工程化的主流方向。

---

## ⭐什么是混合检索（Hybrid Search）？为什么比单一向量检索更好？

**混合检索** = 向量检索（语义）+ 关键词检索（精确）的结合。

| 检索方式 | 优点 | 缺点 |
|---|---|---|
| **向量检索（Dense）** | 理解语义，支持模糊匹配 | 无法精准匹配专有名词、代码、ID |
| **关键词检索（BM25）** | 精准匹配关键词 | 无法理解语义，"苹果"和"苹果公司"混淆 |
| **混合检索** | 兼顾语义和精确性 | 需要融合排序算法 |

**融合排序算法 RRF（Reciprocal Rank Fusion）：**

```python
# RRF 融合示例
def rrf_fusion(results_list, k=60):
    """
    results_list: 多路检索结果，每路是 [doc_id1, doc_id2, ...]（按相关性排序）
    k: 平滑参数，防止排名第1的结果权重过高
    """
    scores = {}
    for results in results_list:
        for rank, doc_id in enumerate(results):
            scores[doc_id] = scores.get(doc_id, 0) + 1.0 / (k + rank + 1)
    return sorted(scores.items(), key=lambda x: x[1], reverse=True)
```

---

## ⭐什么是 Reranker？在 RAG 中的作用是什么？

**Reranker（重排序器）** 是一个精排模型，用于对向量检索召回的 Top-K 候选文档进行**二次精细打分**，过滤掉与问题不相关的文档。

**RAG 中的位置：**

```
向量检索 → Top-20（召回层，高召回）
         ↓
    Reranker 精排
         ↓
    Top-3（精排层，高精度）→ 送入 LLM
```

**Bi-Encoder vs Cross-Encoder：**

| 类型 | 原理 | 速度 | 精度 | 用途 |
|---|---|---|---|---|
| **Bi-Encoder** | 问题和文档分别编码为向量，计算相似度 | 快（可预计算）| 中 | 向量检索（召回层）|
| **Cross-Encoder** | 问题+文档拼接输入，联合编码 | 慢（无法预计算）| 高 | Reranker（精排层）|

**常用 Reranker 模型：**
- `BAAI/bge-reranker-v2-m3`（中文效果好）
- `cross-encoder/ms-marco-MiniLM-L-6-v2`
- Cohere Rerank API（托管服务）

---

## ⭐RAG 的评估指标有哪些？

**常用评估框架：RAGAS**（Retrieval Augmented Generation Assessment）

| 指标 | 评估对象 | 含义 |
|---|---|---|
| **Faithfulness（忠实度）** | 生成质量 | 答案是否完全基于检索到的上下文，不含幻觉（0-1）|
| **Answer Relevancy（答案相关性）** | 生成质量 | 答案是否直接回答了用户的问题（0-1）|
| **Context Precision（上下文精确率）** | 检索质量 | 检索到的文档中有多少比例是真正相关的（精确率）|
| **Context Recall（上下文召回率）** | 检索质量 | 相关文档有多少被成功检索到（召回率）|
| **Context Relevancy** | 检索质量 | 检索文档与问题的相关程度 |

```python
# RAGAS 评估示例
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_precision

results = evaluate(
    dataset=test_dataset,
    metrics=[faithfulness, answer_relevancy, context_precision]
)
print(results)
# {'faithfulness': 0.87, 'answer_relevancy': 0.91, 'context_precision': 0.76}
```

---

## ⭐RAG 和 Fine-tuning（微调）的区别？什么时候用哪个？

| 对比维度 | RAG | Fine-tuning |
|---|---|---|
| **知识更新** | 实时（更新知识库即可）| 慢（需重新训练）|
| **成本** | 低（无需训练）| 高（GPU 训练成本）|
| **知识范围** | 外部文档（私有知识）| 模型权重内（通用能力/风格）|
| **幻觉控制** | 有依据，幻觉较少 | 仍然可能幻觉 |
| **适合场景** | 知识密集型问答（客服、文档检索）| 风格迁移、特定任务格式、领域术语理解 |
| **推理成本** | 每次多一次检索 | 无额外推理开销 |

**选型建议：**
- 知识需要**频繁更新**或**私有**→ RAG
- 需要模型**风格/语气/格式**调整 → Fine-tuning
- 两者结合（RAG + Fine-tuning）：效果通常最好

---

## ⭐RAG 中有哪些常见问题和优化手段？

| 问题 | 表现 | 优化方案 |
|---|---|---|
| **检索召回率低** | 相关文档没被找到 | 混合检索、查询重写、HyDE |
| **检索噪声多** | 找回来的文档不相关 | Reranker 精排、提高 chunk 质量 |
| **答案幻觉** | 模型编造超出上下文的内容 | 强化 prompt 约束（只基于上下文回答）、Faithfulness 评估 |
| **分块不合理** | 答案被切断到两个 chunk 中 | 增大 chunk overlap、使用父子文档 |
| **多跳问题** | 问题需要多步推理 | 多跳检索（Iterative RAG）、知识图谱辅助 |
| **长文档处理** | 重要信息在文档开头/结尾 | 注意力重排（LostInTheMiddle 问题）|
| **查询语言偏差** | 用户问题口语化，与文档书面语不匹配 | 查询改写、同义词扩展 |

**"Lost in the Middle" 问题：**
研究表明，LLM 对 prompt 中间部分的内容关注度最低，建议将最重要的文档块放在上下文的开头或结尾。

---

## ⭐常见的 RAG 框架有哪些？

| 框架 | 特点 | 适用场景 |
|---|---|---|
| **LangChain** | 功能最全，生态最大，链式调用 | 通用 RAG，快速原型 |
| **LlamaIndex** | 专为 RAG/数据索引设计，组件更细粒度 | 复杂文档检索场景 |
| **Haystack** | 企业级，模块化流水线设计 | 生产级搜索增强问答 |
| **Dify** | 可视化低代码平台，内置 RAG | 快速部署知识库问答 |
| **FastGPT** | 中文友好，可视化工作流 | 企业知识库、中文场景 |

**简单 RAG 代码示例（LangChain）：**

```python
from langchain_community.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA

# 1. 加载文档
loader = DirectoryLoader("./docs", glob="**/*.md")
documents = loader.load()

# 2. 分块
splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=64)
chunks = splitter.split_documents(documents)

# 3. 向量化并存储
embedding = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embedding, persist_directory="./chroma_db")

# 4. 构建检索问答链
retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    retriever=retriever,
    return_source_documents=True
)

# 5. 查询
result = qa_chain.invoke({"query": "RAG 是什么？"})
print(result["result"])
```
