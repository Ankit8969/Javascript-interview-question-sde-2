## What is mapLimit?
mapLimit is a function that processes an array of items using an asynchronous function but limits the number of concurrent executions. Instead of running all async operations at once (which could overwhelm the system), it ensures that only a specified number of tasks run at any given time.


```

async function mapLimit(promArr, limit) {
  let result = Array();
  const executing = new Set();

  for (let i = 0; i < promArr.length; i++) {
    const promise = promArr[i]();
    executing.add(promise);

    promise
      .then((res) => {
        result.push(res);
      })
      .finally(() => {
        executing.delete(promise);
      });

    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  await Promise.all(executing);
  return result;
}

let prom1 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 2000, "Task - 1"));
let prom2 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 1000, "Task - 2"));
let prom3 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 800, "Task - 3"));
let prom4 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 3000, "Task - 4"));
let prom5 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 4000, "Task - 5"));
let prom6 = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 3800, "Task - 6"));

let promArr = [prom1, prom2, prom3, prom4, prom5, prom6];

mapLimit(promArr, 2).then((res) => {
  console.log("%o", res);
});

```

## Output
```
[
    "Task - 2",
    "Task - 3",
    "Task - 1",
    "Task - 4",
    "Task - 5",
    "Task - 6"
]
```
