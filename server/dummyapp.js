const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();


app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/StudyHub');

app.set('view engine', 'ejs');

const Student = require("./models/student");
const Teacher = require("./models/teacher");
const Course = require("./models/course");


//////////////////////////////////////////////////////////////////
// Import your routers
const coursesRouter = require('./routes/courses');
const studentsRouter = require('./routes/students');
//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// Use the routers
app.use('/api/courses', coursesRouter);
app.use('/api/students', studentsRouter);
//////////////////////////////////////////////////////////////////

app.get("/", function (req, res) {
    res.send("list");
});

////////////////////////////// teachers 
app.get("/teacher/register", function (req, res) {
    res.render("dummy");
});
app.post("/teacher/save", function (req, res) {
    const teacher = new Teacher({
        fname: req.body.fname,
        lname: req.body.lname,
        emailId: req.body.emailId,
        mobileNo: req.body.mobileNo,
        username: req.body.username,
        password: req.body.password,
        experience: req.body.experience,
        profilePicture: req.body.profilePicture
    });
    teacher.save();
    res.render("dummy");
});

app.get("/teacher/login", function (req, res) {
    res.render("dummy");
});

app.post('/teacher/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the teacher by their username
        const teacher = await Teacher.findOne({ username });

        // Check if the teacher exists
        if (!teacher) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password in the database
        // Note: In production, use bcrypt or other secure methods to compare passwords
        if (teacher.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // At this point, the login is successful
        return res.status(200).json({ message: 'Login successful', teacher });
    } catch (error) {
        console.error('Error during teacher login:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


////////////////////////////// student   register
app.get("/student/register", function (req, res) {
    res.render("dummy");
});
app.post("/student/register", function (req, res) {
    const student = new Student({
        fname: req.body.fname,
        lname: req.body.lname,
        emailId: req.body.emailId,
        mobileNo: req.body.mobileNo,
        username: req.body.username,
        password: req.body.password,
        profilePicture: req.body.profilePicture
    });
    student.save();
    res.render("dummy");
});

app.get("/student/login", function (req, res) {
    res.render("dummy");
});

app.post('/student/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the teacher by their username
        const student = await Student.findOne({ username });

        // Check if the teacher exists
        if (!student) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password in the database
        // Note: In production, use bcrypt or other secure methods to compare passwords
        if (student.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // At this point, the login is successful
        return res.status(200).json({ message: 'Login successful', student });
    } catch (error) {
        console.error('Error during teacher login:', error);
        res.status(500).json({ error: 'Server error' });
    }
});




app.listen(3000, function (req, res) {
    console.log("Entered port 3000");
});
