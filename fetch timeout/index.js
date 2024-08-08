
const URL = 'https://jsonplaceholder.typicode.com/photos';

function fetchWithTimeout(url, timeout) {
  return new Promise((resolve, reject) => {
    const prom1 = fetch(url).then(response => response.json());
    const prom2 = new Promise((resolve, reject) => {
      const timer = setTimeout(()=>{
        reject(new Error(`Request timed out after ${timeout}ms`));
      },timeout)

      // clearing the timer if the prom1 is resolved first;
      prom1.finally(()=> {
        console.warn("Clearing the timer")
        clearTimeout(timer)
      });
    })
    const promArr = [prom1, prom2];
    Promise.race(promArr).then((res) =>{
      resolve(res);
    }).catch((err) => {
      reject(err);
    })
  })
}

fetchWithTimeout(URL, 300).then((res) => {
  console.log(res);
}).catch((err) => {
  console.warn(err);
})

