import React,{useState} from "react";
import VideoCard from "./videoCard";
import VideoDetail from "./videoDetail";
import './recommendedVideos.css';
function RecommendedVideos({ courses }) {

    const [selectedCourse, setSelectedCourse] = useState(null);
    const openCourseDetail = (course) => {
        setSelectedCourse(course);
    };

    const closeCourseDetail = () => {
        setSelectedCourse(null);
    };
    return (
        <div className="recommendedVideos">
            {courses.map((course) => (
                <VideoCard
                    courseTitle={course.courseName}
                    imgSrc={course.image}
                    instructor={course.instructor}
                    rating={4.6}
                    noOfStudents={"(166,042)"}
                    price={"₹8,640"}
                    onClick={() => openCourseDetail(course)}
                />
            ))}

            {selectedCourse && (
                <VideoDetail course={selectedCourse} onClose={closeCourseDetail} />
            )}

        </div>
    )
}

export default RecommendedVideos;