
const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    emailId: { type: String, required: true },
    mobileNo: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    experience: { type: String },
    profilePicture: { type: String, default: 'default.jpg' },
});
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;