import { API_URLS } from "../config/apiConfig";
import { Game } from "../types/game";
import generateUniqueId from "../utils/idGenerator";

const searchItems = async (term: string, limit: number = 10, offset: number = 0): Promise<Game[]> => {
  try {
    const url = new URL(API_URLS.SEARCH);
    url.searchParams.append("term", term);
    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("offset", offset.toString());

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const gamesWithIds = data.map((game: Partial<Game>) => {
      if (!game.name) {
        throw new Error("Game object is missing required 'name' property");
      }
      return {
        ...game,
        id:
          game.id ||
          generateUniqueId({
            name: game.name,
            releaseDate: game.releaseDate,
            publisher: game.publisher,
          }),
      };
    });

    return gamesWithIds as Game[];
  } catch (error) {
    console.error("Could not fetch search results:", error);
    throw error;
  }
};

export default searchItems;
