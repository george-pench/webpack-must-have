import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import getGameDetails from "../mocks/gameDetailsMock";
import { GameDetails as GameDetailsType } from "../types/game";
import * as styles from "./GameDetails.m.scss";

function GameDetails() {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<GameDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      setLoading(true);
      try {
        const gameData = await getGameDetails(id || "");
        if (gameData) {
          setGame(gameData);
        } else {
          setError("Game not found");
        }
      } catch (err) {
        setError("Failed to fetch game details");
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !game) {
    return (
      <div>
        <h2>{error || "Game not found"}</h2>
        <Link to="/">Back to Search</Link>
      </div>
    );
  }

  return (
    <div className={styles.gameDetails}>
      <Link to="/" className={styles.backButton}>
        Back to Search
      </Link>
      <h1>{game.name}</h1>
      <img src={game.imageUrl} alt={game.name} className={styles.gameImage} />
      <p>{game.description}</p>
      <div className={styles.gameInfo}>
        <p>
          <strong>Release Date:</strong> {game.releaseDate}
        </p>
        <p>
          <strong>Publisher:</strong> {game.publisher}
        </p>
        <p>
          <strong>Genres:</strong> {game.genres.join(", ")}
        </p>
        <p>
          <strong>Platforms:</strong> {game.platforms.join(", ")}
        </p>
        <p>
          <strong>Rating:</strong> {game.rating}/100
        </p>
      </div>
    </div>
  );
}

export default GameDetails;
