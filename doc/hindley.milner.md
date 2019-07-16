# Hindley-Milner 类型签名

### 类型简述
类型签名在写纯函数时所起的作用非常大，大到英语都不能望其项背。这些签名轻轻诉说着函数最不可告人的秘密。短短一行，就能暴露函数的行为和目的。类型签名还衍生出了 “自由定理（free theorems）” 的概念。因为类型是可以推断的，所以明确的类型签名并不是必要的；不过你完全可以写精确度很高的类型签名，也可以让它们保持通用、抽象。类型签名不但可以用于编译时检测（compile time checks），还是最好的文档。所以类型签名在函数式编程中扮演着非常重要的角色——重要程度远远超出你的想象。

JavaScript 是一种动态类型语言，但这并不意味着要一味否定类型。我们还是要和字符串、数值、布尔值等等类型打交道的；只不过，语言层面上没有相关的集成让我们时刻谨记各种数据的类型罢了。别担心，既然我们可以用类型签名生成文档，也可以用注释来达到区分类型的目的。

类型签名在函数是编程中非常重要，超乎你的想象。

### 函数的类型签名

**a-\>b** 在 Hindley-Milner 系统中，函数都写成类似 a -> b 这个样子，其中 a 和b 是任意类型的变量。因此，capitalize 函数的类型签名可以理解为“一个接受 String 返回 String 的函数”。换句话说，它接受一个 String 类型作为输入，并返回一个 String 类型的输出。 

String -> [String] -> Number

```
//  strLength :: String -> Number
var strLength = function(s){
  return s.length;
}

//  join :: String -> [String] -> String
var join = curry(function(what, xs){
  return xs.join(what);
});

//  match :: Regex -> String -> [String]
var match = curry(function(reg, s){
  return s.match(reg);
});

//  replace :: Regex -> String -> String -> String
var replace = curry(function(reg, sub, s){
  return s.replace(reg, sub);
});

```

至于其他的，第一眼看起来可能会比较疑惑。不过在还不完全了解细节的情况下，你尽可以把最后一个类型视作返回值。那么 match 函数就可以这么理解：它接受一个 Regex 和一个 String，返回一个 [String]。但是，这里有一个非常有趣的地方，请允许我稍作解释。
对于 match 函数，我们完全可以把它的类型签名这样分组：

```
//  match :: Regex -> (String -> [String])
var match = curry(function(reg, s){
  return s.match(reg);
});

```
是的，把最后两个类型包在括号里就能反映更多的信息了。现在我们可以看出 match 这个函数接受一个 Regex 作为参数，返回一个从 String 到 [String] 的函数。因为 curry，造成的结果就是这样：给 match 函数一个 Regex，得到一个新函数，能够处理其 String 参数。当然了，我们并非一定要这么看待这个过程，但这样思考有助于理解为何最后一个类型是返回值。

```
//  head :: [a] -> a
var head = function(xs){ return xs[0]; }

//  filter :: (a -> Bool) -> [a] -> [a]
var filter = curry(function(f, xs){
  return xs.filter(f);
});

//  reduce :: (b -> a -> b) -> b -> [a] -> b
var reduce = curry(function(f, x, xs){
  return xs.reduce(f, x);
});
```
reduce 可能是以上签名里让人印象最为深刻的一个，同时也是最复杂的一个了，所以如果你理解起来有困难的话，也不必气馁。为了满足你的好奇心，我还是试着解释一下吧；尽管我的解释远远不如你自己通过类型签名理解其含义来得有教益。
不保证解释完全正确...（译者注：此处原文是“here goes nothing”，一般用于人们在做没有把握的事情之前说的话。）注意看 reduce 的签名，可以看到它的第一个参数是个函数，这个函数接受一个 b 和一个 a 并返回一个 b。那么这些 a 和 b 是从哪来的呢？很简单，签名中的第二个和第三个参数就是 b 和元素为 a 的数组，所以唯一合理的假设就是这里的 b 和每一个 a 都将传给前面说的函数作为参数。我们还可以看到，reduce 函数最后返回的结果是一个 b，也就是说，reduce 的第一个参数函数的输出就是 reduce 函数的输出。知道了 reduce 的含义，我们才敢说上面关于类型签名的推理是正确的。

### 自由定理

类型签名除了能够帮助我们推断函数可能的实现，还能够给我们带来自由定理（free theorems）。下面是两个直接从 Wadler 关于此主题的论文 中随机选择的例子：

```javascript
// head :: [a] -> a
compose(f, head) == compose(head, map(f));

// filter :: (a -> Bool) -> [a] -> [a]
compose(map(f), filter(compose(p, f))) == compose(filter(p), map(f));

```
不用写一行代码你也能理解这些定理，它们直接来自于类型本身。第一个例子中，等式左边说的是，先获取数组的头部（译者注：即第一个元素），然后对它调用函数 f；等式右边说的是，先对数组中的每一个元素调用 f，然后再取其返回结果的头部。这两个表达式的作用是相等的，但是前者要快得多。
你可能会想，这不是常识么。但根据我的调查，计算机是没有常识的。实际上，计算机必须要有一种形式化方法来自动进行类似的代码优化。数学提供了这种方法，能够形式化直观的感觉，这无疑对死板的计算机逻辑非常有用。
第二个例子 filter 也是一样。等式左边是说，先组合 f 和 p 检查哪些元素要过滤掉，然后再通过 map 实际调用 f（别忘了 filter 是不会改变数组中元素的，这就保证了 a 将保持不变）；等式右边是说，先用 map 调用 f，然后再根据 p 过滤元素。这两者也是相等的。
以上只是两个例子，但它们传达的定理却是普适的，可以应用到所有的多态性类型签名上。在 JavaScript 中，你可以借助一些工具来声明重写规则，也可以直接使用 compose 函数来定义重写规则。总之，这么做的好处是显而易见且唾手可得的，可能性则是无限的。

### 类型约束

类型约束最后要注意的一点是，签名也可以把类型约束为一个特定的接口（interface）。
// sort :: Ord a => [a] -> [a]
胖箭头左边表明的是这样一个事实：a 一定是个 Ord 对象。也就是说，a 必须要实现 Ord 接口。Ord 到底是什么？它是从哪来的？在一门强类型语言中，它可能就是一个自定义的接口，能够让不同的值排序。通过这种方式，我们不仅能够获取关于 a 的更多信息，了解 sort 函数具体要干什么，而且还能限制函数的作用范围。我们把这种接口声明叫做类型约束（type constraints）。
// assertEqual :: (Eq a, Show a) => a -> a -> Assertion
这个例子中有两个约束：Eq 和 Show。它们保证了我们可以检查不同的 a 是否相等，并在有不相等的情况下打印出其中的差异。
我们将会在后面的章节中看到更多类型约束的例子，其含义也会更加清晰。

### 总结
Hindley-Milner 类型签名在函数式编程中无处不在，它们简单易读，写起来也不复杂。但仅仅凭签名就能理解整个程序还是有一定难度的，要想精通这个技能就更需要花点时间了。从这开始，我们将给每一行代码都加上类型签名。
