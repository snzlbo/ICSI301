import React, { useState } from "react";
import Example from "../example/Example";
import States from "../states/States";
import "./Switch.css";

function Switch(props) {
  const [name, setName] = useState("Example");
  const [button, setButton] = useState("P2");
  const clickHandler = () => {
    if (name === "Example") {
      setName("States");
      setButton("SWITCH");
    } else {
      setName("Example");
      setButton("SWITCH");
    }
  };
  return (
    <div className = {name === "Example" ? "example" : "notExample"}>
      <div className="button" onClick = {clickHandler}>
        {button}
      </div>
      {name === "Example" ? <Example /> : <States />}
    </div>
  );
}
export default Switch;
