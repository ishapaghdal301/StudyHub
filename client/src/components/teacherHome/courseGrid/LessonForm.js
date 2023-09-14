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
    try {
      // Perform API request to add the lesson to the course
      const response = await fetch("http://localhost:5000/lectures/youtubeupload", {
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
        });

        onLessonAdded();
      } else {
        console.error("Failed to add lessonn");
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
        <textarea
          name="content"
          value={lessonData.content}
          onChange={handleInputChange}
        ></textarea>
      </label>
      <label>
        Video URL:
        <input
          type="text"
          name="videoURL"
          value={lessonData.videoURL}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleAddLesson}>Add Lesson</button>
    </div>
  );
}

export default LessonForm;
