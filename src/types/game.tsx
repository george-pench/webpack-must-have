export interface Game {
  id?: string;
  name: string;
  releaseDate?: string;
  publisher?: string;
}

export interface GameDetails extends Game {
  description: string;
  releaseDate: string;
  publisher: string;
  genres: string[];
  platforms: string[];
  imageUrl: string;
  rating: number;
}
