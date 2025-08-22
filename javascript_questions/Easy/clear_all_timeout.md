# implement clearAllTimeout()

```
setTimeout(func1, 10000)
setTimeout(func2, 10000)
setTimeout(func3, 10000)
// all 3 functions are scheduled 10 seconds later
clearAllTimeout()
// all scheduled tasks are cancelled.
```

## Solution

```
/**
 * cancel all timer from window.setTimeout
 */
function clearAllTimeout() {
  // your code here
  let id = setTimeout(() => {}, 0); // Get the last timeout ID
  while (id > 0) {
    clearTimeout(id); // Clear all timeouts up to the last ID
    id--;
  }
}
```

## Other way to handle this
```
// IIFE

(()=>{
  let timerIds = [];
  let originalSetTimeout = globalThis.setTimeout;
  globalThis.setTimeout = function(cb, timer, ...args) {
      let id = originalSetTimeout(cb, timer, ...args);
      timerIds.push(id);
      return id;
  };
  
  globalThis.clearAllTimeout = function() {
      timerIds.forEach((item) => {
          clearTimeout(item);
      })
  }
})();


let timer1 = setTimeout(()=>{
  console.log("one")
},100);

let timer2 = setTimeout(()=>{
  console.log("two")
},200);

globalThis.clearAllTimeout();
let timer3 = setTimeout(()=>{
  console.log("three");
},300);
```
