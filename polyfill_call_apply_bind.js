
let obj = {
  fname: "Ankit",
  lname: "yadav"
}

let obj2 = {
  fname: "Sonu",
  lname: "yadav"
}

function getName(method){
  console.log(this.fname + " " + this.lname + " : " + method);
}
 
Function.prototype.myBind = function (...args) {
  const fun = this;
  return function() {
    fun.call(...args);
  } 
}

let bindTemp = getName.myBind(obj, "Bind Method");
bindTemp();

// getName.call(obj);

Function.prototype.myCall = function (...args) {
  const fun = this;
  return fun.call(...args);
}

getName.myCall(obj, "Call Method");



Function.prototype.myApply = function (...args) {
  const fun = this;
  return fun.call(...args);
}


getName.myApply(obj,["Apply Method"]);

