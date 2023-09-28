import React, { useEffect, useState } from "react";

import "./Cart.css"; // Import the CSS file

function Cart() {
    const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartUpdated, setCartUpdated] = useState(false); // State variable to trigger re-render
    const userId = localStorage.getItem("user");

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await fetch("/cart/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch cart data");
                }

                const data = await response.json();

                if (data.success) {
                    setCartData(data.cart.items);
                    setTotalPrice(data.cart.totalPrice);
                } else {
                    console.error("Failed to fetch cart data:", data.error);
                }
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };

        fetchCartData();
    }, [cartUpdated]); // Include cartUpdated in the dependency array

    const removeFromCart = async (courseId) => {
        try {
            // Send a request to remove the item from the cart
            const response = await fetch("/cart/remove", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, courseId }),
            });

            if (!response.ok) {
                throw new Error("Failed to remove item from cart");
            }

            // Update the cart data after successful removal
            const updatedCartData = cartData.filter((item) => item._id !== courseId);
            setCartData(updatedCartData);

            // Recalculate the total price
            const updatedTotalPrice = updatedCartData.reduce((total, item) => total + item.price, 0);
            setTotalPrice(updatedTotalPrice);

            // Trigger a re-render by updating cartUpdated state
            setCartUpdated(!cartUpdated);
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const handleCheckout = async () => {
        try {
            const response = await fetch("/cart/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cartData, user: userId }), // Include the user's ID
            });

            if (!response.ok) {
                throw new Error("Failed to checkout items from cart");
            }

            // If checkout is successful, clear the cart
            setCartData([]);
            setTotalPrice(0);
            setCartUpdated(!cartUpdated); // Trigger re-render (if necessary)

            
        } catch (error) {
            console.error("Error checking out from cart:", error);
        }
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <br></br>
            <ul>
                {cartData.map((item, index) => (
                    <li key={`${item._id}-${index}`} className="cart-item">
                        <div className="cart-item-name">
                            <strong>{item.courseName}</strong>
                        </div>
                        <div>Price: ${item.price}</div>
                        <button className="view-video-button" onClick={() => removeFromCart(item._id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <p className="cart-total">Total Price: ${totalPrice}</p>
            <button className="view-video-button" onClick={handleCheckout}>
                Checkout
            </button>
        </div>
    );
}

export default Cart;
