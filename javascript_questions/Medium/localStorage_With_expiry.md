## localStorage with expiration

```
window.myLocalStorage = {
  getItem(key) {
    return window.localStorage.getItem(key);
  },
  
  setItem(key, value, maxAge) {
    window.localStorage.setItem(key, value);
    if (maxAge === 0) {
      window.localStorage.removeItem(key);
    } else if (maxAge > 0) {
      setTimeout(() => {
          window.localStorage.removeItem(key);
        }, maxAge);
    }
  },
  
  removeItem(key) {
    window.localStorage.removeItem(key);
  },
  
  clear() {
    window.localStorage.clear();
  }
}
```

## One More Way to to this
```

(() => {
  const storage = window.localStorage;

  // Save original methods
  const originalGetItem = storage.getItem.bind(storage);
  const originalSetItem = storage.setItem.bind(storage);

  // Add setWithExpiry
  storage.setWithExpiry = function (key, value, timer) {
    originalSetItem(key, value);

    setTimeout(() => {
      storage.removeItem(key);
    }, timer);
  };

  // Restore safe getItem
  storage.getItem = function (key) {
    return originalGetItem(key);
  };
})();
```
