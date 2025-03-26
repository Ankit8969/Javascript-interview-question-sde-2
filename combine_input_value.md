## Example
```
Input:
<form id="parent">
	<input type="text" name="a.c" value="1"/>
	<input type="text" name="a.b.d" value="2"/>
  <input type="text" name="a.b.e" value="3"/>
</form>

console.log(aggregateValues('parent'));

Output:
{
  "a": {
    "c": "1",
    "b": {
      "d": "2",
      "e": "3"
    }
  }
}
```


## Solution
```
const inputs = document.querySelectorAll("input");
let obj = {};
inputs.forEach((input) => {
  let temp = input.name.split(".");
  let val = input.value;
  let t = obj;
  for (let i = 0; i < temp.length; i++) {
    let key = temp[i];
    if (t[key]) {
      t = t[key];
    } else {
      if (i == temp.length - 1) t[key] = val;
      else {
        t[key] = {};
        t = t[key];
      }
    }
  }
  let lastKey = temp[temp.length - 1];
  t[lastKey] = val;
});

console.log(JSON.stringify(obj));

```

## Output
```
{
  "a": {
    "c": "1",
    "b": {
      "d": "2",
      "z": "2",
      "e": "3",
      "x": {
        "y": "3"
      }
    }
  }
}
```
