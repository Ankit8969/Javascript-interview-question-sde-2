const test = document.getElementById('textBox');
const defaultText = document.getElementById('default');
const debounceText = document.getElementById('debounce');
let count = 0;

function throttle(func, delay) {
  let timer = null;
  let lastTyped = Date.now();

  return function(...args) {
    let currentTimeLapsed = Date.now() - lastTyped;
    if (currentTimeLapsed > delay) {
      func(...args);
      lastTyped = Date.now();
    }else {
      clearTimeout(timer);
      timer = setTimeout(()=>{
        func(...args);
        lastTyped = Date.now();
      }, delay - currentTimeLapsed);
    }
  }
}

function updateThrottle(text) {
  debounceText.innerText = text;
  console.log("Count: " + ++count);
}

const enhancedFun = throttle(updateThrottle, 1000);

test.addEventListener('input', (event)=>{
  defaultText.innerText = event.target.value;
  enhancedFun(event.target.value);
})
