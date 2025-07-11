## Dragable Component
The following property should be added directly to the item itself.
- Setting ```draggable={true}``` will enable the element to be draggable.
- Once enabled, the element will support two key handlers: ```onDragStart={handler}``` and ```onDragEnd={handler}```.
- The parent container also needs to have specific properties for handling drop logic.
- Since we now have information about onDragStart and onDragEnd, we need to detect where the item is being dropped. For that, use the ```onDrop={handler}``` event.
- Example: ```onDrop={(event) => handleDrop(event, header)}```
- Also add ```onDragOver={handleDragOver}``` to the drop target, and ensure you call ```event.preventDefault()``` inside it — because by default, elements do not allow other elements to be dropped onto them. Example: event.preventDefault()

```
  const initialState = {
    Todo: [
      "No-vnc exploration going",
      "Learning Node.js",
      "Learning JavaScript",
      "Done with Images",
    ],
    Testing: ["React.js Testing is going", "Video recording going on"],
    Completed: [
      "2.3 Release is done",
      "231 Testing is done",
      "New Customer on-boarded",
    ],
  };
```


## Creating useMemo custom Hook
- For convention we should start with ```use``` keywork such that it will looks like hook
- This thing we can also achieve with some utils function also but why we are calling this as a custom Hook because we are using react related things inside custom hooks
```
import { useRef } from "react";
export const useCustomMemo = function (cb, dependencyArr = []) {
  let previouseRef = useRef({
    previouseResult: undefined,
    previouseArr: [],
  });

  if (
    !previouseRef.current.previouseResult ||
    ifNotEqual(previouseRef.current.previouseArr, dependencyArr)
  ) {
    previouseRef.current.previouseResult = cb();
    previouseRef.current.previouseArr = dependencyArr;
  }

  return previouseRef.current.previouseResult;
};

function ifNotEqual(arr1, arr2) {
  if (arr1.length != arr2.length) return true;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return true;
  }
  return false;
}
```
-------
```
  let value = useCustomMemo(() => {
    return makeCall(num);
  }, [num]);

```


## Folder Structure
- In this Type of Machine coding round,  Either we can store some internal state to handle this or we can update our global state
- If we have multiple different type of operation like ***Add*** ***Delete*** ***Edit***, then we can use ***switch and case***

  ```
  const handleTreeOpenClose = (event, eventName, id) => {
    event.stopPropagation();
    let updatedFiles = "";
    console.log(eventName, id);
    switch (eventName) {
      case OPEN_CLOSE:
        updatedFiles = doUpdateisOpen(files, id);
        break;
      case DELETE_FOLDER:
        updatedFiles = handleDeleteItem(files, id);
        break;
      case ADD_FOLDER:
        updatedFiles = handleAddItem(files, id);
        break;
      default:
        console.log("Default Executed: ", event);
        break;
    }
    console.log(updatedFiles);
    setFiles({
      ...updatedFiles,
    });
  };
  ```

```
{
    "id": 1,
    "name": "Root",
    "isOpen": true,
    "children": [
        {
            "id": 2,
            "name": "src",
            "isOpen": true,
            "children": [
                {
                    "id": 6,
                    "name": "test.jpg",
                    "isOpen": true,
                    "children": []
                },
                {
                    "id": 7,
                    "name": "besg.png",
                    "isOpen": true,
                    "children": []
                }
            ]
        },
        {
            "id": 3,
            "name": "Images",
            "isOpen": false,
            "children": [
                {
                    "id": 4,
                    "name": "user.jpg",
                    "isOpen": true,
                    "children": []
                },
                {
                    "id": 5,
                    "name": "building.png",
                    "isOpen": true,
                    "children": []
                }
            ]
        }
    ]
}
```


## Comment Box Object

```
const [commentState, setCommentState] = useState([
    {
      id: 1,
      comment: "Hey there, how are you?",
      children: [
        {
          id: 2,
          comment: "I'm good! How about you?",
          children: [
            {
              id: 3,
              comment: "Doing well, just working on some React stuff.",
              children: [
                {
                  id: 4,
                  comment: "Nice! What kind of project?",
                  children: [
                    {
                      id: 5,
                      comment: "A drag-and-drop UI with nested comments.",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 6,
      comment: "Anyone tried using Zustand for state management?",
      children: [
        {
          id: 7,
          comment: "Yes, it's pretty neat for small-to-medium apps.",
          children: [
            {
              id: 8,
              comment: "Does it support persistence?",
              children: [
                {
                  id: 9,
                  comment: "Yup, with middleware like `persist`.",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 10,
      comment: "Any tips for optimizing React rendering?",
      children: [
        {
          id: 11,
          comment: "Use `React.memo` and avoid unnecessary re-renders.",
          children: [
            {
              id: 12,
              comment: "And don't forget `useCallback` and `useMemo`!",
              children: [],
            },
          ],
        },
      ],
    },
  ]);
```

## Star Rating
- We need to use 3 listener
- ***onClick*** , ***onMouseLeave***, ***onMouseEnter***
- 

## OTP Boxes
- To Implement this , we have few requirements like auto-focus and one box has one text
- In ```input``` we need to pass few attribute like ```maxLength={1}```
- For auto focus, we need to use the same length array of with the help of ```useRef```
- ```onChange``` will take care the number press but for key press we hav to use ```onKeyDown```

```
  const handleKeyDown = (e, ind) => {
    console.log("Test");
    if (e.key === "Backspace") {
      if (boxes[ind]) {
        const newBoxes = [...boxes];
        newBoxes[ind] = "";
        setBoxes(newBoxes);
      } else if (ind > 0) {
        boxesRef.current[ind - 1]?.focus();
        const newBoxes = [...boxes];
        newBoxes[ind - 1] = "";
        setBoxes(newBoxes);
      }
    } else if (e.key === "ArrowLeft" && ind > 0) {
      boxesRef.current[ind - 1]?.focus();
    } else if (e.key === "ArrowRight" && ind < 4) {
      boxesRef.current[ind + 1]?.focus();
    }
  };
```

## Infinite Scroll Bar
- We have to use ***new IntersectionObserver()*** API to implement this.

```

export default function App() {
  const [items, setItems] = useState(
    Array(12)
      .fill("")
      .map((item, ind) => ind + 1)
  );
  const scrollableBoxRef = useRef();
  const infiniteObserver = useRef();

  const updateEntries = () => {
    setItems((prevItems) => {
      const nextItems = Array.from(
        { length: 10 },
        (_, ind) => prevItems.length + ind + 1
      );
      return [...prevItems, ...nextItems];
    });
  };

  const getLastElement = () => {
    let children = scrollableBoxRef.current.childNodes;
    let len = children.length;
    let lastElement = children[len - 1];
    return lastElement;
  };

  useEffect(() => {
    infiniteObserver.current = new IntersectionObserver((elements) => {
      const lastElement = elements[0];
      const { target, isIntersecting } = lastElement;
      if (isIntersecting) {
        infiniteObserver.current.unobserve(target);
        updateEntries();
      }
    });

    // cleanup call
    return () => infiniteObserver.current.disconnect();
  }, []);

  useEffect(() => {
    if (scrollableBoxRef.current) {
      let lastElement = getLastElement();
      infiniteObserver.current.observe(lastElement);
    }
  }, [items]);

  return (
    <React.Fragment>
      <h2>Infinite Scroll</h2>
      <div className="scroll_box" ref={scrollableBoxRef}>
        {items.map((item, ind) => (
          <div className="row">{ind + 1}</div>
        ))}
      </div>
    </React.Fragment>
  );
}
```

## useFetch Custom Hook
- ***Note-*** When a child component exposes its internal state to the parent (instead of returning JSX), any changes to that state will cause the parent component to re-render, as it becomes dependent on that state.

- So, In the custom hooks this is what we are doing, because of this the parent component gets re-render automatically.

### useFetch with debounce
```
import { useEffect, useState, useRef } from "react";

const fetchData = async (updatedURL) => {
  try {
    const res = await fetch(updatedURL);
    const jsonRes = await res.json();
    const { products } = jsonRes;
    return products;
  } catch (err) {
    throw err;
  }
};

const debounce = (fun, delay) => {
  let timerId = null;
  return function (...args) {
    return new Promise((resolve, reject) => {
      clearTimeout(timerId);
      timerId = setTimeout(async () => {
        let res = await fun(...args);
        resolve(res);
      }, delay);
    });
  };
};

const deboucedFun = debounce(fetchData, 1000);

export const useFetch = (URL) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    deboucedFun(URL)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [URL]);

  return {
    data,
    loading,
    error,
  };
};
```


### Parent Component
```
export default function App() {
  const [text, setText] = useState("");
  const URL = "https://dummyjson.com/products/search?q=" + text;

  const { data: items, loading, error } = useFetch(URL);
  return (
    <div className="app">
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Search products..."
      />

      <div className="search_result">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error fetching data</p>}
        {items?.length > 0 &&
          items?.map((item) => <p key={item.id}>{item.title}</p>)}
      </div>
    </div>
  );
}
```

