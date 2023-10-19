import React, { useState , useEffect} from 'react';
import './addcourse1.css';

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    category: "",
    courseName: "",
    courseDescription: "",
    image: "",
    price: "" // Add the "price" field
  });

  const [categories, setCategories] = useState([]); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/course/categories"); // Replace with your backend API endpoint
      const data = await response.json();
      setCategories(data); // Update categories state with fetched data
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
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
            id="courseName"
            name="courseName"
            value={courseData.courseName}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseDescription">Course Description</label>
          <input
            id="courseDescription"
            value={courseData.courseDescription}
            name='courseDescription'
            onChange={handleInputChange}
            required
            className="input-field"
          ></input>
        </div>
        
        <label htmlFor="category">Course Category</label>
          <select
            id="category"
            value={courseData.category}
            name="category"
            onChange={handleInputChange}
            required
            className="input-field"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            id="image"
            value={courseData.image}
            name='image'
            onChange={handleInputChange}
            required
            className="input-field"
          ></input>
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
            autoComplete="off"
          />
        </div>


        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
