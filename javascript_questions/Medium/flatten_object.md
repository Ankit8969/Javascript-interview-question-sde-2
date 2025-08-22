
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