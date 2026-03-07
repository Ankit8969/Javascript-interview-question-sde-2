# Real practical talks.

## Lazy Loading
***When we don't have to use lazy loading ?***

### Before Lazy Load
- Build output:
```
index.js   193.90 kB
gzip       60.93 kB
```
- Everything was bundled into one single JS file.
```
index.js
 ├ React
 ├ ReactDOM
 ├ Your components
 └ Toast component
```

### After Lazy load
```
index.js        195.20 kB
Toast.js        0.14 kB
gzip            61.51 kB
```
- Now the bundle looks like:
```
index.js
 ├ React
 ├ ReactDOM
 └ Main app

Toast.js
 └ Lazy component
 ```

- So Vite created a new chunk:
```
Toast-B929UMIh.js
```

### Why Main Bundle Increased

Main bundle increased:
```
193.90 KB → 195.20 KB
```

- because lazy loading adds extra runtime code.
- React adds logic for: 
    - React.lazy
    - Suspense
    - dynamic import
    - chunk loader

### Note: ***Lazy Loading Only Helps When Components Are BIG***


## useCallBack()

### Most Common Case — When Passing Function to a Memoized Child
- If the child component uses React.memo, a new function reference will cause unnecessary re-renders.
- When Function Is a Dependency in useEffect (Without useCallback, the effect may run repeatedly.)

***Important thing to take care.***

If I want to use like this, then I have to pass the toast in array.
```
  const handleAddToast = useCallback((type) => {
     const id = Math.random().toString(36).substr(2, 9);
     setToast([...toast, { id, type, message: `This is a ${type} message!` }]);
   },[toast])
```

So, If we keep the dependency array empty, then we have to use like this otherwise it will always consider as an empty.
```

  const handleAddToast = useCallback((type) => {
    const id = Math.random().toString(36).substr(2, 9);

    setToast((prevToast) => [
      ...prevToast,
      { id, type, message: `This is a ${type} message!` }
    ]);

  }, []);
```