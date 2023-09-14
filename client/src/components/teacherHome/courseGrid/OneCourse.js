import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import "./onecourse.css";
import CourseDetail from "./CourseDetails";
function OneCourse({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const openCourseDetail = (course) => {
    setSelectedCourse(course);
    console.log(selectedCourse);
  };

  const closeCourseDetail = () => {
    setSelectedCourse(null);
  };
  return (
    <div className="course-grid">
      {courses.map((course) => (
        <CourseCard
          courseTitle={course.courseName}
          imgSrc={course.image}
          instructor={course.instructor}
          rating={4.6}
          noOfStudents={"(166,042)"}
          price={"₹8,640"}
          onClick={() => openCourseDetail(course)}
        />
      ))}

      {selectedCourse && (
        <CourseDetail course={selectedCourse} onClose={closeCourseDetail} />
      )}
    </div>
  );

  {
    /* <div className="course-card" key={course._id}>
              <img src={course.image} alt={course.image} />
              <div className="course-details">
                <h2>{course.courseName}</h2>
                <p>{course.courseDescription}</p>
                <p>Instructor: {course.instructor}</p>
              </div>
            </div> */
  }
}

export default OneCourse;
