/*
Promisify in JavaScript refers to converting a function that uses callbacks (typically in the "error-first" style) 
into a function that returns a Promise.

*/


function add(cb, ...args) {
  const sum = args.reduce((prev, curr) => {
    return prev + curr;
  }, 3)
  setTimeout(()=>{
    cb(sum);
  }, 1000)
}

//  add(console.log, 1, 2, 3)

function promisify(fun) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fun(resolve, ...args);
    })
  }
}

const promisifiedFun = promisify(add, 1, 2, 3);
promisifiedFun()
.then((res) => {
  console.log(res);
})
