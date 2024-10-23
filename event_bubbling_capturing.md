# Event bubbling and capturing
- In JavaScript, event bubbling and event capturing are two phases of event propagation in the DOM. Event propagation 
determines how events flow through the DOM when a user interacts with elements.
  - Event Bubbling: The event starts from the target element and propagates up through its ancestors (parent, grandparent, etc.).
  - Event Capturing (or Event Trickling): The event starts from the root of the DOM and propagates down to the target element.
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
