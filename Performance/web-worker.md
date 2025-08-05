# UnderStanding the Web Worker
You would use Web Workers in cases where you have heavy computations or long-running tasks that could block the main thread (UI thread).

| Scenario                                                   | Why Web Worker is Needed                                 |
| ---------------------------------------------------------- | -------------------------------------------------------- |
| **Heavy computations** (math, data crunching, loops)       | To avoid UI freeze and keep the page responsive          |
| **Parsing large JSON/XML files**                           | Parsing on main thread can cause lag during scroll/click |
| **Image or Video processing** (e.g., filters, resizing)    | Pixel-by-pixel operations are CPU intensive              |
| **Complex Data Transformations** (Data visualization prep) | Pre-processing large datasets for charts/graphs          |
| **Encryption/Decryption tasks**                            | Crypto operations are computationally heavy              |
| **Background data synchronization**                        | Syncing/updating data in background without blocking UI  |
| **Simulating large physics calculations / AI algorithms**  | Game simulations, ML models needing CPU cycles           |




Code Snippet
---

```
index.js

const normal_button = document.querySelector(".normal");
const heavy_button = document.querySelector(".heavy");

normal_button.addEventListener("click", handleNormalClick);
heavy_button.addEventListener("click", handleHeavyClick);

function handleNormalClick(e) {
  let h2 = document.createElement("h2");
  h2.innerText = "Hi!";
  document.body.append(h2);
}

function handleHeavyClick(e) {
  let heavyTask = new Worker("worker.js");
  heavyTask.postMessage("start");
  
  heavyTask.onmessage = function(event) {
    let h2 = document.createElement("h2");
    h2.innerText = event.data;
    document.body.append(h2);
  };
}

```


``` 
worker.js


onmessage = function(e) {
  if (e.data === "start") {
    // Simulating a heavy task
    let temp = false;
    for (let i = 0; i < 10000000000; i++) {
      temp = !temp;
    }
    postMessage("Heavy task completed");
  }
  - No need to return anything here, as the message will be sent back to the main thread

  - when the heavy task is done.
  // The worker will automatically terminate after this function completes.
  
  close(); // Close the worker when done
  
  - This is optional, but it's a good practice to close the worker when it's no longer
}
```
