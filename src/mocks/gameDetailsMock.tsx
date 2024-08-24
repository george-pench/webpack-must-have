import { GameDetails } from "../types/game";
import generateUniqueId from "../utils/idGenerator";

const generateMockGameDetails = (name: string): GameDetails => {
  const releaseDate = new Date(Date.now() - Math.random() * 5 * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const publisher = ["Example Publisher", "Game Co.", "Studio X"][Math.floor(Math.random() * 3)];
  const id = generateUniqueId({ name, releaseDate, publisher });

  return {
    id,
    name,
    description: `This is a mock description for ${name}.`,
    releaseDate,
    publisher,
    genres: ["Action", "Adventure", "RPG", "Strategy"].sort(() => 0.5 - Math.random()).slice(0, 2),
    platforms: ["PC", "PlayStation 5", "Xbox Series X/S", "Nintendo Switch"].sort(() => 0.5 - Math.random()).slice(0, 3),
    imageUrl: `https://example.com/${name.toLowerCase().replace(/\s+/g, "-")}.jpg`,
    rating: Math.floor(Math.random() * 21) + 80,
  };
};

const mockGameDetails: Record<string, GameDetails> = {
  [generateUniqueId({ name: "Heroes 10", releaseDate: "2022-01-01", publisher: "Example Publisher" })]:
    generateMockGameDetails("Heroes 10"),
};

const getGameDetails = (id: string): Promise<GameDetails | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Fetching game details for ID:", id);
      let gameDetails = mockGameDetails[id];

      if (!gameDetails) {
        const gameName = atob(id).split("2")[0].trim();
        gameDetails = generateMockGameDetails(gameName);
        mockGameDetails[id] = gameDetails;
      }

      resolve(gameDetails);
    }, 500);
  });
};

export default getGameDetails;
