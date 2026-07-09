# React Migration Guide
> A controlled, phased migration strategy for large enterprise React applications.

---

## Overview

If your goal is **zero or minimal production breakage**, don't think of it as "upgrading React." Think of it as a **migration project with multiple phases**.

For large enterprise React applications (e.g., IBM PowerVC) — likely React 16 with Carbon components, Redux, GraphQL, Webpack, etc. — a very controlled migration is strongly recommended.

---

## Phase 1 — Understand the Current Application

Before touching any code, answer these questions.

### Current Versions to Check

| Package | Command |
|---|---|
| React / React DOM | `npm ls react react-dom` |
| All packages | `npm ls` |

Check versions for:
- `react` / `react-dom`
- `react-scripts` / `webpack`
- `node` / `npm`
- `typescript` (if used)
- `react-router`
- `redux`
- `carbon`
- Testing library

### Find Unsupported Libraries

Some packages may not support React 19. Run:

```bash
npm outdated
npm audit
npm ls
```

Watch out for:

- `react-router`
- `redux` / `react-redux`
- `formik`
- `material-ui` / `carbon`
- `react-intl`
- `enzyme`
- `react-dnd` / `react-beautiful-dnd`

> ⚠️ This is usually where migration fails.

---

## Phase 2 — Create a Migration Branch

**Never upgrade on `master`.**

```bash
git checkout -b react-migration
```

Everything happens here.

---

## Phase 3 — Build a Safety Net

Before changing anything, verify the baseline:

| Check | Command |
|---|---|
| ✅ Application builds | `npm run build` |
| ✅ Tests pass | `npm test` |
| ✅ Lint passes | `npm run lint` |

**Take screenshots of key pages** as regression references:
- Login
- Dashboard
- VM page
- Network page
- Images
- Forms / Tables

---

## Phase 4 — Upgrade Supporting Packages First

Don't jump to React immediately. Upgrade these **one by one**, committing after each:

- `node`
- `npm`
- `webpack`
- `babel`
- `eslint`
- `typescript`
- `carbon`
- `react-router`
- `redux`

```bash
git commit -m "chore: upgrade <package>"
```

> ❌ Never upgrade 20 packages together.

---

## Phase 5 — Upgrade React Incrementally

```
React 16  →  React 17  →  React 18  →  React 19
```

For enterprise applications, **incremental upgrades are preferred**. Each version introduces different breaking changes — validate and commit after each step.

---

## Phase 6 — Fix Compile Errors

You'll likely see:

- `Module not found`
- `Cannot resolve...`
- Deprecated API warnings
- Type errors
- Peer dependency warnings

Fix **one by one**. Don't ignore warnings.

---

## Phase 7 — Fix React Breaking Changes

### `ReactDOM.render` → `createRoot`

```jsx
// ❌ Old
ReactDOM.render(<App />, root);

// ✅ New
createRoot(root).render(<App />);
```

### Legacy Lifecycle Methods

Replace deprecated methods:

| Remove | Replace With |
|---|---|
| `componentWillMount` | `componentDidMount` |
| `componentWillReceiveProps` | `getDerivedStateFromProps` / `useEffect` |
| `componentWillUpdate` | `getSnapshotBeforeUpdate` / `useEffect` |

### String Refs

```jsx
// ❌ Old
ref="input"

// ✅ New
useRef()  or  createRef()
```

### Other Changes

- **`findDOMNode()`** — Replace with `ref` callbacks
- **Legacy Context API** — Replace old context API if still used
- **StrictMode** — React 18 runs effects **twice** in development; many old codebases expose bugs here

---

## Phase 8 — Update Libraries

Update libraries that depend on the new React version. Examples:

- `react-router`
- `redux`
- `apollo`
- `carbon`
- `testing-library`

**Pattern:** Update one library → Build → Test → Commit → Repeat.

---

## Phase 9 — Manual Testing

Test every important workflow:

- [ ] Login / Logout
- [ ] Dashboard
- [ ] Create / Delete VM
- [ ] Snapshots
- [ ] Images
- [ ] Forms
- [ ] Tables (Pagination, Sorting, Filtering)
- [ ] Dark mode
- [ ] Accessibility
- [ ] Keyboard shortcuts

> Anything involving **state** should be tested.

---

## Phase 10 — Fix Performance Regressions

Use **React DevTools Profiler** to check for:

- Extra renders
- Infinite loops
- Slow components
- Large lists

Optimize **only where needed** using:

- `memo`
- `useMemo`
- `useCallback`
- `lazy()`
- `Suspense`

---

## Phase 11 — Production Build

```bash
npm run build
```

Check:
- Bundle size
- Warnings
- Assets
- Source maps

---

## Phase 12 — Deploy to Staging

**Never deploy directly to production.**

```
Dev  →  QA  →  UAT  →  Production
```

---

## Phase 13 — Smoke Testing

Test across:

- Chrome, Firefox, Edge, Safari
- Different screen sizes
- Slow network
- Large datasets

---

## Phase 14 — Production Rollout

Use **Blue-Green Deployment** or **Canary Deployment** instead of replacing everything at once.

Monitor:
- JS Errors
- API failures
- Memory usage
- Page load time
- Crash reports

---

## Git Workflow

```
Create migration branch
        │
        ▼
Upgrade Node
        │
      Commit
        │
        ▼
Upgrade Build Tools
        │
      Commit
        │
        ▼
Upgrade React
        │
      Commit
        │
        ▼
Fix Build Errors
        │
      Commit
        │
        ▼
Upgrade Libraries
        │
      Commit
        │
        ▼
Regression Testing
        │
      Commit
        │
        ▼
Deploy to Staging
        │
        ▼
Production
```

---

## Common Breakage Areas

| Area | Common Issue |
|---|---|
| React Router | API changes between major versions |
| Carbon Components | May require newer React APIs |
| Redux | Older `react-redux` versions may not support newer React |
| Third-party libraries | Unmaintained packages may not support React 19 |
| Legacy lifecycle methods | Removed or deprecated APIs |
| `ReactDOM.render` | Replaced with `createRoot` |
| Strict Mode | Effects execute twice in dev, exposing side effects |
| Testing | Enzyme no longer recommended; migrate to React Testing Library |
| Build configuration | Babel/Webpack plugins may need updates |

---

## Recommended Sequence for Large Enterprise Projects

Because a large enterprise product has a long release cycle, **avoid upgrading directly from React 16 → 19 in one pull request**. Instead:

1. **Inventory dependencies** and identify React compatibility
2. **Upgrade Node and build tooling** (Webpack / Babel / ESLint / TypeScript) while keeping React unchanged
3. **Upgrade React incrementally** (16 → 17 → 18 → 19), validating and committing after each step
4. **Update dependent libraries** (Carbon, React Router, Apollo, Redux, etc.) once the required React version is in place
5. **Run full regression testing** in a staging environment before production

> This phased approach makes it much easier to **isolate the source of any issue** and roll back a specific change if something breaks, rather than debugging dozens of package upgrades at once.