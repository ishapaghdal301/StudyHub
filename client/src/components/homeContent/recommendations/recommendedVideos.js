import React, { useState } from "react";
import VideoCard from "./videoCard";
import VideoDetail from "./videoDetail";
import './recommendedVideos.css';

function RecommendedVideos({ courses }) {
  
  const [selectedCourse, setSelectedCourse] = useState(null);

  const openCourseDetail = (course) => {
    setSelectedCourse(course);
    console.log("The card is clicked");
  };

  const closeCourseDetail = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="recommendedVideos">
      {courses.map((course, index) => ( // Add an index to track the card's position
        <div key={course._id} style={{ marginRight: "5px" }}> {/* Apply right margin */}
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
      ))}
      
      {selectedCourse && (
        <VideoDetail course={selectedCourse} onClose={closeCourseDetail} />
      )}
    </div>
  );
}

export default RecommendedVideos;
