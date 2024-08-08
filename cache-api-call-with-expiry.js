// Cached api call with expiry time
const URL = 'https://jsonplaceholder.typicode.com/photos';

function cachedApiCall(time) {
  let cachedRes = {};
  let lastTime = 0;
  return async function(url) {
    const currDiff = new Date().getTime() - lastTime;
    if (currDiff < time) {
      console.log("Cached response")
      return cachedRes;
    }
    const data = await fetch(url).then((res)=> res.json()).then((res) => res);
    lastTime = new Date().getTime();
    console.log("Freshed response")
    cachedRes = data;
    return data;
  }
}

async function main(){
  let cache = cachedApiCall(1500);

  let res1 = await cache(URL);
  console.log(res1);

  let res2 = await cache(URL);
  console.log(res2);

  let res3 = await cache(URL);
  console.log(res3);

  let res4 = await cache(URL);
  console.log(res4);

  setTimeout(async ()=>{
    let res5 = await cache(URL);
    console.log(res5);
  },1000)
}

main();
