# Accessibility

### Use Semantic HTML
```
<header>...</header>
<nav>...</nav>
<main>...</main>
<section>...</section>
<article>...</article>
<footer>...</footer>
```

- Avoid using ```<div>``` or ```<span>``` for elements that have semantic meaning.


## Use aria-* attributes
```
<button aria-label="Close modal">X</button>

<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirm Delete</h2>
</div>

```

## Keyboard Navigation
```
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') handleClick();
  }}
>
  Click me
</div>

```

## Use Accessible Form Inputs
- Always use ```<label>``` with htmlFor.
- Use aria-describedby for helper or error text.

```
<label htmlFor="username">Username</label>
<input id="username" type="text" aria-describedby="usernameHelp" />
<p id="usernameHelp">This is your login name.</p>
```


## Focus Management
```
const modalRef = useRef(null);

useEffect(() => {
  modalRef.current?.focus();
}, []);

return <div ref={modalRef} tabIndex={-1}>Modal content</div>;

```

## Alt Text for Images
```
<img src="profile.jpg" alt="Profile picture of Ankit" />

```

## Color Contrast
- Ensure text has enough contrast against the background. Use tools like:

## Use Accessibility Linters and Tools













