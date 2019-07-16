# 函数式编程 - (functional-programming)


## Geting Strat

1. [Currying](https://github.com/zhaotianxiang/functional-programming/blob/master/doc/curry.md)

2. [Compose](https://github.com/zhaotianxiang/functional-programming/blob/master/doc/compose.md)

3. [Lambda Calculus](https://github.com/zhaotianxiang/functional-programming/blob/master/doc/lambda.calculus.md)


### 概述

函数式编程是一种编程范式， 也是结构化编程的一种，主要是把计算过程写成一系列嵌套的函数调用。

 > ( 1 + 2 ) \* 3 4 4 

传统编程:

```javascript

var a = 1 + 2;
var b = a * 3;
var c = b - 4;

```

函数式编程:

```javascript

var result = subtract(multiply(add(1,2), 3), 4)

```

核心是: **将计算过程写成函数， 没有任何中间变量。**

**纯函数** 
1. 函数的结果只依赖于输入的参数且与外部系统状态无关——只要输入相同，返回值总是不变的。
2. 除了返回值外，不修改程序的外部状态（比如全局变量、入参）。——满足这个条件也被称作“没有副作用 (side effect)”


### 函数式编程的特点

##### 1. 函数是"第一等公民"

函数和其他任何数据类型一样， 处于平等的地位。可以赋值给变量，可以作为参数， 可以作为返回值。

##### 2. 只用表达式不用语句

   - 表达式是一个单纯的运算操作，总有返回值。
   - 语句是执行操作， 没有返回值
   - 尽量小的IO操作可以保证 **只有表达式，没有语句**

##### 3. 无副作用

副作用是: 函数内部和外部的互动（修改全局变量），产生运算以外的其他结果。
函数式编程强调没有副作用， 意味着函数要保持独立，所有的功能就是返回一个新的值。没有其他行为。

##### 4. 不修改状态

函数式编程只返回新的值。

##### 5. 引用透明

函数运行只依赖于输入参数。

### 意义

##### 1. 代码简单，开发迅速

##### 2. 接近自然语言， 易于理解

 > add(1,2).multiply(3).subtract(4) 

##### 3. 函数当成是一个单元易于测试。

##### 4. 天然可并发无死锁。

##### 5. 代码热升级运行状态下升级代码。