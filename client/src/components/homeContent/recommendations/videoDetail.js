import React from "react";
import './videodetail.css';

const VideoDetail = ({ course, onClose }) => {
  return (
    <div className="course-detail-modal">
      <div className="course-detail-content">
        <span
          className="course-detail-close-button"
          onClick={onClose}
        >
          &times;
        </span>
        <img src={course.imgSrc} alt={course.courseTitle} />
        <h2>{course.courseTitle}</h2>
        <p>Instructor: {course.instructor}</p>
        <p>Rating: {course.rating}</p>
        <p>No. of Students: {course.noOfStudents}</p>
        <p>Price: {course.price}</p>
        {/* Add more course details here */}
      </div>
    </div>
  );
};

export default VideoDetail;
