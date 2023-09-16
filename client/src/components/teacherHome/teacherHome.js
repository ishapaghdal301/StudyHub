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
  return (
    <div className="App">
      <HeaderPrimary />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view-lessons" element={<AddCourse />} />
        <Route path="/updatecourse" element={<UpdateCourse />} />
      </Routes>
    </div>
  );
}

function Home() {

  return (
    <>
    <CourseGrid/>
    </>
  );
}

export default TeacherHome;
