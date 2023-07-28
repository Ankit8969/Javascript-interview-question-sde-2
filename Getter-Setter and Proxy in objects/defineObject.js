// Proxy 
let obj = {
  a: 1,
  b: 2
};

obj = new Proxy(obj, {
  get(target, property) {
    target[property]++;
    return target[property];
  }
});

console.log("A", obj.a);
console.log("B", obj.b);

// Define Property

Object.defineProperty(obj, "c", {
  get() {
    return this.a + 1;
  }
});

console.log("C ", obj.c);
