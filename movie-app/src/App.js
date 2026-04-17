import React from "react";
import { Routes, Route } from "react-router-dom";
import MyNavbar from "./Components/layout/MyNavbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import "./styles/base/app.css";

function App() {
  return (
    <div className="app-shell">
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </div>
  );
}

export default App;