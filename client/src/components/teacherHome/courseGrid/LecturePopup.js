import React, { useState, useEffect } from "react";
import "./lecturepopup.css";

const itemsPerPage = 2; // Number of lessons per page

const LecturePopup = ({ lessons }) => {
  const [videoThumbnails, setVideoThumbnails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // Function to fetch video thumbnails from YouTube
  const fetchVideoThumbnails = async () => {
    const thumbnails = {};
    for (const lesson of lessons) {
      const videoId = getYouTubeVideoId(lesson.videoLink);
      if (videoId) {
        const thumbnailResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAaaAcwWOCR4OI55kljtxjsOOM-0qrpNLg&part=snippet&id=${videoId}`
        );
        if (thumbnailResponse.ok) {
          const thumbnailData = await thumbnailResponse.json();
          const thumbnailUrl =
            thumbnailData.items[0]?.snippet?.thumbnails?.default?.url || "";
          thumbnails[lesson._id] = thumbnailUrl;
        }
      }
    }
    setVideoThumbnails(thumbnails);
  };

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    const videoIdMatch = url.match(
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/
    );
    if (videoIdMatch) {
      return videoIdMatch[1];
    } else {
      // Try another pattern for YouTube URLs
      const anotherMatch = url.match(
        /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/.+[?&]v=([\w-]{11})/
      );
      return anotherMatch ? anotherMatch[1] : null;
    }
  };

  useEffect(() => {
    fetchVideoThumbnails();
  }, [lessons]);

  // Calculate the range of lessons to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the lessons array to display only the lessons for the current page
  const lessonsToDisplay = lessons.slice(startIndex, endIndex);

  return (
    <div>
      <div className="lecture-popup">
        <div className="lecture-popup-content">
          <h3>Lectures</h3>
          <ul className="lecture-list">
            {lessonsToDisplay.map((lesson) => (
              <li key={lesson._id} className="lecture-item">
                <h4>{lesson.title}</h4>
                {videoThumbnails[lesson._id] && (
                  <iframe
                    width="320" // Set the width as desired
                    height="180" // Set the height as desired
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                      lesson.videoLink
                    )}`}
                    title={lesson.title}
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                )}
              </li>
            ))}
          </ul>
          {/* Pagination controls */}
          <div className="pagination">
            <button style={{backgroundColor: "black", width:"100px", height:"40px", borderRadius:"0"}}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button style={{backgroundColor: "black", width:"100px", height:"40px", borderRadius:"0"}}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={endIndex >= lessons.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturePopup;
