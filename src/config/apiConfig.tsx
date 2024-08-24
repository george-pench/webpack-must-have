// API configuration
export const API_CONFIG = {
  BASE_URL: "https://localhost:44311/api",
  ENDPOINTS: {
    GAMES: "/games",
    SEARCH: "/games/search",
  },
};

// Construct full URLs
export const API_URLS = {
  GAMES: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GAMES}`,
  SEARCH: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SEARCH}`,
};
