import Search from "../components/Search";
import * as styles from "./Home.m.scss";

function Home() {
  return (
    <div className={styles.home}>
      <h1>Game Search</h1>
      <Search />
    </div>
  );
}

export default Home;
