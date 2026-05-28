---
title: wsl
sidebar: 'heading'
---

# wsl实战

## WSL常用命令

查看所有发行版
```shell
wsl -l -v
```

进入
```shell
# 默认的发行版
wsl
# 进入指定的发行版
wsl -d Ubuntu-22.04
```

停止
```shell
wsl --shutdown
```

安装
```shell
wsl --install -d <发行版名>
```

指定默认的发行版
```shell
wsl --set-default <发行版名>
```

卸载
```shell
wsl --unregister -n <发行版名>
```

**在windows中访问wsl文件系统（重要）**

```shell
# 1.打开我的电脑，或者点击Win + E
# 2.在地址栏输入以下命令
\\wsl$
```