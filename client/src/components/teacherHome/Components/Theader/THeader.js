import React from "react";
import { NavLink } from "react-router-dom";
import "./THEADER.css"; // Import your CSS file for styling

function THEADER() {
  return (
    <header className="theader">
      <nav className="navbar">
        <ul className="nav-left">
          <li>
            <NavLink to="/teacherhome/mycourses">View My Courses</NavLink>
          </li>
        </ul>
        <ul className="nav-center">
          <li>
            <NavLink to="/teacherhome/mystudents">My Students</NavLink>
          </li>
        </ul>
        <ul className="nav-right">
          <li>
            <a href="/profile">Profile</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default THEADER;
