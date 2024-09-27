# Generator function in JS

- A generator function in JavaScript is a special type of function that allows you to pause and resume its execution.


 ## Eg:1
```
  function* numberGenerator() {
    let num = 0;
    while (true) {
        yield num++; // Pause here and return the value of num
    }
}

const numbers = numberGenerator();
console.log(numbers.next().value); // 0
console.log(numbers.next().value); // 1
console.log(numbers.next().value); // 2
```

## Eg: 2

```
function* numberGenerator() {
    let num = 0;
    while (true) {
        yield num++; // Pause here and return the value of num
    }
}

const numbers = numberGenerator();
console.log(numbers.next().value); // 0
console.log(numbers.next().value); // 1
console.log(numbers.next().value); // 2

```
