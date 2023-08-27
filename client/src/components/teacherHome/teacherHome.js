import React from "react";
import THEADER from "./Components/Theader/THeader";
import TNEW from "./Components/Tbody/TNEW";
import TUPDATE from "./Components/Tbody/TUPDATE";
import TVIEW from "./Components/Tbody/TVIEW";
import { Routes, Route } from "react-router-dom";
import AddCourse from "./Components/AddCourse/AddCourse";
import UpdateCourse from "./Components/UpdateCourse/UpdateCourse";


function TeacherHome() {
    return (
      <div className="App">
      <THEADER/>
        <Routes>
        
          <Route path="/" element= {<Home />} />
          <Route path = "/addcourse" element = {<AddCourse/>}/>
          <Route path = "/updatecourse" element = {<UpdateCourse/>}/>

        </Routes>
      </div>
    );
  }
  function Home(){
    return(
      <>
        <TNEW/>
        <TUPDATE/>
        <TVIEW/>
      </>
    )
  }

export default TeacherHome;