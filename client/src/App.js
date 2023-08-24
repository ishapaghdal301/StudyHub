import React from "react";
import "./App.css";
import Header from "./components/Header";
import HomeContent from "./components/HomeContent";
import HomeFooter from "./components/HomeFooter";
import { Routes, Route } from "react-router-dom";
import Sign_in from "./components/signup_singin/Sign_in";
import SignUp from "./components/signup_singin/SignUp";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* <Route path = "/" element={<Maincomp/>} /> */}
        <Route path="/login" element={<Sign_in />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
      <HomeContent />
      <HomeFooter />
    </div>
  );
}

export default App;
