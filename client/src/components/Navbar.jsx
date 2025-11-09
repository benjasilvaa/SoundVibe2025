// client/src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <aside className={styles.sidebar}>
      <h1>SoundVibe</h1>
      <nav className={styles.nav}>
        <Link to="/home">Inicio</Link>
        <Link to="/explore">Explorar</Link>
        <Link to="/library">Tu biblioteca</Link>
      </nav>
      <button className={styles.createBtn}>Crear lista</button>
      <div className={styles.legal}>
        <a href="#">Legal</a> | <a href="#">Privacidad</a>
      </div>
    </aside>
  );
}
