# Polyfills

eg: 
```
let obj = {
    name: "Ankit",
    age: 25,
    getDetails: function(){
        console.log(this.name + " " + this.age)
    }
}
let obj2 = {
    name:"Sonu",
    age: 27
}
```

## Polyfill of call function
```
Function.prototype.myCall = function(context={}, ...args) {
    if (typeof this !== 'function') {
        throw new Error(`${this} must be a function`);
        return ;
    }
    
    context.fun = this;
    context.fun(...args);
}

// obj.getDetails.myCall(obj);
// obj.getDetails.myCall(obj2);
```

## Polyfill of Apply function
```
Function.prototype.myApply = function(context={}, args = []) {
    if (typeof this !== 'function') {
        throw new Error(`${this} must be a function`);
        return ;
    }
    
    context.fun = this;
    context.fun(...args);
}


// obj.getDetails.myApply(obj);
// obj.getDetails.myApply(obj2);
```

## Polyfill of Bind function

```
Function.prototype.myBind = function(context={}, ...args){
    if (typeof this !== 'function') {
        throw new Error(`${this} must be a function`);
        return ;
    }
    
    context.fun = this;
    return function(...newArgs) {
        return context.fun(...args, ...newArgs);
    }
}

let temp = obj.getDetails.myBind(obj2);
temp();
temp.call(obj);
```


# Promises polyfills
- All the promse methods run parallely
![image](https://github.com/user-attachments/assets/6090152c-70f3-4891-8185-c2bfc44f41d9)


## promiseArr which we are going to use
```
const prom1 = new Promise((resolve, reject) => {
  resolve("promise 1 resolved")
})

const prom2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "promise 2 resolved");
})

const prom3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1500, "promise 3 resolved");
})

const prom4 = new Promise((resolve, reject) => {
  setTimeout(reject, 2000, "promise 4 reject");
})

const promiseArr = [prom1, prom2, prom3, prom4];
```


## Promise.all()
- The Promise.all() static method takes an iterable of promises as input and returns a single Promise.
- This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), with an array of the fulfillment values. It rejects when any of the input's promises rejects, with this first rejection reason.
- It runs parallely

```
function promiseAll(promiseArr) {
  let len = promiseArr.length;
  let ansArr = [];
  return new Promise(async (resolve, reject) => {
    for (let i=0;i<len;i++) {
      Promise.resolve(promiseArr[i])
        .then((result) => {
          ansArr[i] = result;
          if (ansArr.length === len){
            resolve(ansArr);
          }
        })
        .catch((err) => {
          reject(err);  // Reject immediately if any promise fails
        });
    }
  })
}

promiseAll(promiseArr)
.then((res)=> {
  console.log(res);
}).catch((err) => {
  console.error(err);
})

```

## Promise.allSettled()
- The Promise.allSettled() static method takes an iterable of promises as input and returns a single Promise.
- This returned promise fulfills when all of the input's promises settle (including when an empty iterable is passed), with an array of objects that describe the outcome of each promise.

## When the promised resolved
```
{ status: "fulfilled", value: 3 }
```
## When the promise rejected.
```
{ status: "rejected", reason: "foo" }
```

```
function promiseAllSettled(promiseArr) {
  let len = promiseArr.length;
  let ansArr = new Array(len);  // Initialize with the correct length
  let doneCount = 0;

  return new Promise((resolve) => {
    for (let i = 0; i < len; i++) {
      Promise.resolve(promiseArr[i])
        .then((result) => {
          ansArr[i] = { status: "fulfilled", value: result };
        })
        .catch((err) => {
          ansArr[i] = { status: "rejected", reason: err };
        })
        .finally(() => {
          doneCount++;
          if (doneCount === len) {
            resolve(ansArr);  // Resolve once all promises are settled
          }
        });
    }
  });
}

promiseAllSettled(promiseArr)
.then((res)=> {
  console.log(res);
}).catch((err) => {
  console.error(err);
})
```

### Output
```
[
    {
        "status": "fulfilled",
        "value": "promise 1 resolved"
    },
    {
        "status": "fulfilled",
        "value": "promise 2 resolved"
    },
    {
        "status": "fulfilled",
        "value": "promise 3 resolved"
    },
    {
        "status": "fulfilled",
        "value": "promise 4 resolved"
    }
]
```


## Promise.any()
- The Promise.any() static method takes an iterable of promises as input and returns a single Promise.
- This returned promise fulfills when any of the input's promises fulfills, with this first fulfillment value.
- It rejects when all of the input's promises reject (including when an empty iterable is passed), with an AggregateError containing an array of rejection reasons.

```
function promiseAny(promiseArr) {
  let len = promiseArr.length;
  let rejectCount = 0;
  let errors = [];

  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; i++) {
      Promise.resolve(promiseArr[i])
        .then((result) => {
          resolve(result); // Resolve with the first successful promise
        })
        .catch((err) => {
          errors[i] = err; // Collect the errors
          rejectCount++;
          if (rejectCount === len) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    }
  });
}


promiseAny(promiseArr)
.then((res)=> {
  console.log(res);
}).catch((err) => {
  console.error(err);
})
```


## Promise.race()
- The Promise.race() static method takes an iterable of promises as input and returns a single Promise. This returned promise settles with the eventual state of the first promise that settles.

```
function promiseRace(promiseArr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseArr.length; i++) {
      Promise.resolve(promiseArr[i])
        .then(resolve)
        .catch(reject);
    }
  });
}


promiseRace(promiseArr)
.then((res)=> {
  console.log(res);
}).catch((err) => {
  console.error(err);
})

```












