## What is mapLimit?
mapLimit is a function that processes an array of items using an asynchronous function but limits the number of concurrent executions. Instead of running all async operations at once (which could overwhelm the system), it ensures that only a specified number of tasks run at any given time.


```
const mapLimit = async (coll, limit, iteratee) => {
  const results = [];
  const executing = new Set();

  for (const item of coll) {
    const promise = iteratee(item);
    executing.add(promise);
    promise
      .then((res) => {
        results.push(res);
      })
      .finally(() => executing.delete(promise));

    if (executing.size >= limit) {
      await Promise.race(executing); // Wait for one of the promises to finish
    }
  }
  await Promise.all(executing);
  return results; // Resolve all promises
};

let arr = [1, 2, 3, 4, 5, 6];

function fetch(id) {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(`${id} DONE`);
    }, 100 * id);
  });
}

mapLimit(arr, 2, fetch).then((res) => {
  console.log(res);
});

```
