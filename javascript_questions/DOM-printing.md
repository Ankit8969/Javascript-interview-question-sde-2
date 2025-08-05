# We have give the DOM object, we have to print this in the UI

## Input
```
const dom = {
  type: "section",
  props: {
    id: "section-1",
    class: "main-section",
    style: {
      backgroundColor: "lightblue",
      padding: "20px",
      borderRadius: "5px",
    },
  },
  children: [
    {
      type: "header",
      props: {
        style: {
          fontSize: "24px",
          color: "darkblue",
          textAlign: "center",
        },
      },
      children: "Welcome to Soni Frontend Doc",
    },
    {
      type: "article",
      props: {},
      children: [
        {
          type: "h2",
          props: {
            style: {
              color: "darkgreen",
            },
          },
          children: "Render DOM",
        },
        {
          type: "p",
          props: {
            style: {
              fontSize: "16px",
              color: "grey",
            },
          },
          children: "Try yourself first, then look for the solution",
        },
      ],
    },
    {
      type: "footer",
      props: {
        style: {
          textAlign: "center",
          fontSize: "14px",
          color: "black",
        },
      },
      children: "Thank you :)",
    },
  ],
};
```


## Solution
```

function createElement(dom) {
  const elementType = dom.type;
  const newElement = document.createElement(elementType);
  newElement.id = dom.props.id || "";
  newElement.className = dom.props.class || "";

  if(dom.props.style && Object.keys(dom.props.style).length > 0) {
    Object.keys(dom.props.style).forEach((key) => {
      newElement.style[key] = dom.props.style[key];
    });
  }
  return newElement;
}


function createRealDom(dom) {

  let updatedElement = createElement(dom);
  if(Array.isArray(dom.children)) {
    dom.children.forEach((child) => {
      updatedElement.appendChild(createRealDom(child))
    })
  }else {
    updatedElement.innerHTML = dom.children;
  }
  return updatedElement;
}


let parent = document.querySelector(".main");
let updatedDom = createRealDom(dom, parent);
parent.appendChild(updatedDom);

```





