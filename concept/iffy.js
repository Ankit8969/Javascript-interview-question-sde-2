
// IIFE - immediately invoke function expression

// syntax

// way-1
(()=>{

})();

// way-2
(function(){

})();

// way-3
(function myIIFE(){

})();



// Reason - 1) Does not pollute the global object namespace.

// We can use this for isolation

const x = "whatever";
const helloworld = () => "Hello World!";

(()=> {
  const x = "iife whatever";
  const helloworld = () => "Hello IIFE!";
  console.log(x);
  console.log(helloworld());
})();



// Reason - 2) Private variables and Methods from Closure 

const increment = (()=> {
  let counter = 0;
  console.log(counter);
  const credits = (num) => console.log(`I have ${num} credits`);
  return () => {
    counter++;
    credits(counter);
  }
})();
// increment();
// increment();


// Reason - 3) 
/*
The module pattern in JavaScript is a design pattern that helps you to encapsulate 
and manage the functionality of your code by creating private and public elements. 
It provides a way to organize code and manage the scope of variables and functions, 
making it easier to avoid conflicts and create reusable code.
*/

// Module Pattern
const Score = (()=>{
  let counter = 0;
  return {
    increment:()=>{counter++;},
    getIncrement:()=>{
      return counter;
    },
    reset: ()=>{
      counter = 0;
    }
  }
}
)();

Score.increment();
console.log(Score.getIncrement())

Score.increment();
console.log(Score.getIncrement())
Score.increment();
console.log(Score.getIncrement())


// Reveling Pattern
const Game = (()=>{
  let counter = 0;
  const increment = ()=>{counter++;};
  const getIncrement = ()=>{ return counter }
  const reset = ()=> { counter = 0; }
  return {
    increment,
    getIncrement,
    reset
  }
}
)();

Game.increment();
console.log(Game.getIncrement())

Game.increment();
console.log(Game.getIncrement())
Game.increment();
console.log(Game.getIncrement())
