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
