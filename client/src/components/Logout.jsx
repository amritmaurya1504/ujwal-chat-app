import React from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    if (window.confirm("Do you want to Logout ?")) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <>
      <i className="fad fa-sign-out-alt" onClick={handleClick}></i>
    </>
  );
};
