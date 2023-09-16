import React, { useState } from "react";
import "./videodetail.css"; // CSS import

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
    const userId = localStorage.getItem("user");
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
    const userId = localStorage.getItem("user");
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
    <div className="video-detail-modal">
      <div className="video-detail-content">
        <span className="video-detail-close-button" onClick={onClose}>
          &times;
        </span>
        <div className="header">
          <h2>{course.courseName}</h2>
          <img
            src={course.image}
            alt={course.courseName}
            className="video-image"
          />
          <br></br>
          <h5>{course.courseDescription}</h5>
        </div>
        <div className="video-details">
          <div className="video-info">
            <div className="detail-item">
              <div className="label">Instructor: {course.instructor}</div>
            </div>
            <div className="detail-item">
              <div className="label">Rating: {course.rating}</div>
            </div>
            <div className="detail-item">
              <div className="label">
                No. of Students: {course.noOfStudents}
              </div>
            </div>
            <div className="detail-item">
              <div className="label">Price: {course.price}</div>
            </div>
            <div className="cart-button">
              <button
                className="view-video-button"
                onClick={toggleCartStatus}
                style={{ display: "block", margin: "0 auto" }} // Center the button
              >
                {clickStatus ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
