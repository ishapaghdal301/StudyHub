const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
// const Course = require("../models/Course");
const Course = require("../models/Course");


router.post("/cart/user", async (req, res) => {
  try {
    const { userId } = req.body; // Assuming you have userId in the request body

    // Find the user's cart based on their user ID
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Fetch course data for each item in the cart
    const populatedCart = {
      ...cart.toObject(),
      items: [],
    };

    for (const courseId of cart.items) {
      const course = await Course.findById(courseId);
      if (course) {
        populatedCart.items.push(course);
      }
    }

    res.status(200).json({ success: true, cart: populatedCart });
  } catch (error) {
    console.error("Error fetching user's cart:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/cart", async (req, res) => {
  try {
    const { userId , courseId} = req.body; // Assuming you have userId in the request body

    const cart = await Cart.findOne({ user: userId , items : courseId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error fetching user's cart:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});


router.post('/cart/add', async (req, res) => {
    try {
        const { userId, courseId } = req.body; 
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [],
                totalPrice: 0,
                status: 'active',
            });
        }

        const course = await Course.findById(courseId); 
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        cart.items.push(courseId);
        cart.totalPrice += course.price;
        console.log(cart.totalPrice);

        await cart.save();

        res.status(200).json({ message: "Item added to the cart", cart });
    } catch (error) {
        console.error("Error adding item to the cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/cart/remove', async (req, res) => {
    try {
      const { userId, courseId } = req.body; 
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
  
      // Remove the courseId from the items array
      const courseIndex = cart.items.indexOf(courseId);
      if (courseIndex !== -1) {
        cart.items.splice(courseIndex, 1);
      }
  

      const course = await Course.findById(courseId);
      console.log(course);
      cart.totalPrice -= course.price;
      await cart.save();
  
      res.status(200).json({ message: "Item removed from the cart", cart });
    } catch (error) {
      console.error("Error removing item from the cart:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
module.exports = router;
