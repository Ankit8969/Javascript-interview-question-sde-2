const target = {
  message1: "hello",
  message2: "everyone",
};

const handler2 = {
  get(target, prop, receiver) {
    if (prop === "message1") {
      return "Proxy Message";
    }
    return Reflect.get(target, prop, receiver);
  },
};

const proxy2 = new Proxy(target, handler2);

console.log(proxy2.message1);  // Output: "Proxy Message"
console.log(proxy2.message2);  // Output: "everyone"
console.log(proxy2);           // Output: Proxy {message1: "hello", message2: "everyone"}


/*

get Trap: The get trap intercepts property access. It checks if the property being accessed is message1. 
If so, it returns "Proxy Message". Otherwise, it uses Reflect.get to get the property value from the target object.

Reflect.get: This is used to get the property value from the target object in a standard way, ensuring that the default
behavior is preserved for properties other than message1.



*/
