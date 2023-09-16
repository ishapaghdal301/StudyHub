import React, { useState } from "react";
import './videodetail.css';

const VideoDetail = ({ course, onClose }) => {
  const [clickStatus, setClickStatus] = useState(false);

  const toggleCartStatus = () => {
    setClickStatus((prevStatus) => !prevStatus);
    if (!clickStatus) {
      addToCart(course._id);
      // console.log("clicked");
      // const userId = localStorage.getItem("user");
      // console.log(course._id);
    } else {
      removeFromCart(course._id);
    }
  };

  const addToCart = async (courseId) => {
    const userId = localStorage.getItem("user")
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, courseId }), // Pass both userId and courseId in the body
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
  
  const removeFromCart = async (courseId) => {
    const userId = localStorage.getItem("user")
    try {
      const res = await fetch("/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, courseId }), // Pass both userId and courseId in the body
      });
  
      if (res.ok) {
        console.log("Item removed form cart");
      } else {
        console.error("Failed to remove from cart");
      }
    } catch (error) {
      console.error("Error removing item to the cart:", error);
    }
  };

  return (
    <div className="course-detail-modal">
      <div className="course-detail-content">
        <span className="course-detail-close-button" onClick={onClose}>
          &times;
        </span>
        <img src={course.image} alt={course.courseName} />
        <h2>{course.courseName}</h2>
        <p>Instructor: {course.instructor}</p>
        <p>Rating: {course.rating}</p>
        <p>No. of Students: {course.noOfStudents}</p>
        <p>Price: {course.price}</p>
        {/* Add more course details here */}
        <div>
          <button onClick={toggleCartStatus}>
            {clickStatus ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
