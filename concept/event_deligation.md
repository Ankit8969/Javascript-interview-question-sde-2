# Event Deligation
Event delegation is a technique in JavaScript where a single event listener is attached to a 
parent element to manage events triggered by its child elements. Instead of attaching multiple event 
listeners to each child, we delegate the event handling to a common ancestor. This approach is especially 
useful for dynamically created elements and improves performance by reducing the number of event listeners in the DOM.

## How It Works:
In JavaScript, when an event is triggered on an element, it bubbles up the DOM tree (event bubbling) to the ancestor elements. Event delegation takes advantage of this by 
attaching the event listener to a common parent, and when a child element triggers the event, the parent can determine which child triggered the event.

## Benefits of Event Delegation:
- Improved performance: Instead of adding multiple event listeners to each child element, we use one listener on the parent, reducing memory usage.
- Handling dynamically added elements: Since the event is attached to the parent, it can handle events triggered by elements added later to the DOM without needing to attach new event listeners.

```
<ul id="item-list">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
<button id="add-item">Add Item</button>

```

```const itemList = document.getElementById('item-list');

// Event delegation: The click event is handled by the parent <ul> element
itemList.addEventListener('click', function(event) {
    // Check if the clicked element is a <li>
    if (event.target.tagName === 'LI') {
        console.log('You clicked on', event.target.textContent);
    }
});

// Dynamically adding a new item to demonstrate how event delegation works with new elements
const addItemButton = document.getElementById('add-item');
addItemButton.addEventListener('click', function() {
    const newItem = document.createElement('li');
    newItem.textContent = `Item ${itemList.children.length + 1}`;
    itemList.appendChild(newItem);
});

```


## Example of Event deligation

```
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";
import { folderStructure } from "./utils";

const VsCode = ({ folder }) => {
  return (
    <div>
      <h3 data-title={folder.title} data-id={folder.id}>
        {folder.title}
      </h3>
       <button
        value={folder.id}
        type="button"
        data-name={folder.title}
        name="add"
        data-id={folder.id}
      >
        Add
      </button>
      <div>
        {folder.children.map((item) => (
          <VsCode key={item.id} folder={item} />
        ))}
      </div>
    </div>
  );
};
```
```
export default function App() {
  const [folder, setFolder] = useState(folderStructure);

  const handleClick = (e) => {
    if (e.target.nodeName === "H3") {
      console.log(e.target.getAttribute("data-title"));
    } else {
      console.log("ID: ", e.target.getAttribute("data-id"));
      console.log("Value: ", e.target.getAttribute("value"));
      console.log("Name: ", e.target.getAttribute("name"));
      console.log("Title: ", e.target.getAttribute("data-name"));
    }
  };

  return (
    <div onClick={handleClick}>
      <VsCode folder={folder} />
    </div>
  );
}

```