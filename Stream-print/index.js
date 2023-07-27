class SDK {
  constructor() {
    this.queue = [];
    this.count = 0;
  }
  logEvent = (info) => {
    this.queue.push("Analytics send " + info);
  };
  sleep = (time) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.count % 5 === 0) {
          reject();
        } else {
          resolve();
        }
      }, time);
    });
  };
  send = async () => {
    // base condition for recursive call
    if (this.queue.length === 0) return;
    // get the first value
    let current = this.queue.shift();
    try {
      await this.sleep(1000);
      this.count++;
      console.log("Analytics sent " + current);
    } catch (err) {
      // if exection fails
      console.log("-----------------------");
      console.log("Failed to send " + current);
      console.log("Retrying sending " + current);
      console.log("-----------------------");
      this.count = 1;
      this.queue.unshift(current);
    } finally {
      this.send();
    }
  };
  print = () => {
    console.log(this.queue);
  };
}

const sdk = new SDK();

sdk.logEvent("event 1");
sdk.logEvent("event 2");
sdk.logEvent("event 3");
sdk.logEvent("event 4");
sdk.logEvent("event 5");
sdk.logEvent("event 6");
sdk.logEvent("event 7");
sdk.logEvent("event 8");
sdk.logEvent("event 9");
sdk.logEvent("event 10");
sdk.logEvent("event 11");
sdk.logEvent("event 12");
sdk.logEvent("event 13");
sdk.logEvent("event 14");
sdk.logEvent("event 15");
sdk.logEvent("event 16");
sdk.logEvent("event 17");
sdk.logEvent("event 18");
sdk.logEvent("event 19");
sdk.logEvent("event 20");

sdk.send();
