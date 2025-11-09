// client/src/components/PlayerFooter.jsx
import React from "react";
import styles from "./PlayerFooter.module.scss";
import YouTubePlayer from "./YouTubePlayer";

export default function PlayerFooter({
  videoId,
  videoTitle,
  thumbnailUrl,
  isPlaying,
  onPrevious,
  onNext,
  onPlayPause,
  volume,
  onVolumeChange,
  onPlayerReady,
}) {
  return (
    <footer className={styles.footer}>
      <div className={styles.songInfo}>
        {thumbnailUrl && (
          <div className={styles.albumArt}>
            <img src={thumbnailUrl} alt="cover" width="50" height="50" />
          </div>
        )}
        <div>
          <p>{videoTitle || "Cargando canción..."}</p>
          <p className={styles.artist}>YouTube</p>
        </div>
      </div>

      <div className={styles.controls}>
        <button onClick={onPrevious}>⏮</button>
        <button onClick={onPlayPause}>{isPlaying ? "⏸" : "▶️"}</button>
        <button onClick={onNext}>⏭</button>
      </div>

      <div className={styles.volume}>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => onVolumeChange(parseInt(e.target.value))}
        />
      </div>

      <YouTubePlayer videoId={videoId} onReady={onPlayerReady} />
    </footer>
  );
}
