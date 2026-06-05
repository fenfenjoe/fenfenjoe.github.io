# claudecode实战

## 安装与配置（windows）

1. 安装
```bash
# 全局安装
npm install -g @anthropic-ai/claude-code
# 检查是否安装成功
claude --version​
```


2. 配置

需要先选择大模型供应商，然后可根据他们提供的教程进行配置。

例如我用的是火山引擎的coding plan，教程则是：<https://www.volcengine.com/docs/82379/1928262?lang=zh>



（1）找到claude的配置文件，路径位于：```C:\Users\<用户名>\.claude\settings.json```

（2）添加内容  
```json
{
    "env": {
        "ANTHROPIC_AUTH_TOKEN": "<ARK_API_KEY>",
        "ANTHROPIC_BASE_URL": "https://ark.cn-beijing.volces.com/api/coding",
        "ANTHROPIC_MODEL": "<MODEL_NAME>",
        "ANTHROPIC_DEFAULT_HAIKU_MODEL": "<MODEL_NAME>",
        "ANTHROPIC_DEFAULT_SONNET_MODEL": "<MODEL_NAME>",
        "ANTHROPIC_DEFAULT_OPUS_MODEL": "<MODEL_NAME>",
        "CLAUDE_CODE_SUBAGENT_MODEL": "<MODEL_NAME>"
    }
}
```

（3）找到```C:\Users\<用户名>\.claude.json```，在里面添加：
```json
{​
  "hasCompletedOnboarding": true​
}
```

## 常用命令

```bash
# 启动
claude
```

## 常用工具

### cc-pane

<https://winget.ragerworks.com/package/wuxiran.CC-Panes>

### cc-switch

