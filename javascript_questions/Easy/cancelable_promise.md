A cancelable promise in JavaScript allows you to cancel or reject the promise manually, even if the asynchronous operation it wraps hasn't finished. Here's how you can create a cancelable promise:


### CancelablePromise function
```
function cancelablePromise(prom) {
  let cancel;
  let hasCanceled = false;
  let updatedPromise = new Promise((resolve, reject) => {
    prom
      .then((res) => {
        if (hasCanceled) return;
        resolve(res);
      })
      .catch((err) => {
        if (hasCanceled) return;
        reject(err);
      });
    cancel = () => reject("Rejecting the promise");
  });

  updatedPromise.cancel = cancel;
  return updatedPromise;
}

let prom = new Promise((resolve, reject) => setTimeout(resolve, 2000, "Done"));

let updatedProm = cancelablePromise(prom);
updatedProm.then(console.log).catch(console.log);

updatedProm.cancel();
```


### Cancelable Promise with Timeout

```

// cancelablePromise with timeout

function cancelablePromise(prom, timeout) {
  return new Promise((resolve, reject) => {
    let hasCancelled = false;
    let timerId = setTimeout(() => {
      hasCancelled = true;
      reject("Cancelling the promise, due to timeout");
    }, timeout);

    Promise.resolve(prom)
      .then((res) => {
        if (hasCancelled) return;
        clearTimeout(timerId);
        hasCancelled = true;
        resolve(res);
      })
      .catch((err) => {
        if (hasCancelled) return;
        clearTimeout(timerId);
        hasCancelled = true;
        reject(err);
      });
  });
}

let prom = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("resolved");
  }, 5000);
});

cancelablePromise(prom, 4000)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("Err: ", err);
  });

```
