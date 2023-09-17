import React, { useState, useEffect } from "react";
import "./videodetail.css"; // CSS import
import { set } from "lodash";

const VideoDetail = ({ course, onClose }) => {
  const [clickStatus, setClickStatus] = useState(false);

  useEffect(() => {
    isInCart(course._id);
  }, [course._id]);

  const toggleCartStatus = () => {
    setClickStatus((prevStatus) => !prevStatus);
    if (!clickStatus) {
      addToCart(course._id);
    } else {
      removeFromCart(course._id);
    }
  };

  const isInCart = async (courseId) => {
    const userId = localStorage.getItem("user");
    try {
      const res = await fetch("/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, courseId }),
      });

      if (res.ok) {
        setClickStatus(true);
      } else {
        console.error("The item is not in the cart");
      }
    } catch (error) {
      console.error("Error adding item to the cart:", error);
    }
  };

  const addToCart = async () => {
    setClickStatus(!clickStatus);
    const userId = localStorage.getItem("user");
    try {
      const res = await fetch("/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, courseId :course._id }),
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

  const removeFromCart = async () => {
    setClickStatus(!clickStatus);
    const userId = localStorage.getItem("user");
    try {
      const res = await fetch("/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, courseId:course._id }),
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
        <div className="header">
          <span className="video-detail-close-button" onClick={onClose}>
            &times;
          </span>
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
              <div className="label">Price: ₹{course.price}</div>
            </div>
            <div className="cart-button">
              {clickStatus ? (
                <button
                  className="view-video-button"
                  onClick={removeFromCart}
                  style={{ display: "block", margin: "0 auto" }} // Center the button
                >
                  Remove From Cart
                </button>
              ) : (
                <button
                  className="view-video-button"
                  onClick={addToCart}
                  style={{ display: "block", margin: "0 auto" }} // Center the button
                >Add to Cart</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
