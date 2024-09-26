
const obj = {
  name: "John",
  age: 30,
  hobbies: ["reading", "gaming"],
  isStudent: false,
  details: {
    city: "New York",
    country: "USA",
    details: {
      city: "New York",
      country: "USA",
      mob: 234234234,
    }
  },
  add: [
    {
      name:"Ankit",
      lastName:"yadav"
    },
    "ankit",
    23423423
  ]
};

// number, string, array, object, 
// boolean


function customImplementation(obj) {
  if (typeof obj === undefined || obj === null) return null;
  console.log(obj);

  if (typeof obj === "string")  return `"${obj}"`;

  if (typeof obj === 'number' || typeof obj === 'boolean')
    return String(obj);

  if (Array.isArray(obj)) {
    const arr = obj.map((item) => customImplementation(item)).join(',');
    return `[${arr}]`;
  }

  if(typeof obj === "object") {
    const keys = Object.keys(obj);
    let res = [];
    for (let i=0;i<keys.length;i++){
      res.push(`"${keys[i]}":${serialize(obj[keys[i]])}`);
    }
    return `{${res.join(',')}}`;
  }
  return undefined;
}

console.log(customImplementation(obj));

