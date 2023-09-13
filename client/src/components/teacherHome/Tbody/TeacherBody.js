import React from "react";
import "./teacherBody.css"; // Import your CSS file for styling
import { NavLink } from "react-router-dom";

function TNEW() {
  return (
    <div className="tnew">
      <div className="description">
        <h2>Add a New Course</h2>
        <p>
          Welcome to the course creation page. Here you can add new courses to
          your teaching portfolio. Fill in the course details and provide
          relevant information to attract students.
        </p>
      </div>
      <NavLink to="addcourse"> {/* Remove the /teacherhome prefix */}
  <button className="addCourseButton">Add Course</button>
</NavLink>

      
    </div>
  );
}

export default TNEW;
