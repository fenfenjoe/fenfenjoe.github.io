# pydemo


1. 【基础用法】

```python
"""注释：这是一个简单的模块：demo1.py"""

"""导入math模块"""
import math

"""一个文件内，可以定义多个类"""
class Dog:
    def bark(self):
        return "Woof!"

class Cat:
    def meow(self):
        return "Meow!"

"""定义一个方法"""
def greet(name):
    return f"Hello, {name}!"

"""导入时这里的方法便会直接执行"""
print(math.sqrt(16))

"""执行脚本（python demo1.py）时才执行下面的代码"""
if __name__ == "__main__":
    print("This script is executed directly")
    greet()


```

2. 【模块、类、方法引用】
```python
# 引入模块：demo1
import demo1
my_dog = demo1.Dog()
print(my_dog.bark())  

# 引入类：demo1中的Dog类和greet函数
from demo1 import Dog,greet
my_dog1 = Dog()
print(my_dog1.bark())  
print(greet('Alice'))

# 引入某个包的模块
from package1.demo2 import module2

```

> math模块在哪个包里，为什么能直接引用？

math是python标准库的一个内置模块。对于内置模块，Python 解释器会在一个名为 ```sys.path``` 的路径列表中按顺序搜索。

```sys.path``` 通常包含：

- 当前脚本所在目录

- PYTHONPATH 环境变量中的路径

- 标准库路径（例如 /usr/lib/python3.x/）

- 第三方包安装路径（如 site-packages）



3. 【类定义和实例化】

```python
# 定义
class Cat:
  class_var = 42          # 类属性（类似静态变量）
    
  def __init__(self, value):
    self.instance_var = value   # 实例属性
```