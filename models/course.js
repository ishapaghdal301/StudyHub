const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Please enter your title!"] },
    instructor: {
      // type: String,
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Teacher", //relation betwen the course and the teacher
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    description: { type: String, required: [true, "Please enter your description!"] },
    category: { type: String, required: [true, "Please enter your Category!"] },
    price: { type: Number, required: [true, "Please enter your price!"] },
    duration: { type: String, required: [true, "Please enter your duration!"] },
    image: { type: String, required: [true, "Please enter your image!"] },
    videoURL: { type: String, required: [true, "Please enter your Video URL!"] },
  });
  
  const Course = mongoose.model('Course', courseSchema);

  module.exports = Course;