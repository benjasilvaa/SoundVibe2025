import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Explore.module.scss";
import Navbar from "../components/Navbar";

const Explore = () => {
  const [trending, setTrending] = useState([]);
  const [genres] = useState(["Pop", "Rock", "Hip-Hop", "Electronic", "Indie"]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const API_KEY = "AIzaSyDbvnU57TkQetNhFfdHm0CH5TgYIndan7Q";
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=5&key=${API_KEY}`
        );
        const data = await res.json();
        setTrending(data.items || []);
      } catch (err) {
        console.error("Error cargando videos:", err);
      }
    };
    fetchTrending();
  }, []);

  const filtered = trending.filter((v) =>
    v.snippet.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSongClick = (video) => {
    navigate(`/song/${video.id}`, { state: video });
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.content}>
        <header className={styles.header}>
          <h1>Explorar</h1>
          <input
            type="text"
            placeholder="Buscar música..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>

        {/* Trending */}
        <section className={styles.section}>
          <h2>Tendencias</h2>
          <div className={styles.grid}>
            {filtered.map((video) => (
              <div
                key={video.id}
                className={styles.card}
                onClick={() => handleSongClick(video)}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.snippet.title}
                  />
                </div>
                <div className={styles.cardInfo}>
                  <h3>{video.snippet.title}</h3>
                  <p>{video.snippet.channelTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Genres */}
        <section className={styles.section}>
          <h2>Géneros</h2>
          <div className={styles.grid}>
            {genres.map((genre) => (
              <div
                key={genre}
                className={styles.card}
                onClick={() =>
                  handleSongClick({
                    id: genre.toLowerCase(),
                    snippet: {
                      title: `${genre} Music`,
                      channelTitle: "YouTube",
                      thumbnails: {
                        medium: {
                          url: `https://source.unsplash.com/400x400/?${genre},music`,
                        },
                      },
                    },
                  })
                }
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={`https://source.unsplash.com/400x400/?${genre},music`}
                    alt={genre}
                  />
                </div>
                <div className={styles.cardInfo}>
                  <h3>{genre}</h3>
                  <p>Descubrí lo nuevo en {genre}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Explore;
