import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LocalRoom from "./Room/LocalRoom";
import RemoteRoom from "./Room/RemoteRoom";
import ShareScreen from "./Room/ShareScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LocalRoom />} />
        <Route path="/share" element={<ShareScreen />} />
        <Route path="/display/:roomID" element={<RemoteRoom />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
