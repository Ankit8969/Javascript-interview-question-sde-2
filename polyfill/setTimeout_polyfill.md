# SetTimeout Polyfill

Before directly jumping on the implementation, we need to understand the ```requestAnimationFrame```.

## requestAnimationFrame

### 🚀 What is requestAnimationFrame in JavaScript?
- requestAnimationFrame is a browser API that tells the browser:
```
“Hey, I want to perform an animation — call this function before the next repaint/frame.”
```
It’s a smart way to create smooth animations that are synchronized with the browser's refresh rate (usually 60 FPS).

| Feature    | Explanation |
| -------- | ------- |
| Optimized by Browser  | The browser controls when to call your function for smooth animations.    |
| Runs at 60fps (if possible) | Calls your function ~60 times per second, but pauses if tab is inactive.     |
| Better than setTimeout / setInterval for animations    | No frame-skips, no unnecessary CPU/GPU load.    |
| Returns an ID    | You can use it with cancelAnimationFrame() to stop the animation.    |


Example
---
```
function animate() {
    // Update position, rotation, size, etc.
    console.log('Animating...');

    // Schedule next frame
    requestAnimationFrame(animate);
}

// Start the loop
requestAnimationFrame(animate);

```


Note: ***If the tab is inactive, the browser will pause requestAnimationFrame to save CPU.***

Now, we can start implementing the setTimeOut

```
function mySetTimeout(cb, delay, ...args) {
  if (typeof cb !== "function") throw new Error("Callback must be a function");
  if (delay < 0) throw new Error("Delay must be greater than zero");

  let timerId = parseInt(Math.random() * 100);
  let startTimer = Date.now();

  function handler() {
    let current = Date.now();
    if (current - startTimer >= delay) {
      return cb(...args);
    } else requestAnimationFrame(handler);
  }
  requestAnimationFrame(handler);

  return timerId;
}
```

```
mySetTimeout(
  (...args) => {
    console.log("Timer is execting after delay: ", ...args);
  },
  2000,
  1,
  2
);
```
