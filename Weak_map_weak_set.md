# Weak Map() and Weak Set()

## WeakMap
A WeakMap is a collection of key-value pairs where the keys must be objects (not primitive types). The main feature of WeakMap is that if no other references to the key object exist, the entry is automatically removed from the WeakMap. This prevents memory leaks when working with temporary objects.

## Key Features:
- Keys must be objects: Unlike a regular Map, keys cannot be primitive values (e.g., strings or numbers).
- Garbage Collection: If the key object is no longer referenced elsewhere, the entry will be automatically removed from the WeakMap and garbage collected.
- Non-iterable: You cannot iterate over WeakMap because it is not enumerable (no methods like forEach, keys(), values(), etc.). This is due to its weak reference nature.

## Common Methods:
- weakMap.set(key, value): Adds a key-value pair.
- weakMap.get(key): Returns the value associated with the key.
- weakMap.has(key): Returns true if the key exists in the map.
- weakMap.delete(key): Removes the key-value pair.


```
let obj = {name: "John"};

let weakMap = new WeakMap();
weakMap.set(obj, "Employee Data");

console.log(weakMap.get(obj)); // "Employee Data"

obj = null; // The object is no longer referenced
// At this point, the entry in WeakMap will be garbage collected automatically.
```
## WeakSet
A WeakSet is a collection where each item must be an object. Like WeakMap, it holds weak references to objects, allowing garbage collection when no other references exist.

## Key Features:
- Elements must be objects: Only objects can be added to a WeakSet, not primitives.
- Garbage Collection: If an object added to the WeakSet no longer has references elsewhere, it will be garbage collected.
- Non-iterable: You cannot iterate over WeakSet because it is not enumerable.

## Common Methods:
- weakSet.add(value): Adds an object to the WeakSet.
- weakSet.has(value): Returns true if the object exists in the set.
- weakSet.delete(value): Removes the object from the set.

```
let obj1 = {name: "John"};
let obj2 = {name: "Jane"};

let weakSet = new WeakSet();
weakSet.add(obj1);
weakSet.add(obj2);

console.log(weakSet.has(obj1)); // true

obj1 = null; // The object is no longer referenced
// The obj1 will be garbage collected and removed from the WeakSet
```





