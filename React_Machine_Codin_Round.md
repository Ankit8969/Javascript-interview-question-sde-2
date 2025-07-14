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

### Virtualization Table component
```
import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

// Simulate fetching data in chunks
const fetchData = (start = 0, limit = 30) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newData = Array.from(
        { length: limit },
        (_, i) => `Item ${start + i + 1}`
      );
      resolve(newData);
    }, 1000);
  });
};

export default function App() {
  const [items, setItems] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef();
  const rowHeight = 40;
  const visibleCount = 15;

  useEffect(() => {
    loadMore(); // initial fetch
  }, []);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    const newItems = await fetchData(items.length, 30);
    setItems((prev) => [...prev, ...newItems]);
    if (newItems.length < 30) setHasMore(false);
    setLoading(false);
  };

  const onScroll = (e) => {
    const scrollTop = e.target.scrollTop; // how much we have scrolled from top.
    setScrollTop(scrollTop);

    const scrollHeight = e.target.scrollHeight; // Total height of the scroll container.
    const clientHeight = e.target.clientHeight; // Window height

    console.log({
      scrollTop: scrollTop,
      scrollHeight: scrollHeight,
      clientHeight: clientHeight,
    });

    // Trigger loadMore when near bottom
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      loadMore();
    }
  };

  const startIdx = Math.floor(scrollTop / rowHeight);
  const endIdx = Math.min(items.length - 1, startIdx + visibleCount);
  const visibleItems = items.slice(startIdx, endIdx + 1);

  const paddingTop = startIdx * rowHeight;
  const paddingBottom = (items.length - endIdx - 1) * rowHeight;

  return (
    <div className="app">
      <div
        className="scroll-container"
        onScroll={onScroll}
        ref={containerRef}
        style={{
          height: `${visibleCount * rowHeight}px`,
          overflowY: "auto",
          border: "1px solid #ccc",
        }}
      >
        <div style={{ paddingTop, paddingBottom }}>
          {visibleItems.map((item, idx) => (
            <div
              className="row"
              key={startIdx + idx}
              style={{
                height: `${rowHeight}px`,
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #eee",
                paddingLeft: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {loading && <p>Loading more items...</p>}
    </div>
  );
}

```

## Memory Game Flip
<img width="343" height="345" alt="image" src="https://github.com/user-attachments/assets/8c56929c-c14c-4b8a-879b-b007c1589dcb" />

```
import React, { useEffect, useRef, useState } from "react";

const getGameBox = (n) => {
  let arr = Array.from({ length: (n * n) / 2 }).map((item, ind) => ind + 1);
  let grid = [...arr, ...arr];
  grid.sort(() => Math.random() - 0.5);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = {
      id: i,
      number: grid[i],
      isFlipped: false,
    };
  }
  return grid;
};

const GameRow = ({ partiallySelected, item, handleFlip }) => {
  let active = "";
  if (partiallySelected.includes(item.id)) active = "active";
  return (
    <div onClick={handleFlip} className={`game_cell ${active}`}>
      {item.isFlipped ? item.number : "?"}
    </div>
  );
};

const MemoryGame = () => {
  const BOARD_SIZE = 4;
  const [game, setGame] = useState(getGameBox(BOARD_SIZE));
  const [partiallySelected, setPartiallySelected] = useState([]);
  const [isLock, setIsLock] = useState(false);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${BOARD_SIZE}, 80px)`,
    gridTemplateRows: `repeat(${BOARD_SIZE}, 80px)`,
  };

  const handleFlip = (ind) => {
    if (isLock || game[ind].isFlipped) return;
    setGame((prev) => {
      let copy = [...prev];
      copy[ind].isFlipped = true;
      return copy;
    });
    setPartiallySelected([...partiallySelected, ind]);
  };

  useEffect(() => {
    if (partiallySelected.length === 2) {
      const [x, y] = partiallySelected;
      if (game[x].number !== game[y].number) {
        setIsLock(true);
        setTimeout(() => {
          setGame((prev) => {
            let gameCopy = [...prev];
            gameCopy[x].isFlipped = false;
            gameCopy[y].isFlipped = false;
            return gameCopy;
          });
          setIsLock(false);
          setPartiallySelected([]);
        }, 3000);
      } else {
        setPartiallySelected([]);
      }
    }
  }, [partiallySelected]);

  return (
    <React.Fragment>
      <div style={gridStyle} className="game_board">
        {game.map((item, rowIndex) => (
          <GameRow
            partiallySelected={partiallySelected}
            key={rowIndex}
            item={item}
            handleFlip={() => handleFlip(rowIndex)}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default MemoryGame;
```

## Intermediate CheckBox problem

<img width="640" height="617" alt="image" src="https://github.com/user-attachments/assets/7d4b8648-0b10-4028-8ab3-59e77f32e86a" />


```
import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

let tempDeep = {
  id: 1,
  label: "Root Node",
  isSelected: false,
  children: [
    {
      id: 2,
      label: "Level 1 - Child A",
      isSelected: false,
      children: [
        {
          id: 3,
          label: "Level 2 - Child",
          isSelected: false,
          children: [
            {
              id: 4,
              label: "Level 3 - Leaf",
              isSelected: true,
              children: [],
            },
            {
              id: 5,
              label: "Level 3 - Leaf",
              isSelected: true,
              children: [],
            },
          ],
        },
        {
          id: 6,
          label: "Level 2 - Leaf A2",
          isSelected: true,
          children: [],
        },
      ],
    },
    {
      id: 7,
      label: "Level 1 - Child B",
      isSelected: false,
      children: [
        {
          id: 8,
          label: "Level 2 - Child B1",
          isSelected: false,
          children: [
            {
              id: 9,
              label: "Level 3 - Child",
              isSelected: false,
              children: [
                {
                  id: 10,
                  label: "Level 4 - Leaf",
                  isSelected: true,
                  children: [],
                },
                {
                  id: 11,
                  label: "Level 4 - Leaf",
                  isSelected: false,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 12,
      label: "Level 1 - Leaf C",
      isSelected: true,
      children: [],
    },
  ],
};
```
```
const NestedCheckBox = ({ handleUpdate, checkBoxes }) => {
  return (
    <div>
      <input
        value={checkBoxes.isSelected}
        type="checkbox"
        checked={checkBoxes.isSelected}
        name=""
        id=""
        onClick={() => handleUpdate(checkBoxes.id)}
      />
      <label htmlFor=""> {checkBoxes.label} </label>
      <br />

      {checkBoxes.children.map((item) => (
        <NestedCheckBox handleUpdate={handleUpdate} checkBoxes={item} />
      ))}
    </div>
  );
};

export default function App() {
  const [checkBoxes, setCheckBoxes] = useState(tempDeep);

  function selectCheckBox(obj, id, flag) {
    for (let i = 0; i < obj.children.length; i++) {
      obj.children[i].isSelected = flag;
    }

    return obj;
  }

  function dfs(obj, id, isDecendent, parentValue) {
    if (obj.id === id) {
      obj.isSelected = !obj.isSelected;
    }
    if (isDecendent) {
      obj.isSelected = parentValue;
    }
    if (obj.children.length === 0) return obj.isSelected;

    let allSelected = true;
    for (let i = 0; i < obj.children.length; i++) {
      dfs(obj.children[i], id, obj.id === id || isDecendent, obj.isSelected);
    }

    return allSelected;
  }

  const handleUpdate = (id) => {
    console.log("ID: ", id);
    let temp = structuredClone(checkBoxes);
    // First select the checkbox of all its children
    dfs(temp, id);
    setCheckBoxes({ ...temp });
  };

  return (
    <div className="stepper">
      <NestedCheckBox handleUpdate={handleUpdate} checkBoxes={checkBoxes} />
    </div>
  );
}

```



