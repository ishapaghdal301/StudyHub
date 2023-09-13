import React from 'react';
import "./coursegrid.css";
import OneCourse from "./OneCourse";
import './recommendations.css';
const CourseGrid = ({ courses }) => {
    console.log(courses);

    return (
        <div className="recommendationsDiv">
            <div className="recommendations">
                {/* <h3>The world's largest selection of courses</h3>
                <p>
                    Choose from 130,000 online video courses with new additions published
                    every month
                </p> */}
                <br></br>
                {/* <br></br> */}
                
                <h2>Your Course</h2>
                
                <OneCourse courses = {courses}/>
            </div>
        </div>
    )
  
};

export default CourseGrid;