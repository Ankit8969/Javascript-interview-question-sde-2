
function get(obj, path){
  const arr = path.split(".");
  let currObj = structuredClone(obj); // deep clone
  for (let i=0;i<arr.length;i++) {
      if (currObj.hasOwnProperty(arr[i])) {
          currObj = currObj[arr[i]];
      }else {
          return undefined;
      }
  }
  return currObj ?? "Not Found";
}




// Example usage:
const obj = {
user: {
  profile: {
    name: 'Ankit',
    age: 25,
  },
},
};

console.log(get(obj, 'user.profile.name'));
console.log(get(obj, 'user.profile.address'));
console.log(get(obj, 'user.profile.age'));
console.log(get(obj, 'user.profile'));


