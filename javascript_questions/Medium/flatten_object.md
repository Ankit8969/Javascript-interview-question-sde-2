
### Input
```
const nested = {
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
      L: 56,
    },
    Q: [1, 2],
  },
};
```

### Output
```
{
    "A": "12",
    "B": 23,
    "C.P": 23,
    "C.O.L": 56,
    "C.Q.0": 1,
    "C.Q.1": 2
}
```


### Solution 

```
function flatten(obj, path = "", res = {}) {
  if (typeof obj !== "object") {
    res[path] = obj;
    return;
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      let updatedPath = path ? path + "." + String(i) : String(i);
      flatten(obj[i], updatedPath, res);
    }
  } else {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      let updatedPath = path ? path + "." + keys[i] : keys[i];
      flatten(obj[keys[i]], updatedPath, res);
    }
  }
  return res;
}
```

```
console.log(flatten(nested));
```



### Flatten Array with Depth

```

// nested array
let nested = [1, 2, 3, [4, 5, [6, 7, [8, 9, [10]]]]];

function flat(arr, depth = Infinity) {
  if (depth === 0) return arr;
  let temp = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      temp.push(...flat(arr[i], depth - 1));
    } else {
      temp.push(arr[i]);
    }
  }
  return temp;
}

let res = flat(nested, 1);
console.log(res);
```