
const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    image: { type: String, required: true },
    videoURL: { type: String, required: true },
  });
  
  const Course = mongoose.model('Course', courseSchema);

  module.exports = Course;