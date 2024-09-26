function compareDeepEqual(obj1, obj2) {
  if (typeof obj1 != 'object' || typeof obj1 === undefined)  
    return obj1 === obj2;

  if (Array.isArray(obj1)) {
    let len = obj1.length;
    let len2 = obj2.length;
    if (len !== len2) return false;
    for (let i=0;i<len;i++){
      if (!compareDeepEqual(obj1[i], obj2[i])) 
          return false;
    }
    return true;
  }

  const keys = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys.length !== keys2.length) return false;
  for (let i=0;i<keys.length;i++) {
    if (!compareDeepEqual(obj1[keys[i]], obj2[keys[i]])) return false;
  }

  return true;
}

const obj1 = {
  name: "John",
  age: 30,
  address: {
      city: "New York",
      street: {
          name: "5th Avenue",
          number: 123
      }
  },
  hobbies: ["reading", "travelling"]
};

const obj2 = {
  name: "John",
  age: 30,
  address: {
      city: "New York",
      street: {
          name: "5th Avenue",
          number: 123
      }
  },
  hobbies: ["reading", "travelling", "testing"]
};

if (compareDeepEqual(obj1, obj2)) {
  console.log("Both are deep equal");
}else {
  console.log("Both are not deep equal");
}




