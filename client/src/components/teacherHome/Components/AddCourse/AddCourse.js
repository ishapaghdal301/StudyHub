import React, { useState } from "react";
import "./AddCourse.css"; // Import your CSS file for styling
import { NavLink } from "react-router-dom";

function AddCourse() {
  const [courseData, setCourseData] = useState({
    category: "",
    courseName: "",
    courseDescription: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    console.log("hi");

    e.preventDefault();
    const { category, courseName, courseDescription } = courseData;

    const res = await fetch("http://localhost:5000/course/addcourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,courseName, courseDescription
    }),
    });
    

    const data = await res.json();
    console.log(data);
    

    if (res.status === 400 || !data) {
      console.log(res.status);
      alert("enter valid data");
  } else {
      setCourseData({
          ...courseData, category: "", courseName:"",courseDescription: ""
      });
      alert("SUccessfully Added");
    // console.log(data);
    // navigate("/login")
  };
}

  return (
    <div className="add-course">
      <h2>Add New Course</h2>
      <form>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={courseData.category}
          onChange={handleInputChange}
        />
        <label htmlFor="courseName">Course Name</label>
        <input
          type="text"
          id="courseName"
          name="courseName"
          value={courseData.courseName}
          onChange={handleInputChange}
        />
        <label htmlFor="courseDescription">Course Description</label>
        <textarea
          id="courseDescription"
          name="courseDescription"
          value={courseData.courseDescription}
          onChange={handleInputChange}
        />
        {/* <NavLink to="addcourse"> Remove the /teacherhome prefix */}
        <NavLink>
          <button type="submit"  onClick= {handleSubmit} className="submit-button">
            Add Course
          </button>
        </NavLink>
        {/* // </NavLink> */}


      </form>
    </div>
  );
}

export default AddCourse;
