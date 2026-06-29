---
title: Python3 基础
sidebarDepth: 2
---

# Python3 基础

官方文档：[https://docs.python.org/zh-cn/3/index.html](https://docs.python.org/zh-cn/3/index.html)  
内置函数：[https://docs.python.org/zh-cn/3/library/functions.html](https://docs.python.org/zh-cn/3/library/functions.html)

---

## 运算符

| 符号 | 作用 | 示例 |
|---|---|---|
| `**` | 乘方 | `2**3` = 8 |
| `%` | 求余 | `7%3` = 1 |
| `//` | 整除 | `7//3` = 2 |
| `==` / `!=` | 等于 / 不等于 | — |
| `and` / `or` / `not` | 逻辑运算 | — |

---

## 数据结构

### 字符串

```python
s = 'hello world'

# 格式化方式一：% 格式符（旧写法）
'我叫 %s，今年 %d 岁' % ('小明', 10)       # '我叫 小明，今年 10 岁'
# %s 字符串  %d 整数  %f 浮点数  %.2f 保留2位小数

# 格式化方式二：format()
'我叫{}，今年{}岁'.format('小明', 10)
'我叫{name}，今年{age}岁'.format(name='小明', age=10)
'圆周率={0:.3f}'.format(3.14159)          # '圆周率=3.142'
'{name:10} ===> {age:10}'.format(name='小明', age=10)  # 指定最小宽度为10

# 格式化方式三：f-string（推荐，Python 3.6+）
name = 'Alice'
age = 25
f'Hello, {name}! 年龄 {age}'             # 'Hello, Alice! 年龄 25'
f'圆周率 = {3.14159:.2f}'                # '圆周率 = 3.14'

# 多行字符串（三引号）
text = """第一行
第二行
第三行"""

# 常用操作
s.upper()                               # 'HELLO WORLD'
s.lower()                               # 'hello world'
s.strip()                               # 去除两端空白
s.lstrip() / s.rstrip()                 # 去左侧 / 右侧空白
s.split(' ')                            # ['hello', 'world']
s.replace('hello', 'hi')               # 'hi world'
s.find('world')                         # 6（找不到返回 -1）
s.startswith('hello')                   # True
s.endswith('world')                     # True
','.join(['a', 'b', 'c'])              # 'a,b,c'
len(s)                                  # 11
s.isalpha()                             # 是否全为字母或中文
s.isdigit()                             # 是否全为数字
s.isnumeric()                           # 是否全为数字（含中文数字）
s.rjust(10)                             # 右对齐，左侧填充空格至总宽度10

# 切片
s[0]                                    # 'h'
s[0:5]                                  # 'hello'
s[-1]                                   # 'd'
s[6:]                                   # 'world'
s[::-1]                                 # 反转字符串
```

### 列表（list）

```python
lst = ['a', 'b', 'c']

# 定义
lst = []                                # 空列表
lst = [x**2 for x in range(5)]         # 列表推导式：[0,1,4,9,16]
lst = [x for x in range(10) if x % 2 == 0]  # 带过滤的推导式

# 增
lst.append('d')                         # 末尾添加
lst.insert(1, 'x')                      # 指定位置插入
lst.extend(['e', 'f'])                  # 合并另一个列表

# 删
lst.pop()                               # 删除并返回最后一个元素
lst.pop(1)                              # 删除并返回第 2 个元素
lst.remove('b')                         # 删除第一个值为 'b' 的元素
del lst[0]                              # 删除第 1 个元素
del lst[:2]                             # 删除前 2 个元素

# 改
lst[0] = 'z'

# 查
lst[0]                                  # 第 1 个元素
lst[-1]                                 # 最后一个
lst[1:3]                                # 切片：第 2~3 个
'b' in lst                              # 是否存在
lst.index('b')                          # 元素所在下标

# 排序
lst.sort()                              # 升序（原地修改）
lst.sort(reverse=True)                  # 降序
lst.sort(key=len)                       # 按长度排序
sorted(lst)                             # 返回新排序列表（不修改原列表）
```

### 元组（tuple）

```python
# 元组是不可变的列表，常用于函数多返回值、固定数据
t = (1, 'hello', True)
t = tuple([1, 2, 3])                    # 列表转元组

# 解包
a, b, c = t
a, *rest = t                            # rest = ['hello', True]

# 函数返回多个值（本质是元组）
def get_range():
    return 0, 100

low, high = get_range()
```

### 字典（dict）

```python
d = {'name': 'Alice', 'age': 25}

# 增 / 改
d['city'] = 'Beijing'
d.update({'age': 26, 'gender': 'female'})

# 删
del d['city']
d.pop('age')                            # 删除并返回值

# 查
d['name']                               # 直接取，键不存在会报错
d.get('name')                           # 安全取，键不存在返回 None
d.get('x', 'default')                  # 键不存在返回默认值

# 遍历
d.keys()                                # 所有键
d.values()                              # 所有值
d.items()                               # 所有键值对
for k, v in d.items():
    print(k, v)

# 字典推导式
squares = {x: x**2 for x in range(5)}  # {0:0, 1:1, 2:4, 3:9, 4:16}

# 判断键是否存在
'name' in d                             # True
```

### 集合（set）

```python
s = {'python', 'java', 'go'}
s = set(['a', 'b', 'c'])               # 列表转集合（自动去重）

s.add('rust')
s.remove('java')
s.discard('java')                       # 删除，不存在不报错

# 集合运算
a = {1, 2, 3}
b = {2, 3, 4}
a & b                                   # 交集：{2, 3}
a | b                                   # 并集：{1, 2, 3, 4}
a - b                                   # 差集：{1}
a ^ b                                   # 对称差集：{1, 4}
```

---

## 函数

```python
# 基础定义
def greet(name):
    """函数说明文档（docstring）"""
    return f'Hello, {name}!'

# 默认参数（有默认值则非必填）
def connect(host, port=3306, timeout=30):
    pass

# 关键字传参
connect(host='localhost', timeout=10)

# 不定长参数
def func(*args, **kwargs):
    print(args)    # 元组：(1, 2, 3)
    print(kwargs)  # 字典：{'a': 1, 'b': 2}

func(1, 2, 3, a=1, b=2)

# 类型注解（Python 3.5+，推荐加上，提升可读性）
def add(x: int, y: int) -> int:
    return x + y

# 匿名函数（lambda）
square = lambda x: x ** 2
square(5)                               # 25

# 常用内置函数
sorted([3,1,2], key=lambda x: -x)      # [3, 2, 1]
list(map(lambda x: x*2, [1,2,3]))      # [2, 4, 6]
list(filter(lambda x: x>1, [1,2,3]))   # [2, 3]
sum([1, 2, 3])                          # 6
max([1, 2, 3])                          # 3
min([1, 2, 3])                          # 1
len([1, 2, 3])                          # 3
```

---

## 类（面向对象）

```python
class Animal:
    # 类变量（所有实例共享）
    species = 'Unknown'

    # 构造方法
    def __init__(self, name: str, age: int):
        self.name = name       # 实例变量（公有）
        self.__age = age       # 私有变量（双下划线）

    # 实例方法
    def speak(self) -> str:
        return f'{self.name} makes a sound'

    # 私有方法
    def __secret(self):
        pass

    # 类方法
    @classmethod
    def create(cls, name):
        return cls(name, 0)

    # 静态方法
    @staticmethod
    def is_animal(obj):
        return isinstance(obj, Animal)

    # 魔法方法（__repr__ 相当于 toString）
    def __repr__(self):
        return f'Animal(name={self.name})'


# 继承
class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)     # 调用父类构造
        self.breed = breed

    def speak(self) -> str:             # 重写父类方法
        return f'{self.name} says Woof!'


# 多重继承
class C(A, B):
    pass

# 实例化与使用
dog = Dog('Rex', 3, 'Husky')
print(dog.speak())                      # Rex says Woof!
print(isinstance(dog, Animal))          # True
```

**常用魔法方法：**

| 方法 | 作用 |
|---|---|
| `__init__` | 构造方法 |
| `__repr__` | 对象字符串表示（类似 toString）|
| `__str__` | `print()` 时调用 |
| `__len__` | `len()` 时调用 |
| `__eq__` | `==` 比较 |
| `__lt__` | `<` 比较 |
| `__add__` | `+` 运算符重载 |
| `__enter__` / `__exit__` | `with` 语句支持 |

---

## 控制流

### 条件语句

```python
x = 42

if x > 100:
    print('big')
elif x > 10:
    print('medium')
else:
    print('small')

# 三元表达式
result = 'big' if x > 100 else 'small'

# match-case（Python 3.10+，类似 switch）
match x:
    case 0:
        print('zero')
    case 1 | 2:
        print('one or two')
    case _:
        print('other')
```

### 循环语句

```python
# for 循环
for i in range(5):                      # 0,1,2,3,4
    print(i)

for i in range(2, 10, 2):              # 2,4,6,8
    print(i)

# 遍历列表（带下标）
for i, val in enumerate(['a', 'b', 'c']):
    print(i, val)                       # 0 a, 1 b, 2 c

# 同时遍历两个列表
for q, a in zip(['name?', 'age?'], ['Alice', 25]):
    print(q, a)

# 遍历字典
for key, value in {'a': 1, 'b': 2}.items():
    print(key, value)

# while 循环
count = 0
while count < 5:
    count += 1

# break / continue / else
for i in range(10):
    if i == 3:
        continue                        # 跳过本次
    if i == 7:
        break                           # 退出循环
else:
    print('loop finished normally')     # break 触发时不执行
```

---

## 异常处理

```python
try:
    result = 1 / 0
except ZeroDivisionError as e:
    print(f'除以零：{e}')
except (TypeError, ValueError) as e:   # 捕获多种异常
    print(f'类型/值错误：{e}')
except Exception as e:                  # 捕获所有异常
    raise                               # 原样重新抛出
else:
    print('没有发生异常时执行')
finally:
    print('无论如何都会执行（常用于释放资源）')

# 主动抛出异常
raise ValueError('参数不合法')

# 自定义异常
class MyError(Exception):
    def __init__(self, msg, code=None):
        super().__init__(msg)
        self.code = code

raise MyError('出错了', code=400)
```

**常见内置异常：**

| 异常 | 触发场景 |
|---|---|
| `ZeroDivisionError` | 除以零 |
| `NameError` | 使用未定义的变量 |
| `TypeError` | 类型不匹配（如 `'a' + 1`）|
| `ValueError` | 值不合法（如 `int('abc')`）|
| `KeyError` | 字典中键不存在 |
| `IndexError` | 列表下标越界 |
| `AttributeError` | 对象没有该属性/方法 |
| `FileNotFoundError` | 文件不存在 |
| `ImportError` | 模块导入失败 |

---

## 文件操作

```python
# 写文件
with open('output.txt', 'w', encoding='utf-8') as f:
    f.write('Hello World\n')
    f.writelines(['line1\n', 'line2\n'])

# 读文件
with open('input.txt', 'r', encoding='utf-8') as f:
    content = f.read()                  # 读全部内容（字符串）
    lines = f.readlines()               # 读全部行（列表）
    line = f.readline()                 # 读一行

# 逐行遍历（内存友好，适合大文件）
with open('input.txt', 'r', encoding='utf-8') as f:
    for line in f:
        print(line.strip())

# 追加模式
with open('log.txt', 'a', encoding='utf-8') as f:
    f.write('new line\n')
```

**文件打开模式：**

| 模式 | 说明 |
|---|---|
| `r` | 只读（文件不存在则报错）|
| `w` | 只写（文件不存在则新建，会覆盖原内容）|
| `a` | 追加（文件不存在则新建）|
| `r+` | 读写 |
| `rb` / `wb` | 二进制读/写（处理图片、PDF 等）|

---

## 模块与包

```python
# 导入整个模块
import os
os.getcwd()

# 导入指定内容
from datetime import datetime, timedelta

# 导入并起别名
import numpy as np
import pandas as pd

# 导入包中的模块
from package1.utils import helper

# __name__ 属性：判断是直接运行还是被导入
if __name__ == '__main__':
    print('直接运行此脚本')
```

---

## 常用标准库速查

### os / pathlib：文件系统操作

```python
import os
from pathlib import Path

os.getcwd()                             # 当前目录
os.listdir('.')                         # 列出目录内容
os.makedirs('a/b/c', exist_ok=True)    # 递归创建目录
os.remove('file.txt')                  # 删除文件
os.rename('old.txt', 'new.txt')        # 重命名

# pathlib（推荐，面向对象风格）
p = Path('data/input.txt')
p.exists()                              # 是否存在
p.parent                                # data/
p.name                                  # input.txt
p.stem                                  # input
p.suffix                                # .txt
p.read_text(encoding='utf-8')          # 读文件内容
p.write_text('hello', encoding='utf-8')
list(Path('.').glob('**/*.py'))         # 递归匹配所有 .py 文件
```

### json：JSON 处理

```python
import json

# 对象 → JSON 字符串
data = {'name': 'Alice', 'age': 25}
json_str = json.dumps(data, ensure_ascii=False, indent=2)

# JSON 字符串 → 对象
obj = json.loads(json_str)

# 写入 JSON 文件
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# 读取 JSON 文件
with open('data.json', 'r', encoding='utf-8') as f:
    obj = json.load(f)
```

### datetime：日期时间

```python
from datetime import datetime, date, timedelta

now = datetime.now()                    # 当前日期时间
today = date.today()                    # 今天日期

# 格式化
now.strftime('%Y-%m-%d %H:%M:%S')      # '2025-03-11 14:30:00'

# 解析
dt = datetime.strptime('2025-03-11', '%Y-%m-%d')

# 日期运算
yesterday = today - timedelta(days=1)
next_week = now + timedelta(weeks=1)

# 属性
now.year, now.month, now.day
now.hour, now.minute, now.second
```

### collections：高级数据结构

```python
from collections import Counter, defaultdict, deque, OrderedDict

# Counter：计数器
c = Counter(['a', 'b', 'a', 'c', 'a'])
c.most_common(2)                        # [('a', 3), ('b', 1)]

# defaultdict：有默认值的字典
d = defaultdict(list)
d['key'].append(1)                      # 不存在的键自动初始化为 []

# deque：双端队列（比 list 在首尾操作更高效）
dq = deque([1, 2, 3])
dq.appendleft(0)                        # 头部添加
dq.popleft()                            # 头部删除

# namedtuple：具名元组
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(1, 2)
p.x, p.y                                # 1, 2
```

### typing：类型注解（Python 3.5+）

```python
from typing import List, Dict, Optional, Union, Tuple, Any

def process(items: List[str]) -> Dict[str, int]:
    return {item: len(item) for item in items}

def greet(name: Optional[str] = None) -> str:
    return f'Hello, {name or "World"}!'

# Python 3.10+ 可以用内置类型直接注解
def func(items: list[str]) -> dict[str, int]:
    pass

# Union（接受多种类型）
def parse(val: Union[int, str]) -> str:
    return str(val)
```

---

## 高级特性

### 推导式

```python
# 列表推导式：[表达式 for 变量 in 可迭代对象 if 条件]
squares = [x**2 for x in range(10)]                        # [0,1,4,9,16,25,36,49,64,81]
evens = [x for x in range(20) if x % 2 == 0]              # [0,2,4,...,18]

names = ['Amy', 'Bob', 'Alice']
upper_names = [name.upper() for name in names]             # ['AMY','BOB','ALICE']
long_names = [name.upper() for name in names if len(name) > 3]  # ['ALICE']

# 字典推导式：{key表达式: value表达式 for 变量 in 可迭代对象}
d = {k: v for k, v in zip('abc', [1, 2, 3])}              # {'a':1,'b':2,'c':3}
name_len = {name: len(name) for name in names}             # {'Amy':3,'Bob':3,'Alice':5}
name_len_filtered = {name: len(name) for name in names if len(name) > 3}  # {'Alice':5}

# 集合推导式：{表达式 for 变量 in 可迭代对象}（自动去重）
s = {x % 3 for x in range(10)}                            # {0, 1, 2}
name_set = {name for name in names}                        # {'Amy','Bob','Alice'}

# 生成器表达式（惰性求值，节省内存，括号而非方括号）
gen = (x**2 for x in range(1000000))
next(gen)                                                   # 只计算一个：0
sum(x**2 for x in range(100))                              # 直接传入函数，不需要外层括号
```

### 装饰器

```python
import functools
import time

# 定义装饰器
def timer(func):
    @functools.wraps(func)              # 保留原函数的 __name__ 等属性
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f'{func.__name__} 耗时 {time.time() - start:.3f}s')
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)

# 带参数的装饰器
def retry(times=3):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for i in range(times):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if i == times - 1:
                        raise
        return wrapper
    return decorator

@retry(times=5)
def unstable_request():
    pass
```

### 上下文管理器（with）

```python
# 自定义上下文管理器
class DatabaseConnection:
    def __enter__(self):
        print('连接数据库')
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print('关闭连接')
        return False                    # False 表示不抑制异常

with DatabaseConnection() as db:
    print('执行操作')

# 用 contextlib 更简洁
from contextlib import contextmanager

@contextmanager
def managed_resource():
    print('获取资源')
    try:
        yield
    finally:
        print('释放资源')
```

### 生成器（generator）

```python
# yield 函数
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

gen = fibonacci()
[next(gen) for _ in range(8)]           # [0, 1, 1, 2, 3, 5, 8, 13]

# 分批读取大文件（生成器的典型用途）
def read_chunks(filepath, chunk_size=1024):
    with open(filepath, 'r') as f:
        while chunk := f.read(chunk_size):
            yield chunk
```

### 异步编程（asyncio）

```python
import asyncio

async def fetch_data(url: str) -> str:
    await asyncio.sleep(1)              # 模拟 I/O 等待
    return f'data from {url}'

async def main():
    # 并发执行多个协程
    results = await asyncio.gather(
        fetch_data('url1'),
        fetch_data('url2'),
        fetch_data('url3'),
    )
    print(results)

asyncio.run(main())
```

---

## FAQ

**Q：解包是什么？**

```python
a, b, c = [1, 2, 3]          # 列表解包
a, *rest = [1, 2, 3, 4]      # rest = [2, 3, 4]
first, *_, last = [1,2,3,4]  # first=1, last=4

def func(a, b):
    return a + b

args = [1, 2]
func(*args)                    # 等价于 func(1, 2)

kwargs = {'a': 1, 'b': 2}
func(**kwargs)                 # 等价于 func(a=1, b=2)
```

**Q：`__init__.py` 有什么用？**

标记一个目录为 Python 包，使其可以被 `import`。Python 3.3+ 支持命名空间包（无需 `__init__.py`），但显式添加仍是最佳实践。
