import React, { useState } from "react";

function LessonForm({ courseId, onLessonAdded }) {
  const [lessonData, setLessonData] = useState({
    title: "",
    content: "",
    videoURL: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLessonData({ ...lessonData, [name]: value });
  };

  const handleAddLesson = async () => {
    let response;

    try {
      const formData = new FormData();

      // Add data to the form
      formData.append("courseId", courseId);
      formData.append("title", lessonData.title);
      formData.append("content", lessonData.content);

        // For YouTube URL, send it as JSON
        formData.append("videoURL", lessonData.videoURL);

        // Perform API request for YouTube URL
        response = await fetch("http://localhost:5000/lectures/youtubeupload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId, ...lessonData }),
        });
      

      if (response.ok) {
        setLessonData({
          title: "",
          content: "",
          videoURL: "",
          videoFile: null,
        });

        onLessonAdded();
      } else {
        console.error("Failed to add lesson");
      }
    } catch (error) {
      console.error("Error adding lesson:", error);
    }
  };

  return (
    <div>
      <h3>Add Lesson</h3>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={lessonData.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Content:
        <input
          name="content"
          value={lessonData.content}
          onChange={handleInputChange}
        />
      </label>

      <label>
        YouTube Video URL:
        <input
          type="text"
          name="videoURL"
          value={lessonData.videoURL}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleAddLesson} style={{backgroundColor: "black", width:"190px", height:"40px", borderRadius:"0"}}>Add Lesson</button>
    </div>
  );
}

export default LessonForm;
