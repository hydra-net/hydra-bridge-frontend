import React from "react";
import Shell from "./shell/Shell";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route path={"*"} element={<Shell />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
