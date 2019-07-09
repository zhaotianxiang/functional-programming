# 代码组合（Compose）

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
  <img src="https://github.com/zhaotianxiang/functional-programming/blob/master/doc/compose1.png" width="1000"/>
  <img src="https://github.com/zhaotianxiang/functional-programming/blob/master/doc/compose2.png" width="1000"/>
</p>

[组合结构]()

