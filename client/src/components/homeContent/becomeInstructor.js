import React from "react";
import "./becomeInstructor.css";
import { useNavigate } from "react-router-dom";

function BecomeInstructor() {
  const navigate = useNavigate();
  function handleOnClick(){
    const instructor = localStorage.getItem("user");
    if(instructor){
      // navigate("/teacherhome");
    }
  }
  return (
    <div className="becomeInstructorDiv">
      <div className="backgroundColorDiv"></div>
      <img
        src="https://s.udemycdn.com/home/non-student-cta/udlite-lohp-promo-teacher.jpg"
        alt="instructorImg"
        className="instructorImg"
      ></img>
      <div className="contentDiv">
        <h2 className="heading">Become an instructor</h2>
        <p className="about">
          Top instructors from around the world teach millions of students on
          Udemy. We provide the tools and skills to teach what you love.{" "}
        </p>
        <div className="startTeching button" onClick={handleOnClick}>Start teaching today</div>
      </div>
    </div>
  );
}

export default BecomeInstructor;

