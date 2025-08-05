# JSON.stringify() Implementation


```
Example: 
const obj = {
  name: "John",
  age: 30,
  hobbies: ["reading", "gaming"],
  isStudent: false,
  details: {
    city: "New York",
    country: "USA",
    details: {
      city: "New York",
      country: "USA",
      mob: 234234234,
    }
  },
  add: [
    {
      name:"Ankit",
      lastName:"yadav"
    },
    "ankit",
    23423423
  ]
};
```


While implementing we need to take care different type of data types
eg: Number, String, Boolean, Object, Array.

```
function customImplementation(obj) {
  if (obj === null) return "null";

  const type = typeof obj;

  if (type === "number" || type === "boolean") return String(obj);

  if (type === "string") return `"${obj}"`;

  if (type === "function" || 
    type === "undefined" || 
    type === "symbol") {
    return undefined; // JSON.stringify ignores these in objects
  }

  if (Array.isArray(obj)) {
    const arr = obj.map((item) => {
      const val = customImplementation(item);
      return val === undefined ? "null" : val; // like JSON.stringify
    });
    return `[${arr.join(",")}]`;
  }

  if (type === "object") {
    let props = [];
    for (let key in obj) {
      if (Object.hasOwn(obj, key)) {
        const val = customImplementation(obj[key]);
        if (val !== undefined) {
          props.push(`"${key}":${val}`);
        }
      }
    }
    return `{${props.join(",")}}`;
  }

  return undefined;
}
```

```
Function Calling
console.log(customImplementation(obj));
```

Output: 
```
{"name": "John","age": "30","hobbies": ["reading","gaming"],"isStudent": "false","details": {"city": "New York","country": "USA","details": {"city": "New York","country": "USA","mob": "234234234"}},"add": [{"name": "Ankit","lastName": "yadav"},"ankit","23423423"]}
```

