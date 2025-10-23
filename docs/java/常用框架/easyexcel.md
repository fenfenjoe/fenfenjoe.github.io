---
title: easyexcel
---

# easyexcel

```java
ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
ExcelWriter excelWriter = EasyExcel.write(outputStream).build();
WriteSheet writeSheet2 = EasyExcel.writerSheet("sheetName")
    .head(MaterialCostExcelVo.class).needHead(Boolean.TRUE)
    .build();
excelWriter.write(list, writeSheet2);
// 必须执行 finish() 才能生成完整文件
excelWriter.finish();
return outputSteam;
```