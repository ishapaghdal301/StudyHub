import React,{useState,useEffect} from 'react';
import "./coursegrid.css";
import OneCourse from "./OneCourse";
import './recommendations.css';
const CourseGrid = (props) => {
    const [courses, setCourses] = useState([]);

  useEffect(() => {
    const instructor = localStorage.getItem("user");
    async function fetchcourses() {
      try {
        const response = await fetch("http://localhost:5000/courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            instructor
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setCourses(data);
          console.log(courses);
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchcourses();
  }, []);

    return (
        <div className="recommendationsDiv">
            <div className="recommendations">
                <br></br>
                
                <h2>Your Course</h2>
                
                <OneCourse courses = {courses} searchQuery={props.searchQuery}/>
            </div>
        </div>
    )
  
};

export default CourseGrid;