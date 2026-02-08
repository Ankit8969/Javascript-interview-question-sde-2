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

function filterObj(obj, cb) {
  // If value itself is valid, return it
  if (cb(obj)) return obj;

  // If not an object, discard it
  if (typeof obj !== "object" || obj === null) return undefined;

  const result = {};

  for (const key in obj) {
    const filteredValue = filterObj(obj[key], cb);

    // Keep only valid or non-empty objects
    if (
      filteredValue !== undefined &&
      (typeof filteredValue !== "object" ||
        Object.keys(filteredValue).length > 0)
    ) {
      result[key] = filteredValue;
    }
  }

  return Object.keys(result).length > 0 ? result : undefined;
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


