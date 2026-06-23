## Deep object merge

```

function deepMerge(obj1, obj2) {
  if (typeof obj2 !== "object") return obj2;
  let temp = { ...obj1 };
  for (const key in obj2) {
    if (!temp[key]) {
      temp[key] = obj2[key];
    } else {
      temp = {
        ...temp,
        [key]: deepMerge(obj1[key], obj2[key]),
      };
    }
  }

  return temp;
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
