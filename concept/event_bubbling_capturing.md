# Event bubbling and capturing
- In JavaScript, event bubbling and event capturing are two phases of event propagation in the DOM. Event propagation 
determines how events flow through the DOM when a user interacts with elements.
  - Event Bubbling: The event starts from the target element and propagates up through its ancestors (parent, grandparent, etc.).
  - Event Capturing (or Event Trickling): The event starts from the root of the DOM and propagates down to the target element.
 

***By default, the third parameter (useCapture) in addEventListener is false.***
  
 ```
const parentDiv = document.querySelector('.parent');
const childButton = document.querySelector('.child');

// Event Bubbling (default behavior)
parentDiv.addEventListener('click', (event) => {
    console.log('Parent Div - Bubbling');
});

childButton.addEventListener('click', (event) => {
    console.log('Child Button - Bubbling');
});

// Event Capturing (useCapture=true)
parentDiv.addEventListener('click', (event) => {
    console.log('Parent Div - Capturing');
}, true);  // true means capture phase

childButton.addEventListener('click', (event) => {
    console.log('Child Button - Capturing');
}, true);  // true means capture phase
```


# How It Works:

## Bubbling (default behavior): 

- If you click the button (.child), the event will trigger the listener on the button first, then "bubble up" to the parent (.parent) and trigger the listener on the parent.
```
Output on clicking the button:
Copy code
Child Button - Bubbling
Parent Div - Bubbling
```
## Capturing:

- If you use the capture phase (by passing true as the third argument to addEventListener), the event first starts at the parent (higher up in the DOM) and moves down to the target.
Output on clicking the button with capturing enabled:
```
Copy code
Parent Div - Capturing
Child Button - Capturing
Child Button - Bubbling
Parent Div - Bubbling
Order of Execution:
```
- When capturing is enabled, the event will first trigger in the capture phase (from the outermost ancestor to the target).
- Then, the bubbling phase begins, and the event propagates back up from the target to the outer ancestors.
- This shows how events move through the DOM, starting either from the top (capturing) or from the target (bubbling).


### Difference b/w ```event.stopPropagation()``` and ```event.stopImmediatePropagation()```

1. ```event.stopPropagation()```
- Stops the event from bubbling up (or further down if in capturing phase).
- But it does NOT stop other event listeners on the same element from running.

👉 Example:
```
div.addEventListener("click", () => console.log("div handler"));
button.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("button handler");
});

```

2. ```event.stopImmediatePropagation()```
- Does everything that stopPropagation() does plus:
- It also stops any other listeners on the same element from running.

👉 Example:
```
button.addEventListener("click", () => console.log("handler 1"));
button.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
  console.log("handler 2");
});
button.addEventListener("click", () => console.log("handler 3"));
```

- If you click the button → only "handler 2" runs.
- Handlers "handler 1" and "handler 3" are skipped, because ```stopImmediatePropagation``` stopped further execution at that level.


✅ Summary

```stopPropagation()``` → stops event from bubbling/capturing further. Other listeners on the same element still run.

```stopImmediatePropagation()``` → stops event bubbling/capturing and prevents any other listeners on the same element from running.

