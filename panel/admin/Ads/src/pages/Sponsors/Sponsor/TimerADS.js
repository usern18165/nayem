import React, { useEffect, useState } from "react";
import Filter from "./Filter/Filter";
import moment from "moment";

function TimerADS() {
  let time = new Date().toLocaleTimeString();
  const [timeintr, setTimeintr] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTimeintr(time);
  };

  setInterval(UpdateTime, 1000);

  //  useEffect(() => {}, [Timer])
  return (
    <div
      style={{
        display: "flex",
        display: "flex",
        height: "90px",
        alignItems: "center",
        padding: "0px 0px 0px 20px",
      }}
    >
      <Filter />
      <div className="timerDiv2">
        <div className="timer2">
          {/* <h4>{formatAMPM(new Date())}</h4>
        <p>{date}</p> */}
          <p>Saturday</p>
          <p>{timeintr}</p>

          <p>{moment().format("Do MMMM YYYY")}</p>
        </div>
      </div>
    </div>
  );
}

export default TimerADS;

// paddingRight: "10px",
