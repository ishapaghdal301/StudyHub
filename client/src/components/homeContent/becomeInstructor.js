import React from "react";
import "./becomeInstructor.css";
import { useNavigate } from "react-router-dom";

function BecomeInstructor() {
  const navigate = useNavigate();
  function handleOnClick(){
    const instructor = localStorage.getItem("user");
    if(instructor){
      navigate("/login");
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
      <div className="contentDiv" style={{font:"white"}}>
        <h2 className="heading" style={{font:"white"}}>Become an instructor</h2>
        <p className="about">
          Top instructors from around the world teach millions of students on
          Udemy. We provide the tools and skills to teach what you love.{" "}
        </p>
        <div className="startTeching button" style={{font:"white", background:"black"}} onClick={handleOnClick}>Start teaching today</div>
      </div>
    </div>
  );
}

export default BecomeInstructor;

