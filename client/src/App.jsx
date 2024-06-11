import React from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
