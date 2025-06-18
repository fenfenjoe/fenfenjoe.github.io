---
title: 菜鸟教程-python3
sidebar: 'heading'
sidebarDepth: 1
---


# 菜鸟教程-python3

## 推导式
```python
#%% 推导式（类似于Java8 的Stream API，可对集合进行转换、排序、过滤等处理）

'''
列表（List）推导式（返回一个新的List）
'''
names =['Amy','Bob','Alice']
#推导式1：将List所有元素变成大写
new_names = [name.upper() for name in names] 
print(new_names) #['AMY','BOB','ALICE']

#推导式2：将List所有元素变成大写，并过滤出长度大于3的元素
new_names = [name.upper() for name in names if len(name)>3]
print(new_names) #['ALICE']



'''
字典（Map）推导式（返回一个新的Map）
'''
names =['Amy','Bob','Alice']
#推导式1：以List中的值为key，值的长度为value，构造一个新的Map
new_names = {name:len(name) for name in names}
print(new_names) #{'Amy':3,'Bob':3,'Alice':5}

#推导式1：以List中的值为key，值的长度为value，构造一个新的Map
new_names = {name:len(name) for name in names if len(name)>3}
print(new_names) #{'Alice':5}


'''
集合（Set）推导式（返回一个新的Set）
'''
names =['Amy','Bob','Alice']
#推导式1
new_names = {name for name in names}
print(new_names) #{'Amy','Bob','Alice'}


'''
元组（只读列表，Tuple）推导式（返回一个新的Tuple）
'''
names =['Amy','Bob','Alice']
#推导式1
new_names = (name for name in names)
print(new_names) #('Amy','Bob','Alice')
```





## 格式化字符串
```python
#%% 字符串

#格式化字符串
print('我叫 %s，今年 %s 岁' % ('小明',10))  #输出“我叫小明，今年10岁
'''
%s 格式化字符串
%d 格式化整数
%f 格式化浮点数（可指定小数点后精度，如%2f、%3f）
...
'''

print('我叫{}'.format('小明'))
print('我叫{name}，今年{age}岁'.format(name='小明',age=10))
print('我叫{0}，今年{1}岁'.format('小明',10))
print('圆周率={0:.3f}'.format(math.pi)) #浮点数取3位小数
print('{name:10} ===> {age:10}'.format(name='小明',age=10)) #后面的:10保证至少有10的宽度



#多行字符串（三个双引号）
str = """这是一个多行字符串实例
哈哈哈
怎么样
"""

#f-string（新的格式化字符串）
my_name = 'john'
my_map = {'age':10,'parent':'Smith'}
print(f'my name is {my_name}')
print(f'I am {my_map["age"]} years old.My parent is {my_map["parent"]}')

> https://docs.python.org/zh-cn/3.12/tutorial/inputoutput.html
```

## 字符串常用函数
```
#字符串常用函数
len(x) #返回字符串x的长度
x.find(y) #检查子字符串y是否在x中，若存在则返回索引值，不存在返回-1
isalpha(x) #检查是否都是字母或中文，是则返回true
isdigit(x)、isnumeric(x) #检查是否都是数字，是则返回true
'abc'.format() # 格式化输出（重要）
'abc'.rjust() # 在左侧填充空格，对给定宽度字段中的字符串进行右对齐
```



## 函数定义
```python
#%% 函数
#定义函数（无返回值）
def test1(arg1): 
	print(arg1)
    
#定义函数（有返回值）
def test2(arg1): 
	print(arg1)
    return arg1
test2(arg1=1) #通过关键字指定入参，打印1

#定义函数（入参有默认值）
def test3(arg1=0): 
	print(arg1)
test3() # 0

#定义函数（arg2为不定长参数，实质是传入一个元组）
def test4(arg1,*arg2): 
	print(arg1)
    print(arg2)
test4(10,20,30,40) #arg1=10,arg2=(20,30,40)


#定义函数（arg2为不定长参数，实质是传入一个字典）
def test5(arg1,**arg2):
    print(arg1)
    print(arg2)
test5(10,{'a':20,'b':30}) #10 {'a':20,'b':30}

#定义函数（通过lambda表达式定义匿名函数）
x = lambda a : a+10 #其中，a为入参，a+10为函数体
print(x(5)) #15

x = lambda a,b : a+b #其中，a,b为入参，a+b为函数体
print(x(1,2)) #3
```







