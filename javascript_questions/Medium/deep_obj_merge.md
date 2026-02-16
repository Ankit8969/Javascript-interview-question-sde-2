## Deep object merge

```
function deepMerge(obj1, obj2){
    let currentState = {...obj1};
    
    for(const key in obj2){
        let val1 = obj1[key];
        let val2 = obj2[key];
        
        // only object
        if(typeof val1 === 'object' && typeof val2 === 'object') {
            currentState[key] = deepMerge(obj1[key], obj2[key]);
        }else {
            currentState[key] = val2;
        }
    }
    return currentState;
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