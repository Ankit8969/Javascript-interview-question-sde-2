AbortController is a built-in JavaScript API that allows you to cancel fetch requests, event listeners, or any other asynchronous tasks that support the 
AbortSignal interface.

### Basic Syntax
```
const controller = new AbortController(); // Create an instance
const signal = controller.signal; // Get the signal object
```

## Important Example
After every request if the user will type it will cancel the last call, if the fetching is still going on.

```

function fetchData(){
    let controller;
    return function(text) {
        if(controller) {
            controller.abort();
            console.log("controller aborted!");
        }
        controller = new AbortController(); // Create a new controller for this request
        const signal = controller.signal;
        fetch("https://jsonplaceholder.typicode.com/posts", { signal }).catch(err =>
          console.log("First fetch:", err.name)
        );
    }
}


const input = document.querySelector("input");
let abortFetch = fetchData();
input.addEventListener("keyup", (event) => {
    const text = event.target.value;    
    abortFetch(text);
})
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
