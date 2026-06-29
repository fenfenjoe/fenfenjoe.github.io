---
title: FastAPI
sidebarDepth: 2
---

# FastAPI

FastAPI 是基于 Python 3.7+ 的现代 Web 框架，核心特点：

- **高性能**：基于 Starlette（异步）和 Pydantic（数据校验），性能接近 Node.js / Go
- **自动文档**：运行后自动生成 Swagger UI（`/docs`）和 ReDoc（`/redoc`）
- **类型安全**：利用 Python 类型注解自动完成请求/响应校验和序列化

官方文档：[https://fastapi.tiangolo.com/zh/](https://fastapi.tiangolo.com/zh/)

---

## 快速开始

```bash
pip install fastapi uvicorn
```

```python
# main.py
from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def read_root():
    return {'message': 'Hello World'}

@app.get('/items/{item_id}')
def read_item(item_id: int, q: str = None):
    return {'item_id': item_id, 'q': q}
```

```bash
# 启动服务
uvicorn main:app --reload
# --reload：代码变更后自动重启（开发模式）
# 访问 http://localhost:8000
# 文档地址 http://localhost:8000/docs
```

---

## 路由与 HTTP 方法

```python
from fastapi import FastAPI

app = FastAPI()

@app.get('/users')          # GET
@app.post('/users')         # POST
@app.put('/users/{id}')     # PUT（全量更新）
@app.patch('/users/{id}')   # PATCH（部分更新）
@app.delete('/users/{id}')  # DELETE
```

### 路由分组（APIRouter）

```python
# routers/users.py
from fastapi import APIRouter

router = APIRouter(prefix='/users', tags=['用户'])

@router.get('/')
def list_users():
    return []

@router.get('/{user_id}')
def get_user(user_id: int):
    return {'id': user_id}

# main.py
from fastapi import FastAPI
from routers import users

app = FastAPI()
app.include_router(users.router)
```

---

## 请求参数

### 路径参数

```python
@app.get('/users/{user_id}')
def get_user(user_id: int):           # 自动类型转换和校验
    return {'id': user_id}

# 路径参数带约束（需要 Annotated + Path）
from typing import Annotated
from fastapi import Path

@app.get('/items/{item_id}')
def get_item(item_id: Annotated[int, Path(ge=1, le=1000)]):
    return {'item_id': item_id}
```

### 查询参数

```python
@app.get('/items')
def list_items(
    page: int = 1,              # 有默认值 → 可选参数
    size: int = 10,
    keyword: str = None,        # None 默认值 → 可选，不传时为 None
):
    return {'page': page, 'size': size, 'keyword': keyword}

# 访问：GET /items?page=2&size=20&keyword=hello
```

### 请求体（Body）

```python
from pydantic import BaseModel, Field
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: str
    age: Optional[int] = None           # 可选字段

    # Field 提供更多约束和文档描述
    password: str = Field(min_length=6, description='至少 6 位')

@app.post('/users', status_code=201)
def create_user(user: UserCreate):
    # user 已经过 Pydantic 校验
    return {'id': 1, **user.model_dump()}
```

### 请求头 & Cookie

```python
from fastapi import Header, Cookie

@app.get('/me')
def get_me(
    authorization: str = Header(None),  # 读取 Authorization 请求头
    session_id: str = Cookie(None),     # 读取 Cookie
):
    return {'auth': authorization, 'session': session_id}
```

### 文件上传

```python
from fastapi import UploadFile, File

@app.post('/upload')
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    return {
        'filename': file.filename,
        'content_type': file.content_type,
        'size': len(content)
    }
```

---

## 响应处理

### 响应模型

```python
from pydantic import BaseModel

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    # 不包含 password，自动过滤

@app.get('/users/{user_id}', response_model=UserResponse)
def get_user(user_id: int):
    # 返回的 dict/对象 会按 UserResponse 过滤和序列化
    return {'id': user_id, 'username': 'alice', 'email': 'a@b.com', 'password': 'secret'}
```

### 状态码与异常

```python
from fastapi import HTTPException, status

@app.get('/users/{user_id}')
def get_user(user_id: int):
    user = find_user(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'用户 {user_id} 不存在'
        )
    return user

# 自定义异常处理
from fastapi import Request
from fastapi.responses import JSONResponse

class BusinessError(Exception):
    def __init__(self, code: int, msg: str):
        self.code = code
        self.msg = msg

@app.exception_handler(BusinessError)
async def business_error_handler(request: Request, exc: BusinessError):
    return JSONResponse(
        status_code=400,
        content={'code': exc.code, 'message': exc.msg}
    )
```

---

## 中间件

```python
from fastapi.middleware.cors import CORSMiddleware
import time

# CORS（跨域）
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'https://myapp.com'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# 自定义中间件（统计请求耗时）
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

class TimingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start = time.time()
        response = await call_next(request)
        duration = time.time() - start
        response.headers['X-Process-Time'] = f'{duration:.3f}s'
        return response

app.add_middleware(TimingMiddleware)
```

---

## 依赖注入（Depends）

依赖注入是 FastAPI 最强大的特性之一，用于复用逻辑（鉴权、数据库会话、参数提取等）。

```python
from fastapi import Depends, HTTPException

# 定义依赖函数
def get_current_user(token: str = Header(None)):
    if not token or token != 'valid-token':
        raise HTTPException(status_code=401, detail='未授权')
    return {'user_id': 1, 'username': 'alice'}

# 在路由中注入
@app.get('/profile')
def get_profile(current_user: dict = Depends(get_current_user)):
    return current_user

# 依赖也可以有依赖（嵌套依赖）
def get_db():
    db = SessionLocal()
    try:
        yield db                        # yield 依赖：请求结束后自动执行 finally
    finally:
        db.close()

@app.get('/items')
def list_items(db = Depends(get_db)):
    return db.query(Item).all()
```

---

## 数据校验（Pydantic）

```python
from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=20, description='用户名')
    email: EmailStr                     # 自动校验邮箱格式（需 pip install email-validator）
    age: Optional[int] = Field(None, ge=0, le=150)
    tags: List[str] = []

    # 自定义校验器
    @validator('username')
    def username_alphanumeric(cls, v):
        if not v.isalnum():
            raise ValueError('用户名只能包含字母和数字')
        return v

# Pydantic v2 写法（validator → field_validator）
from pydantic import field_validator

class Item(BaseModel):
    name: str
    price: float

    @field_validator('price')
    @classmethod
    def price_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('价格必须大于 0')
        return v
```

---

## 异步支持

```python
import asyncio
import httpx

# async def 路由（处理 I/O 密集型操作时推荐）
@app.get('/async-data')
async def get_async_data():
    async with httpx.AsyncClient() as client:
        response = await client.get('https://api.example.com/data')
    return response.json()

# 普通 def 也支持（FastAPI 会在线程池中运行，避免阻塞事件循环）
@app.get('/sync-data')
def get_sync_data():
    return {'data': 'sync'}
```

---

## 生命周期事件

```python
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 启动时执行（如初始化数据库连接池、加载 ML 模型）
    print('应用启动')
    yield
    # 关闭时执行（如释放资源）
    print('应用关闭')

app = FastAPI(lifespan=lifespan)
```

---

## 项目结构（推荐）

```
my_api/
├── main.py               # 应用入口，创建 FastAPI 实例
├── routers/              # 路由模块
│   ├── __init__.py
│   ├── users.py
│   └── items.py
├── models/               # Pydantic 模型（请求/响应 Schema）
│   ├── __init__.py
│   └── user.py
├── services/             # 业务逻辑层
│   └── user_service.py
├── dependencies/         # 依赖注入（鉴权、DB 会话等）
│   └── auth.py
├── core/                 # 配置、常量
│   └── config.py
├── requirements.txt
└── .env
```

```python
# core/config.py（使用 pydantic-settings 读取环境变量）
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = 'My API'
    database_url: str
    secret_key: str
    debug: bool = False

    class Config:
        env_file = '.env'

settings = Settings()
```

---

## 常用配置速查

```python
app = FastAPI(
    title='My API',
    description='API 描述',
    version='1.0.0',
    docs_url='/docs',           # Swagger UI 地址（None 则关闭）
    redoc_url='/redoc',         # ReDoc 地址
    openapi_url='/openapi.json' # OpenAPI schema 地址
)
```

```bash
# 生产部署
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4

# 配合 gunicorn（更健壮的生产方案）
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```
