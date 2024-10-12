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
