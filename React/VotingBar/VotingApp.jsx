import React, { useMemo, useState, useRef } from "react";

const Voting = ({ details, totalCount, updateVote, index }) => {
  const barRef = useRef(null);
  function getPercent() {
    if (totalCount === 0) return 0;
    let per = (details.totalCount / totalCount) * 100;
    return per.toFixed(2);
  }
  const percent = getPercent();
  function getBarStyle() {
    return {
      width: `${percent}%`,
      backgroundColor: details.color,
    };
  }
  let barStyle = getBarStyle();

  return (
    <div ref={barRef} className="vote" onClick={() => updateVote(index)}>
      <p>{details.title}</p>
      <p>{percent}%</p>
      <div style={barStyle} className="bar"></div>
    </div>
  );
};

const VotingApp = ({ votingDesc }) => {
  const [voting, setVoting] = useState(votingDesc);

  function getTotalVote(voting) {
    return voting.reduce((prev, curr) => prev + curr.totalCount, 0);
  }

  const updateVote = (index) => {
    let prevVots = structuredClone(voting);
    prevVots[index].totalCount += 1;
    setVoting(prevVots);
  };

  const totalCount = useMemo(() => getTotalVote(voting), [voting]);
  return (
    <div className="votingParent">
      <h2>Where you want to go ?</h2>
      {voting.map((item, ind) => (
        <Voting
          key={item.id}
          details={item}
          index={ind}
          numOfOption={voting.length}
          totalCount={totalCount}
          updateVote={updateVote}
        />
      ))}
    </div>
  );
};

export default VotingApp;
