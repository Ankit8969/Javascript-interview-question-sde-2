## Input

```
const users = [
  { name: "Alice", age: 21 },
  { name: "Alice", age: 23 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 21 },
  { name: "David", age: 25 },
];

```

## Solution

```
function groupBy(arr, key) {
  let res;
  res = arr.reduce((prev, curr) => {
    let Newkey = curr[key];
    if (prev[Newkey]) {
      prev[Newkey].push(curr);
    } else {
      prev[Newkey] = [curr];
    }
    return prev;
  }, {});
  return res;
}

let result = groupBy(users, "name");
console.log(result);

```

## Output
```
{
    "Alice": [
        { "name": "Alice", "age": 21 },
        {"name": "Alice", "age": 23}
    ],
    "Bob": [
        { "name": "Bob", "age": 25 }
    ],
    "Charlie": [
        {"name": "Charlie","age": 21}
    ],
    "David": [
        {"name": "David","age": 25}
    ]
}
```
