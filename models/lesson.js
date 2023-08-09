const mongoose = require('mongoose');

const lesson = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    // Other lesson-related properties
  });
  
  const Lesson = mongoose.model('Lesson', lesson);
  
  module.exports = Lesson;