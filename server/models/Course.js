const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
      index: true
    },
    courseDescription: {
      type: String,
      required: true,
      index: true
    },
    image : {
      type:String,
      required : true
    },
    price: {
      type:Number,
      default: 0
    },
    instructor: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: Schema.Types.String, ref: "Category" }
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = Course = mongoose.model("course", CourseSchema);
