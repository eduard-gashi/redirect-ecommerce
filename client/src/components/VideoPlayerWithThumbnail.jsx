import { React, useState } from 'react';

const AdvertisementVideo = () => {
  return (
    <iframe
      src="videos/advertisement_video.mp4"
      title="Advertisement Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      width={'100%'}
      height={'100%'}
      style={{ border: 'none', outline: 'none' }}
    ></iframe>
  );
};

export const VideoPlayerWithThumbnail = () => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  // If the video should be visible, render the video player
  if (isVideoVisible) {
    return (
      <div style={{ width: '800px', height: '450px', maxWidth: '100%' }}>
        <AdvertisementVideo />
      </div>
    );
  }

  // Otherwise, render the clickable thumbnail
  return (
    <div
      className="video-thumbnail-container"
      onClick={() => setIsVideoVisible(true)}
      style={{ width: '800px', height: '450px', maxWidth: '100%' }}
    >
      <img src="focus.jpg" alt="Video Thumbnail" className="video-thumbnail-image" />
      <div className="hero-overlay-top">
        <h1>Mehr Fokus, weniger Bildschirmzeit</h1>
      </div>
      <div className="play-button-overlay">
        <div className="play-icon" />
      </div>

      <div className="hero-overlay-bottom">
        <p>Durchbreche deine negativen Smartphone Gewohnheiten in nur 30 Tagen.</p>
      </div>
    </div>
  );
};
