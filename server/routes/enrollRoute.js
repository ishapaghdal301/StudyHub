const enrollmodel = require("../models/Enrollment");
const cartmodel = require("../models/Cart");
const express = require("express");
const router = express.Router();

router.use("/cart/checkout", async (req, res) => {
    try {
        const cartData = req.body.cartData;
        const userId = req.body.user;

        const enrollments = [];

        for (const item of cartData) {
            const enrollment = new enrollmodel({
                student: userId,
                course: item._id,
            });

            enrollments.push(enrollment);
        }

        await enrollmodel.insertMany(enrollments);

        const courseIdsToRemove = cartData.map((item) => item._id);

        await cartmodel.updateOne(
            { user: userId },
            { $pull: { items: { $in: courseIdsToRemove } } }
        );

        const cart = await cartmodel.findOne({ user: userId });
        const remainingItems = await cartmodel.find({ user: userId });
        let newTotalPrice = 0;

        for (const item of remainingItems[0].items) {
            newTotalPrice += item.price;
        }

        await cartmodel.updateOne(
            { user: userId },
            { $set: { totalPrice: newTotalPrice } }
        );

        res.status(200).json({ success: true, message: "Checkout successful" });
    } catch (error) {
        console.error("Error checking out from cart:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

module.exports = router;
