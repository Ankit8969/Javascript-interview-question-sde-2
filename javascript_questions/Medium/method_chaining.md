## Method Chaining
- It's a pattern where each method returns the same object (this), allowing calls to be chained one after another instead of creating new instances.

### Example - 1
```
let obj = {
  count: 0,
  add(num) {
    this.count += num;
    return this;
  },
  sub(num) {
    this.count -= num;
    return this;
  },
  mul(num) {
    this.count *= num;
    return this;
  },
  getValue() {
    return this.count;
  },
};
```

```
console.log(obj.add(2).sub(3).mul(3).add(10).getValue());
console.log(obj.add(2).mul(3).getValue());
```

### Example - 2
```
class Calculator {
  constructor() {
    this.value = 0;
  }

  add(num) {
    this.value += num;
    return this;   // return current instance
  }

  subtract(num) {
    this.value -= num;
    return this;
  }

  multiply(num) {
    this.value *= num;
    return this;
  }
}

const calc = new Calculator();
calc.add(10).subtract(5).multiply(2); // chaining calls

console.log(calc.value); // 10
```