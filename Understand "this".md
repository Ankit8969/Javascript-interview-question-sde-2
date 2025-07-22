## Example - 1

```
const bfObject1 = {
    name: "Ankit kumar",
    age: 25,
    gfFunction: function(a, b) {
        console.log(a, b, this);
    }
}
```
## Example - 2
```
const bfObject2 = {
    name: "Rahul kumar",
    age: 22,
    gfFunction: function(a, b) {
        console.log(a, b, this);
    }
}
```

```
// If the function is along, with object, it will always point to the object
bfObject1.gfFunction(1, 2); // It is pointing to the object
let t = bfObject1.gfFunction; 
// For this case, at the time of calling it is not associate with 
// any other function 
t(1,2); // pointing to the "global" object
```

## CALL, APPLY and BIND


## Call
```
bfObject1.gfFunction.call(bfObject2, 3,4); // pointing to the bfObject 2 
bfObject2.gfFunction.call(bfObject1, 4, 5) // pointing to the bfObject 1
```

## APPLY 
- Does the same thing, only syntactical change
```
bfObject1.gfFunction.apply(bfObject2, [3,4]); // pointing to the bfObject 2 
bfObject2.gfFunction.apply(bfObject1, [4, 5]) // pointing to the bfObject 1
```

## BIND behaves differently
- bind returns a function
```
let temp = bfObject1.gfFunction.bind(bfObject2);
console.log(temp);
temp(7, 8);
```


## Very Important Output based question and Scenario

## Question - 1

```
console.log("4: ", this); // Window
```

## Question - 2

```
function check1() {
  console.log("Check1: ", this); // Window
}

check1();

```


## Question - 3

```
const check2 = () => {
  console.log("check2: ", this); // Window
}

check2()
```

## Question - 4

```
let obj = {
  name: "Ankit",
  age: 24,
  check3: function () {
    function x() {
      console.log("x: ", this);
    }
    x();
    console.log("check3: ", this);
  },
  check4: () => {
    function y() {
      console.log("y: ", this);
    }
    // y = y.bind(this);
    console.log("check4: ", this);
    y();
  }
}

```

```
obj.check3();
obj.check4();
```

### Explanation
```

check3: function () {
  function x() {
    console.log("x: ", this);
  }
  x();
  console.log("check3: ", this);
}
```

### Explanation:

- check3 is a regular function, so when you call obj.check3(), this inside check3 refers to obj.
- However, x() is a nested regular function, not a method of obj, and it’s invoked without a context, so this inside x() refers to:
- undefined in strict mode.
- window (global object) in non-strict mode.

```
check4: () => {
  function y() {
    console.log("y: ", this);
  }
  console.log("check4: ", this);
  y();
}
```
### Explanation:
- check4 is an arrow function, so it doesn't have its own this.
- this inside check4 is inherited from the enclosing lexical scope, which is the global scope (or window in browsers).
- y() is a regular function and called normally, so again this inside y() points to:
- undefined in strict mode
- window in non-strict mode

## 🧠 Enclosing Lexical Scope (ELS)
- The enclosing lexical scope of a function is the parent scope where it was defined, not where it's called from.


## 💥 Why is this important for arrow functions?
- Arrow functions do not have their own this. Instead:
- Arrow functions inherit this from their enclosing lexical scope at the time of definition.


That means:
- It looks up the chain to find this from the place where it was created.
- It does not care how or where the arrow function is called.


## Question - 5

```
let obj = {
  name: "Ankit",
  method: function () {
    const arrowFunc = () => {
      console.log("this in arrowFunc:", this);
    };
    arrowFunc();
  }
};

obj.method();
```

### 🧠 What happens here:
- method is a regular function, so this inside method points to obj.
- arrowFunc is defined inside method, so its enclosing lexical scope is method.
- Therefore, arrowFunc inherits this from method, which is obj.

## 🛑 But if defined outside:

```
const arrowFunc = () => {
  console.log("this:", this);
};

let obj = {
  name: "Ankit",
  method: arrowFunc,
};

obj.method();
```

Now, arrowFunc is defined outside of obj, in the global scope.
So its enclosing lexical scope is the global scope.
Even though it's called as obj.method(), this does not point to obj — it's still window (or undefined in strict mode).


## ✅ Summary
```
Function Type	Has its own this?	Inherits this from
Regular Function	✅ Yes	Depends on how it's called
Arrow Function	❌ No	Enclosing Lexical Scope
```

## Another good Example
```
let obj2 = {
  name: "Sonu",
  check3: function () {
    const x = () => {
      console.log("x: ", this);
    }
    x();
    console.log("9: ", this);
  },
  check4: () => {
    function y() {
      console.log("y: ", this);
    }
    console.log("check4: ", this);
    y();
  }
}
```

### 🔍 Question:
What is the enclosing lexical scope for the arrow function x?

### ✅ Answer:
The enclosing lexical scope for x is the check3 function, not obj2.


### 🧠 Why?
- x is an arrow function, so it does not have its own this.
- It captures this from its lexical scope, i.e., where it's defined.
- x is defined inside check3, which is a regular function.
- So, this inside x will be whatever this is inside check3.
- Since check3 is called like obj2.check3(), this inside check3 points to obj2.


### ✅ Therefore:
- this inside x → same as this in check3 → obj2.



### 🔎 For completeness, what about check4?
```
check4: () => {
  function y() {
    console.log("y: ", this);
  }
  console.log("check4: ", this);
  y();
}
```

- check4 is an arrow function, so it inherits this from its lexical scope.
- check4 is defined inside the global scope, so this is window (or undefined in strict mode).
- y() is a regular function, and it is called as a normal function, so this is also window.





