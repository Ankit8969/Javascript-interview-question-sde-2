# SetInterVal Polyfill

```

function mySetInterval(cb, delay, ...args) {
  if (typeof cb !== "function") throw new Error("Callback must be a function");
  if (delay < 0) throw new Error("Delay must be greater than zero");

  let timerId = parseInt(Math.random() * 100);
  let startTimer = Date.now();

  function handler() {
    let current = Date.now();
    if (current - startTimer >= delay) {
      cb(...args);
      startTimer += delay;
    }
    requestAnimationFrame(handler);
  }
  requestAnimationFrame(handler);

  return timerId;
}
```
```

mySetInterval(
  (...args) => {
    console.log("Timer is execting after delay: ", ...args);
  },
  2000,
  1,
  2
);
```