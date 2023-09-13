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
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/updatecourse" element={<UpdateCourse />} />
      </Routes>
    </div>
  );
}

function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const instructor = localStorage.getItem("user");
    async function fetchcourses() {
      try {
        const response = await fetch("http://localhost:5000/courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            instructor
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setCourses(data);
          console.log(courses);
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchcourses();
  }, []);

  return (
    <>
    <CourseGrid courses={courses} />
      {/* <TeacherBody/> */}
      {/* <TeacherUpdate/> */}
      {/* <TeacherView/> */}
    </>
  );
}

export default TeacherHome;
