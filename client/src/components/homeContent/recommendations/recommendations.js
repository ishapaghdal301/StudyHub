import React, { useState, useEffect } from "react";
import RecommendedVideos from "./recommendedVideos";
import "./recommendations.css";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

function Recommendations() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

  useEffect(() => {
    const instructor = localStorage.getItem("user");

    async function fetchcourses() {
      try {
        const response = await fetch("http://localhost:5000/allcourses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            instructor,
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
        <h3>The world's largest selection of courses</h3>
        <p>
          Choose from 130,000 online video courses with new additions published
          every month
        </p>
        <br></br>
        <br></br>

        <h2>Students are viewing</h2>
        <div className="mid part">
          <div className="searchIcon">
            <SearchOutlinedIcon className="icon" />
          </div>
          <input
            className="searchBar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for anything"
          ></input>
        </div>
        <br/>
        <RecommendedVideos courses={courses} searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default Recommendations;
