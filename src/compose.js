const _ = require('ramda');
const accounting = require('accounting');

// 示例数据
const CARS = [
    {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
    {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
    {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
    {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
    {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
    {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
  ];

// 练习 1:
// ============
// 使用 _.compose() 重写下面这个函数。提示：_.prop() 是 curry 函数
const isLastInStock = function(cars) {
  const last_car = _.last(cars);
  return _.prop('in_stock', last_car);
};

console.log(_.last(CARS));

console.log(_.prop('in_stock', _.last(CARS))); // prop 支撑 道具
console.log(_.prop('horsepower', _.last(CARS)));

// 解答
const isLastInStockTest =  _.compose(_.prop('in_stock'), _.last);
console.log(isLastInStockTest(CARS))

// 练习 2:
// ============
// 使用 _.compose()、_.prop() 和 _.head() 获取第一个 car 的 name
const nameOfFirstCar = _.compose(_.prop('name'), _.head);
console.log(nameOfFirstCar(CARS));


// 练习 3:
// ============
// 使用帮助函数 _average 重构 averageDollarValue 使之成为一个组合
const _average = function(xs) { return reduce(add, 0, xs) / xs.length; }; // <- 无须改动

const averageDollarValue = function(cars) {
  const dollar_values = map(function(c) { return c.dollar_value; }, cars);
  return _average(dollar_values);
};


// 练习 4:
// ============
// 使用 compose 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串：例如：sanitizeNames(["Hello World"]) //=> ["hello_world"]。

// const _underscore = replace(/\W+/g, '_'); //<-- 无须改动，并在 sanitizeNames 中使用它

// const sanitizeNames = undefined;


// 彩蛋 1:
// ============
// 使用 compose 重构 availablePrices

const availablePrices = function(cars) {
  const available_cars = _.filter(_.prop('in_stock'), cars);
  return available_cars.map(function(x){
    return accounting.formatMoney(x.dollar_value);
  }).join(', ');
};


// 彩蛋 2:
// ============
// 重构使之成为 pointfree 函数。提示：可以使用 _.flip()

const fastestCar = function(cars) {
  const sorted = _.sortBy(function(car){ return car.horsepower }, cars);
  const fastest = _.last(sorted);
  return fastest.name + ' is the fastest';
};
