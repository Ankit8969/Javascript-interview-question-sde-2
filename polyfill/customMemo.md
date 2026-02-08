# useMemo() Implementation.


- useEffect runs after render
- useMemo is meant to run before render to return a memoized value synchronously during rendering.

```
import { useRef } from "react";

export const customMemo = (cb, dependencyArr) => {
  const cache = useRef({ deps: undefined, value: undefined });

  const isEqual = (prev, current) => {
    if (!prev || prev.length !== current.length) return false;
    for (let i = 0; i < prev.length; i++) {
      if (prev[i] !== current[i]) return false;
    }
    return true;
  };

  if (!isEqual(cache.current.deps, dependencyArr)) {
    cache.current.value = cb();
    cache.current.deps = dependencyArr;
  }

  return cache.current.value;
};

```

### What will happen if you pass function in useMemo dependency array?

***There are 2 case, one if the function inside the component and other is outside.***

### Case - 1
- If function is inside, and when the component is render it will initialize the same function again So the useMemo will consider every time as a new function. Then useMemo have no use.
- But if we still want to keep the function inside the component we have to wrap the function inside the callback.

### Case - 2
- If function is outside then useMemo will cache the value.