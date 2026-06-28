import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

const ROW_HEIGHT = 50;
const OVERSCAN = 2;

const VirtualizedList = ({ data, loadMore }) => {
  const containerRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const height = containerRef.current.clientHeight;
    setVisibleCount(Math.ceil(height / ROW_HEIGHT));
  }, []);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;

    const first = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);

    setStartIndex(first);

    // Infinite Scroll
    const totalHeight = data.length * ROW_HEIGHT;

    if (scrollTop + e.target.clientHeight >= totalHeight - 200) {
      loadMore();
    }
  };

  const endIndex = Math.min(
    data.length,
    startIndex + visibleCount + OVERSCAN * 2
  );

  const visibleData = data.slice(startIndex, endIndex);

  return (
    <div
      ref={containerRef}
      className="parent_scrollable"
      onScroll={handleScroll}
    >
      <div
        style={{
          height: data.length * ROW_HEIGHT,
          position: "relative",
        }}
      >
        <div
          style={{
            transform: `translateY(${startIndex * ROW_HEIGHT}px)`,
          }}
        >
          {visibleData.map((item, index) => (
            <div
              key={startIndex + index}
              className="row"
              style={{
                height: ROW_HEIGHT,
              }}
            >
              Entry - {startIndex + index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState(Array.from({ length: 20 }, (_, i) => i + 1));

  const loadingRef = useRef(false);

  const loadMore = () => {
    if (loadingRef.current) return;

    loadingRef.current = true;

    setTimeout(() => {
      setData((prev) => [
        ...prev,
        ...Array.from({ length: 15 }, (_, i) => prev.length + i + 1),
      ]);

      loadingRef.current = false;
    }, 500);
  };

  return (
    <div className="box">
      <VirtualizedList data={data} loadMore={loadMore} />
    </div>
  );
}
