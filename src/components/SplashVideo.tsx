import { useState, useEffect, useRef } from "react";

export default function SplashVideo() {
  const [showSplash, setShowSplash] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const played = sessionStorage.getItem("splashPlayed");
    if (!played) {
      setShowSplash(true);
    }
    // setShowSplash(true);
  }, []);

  useEffect(() => {
    if (showSplash && videoRef.current) {
      videoRef.current.playbackRate = 1.7;
    }
  }, [showSplash]);

  const handleEnded = () => {
    sessionStorage.setItem("splashPlayed", "true");
    setShowSplash(false);
  };

  if (!showSplash) return null;

  return (
    <div className="fixed inset-0 z-80 bg-negro flex items-center justify-center">
      <video
        ref={videoRef}
        src="/video/video-animation.webm"
        autoPlay
        onEnded={handleEnded}
        muted
        className="md:w-[40%] md:h-[40%] object-cover"
        playsInline
        preload="metadata"
      />
    </div>
  );
}
