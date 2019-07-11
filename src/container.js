const Continer = function(x){
    this._value = x;
}

Continer.of = function(x){
    return new Continer(x);
}

const continer = Continer.of(3);
Continer.of('lalalal')
console.log(continer);



