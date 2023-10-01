import React, { useState,useEffect } from "react";
import VideoCard from "./videoCard";
import VideoDetail from "./videoDetail";
import './recommendedVideos.css';

function RecommendedVideos({ courses , searchQuery }) {
  
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const openCourseDetail = (course) => {
    setSelectedCourse(course);
    console.log("The card is clicked");
  };

  const closeCourseDetail = () => {
    setSelectedCourse(null);
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetch(`/search?q=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data);
        })
        .catch((error) => {
          console.error("Error searching for courses:", error);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div className="recommendedVideos">
      
      {searchResults.length > 0 ? (
        // Display search results if there are matching courses
        searchResults.map((course) => (
          <div key={course._id} style={{ marginRight: "5px" }}>
            <VideoCard
              courseTitle={course.courseName}
              imgSrc={course.image}
              instructor={course.instructor}
              rating={4.6}
              noOfStudents="(166,042)"
              price={course.price}
              onClick={() => openCourseDetail(course)}
            />
          </div>
        ))
      ) : (
      courses.map((course, index) => ( // Add an index to track the card's position
        <div key={course._id} style={{ marginRight: "5px" }}> {/* Apply right margin */}
          <VideoCard
            courseTitle={course.courseName}
            imgSrc={course.image}
            // instructor={course.instructor}
            rating={4.6}
            // noOfStudents="(166,042)"
            price={course.price}
            onClick={() => openCourseDetail(course)}
          />
        </div>
      ))
      )}
      
      
      {selectedCourse && (
        <VideoDetail course={selectedCourse} onClose={closeCourseDetail} />
      )}
    </div>
  );
}

export default RecommendedVideos;
