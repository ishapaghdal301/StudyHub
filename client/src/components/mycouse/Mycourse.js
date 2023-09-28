import React, { useState, useEffect } from "react";
import "./mycourse.css";
import MyCourseCard from "./MyCourseCard";
import MyCourseDetail from "./MyCourseDetail";
// import './recommendations.css';
const CourseGrid = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const studentId = localStorage.getItem("user");
    async function fetchcourses() {
      try {
        const response = await fetch("http://localhost:5000/student/courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId,
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

  const [selectedCourse, setSelectedCourse] = useState(null);
  const openCourseDetail = (course) => {
    setSelectedCourse(course);
    console.log(selectedCourse);
  };

  const closeCourseDetail = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="recommendationsDiv">
      <div className="recommendations">
        <br></br>

        <h2>My Learning</h2>

        <div className="course-grid">
          {courses.map((course) => (
            <MyCourseCard
              courseTitle={course[0].courseName}
              imgSrc={course[0].image}
              instructor={course[0].instructor}
              rating={4.6}
              noOfStudents={"(166,042)"}
              price={"₹8,640"}
              onClick={() => openCourseDetail(course)}
            />
          ))}

          {selectedCourse && (
            <MyCourseDetail course={selectedCourse} onClose={closeCourseDetail} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseGrid;
