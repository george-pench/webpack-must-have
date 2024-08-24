import { useLocation } from "react-router-dom";
import Search from "../components/Search";
import GameDetails from "../components/GameDetails";
import * as styles from "./Home.m.scss";

function Home() {
  const location = useLocation();
  const isGameDetailsPage = location.pathname.startsWith("/game/");

  return (
    <div className={styles.home}>
      {isGameDetailsPage ? (
        <GameDetails />
      ) : (
        <>
          <h1>Game Search</h1>
          <Search />
        </>
      )}
    </div>
  );
}

export default Home;
