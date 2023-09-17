import React, { useState, useEffect } from "react";
import "./categoryPopup.css"; // CSS import

const CategoryPopup = ({ category, onClose }) => {
  const [courses, setCourses] = useState([]);

  const addToCart = async (courseId) => {
    // setClickStatus(!clickStatus);
    const userId = localStorage.getItem("user");
    try {
      const res = await fetch("/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, courseId }),
      });

      if (res.ok) {
        console.log("Item added to the cart");
      } else {
        console.error("Failed to add item to the cart");
      }
    } catch (error) {
      console.error("Error adding item to the cart:", error);
    }
  };


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
          setCourses(data);
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

  const handleAddToCart = (courseId) => {
    // Implement your logic to add the course to the cart here
    console.log(`Added course with ID ${courseId} to the cart`);
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
              <li key={course._id} className="course">
                <img
                  src={course.image}
                  alt={course.courseName + " img"}
                  className="course-img"
                />
                <h4>{course.courseName}</h4>
                <button
                  className="add-to-cart-button"
                  onClick={() => addToCart(course._id)}
                >
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryPopup;
