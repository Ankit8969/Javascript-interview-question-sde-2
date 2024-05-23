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




// selecting the input box
let inputBox = document.querySelector('input');
let debounceP = document.querySelector('.debounce');
let debounceN = document.querySelector('.normal');

function normalFunction(e) {
    console.log("Normal function")
    debounceN.innerHTML = e.target.value;
}

// I need to taking care of the last typed time 
// to handle this I have to use closure

function updatedFunction() {
    let timer;
    return function(e) {
        const { value } = e.target;
        clearTimeout(timer);
        timer = setTimeout(() => {
            console.log("Debounced Function")
            debounceP.innerHTML = value;
        }, 500)
    }
}

let enhancedDebounce = updatedFunction();
inputBox.addEventListener('keyup', (e) => {
    normalFunction(e)
    enhancedDebounce(e);
})
