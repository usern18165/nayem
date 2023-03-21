import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import './style.scss'


const OnlineBar = ({
  
}) => {

  return (
    <>
      <div
        style={{ textAlign: "center", width: "17%" }}
        className="user-card-wrapper"
      >
        <p className="chat-header-title" style={{ align: "center" }}>
          Online 0
        </p>
        
      </div>

     
    </>
  );
};

export default OnlineBar
