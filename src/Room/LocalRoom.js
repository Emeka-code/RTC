import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const LocalRoom = () => {
  const navigate = useNavigate();
  const id = uuidv4();
  const changeScreen = () => {
    navigate(`/display/${id}`);
  };
  return (
    <div>
      <center>
        <h1>my display</h1>
        <br />
        <br />
        <button onClick={changeScreen}>create conversation</button>
      </center>
    </div>
  );
};

export default LocalRoom;
