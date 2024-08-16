import { API_URLS } from "../config/apiConfig";

const searchItems = async (term: string, limit: number = 10, offset: number = 0) => {
  try {
    const url = new URL(API_URLS.SEARCH);
    url.searchParams.append("term", term);
    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("offset", offset.toString());

    const response = await fetch(url.toString());
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
