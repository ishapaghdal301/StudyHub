import React from "react";
import './coursedetail.css';

const CourseDetail = ({ course, onClose }) => {
  console.log(course);
  return (
    <div className="course-detail-modal">
      <div className="course-detail-content">
        <span
          className="course-detail-close-button"
          onClick={onClose}
        >
          &times;
        </span>
        <img src={course.image} alt={course.courseName} />
        <h2>{course.courseName}</h2>
        <p>Instructor: {course.instructor}</p>
        <p>Rating: {course.rating}</p>
        <p>No. of Students: {course.noOfStudents}</p>
        <p>Price: {course.price}</p>
        <p>Category: {course.category}</p>
        {/* Add more course details here */}
      </div>
    </div>
  );
};

export default CourseDetail;
