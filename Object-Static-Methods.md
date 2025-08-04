# About Object

### Object.assign
It is used to copy the properties of object

### Object.create
It is used to set the prototype of object.


## Shallow copy and Deep copy


***Shallow Clone -> only direct child value, won't get change others will get change***

```
// Ways to do Deep Clone
const ingredientsList = ["noodles", { list: ["eggs", "flour", "water"] }];
const ingredientsListDeepCopy = JSON.parse(JSON.stringify(ingredientsList));
const ingredientsShallowCopy = structuredClone(ingredientsList)
```
---

###  Object.assign()
- It also does the Shallow Copy, for deep copy use above Methods.
```
const obj1 = { a: 0, b: { c: 0 } };
const obj2 = Object.assign({}, obj1);

obj1.a = 1;
console.log(obj1); // { a: 1, b: { c: 0 } }
console.log(obj2); // { a: 0, b: { c: 0 } }

obj2.b.c = 3;
console.log(obj1); // { a: 1, b: { c: 3 } }
console.log(obj2); // { a: 2, b: { c: 3 } }
```

### Object.create()
The Object.create() static method creates a new object, using an existing object as the prototype of the newly created object.

```
// Second one is optional, 

let obj1 = Object.create({},{
    foo: {
        value: 'ankit',
        enumerable: true,
        writable: false,
        configurable: true,
    },
    bar: {
        value: 'Sonu',
        enumerable: true,
        writable: false
    }
})

console.log(obj1)
```

### Object.defineProperties()

```
Object.defineProperty({}, {
    key: {
        value:"test",
        enumerable: Boolean,
        editable: Boolean,
        get: ()=>{},
        set: (value)=>{},
        configurable: Boolean,
    }
})
```

```
const person = {
  isHuman: false,
};
```

- By using this defineProperties, you can do "get" and "set" the value.


### Why we need to use _name , why we can't directly use 'this.name'
Anser of the Line number this._name = value;

- When using getters and setters in JavaScript, you need an internal property to store the actual value. This internal property is usually prefixed with 
an underscore (e.g., _name) to distinguish it from the public property (e.g., name). 
- This prevents an infinite loop that would occur if you tried to directly get or set the same property within its own getter or setter.

```
Object.defineProperties(person,{
    name: {
        enumerable: true,    // true -> you can see the property, otherwise can't.
        get: function() {
          console.log("getter called");
          console.log(this);
          return this._name;
        },
        set: function(value) {
          console.log("setter called");
          this._name = value;
        }
    }
})
person.name = 'update-name'
console.log(person.name)
```

### Object.defineProperty()
---

### Object.Freeze Implementation
```
let obj = {
    name: "Ankit",
    age: 25,
    school: {
        name:"srsvm"
    }
}


function myFreeze(obj) {
    Object.keys(obj).forEach((key) => {
        Object.defineProperty(obj, key, {
            writable: false // true -> you can edit other wise don't
        })
    })
}

myFreeze(obj);
obj.name = 'sonu'
obj.school.name = 'makaut'
console.log(obj);

```

### Object.entries()

```
const object1 = {
  a: 'somestring',
  b: 42,
};

console.log(Object.entries(object1))   // [ [ 'a', 'somestring' ], [ 'b', 42 ] ]
```

### Object.freeze()

- The Object.freeze() static method freezes an object.
- Freezing an object prevents extensions and makes existing properties non-writable and non-configurable.
- A frozen object can no longer be changed: new properties cannot be added, existing properties cannot be removed, their enumerability, configurability, writability, 
or value cannot be changed, and the object's prototype cannot be re-assigned. freeze() returns the same object that was passed in.

```
const obj = {
  prop: 42,
};

Object.freeze(obj);

obj.prop = 33;
// Throws an error in strict mode

console.log(obj.prop);
// Expected output: 42
```

### Object.fromEntries()
The Object.fromEntries() static method transforms a list of key-value pairs into an object.

```
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42],
]);

const obj = Object.fromEntries(entries);

console.log(obj);
// Expected output: Object { foo: "bar", baz: 42 }
```


### Object.getOwnPropertyDescriptor()

```
const object1 = {
  property1: 42,
};


const descriptor1 = Object.getOwnPropertyDescriptor(object1, 'property1');
console.log(descriptor1); 

{ value: 42, 
  writable: false, 
  enumerable: true, 
  configurable: false 
}
```


### Object.groupBy()
```
const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 5 },
  { name: "bananas", type: "fruit", quantity: 0 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 5 },
  { name: "goat", type: "meat", quantity: 22 },
];

function myCallback(quantity) {
  return quantity.type;
}

const result2 = Object.groupBy(inventory, myCallback);
console.log(result2);
```











