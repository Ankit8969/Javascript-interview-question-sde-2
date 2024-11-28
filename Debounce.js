/*
--------- index.html -------
<body>
    <h2>Debounce</h2>
    <input type="text">
    <br/>
    <div class="box">
        <span>Debounce Function: </span> <p class="debounce"></p>
    </div>
    <br/>
    <div class="box">
        <span>Normal function: </span>
    <p class="normal"></p>
    <script src="./index.js"></script>
    </div>
</body>



*/



let inputBox = document.querySelector('input')

function printNormal(e){
  let p = document.querySelector('.normal');
  p.innerHTML = e.target.value;
}

function printDebounce(e){
  let p = document.querySelector('.debounce');
  p.innerHTML = e.target.value;
}
function printThrottle(e){
  let p = document.querySelector('.throttle');
  p.innerHTML = e.target.value;
}

function debounce(fn, delay) {
  let timer = 0;
  return function(...args){
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(null, ...args);
    }, delay);
  }
}

function throttle(fn, delay) {
  let flag = true;
  return function(...args) {
    if (flag) {
      fn.call(null, ...args);
      flag = false;
      setTimeout(() => flag = true, delay);
    }
  }
}



let debouncedFun = debounce(printDebounce, 1000)
let throttleFun = throttle(printThrottle, 1000);

inputBox.addEventListener('keydown', (e) => {
  printNormal(e);
  debouncedFun(e);
  throttleFun(e);
})






