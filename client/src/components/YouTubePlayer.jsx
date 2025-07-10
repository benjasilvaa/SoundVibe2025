import { useEffect, useRef } from 'react';

const YouTubePlayer = ({ videoId, onReady }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoId) return;

    const loadPlayer = () => {
      const player = new window.YT.Player(playerRef.current, {
        height: '0', // oculto
        width: '0',  // oculto
        videoId,
        events: {
          onReady: (event) => {
            onReady(event.target); // le pasa el player al padre
            event.target.playVideo();
          },
        },
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = loadPlayer;
      document.body.appendChild(tag);
    } else {
      loadPlayer();
    }
  }, [videoId, onReady]);

  return <div ref={playerRef}></div>;
};

export default YouTubePlayer;
