A cancelable promise in JavaScript allows you to cancel or reject the promise manually, even if the asynchronous operation it wraps hasn't finished. Here's how you can create a cancelable promise:


### CancelablePromise function

```
function cancelablePromise(promise) {
    let cancel;
    const wrappedPromise = new Promise((resolve, reject) => {
        cancel = () => reject(new Error("Promise canceled"));
        promise.then(resolve).catch(reject);
    });

    wrappedPromise.cancel = cancel;
    return wrappedPromise;
}

```

```
const myPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Completed");
    }, 5000); // Resolves after 5 seconds
});

const cancelable = cancelablePromise(myPromise);

cancelable
    .then((result) => {
        console.log("Result:", result);
    })
    .catch((error) => {
        console.error("Error:", error.message);
    });

// Cancel the promise after 2 seconds
setTimeout(() => {
    cancelable.cancel();
}, 2000);

```
