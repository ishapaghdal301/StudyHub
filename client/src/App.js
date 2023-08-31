import React from "react";
import "./App.css";
import Header from "./components/Header";
import HomeContent from "./components/HomeContent";
import HomeFooter from "./components/HomeFooter";
import { Routes, Route, useLocation } from "react-router-dom";
import Sign_in from "./components/signup_singin/Sign_in";
import SignUp from "./components/signup_singin/SignUp";
import TeacherHome from "./components/teacherHome/teacherHome";


function App() {
  
  return (
    
    <div className="App">
      <Routes>
      
        <Route path="/" element= {<Home />} />
        <Route path="/login" element={<Sign_in />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/teacherhome/*" element= {<TeacherHome />} />
      </Routes>
    </div>
  );
}

function Home(){
  const location = useLocation();
  const state = location.state ? location.state.data : null;
  const _id = state ? state._id : null;

  return(
    <>
      <Header id = {_id}/>
      <HomeContent id = {_id}/>
      <HomeFooter/>
    </>
  )
}


export default App;