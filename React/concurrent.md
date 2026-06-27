# React Concurrent Rendering & Time Slicing

## Evolution

| React Version | Rendering Engine | Features |
|---------------|------------------|----------|
| React 15 | Stack Reconciler | Synchronous rendering |
| React 16 | Fiber Reconciler | New architecture enabling scheduling |
| React 17 | Fiber | Performance improvements |
| React 18 | Fiber + Concurrent Rendering | Time Slicing, Transitions, Suspense improvements |
| React 19 | Fiber | More concurrent features and Server Components |

---

# Why React Introduced Fiber

Before React 16, rendering was **synchronous**.

Suppose React needs to render 20,000 components.

```
Render Component 1
↓
Render Component 2
↓
...
↓
Render Component 20,000
↓
Commit
```

Once rendering started, **React couldn't stop**.

During this time:

- ❌ UI freezes
- ❌ Button clicks don't work
- ❌ Typing lags
- ❌ Scrolling becomes unresponsive

The browser had to wait until React finished.

---

# JavaScript is Single Threaded

The browser's main thread is responsible for:

- Running JavaScript
- Rendering React
- Handling Click Events
- Handling Keyboard Events
- Scrolling
- Painting the Screen

If React blocks the thread for 300ms, **everything else waits**.

---

# React Fiber

React Fiber is a **new reconciliation architecture** introduced in React 16.

Instead of relying on the JavaScript Call Stack, React creates its own data structure called a **Fiber Tree**.

Example:

```
<App />

      |
      ▼

Fiber(App)
    |
    +------ Fiber(Header)
    |
    +------ Fiber(Main)
    |
    +------ Fiber(Footer)
```

Each React Element has a corresponding Fiber Node.

Since React owns this tree, it controls:

- When to process a node
- When to pause
- When to continue
- Which update has higher priority

---

# Concurrent Rendering

Concurrent Rendering means:

> React can pause, interrupt, resume, or discard rendering work before committing it to the DOM.

It **does not** mean:

- ❌ Multi-threading
- ❌ Parallel rendering
- ❌ Multiple CPU cores

Everything still runs on JavaScript's single thread.

---

# Render Phase vs Commit Phase

React rendering has two phases.

## 1. Render Phase

React:

- Calls Components
- Calculates JSX
- Creates Virtual DOM
- Diffs Trees

This phase **can be interrupted**.

Example:

```
Render Header
↓

Render Sidebar
↓

Pause

↓

Handle Click Event

↓

Resume Rendering
```

---

## 2. Commit Phase

React updates:

- Real DOM
- Refs
- useLayoutEffect

This phase **cannot** be interrupted.

React always commits atomically.

---

# Time Slicing

Time Slicing is the technique React uses to keep the UI responsive.

Without Time Slicing:

```
Render 20,000 Components

(300ms)

Done
```

Browser is blocked.

---

With Time Slicing:

```
Render 500 Components

↓

Yield to Browser

↓

Render Next 500

↓

Yield

↓

Continue...
```

The browser gets opportunities to:

- Paint
- Scroll
- Process Clicks
- Process Keyboard Input

---

# Does React Wait?

No.

React **does not sleep**.

Instead it:

```
Render Some Work

↓

Check Time Budget

↓

If Budget Exhausted

↓

Yield Control

↓

Browser Works

↓

React Continues
```

React voluntarily gives control back to the browser.

---

# Why is this needed?

Imagine filtering 100,000 products.

Old React:

```
User Types

↓

Render Entire List

↓

Update Screen
```

Input becomes laggy.

---

Concurrent React:

```
User Types

↓

Update Input Immediately

↓

Render List in Background

↓

Commit Later
```

Typing remains smooth.

---

# Priority Scheduling

Not all updates are equally important.

High Priority

- Button Click
- Typing
- Hover
- Input

Low Priority

- Large List Rendering
- Search Results
- Charts
- Background UI Updates

React processes urgent updates first.

---

# Interruptible Rendering

Suppose user types:

```
A
```

React starts rendering.

Before finishing, user types:

```
AB
```

React simply throws away the old render.

```
Rendering "A"

❌ Discard

↓

Render "AB"

↓

Commit
```

This avoids wasting CPU on outdated work.

---

# What Concurrent Rendering Doesn't Do

It does NOT:

- Render on multiple threads
- Update DOM partially
- Make rendering faster

Instead it makes rendering **interruptible**.

---

# Important APIs

## startTransition()

Marks updates as non-urgent.

```jsx
startTransition(() => {
  setProducts(filteredProducts);
});
```

---

## useTransition()

Allows showing pending UI.

```jsx
const [isPending, startTransition] = useTransition();
```

---

## useDeferredValue()

Delays expensive rendering.

```jsx
const deferredSearch = useDeferredValue(search);
```

---

## Suspense

Allows React to pause rendering while waiting for:

- Code Splitting
- Data Fetching

---

# Key Takeaways

✅ React Fiber was introduced in React 16.

✅ Concurrent Rendering became available in React 18.

✅ Time Slicing is built on top of Fiber.

✅ React still runs on a single JavaScript thread.

✅ Only the Render Phase is interruptible.

✅ Commit Phase is always synchronous.

✅ React doesn't sleep; it voluntarily yields control back to the browser.

✅ Time Slicing improves responsiveness, not rendering speed.

---

# Interview Definition

### React Fiber

> React Fiber is the reconciliation engine introduced in React 16. It represents every React element as a Fiber node, allowing React to schedule, prioritize, pause, resume, or discard rendering work.

---

### Concurrent Rendering

> Concurrent Rendering is React's ability to interrupt rendering work, prioritize urgent updates, resume rendering later, or discard outdated work before committing changes to the DOM.

---

### Time Slicing

> Time Slicing is a scheduling technique where React breaks rendering into small units of work and periodically yields control back to the browser, allowing the browser to remain responsive while React continues rendering in subsequent time slices.