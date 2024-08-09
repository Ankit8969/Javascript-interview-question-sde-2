
function fetchDetails() {
  return new Promise((resolve, reject) => {
    const x = Math.random() * 10; // >=0 and < 10
    if (x < 5) {
      // success 
      resolve("DONE")
    }else {
      reject("Failed");
    }
  })
}

async function retryPromise(promise, nthTry) {
  try {
    const data = await promise();
    return data;
  }catch(err) {
    if (nthTry === 0) {
      return Promise.reject(err);
    }
    return retryPromise(promise, nthTry - 1);
  }
}

// let's suppose we can call 3 times;
async function fetchDataWithAutoRetry() {
  const prom1 = retryPromise(fetchDetails, 5);
  const prom2 = retryPromise(fetchDetails, 5);
  const prom3 = retryPromise(fetchDetails, 5);
  const prom4 = retryPromise(fetchDetails, 5);

  try {
    const promiseArr = [prom1,prom2,prom3,prom4]
    const result = await Promise.all(promiseArr);
    console.log(result);
  }catch(err) {
    console.error(err);
  }
}

fetchDataWithAutoRetry();







