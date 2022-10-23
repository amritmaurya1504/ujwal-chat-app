import React from "react";
import "./welcome.scss";
import Robot from "../../asset/robot.gif";

export const Welcome = ({ currentUser }) => {
  return (
    <div className="welcome">
      <img src={Robot} alt="" />
      <h2>
        Welcome, <span>{currentUser.username} !</span>
      </h2>
      <h4>Please select a chat to start messaging.</h4>
    </div>
  );
};
