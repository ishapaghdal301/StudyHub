import React, { useState, useEffect } from "react";
import MyLecturePopup from "./MyLecturePopup";
import "./mycoursedetail.css";

const CourseDetail = ({ course, onClose }) => {
  const [courseDetails, setCourseDetails] = useState(course);
  const [lessons, setLessons] = useState([]);
  const [showLecturePopup, setShowLecturePopup] = useState(false); // Add state for the popup

  const loadLessons = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/lectures/?id=${course[0]._id}`
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
          <h2>{courseDetails[0].courseName}</h2>
          <img src={courseDetails[0].image} alt={courseDetails.courseName} />
          <p>Instructor: {courseDetails[0].instructor}</p>
          <p>Rating: {courseDetails[0].rating}</p>
          <p>No. of Students: {courseDetails[0].noOfStudents}</p>
          <p>Price: {courseDetails[0].price}</p>
          <p>Category: {courseDetails[0].category}</p>
        </div>

        <div className="my-lesson-form">
          <MyLecturePopup lessons={lessons} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
