import React, { useState, useEffect } from "react";
import "./categoryPopup.css"; // CSS import

const CategoryPopup = ({ category, onClose }) => {
  const [courses, setCourses] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    const userId = localStorage.getItem("user");
    try {
      const response = await fetch("/cart/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cart.items);
      } else {
        console.error("Failed to fetch cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const addToCart = async (courseId) => {
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
        // After adding, refresh cart items
        fetchCartItems();
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
      const res = await fetch("/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, courseId }),
      });

      if (res.ok) {
        console.log("Item removed from the cart");
        // After removing, refresh cart items
        fetchCartItems();
      } else {
        console.error("Failed to remove item from the cart");
      }
    } catch (error) {
      console.error("Error removing item from the cart:", error);
    }
  };

  useEffect(() => {
    async function fetchCourses() {
      const categoryId = category._id;
      try {
        const response = await fetch(
          "http://localhost:5000/coursesbycategory",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              categoryId,
            }),
          }
        );

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
    fetchCartItems(); // Fetch cart items when the component loads
  }, []);

  const handleClosePopup = () => {
    onClose();
  };

  return (
    <div className="video-detail-modal">
      <div className="video-detail-content">
        <div className="header">
          <span
            className="video-detail-close-button"
            onClick={handleClosePopup}
          >
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
                {cartItems.some((cartItem) => cartItem._id === course._id) ? (
                  <button
                    className="remove-from-cart-button"
                    onClick={() => removeFromCart(course._id)}
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(course._id)}
                  >
                    Add to Cart
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryPopup;
