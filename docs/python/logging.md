---
title: logging 日志
sidebarDepth: 2
---

# logging 日志

Python 内置的 `logging` 模块是生产级日志的标准方案，相比 `print` 的优势：

- 可设置日志级别，按环境过滤
- 支持输出到文件、控制台、远程服务等多个目标
- 自动记录时间、文件名、行号等上下文信息
- 异步安全，多线程环境下不会产生日志混乱

---

## 日志级别

从低到高：

| 级别 | 数值 | 使用场景 |
|---|---|---|
| `DEBUG` | 10 | 开发调试，记录详细的执行流程 |
| `INFO` | 20 | 正常运行信息（服务启动、关键操作完成）|
| `WARNING` | 30 | 警告，程序仍可运行但需要关注 |
| `ERROR` | 40 | 错误，某个功能失败 |
| `CRITICAL` | 50 | 严重错误，程序可能无法继续运行 |

> 设置某个级别后，只有 **≥ 该级别** 的日志才会输出。例如设为 `WARNING`，则 `DEBUG` 和 `INFO` 的日志会被忽略。

---

## 快速开始

```python
import logging

# 最简单用法（不推荐生产使用）
logging.basicConfig(level=logging.DEBUG)
logging.debug('调试信息')
logging.info('正常信息')
logging.warning('警告')
logging.error('错误')
logging.critical('严重错误')
```

---

## 推荐配置方式

### 方式一：代码配置（适合脚本、小项目）

```python
import logging

def setup_logger(name: str = __name__, level: int = logging.INFO) -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(level)

    # 避免重复添加 handler（多次调用时）
    if logger.handlers:
        return logger

    formatter = logging.Formatter(
        fmt='%(asctime)s | %(levelname)-8s | %(name)s:%(lineno)d | %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )

    # 控制台输出
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

    # 文件输出（自动按大小滚动）
    from logging.handlers import RotatingFileHandler
    file_handler = RotatingFileHandler(
        filename='app.log',
        maxBytes=10 * 1024 * 1024,      # 10MB 后滚动
        backupCount=5,                  # 保留 5 个历史文件
        encoding='utf-8'
    )
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    return logger


# 使用
logger = setup_logger('myapp')
logger.info('服务启动')
logger.debug('调试：变量 x = %s', 42)
```

### 方式二：字典配置（推荐生产使用）

```python
import logging
import logging.config

LOGGING_CONFIG = {
    'version': 1,
    'disable_existing_loggers': False,  # 不禁用第三方库的 logger
    'formatters': {
        'standard': {
            'format': '%(asctime)s | %(levelname)-8s | %(name)s:%(lineno)d | %(message)s',
            'datefmt': '%Y-%m-%d %H:%M:%S',
        },
        'simple': {
            'format': '[%(levelname)s] %(message)s'
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'level': 'DEBUG',
            'formatter': 'standard',
            'stream': 'ext://sys.stdout',
        },
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'level': 'INFO',
            'formatter': 'standard',
            'filename': 'logs/app.log',
            'maxBytes': 10485760,       # 10MB
            'backupCount': 5,
            'encoding': 'utf-8',
        },
        'error_file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'level': 'ERROR',
            'formatter': 'standard',
            'filename': 'logs/error.log',
            'maxBytes': 10485760,
            'backupCount': 3,
            'encoding': 'utf-8',
        },
    },
    'loggers': {
        '': {                           # root logger
            'handlers': ['console', 'file', 'error_file'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'uvicorn': {                    # 单独控制 uvicorn 日志级别
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}

logging.config.dictConfig(LOGGING_CONFIG)
logger = logging.getLogger(__name__)
```

### 方式三：YAML 配置文件（适合大型项目）

```yaml
# logging.yaml
version: 1
disable_existing_loggers: false

formatters:
  standard:
    format: "%(asctime)s | %(levelname)-8s | %(name)s:%(lineno)d | %(message)s"
    datefmt: "%Y-%m-%d %H:%M:%S"

handlers:
  console:
    class: logging.StreamHandler
    level: DEBUG
    formatter: standard
    stream: ext://sys.stdout
  file:
    class: logging.handlers.RotatingFileHandler
    level: INFO
    formatter: standard
    filename: logs/app.log
    maxBytes: 10485760
    backupCount: 5
    encoding: utf-8

root:
  level: DEBUG
  handlers: [console, file]
```

```python
import logging
import logging.config
import yaml

with open('logging.yaml', 'r') as f:
    config = yaml.safe_load(f)
logging.config.dictConfig(config)

logger = logging.getLogger(__name__)
```

---

## 核心概念

```
Logger（记录器）
    ↓ 创建 LogRecord
Handler（处理器）      ← 决定"输出到哪里"
    ↓ 格式化
Formatter（格式化器）  ← 决定"输出什么格式"
    ↓
输出目标（控制台 / 文件 / 网络...）
```

### Logger 层级与传播

```python
# Logger 按名称形成父子层级，用 . 分隔
root_logger = logging.getLogger()           # 根 logger（名称为 ''）
app_logger = logging.getLogger('myapp')     # myapp
db_logger = logging.getLogger('myapp.db')  # myapp.db（myapp 的子级）

# 默认情况下，子 logger 的日志会向上传播（propagate=True）
# myapp.db 的日志会同时被 myapp 和 root 处理
# 如果不想传播，设置：
db_logger.propagate = False
```

**推荐做法**：每个模块用 `__name__` 作为 logger 名称：

```python
# utils/db.py
import logging
logger = logging.getLogger(__name__)        # 名称为 'utils.db'
```

### Formatter 格式符

| 格式符 | 说明 | 示例输出 |
|---|---|---|
| `%(asctime)s` | 时间 | `2025-03-11 14:30:00` |
| `%(levelname)s` | 级别名 | `INFO` |
| `%(name)s` | Logger 名称 | `myapp.db` |
| `%(filename)s` | 文件名 | `db.py` |
| `%(lineno)d` | 行号 | `42` |
| `%(funcName)s` | 函数名 | `connect` |
| `%(message)s` | 日志内容 | `连接数据库成功` |
| `%(process)d` | 进程 ID | `12345` |
| `%(thread)d` | 线程 ID | `140234` |

---

## 常用 Handler

| Handler | 说明 |
|---|---|
| `StreamHandler` | 输出到控制台（stdout/stderr）|
| `FileHandler` | 输出到文件 |
| `RotatingFileHandler` | 按文件大小滚动 |
| `TimedRotatingFileHandler` | 按时间滚动（每天/每小时）|
| `SysLogHandler` | 输出到系统 Syslog |
| `HTTPHandler` | 发送 HTTP 请求到日志服务器 |
| `QueueHandler` | 异步日志（配合 `QueueListener`）|

```python
from logging.handlers import TimedRotatingFileHandler

# 每天生成一个日志文件，保留 30 天
handler = TimedRotatingFileHandler(
    filename='logs/app.log',
    when='midnight',                    # 每天凌晨切换
    interval=1,
    backupCount=30,
    encoding='utf-8'
)
```

---

## 实用技巧

### 记录异常信息（含堆栈）

```python
try:
    result = 1 / 0
except ZeroDivisionError:
    logger.exception('计算出错')        # 自动附加完整堆栈信息
    # 等价于：
    logger.error('计算出错', exc_info=True)
```

### 结构化日志（便于日志平台检索）

```python
import json

class JsonFormatter(logging.Formatter):
    def format(self, record):
        log_data = {
            'timestamp': self.formatTime(record),
            'level': record.levelname,
            'logger': record.name,
            'message': record.getMessage(),
            'file': f'{record.filename}:{record.lineno}',
        }
        if record.exc_info:
            log_data['exception'] = self.formatException(record.exc_info)
        return json.dumps(log_data, ensure_ascii=False)
```

### 添加上下文信息（LoggerAdapter）

```python
# 给每条日志附加 request_id、user_id 等上下文
logger = logging.getLogger(__name__)

def get_logger_with_context(request_id: str, user_id: str = None):
    extra = {'request_id': request_id, 'user_id': user_id or 'anonymous'}
    return logging.LoggerAdapter(logger, extra)

# 在 Formatter 中使用 %(request_id)s 即可输出
```

### 与 FastAPI 集成

```python
# main.py
import logging
import logging.config
from fastapi import FastAPI, Request
import time

logging.config.dictConfig(LOGGING_CONFIG)
logger = logging.getLogger('myapp')

app = FastAPI()

@app.middleware('http')
async def log_requests(request: Request, call_next):
    start = time.time()
    logger.info(f'→ {request.method} {request.url.path}')
    response = await call_next(request)
    duration = time.time() - start
    logger.info(
        f'← {request.method} {request.url.path} '
        f'[{response.status_code}] {duration*1000:.1f}ms'
    )
    return response
```

---

## 最佳实践

| 实践 | 说明 |
|---|---|
| 每个模块独立 logger | `logger = logging.getLogger(__name__)` |
| 用参数占位符而非字符串拼接 | `logger.info('用户 %s 登录', username)` 而非 `f'用户 {username} 登录'`（性能更好，级别过滤时不必要的格式化被跳过）|
| 异常用 `exception()` | 自动包含完整堆栈，而不只是错误消息 |
| 生产环境输出到文件 | 使用 `RotatingFileHandler` 防止日志文件无限增长 |
| 错误日志单独文件 | 设一个只接收 ERROR 及以上的 handler，便于监控告警 |
| 不要用 `print` | 在模块代码中用 `logger`，只在脚本入口用 `print` |
| 日志级别区分环境 | 开发：DEBUG；生产：INFO 或 WARNING |
