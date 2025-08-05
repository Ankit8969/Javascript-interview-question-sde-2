## Question
 - Filter Nested object

## Input
```
Input:
const obj = {
  a: 1,
  b: {
    c: "Hello World",
    d: 2,
    e: {
     f: {
       g: -4,
      },
    },
    h: "Good Night Moon",
  },
};

const filter = (s) => typeof s === "string";

Output:
{
  b: {
    c: "Hello World",
    h: "Good Night Moon",
  }
};
```


## Solution

```
const filter = (s) => typeof s === "string";

function filteredObj(obj) {
  let keys = Object.keys(obj);
  let temp = {};
  keys.forEach((key) => {
    if (typeof obj[key] === "object") {
      temp = {
        [key]: filteredObj(obj[key]),
        ...temp,
      };
    } else {
      if (filter(obj[key])) {
        console.log(key, obj[key]);
        temp = {
          ...temp,
          [key]: obj[key],
        };
      }
    }
  });
  return temp;
}

let res = filteredObj(obj);
console.log(res);
```


## Output
```
{
  "b": {
    "e": {
      "f": {
        "k": {
          "first": "Ankit",
          "last": "Yadav"
        },
        "j": "Nestted one"
      }
    },
    "c": "Hello World",
    "h": "Good Night Moon"
  }
}
```


