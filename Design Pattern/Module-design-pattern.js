/*
-------------------Theory-----------------------
The module design pattern in JavaScript is one of the most used designed pattern for keeping particular pieces of code independent from other parts.


-------------------Code--------------------------
*/
// JS Design Patterns: Module

// Before ES6
(function() {

    // declare private variables and/or functions

    return {
      // declare public variables and/or functions
    }

})();

/* ---------------------------------------------------------------- */

// After ES6

/* lib/module.js */

class ShoppingDataType {
  constructor() {
    // private properties.
    this.shoppingList = ['coffee', 'chicken', 'pizza']
  }

  // public methods
  getShoppingList() {
    return this.shoppingList.join(", ")
  }

  addItem(item) {
   this.shoppingList.push(item)
  }
}

export default ShoppingDataType;

/* ---------------------------------------------------------------- */

/* main.js */
import ShoppingDataType from 'libs/module';

var shopping = new ShoppingDataType;
console.log(shopping.getShoppingList());
