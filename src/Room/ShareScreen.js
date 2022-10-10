import React, { useEffect, useRef } from "react";

const ShareScreen = () => {
  const screenShare = useRef();

  useEffect(() => {
    navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
  }, []);
  return (
    <div>
      <center>
        <div>hdghgvdi</div>
      </center>
    </div>
  );
};

export default ShareScreen;
