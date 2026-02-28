# 🚀 React Performance Optimization Guide

This guide covers the "Senior-level" approach to managing component performance and bundle size.

---

## 1️⃣ React.lazy (Lazy Loading)
**🔥 What It Solves:** Reduces initial bundle size by splitting code into chunks. Instead of loading everything at once, load only when needed.

### ✅ Use Lazy Loading When:
* **Route-based components:** Large pages like Dashboard, Admin panel, or Analytics.
    ```javascript
    const Dashboard = React.lazy(() => import("./Dashboard"));
    ```
* **Heavy third-party libraries:** Charts, Rich Text Editors, or Map components.
* **Rarely opened UI:** Modals, Drawers, or Settings panels.

### ❌ Don’t Use When:
* **Small components:** Splitting tiny files increases network overhead.
* **Above-the-fold content:** The Hero section should load immediately.
* **Core UI:** Navbar, Header, or Layout.

---

## 2️⃣ useMemo
**🔥 What It Solves:** Prevents recomputing expensive calculations on every render by caching the result.

### ✅ Use useMemo When:
* **Expensive calculations:** Filtering a list of 10,000 items.
    ```javascript
    const filteredList = useMemo(() => {
      return bigList.filter(item => item.active);
    }, [bigList]);
    ```
* **Maintaining Referential Equality:** Preventing an object from being recreated on every render to stop child re-renders.

### ❌ Don’t Use When:
* **Cheap calculations:** `a + b` is faster than the overhead of `useMemo`.
* **Primitive values:** Strings and Booleans don't benefit from memoization.

---

## 3️⃣ useCallback
**🔥 What It Solves:** Prevents function references from changing between renders.

### ✅ Use useCallback When:
* **Passing functions to memoized children:** Essential when the child is wrapped in `React.memo`.
* **useEffect dependencies:** Prevents infinite loops when a function is a dependency.
    ```javascript
    const fetchData = useCallback(() => { ... }, []);
    useEffect(() => { fetchData(); }, [fetchData]);
    ```

### ❌ Don’t Use When:
* **Child is NOT memoized:** If the child re-renders anyway, `useCallback` is wasted memory.
* **Simple UI:** Don't wrap every `handleClick`—it adds complexity for no gain.

---

## 🎯 Summary Table

| Situation | Recommended Tool |
| :--- | :--- |
| Large page/Route | `React.lazy` |
| Heavy calculation | `useMemo` |
| Stable function ref | `useCallback` |
| Passing handler to `React.memo` child | `useCallback` |
| Small component | **Nothing** |

---

## 🏆 Interview-Level Answer
> "I use **React.lazy** for code-splitting routes, **useMemo** for expensive data transformations, and **useCallback** to maintain referential equality for functions passed to memoized children. I always measure performance first, because over-optimization can actually make an app slower due to memory overhead."