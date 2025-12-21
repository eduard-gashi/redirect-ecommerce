import { useState } from "react";

const TutorialVideoPlayer = () => (
    <iframe
        src="videos/tutorial_video.mp4"
        title="Tutorial Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        width="100%"
        height="100%"
        style={{ border: "none", outline: "none" }}
    />
);

export default function TutorialVideo() {
    const [isVideoVisible, setIsVideoVisible] = useState(false);

    if (isVideoVisible) {
        return (
            <div style={{ width: '800px', height: '450px', maxWidth: '100%' }}>
                <TutorialVideoPlayer />
            </div>
        );
    }

    return (
        <div
            className="video-thumbnail-container"
            onClick={() => setIsVideoVisible(true)}
            style={{ width: '800px', height: '450px', maxWidth: '100%' }}
        >
            <img
                src="focus.jpg"
                alt="Video Thumbnail"
                className="video-thumbnail-image"
            />
            <div className="hero-overlay-top">
                <h1>So funktionier die Handy-Detox Box</h1>
            </div>
            <div className="play-button-overlay">
                <div className="play-icon" />
            </div>
        </div>
    );
}
