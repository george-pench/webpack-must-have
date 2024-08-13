import React from "react";
import * as styles from "./Header.m.scss";

function Header(): React.ReactElement {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1 className={styles.title}>React</h1>
      </div>
      <nav className={styles.nav}>
        <a href="/" className={styles.navLink}>
          Home
        </a>
        <a href="/about" className={styles.navLink}>
          About
        </a>
        <a href="/contact" className={styles.navLink}>
          Contact
        </a>
      </nav>
      <div className={styles.userActions}>
        <button type="button" className={styles.authButton}>
          Sign In
        </button>
        <button type="button" className={styles.authButton}>
          Sign Up
        </button>
      </div>
    </header>
  );
}

export default Header;
