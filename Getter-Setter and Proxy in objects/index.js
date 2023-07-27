// Proxy 

let target = {
  name: "John",
  age: 30
};

let handler = {
  get: function (target, property) {
    console.log("Proxy-property", property);
    target.age++;
    return target[property];
  },
  set: function (target, property, value) {
    target[property] = value;
  }
};

target = new Proxy(target, handler);
console.log("Proxy value ", target.age);
console.log("Proxy value ", target.age);
console.log("Proxy value ", target.age);
console.log("Proxy value ", target.age);

console.log(target.age);




// Getter and Setter

const obj = {
  _age: 30,

  // Setter for age property
  set age(value) {
    if (value >= 0 && value <= 120) {
      this._age = value;
    } else {
      console.error('Invalid age value');
    }
  },

  // Getter for age property
  get age() {
    return this._age;
  }
};

console.log(obj.age); // Output: 30

// Assigning a new value using the setter
obj.age = 25; // Valid assignment
console.log(obj.age); // Output: 25

// Invalid assignment using the setter
obj.age = 150; // Output: "Invalid age value"
console.log(obj.age); // Output: 25 (age remains unchanged)
