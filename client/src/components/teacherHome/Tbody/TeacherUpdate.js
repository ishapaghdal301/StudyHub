import React from "react";
import "./teacherUpdate.css"; 
import { NavLink } from "react-router-dom";

function TUPDATE() {
  return (
    <div className="tupdate">
      <div className="description">
        <h2>Update Course</h2>
        <p>
          Welcome to the course update page. Here you can update your existing
          courses to provide the latest information and improvements to
          students.
        </p>
      </div>
      <NavLink to="updatecourse">
      <button className="updateCourseButton">Update Course</button>
            </NavLink>
      
    </div>
  );
}

export default TUPDATE;
