## isPlainObject
 - An isPlainObject function in JavaScript checks whether a given value is a plain object, meaning it is created by the Object constructor or has null as its prototype.

```
function isPlainObject(value) {
    if (typeof value !== 'object' || value === null) {
        return false; // Not an object or is null
    }

    let proto = Object.getPrototypeOf(value); // Get the prototype
    return proto === null || proto === Object.prototype;
}

// Examples:
console.log(isPlainObject({})); // true
console.log(isPlainObject(new Object())); // true
console.log(isPlainObject(Object.create(null))); // true
console.log(isPlainObject([])); // false (Array is not a plain object)
console.log(isPlainObject(null)); // false
console.log(isPlainObject(new Date())); // false

```


