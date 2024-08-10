// run the below script and when you will click on any element you will get the path.
class CssSelector {
  constructor(){
    this.handleCurrentSelectedElement = 
      this.handleCurrentSelectedElement.bind(this);
    this.getNthChildNodesQuery = this.getNthChildNodesQuery.bind(this);
  }

  getValidPath(element) {
    if (!element) return '';
    const name = element.tagName.toLowerCase();
    if (name === "body")  return "body";
    // IF element has Id then we can return directly from here
    if(element.hasAttribute('id')) {
      return `${name}#${element.getAttribute('id')}`;
    }
    return name + " " + this.getValidPath(element.parentNode)
  }

  getNthChildNodesQuery(element) {
    const parentElement = element.parentElement;
    const allItems = Array.from(parentElement.children);
    const index = allItems.indexOf(element);
    
    // Access the element using nth-child
    const nthChildElement = parentElement.querySelector(`:nth-child(${index + 1})`);

    // now returning the path of that selected element, 
    // respect to the parent
    return `${element.tagName.toLowerCase()}:nth-child(${index+1})`;
  }

  handleCurrentSelectedElement(event){
    // console.log(event.target);
    // If element has Id then we can uniquely identify
    const element = event.target;
    event.stopPropagation();
    const nthChildPath = this.getNthChildNodesQuery(element);
    const path = this.getValidPath(element.parentNode);
    const arr = path.split(' ').reverse();
    arr.push(nthChildPath);

    const updatedPath = arr.join('> ');
    console.log("Selected Element Path: ", updatedPath);

    const elementSelected = document.querySelector(updatedPath);
    console.log(elementSelected);
    return updatedPath; 
  }

  startSelector() {
    const bodyTag = document.querySelector('body');
    const allElementBody = bodyTag.querySelectorAll('*');
    // allElementBody - Array
    allElementBody.forEach((element) => {
      element.addEventListener('click', this.handleCurrentSelectedElement)
    })
  }

  stopSelector(){
    const bodyTag = document.querySelector('body');
    const allElementBody = bodyTag.querySelectorAll('*');
    // allElementBody - Array
    allElementBody.forEach((element) => {
      element.removeEventListener('click')
    })
  }
}

const s = new CssSelector();
const temp = s.startSelector();
