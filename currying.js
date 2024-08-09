// Currying 

// Currying takes a function that receives more than one parameter and breaks
// it into a series of unary functions.

// Therefore, curried functions takes only one argument

// Eg: 

const buildSandwich = (ingredient1) => {
  return (ingredient2) => {
    return (ingredient3) => {
      return `${ingredient1} ${ingredient2} ${ingredient3}`;
    }
  }
}

const mySandwich = buildSandwich("Bread")("Cheese")("Tomato");
console.log(mySandwich)

// Above works, but if we add one more function it will become ugly


// better way to do the same thing

const buildSammy = ingredient1 => ingredient2 => ingredient3 => 
    `${ingredient1} ${ingredient2} ${ingredient3}`;


const buildSammySandwich = buildSammy("Bread")("Corn")("Cheese");
console.log(buildSammySandwich)




// Function Composition

const addCustomer = fn => (...args) => {
  console.log('Saving customer details...');
  return fn(...args);
}

const processOrder = fn => (...args) => {
  console.log('Processing order...');
  return fn(...args);
}

let completeOrder = (...args) => {
  console.log(`Order #${[...args].toString()} completed.`)
}


const x = addCustomer(processOrder(completeOrder));

x("100", "200");































