// TutorialVideo.tsx
import { useState } from 'react';
import '../styles/tutorial-video.css';

const TutorialVideoPlayer = () => (
  <video
    src="videos/tutorial.mp4"
    controls
    playsInline
    style={{ width: '100%', height: '100%', border: 'none', outline: 'none' }}
  />
);

export default function TutorialVideo() {
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  if (isVideoVisible) {
    return (
      <div className="vertical-video-frame">
        <TutorialVideoPlayer />
      </div>
    );
  }

  return (
    <div
      className="video-thumbnail-container vertical-video-frame"
      onClick={() => setIsVideoVisible(true)}
    >
      <img src="tutorial.jpeg" alt="Video Thumbnail" className="video-thumbnail-image" />
      <div className="play-button-overlay">
        <div className="play-icon" />
      </div>
    </div>
  );
}
