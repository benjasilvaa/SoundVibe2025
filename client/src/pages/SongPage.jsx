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

  // Cuando el reproductor de YouTube está listo
  const handlePlayerReady = (p) => {
    setPlayer(p);
    p.setVolume(volume);
    p.playVideo();
    setIsPlaying(true);
  };

  // Play / Pause toggle
  const togglePlayPause = () => {
    if (!player) return;
    const state = player.getPlayerState();

    if (state === 1) {
      // Reproduciendo
      player.pauseVideo();
      setIsPlaying(false);
    } else {
      player.playVideo();
      setIsPlaying(true);
    }
  };

  // Cargar nuevo video si cambia el ID
  useEffect(() => {
    if (player && id) {
      player.loadVideoById(id);
      setIsPlaying(true);
    }
  }, [id, player]);

  // Control de volumen
  const handleVolumeChange = (e) => {
    const newVol = parseInt(e.target.value);
    setVolume(newVol);
    if (player) player.setVolume(newVol);
  };

  return (
    <div className={styles.songPage}>
      {/* 🧭 Navbar lateral (como en las demás páginas) */}
      <Navbar />

      {/* 🎵 Contenedor principal */}
      <div className={styles.container}>
        <div className={styles.songCardWrapper}>
          <SongCard
            cover={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            title={songData?.snippet?.title}
            artist={songData?.snippet?.channelTitle}
            playing={isPlaying}
            onPlayPause={togglePlayPause}
            player={player} // 👈 importante para progreso dinámico
          />
        </div>

        {/* 🔊 Control de volumen */}
        <div className={styles.volumeControl}>
          <label>Volumen</label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>

        {/* 📺 Reproductor oculto (solo controla el audio/video) */}
        <YouTubePlayer videoId={id} onReady={handlePlayerReady} />
      </div>
    </div>
  );
};

export default SongPage;
