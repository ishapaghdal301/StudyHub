import React, { useState } from "react";
import './videodetail.css';


const VideoDetail = ({ course, onClose }) => {
  const [clickStatus, setClickStatus] = useState(false);

  const toggleCartStatus = () => {
    setClickStatus((prevStatus) => !prevStatus);
    if (!clickStatus) {
      addToCart(course._id);
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
  
  const removeFromCart = async (courseId) => {
    const userId = localStorage.getItem("user")
    try {
      const res = await fetch("/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, courseId }),
      });
  
      if (res.ok) {
        console.log("Item removed from cart");
      } else {
        console.error("Failed to remove from cart");
      }
    } catch (error) {
      console.error("Error removing item from the cart:", error);
    }
  };

  return (
    <div className="course-detail-modal">
      <div className="course-detail-content">
        <span className="course-detail-close-button" onClick={onClose}>
          &times;
        </span>
        <div className="header">
          <h2>{course.courseName}</h2>
          <img src={course.image} alt={course.courseName} />
        </div>
        <div className="course-details">
          <div className="course-info">
            <div className="detail-item">
              <div className="label">Instructor:{course.instructor}</div>
              {/* <div className="label"></div> */}
            </div>
            <div className="detail-item">
              <div className="label">Rating:{course.rating}</div>
              {/* <div className="label"></div> */}
            </div>
            <div className="detail-item">
              <div className="label">No. of Students:{course.noOfStudents}</div>
              {/* <div className="label"></div> */}
            </div>
            <div className="detail-item">
              <div className="label">Price:{course.price}</div>
              {/* <div className="label"></div> */}
            </div>
            {/* Add more course details here */}
          </div>
          <div className="cart-button">
            <button onClick={toggleCartStatus}>
              {clickStatus ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default VideoDetail;
