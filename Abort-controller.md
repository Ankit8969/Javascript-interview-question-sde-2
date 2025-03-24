AbortController is a built-in JavaScript API that allows you to cancel fetch requests, event listeners, or any other asynchronous tasks that support the 
AbortSignal interface.

### Basic Syntax
```
const controller = new AbortController(); // Create an instance
const signal = controller.signal; // Get the signal object
```


## Example - 1
```
const controller = new AbortController();
const signal = controller.signal;

fetch("https://jsonplaceholder.typicode.com/posts", { signal }).catch(err =>
  console.log("First fetch:", err.name)
);

fetch("https://jsonplaceholder.typicode.com/comments", { signal }).catch(err =>
  console.log("Second fetch:", err.name)
);

// Cancel all requests after 1 second
setTimeout(() => {
  controller.abort();
  console.log("All fetch requests aborted!");
}, 1000);

```

## Example - 2
```
const controller = new AbortController();
const signal = controller.signal;

document.addEventListener(
  "click",
  () => {
    console.log("Document clicked!");
  },
  { signal }
);

// Remove the event listener after 3 seconds
setTimeout(() => {
  controller.abort();
  console.log("Click event listener removed!");
}, 3000);

```
