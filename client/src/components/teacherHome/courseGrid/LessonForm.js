import React, { useState } from "react";

function LessonForm({ courseId, onLessonAdded }) {
  const [lessonData, setLessonData] = useState({
    title: "",
    content: "",
    videoURL: "",
    isLocalUpload: false, // New state to track local upload
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox for local upload separately
    if (type === "checkbox") {
      setLessonData({ ...lessonData, [name]: checked });
    } else {
      setLessonData({ ...lessonData, [name]: value });
    }
  };

  const handleAddLesson = async () => {
    let response; // Declare 'response' here to make it available throughout the try block
  
    try {
      const formData = new FormData(); // Use FormData for file uploads
  
      // Add data to the form
      formData.append("courseId", courseId);
      formData.append("title", lessonData.title);
      formData.append("content", lessonData.content);
      formData.append("isLocalUpload", lessonData.isLocalUpload);
  
      // Handle different cases based on the choice (local upload or YouTube URL)
      if (lessonData.isLocalUpload) {
        // Add the video file to the form
        formData.append("file", lessonData.videoFile);
  
        // Perform API request for local upload
        response = await fetch("http://localhost:5000/lectures/localupload", {
          method: "POST",
          body: formData, // Use the form data for the request
        });
      } else {
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
      }
  
      if (response.ok) {
        setLessonData({
          title: "",
          content: "",
          videoURL: "",
          isLocalUpload: false,
          videoFile: null, // Clear the selected file
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
      {/* Radio button to select local upload or YouTube URL */}
      <label>
        Local Upload:
        <input
          type="checkbox"
          name="isLocalUpload"
          checked={lessonData.isLocalUpload}
          onChange={handleInputChange}
        />
      </label>
      {/* Conditionally render the file input based on the choice */}
      {lessonData.isLocalUpload && (
        <label>
          Upload Video:
          <input
            type="file"
            name="videoFile"
            onChange={(e) => handleInputChange({ target: e.target })}
          />
        </label>
      )}
      {!lessonData.isLocalUpload && (
        <label>
          YouTube Video URL:
          <input
            type="text"
            name="videoURL"
            value={lessonData.videoURL}
            onChange={handleInputChange}
          />
        </label>
      )}
      <button onClick={handleAddLesson}>Add Lesson</button>
    </div>
  );
}

export default LessonForm;
