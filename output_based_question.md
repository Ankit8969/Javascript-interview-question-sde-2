# Output based interview question

## String coercion

```
console.log(true + false); // 1
console.log(false + false); // 0
console.log(true - false); // 1
console.log(false - false); // 0
console.log(true + 'false'); // truefalse
```

## "+" operator is not changing the type while adding, subtracting, dividing,
- If we pass number it will take number
- If we pass string it will taking string

## ("-" / "*" / "/") these three operator is changing the type,
- If you pass number it will take number
-  If you pass "string" first it will try to convert to number
```
console.log(12/"6") // 2
console.log("number" + 15 + 3) // number153
```

The expression console.log("foo" + + "bar") has an interesting result due to how JavaScript handles type coercion. Let's break it down step by step:

 - "foo" + + "bar"
"foo": This is a string.
+ "bar": The + here before "bar" is not a string concatenation operator but a unary plus operator. The unary plus tries to convert its operand ("bar") into a number.
- Attempt to convert "bar" to a number:
The unary plus + attempts to convert "bar" (a string) into a number.
Since "bar" is not a valid number, it results in NaN (which stands for "Not-a-Number").
-  Concatenation:
Now, the expression becomes "foo" + NaN.
In JavaScript, when you use the + operator with a string and a non-string value (like NaN), it coerces the non-string value to a string.
NaN is converted to the string "NaN".
-  Final result:
The expression is effectively "foo" + "NaN", which results in "fooNaN".

```
console.log("foo" + + "bar") // fooNaN
console.log("foo" + + "234"); // foo234
```
## operator based output question.

```
console.log(false == 'false'); // false
console.log(true == 'true'); // false
console.log(23 == "23") // true

console.log(1 + 1); // 2
console.log(2 + '2'); // 22
console.log(23 + '123') // 23123
console.log(23 - 23); // 0
console.log(23 - '20'); // 3
console.log(23 - '5'); // 18
console.log(23/12); // 1.9
console.log(23/'2'); // 11.5
console.log('a' + 'b' - 'c'); // NaN
console.log(1 + 2 -'3'); // 0
console.log('2' + 2 - 23 - '232'); // -233
console.log(23/'23'); // 1
console.log('23'/'2'); // 11.5
```



# var , let and const

```
console.log(x); // undefined
var x = 2;
var x = 3;
console.log(x); // 3

{
  var x = 4;
  var y = 5;
  console.log(x); // 4
}

console.log(y) // 5 
console.log(x); // 4


```


```
var x = 2;
let x = 3; // error -> x already declared
```

```
var x = 2;
{
  let x = 3;
  console.log(x); // 3
}
console.log(x); // 2
```

```
let x = 3;
function add(){
  var x = 2;
  if (true) {
    let x = 3;
    let y = 5;
  }
  console.log(x); // 2
   console.log(y); //Reference Error: y is not defined
}
add();
console.log(x); // 3

```


```
{
  let x= 3;
}

console.log(x); // Error: x is not defined
```

- **Shadowing**
```
var x = 2;
if (true) {
  let x = 5; // shadowing
  console.log(x)
}


let x = 2;
if (true) {
  var x = 5; // illegal shadowing
  console.log(x)
}

```

```
console.log(x);  // undefined
console.log(y); // Reference Error: can't access y before initialization
console.log(z); // same error as y due to TDZ


var x = 2
let y = 3
const z = 4;

```


# Function's related Output question

```
(function(x) {
  return (function(y){
    console.log(x); // 1
    console.log(y); // 2
  })(2);
})(1);
```

```
var num1 = 20,  num2 = 3, name = "Ankit yadav";

function multiply(){
  return num1 * num2;
}

console.log(multiply()); // 60
```

```
for (var i=0;i<5;i++){
  setTimeout(() => {
    console.log(i);
  }, i*1000)
}

// Output: 5 5 5 5 5
```

```
for (let i=0;i<5;i++){
  setTimeout(() => {
    console.log(i);
  }, i*1000)
}

// Output: 0 1 2 3 4

```

```
var x = 23;
var fun = function(){
  console.log(x); // undefined
  var x = 43;
}
fun();
```

- Pramas and arguments

```
// params
function multiply(a, b) {
  console.log(a*b)
}
// arguments 
multiply(2, 3);
```

- Rest and spread operator

```
function sum(a , b){
  console.log(a, b); // 1 2
}

var arr = [1, 2, 3, 4, 5]

sum(...arr);
```

```
// rest operator "b" is became array in this case
function sum(a , ...b){
  console.log(a, b); // 1 2
}

var arr = [1, 2, 3, 4, 5]

sum(...arr); // spread operator

```
```
// SyntaxError: Rest parameter must be last formal parameter
function sum(a , ...b, c){
  console.log(a, b); // 1 2
}

var arr = [1, 2, 3, 4, 5]

sum(...arr); // spread operator

```

- Regular function and arrow function

```
function sum(){
  console.log("sum called"); 
}

const sum = () => {
  console.log("sum called")
}
```

- arguments in regular function and arrow function

```
function add(){
  console.log(arguments);
}

const add2 = () => {
  console.log(arguments); // Error: arguments is not defined.
}

add(1, 2, 3)
add2(1, 2, 3)

```
## Summary of this Behavior:
- In regular functions, this refers to the object that called the function. 
In this case, this refers to obj when calling obj.getName().
- In arrow functions, this is lexically bound to the scope in which the function was defined. 
In your case, it refers to the global object (window in browsers) when calling obj.getDetails()

```
const obj = {
  name: "Ankit",
  company: "IBM",
  getName: function() {
    console.log(this); // refers to the object 
  },
  getDetails: () => {
    console.log(this); // refers to the Global
  }
}

obj.getName() // this Refer to the object

let temp = obj.getName;
temp(); // refer to the global object
obj.getDetails();   // Arrow function call

```

# Scope and Closure
```
var num = 3;
// global scope
function local(){
  var x = 2;
  // local scope
}
```

```
// global scope
function subscribe() {
  // 1st inner scope
  var name = "Ankit yadav";
  function displayName() {
    // 2nd inner scope
    console.log(name);
  }
  displayName();
}
subscribe();
```

- Memoize with closure

```
function find(index) {
  let a = [];
  for (let i=0;i<1000000;i++){
    a[i] = i*i;
  }
  console.log(a[index]);
}
// let's update this with closure

function FindWithClosure() {
  let a = [];
  for (let i=0;i<1000000;i++){
    a[i] = i*i;
  }
  return function(index) {
    return a[index];
  }
}


let updatedFind = FindWithClosure();

console.time("6")
updatedFind(6);
console.timeEnd("6");

console.time("12")
updatedFind(12);
console.timeEnd("12");


```

- Only once polyfill

```
function once(fun, ...args) {
  let onlyOnce = true;
  return function(...args2){
    if (onlyOnce) {
      onlyOnce = false;
      fun.call(this, ...args, ...args2);
    }
    return  null;
  }
}



const print = once(function(a, b){
  console.log("Print function", a, b)
})

print(1, 2)
print()
print()
print()

```






















































































