import React from "react";
import "./SongCard.scss";
import { FaPlay, FaPause, FaHeart } from "react-icons/fa";

const SongCard = ({ cover, title, artist, playing, onPlayPause }) => {
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
        <div className="song-card__progress">
          <div className="progress-bar"></div>
        </div>

        <div className="song-card__buttons">
          <span className="time">0:01</span>
          <button className="play-btn" onClick={onPlayPause}>
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <span className="time">-2:54</span>
        </div>

        <div className="song-card__heart">
          <FaHeart />
        </div>
      </div>
    </div>
  );
};

export default SongCard;
