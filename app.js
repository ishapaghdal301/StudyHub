// app.js
const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB using mongoose

mongoose.connect('mongodb://127.0.0.1:27017/study', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
// app.use(cors());
app.use(bodyParser.json());

// Routes
const studentRouter = require('./routes/studentRouter');
const teacherRouter = require('./routes/teacherRouter');
const courseRouter = require('./routes/courseRouter');

app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);
app.use('/course', courseRouter);

app.get("/", function (req, res) {
    res.send("<b>Home Page</b>");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

