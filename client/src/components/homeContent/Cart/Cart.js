// Cart.js
import React, { useEffect, useState } from "react";
import "./Cart.css"; // Import the CSS file

function Cart() {
    const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const userId = localStorage.getItem("user");

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                // Fetch the user's cart data from your API
                const response = await fetch("/api/cart/user", {
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
    }, []);

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <ul>
                {cartData.map((item, index) => (
                    <li key={`${item._id}-${index}`} className="cart-item">
                        <div className="cart-item-name">
                            <strong>{item.courseName}</strong>
                        </div>
                        <div>Price: ${item.price}</div>
                    </li>
                ))}
            </ul>
            <p className="cart-total">Total Price: ${totalPrice}</p>
        </div>
    );
}

export default Cart;
