---
title: git操作宝典
sidebar: 'heading'
---

# git操作宝典


## 远程代码覆盖本地（reset）

```
git reset --hard origin/master
```

## 暂存本地的更改（stash）

```
#暂存
git stash
#恢复
git stash pop
```

## 撤销某次提交（revert）

原理是“反做”，即对那次提交修改过的所有文件，生成一个逆向的修改记录

```
# 撤销
git revert -n 版本号 
# 提交
git commit -m 版本名 
```


## 回退到某个版本（reset）

```
# 查看版本号
git log
# 回退到目标版本
git reset --hard 目标版本号
# 强制推送
git push -f 
```

## 关于merge的选择

- **Merge Commit**：保留完整历史，但会产生合并提交。适合公共项目或需要清晰记录分支合并的情况。

- **Squash and Merge**：将所有提交压缩成一个新提交并入主分支。保持主分支历史线性整洁，是许多团队的默认选择。

- **Rebase and Merge**：将分支提交变基后并入，历史最线性，但操作需谨慎。

## 获取远程仓库更新（fetch）

`fetch` 用于从远程仓库下载最新的提交记录和分支信息，但**不会自动合并**到本地分支。

```bash
# 获取所有远程分支的更新
git fetch origin

# 获取指定分支的更新
git fetch origin master

```

**作用说明**：
- 安全地查看远程仓库的变化，不影响本地工作区
- 获取后可以先查看差异 `git diff origin/master`，再决定是否合并
- 常与 `git merge` 或 `git rebase` 配合使用
- 区别于 `git pull`：`pull = fetch + merge`

## 切换分支和检出文件（checkout）

`checkout` 是一个多功能命令，主要用于切换分支、创建分支或恢复文件。

```bash
# 切换到已存在的分支
git checkout master

# 创建并切换到新分支
git checkout -b new-branch

# 基于远程分支创建本地分支
git checkout -b master origin/master

# 强制切换分支（放弃本地未提交的修改）
git checkout -f master

# 恢复某个文件到最新提交的状态
git checkout -- filename.txt

# 恢复整个工作区到最新提交的状态
git checkout .

# 切换到指定提交（进入游离HEAD状态）
git checkout commit-hash
```

**作用说明**：
- 切换分支：在不同功能开发之间切换
- 创建分支：快速基于当前或远程分支创建新分支
- 恢复文件：撤销未提交的修改（慎用，修改会丢失）
- **注意**：Git 2.23+ 推荐使用 `git switch` 切换分支，`git restore` 恢复文件

## 设置分支跟踪关系（set-upstream）

建立本地分支与远程分支的跟踪关系，简化后续 `push` 和 `pull` 操作。

```bash
# 设置当前分支跟踪远程分支
git branch --set-upstream-to=origin/master master

# 简写方式
git branch -u origin/master master

# 在推送时同时设置跟踪关系
git push -u origin master

# 查看所有分支的跟踪关系
git branch -vv
```

**作用说明**：
- 建立跟踪关系后，直接使用 `git pull` 和 `git push` 无需指定远程分支
- 适用于从 ZIP 包初始化的仓库，需要手动建立关联
- 查看跟踪状态：`git branch -vv` 会显示类似 `[origin/master]` 的信息

## 管理远程仓库地址（remote）

用于添加、修改、删除和查看远程仓库的配置。

```bash
# 查看所有远程仓库
git remote -v

# 添加远程仓库
git remote add origin git@github.com:username/repo.git

# 修改远程仓库地址（SSH改为HTTPS）
git remote set-url origin https://github.com/username/repo.git

# 修改远程仓库地址（HTTPS改为SSH）
git remote set-url origin git@github.com:username/repo.git

# 删除远程仓库
git remote remove origin

# 重命名远程仓库
git remote rename origin upstream

# 查看远程仓库详细信息
git remote show origin
```

**作用说明**：
- **添加远程仓库**：本地仓库与远程仓库建立连接
- **修改地址**：切换 SSH/HTTPS 协议，或更换仓库地址
- **删除远程仓库**：移除不再使用的远程连接
- **常见场景**：
  - SSH 速度快但需配置密钥，HTTPS 方便但每次需输入密码
  - Fork 的项目通常会添加两个远程仓库：`origin`（自己的）和 `upstream`（原项目）

## 查看提交历史（log）

查看项目的提交历史记录，了解代码演变过程。

```bash
# 查看完整提交历史
git log

# 查看简洁的单行提交历史
git log --oneline

# 查看最近5条提交
git log --oneline -5

# 查看提交历史图形化展示
git log --oneline --graph --all

# 查看某个文件的提交历史
git log -- filename.txt

# 查看某个作者的提交
git log --author="username"

# 查看指定日期范围的提交
git log --since="2024-01-01" --until="2024-12-31"
```

**作用说明**：
- 查看项目历史，了解代码变更
- 找到需要回退或恢复的版本号
- 追踪某个文件的修改历史
- 审查团队成员的提交记录