### Role of suspense
```
Component tries to render
        ↓
It’s NOT ready yet
        ↓
React pauses rendering
        ↓
Fallback UI is shown
        ↓
Component becomes ready
        ↓
React resumes rendering
```

```
const HeavyComponent = React.lazy(() => import("./Heavy"));

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </React.Suspense>
  );
}
```

### Ways to migrate to old legacy codebase to new one


## 1️⃣ Co-exist & convert incrementally (BEST approach)
### How it works
---
1. Keep existing class components
2. Start writing new components as functional
3. Convert old ones only when touched
---
### Why this works ?
- Zero risk
- No deadline pressure
- No massive PRs
- Easy rollback

### Rule
```
“If you’re modifying a file anyway, convert it.”
```

## 2️⃣ Leaf-first conversion (recommended)

### Start from bottom of the tree.
---
1. Convert:
    - Presentational components
    - Dumb UI components
    - Components with minimal lifecycle logic


## 4️⃣ Extract logic before converting (pro move)

### Before converting a big class:
1. Extract logic into:
    - utility functions
    - services
    - selectors

### Then convert UI only.
Why
- Smaller diff
- Easier testing
- Less mental load



## 5️⃣ Convert containers last

1. Classes that:
    - manage lots of state
    - talk to APIs
    - handle routing
    - have side effects

***Convert them after the leaf components are stable.***

### 6️⃣ Error Boundaries stay class-based
Important:
- Hooks cannot replace ErrorBoundaries
Strategy
- Keep existing error boundaries as classes
- Wrap functional components with them
- No rush to change these.

### 7️⃣ Introduce hooks infrastructure early

Before mass conversion:
---
- Add ESLint rules for hooks
- Add react-hooks/exhaustive-deps
- Train the team on hooks patterns
- This avoids chaos later.


---


## 🛠️ Tooling & automation (helps a LOT)
- Codemods (partial automation)
- react-codemod
- jscodeshift

```
⚠️ Use carefully — great for:
simple lifecycle → hook transforms
removing this
```


## 🧪 Testing strategy (critical)

Before converting:
---
- Snapshot tests
- Critical path tests

After converting:
---
- Verify behavior, not implementation
- Watch for subtle effects timing changes

### 🚫 Common migration mistakes (avoid these)
- Rewriting everything at once
- Converting without tests
- Overusing useEffect
- Putting all logic in one effect
- Trying to make hooks “look like classes”


### 🧠 How big teams actually do it (reality)

Phase 1
---
- New code → functional
- Old code → untouched

Phase 2
---
1. Convert leaf components
2. Shared UI library first

Phase 3
---
1. Convert containers
2. Optimize with hooks

Phase 4
---

Leave remaining classes (if stable)

👉 Many apps never reach 100% conversion — and that’s OK.



## Final Tip


Interview-ready answer (gold)
---

***In a large class-based React app, the safest approach is incremental migration—allowing class and functional components to coexist, converting leaf components first, mapping lifecycle methods to hooks, and avoiding a full rewrite. Error boundaries remain class-based.***