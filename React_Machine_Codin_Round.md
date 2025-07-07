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
