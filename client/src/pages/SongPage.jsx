import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SongCard from "../components/SongCard";
import YouTubePlayer from "../components/YouTubePlayer";
import styles from "./SongPage.module.scss";

const SongPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const songData = location.state; // viene desde Explore.jsx
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  const handlePlayerReady = (p) => {
    p.setVolume(volume);
    setPlayer(p);
    p.playVideo();
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!player) return;
    const state = player.getPlayerState();
    if (state === 1) {
      player.pauseVideo();
      setIsPlaying(false);
    } else {
      player.playVideo();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (player && id) {
      player.loadVideoById(id);
      setIsPlaying(true);
    }
  }, [id, player]);

  return (
    <div className={styles.songPage}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.infoSection}>
          <div className={styles.coverWrapper}>
            <img
              src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
              alt={songData?.snippet?.title || "Song Cover"}
            />
          </div>
          <div className={styles.textInfo}>
            <h1>{songData?.snippet?.title || "Título desconocido"}</h1>
            <p>{songData?.snippet?.channelTitle || "Artista desconocido"}</p>
          </div>
        </div>

        <div className={styles.songCardWrapper}>
          <SongCard
            cover={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            title={songData?.snippet?.title}
            artist={songData?.snippet?.channelTitle}
            playing={isPlaying}
            onPlayPause={togglePlayPause}
          />
        </div>

        <div className={styles.volumeControl}>
          <label>Volumen</label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => {
              const newVol = parseInt(e.target.value);
              setVolume(newVol);
              if (player) player.setVolume(newVol);
            }}
          />
        </div>

        <YouTubePlayer videoId={id} onReady={handlePlayerReady} />
      </div>
    </div>
  );
};

export default SongPage;
