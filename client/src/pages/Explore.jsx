import React, { useState } from 'react';
import YouTubePlayer from '../components/YouTubePlayer';

export default function Explore() {
  const [query, setQuery] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoThumbnail, setVideoThumbnail] = useState('');

  const searchYouTube = async () => {
    const res = await fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.items?.length > 0) {
      const video = data.items[0];
      setVideoId(video.id.videoId);
      setVideoTitle(video.snippet.title);
      setVideoThumbnail(video.snippet.thumbnails.high.url);
    }
  };

  return (
    <div>
      <h1>Explorar Música</h1>
      <input
        type="text"
        placeholder="Buscar canción..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchYouTube}>Buscar</button>

      {videoId && (
        <div style={{ marginTop: '1rem' }}>
          <h2>{videoTitle}</h2>
          <img src={videoThumbnail} alt={videoTitle} width="480" />
          <YouTubePlayer videoId={videoId} />
        </div>
      )}
    </div>
  );
}
