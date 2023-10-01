import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import "./onecourse.css";
import CourseDetail from "./CourseDetails";
function OneCourse({ courses , searchQuery }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const openCourseDetail = (course) => {
    setSelectedCourse(course);
    console.log(selectedCourse);
  };

  const closeCourseDetail = () => {
    setSelectedCourse(null);
  };

  useEffect(() => {
    const instructor = localStorage.getItem("user");
    if (searchQuery.trim() !== "") {
      fetch(`/searchByInstructor?q=${searchQuery}&i=${instructor}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data);
        })
        .catch((error) => {
          console.error("Error searching for courses:", error);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);
  
  return (
    <div className="course-grid">
      {searchResults.length > 0 ? (
        // Display search results if there are matching courses
        searchResults.map((course) => (
          <div key={course._id} style={{ marginRight: "5px" }}>
            <CourseCard
              courseTitle={course.courseName}
              imgSrc={course.image}
              instructor={course.instructor}
              rating={4.6}
              // noOfStudents="(166,042)"
              price={`₹${course.price}`}
              onClick={() => openCourseDetail(course)}
            />
          </div>
        ))
      ) : (
      courses.map((course) => (
        <CourseCard
          courseTitle={course.courseName}
          imgSrc={course.image}
          // instructor={course.instructor}
          rating={4.6}
          // noOfStudents={"(166,042)"}
          price={`₹${course.price}`}
          onClick={() => openCourseDetail(course)}
        />
        ))
        )}
      

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
