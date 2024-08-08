// Pipe and Compose 
const add2 = (x) => x + 2;
const subtract1 = (x) => x - 1;
const multiply5 = (x) => x * 5;

// inside - outside and right-left
const ans = add2(subtract1(multiply5(5)));
const dividedBy = (divisor, num) => num / divisor;

console.log(ans);

// Compose Function 
// by using reduce we can implement compose function 

// Reduce is HOC, because it takes a function as argument and return a function 
const compose = (...args) => {
  return (val) => {
    return args.reduceRight((prev, currFun) => {
      return currFun(prev);
    }, val)
  }
}

const compResult = compose(
  add2, 
  subtract1, 
  multiply5,
  (x) => dividedBy(2, x)
)(5);
console.log(compResult);

// Pipe Function moves from left to right
const pipe = (...args) => {
  return (val) => {
    return args.reduce((prev, currFun) => {
      return currFun(prev);
    }, val);
  }
}

const divBy = (divisor) => (num) => num / divisor; // currying
const dividedBy2 = divBy(2); // partially applied.

const pipeResult = pipe(
  add2, 
  subtract1, 
  multiply5,
  dividedBy2
)(5);
console.log(pipeResult);



//////////////////////////////////////////////////////////////////

const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ex dolores nostrum esse voluptate cupiditate cum qui, molestias doloribus, eaque explicabo animi magnam."


const wordsList = (lorem) => lorem.split(" ");
const getLength = (wordsList) => wordsList.length;

console.log(getLength(wordsList(lorem)));

const stringPipe = pipe(
  wordsList,
  getLength
);

console.log("StringPipe: ", stringPipe(lorem));


//////////////////////////////////////////////////////////////////
// let's create a palindrome check with pipe function


let str1 = "ABBA ABBA";
let str2 = "ACID DICA"
let str3 = "ANK IT";


const lowerCaseConvertor = (string) => string.toLowerCase();
const split = (string) => string.split("");
const join = (string) => string.join('');
const reverse = (string) => string.reverse();

const fwdPipe = pipe(
  lowerCaseConvertor,
  split,
  join
);

const bwdPipe = pipe(
  lowerCaseConvertor,
  split,
  reverse,
  join
);

console.log(">>>>>>>>>>>>>>>>>> Palindrome checking <<<<<<<<<<<<<<<<<")
console.log(fwdPipe(str1),bwdPipe(str1),  fwdPipe(str1) === bwdPipe(str1))
console.log(fwdPipe(str2),bwdPipe(str2),fwdPipe(str2) === bwdPipe(str2))
console.log(fwdPipe(str3),bwdPipe(str3),fwdPipe(str3) === bwdPipe(str3))








