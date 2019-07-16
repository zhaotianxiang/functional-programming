// 用一个函数把另一个函数包起来，目的仅仅是延迟执行，真的是非常糟糕的编程习惯。（稍后我将告诉你原因，跟可维护性密切相关。）

// 太傻了
const getServerStuff = callback => ajaxCall(json => callback(json));
// 这才像样
const getServerStuff = ajaxCall;

// 这行
ajaxCall(json => callback(json));
// 等价于这行
ajaxCall(callback);
// 那么，重构下 getServerStuff
const getServerStuff = callback => ajaxCall(callback);
// ...就等于
const getServerStuff = ajaxCall // <-- 看，没有括号哦


// 

const BlogController = {
    index(posts) { return Views.index(posts); },
    show(post) { return Views.show(post); },
    create(attrs) { return Db.create(attrs); },
    update(post, attrs) { return Db.update(post, attrs); },
    destroy(post) { return Db.destroy(post); },
};

// 这个可笑的控制器（controller）99% 的代码都是垃圾。我们可以把它重写成这样：
const BlogController = {
  index: Views.index,
  show: Views.show,
  create: Db.create,
  update: Db.update,
  destroy: Db.destroy,
};


// 只针对当前的博客
const validArticles = articles =>
  articles.filter(article => article !== null && article !== undefined),

// 对未来的项目更友好
const compact = xs => xs.filter(x => x !== null && x !== undefined);
// 在命名的时候，我们特别容易把自己限定在特定的数据上（本例中是 articles）。这种现象很常见，也是重复造轮子的一大原因。