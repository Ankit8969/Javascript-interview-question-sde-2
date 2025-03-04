
## Example
```
let str = '{"name":"Ankit","age":26,"add":{"name":"fbg","location":"India"}}';
```
## Expected Output
```
{
  "name": "Ankit",
  "age": 26,
  "add": {
    "name": "fbg",
    "location": "India"
  }
}
```


```
function getGap(n) {
  return "  ".repeat(n); // 2-space indentation
}

function recur(str) {
    let tab = 0, i=0;
    let result = ""

    while (i < str.length) {
        let char = str[i];
        if (char === '{' || char === '[') {
            result += char + "\n" + getGap(++tab); // Increase indentation
        } else if (char === '}' || char === ']') {
            result += "\n" + getGap(--tab) + char; // Decrease indentation
        } else if (char === ',') {
            result += char + "\n" + getGap(tab); // Add newline after commas
        } else if (char === ':') {
            result += ": "; // Add space after colons for better readability
        } else {
            result += char;
        }
        i++;
    }
    return result;
}

```

```
const str = '{"name":"Ankit","age":26,"add":{"name":"fbg","location":"India"}}';

let ans = recur(str);
console.log(ans);
```

## Output
```
{
  "name": "Ankit",
  "age": 26,
  "add": {
    "name": "fbg",
    "location": "India"
  }
}
```



