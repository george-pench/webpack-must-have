const API_BASE_URL = "https://localhost:44311/api/games";

const searchItems = async (term: string, limit: number = 10, offset: number = 0) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?term=${encodeURIComponent(term)}&limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Could not fetch search results:", error);
    throw error;
  }
};

export default searchItems;
