# Tupperware 特百惠

**强大的容器**

```java

var Container = function(x) {
  this.__value = x;
}

Container.of = function(x) { return new Container(x); };

Container.of(3)
//=> Container(3)

Container.of("hotdogs")
//=> Container("hotdogs")

Container.of(Container.of({name: "yoda"}))
//=> Container(Container({name: "yoda" }))

// (a -> b) -> Container a -> Container b
Container.prototype.map = function(f){
  return Container.of(f(this.__value))
}

Container.of(2).map(function(two){ return two + 2 })
//=> Container(4)

Container.of("flamethrowers").map(function(s){ return s.toUpperCase() })
//=> Container("FLAMETHROWERS")

Container.of("bombs").map(concat(' away')).map(_.prop('length'))
//=> Container(10)

```

为什么要使用这样一种方法？因为我们能够在不离开 Container 的情况下操作容器里面的值。这是非常了不起的一件事情。Container 里的值传递给 map 函数之后，就可以任我们操作；操作结束后，为了防止意外再把它放回它所属的 Container。这样做的结果是，我们能连续地调用 map，运行任何我们想运行的函数。甚至还可以改变值的类型，就像上面最后一个例子中那样。

如果我们能一直调用 map，那它不就是个组合（composition）么！这里边是有什么数学魔法在起作用？是 functor。各位，这个数学魔法就是 functor。

**函子：functor 是实现了 map 函数并遵守一些特定规则的容器类型。**

```java
var Maybe = function(x) {
  this.__value = x;
}

Maybe.of = function(x) {
  return new Maybe(x);
}

Maybe.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
}

Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}

Maybe.of("Malkovich Malkovich").map(match(/a/ig));
//=> Maybe(['a', 'a'])

Maybe.of(null).map(match(/a/ig));
//=> Maybe(null)

Maybe.of({name: "Boris"}).map(_.prop("age")).map(add(10));
//=> Maybe(null)

Maybe.of({name: "Dinah", age: 14}).map(_.prop("age")).map(add(10));
//=> Maybe(24)
```


