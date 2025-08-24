# Create a Modal

- When user click out side it should get close


- Instead of ```click``` use ```mousedown```, because with ```click``` we have to add stopPropagation.


Note:
```
Whenever we are dealing with setTimeout, interval or any async kind of function in useEffect, always do cleanUP.
```

```
const Modal = forwardRef(({}, ref) => {
  return (
    <div ref={ref} className="modal">
      I am Modal
    </div>
  );
});

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="app">
      {showModal && <Modal ref={modalRef} setShowModal={setShowModal} />}
      <button onClick={() => setShowModal(true)}>Show Modal</button>
    </div>
  );
};
```