```
function getElementByStyle(element, property, value) {
  let children = element.children;
  let childNodes = Object.values(children);
  console.log(childNodes);
  let res = [];
  childNodes.forEach((node, ind) => {
    const styles = window.getComputedStyle(node);
    if (styles[property] === value) {
      console.log(ind, styles[property]);
      res.push(node);
    }
  });
  return res;
}

console.log(
  getElementByStyle(document.querySelector("#root"), "paddingBottom", "10px")
);

```
