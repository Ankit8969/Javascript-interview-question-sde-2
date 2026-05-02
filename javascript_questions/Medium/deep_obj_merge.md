## Deep object merge

```
function isObject(obj){
    return obj && typeof obj === 'object' && !Array.isArray(obj);
}

function deepMerge(obj1, obj2){
    let result = {...obj1};
    for(const key in obj2){
        if(obj1[key] && isObject(obj2[key]))
            result[key] = deepMerge(obj1[key], obj2[key]);
        else
            result[key] = obj2[key];
    }
    return result;
}

```

### Input
```
const obj1 = { a: 1, b: { x: 10, y: 20 , d: {name:"Ankit"}} };
const obj2 = { b: { y: 30, z: 40 , d: {name: "Nishu"}}, c: 3, n: 2 };

const mergedObj = deepMerge(obj1, obj2);

console.log(mergedObj);
```

### Output
```
{ a: 1, b: { x: 10, y: 30, d: { name: 'Nishu' }, z: 40 }, c: 3, n: 2 }
```
