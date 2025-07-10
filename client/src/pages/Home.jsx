import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { searchVideos } from "../api/backendApi";
import YouTubePlayer from "../components/YouTubePlayer";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentVideos, setRecentVideos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const truncateTitle = (title, maxLength = 25) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  useEffect(() => {
    async function fetchInitialVideos() {
      const results = await searchVideos("chill music");
      if (results.length > 0) {
        setVideos(results);
        setCurrentIndex(0);
        const newVideo = {
          title: results[0].snippet.title,
          thumbnail: results[0].snippet.thumbnails?.medium?.url,
        };
        setRecentVideos([newVideo]);
      }
    }
    fetchInitialVideos();
  }, []);

  const currentVideo = videos[currentIndex] || null;
  const videoId = currentVideo?.id.videoId || null;
  const videoTitle = currentVideo?.snippet.title || "";
  const thumbnailUrl = currentVideo?.snippet.thumbnails?.medium?.url || "";

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
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
    if (player && videoId && currentVideo) {
      player.loadVideoById(videoId);
      player.playVideo();
      setIsPlaying(true);

      const newVideo = {
        title: currentVideo.snippet.title,
        thumbnail: currentVideo.snippet.thumbnails?.medium?.url,
      };
      setRecentVideos((prev) => {
        const updated = [newVideo, ...prev.filter(v => v.title !== newVideo.title)];
        return updated.slice(0, 5);
      });
    }
  }, [videoId, player]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (searchQuery.trim()) {
        const results = await searchVideos(searchQuery);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleRecentCardClick = (index) => {
    const video = recentVideos[index];
    if (!video) return;
    searchVideos(video.title).then((results) => {
      if (results.length > 0) {
        setVideos(results);
        setCurrentIndex(0);
      }
    });
  };

  const handleResultClick = (video) => {
    setVideos([video]);
    setCurrentIndex(0);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className={styles["home-page"]}>
      <aside className={styles.sidebar}>
        <h1>SoundVibe</h1>
        <nav className={styles.nav}>
          <a href="#">Inicio</a>
          <a href="#">Buscar</a>
          <a href="#">Tu biblioteca</a>
        </nav>
        <button className={styles.createBtn}>Crear lista</button>
        <div className={styles.legal}>
          <a href="#">Legal</a> | <a href="#">Privacidad</a>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <h2>Buenos días</h2>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Buscar canción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className={styles.searchResults}>
                {searchResults.slice(0, 5).map((video, i) => (
                  <div
                    key={i}
                    className={styles.searchResultItem}
                    onClick={() => handleResultClick(video)}
                  >
                    <img
                      src={video.snippet.thumbnails?.default?.url}
                      alt="thumb"
                    />
                    <span>{truncateTitle(video.snippet.title)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </header>

        <section className={styles.section}>
          <h3>Escuchado recientemente</h3>
          <div className={styles.recentGrid}>
            {recentVideos.map((video, index) => (
              <div
                key={index}
                className={styles.card}
                onClick={() => handleRecentCardClick(index)}
              >
                <div className={styles.cover}>
                  {video.thumbnail && <img src={video.thumbnail} alt={video.title} />}
                </div>
                <p>{truncateTitle(video.title)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3>Tus playlists</h3>
          <div className={styles.cardGrid}>
            <div className={styles.card}><div className={styles.cover}></div><p>Workout</p></div>
            <div className={styles.card}><div className={styles.cover}></div><p>Road Trip</p></div>
            <div className={styles.card}><div className={styles.cover}></div><p>Indie</p></div>
            <div className={styles.card}><div className={styles.cover}></div><p>Pop Latino</p></div>
            <div className={styles.card}><div className={styles.cover}></div><p>Lo-fi</p></div>
          </div>
        </section>

        <section className={styles.section}>
          <h3>Artistas que podrían gustarte</h3>
          <div className={styles.cardGrid}>
            <div className={styles.card}><div className={styles.cover}></div><p>R.E.M.</p></div>
            <div className={styles.card}><div className={styles.cover}></div><p>Fleetwood Mac</p></div>
            <div className={styles.card}><div className={styles.cover}></div><p>The National</p></div>
          </div>
        </section>
      </main>

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
          <button onClick={handlePrevious}>⏮</button>
          <button onClick={togglePlayPause}>
            {isPlaying ? "⏸" : "▶️"}
          </button>
          <button onClick={handleNext}>⏭</button>
        </div>

        <div className={styles.volume}>
          <input type="range" />
        </div>

        <YouTubePlayer videoId={videoId} onReady={setPlayer} />
      </footer>
    </div>
  );
}
