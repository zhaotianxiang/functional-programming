const add = (x,y)=>{
    return x+y;
}

function sub(x,y){
    return x-y;
}

const subtract = (x) => {
    return (y)=>{
	y-x;
    }
}


const ret = add(1,2).sub(3);
console.log(ret);
