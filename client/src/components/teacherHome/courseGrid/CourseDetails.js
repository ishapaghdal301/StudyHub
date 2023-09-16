import React, { useState, useEffect } from "react";
import LessonForm from "./LessonForm";
import LecturePopup from "./LecturePopup";
import "./coursedetail.css";

const CourseDetail = ({ course, onClose }) => {
  const [courseDetails, setCourseDetails] = useState(course);
  const [lessons, setLessons] = useState([]);
  const [showLecturePopup, setShowLecturePopup] = useState(false); // Add state for the popup

  const loadLessons = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/lectures/?id=${course._id}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setLessons(data);
      } else {
        console.error("Failed to fetch lessons");
      }
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  useEffect(() => {
    loadLessons();
  }, []);

  const toggleLecturePopup = () => {
    setShowLecturePopup(!showLecturePopup); // Toggle the state
  };

  return (
    <div className="course-detail-modal">
      <div className="course-detail-content">
        <span className="course-detail-close-button" onClick={onClose}>
          &times;
        </span>
        <div className="course-info">
          <img src={courseDetails.image} alt={courseDetails.courseName} />
          <h2>{courseDetails.courseName}</h2>
          <p>Instructor: {courseDetails.instructor}</p>
          <p>Rating: {courseDetails.rating}</p>
          <p>No. of Students: {courseDetails.noOfStudents}</p>
          <p>Price: {courseDetails.price}</p>
          <p>Category: {courseDetails.category}</p>
          {/* Add more course details here */}
        <button onClick={toggleLecturePopup} className="view-lessons-button">View All Lessons</button>
        </div>


        {!showLecturePopup ? (
        <div className="lesson-form">
          <LessonForm courseId={courseDetails._id} onLessonAdded={loadLessons} />
        </div>
        ) : null}
        
        
        {showLecturePopup ? (
          <div className="lesson-form">
          <LecturePopup lessons={lessons} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CourseDetail;
