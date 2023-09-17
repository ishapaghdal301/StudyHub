import React, { useState, useEffect } from "react";
import "./categoryPopup.css"; // CSS import

const CategoryPopup = ({ category, onClose }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const categoryId = category._id;
        try {
            const response = await fetch("http://localhost:5000/coursesbycategory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    categoryId
                }),

            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setCourses(data);
                console.log(courses);
            } else {
                console.error("Failed to fetch courses");
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }

    fetchCourses();
  }, []);


  const handleClosePopup = () => {
    onClose();
  };

  return (
    <div className="video-detail-modal">
      <div className="video-detail-content">
        <div className="header">
          <span className="video-detail-close-button" onClick={handleClosePopup}>
            &times;
          </span>
          <h2>{category.categoryName}</h2>
        </div>
        <div className="course-list">
          <h3>Related Courses:</h3>
          <ul>
            {courses.map((course) => (
              <li key={course._id}>{course.courseName}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryPopup;
