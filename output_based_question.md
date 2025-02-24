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

## Object, based question

```
const user = {
  name: "Ankit yadav",
  age: 25,
}
user.name = "Name updated";
delete user.age;
console.log(user);
{
 name:"Ankit yadav"
}
```

```
const func = (function (a) {
  delete a;
  return a;
})(5);
console.log(func); // 5

// delete won't affect because it only works with object.
```
```

const obj = {
  name: "Ankit",
  getDetails1: function(){
      console.log(this.name);  # Refers - obj
  },
  getDetails2: ()=>{
      console.log(this); # Refer - window
  },
  add: {
      name:"Bangalore",
      getAdd: function(){
          console.log(this.name); // Refer -> add obj
          const getAdd2= ()=>{
            console.log(this); // Refer to add
          }
          getAdd2();
      },
      getAdd2: ()=>{
        console.log(this); // Refer to Window
      }
  }
}

obj.getDetails1();
obj.getDetails2();

obj.add.getAdd();
obj.add.getAdd2();
```



## Object iteration

```
const user = {
  name: "Ankit",
  age: 25,
  company: "IBM"
}

for (const key in user){
  console.log(key, user[key])
}
```

```
let obj = {
  a: "one",
  b: "two",
  a: "three"
}

console.log(obj);
// It will replace the first one.
{
  a: "three"
  b: "two",
}

```

- [Object-Object]
```
const a = {};
const b = {key : "b"}
const c = { key: "c" }

a[b] = 23;
a[c] = 54;

// If we pass Object as a key
// it is considered that keys is like this [Object Object]

console.log(a[b]);
```

```
console.log([..."Ankit"]) // ['A', 'n', 'k', 'i', 't']
```

```
const user = { name: "Ankit", age: 23 }
const admin = { admin: true, ...user };

console.log(admin);
{
    "admin": true,
    "name": "Ankit",
    "age": 23
}
```

- Order matters in Object
```
const user = { name: "Ankit", age: 23 }
const admin = { admin: true,name: "Rohan", ...user };

console.log(admin);
{
  "admin": true,
  "name": "Ankit",
  "age": 23
}

const user = { name: "Ankit", age: 23 }
const admin = { admin: true, ...user, name: "Rohan" };

console.log(admin);
{
  "admin": true,
  "name": "Rohan",
  "age": 23
}

```

- JSON stringify

```
const setting = {
  userName: "Ankit",
  level: 23,
  health: 54,
}

// It will only stringify "level" and "health".
const data = JSON.stringify(setting, ["level", "health"]);
console.log(data);
```

```
let c = {
  greeting: "Hey!"
}
let d;
d = c;
c.greeting = "Hello";
console.log(d.greeting) // Hello
```


```
console.log( { a: 1} == { a: 1} ) // false
console.log( { a: 1} === { a: 1} ) // false

let a1 = {a : 2}
let a2 = a1;
console.log(a1 == a2); // true
```
- The person variable and the object { name: "Ankit" } it points to are stored in different memory locations in JavaScript. Here's an explanation:

1. Memory for the Object ({ name: "Ankit" }):
The object { name: "Ankit" } is stored in heap memory. The heap is where JavaScript stores objects and arrays because their size can vary dynamically.
When you create an object using { name: "Ankit" }, JavaScript allocates memory in the heap to store that object.
2. Memory for the person Variable:
The person variable itself is stored in stack memory. The stack is used for static allocations, like variables and function calls.
The person variable holds a reference (or pointer) to the object in heap memory, not the object itself.

```
let person = {
  name: "Ankit"
}
const members = [person];
person = null;
console.log(members);

[
  {
    name: "Ankit"
  }
]

```

## "this" keyword in JS

```
console.log(this); // Global
```

```
function sum(){
  var x = 2;
  let y = 3;
  console.log(this); // Global
}

sum();

const sum2 = () => {
  console.log(this); // Global
}
sum2();
```


```
this.a = 5;
const getParam = function(){
  console.log(this);  // window
  console.log(this.a) // 5
}
getParam();
```

```
this.a = 5;
const getParam = ()=>{
  console.log(this);  // window
  console.log(this.a) // 5
}
getParam();
```

```
let user = {
  name: "Ankit",
  age: 24,
  getDetails: {
    newName: "Sonu",
    getMore: function(){
      console.log(this);
    }
  }
}

user.getDetails.getMore(); // point to the getDetails object
```


```

let user = {
  name: "Ankit",
  age: 24,
  getDetails: () => {
    console.log(this);
  },
  getDetails2: function() {
    const nestedFunction = () => console.log(this);
    nestedFunction();
  },
  getDetails3: function (){
    console.log(this);
  },
  getDetails4: () => {
    const getDetails5 = () => console.log(this);
    getDetails5();
  }
}

user.getDetails(); // Window
user.getDetails2(); // User
user.getDetails3(); // User 
user.getDetails4(); // Window

```


```
const user = {
  firstName: "Ankit",
  getName: function(){
    const firstName = "Yadav";
    console.log(this.firstName);
  }
}

user.getName(); // Ankit
```


## Promise related Output based question

- Synchronous code
```
console.log("Hey") 

console.log("we are going to")

console.log("learn synchronization")

Output: Hey we are going to learn synchronization
```
- Asynchronous code
```
console.log("start")

setTimeout(() =>{
  console.log("Mid")
}, 1000);

console.log("END");

output: Start END Mid
```

```
console.log("Start")

function getData(cb) {
  setTimeout(() => {
    cb("Ankit");
  }, 1000);
}

const message = getData((name)=>{
  console.log(name);
});

console.log("END");

// Output: Start END Ankit
```

```
console.log("Start");

const temp = Promise.resolve("DONE");
console.log(temp);

console.log("END")

// Output: Start Promise End

```

```
console.log("Start");

Promise.resolve("DONE").then((res) => {
  console.log(res);
})

console.log("END")
// Output: Start, END DONE
```

```
console.log("Start")

const promise1 = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
})

promise1.then((res) => {
  console.log(res);
})

console.log("End");

Output: 
Start
1
End
2

because Even, in the promise if any synchronous code is present It will execute first.
```



```
console.log("Start")

const promise1 = new Promise((resolve, reject) => {
  console.log(1);
})

promise1.then((res) => {
  console.log(res);
})

console.log("End");

Output: 
Start
1
End


In this example, then block will not get executed because we haven't resolved.
```

```

console.log("Start")

const fn = () => 
    new Promise((resolve, reject) => {
      console.log(1);
      resolve("Success");
    })

console.log("Middle")
fn().then((res) => {
  console.log(res);
})

console.log("End");

Output:
Start
Middle
1
End
Success
```


```

function job() {
  return new Promise((resolve, reject) => {
    reject('');
  })
}

const promise = job();
promise
.then(() => {
  console.log("Success 1")
})
.then(() => {
  console.log("Success 2")
})
.then(() => {
  console.log("Success 3")
})
.then(() => {
  console.log("Success 4")
})
.catch(() => {
  console.log("Error")
})
.then(() => {
  console.log("Success 5")
})
.then(() => {
  console.log("Success 6")
})
.finally(() => {
  console.log("Finally Success - 8")
})
.finally(() => {
  console.log("Finally Success - 9")
})
.then(() => {
  console.log("Success 7")
})

Output:

Error
Success 5
Success 6
Finally Success - 8
Finally Success - 9
Success 7
```



















































