
function cancelableTimeout(timer) {
  let cancelID = null;
  cancelID = setTimeout(() => {
    console.log('Settimeout called');
    cancelID = null;
  }, timer);

  return () => {
    if(cancelID) {
      console.log("Clearing the timer...");
      clearTimeout(cancelID);
    }
  }
}

let cancelFun = cancelableTimeout(3000);

setTimeout(() => {
  cancelFun();
}, 2000)
