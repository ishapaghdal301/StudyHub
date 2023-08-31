import React from "react";
import THEADER from "./Theader/THeader";
import TNEW from "./Tbody/TNEW";
import TUPDATE from "./Tbody/TUPDATE";
import TVIEW from "./Tbody/TVIEW";
import { Routes, Route } from "react-router-dom";
import AddCourse from "./AddCourse/AddCourse";
import UpdateCourse from "./UpdateCourse/UpdateCourse";


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