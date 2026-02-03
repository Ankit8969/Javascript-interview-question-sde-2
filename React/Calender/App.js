import React, {
  useCallback,
  useEffect,
  // useMemo,
  useRef,
  useState,
} from "react";
import "./styles.css";
import { useMemo } from "./useMemo.js";
import { calenderEvents } from "./utils";

// 24 hour time

const RenderEvents = ({ eventDetail }) => {
  const [startHour, startMinute] = eventDetail.startTime.split(":").map(Number);

  const [endHour, endMinute] = eventDetail.endTime.split(":").map(Number);

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  const style = {
    position: "absolute",
    top: `${startTotalMinutes}px`,
    left: "70px",
    height: `${endTotalMinutes - startTotalMinutes}px`,
    backgroundColor: "skyblue",
    width: "100%",
  };

  return (
    <div style={style} className="event">
      {eventDetail.title}
    </div>
  );
};

export default function App() {
  const time = Array.from({ length: 24 }, (_, ind) => ind);
  return (
    <div id="app">
      <div className="calender_view">
        {time.map((item) => (
          <div className="time"> {item}:00 </div>
        ))}
      </div>
      <div className="vertical_line"></div>
      <div>
        {calenderEvents.map((item) => (
          <RenderEvents key={item.id} eventDetail={item} />
        ))}
      </div>
    </div>
  );
}
