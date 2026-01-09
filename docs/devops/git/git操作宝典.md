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