const test = document.getElementById('textBox');
const defaultText = document.getElementById('default');
const debounceText = document.getElementById('debounce');
let count = 0;

function throttle(fn, delay) {
  let lastTimer = Date.now();
  let timeId = 0;
  return function(...args) {
    const timeDiff = Date.now() - lastTimer;
    if (timeDiff > delay) {
      fn(...args);
      lastTimer = Date.now();
    } else {
      clearTimeout(timeId);
      timeId = setTimeout(fn, delay - timeDiff, ...args)
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
