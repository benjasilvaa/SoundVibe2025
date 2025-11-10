import React, { useEffect, useState, useRef } from "react";
import "./SongCard.scss";
import { FaPlay, FaPause, FaHeart } from "react-icons/fa";

const SongCard = ({ cover, title, artist, playing, onPlayPause, player }) => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressRef = useRef(null);

  // Convierte segundos a formato mm:ss
  const formatTime = (secs) => {
    if (!secs) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Actualiza progreso cada 500 ms
  useEffect(() => {
    let interval;
    if (player && playing) {
      interval = setInterval(() => {
        const current = player.getCurrentTime();
        const total = player.getDuration();
        setCurrentTime(current);
        setDuration(total);
        setProgress((current / total) * 100 || 0);
      }, 500);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [player, playing]);

  // Permite hacer clic o arrastrar en la barra de progreso
  const handleSeek = (e) => {
    if (!player || !progressRef.current || !duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;
    player.seekTo(newTime, true);
    setCurrentTime(newTime);
    setProgress(percentage * 100);
  };

  return (
    <div className="song-card">
      <div className="song-card__cover">
        <img src={cover} alt={`${title} cover`} />
      </div>

      <div className="song-card__info">
        <h4>{title}</h4>
        <p>{artist}</p>
      </div>

      <div className="song-card__controls">
        {/* Barra de progreso interactiva */}
        <div
          className="song-card__progress"
          ref={progressRef}
          onClick={handleSeek}
        >
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Controles */}
        <div className="song-card__buttons">
          <span className="time">{formatTime(currentTime)}</span>
          <button className="play-btn" onClick={onPlayPause}>
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <span className="time">
            {duration ? `-${formatTime(duration - currentTime)}` : "-0:00"}
          </span>
        </div>

        <div className="song-card__heart">
          <FaHeart />
        </div>
      </div>
    </div>
  );
};

export default SongCard;
