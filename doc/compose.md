# 代码组合（Compose）

> 将多个函数的能力合并， 创造一个新的函数。 最好使用一元函数。

### 函数之间的组合

```javascript

var compose = function(f,g) {
  return function(x) {
    return f(g(x));
  };
};

```

从右向左运行， 俗称"左倾"。

### 结合律

```
// 结合律（associativity）
var associative = compose(f, compose(g, h)) == compose(compose(f, g), h);
// true

compose(toUpperCase, compose(head, reverse));

// 或者
compose(compose(toUpperCase, head), reverse);

```

### 组合的实质

<p align="left">
  <img src="https://github.com/zhaotianxiang/functional-programming/blob/master/imge/compose1.png" width="1000"/>
  <img src="https://github.com/zhaotianxiang/functional-programming/blob/master/imge/compose2.png" width="1000"/>
</p>

我们定义的compose就像双面胶一样，可以把任何两个纯函数结合到一起。当然你也可以扩展出组合三个函数的“三面胶”，甚至“四面胶”“N面胶”。


```
var g = function(x){ return x.length; };
var f = function(x){ return x === 4; };
var isFourLetterWord = compose(f, g);
```
简单来说就是 g 的输出给了 f , g->f 首尾相接， 组合成一个新的函数， 再一次感受一元函数的强大吧。
