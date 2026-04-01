

```

async function flushEvent(events) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Event Flushed successfully:", events.length);
      resolve();
    }, 1000);
  });
}

class MatricSDK {
  constructor(config = {}) {
    // Config
    this.endPoint = config.endPoint;
    this.batchSize = config.batchSize || 5;
    this.flushInterval = config.flushInterval || 5000;
    this.maxRetries = config.maxRetries || 2;

    // State
    this.queue = [];
    this.timer = null;
    this.isFlushing = false;

    // 🔥 Setup listeners
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleBeforeUnload = this.handleBeforeUnload.bind(this);

    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  }

  startTimer() {
    if (this.timer) return;

    this.timer = setTimeout(() => {
      this.flush();
    }, this.flushInterval);
  }

  track(event) {
    const enhancedEvent = {
      ...event,
      timestamp: new Date().toISOString(),
      id: Date.now(),
    };

    this.queue.push(enhancedEvent);

    // ✅ Fix: Don't drop event, flush AFTER pushing
    if (this.queue.length >= this.batchSize) {
      this.flush();
      return;
    }

    this.startTimer();
  }

  async flush(retryCount = 0) {
    if (this.isFlushing) return;
    if (this.queue.length === 0) return;

    this.isFlushing = true;

    const batch = [...this.queue];
    this.queue = [];

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    try {
      await flushEvent(batch);
    } catch (err) {
      console.log("Flush failed:", err);

      // 🔥 Retry logic
      if (retryCount < this.maxRetries) {
        console.log(`Retrying... (${retryCount + 1})`);

        // exponential backoff
        await new Promise((res) =>
          setTimeout(res, 500 * Math.pow(2, retryCount))
        );

        this.isFlushing = false;
        return this.flush(retryCount + 1);
      }

      // ❌ Put events back if retries exhausted
      this.queue = [...batch, ...this.queue];
    } finally {
      this.isFlushing = false;
    }
  }

  // 🔥 Flush when tab is hidden (user switches tab)
  handleVisibilityChange() {
    if (document.visibilityState === "hidden") {
      this.flush();
    }
  }

  // 🔥 Flush when user closes tab
  handleBeforeUnload() {
    if (this.queue.length > 0) {
      // use sendBeacon for reliability
      navigator.sendBeacon?.(this.endPoint, JSON.stringify(this.queue));

      this.queue = [];
    }
  }

  destroy() {
    this.flush();

    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );

    window.removeEventListener("beforeunload", this.handleBeforeUnload);

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
```