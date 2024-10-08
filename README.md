# GreateFrontend JS question list 
[Greater Frontend Question bank](https://github.com/yangshun/top-javascript-interview-questions?tab=readme-ov-file#explain-the-concept-of-hoisting-in-javascript)

## Syntax to write in .md
<img width="724" alt="image" src="https://github.com/user-attachments/assets/8c9431ba-f74c-45d6-8166-ae9700519aeb">

![WhatsApp Image 2024-08-21 at 10 32 29 AM](https://github.com/user-attachments/assets/1da92023-acce-40ca-a12f-dc94575fe457)

https://leetcode.com/discuss/interview-question/742791/front-end-interview-questions
https://leetcode.com/discuss/interview-experience/2072679/livspace-interview-questions-front-end-sde-1-my-journery-from-76lpa-to-27-lpa
<img width="785" alt="Screenshot 2024-09-07 at 10 26 59 AM" src="https://github.com/user-attachments/assets/32e611fd-4d11-45dc-957f-e9a4cfad6633">

# JavaScript Interview Questions

1. **Implement a function that serializes a JavaScript value into a JSON string.**
2. **Implement a function that performs a deep copy of a value, but also handles circular references.**
3. **Implement a function that determines if two values are deep equal.**
4. **Implement the functionality behavior of `Promise.any`.**
5. **Implement the functionality behavior of `Promise.allSettled`.**
6. **Implement a function that returns a memoized version of a function which accepts a single argument.**
7. **Implement a function that deserializes a JSON string into a JavaScript value.**
8. **Implement a class that can subscribe to and emit events that trigger attached callback functions.**
9. **Implement a debounce function that comes with a cancel method to cancel delayed invocations.**
10. **Implement a function that recursively flattens an array into a single level deep.**
11. **Implement a `promisify` function that allows the original function to override the return value.**
12. **Implement a function to execute N async tasks in series.**
13. **Implement a function to execute N async tasks in parallel.**
14. **Implement a function to execute N async tasks in a race.**
15. **Implement a `pipe` function which chains N number of functions.**
16. **Implement negative indexing in an Array using Proxies.**
17. **Implement Lodash's `_.get` method which gets a value from the path.**
18. **Implement your custom version of the `call` method which sets the “this” context.**
19. **Implement throttling of promises which throttles API requests to a max limit.**
20. **Implement memoizing or caching identical API requests.**
21. **Implement a curried function with placeholder support.**
22. **Implement a custom polyfill version of `Object.assign`.**
23. **Implement custom Virtual DOM I which serializes the data into valid JavaScript objects.**
24. **Implement custom Virtual DOM II which deserializes the data.**
25. **Implement a custom polyfill function `memoize` from the Lodash library.**
26. **Implement a custom String Tokenizer.**
27. **Implement a custom function `_chunk()` which chunks arrays like in Lodash Library.**
28. **Implement the polyfills for the `call`, `apply`, and `bind` methods from scratch.**
29. **Implement a throttle function that comes with a cancel method to cancel delayed invocations.**
30. **Write a custom polyfill for the `typeof` operator which returns the correct `typeof` for a JavaScript value.**



# React.js Interview Questions

1. **How does React's reconciliation algorithm (Fiber) work for efficient rendering?**
2. **Explain the difference between `useState` and `useReducer` hooks in complex state management.**
3. **What is the purpose of `React.memo` and when should you use it?**
4. **How does the virtual DOM differ from the real DOM, and why is it faster?**
5. **What is the significance of keys in React lists, and how do they affect rendering?**
6. **Explain the concept of React’s Concurrent Mode and how it improves UI responsiveness.**
7. **How do React hooks like `useEffect` prevent unnecessary re-renders and performance issues?**
8. **What is the purpose of Context API in React, and how does it avoid prop drilling?**
9. **How do you implement code-splitting and lazy loading in React with `React.lazy` and `Suspense`?**
10. **What are React fragments and why are they used over `div` containers?**
11. **Explain the difference between controlled and uncontrolled components in React forms.**
12. **How would you prevent unnecessary component updates using `shouldComponentUpdate` or `React.PureComponent`?**
13. **Describe the role of `useRef` and how it differs from `createRef` in class components.**
14. **What is the purpose of `forwardRef` in React, and how is it used to pass refs to child components?**
15. **How does React handle asynchronous rendering, and what is its impact on user experience?**
16. **Explain how to handle memory leaks and clean up effects in React using `useEffect` hooks.**
17. **How do you optimize performance in large React applications using tools like React Profiler?**
18. **How does React's error boundary feature work, and what are its limitations?**
19. **What is `useCallback` and `useMemo`, and how do they help in performance optimization?**
20. **How would you handle deep updates in nested state using React without causing performance bottlenecks?**



# Performance related question

- If we are dealing with a user-intensive application, it's good to use lazy loading techniques for better performance.
- To prevent blocking of the UI thread, we should consider using Web Workers. Remember about its drawbacks.
- For responsive design, consider using a mobile-first approach with media queries.
- If the system requires a complex UI with a lot of user interaction, consider using a frontend framework like React, Angular, or Vue.
- If you need to handle and maintain the state of the application efficiently, consider using state management libraries like Redux or Mobx.
- To make the website accessible, ensure proper use of ARIA attributes and semantic HTML.
- If the application requires real-time data updates, consider using Websockets or Server-Sent Events.
- If the system requires seamless navigation between different parts of the application, consider using client-side routing.
- For optimizing large lists or tables in the UI, consider using techniques like windowing.
- To deal with form validation and data collection, consider using libraries like Formik or react-hook-form.
- If the system has a component-based architecture, ensure proper component composition.
- If the system needs to store data in the client-side, we should consider using Cookies, Local Storage, or IndexedDB based on the use case.
- To reduce the initial load time of the application, implement code splitting.
- If the application needs to work offline, implement a service worker and build a Progressive Web App (PWA).
- For efficient error handling, use a centralized error handling system.
- When dealing with APIs, consider using GraphQL for efficient data retrieval.
- If the system requires frequent style changes based on props, consider CSS-in-JS libraries.
- If the system has multiple similar components, consider using higher-order components or render props for code reusability.
- If the system needs to be SEO-friendly, implement server-side rendering (SSR) or pre-rendering.
- For large scale applications, use a monorepo structure for easy package management.
- When dealing with asynchronous data, consider using Promises or async/await for better code readability and error handling.
- For handling complex animations, consider using libraries like Framer Motion or React Spring.
- If the application needs to support multiple themes, consider context API and CSS variables.
- If the application needs to support internationalization, consider libraries like i18next.
- To ensure the performance of the application, make sure to use the browser's Performance API.
- For testing components and business logic, consider using libraries like Jest and React Testing Library.
- To enforce code style and prevent bugs, consider using linters and formatters like ESLint and Prettier.
- To ensure your frontend is accessible to all users, you should follow WCAG guidelines and use tools for checking accessibility compliance.
- For maintaining code quality and enforcing coding standards, use static type checkers like TypeScript and linters such as ESLint.
- Consider implementing state management libraries like Redux or Context API for predictable state management in complex applications with many components
- If your application deals with real-time data, consider using WebSockets or libraries such as Socket.IO for real-time, bidirectional communication between the client and the server.
- For managing side effects in your application, libraries like Redux-Thunk or Redux-Saga can be considered.
- If your application requires routing, libraries like React-Router can help manage different views for your app.
  






