import React, { useState, useEffect, useRef } from 'react';


let firstInd = 0;
const VirtualizationList = ({ data, height=400, row=40  }) => {
  const totalHeight = data.length * row;
  const [getData, setData] = useState(data.slice(0, 11));

  const handleScroll = (e) => {
    const distanceFromTop = e.target.scrollTop;
    const startInd = parseInt(distanceFromTop / row);
    firstInd = startInd;
    setData(data.slice(startInd, startInd + 11));
  }

  return (
    <section 
    className="table" 
    style={{ height, overflowY: 'scroll'  }}
    onScroll={handleScroll}
    >
      <div
        className="content_box" 
        style={{
          overflowY: 'scroll', 
          height: totalHeight,
          transform: `translateY(${firstInd*40}px)`
        }}
      >
        <ul style={{width:"100%"}}>
          {
            getData.map((item, ind) => {
              return (
                <li
                  key={ind}
                  className="items"
                  style={{ height: row, borderTop: '5px solid red' }}
                >
                  Hey there, I am {item}th row's
                </li>
              );
            }) 
          }
        </ul>
      </div>
    </section>
  );
};

export default VirtualizationList;
