import React, { useState } from 'react';
import './addcourse1.css';

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    category: "",
    courseName: "",
    courseDescription: "",
    image: "",
    price: "" // Add the "price" field
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // console.log("hi");

    e.preventDefault();
    const { category, courseName, courseDescription, image, price } = courseData;
    const instructor = localStorage.getItem("user");
    // console.log(instructor);
    console.log(price);

    const res = await fetch("http://localhost:5000/course/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category, courseName, courseDescription, instructor, image, price
      }),
    });


    const data = await res.json();
    console.log(data);


    if (res.status === 400 || !data) {
      console.log(res.status);
      alert("enter valid data");
    } else {
      setCourseData({
        ...courseData, category: "", courseName: "", courseDescription: "", image: ""
      });
      alert("SUccessfully Added");
      // console.log(data);
      // navigate("/login")
    };
  };

  const handleImageUpload = (event) => {
    // Handle image upload logic here and set the 'image' state
  };


  return (
    <div className="add-course-page">
      <h1>Add New Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="courseName">Course Name</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={courseData.courseName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseDescription">Course Description</label>
          <textarea
            id="courseDescription"
            value={courseData.courseDescription}
            name='courseDescription'
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="category">Course Category</label>
          <textarea
            id="category"
            value={courseData.category}
            name='category'
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <textarea
            id="image"
            value={courseData.image}
            name='image'
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={courseData.price}
            onChange={handleInputChange}
            required
            className="input-field" // Add the class "input-field"
          />
        </div>


        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
