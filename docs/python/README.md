---
title: 概述
---

# PYTHON

## 概念

| 概念      | 说明                                                                         |
|---------|----------------------------------------------------------------------------|
| pip     | 	Python包管理工具，用于安装和管理Python第三方库。</br> python2.7.9+或python3.4+自带pip          |
| uv      | Python包管理工具                                                                |
| PyPI    | 	Python Package Index的缩写，是Python官方的第三方软件库仓库。</br> 仓库地址：<https://pypi.org/> |
| PyCharm | 	JetBrains公司开发的Python集成开发环境(IDE)，提供代码补全、调试等功能                              |
| Django  | 	高级Python Web框架，采用"MTV"模式，内置ORM、Admin等全栈功能                                 |
| Flask   | 	轻量级Python Web框架，核心简单但可扩展性强，适合小型项目和微服务                                     |
| FastAPI | 	基于 Starlette + Pydantic 的现代异步 Web 框架，性能接近 Go，自动生成 Swagger 文档，推荐用于 API 开发  |
| logging | 	Python 内置日志模块，支持多级别、多输出目标（控制台/文件/网络），生产项目的标准日志方案                          |
|conda||
|venv| Python内置的模块，用于创建虚拟环境。创建的环境中包含：独立的python解析器、pip工具和包安装目录                     |

## 开发环境搭建

### 单环境（推荐新手）

> 适用场景：只维护一个项目，或所有项目都使用同一个 Python 版本。

**第一步：安装 Python**

前往 [https://www.python.org/downloads/](https://www.python.org/downloads/) 下载安装包，安装时勾选 `Add Python to PATH`。

安装完成后验证：

```bash
python --version
pip --version
```

**第二步：安装 PyCharm**

前往 [https://www.jetbrains.com/pycharm/](https://www.jetbrains.com/pycharm/) 下载社区版（免费）。

**第三步：在 PyCharm 中指定 Python 解释器**

1. 打开项目后，进入 `File → Settings → Project: <项目名> → Python Interpreter`
2. 点击右上角齿轮图标 → `Add Interpreter → Add Local Interpreter`
3. 选择 `System Interpreter`，找到刚才安装的 `python.exe` 路径（例如 `C:\Python311\python.exe`）
4. 点击 OK，等待索引完成即可

---

### 多环境（推荐正式开发）

> 以下情况需要多个 Python 环境：
> - 不同项目依赖**不同 Python 版本**（如一个用 3.9，另一个用 3.11）
> - 不同项目的**第三方库版本冲突**（如 `numpy==1.21` vs `numpy==2.0`）
> - 需要**复现别人的环境**，隔离实验避免污染全局
> - 团队协作，需要保证每个人的环境一致

多环境管理有两种主流方案：

| 方案 | 适用场景 | 特点 |
|------|--------|------|
| **venv**（内置） | 仅需隔离包，Python 版本固定 | 无需额外安装，轻量 |
| **Miniconda** | 需要管理多个 Python 版本，或有非 Python 依赖（如 CUDA） | 功能更强，适合数据/AI 项目 |

---

#### 方案一：venv（内置虚拟环境）

无需额外安装，Python 3.3+ 自带。

```bash
# 1. 在项目根目录创建虚拟环境（目录名习惯用 .venv）
python -m venv .venv

# 2. 激活（Windows）
.venv\Scripts\activate

# 3. 激活（macOS / Linux）
source .venv/bin/activate

# 激活后命令行前缀会出现 (.venv) 字样

# 4. 安装依赖（仅影响当前虚拟环境）
pip install requests

# 5. 退出虚拟环境
deactivate
```

**在 PyCharm 中指定 venv 解释器：**

1. `File → Settings → Project: <项目名> → Python Interpreter`
2. 点击齿轮 → `Add Interpreter → Add Local Interpreter`
3. 选择 `Virtualenv Environment → Existing`，路径选择 `.venv\Scripts\python.exe`
4. 点击 OK

---

#### 方案二：Miniconda（多 Python 版本管理）

> **conda / miniconda / anaconda 的区别：**
> - **conda**：包 + 环境管理器，可管理不同 Python 版本
> - **miniconda**：最小化安装包，只含 Python 和 conda，推荐使用
> - **anaconda**：预装了 150+ 科学计算包，体积庞大，按需选择

**第一步：安装 Miniconda**

前往 [https://docs.conda.io/en/latest/miniconda.html](https://docs.conda.io/en/latest/miniconda.html) 下载安装。

安装完成后，配置以下环境变量（Windows）：

```
C:\miniconda3
C:\miniconda3\Library\bin
C:\miniconda3\Scripts
```

**第二步：创建并管理虚拟环境**

```bash
# 创建指定 Python 版本的环境
conda create -n myenv python=3.11
# -n 是 --name 的缩写，环境默认存放在 miniconda3\envs\

# 查看所有环境
conda env list

# 激活环境（Windows）
conda activate myenv

# 激活环境（macOS / Linux）
source activate myenv

# 退出环境
conda deactivate

# 删除环境
conda env remove -n myenv
```

**第三步：在环境中管理包**

```bash
# 安装包
conda install numpy
# conda 找不到的包可以用 pip 补充安装
pip install some-package

# 查看已安装的包
conda list

# 搜索包的可用版本
conda search numpy

# 卸载包
conda remove numpy
```

> 找不到包名？可在 [https://anaconda.org/](https://anaconda.org/) 搜索。

**第四步：在 PyCharm 中指定 conda 环境解释器**

1. `File → Settings → Project: <项目名> → Python Interpreter`
2. 点击齿轮 → `Add Interpreter → Add Local Interpreter`
3. 选择 `Conda Environment → Existing`
4. 路径选择对应环境的 python.exe，例如：`C:\miniconda3\envs\myenv\python.exe`
5. 点击 OK，等待索引完成

> 如果 PyCharm 检测到 conda 安装，也可以选择 `Conda Environment → New`，直接在 IDE 内创建新环境。

**miniconda 目录结构说明：**

```
C:\miniconda3\
├── python.exe              # base 环境的 Python 解释器
├── Lib\
│   └── site-packages\      # base 环境的第三方包
├── Scripts\
│   └── pip.exe             # 包管理工具
└── envs\
    ├── myenv\              # 自建环境 myenv
    │   ├── python.exe      # myenv 独立的 Python 解释器
    │   └── Lib\site-packages\
    └── another_env\        # 另一个自建环境
```


## 项目结构

一个项目属于一个**包**，一个包是多个**模块**的集合。  

包与模块的结构如下：
```
api                          # 项目名
├── src                      # 源代码主目录
│  ├──module_A               # A模块
│  │  ├──__init__.py         # 标记为python包
│  │  ├──test1.py            # 子包里的test1模块
│  │  └──test2.py 
│  └──module_B               # B模块
│     ├──__init__.py         # 标记为python包
│     └──test3.py            # 子包里的test1模块
├── tests                    # 单元测试目录
│   ├── test_module_a.py     # 模块A的测试用例
│   └── test_module_b.py
├── requirements.txt         # 依赖库列表（pip安装）
├── pyproject.toml           # 项目元数据及构建配置（现代项目推荐）
├── setup.py                 # 旧版项目打包配置（可选）
├── .env                     # 参数配置文件
├── .gitignore               # Git忽略规则
└── README.md                # 项目说明文档
```

## 打包&部署

### 【打包成python库】：setuptool

1. 添加setup.py配置文件
```python
from setuptools import setup, find_packages

setup(
    name="project_name",
    version="0.1.0",
    packages=find_packages(),
    install_requires=open("requirements.txt").read().splitlines(),
    entry_points={"console_scripts": ["mycli=src.main:main"]}  # 命令行入口
) 
```

2. 生成分发包

```bash
# 生成源码包(.tar.gz)和Wheel包(.whl)
python setup.py sdist bdist_wheel  
```

生成的包位于```/dist``` 目录中。  


### 【打包成桌面应用】：PyInstaller

略

### 【打包成Web服务】

假设部署到Ubuntu。  

1. 安装基础Python环境
``` 
sudo apt update
sudo apt install python3 python3-pip git nginx  # Web服务需Nginx
```
2. 上传源代码
3. 用venv配置虚拟环境，然后安装依赖
```
python3 -m venv my_venv # 创建名为my_venv的虚拟环境
source my_venv/bin/activate # 进入my_venv虚拟环境
pip install -r requirements.txt #在my_venv环境中，安装项目依赖（仅影响当前虚拟环境）
```
4. 配置nginx服务器（略）
5. 配置wsgi服务器（略）


