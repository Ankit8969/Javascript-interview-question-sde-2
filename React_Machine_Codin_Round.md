## Dragable Component
The following property should be added directly to the item itself.
- Setting ```draggable={true}``` will enable the element to be draggable.
- Once enabled, the element will support two key handlers: ```onDragStart={handler}``` and ```onDragEnd={handler}```.
- The parent container also needs to have specific properties for handling drop logic.
- Since we now have information about onDragStart and onDragEnd, we need to detect where the item is being dropped. For that, use the ```onDrop={handler}``` event.
- Example: ```onDrop={(event) => handleDrop(event, header)}```
- Also add ```onDragOver={handleDragOver}``` to the drop target, and ensure you call ```event.preventDefault()``` inside it — because by default, elements do not allow other elements to be dropped onto them. Example: event.preventDefault()

