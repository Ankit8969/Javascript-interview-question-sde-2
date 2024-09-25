

function getResult(){
  return new Promise((resolve, reject) => {
    let randomNum = parseInt(Math.random()*10);
    if (randomNum < 4)
        resolve("DONE");
    else 
      reject("FAiled!")
  })
}


async function fetchAutoRetry(getData, retryCount) {
  try {
    const res = await getData();
    console.log("RES: ", retryCount , res);
    return res;
  }catch(err) {
    console.log("Err: ", retryCount , err);
    if (retryCount === 0){
      return "Failed to get the data even, after retrying";
    }else {
      return fetchAutoRetry(getData, retryCount - 1);
    }
  }
}

(async ()=>{
  console.log("Started fetching..............")
  let response = await fetchAutoRetry(getResult, 5);
  console.log(response);

  console.log("End fetching........")
})();



