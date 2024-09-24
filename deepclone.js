
const person = {
  name: 'John Doe',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'New York',
    country: 'USA',
    postalCode: '10001',
    geoLocation: {
      lat: 40.7128,
      lon: -74.0060
    }
  },
  hobbies: ['reading', 'traveling', 'coding'],
  contactInfo: {
    phone: {
      home: '555-555-5555',
      work: '555-555-1234',
    },
    email: 'john.doe@example.com'
  }
};


function deepClone(obj) {
  if (typeof obj !== 'object' || Array.isArray(obj)) 
      return obj;

  let newObj = {};
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    newObj = {
      ...newObj,
      [key]: deepClone(obj[key])
    }
  })
  return newObj;
}


let obj = deepClone(person);

obj.address.street = 'ankit';
console.log(person);
console.log(obj);




