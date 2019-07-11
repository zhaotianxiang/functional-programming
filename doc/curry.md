# 函数柯里化（curry)

### 基本概念

**核心: 只传递给函数一部分参数来调用它， 让它返回一个函数去处理剩下的函数**

**来源** 柯里化是编译原理层面上实现多参数函数的一种技术， 这种编程方式可以用来把接受多个参数的函数进行**递归降解**.

```javascript
var add = function(x){
    return function(y){
        return x+y;
    }
}

const result = add(1)(12);

var increment = add(1);
var addTen = add(10);

increment(2);
addTen(3);
```

为什么要柯里化？ 更通用， 参数更少， 一元函数远远优于二元函数。


### 柯里化的核心思想

```javascript

function trueCurrying(fn, ...args) {

    if (args.length >= fn.length) {

        return fn(...args)

    }

    return function (...args2) {

        return trueCurrying(fn, ...args, ...args2)

    }
}

```

即它的返回值并没有自动被 Currying化 。所以我们可以通过递归来将 currying 的返回的函数也自动 Currying 化。
以上函数很简短，但是已经实现 Currying 的核心思想了。JavaScript 中的常用库 Lodash 中的 curry 方法，其核心思想和以上并没有太大差异——比较多次接受的参数总数与函数定义时的入参数量，当接受参数的数量大于或等于被 Currying 函数的传入参数数量时，就返回计算结果，否则返回一个继续接受参数的函数。

### 柯里化应用场景

1. 参数复用
固定不变的参数，实现参数复用是 Currying 的主要用途之一。
上文中的increment, addTen是一个参数复用的实例。对add方法固定第一个参数为 10 后，改方法就变成了一个将接受的变量值加 10 的方法。
2. 延迟执行
延迟执行也是 Currying 的一个重要使用场景。

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
})；
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

### 函数式优化写法

1. 链式写法

```javascript

// 优化写法 (嗯，你没看错，这就是 lodash 的链式写法)

const utils = {
  chain(a) {
    this._temp = a;
    return this;
  },
  sum(b) {
    this._temp += b;
    return this;
  },
  sub(b) {
    this._temp -= b;
    return this;
  },
  value() {
    const _temp = this._temp;
    this._temp = undefined;
    return _temp;
  }
};

console.log(utils.chain(1).sum(2).sum(3).sub(4).value());

```

### 例题

1. 如何完成函数 multi(2)(3)(4) = 24 ?

```javascript
function multi(n){
  var fn = function(x) {
    return multi(n * x);
  };

  fn.valueOf = function() {
    return n;
  };

  return fn;
}

multi(1)(2)(3)(4) == 24; // true

//函数的柯里化

var baseFun = function(a, b, c){
  return a * b * c;
}
var multi = _.curry(baseFun);


// 完整版函数式

function curry(fn){
   var value;
   var callback = function(next){
      value = typeof value === "undefined" ? next : fn.apply(null,[value,next]);
      return callback;
   }
   callback.valueOf = callback.toString = function(){
     return value;
   }
   return callback
}
//加
function add(x,y){
  return x + y
}
//减
function minus(x,y){
  return x -y
}
//乘
function multiply(x,y){
  return x * y;
}
//除
function divide(x,y){
  return x / y;
}
curry(add)(2)(3)(4)(5)(6) //2+3+4+5+6=20
curry(minus)(2)(3)(4)(5)(6) //2-3-4-5-6=-16
curry(multiply)(2)(3)(4)(5)(6) //2*3*4*5*6=720
curry(divide)(2)(3)(4)(5)(6) //2 / 3 / 4/ 5 /6 = 0.00555555...

```



### 总结
curry 函数用起来非常得心应手，每天使用它对我来说简直就是一种享受。它堪称手头必备工具，能够让函数式编程不那么繁琐和沉闷。
通过简单地传递几个参数，就能动态创建实用的新函数；而且还能带来一个额外好处，那就是保留了数学的函数定义，尽管参数不止一个.
