import * as styles from "./Home.m.scss";

function Home() {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Welcome to React</h1>
      <p className={styles.description}>
        This is the Home page. Discover the power of modern web development with React. Build scalable and interactive user interfaces with
        ease.
      </p>

      <div className={styles.content}>
        <div className={styles.card}>
          <h3>Getting Started</h3>
          <p>Learn the basics of React and start building your first component.</p>
        </div>
        <div className={styles.card}>
          <h3>Components</h3>
          <p>Explore the world of reusable UI components and modular architecture.</p>
        </div>
        <div className={styles.card}>
          <h3>State Management</h3>
          <p>Master the art of managing application state for complex UIs.</p>
        </div>
      </div>

      <div className={styles.background} />
    </div>
  );
}

export default Home;
