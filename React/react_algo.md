# React Algorithms to compare DOM Tree.

## 1️⃣ React Reconciliation – Deep Understanding

### 🔥 What is Reconciliation?

***Process React uses to compare old Virtual DOM with new Virtual DOM and decide:***
- What to update
- What to remove
- What to create

### Step-by-Step Flow
- State changes
- React calls component again
- New Virtual DOM is created
- React compares old vs new
- Calculates minimal DOM updates
- Updates real DOM

### Diffing Algorithm Rules
***React does NOT compare everything deeply. It follows assumptions:***

- Rule 1: Different element type → full replace
```
<div />
<span />
```
***Entire subtree is destroyed.***

- Rule 2: Same type → update props only
```
<button disabled={true} />
<button disabled={false} />
```
***Only attribute changes.***

- Rule 3: Lists need keys

***Without key:***
```
{items.map(item => <li>{item}</li>)}
```

React re-renders entire list inefficiently.

With key:
```
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

React tracks movement properly.

## 2️⃣ React Fiber Internals
🔥 Why Fiber Was Introduced?

### Old React (Stack Reconciler) was:
- Synchronous
- Blocking
- Cannot pause rendering
- If a big component tree renders → UI freezes.

What is Fiber?
---
***Fiber is - A re-implementation of React’s core algorithm to enable incremental rendering.***

It allows React to:
- Pause rendering
- Resume later
- Assign priority
- Abort rendering

Reuse work
---
- Fiber = Linked List Tree
- Each component becomes a "Fiber Node".

#### Fiber node contains:
- type
- stateNode
- child
- sibling
- return (parent)
- alternate (previous version)

#### This allows React to:
- Traverse tree efficiently
- Split rendering work

### Two Phases in Fiber
#### 1️⃣ Render Phase (Can be paused)
- Build fiber tree
- Calculate changes
- No DOM updates

#### 2️⃣ Commit Phase (Cannot be paused)
- Apply DOM updates
- Run useEffect
- Update refs

#### 3️⃣ Concurrent Features (React 18)
- React 18 introduced concurrent rendering.

#### Important:
- Concurrent ≠ multithreading
- It means interruptible rendering.

#### 🔥 useTransition
- Allows low-priority updates.
```
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setSearchQuery(value);
});
```

#### Use when:
- Filtering large list
- Route change

#### Heavy UI
- 🔥 useDeferredValue
    - Defers expensive value updates.
```
const deferredQuery = useDeferredValue(searchQuery);
```

#### Helps:
- Prevent UI lag during typing

### 🔥 Automatic Batching

Before React 18:
```
setA(1);
setB(2);
```

***Two renders.***
- Now → single render (even inside promises).

### Huge performance win.


------


# 4️⃣ How Netflix / Large Companies Optimize Frontend

## 🏗 1. Route-Level Code Splitting

Every route = separate chunk.

## ⚡ 2. Edge Caching + CDN

Static assets served globally.

## 🧠 3. Server Side Rendering (SSR)

Improves:

First paint

SEO

Perceived performance

## 🔥 4. Streaming + Suspense

React 18 streaming SSR:

Send HTML in chunks

Progressive hydration

## 🪶 5. Bundle Budget

Strict rule:

Initial JS < 200KB

## 📊 6. Performance Budgets in CI

If bundle grows → CI fails.

## 📡 7. Real User Monitoring (RUM)

Track:

LCP

FID

CLS

In production.

## 5️⃣ Real Production Performance Checklist

This is GOLD 🔥

### 🔍 Rendering
- Use React.memo where needed
- Avoid inline functions in large lists
- Avoid derived state in useState
- Keep component small

### 🌐 Network

- Use HTTP/2 or HTTP/3
- Compress with Brotli
- Enable caching headers
- Avoid waterfall requests

### 📦 Bundling

- Code splitting
- Tree shaking
- Remove unused polyfills
- Avoid large UI libraries

### 🧠 State

- Keep state local
- Avoid global re-renders
- Use selector optimization

🖥 Large Lists

- Virtualize
- Pagination
- Infinite scroll

### 🧹 Memory

- Clean useEffect
- Cancel API calls
- Avoid retaining references

### 📊 Measure Always

Use:

- React Profiler
- Lighthouse
- Performance tab

### Web Vitals
- If you don’t measure → you are guessing.