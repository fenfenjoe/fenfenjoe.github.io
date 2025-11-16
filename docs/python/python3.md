---
title: Python3
sidebar: 'heading'
sidebarDepth: 2
---


# Python3

## 参考资料

官方文档:[https://docs.python.org/zh-cn/3/index.html](https://docs.python.org/zh-cn/3/index.html)
python内置函数：[https://docs.python.org/zh-cn/3/library/functions.html](https://docs.python.org/zh-cn/3/library/functions.html)



## 运算符

| 符号 | 作用 |
|---|---|
|```**```| 乘方|
|```%```|求余|
|```//```|除法（取整数）|


## 数据结构


### 列表（等于 数组）
```python

mylist = [] #定义
mylist = list() #定义
mylist = ['a','b'] #定义
mylist = [x**2 for x in range(10)] #定义（通过列表推导式）
mylist = [x for x in vec if x>0]
mylist = list({'name':'John','age':24}) #将字典的key转为list
mylist = list(dictA.keys()) #同上
mylist = list(dictA.values()) #将字典的value转为list
mylist = list(dictA.items()) #将字典的(key,value)转为list
mylist = list(setA) #将集合转为list
 #列表切片
mylist[1:3] #第1到第3个元素
mylist[1:] #第1到最后一个元素
mylist[-1] #最后一个元素
#添加
mylist.append('c')
mylist.insert(1,'d')
#删除
mylist.pop(1) #删除第2个元素
mylist.remove('abc') #删除值为abc的元素，若有多个也只删除一个
del mylist[0] #删除第1个元素
del mylist[:2] #删除前2个元素
del mylist #删除列表
#改
mylist[0] = 10
#排序
mylist.sort() #升序排序
mylist.sort(reverse=True) #降序排序
mylist.sort(key=len) #按长度，升序排序
#获取对象所在下标
mylist.index(obj)
#是否存在
10 in mylist
```



### 元组（等于 只可读的列表）
```python

digit = (0, 1, 'two') #定义
tuple([0, 1, 'two']) #列表转元组


```

### 字典（等于 Map） 
```python

empty_dict = {} #空字典
empty_dict = {'dad':'homer', 'mom':'marge'} #定义
empty_dict = dict('dad':'homer', 'mom':'marge') #定义

'mom' in family #是否有该键

empty_dict.keys() #返回所有键的列表
empty_dict.values() #返回所有值的列表
empty_dict.items() #返回键值对的列表，键值对由元组组成

for k,v in empty_dict.items()
    print(k,v) #字典循环：取出键和值
    
empty_dict['dad'] #获取字典中键为dad的值

#增
myMap['name'] = 'Alice'              # {'name': 'Alice'}
myMap['age'] = 25                    # {'name': 'Alice', 'age': 25}
myMap['city'] = 'Beijing'            # {'name': 'Alice', 'age': 25, 'city': 'Beijing'}
myMap.update({'country': 'China', 'gender': 'female'})  # 批量添加

# 删 - 删除键值对
del myMap['city']                    # 删除指定键

# 改 - 修改值
myMap['age'] = 26                    # 修改年龄
myMap['name'] = 'Bob'                # 修改名字
myMap.update({'age': 27, 'name': 'Charlie'})  # 批量修改


```


### 集合（等于 Set）
```python

empty_set = set()  #定义
myset ={'python', 'r', 'java'} #定义
set(['cobra', 'viper', 'python'])#列表转集合
 #集合运算
add() #增
remove() #删
setA & setB #交集
setA | setB #并集 
setA-setB #差集
setA.intersection(setB) #交集
setA.union(setB) #并集
setA.difference(setB) #差集
```

### 函数
```python

# 定义函数
def myfunc(context) : 
    """myfunc will print an number.""" # 函数说明文档
    a='1'  #缩进4格
    return a #可返回两个值；以元组返回两个值
# 定义函数2
def myfunc2(a,b=2,c='haha') #入参带默认值，没有默认值则为必填入参，有默认入参则非必填
    return 
# 调用函数
myfunc2(a=10) 
# 调用函数2
myfunc2(10,3,'haha')
# 定义函数3
def myfunc3(age:'年龄',name:'名称'='Joe')->'没有返回参数' #为入参、出参添加注解
    pass
```

### 字符串
```
str = 'hello'
 #格式化
'raining %s and %s' % ('cats', 'dogs')
'raining {} and {}'.format('cats', 'dogs')
 #查找下标
str.find('abc')
 #取子字符串
str[0] #第一个字符
str[0:3] #取第1~4个字符串
str[-1] #取最后1个字符串
str * 2 #取str并重复1次
str[2:] #取第3个以后所有字符

print('Hello'+'Joe') #用+号拼接（适合都是字符串的情况）
print('Hello',23) #用逗号拼接（适合并非都是字符串的情况）

```

### 作用域
```python

#作用域由外到内分为以下几层
##    第一层：内置名称集合（abs()、length()等）
###   第二层：模块变量
####  第三层：函数变量
```


### 类
```python

# 例子1
# 定义类START
class MyClass:
  age = 1   # 定义类变量
  __name = 'haha' # 定义私有类变量（加双下划线）


  # 初始化函数
  def __init__(self,age):
    self.age = age   

  # 实例函数
  def myFunc():
    pass

  # 私有方法
  def __myFunc():
    pass

# 定义类END

# 例子2（继承类）
# 定义类START
class MyClass(SuperClass):
# 定义类END


# 例子3（多重继承）
class MyClass(SuperClass1,SuperClass2):

# 实例化对象
myclass = Myclass(5)


#调用父类的方法（不怕被重写）
sub = SubTest()
sub.test(10,20)
super(SubTest,sub).test(10,20) #输出ccc


#类的其他私有方法：
__del__ #析构函数？
__repr__  #toString
__setitem__ #setter方法
__getitem__ #getter方法
__len__ #返回长度
__add__ #重载 加法运算
__sub__ #重载 减法运算
```

### 可迭代对象（iterator）
```python

# 实现了 __iter__或__getItem__方法，以及 __next__方法的，就是可迭代对象
# 常见可迭代对象有：
#1. list （列表）
#2. tuple （元组）
#3. dict （字典）
#4. set （集合）
#5. str （字符串）
#6. range （范围）
#7. bytes （字节）
#8. bytearray （字节数组）
#9. memoryview （内存视图）
#10. generator （生成器）

## 获取迭代器
iterA = range(5)  # 0,1,2,3,4

listB = ['a','b','c']
iterB = iter(listB) # 获取列表的迭代对象

dictC = {'name':'John','age':24}  
iterC = iter(dictC)

## 使用迭代器
# range
for i in range(5):
  print(i)

# list
for i in listB:
  print(i)

# dict
for key,value in dictC.items():
  print(f"{key}:{value}")

# 字符串
for i in 'hello world':
  print(i)
```



## 库(模块)

###	下载新的python库
1. 在 <https://pypi.org/project/> 找需要的库及版本  
2. 放到python的Scripts目录中  
3. 进入cmd，到python/Scripts目录下，执行 pip install [python库文件名]  

###	常用库

* math：提供数学相关的函数
* pd（Pandas）：数据分析库
* np(numpy)：多维数组
* matplotlib：二维绘图
* scipy：
* sidekick：机器学习
* vn.py
* PyCTP
* QuickLib
* Zipline
* pyecharts：绘图



```python
#查看python所有库
pip list
```

### 导入库

```python
# 示例1：导入os类
import os 
os.getcwd()

# 示例2：从datetime模块导入time类
from datetime import time

# 示例3：导入datetime模块的所有类
from datetime import *
```


### os模块：操作系统
```python
List os.listdir(path) #【指定的文件夹包含的文件或文件夹的名字的列表】
os.rename(src, dst) #【重命名文件或目录】
os.rmdir(path) 
os.removedirs(path)
os.remove(path)
```

### re模块：正则表达式
```python 
	import re
	re.findAll(r'[0-9]*','dyz 01235 0') #返回['01235','0']
```


### operator模块：运算函数
```python
#%% operator模块：运算函数，加减乘除、大于小于等于
import operator

dir(operator) #查看operator模块的所有函数

operator.lt(x,y) #小于（lower than） 
operator.gt(x,y) #大于（greater than）
operator.eq(x,y) #等于（equals）
operator.ne(x,y) #不等于（not equals）
operator.le(x,y) #小于等于
operator.ge(x,y) #大于等于

#加减乘除等略

```

### math模块：数学相关函数
```python
#%% math模块：正弦余弦
import math

dir(math) #查看math模块的所有函数

#数学常量
math.e #欧拉数(2.7182...)
math.pi #圆周率PI = 3.1415926...
math.tau #数学常量τ = 6.283185...
#...

#常用函数
math.cos(x)
math.sin(x)
math.tan(x)

math.ceil(x) #对x四舍五入，往上进1。如math.ceil(1.1)=2
math.floor(x) #对x四舍五入，向下取整。如math.ceil(1.1)=1

math.fabs(x) #取x的绝对值
math.gcd(x) #最大公约数
math.sqrt(x) #平方根
math.fmod(x,y) #求x/y的余数

```


### sys模块：系统函数
```python
#%% 模块
import sys #导入sys模块，并通过sys调用其函数
sys.argv

from sys import argv #导入sys中的某个函数，并直接使用
argv

#__name__ 属性
#每个模块都有__name__属性
#当__name__=='__main__'时，表明当前模块是自身在运行
#当__name__!='__main__'时，表明当前模块是被引用了

dir(sys) #查看sys模块中所有定义的名称（返回一个List）
dir() #返回当前模块中所有定义的名称


```



### pickle模块：序列化
```python
#%% pickle模块:序列化
#序列化：python中的对象 => 可存储的数据 => 文件
#反序列化：文件 => 可存储的数据 => python中的对象

import pickle

#序列化
my_map = {'a':123 ,'b':'hahahaha'}
f = open('/test.txt','wb')
pickle.dump(my_map,f)
f.close()

#反序列化
f = open('/test.txt','rb')
my_map = pickle.load(f)
print(my_map)
f.close()
```

### datetime模块：日期函数

```python 
import datetime

# 创建日期
now = datetime.date.today() #返回一个date对象，表示今天（不会具体到时分秒）
now = datetime.date.fromtimestamp(timestamp) #返回时间戳对应的date对象
now = date(2025,3,11) #生成2025-03-11
nowtime = datetime(2025,3,11) #生成2025-03-11

# 取出年、月、日
now.year 
now.month
now.day 
nowtime.year、month、day、hour、minute、second、microsecond、tzinfo #年、月、日、时、分、秒、毫秒、时区
nowtime.date() #datetime转换为date
nowtime.time() #datetime转换为time

# 日期 与 字符串 格式转换
date_str = "2025-03-11"
parsed_date = datetime.strptime(date_str, "%Y-%m-%d")
formatted_date = parsed_date.strftime("%Y-%m-%d")  # 输出：'2025-03-11'
datestr = now.isoformat() #返回格式如'YYYY-MM-DD’的字符串；

#日期计算
yesterday = datetime.date.today() - datetime.timedelta(days=1)  
lastyear = datetime.date.today() - datetime.timedelta(days=365)  
yesterday = datetime.date.today() - timedelta(days=1)

#日期比较
if yesterday < today:
  print(1)
if yesterday.timestamp() < now.timestamp():
  print(1)




```

### random模块：生成随机数
```python 
import random
nums = random.sample(range(0,100),10) #从0~100中生成10个随机数
num = random.random() #从0~1中生成1个随机数
```




## 语法

### 循环语句
```python
#for循环遍历
fruits = ['gallahad': 'the pure', 'robin': 'the brave']
for fruit in fruits: #for列表循环

family = {'gallahad': 'the pure', 'robin': 'the brave'}
for i, v in enumerate(['tic', 'tac', 'toe']): #for列表循环：返回下标
    print(i, v)
for q, a in zip(questions, answers): #for列表循环：同时遍历两个列表questions和answers
    print('What is your {0}?  It is {1}.'.format(q, a)) 

for key, value in family.items(): #for字典循环
for i in range(5) #数字循环（0,1,2,3,4）
for i in range(5,9) #数字循环，指定从5开始（5,6,7,8）
for i in range(5,9,2) #数字循环，指定从5开始，指定步长为2（5,7）


#while循环遍历
while count < 5: #while循环
```

### 条件语句
```python
#if 条件语句
if a==0:
	print(0)
elif a==1:
    print(1)
else :
    pass #若不需要操作，则使用pass关键字，不能空着

# 示例2
if a > 10 and a < 30:
  print('It is between 10 and 30!')
elif a<20:
  print('It is less than 20')
else:
  print('I do not know!') 
  
#switch 条件语句
status = 'haha'
match status:
  case '123':
    return 'small';
  case '456':
    return 'big';
  case _:
    return 'default';
```

### 异常处理

有哪些系统自带的异常？
- ZeroDivisionError 0作为了除数
- NameError 未定义的属性
- TypeError 类型不一致（比如'2'+2）

```python
#try except异常处理
try:
  x = 1/0
except ZeroDivisionError as zdError:
  pass
finally:  #无论有无异常，都会执行else里面的代码

#例子2
try:
    x = '2'+2
    y = 1/0
except TypeError as typerr: #针对TypeError
    pass
except NameError:
    raise Exception('我是别的异常') #抛出自定义的异常
except: #针对其他异常
    raise #不处理，抛出给上层
else:  #没有抛错误则执行
    print('没有异常')
finally: #抛不抛错误都会执行
    print('无论如何都会执行')

##多个异常
except (ZeroDivisionError,NameError):
  pass

##手工抛出异常
raise Exception

## 手工抛出异常（带参数）
raise Exception('test',123)

```

### 文件操作
```python
#%% 文件操作
#打开文件
f = open(filename,mode) 
f = open('/tmp/foo1.txt','w')
# mode: 
# r(只读) rb(二进制格式只读) r+(读写) rb+   注意：若文件不存在，r不会创建文件
# w(只写) wb w+ wb+                      注意：文件不存在会新增；会覆盖原有文件
# a(追加) ab a+ ab+                      注意：文件不存在会新增；在原有内容后追加

#关闭文件
f.close()

#写入内容
f.write('哈哈哈')

#读取所有内容
str = f.read()

#读取一行内容
str = f.readline()

#读取所有行内容（返回List<String>）
strs = f.readlines()

#with：预定义的清理行为，会自动关闭文件
with open('file.txt') as f:
    for line in f:
        print(line,end="")
        
```

### 包
```python
#%% 包
# 包是模块的集合，相当于是一个命名空间，可避免模块重名
# 包与模块的结构如下：
# /api   #包名
#   /__init__.py  #每个包必须要有的初始化脚本
#   /test1.py  #test1模块
#   /sub-api   #子包
#     /__init__.py 
#     /test1.py  #子包里的test1模块
#	  /test2.py 

#导入包中的模块
import api.test1,api.sub-api.test2
```

### pass语句
```python
#%% pass语句
#pass不作任何操作，只用于占位。如空类、空循环。
while true:
    pass

class Test:
    pass


```


### 其他
```python
x,y=0,1
match (x,y):
  


#换行：需要加"\"
total = item_one + \
item_two + \
item_three
#等待用户输入
input("按下 enter 键后退出。")
#函数
len() #列表or元组 元素个数
#匿名函数
sum = lambda arg1, arg2: arg1 + arg2
#调用： sum(5,10) #输出15

#### 模块

#导入整个模块
import somemodule
firstfunc() #调用函数

#导入某些函数
from somemodule import firstfunc, secondfunc, thirdfunc
firstfunc() #调用函数
```

### 内置函数

```python
#input:获取用户命令行输入
s = input('input:')

```


## FAQ

- 解包、打包是什么
- 推导式是什么（列表推导式、集合推导式...）