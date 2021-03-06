import React from "react";
import "./Spinner.css";

export default function Spinner(props) {
  return (
    <div className={`${props.asOverlay && "spinner-overlay"}`}>
      <div className="spinner-main">
        <div className="bounce3"></div>
        <div className="bounce1"></div>
        <div className="bounce2"></div>
      </div>
    </div>
  );
}
