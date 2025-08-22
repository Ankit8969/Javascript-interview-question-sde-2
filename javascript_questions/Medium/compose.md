## Pipe and Compose Related question


### Question - 1
```
function one(a, b) { 
    return a + b;
}

function two(c) {
    return c * 2;
}

function three(d){
    return d * 2;
}

let arr = [one, two, three];

function composedFun(arr){
    return function(...args){
        return arr.reduce((prev,curr) => {
            return curr(...(Array.isArray(prev) ? prev : [prev]));
        } , args)
    }
}

let bindedFun = composedFun(arr);
console.log(bindedFun(3,4));

```


### Question no - 2
```
function one(a) { 
    return a*5;
}

function two(c) {
    return c * 2;
}

function three(d){
    return d * 2;
}

let arr = [one, two, three];

function composedFun(arr){
    return function(x){
        return arr.reduce((prev, curr) => curr(prev), x)
    }
}

let bindedFun = composedFun(arr);
console.log(bindedFun(3));
```



### Async Execution in Compose / Pipe

```
function a(x, y) {
  return new Promise((resolve) => setTimeout(() => resolve(x * y), 100));
}

function b(z) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(z + 5), 100)
  );
}

function c(r) {
  return new Promise((resolve) => setTimeout(() => resolve(r / 10), 100));
}

const composeAsync = (...functions) => async (...input) => {
    let result = input;
    
    const reversedFunctionsList = [...functions].reverse();
    for (const func of reversedFunctionsList) {
      result = await func(...(Array.isArray(result) ? result : [result]));
    }

    return result;
  };

// create this function
composeAsync(
  c,
  b,
  a
)(5, 3).then((result) => {
    console.log(result);
}).catch(console.error);
```