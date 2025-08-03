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