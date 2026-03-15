## What is mapLimit?
mapLimit is a function that processes an array of items using an asynchronous function but limits the number of concurrent executions. Instead of running all async operations at once (which could overwhelm the system), it ensures that only a specified number of tasks run at any given time.

```

async function mapLimit(arr, maxLimit, cb) {
  let pendingTask = [],
    completed = 0,
    onGoing = 0;
  let result = [];

  return new Promise((resolve, reject) => {
    function execute(item) {
      onGoing++;
      cb(item)
        .then((res) => {
          result.push(res);
        })
        .finally(() => {
          onGoing--;
          completed++;
          if (pendingTask.length > 0) execute(pendingTask.shift());
          if (result.length === arr.length) resolve(result);
        });
    }

    for (let i = 0; i < arr.length; i++) {
      if (onGoing >= maxLimit) {
        pendingTask.push(arr[i]);
      } else {
        execute(arr[i]);
      }
    }
  });
}

function asyncTask(n) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("done", n);
      resolve(n * 2);
    }, 1000);
  });
}

mapLimit([1, 2, 3, 4, 5], 2, asyncTask).then(console.log);

```

