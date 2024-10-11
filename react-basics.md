# React basics theory

- To render a React element, first pass the DOM element to ReactDOM.createRoot(), then pass the React element to root.render():
```
const root = ReactDOM.createRoot(
  document.getElementById('root')
);
const element = <h1>Hello, world</h1>;
root.render(element);
```

## Note: Always start component names with a capital letter.

React treats components starting with lowercase letters as DOM tags. For example, <div /> represents an HTML div tag, but <Welcome /> 
represents a component and requires Welcome to be in scope.

## Pure Function
Such functions are called “pure” because they do not attempt to change their inputs, and always return the same result for the same inputs.

## What is Batching?
In React, when you update the state, it can potentially trigger a re-render. If multiple state updates happen in a short period, 
React batches those updates together and triggers a single re-render instead of rendering multiple times.
This happens automatically in event handlers and lifecycle methods to minimize performance overhead.

## Keys in React
- Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity:
- The best way to pick a key is to use a string that uniquely identifies a list item among its siblings.
  
```
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

## Controlled Components
- In HTML, form elements such as input,textarea, and "select" typically maintain their own state and update it based on user input.
- So, to handle these , we can use "useState" hoooks, to maintain the state, such that all these are totally controlled by react, when ever user type any thing.
- Whenever we have to deal with forms in react either we can go with Controlled or Un-Controlled method
- We can use some other library like "Formik" to take care all the "setState" for every input.

## what do you understand by Accessibility ?
- Web accessibility (also referred to as a11y) is the design and creation of websites that can be used by everyone.

## Code Splitting
- Code-splitting your app can help you “lazy-load” just the things that are currently needed by the user, which can dramatically improve the performance of your app.
- While you haven’t reduced the overall amount of code in your app, you’ve avoided loading code that the user may never need, and reduced the amount of code needed during the initial load.

- The best way to introduce code-splitting into your app is through the dynamic import()
- The React.lazy function lets you render a dynamic import as a regular component.

  
  
```
Before:
import OtherComponent from './OtherComponent';

After:
const OtherComponent = React.lazy(() => import('./OtherComponent'));

```

- React.lazy takes a function that must call a dynamic import(). This must return a Promise which resolves to a module with a default export containing a React component.
  
The lazy component should then be rendered inside a Suspense component, which allows us to show some fallback content (such as a loading indicator)
while we’re waiting for the lazy component to load.

```
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```
## Error boundaries
If the other module fails to load (for example, due to network failure), it will trigger an error. You can handle these errors to show a nice user experience and manage 
recovery with Error Boundaries. Once you’ve created your Error Boundary, you can use it anywhere above your lazy components to display an error state when there’s a network error.


```
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

- Route-based code splitting (Performance improvement strategy)

## Higher-Order Components
- a higher-order component is a function that takes a component and returns a new component.


## Portals in react
In React, Portals are a feature that allow you to render a component’s HTML outside of its normal DOM hierarchy, typically inside a different DOM element. 
This is especially useful for scenarios like modals, tooltips, or dropdowns, where you want to render elements on top of other content or outside the regular 
flow of your component tree.

```

import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render the modal if it's closed

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') // This is where the modal will be rendered
  );
};

export default Modal;
```

```
****** index.html *******
<div id="root"></div>
<div id="modal-root"></div>

```








