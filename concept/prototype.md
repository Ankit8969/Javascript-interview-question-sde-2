## JavaScript Prototype
In JavaScript, prototypes are the mechanism by which objects inherit from one another. 

## What is a Prototype?
- Every JavaScript object has an internal property called [[Prototype]].
- This property links the object to another object, called its prototype.
- If you attempt to access a property or method on an object and it is not found, the engine looks for it in the object's prototype, and then in the prototype's prototype, and so on (this is called the prototype chain).

```


function Animal(name) {
  this.name = name;
}

Animal.prototype.sayName = function () {
  console.log(`My name is ${this.name}`);
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);

Dog.prototype.bark = function () {
  console.log('Woof!');
};

let fido = new Dog('Fido', 'Labrador');
fido.bark(); // "Woof!"
fido.sayName(); // "My name is Fido"

```