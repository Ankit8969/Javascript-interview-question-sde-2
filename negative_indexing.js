let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// console.log(arr[0])
// console.log(arr[-1])
// console.log(arr[-2])


const handler = {
  get: (a, b, c) => {
    const n = a.length;
    const ind = Number(b);
    if (ind < 0) {
      return a[n + ind];
    }else
      return a[ind];
  },
}

const temp = new Proxy(arr, handler);
console.log(temp[0]) // 1
console.log(temp[1]) // 2
console.log(temp[-1]) // 10
console.log(temp[-2]) // 9


