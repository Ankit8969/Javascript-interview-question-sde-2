## FetchTimeout With Promises

```
const URL = "https://jsonplaceholder.typicode.com/photos";

function fetchTimeout(URL, timer) {
  let prom1 = fetch(URL);
  let prom2 = new Promise((resolve, reject) => {
    setTimeout(reject, timer, "Timeout");
  })
  return Promise.race([prom1, prom2]);
}

fetchTimeout(URL, 130).then((res) => {
  console.log("Done fetching ", res);
}).catch((err) => {
  console.log("Error fetching ", err);
})
```

## Fetch Timeout With AbortController()

```
const URL = "https://jsonplaceholder.typicode.com/photos";

function fetchTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  return fetch(url, { signal: controller.signal }).finally(() =>
    clearTimeout(timer)
  );
}

fetchTimeout(URL, 1000)
  .then((res) => res.json())
  .then((data) => console.log(data.slice(0, 10)))
  .catch((err) => {
    if (err.name === "AbortError") {
      console.error("Request timed out");
    } else {
      console.error("Err:", err);
    }
  });
```