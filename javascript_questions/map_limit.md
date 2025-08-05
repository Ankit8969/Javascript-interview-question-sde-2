## What is mapLimit?
mapLimit is a function that processes an array of items using an asynchronous function but limits the number of concurrent executions. Instead of running all async operations at once (which could overwhelm the system), it ensures that only a specified number of tasks run at any given time.


```

const mapLimit = async (coll, limit, iteratee) => {
  const results = [];
  const executing = new Set();

  for (const item of coll) {
    const promise = iteratee(item);
    promise.then((res) => {
      results.push(res);
    });
    executing.add(promise);

    promise.finally(() => executing.delete(promise));

    if (executing.size >= limit) {
      await Promise.race(executing); // Wait for one of the promises to finish
    }
  }

  return Promise.all(results); // Resolve all promises
};

let arr = [1, 2, 3, 4];

function fetch(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${id} DONE`);
    }, 1000 * id);
  });
}

let temp = mapLimit(arr, 2, fetch).then((res) => {
  console.log(res);
});

```
