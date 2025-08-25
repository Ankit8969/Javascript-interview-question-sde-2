# Rate Limitter 

```
function sleep(delay) {
  return new Promise((resolve, reject) => setTimeout(resolve, delay));
}

// Rate limmiting
class RateLimmiter {
  constructor() {
    this.rateLimitHandler = {};
  }

  add(path, rateLimit) {
    this.rateLimitHandler[path] = {
      rateLimit: rateLimit,
      startTime: null,
      retryCount: 0,
    };
  }

  async execute(path, id) {
    const { startTime } = this.rateLimitHandler[path];

    // It means first Time
    if (startTime === null) {
      this.rateLimitHandler[path].startTime = Date.now();
    }

    // check expiry
    if (Date.now() - this.rateLimitHandler[path].startTime >= 10000) {
      this.rateLimitHandler[path].startTime = Date.now();
      this.rateLimitHandler[path].retryCount = 0;
    }

    this.rateLimitHandler[path].retryCount += 1;

    if (
      this.rateLimitHandler[path].retryCount >
      this.rateLimitHandler[path].rateLimit
    ) {
      console.error("Max tried exceed, after some time", id);
      return;
    }

    await sleep(1000);
    console.log("Solved", path, id);
  }
}
```

## Execution
```
// Map Limit

let rateLimmiter = new RateLimmiter();

rateLimmiter.add("/login", 3);

rateLimmiter.execute("/login", 1);
rateLimmiter.execute("/login", 2);
rateLimmiter.execute("/login", 3);
rateLimmiter.execute("/login", 41);

setTimeout(() => {
  rateLimmiter.add("/user", 2);
  rateLimmiter.execute("/user", 1);
  rateLimmiter.execute("/user", 2);
  rateLimmiter.execute("/user", 31);
}, 3000);

```