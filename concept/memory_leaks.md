# Memory Leaks

### Global Variables without Identifiers (let, const or var)

```
var global = "I am global";

function scopedFunction() {
    // Global scoped explicitly, without identifier
    scoped = "I am scoped" 
    let inner = "inner";
    console.log("variables - ", scoped, inner);
}

scopedFunction();
```

###  Not removing Event Listeners

```
const btn = document.getElementById("btn");

btn.addEventListener('click', () => {
    console.log('clicked');
});
```

### Mindfully use the Closures
```
function closuresExample() {
    const bigArr = new Array(1000).fill(5);

    return () => {
        console.log(bigArr);
    }
}

// printBigArr carry bigArr reference as part of the closure
// This closure reference won't allow the garbage collector to remove the reference of closureExample 

const printBigArr = closuresExample();
printBigArr();
```



### Not cleared Timers & Intervals

```
function printTimes(time) {
    console.log('Running - ', time);
}

const timer = setInterval(printTimes, 1000);
// If this interval call not cleared using clearInterval(timer)
// then it may cause memory leak
```