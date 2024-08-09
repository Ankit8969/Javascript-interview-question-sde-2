

const deepClone = (obj) => {
  if (typeof obj !== "object")  return obj;

  const newObject = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    const value = obj[key];
    newObject[key] = deepClone(value);
  }
  return newObject;
}

let arr = {
  name:"Ankit",
  age:"25"
};
let deepArray = deepClone(arr);

arr.name = 'rohan';
console.log(arr);
console.log(deepArray);

