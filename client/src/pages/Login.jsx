// src/pages/Login.jsx

import React, { useState } from 'react';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';

export default function Login() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className={styles.login}>
      <div className={styles.login__content}>
        <div className={styles.login__img}>
          <img src="/img-login.svg" alt="Login Visual" />
        </div>

        <div className={styles.login__forms}>
          {showSignUp ? (
            <form className={styles.login__create}>
              <h1 className={styles.login__title}>Crear Cuenta</h1>

              <div className={styles.login__box}>
                <i className={`bx bx-user ${styles.login__icon}`}></i>
                <input type="text" placeholder="Usuario" className={styles.login__input} />
              </div>

              <div className={styles.login__box}>
                <i className={`bx bx-at ${styles.login__icon}`}></i>
                <input type="text" placeholder="Email" className={styles.login__input} />
              </div>

              <div className={styles.login__box}>
                <i className={`bx bx-lock-alt ${styles.login__icon}`}></i>
                <input type="password" placeholder="Contraseña" className={styles.login__input} />
              </div>

              <button className={styles.login__button}>Registrarse</button>

              <div>
                <span className={styles.login__account}>Ya tienes una cuenta?</span>
                <span className={styles.login__signup} onClick={() => setShowSignUp(false)}>Iniciar Sesion</span>
              </div>

              <div className={styles.login__social}>
                <a href="#" className={styles.login__social_icon}><i className='bx bxl-facebook'></i></a>
                <a href="#" className={styles.login__social_icon}><i className='bx bxl-twitter'></i></a>
                <a href="#" className={styles.login__social_icon}><i className='bx bxl-google'></i></a>
              </div>
            </form>
          ) : (
            <form className={styles.login__registre}>
              <h1 className={styles.login__title}>Iniciar Sesion</h1>

              <div className={styles.login__box}>
                <i className={`bx bx-user ${styles.login__icon}`}></i>
                <input type="text" placeholder="Usuario" className={styles.login__input} />
              </div>

              <div className={styles.login__box}>
                <i className={`bx bx-lock-alt ${styles.login__icon}`}></i>
                <input type="password" placeholder="Contraseña" className={styles.login__input} />
              </div>

              <Link className={styles.login__forgot} to="#">Olvidaste tu contraseña?</Link>

              <button className={styles.login__button}>Sign In</button>

              <div>
                <span className={styles.login__account}>No tienes una cuenta?</span>
                <span className={styles.login__signin} onClick={() => setShowSignUp(true)}>Registrarse</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
