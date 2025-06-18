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
|conda||
|venv| Python内置的模块，用于创建虚拟环境。创建的环境中包含：独立的python解析器、pip工具和包安装目录                     |

## 开发环境搭建

### 【IDE】Pycharm

> 代码开发&调试、版本控制

需要先安装python。安装好后，在命令行中执行以下命令，返回python版本即安装成功。  

```
python --version
```



### 【环境管理器】miniconda（可选）

> 当你需要在**多个Python环境**下开发、安装**多语言依赖包**时，需要用到miniconda


记得配置环境变量：
* \miniconda3
* \miniconda3\Library\bin
* \miniconda3\Scripts


> **conda、miniconda、anaconda的区别**:
> - conda: 与pip类似，但它不仅能管理包，还能隔离和管理不同python版本的环境
> - miniconda: Anaconda 的轻量级版本，只包含了 Python 和 Conda，以及它们的依赖项
> - Anaconda: 一个非常流行的 Python 发行版，用于科学计算。它包含了 Vonda、Python 和超过 150 个科学软件包及其依赖项
> - jupyter: 如果你安装了anaconda，jupyter notebook会作为其中的一部分被自动安装。

#### miniconda目录解析
```
\miniconda3
|
|_Lib                        ----内部模块
| |
| |_ site-packages           ----第三方模块
|
|_Scripts                    ----可执行文件目录
| |
| |_pip.exe                  ----用于安装第三方模块的程序
|
|_python.exe                 ----python解释器
```


#### 使用miniconda


##### 虚拟环境操作
1. 创建虚拟环境
```
conda create -n Test1 python=3.7
# -n是-name的缩写
# 环境默认创建到安装目录的envs下
```

2. 查看已有虚拟环境
```
conda env list
```

3. 进入虚拟环境
```
activate Test1
```

4. 退出虚拟环境
```
deactivate
```

5. 删除虚拟环境
```
conda env remove -n Test1
```

##### 库操作
1. 安装第三方库
```
conda install [库名]
```

2. 查看某个库的所有版本
```
conda search [库名]
```

3. 卸载某个库
```
conda remove [库名]
```

4. 列出当前虚拟环境已安装的库
```
conda list
```

> 找不到库名可以到这里搜索：<https://anaconda.org/>


### 嵌入式python(运行环境)

安装python
安装pip
查看pip已安装的模块
python -m pip list


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


