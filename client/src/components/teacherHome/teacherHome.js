import React,{ useState, useEffect } from "react";
import HeaderPrimary from "./techerheader/teacherHeader";
import TeacherBody from "./Tbody/TeacherBody";
import TeacherUpdate from "./Tbody/TeacherUpdate";
import TeacherView from "./Tbody/TeacherView";
import { Routes, Route } from "react-router-dom";
import AddCourse from "./AddCourse/Addcource1";
import UpdateCourse from "./UpdateCourse/UpdateCourse";
import CourseGrid from "./courseGrid/CourseGrid";

function TeacherHome() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="App">
      <HeaderPrimary OnSetQuery={(val)=>setSearchQuery(val)}/>
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery}/>} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/updatecourse" element={<UpdateCourse />} />
      </Routes>
    </div>
  );
}

function Home(props) {

  return (
    <>
    <CourseGrid searchQuery={props.searchQuery}/>
    </>
  );
}

export default TeacherHome;
