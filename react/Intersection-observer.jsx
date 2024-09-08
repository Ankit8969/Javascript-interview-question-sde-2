import React, { useState, useEffect, useRef } from 'react';

const InfiniteScroll = ({ data, height, width, rowHeight, fetchData }) => {
  const [currList, setCurrList] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const selectAllItems = useRef(null);

  const infiniteScrollObserver = new IntersectionObserver(async (entries) => {
    const entry = entries[0];
    const isIntersection = entry.isIntersecting;
    if (isIntersection) {
      // add more entry in the table
      setIsLoading(true);
      const newEntry = await fetchData();
      setIsLoading(false);
      const newList = [...currList, ...newEntry];
      setCurrList((prev) => newList);
    }
  })

  useEffect(() => {
    const rowItems = selectAllItems.current.children;
    if (rowItems.length > 0) {
      // Convert HTMLCollection to an array
      const arr = Array.from(rowItems);
      infiniteScrollObserver.observe(arr[arr.length - 1]);
    }
  }, [currList]);

  return (
    <section className="table" style={{ overflowY: 'scroll' }}>
      <ul ref={selectAllItems}>
        {currList.map((item, ind) => {
          return (
            <li
              key={ind}
              className="items"
              style={{ height: rowHeight, borderTop: '5px solid red' }}
            >
              Hey there, I am {ind}th row's
            </li>
          );
        })}
        {isLoading && <li 
        style={{ height: rowHeight, borderTop: '5px solid red' }} className="items"
        >Loading...</li>}
      </ul>
    </section>
  );
};

export default InfiniteScroll;
