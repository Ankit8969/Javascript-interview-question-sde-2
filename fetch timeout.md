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
