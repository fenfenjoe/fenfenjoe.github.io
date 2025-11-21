---
title: pandas
sidebar: 'heading'
sidebarDepth: 1
---


# Pandas

## 参考资料

【API文档】<https://pandas.pydata.org/docs/index.html>  


## 【DataFrame】创建
```python
#创建一个索引为日期、有ABCD4行且已有数据的DataFrame
data = np.random.randn(6,4)
df = pd.DataFrame(data,index=pd.date_range('20130101',periods=6),columns=['A','B','C','D'])

###data可以是：
data = np.random.randn(6,4) #ndarray
data = {'Site':['Google', 'Runoob', 'Wiki'], 'Age':[10, 12, 13]}  #字典嵌套列表
data = pd.Series([1,2,3,4,5,6],index=pd.date_range('20130102',periods=6)) #series
data = [{'a': 1, 'b': 2},{'a': 5, 'b': 10, 'c': 20}] #字典列表
data = [1,2,3,4,5,6] #list
data = [[1,'tom','20110101'],[2,'jack','20110102']] #二维数组


# 创建空DataFrame，索引为日期类型
df = pd.DataFrame(columns=['A','B','C','D'], index=pd.DatetimeIndex([]))

# 创建空DataFrame，索引默认为整数索引(0,1,2,...)
df = pd.DataFrame(columns=['A','B','C','D'])


```


## 【DataFrame】列操作
```python
#列操作

#获取所有列名（返回List）
list(df)
df.columns.values

#获取某列（返回DataFrame），A为列名
df['A']

#获取第一列
df.iloc[:,0]

#将索引转变为列（新的索引变为0,1,2,...）
df = df.reset_index(name='newColumnName')

#将将索引转变为列（索引值不变，只是插入新的一列）
df['newColumnName']=df.index

#将已经存在的数据列做相加运算（并生成新的列）
df['four']=df['one']+df['three']

#添加一列
df['E'] = ['1','2','3','4','5']

#添加一列（2）
df['E'] = pd.Series([1,2,3,4,5,6],index=pd.date_range('20130102',periods=6))

#往1位置插入score列
df.insert(1,column='score',value=[91,90,75])

#删除列
df.pop('two')
del df['one']

#修改列名
df.rename(columns={'old_col1': 'new_col1'}, inplace=True)
```

## 【DataFrame】行操作
```python
#行操作

#获取所有index
df.index.values

#通过Index获取某行（返回DataFrame）
df['20130104':'20130106']


#获取某行（按照序号，0为第1行），返回的是一个Series对象
df.loc[0]  # 注意！索引如果是日期、字符串时，这种写法会报错
df.iloc[0] 

#获取多行(第1、4行)，返回的是一个DataFrame对象
df.loc[[0,3]]

#获取前几行（返回DataFrame）
df[0:3]

#获取多行，并只返回部分的列
df.loc[0:3,['name','age']]
df.loc[[0,3],['name','age']]


#追加行
df = pd.DataFrame([[1, 2], [3, 4]], columns = ['a','b'])
df2 = pd.DataFrame([[5, 6], [7, 8]], columns = ['a','b'])
df = df.append(df2)

#删除行（index=0的行）
df.drop(0)

```

## 【DataFrame】值操作
```python
#获取某个单元格的值(index=0,列名为A的值)
df.loc(0,'A')#返回一个series
df.iloc(0,1)

#查看前5条数据
df.head(5)
df.iloc[0:5]

#查看最后5条数据
df.tail(5)
df.iloc[-5:]

#查找index=5的行
df.loc(5)

#查找Index在某个范围的行
df['20130104':'20130106']

#返回某列
df['name']

#返回多列
df[['name','age']]

#【赋值】
#对第0行、第1列的单元格赋值为0（单个元素修改优先用iat）
df.iat[0, 1] = 0

#修改第1-2行、第1-2列（多个元素修改用iloc）
df.iloc[1:3, 1:3] = 0  

#将index='2024-01-01'、列名为A对应的单元格赋值为0
df.at['2024-01-01', 'A'] = 0

#同上
df.loc['2024-01-01', 'A'] = 0


df['F'] = s1
df2[df2 > 0] = -df2
```

## 【Dataframe】查询
``` 
#查出display_name='万科'的行
result = df[df['display_name']=='万科']

#查出display_name包含'万科'的行（模糊搜索）
result = df[df['display_name'].str.contains('万科')]

#查出type列中的所有值（去重）
df['type'].unique()
```

## 【Dataframe】合并
``` 
#根据索引合并2个df数据
result = df1.join(df2)

#根据字段name合并2个df数据
result = pd.merge(df1,df2,on='name',how='inner')

```

## 【Dataframe】计算



## 【Dataframe】自带画图功能

``` 
# 以索引为X轴，所有列为Y轴画一个折线图
df.plot()

# 以索引为X轴，以price列为Y轴
df.plot(x='日期',y='price')

# kind:图表类型。有line(折线图，默认)、bar(柱状图)、scatter(散点图)等
# title:图表标题
# color:指定折线颜色
# linestyle: '-'实线(默认)、'--'虚线
# marker: 'o'圆形、's'方形
# markersize: 标记大小
# figsize: 图表尺寸（英寸）
# subplots: True/False 每列数据单独绘制子图
# layout: 配合subplots使用，指定子图排列方式（如(2,2)就是2行2列）
# xlim/ylim: x轴/y轴显示范围，如(0,10)
# logx/logy: x轴/y轴对数刻度
df.plot(x='日期',y='price',kind='bar',title='',color:['blue','green'...],
    linestyle='--',figsize=(12,6))

```


## 【Series】创建
```python
#创建一个Series（默认数组：0,1,2,3...）
s1 = pd.Series([1,3,5,np.nan,6,8]) #使用 list 创建 Series

#自定义索引
s2 = pd.Series(['a',2,'abc'] , index = ['indexA','indexB','indexC']) 

#使用 dict 创建 Series。key会变为索引，value变为值
s3 = pd.Series({'A': "Google", 'B': "Runoob", 'C': "Wiki"}) 

#获取索引
s2.index

#获取元素
s2.values


#获取某个索引下的数据
s2['B'] #获取index为B的元素
s2.loc[['A','B']] #获取index为A、B的元素
s2.iloc[0:2] #获取第1~2行的元素

#for循环
for index,value in s2.items():
    print(f'index:{index} value:{value}')

#运算
s1 = s1 * 2 #所有元素乘以2
s1 = s1[s1 >2] #过滤出大于2的元素

s5 = s4 + s3 #同一索引的元素相加，没有元素则用NaN表示

#增加
s2['D'] ='Microsoft'

#元素个数
s2.shape[0]
s2.size()

#前3个、后3个
s2.head(3)
s2.tail(3)

#把索引变成列（又变回一个DataFrame）
s2.reset_index()

#去重
s2.unique()
```