## JavaScript Prototype
In JavaScript, prototypes are the mechanism by which objects inherit from one another. 

## What is a Prototype?
- Every JavaScript object has an internal property called [[Prototype]].
- This property links the object to another object, called its prototype.
- If you attempt to access a property or method on an object and it is not found, the engine looks for it in the object's prototype, and then in the prototype's prototype, and so on (this is called the prototype chain).

```
function multipleBy5(num){

    return num*5
}

multipleBy5.power = 2

console.log(multipleBy5(5));
console.log(multipleBy5.power);
console.log(multipleBy5.prototype);

function createUser(username, score){
    this.username = username
    this.score = score
}

createUser.prototype.increment = function(){
    this.score++
}
createUser.prototype.printMe = function(){
    console.log(`price is ${this.score}`);
}

const chai = new createUser("chai", 25)
const tea = createUser("tea", 250)

chai.printMe()
```

## About New Keyword
- Here's what happens behind the scenes when the new keyword is used:
- A new object is created: The new keyword initiates the creation of a new JavaScript object.
- A prototype is linked: The newly created object gets linked to the prototype property of the constructor function. This means that it has access to properties and methods defined on the constructor's prototype.
- The constructor is called: The constructor function is called with the specified arguments and this is bound to the newly created object. If no explicit return value is specified from the constructor, JavaScript assumes this, the newly created object, to be the intended return value.
- The new object is returned: After the constructor function has been called, if it doesn't return a non-primitive value (object, array, function, etc.), the newly created object is returned.

```
// let myName = "hitesh     "
// let mychannel = "chai     "

// console.log(myName.trueLength);


let myHeros = ["thor", "spiderman"]


let heroPower = {
    thor: "hammer",
    spiderman: "sling",

    getSpiderPower: function(){
        console.log(`Spidy power is ${this.spiderman}`);
    }
}

Object.prototype.hitesh = function(){
    console.log(`hitesh is present in all objects`);
}

Array.prototype.heyHitesh = function(){
    console.log(`Hitesh says hello`);
}

// heroPower.hitesh()
// myHeros.hitesh()
// myHeros.heyHitesh()
// heroPower.heyHitesh()

// inheritance

const User = {
    name: "chai",
    email: "chai@google.com"
}

const Teacher = {
    makeVideo: true
}

const TeachingSupport = {
    isAvailable: false
}

const TASupport = {
    makeAssignment: 'JS assignment',
    fullTime: true,
    __proto__: TeachingSupport
}

Teacher.__proto__ = User

// modern syntax
Object.setPrototypeOf(TeachingSupport, Teacher)

let anotherUsername = "ChaiAurCode     "

String.prototype.trueLength = function(){
    console.log(`${this}`);
    console.log(`True length is: ${this.trim().length}`);
}

anotherUsername.trueLength()
"hitesh".trueLength()
"iceTea".trueLength()
```




```
function Car(name, price) {
  this.name = name;
  this.price = price;
}

Car.prototype.wheel = function (){
  return 4;
}

let nexon = new Car("Tata Nexon", "12000$");
console.log(nexon);
console.log(nexon.wheel());
```


```
let school = {
  name: "abc",
  fees: 23423,
}

let student = {
  naughty: false
}

let temp = Object.create({...school, ...student})
Object.create the prototype for "temp" object.

```

```
const user = {}

// Get the prototype of the user object
Object.getPrototypeOf(user)

// Change the prototype of the scores array. This is like switching ancestry and should be done with great care.
Object.setPrototypeOf(user, Car.prototype)
Object.setPrototypeOf(user, {
  school: "IBM"
})
// Check the prototype of scores now
console.log(user)
```
