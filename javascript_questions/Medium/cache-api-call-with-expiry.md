## This will handle one only.
```
function cachedApiCall(timer) {
  let lastCallTime = 0; // Stores the last successful API call time
  let cachedRes = null; // Stores the cached response

  return async function (URL) {
    const currentTime = Date.now();

    if (currentTime - lastCallTime < timer && cachedRes) {
      console.log("Cached Response:");
      return cachedRes;
    }

    try {
      let fetchRes = await fetch(URL);
      let res = await fetchRes.json();
      cachedRes = res;
      lastCallTime = currentTime; // Update the time when API is called
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
      return cachedRes; // Return last cached response on error
    }
  };
}

function solve() {
  const call = cachedApiCall(1500);

  call("https://jsonplaceholder.typicode.com/todos/1").then((a) =>
    console.log(a)
  );

  setTimeout(() => {
    call("https://jsonplaceholder.typicode.com/todos/1").then((a) =>
      console.log(a)
    );
  }, 700); // Should return cached response

  setTimeout(() => {
    call("https://jsonplaceholder.typicode.com/todos/1").then((a) =>
      console.log(a)
    );
  }, 2000); // Should make a new API call
}

solve();
```

## Handling the URL based 

```
function cacheApiCall(timeout) {
  const cache = new Map();

  return async function (url) {
    const cached = cache.get(url);

    if (cached && Date.now() - cached.time < timeout) {
      return cached.data;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      cache.set(url, { data, time: Date.now() });
      return data;
    } catch (err) {
      return [];
    }
  };
}

```





