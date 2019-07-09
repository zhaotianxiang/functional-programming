# 函数柯里化（curry)

### 基本概念

**核心: 只传递给函数一部分参数来调用它， 让它返回一个函数去处理剩下的函数**

```javascript
var add = function(x){
    return function(y){
        return x+y;
    }
}

var increment = add(1);
var addTen = add(10);

increment(2);
addTen(3);
```

为什么要柯里化？ 更通用， 参数更少， 一元函数远远优于二元函数。

```javascript

var curry = require('lodash').curry;

var match = curry(function(what, str) {
  return str.match(what);
});

var replace = curry(function(what, replacement, str) {
  return str.replace(what, replacement);
});

var filter = curry(function(f, ary) {
  return ary.filter(f);
});

var map = curry(function(f, ary) {
  return ary.map(f);
});

match(/\s+/g, "hello world");
match(/\s+/g)("hello world");
var hasSpaces = match(/\s+/g);
hasSpaces("hello world");
hasSpaces("spaceless");
filter(hasSpaces, ["tori_spelling", "tori amos"]);
var findSpaces = filter(hasSpaces);
findSpaces(["tori_spelling", "tori amos"]);
var noVowels = replace(/[aeiou]/ig);
var censored = noVowels("*");
censored("Chocolate Rain");

```


### 总结
curry 函数用起来非常得心应手，每天使用它对我来说简直就是一种享受。它堪称手头必备工具，能够让函数式编程不那么繁琐和沉闷。
通过简单地传递几个参数，就能动态创建实用的新函数；而且还能带来一个额外好处，那就是保留了数学的函数定义，尽管参数不止一个。 下一章我们将学习另一个重要的工具：组合（compose）。
