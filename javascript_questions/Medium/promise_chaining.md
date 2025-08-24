## Promise chaining Example

```

function fun1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Resolved first promise");
    }, 2000);
  });
}

function fun2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Resolved second promise");
    }, 2000);
  });
}

function fun3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Resolved third promise");
    }, 2000);
  });
}
```

```
fun1()
  .then((res) => {
    console.log(res);
    return fun2();
  })
  .then((res) => {
    console.log(res);
    return fun3();
  })
  .then((res) => {
    console.log(res);
  });

```