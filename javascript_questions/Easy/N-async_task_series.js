const prom1 = new Promise((resolve, reject) => {
  resolve("Promise 1 done.");
});

const prom2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 2 done.");
  }, 2000);
});

const prom3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 3 done.");
  }, 1500);
});

const prom4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 4 done.");
  }, 1000);
});

const promiseArr = [prom1, prom2, prom3, prom4];

async function executeInSeries(promiseArr) {
  for (const prom of promiseArr) {
    try {
      const res = await prom;
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
}

executeInSeries(promiseArr);
