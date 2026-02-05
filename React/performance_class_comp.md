# Performance, we can do in class based.

### Function Component
1. As we know, we can do many things in function

eg: useMemo, useCallback, useRef, LazyLoading etc.


### Let's discuss for class based.

### 1️⃣ shouldComponentUpdate (MOST powerful)

This is your manual diffing control.

```
class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.value !== this.props.value ||
      nextState.count !== this.state.count
    );
  }

  render() {
    return <div>{this.props.value}</div>;
  }
}

nextProps → upcoming props

nextState → upcoming state

If we return true, component will re-render otherwise not.

```

### 2️⃣ PureComponent (free optimization)

```
class MyComponent extends React.PureComponent {
  render() {
    return <div>{this.props.value}</div>;
  }
}
```

### What it does:
- Shallow compares props & state
- Skips re-render if unchanged


### Equivalent to:
```
React.memo(Component)
```

### 3 createRef similar to useRef
```
class MyComponent extends React.Component {
  inputRef = React.createRef();

  focusInput() {
    this.inputRef.current.focus();
  }

  render() {
    return <input ref={this.inputRef} />;
  }
}
```


### 4 Lazy loading (same as hooks)
```
const HeavyComponent = React.lazy(() => import("./Heavy"));

class App extends React.Component {
  render() {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </React.Suspense>
    );
  }
}
```


### Error boundaries (class-only feature)
```
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  // Runs when a child throws during render / lifecycle
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Good place to log errors
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // sendErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20 }}>
          <h2>Something went wrong 😕</h2>
          <p>Please refresh the page or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

```
render() {
    return (
      <>
        <h2> React life cycle methods</h2>
        <ErrorBoundary>
          <button onClick={this.handleError}>Crash component</button>
          <BuggyComponent crash={this.state.crash} />
        </ErrorBoundary>
      </>
    );
  }
```

### 1️⃣ getDerivedStateFromError (UI control)
```
static getDerivedStateFromError(error) {
  return { hasError: true, error };
}
```

### 🔍 What it is
1. A static lifecycle method
2. Runs when a child component throws an error
3. Runs before render
4. Cannot access this

### 2️⃣ componentDidCatch (side effects & logging)
```
componentDidCatch(error, errorInfo) {
  console.error("Error caught by boundary:", error, errorInfo);
}
```

### 🔍 What it is
1. Instance lifecycle method
2. Runs after an error is thrown
3. Has access to this
4. Runs after render commit

