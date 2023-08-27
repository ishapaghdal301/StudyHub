import React from "react";
import { NavLink } from "react-router-dom";
import "./TVIEW.css"; // Import your CSS file for styling

function TVIEW() {
  return (
    <div className="tview">
      <div className="description">
        <h2>View Your Courses</h2>
        <p>
          Welcome to the course viewing page. Here you can see a list of your
          existing courses and manage them. Click the button below to view your
          courses.
        </p>
      </div>
      <NavLink to="/teacherhome/mycourses">
        <button className="viewCoursesButton">View My Courses</button>
      </NavLink>
    </div>
  );
}

export default TVIEW;
