const bfObject1 = {
    name: "Ankit kumar",
    age: 25,
    gfFunction: function(a, b) {
        console.log(a, b, this);
    }
}

const bfObject2 = {
    name: "Rahul kumar",
    age: 22,
    gfFunction: function(a, b) {
        console.log(a, b, this);
    }
}

// If the function is along, with object, it will always point to the object
bfObject1.gfFunction(1, 2); // It is pointing to the object
let t = bfObject1.gfFunction; 
// For this case, at the time of calling it is not associate with 
// any other function 
t(1,2); // pointing to the "global" object


//////////////////////////////// CALL, APPLY and BIND ///////////


// CALL

bfObject1.gfFunction.call(bfObject2, 3,4); // pointing to the bfObject 2 
bfObject2.gfFunction.call(bfObject1, 4, 5) // pointing to the bfObject 1


// APPLY does the same thing, only syntactical change

bfObject1.gfFunction.apply(bfObject2, [3,4]); // pointing to the bfObject 2 
bfObject2.gfFunction.apply(bfObject1, [4, 5]) // pointing to the bfObject 1


// BIND behaves differently
// bind returns a function

let temp = bfObject1.gfFunction.bind(bfObject2);
console.log(temp);
temp(7, 8);
