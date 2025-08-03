
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
  if (typeof obj === 'string') return obj;
  if (typeof obj === 'number') return obj;
  if (typeof obj === 'boolean') return obj;

  if (Array.isArray(obj)) {
    const res = obj.map((item) => deepClone(item));
    return res;
  }

  if (typeof obj === 'object') {
    let result = {};
    let keys = Object.keys(obj);
    for (let i=0;i<keys.length;i++) {
      result = {
        ...result,
        [keys[i]]: deepClone(obj[keys[i]])
      }
    }
    return result;
  }
}

let temp = deepClone(person);
// temp.name = "res";
console.log(temp);

