## How to implement an Asynchronous Task Runner with Concurrency Control? Rippling Frontend Interview Question ?
[Devtools Tech Question](https://devtools.tech/questions/s/how-to-implement-an-asynchronous-task-runner-with-concurrency-control-rippling-frontend-interview-question---qid---QCu4pbqp5zgxZQaQzh0D)
 - Example
```
const ex = new TaskRunner(3);

// Simulated async tasks
const t1 = async () => { console.log('t1 started'); await delay(2000); console.log('t1 finished'); };
const t2 = async () => { console.log('t2 started'); await delay(1000); console.log('t2 finished'); };
const t3 = async () => { console.log('t3 started'); await delay(1500); console.log('t3 finished'); };
const t4 = async () => { console.log('t4 started'); await delay(1000); console.log('t4 finished'); };
const t5 = async () => { console.log('t5 started'); await delay(500); console.log('t5 finished'); };

// Add tasks to the executor
ex.push(t1);  // Starts immediately
ex.push(t2);  // Starts immediately
ex.push(t3);  // Starts immediately
ex.push(t4);  // Waits until at least one task finishes
ex.push(t5);  // Waits until another task finishes
```

## Output
```
t1 started
t2 started
t3 started
t2 finished
t4 started
t3 finished
t5 started
t1 finished
t5 finished
t4 finished
```

## Solution
```
class TaskRunner {
  constructor(concurrency) {
    // write your code below
    this.maxLimit = concurrency;
    this.pendingTask = [];
    this.onGoingTask = 0;
  }

  async execute(task) {
    this.onGoingTask += 1;
    try {
      await task();
    }finally{
      this.onGoingTask -= 1;
      if (this.pendingTask.length > 0 && this.onGoingTask < this.maxLimit) {
        this.execute(this.pendingTask[0]);
        this.pendingTask.splice(0, 1);
      }
    }
  }

  push(task) {
    // write your code below
    if (this.onGoingTask >= this.maxLimit) {
      this.pendingTask.push(task);
    } else {
      this.execute(task);
    }
  }
}
```



