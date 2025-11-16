# 代码笔记

建一个空的List
```myList = []```

建一个空的Map
```myMap = {}```

建一个空的Dataframe，标明列名，并且以日期作为行（索引）。
```max_score_df = pd.DataFrame(columns=['max_etf', 'max_score'], index=pd.DatetimeIndex([]))```

循环访问Dataframe
```
# 遍历每一行
for index, row in df.iterrows():
    # 修改 B 列：如果 A > 3，则 B 增加 100
    if row['A'] > 3:
        df.at[index, 'B'] = row['B'] + 100
```

```
# 方法1：直接对列进行向量化操作（推荐）
df['A_doubled'] = df['A'] * 2  # 所有元素乘以2

# 方法2：使用 apply 函数
df['A_squared'] = df['A'].apply(lambda x: x**2)
```

复制一个dataframe（深拷贝）

```
df2 = df1.copy()
```