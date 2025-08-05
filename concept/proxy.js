/*
Proxy property we have to use in JS, only when we don't want to intercept the property
of the original Object and want to add something extra.
So, In this type of case we should think about Proxy.

*/


// I want to update the fontSizes which are deprecated, and I don't want to intercept the original object.
const deprecatedFontSizes = {
  xxl: {
    currentValue: "xxl",
    alternative: "l",
  },
  xl: {
    currentValue: "xl",
    alternative: "m",
  }
};


// This is my original object
const fontSizes = {
  xxl: "extra extra large",
  xl: "extra large",
  l: "large",
  m: "medium",
  s: "small",
  xs: "extra small",
};

const proxyOptions = {
  get: (target, prop, receiver) => {
    if (deprecatedFontSizes.hasOwnProperty(prop)) {
      console.warn(`Warning: ${prop} is deprecated, 
      instead use this ${deprecatedFontSizes[prop].alternative}`)
    }
    return Reflect.get(target, prop, receiver);
  }
}


const proxy = new Proxy(fontSizes, proxyOptions);

console.log(proxy.xxl);
console.log(proxy.xl);










////////////////////////////////////////////////
///// example - 2


const handler = {
  get: function(target, prop, receiver) {
    console.log(`Property ${prop} was accessed`);
    return Reflect.get(...arguments);
  },
  set: function(target, prop, value, receiver) {
    console.log(`Property ${prop} was set to ${value}`);
    return Reflect.set(...arguments);
  },
  deleteProperty: function(target, prop) {
    console.log(`Property ${prop} was deleted`);
    return Reflect.deleteProperty(target, prop);
  }
};

const target = { name: 'Alice', age: 30 };
const proxy = new Proxy(target, handler);

// Interactions with the proxy
console.log(proxy.name); // Logs: Property name was accessed
proxy.age = 31; // Logs: Property age was set to 31
delete proxy.name; // Logs: Property name was deleted

console.log(proxy);



