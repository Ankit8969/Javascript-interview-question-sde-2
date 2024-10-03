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

































