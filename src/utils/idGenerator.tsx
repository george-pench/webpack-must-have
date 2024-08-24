const generateUniqueId = (game: { name: string; releaseDate?: string; publisher?: string }): string => {
  return btoa(game.name + (game.releaseDate || "") + (game.publisher || "")).slice(0, 12);
};

export default generateUniqueId;
