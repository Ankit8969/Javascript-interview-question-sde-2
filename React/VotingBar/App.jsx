import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import VotingApp from "./VotingApp";

// Voting Component

const App = () => {
  const votingDesc = [
    {
      id: 1,
      title: "Manali",
      totalCount: 0,
      color: "green",
    },
    {
      id: 2,
      title: "Uttarakhand",
      totalCount: 0,
      color: "yellow",
    },
    {
      id: 3,
      title: "Banaras",
      totalCount: 0,
      color: "pink",
    },
    {
      id: 4,
      title: "J&K",
      totalCount: 0,
      color: "yellow",
    },
  ];
  return (
    <div className="app">
      <VotingApp votingDesc={votingDesc} />
    </div>
  );
};

export default App;
