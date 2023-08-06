
// models/studentModel.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  emailId: { type: String, required: true },
  mobileNo: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
