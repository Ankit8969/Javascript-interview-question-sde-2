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
