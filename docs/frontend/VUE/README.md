---
title: VUE笔记
---


# VUE笔记

## 参考资料
[VUE官方文档(https://cn.vuejs.org/)](https://cn.vuejs.org/)   



## 笔记

### 关于 javascript的 import、export、require

CommonJS 规范下：

【导出模块】
```javascript
const myModule = {
   myFunction: function() {
       console.log('This is my function');
   },
   myVariable: 'This is my variable'
};

module.exports = myModule;
```

【导入模块】  
```javascript
// 导入模块
   const importedModule = require('./myModule');

   // 使用导入的模块
   importedModule.myFunction(); // 输出 'This is my function'
   console.log(importedModule.myVariable); // 输出 'This is my variable'
```


略


### var、let、const的区别
ES6规范下：  

【导出模块】  
```javascript
// 导出模块
const myFunction = () => {
   console.log('This is my function');
};

const myVariable = 'This is my variable';

export { myFunction, myVariable };
```


【导入模块】  
```javascript 
// 导入模块
import { myFunction, myVariable } from './myModule.js';

// 使用导入的模块
myFunction(); // 输出 'This is my function'
console.log(myVariable); // 输出 'This is my variable'
```

> **注意！** 用CommonJS规范导出的模块，可以用ES6规范进行导入；同样，用ES6规范导出的模块，也可以用CommonJS规范进行导入

### var、let、const的区别

var用于声明变量，且具有”变量提升“的特性，因而不推荐使用。

> 什么是变量提升？

let、const是ES6后新增的关键字。

let负责声明变量；const负责声明常量。  

const声明的常量只可读，不可被修改。定义时必须初始化。


### 一个VUE实例（new Vue()），都有一些什么属性？

```javascript
var vm = new Vue(){

	el:'#app',  //将 Vue 实例绑定到了id为'app'的HTML元素（根实例特有属性）

	data:{
		fullname:'',
		firstname:'',
		lastname:'',
		age:12
	},    //保存数据


	methods:{
		plus:(var attr1,var attr2){
			return attr1+attr2;
		}
	},    //定义实例中可用函数

	components:{ ThemePicker }, //导入外部的组件

	created: function(){

	},   //钩子函数，在实例被创建之后执行

	watch:{
		firstname: function(newValue,oldValue){
			this.fullname = newValue + this.lastname;
		}
	}    //侦听函数，当firstname的值变化时便会执行函数

}
```