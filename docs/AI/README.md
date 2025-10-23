---
title: 概述
---


# 概述

## 资源

**想找提示词课程**

| 网站名称            |地址|描述|
|-----------------|---|---|
| Learning Prompt |<https://learningprompt.wiki/zh-Hans/>|
| 笨鸟教程            |<https://www.javatiku.cn/prompt.html>|



**想找大模型、Python课程**

| 网站名称              |地址|描述|
|-------------------|---|---|
| Cloud Studio 学习中心 |<https://cloudstudio.net/courses>|


**想找学习用的大模型接口**

| 网站名称        |地址|描述|
|-------------|---|---|
| 阿里云百炼（通义千问） |<https://bailian.console.aliyun.com/?tab=model#/model-market>|

**想找AI客户端应用、IDE**

| 应用                   | 官网                                   | 描述  |
|----------------------|--------------------------------------|-----|
| Chatbox （本地客户端）      | <https://chatboxai.app/zh>           |
| Cherry Studio（本地IDE） | <https://www.cherry-ai.com/>         |
| Cloud Studio（在线IDE）  | <https://cloudstudio.net/>           |
| Coze（在线智能体开发平台）      | <https://www.coze.cn/>               |
| Pycharm（Python IDE）  | <https://www.jetbrains.com/pycharm/> |
| Dify（LLMOps平台）       | <https://dify.ai/zh>                 |
| Trae(字节旗下AI编程工具)     | <https://www.trae.cn/>               |




## 概念

| 名词            | 描述                         |
|---------------|----------------------------|
| Ollama        | 一个大模型本地训练、部署、运维平台          |
| ollama-webui  | ollama Web可视化聊天界面（node.js） |
| 硅基流动          | 一个大模型API供应商                |

## AIGC开发平台

- Coze（在线AIGC开发平台）
- Cherry Studio（在线AIGC开发平台）
- Ollama（本地搭建AIGC开发平台）
- Cloud Studio（在线AIGC开发IDE）


## 学习路线

1. 数学
   - 线性代数
   - 概率统计
   - 微积分
2. Python
   - Numpy
   - matplotlib
3. 机器学习
   - 监督学习
   - 无监督学习
   - 评估指标
4. 深度学习
   - 神经网络
   - 训练技巧
5. 自然语言处理
   - NLP
6. 大规模语言模型
   - Transformer架构
   - 预训练模型

## AI工程架构

| 层级      | 分类       | 内容                                 | 知名组件/供应商                             |
|---------|----------|------------------------------------|--------------------------------------|
| **第一层** | **基础设施** | GPU集群                              | NVIDIA, AMD                          |
|         |          | 向量数据库                              | Milvus, PingCAP (基于TiKV的向量引擎)        |
|         |          | 容器云                                | Docker, Kubernetes (K8s), 阿里云容器服务    |
|         |          | 通用管理平台                             | 阿里云, 腾讯云, AWS, GCP                   |
|         |          | 动态业务数据                             | - (通常依赖于企业自身的数据管理系统)                 |
| **第二层** | **模型**   | 语言大模型                              | OpenAI (GPT), 阿里云通义千问                |
|         |          | 视觉大模型                              | MidJourney, Stable Diffusion, DALL-E |
|         |          | 代码大模型                              | GitHub Copilot, Replit Ghostwriter   |
|         |          | 本地定制化模型                            | 百度AI定制平台, 阿里云模型定制服务                  |
| **第三层** | **算法**   | 语言服务（关键信息提取、情感分析、语义分析、多模态提取...）    | 百度NLP, 腾讯AI Lab                      |
|         |          | 语音服务（语音识别（ASR）、语音合成、文本转语音（TTS）...） | 科大讯飞, 谷歌Cloud Speech-to-Text         |
|         |          | 视觉服务（文生文、文生图、文生视频、图像识别（OCR）...）    | 商汤科技SensePass, 旷视科技Face++            |
|         |          | LLM服务（归纳推理、RAG问答、人机对话...）          | OpenAI (GPT系列), 谷歌LaMDA              |
|         |          | Agent服务（Tool Agent、Code Agent...）  | 微软Power Automate, 阿里云RPA             |
| **第四层** | **产品**   | - (综合各层级技术形成的具体产品)                 | 阿里云MaxCompute, 腾讯云TI平台               |
| **第五层** | **场景**   | 知识问答（RAG）                          | 百度知道, 搜狗问问                           |
|         |          | 知识库                                | 维基百科, 百度百科, 阿里云知识图谱                  |


## FAQ

### Embedding Model vs. Large Language Model

|       | Embedding Model                                                                                        | Large Language Model                                                                                                            |
|-------|--------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| 参数量   | 1亿~5亿                                                                                                  | 大于10亿                                                                                                                           |
| 主要作用  | 离散数据转为向量                                                                                               | 理解和生成人类语言                                                                                                                       |
| 使用场景  | 语义搜索：将查询和文档转为向量，计算余弦相似度</br>推荐系统：用户画像和商品描述向量化后匹配</br>异常检测：偏离向量空间正常区域的数据视为异常</br>RAG架构：为LLM提供检索增强的上下文信息 | 文本生成：写作/翻译/摘要</br>复杂推理：数学证明/代码调试</br>指令跟随：理解并执行复杂任务</br>多模态处理：图文混合输入（如GPT-4V）                                                   |
| 典型模型  | 文本嵌入</br>text-embedding-ada-002（OpenAI）、BGE（百度）、E5（微软）</br>多模态嵌入</br>CLIP（图文互搜）、AudioCLIP（音频+文本）       | 通用LLM：</br>GPT-4、Claude 3、Llama 3 </br>领域专用： </br>BloombergGPT（金融）、Med-PaLM 2（医疗）</br>开源模型：</br>Mistral、Qwen（阿里）、DeepSeek（深度求索） |



