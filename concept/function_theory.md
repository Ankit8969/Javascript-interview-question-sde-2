
## function statement 

```
function a(){
  console.log("a called");
}
a();
```

## function expression 
```
var b = function() {
  console.log("b called");
}
b();
```
- main difference b/w above two is "hoisting";


##  anonymous Function 
```
//Function without name
// function() {

// }
```
- anonymous function we have to use where we have to use the function to a value


## Named function expression
```
var c = function xyz(){
  console.log("c called");
  console.log(xyz);
}

c();
```

## parameter and argument
```
function add(param1, param2){
  console.log(param1 + param2);
}
// arg1, arg2
add(2, 3);
```

## First class function / First class citizens.
- It means, when we can treat function as a variable, that is know as First class function
-  we can pass to the function
-   we can return
-   Summaries: whatever we can do with the variable.


## Arrow function 
```
var x = () => {
  console.log("x called");
}
x();
```












