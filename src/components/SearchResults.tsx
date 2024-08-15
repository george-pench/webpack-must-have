import { useState, useEffect } from "react";
import searchItems from "../services/api";
import * as styles from "./SearchResults.m.scss";

interface SearchGame {
  name: string;
}

interface SearchResultsProps {
  searchTerm: string;
}

function SearchResults({ searchTerm }: SearchResultsProps) {
  const [results, setResults] = useState<SearchGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchTerm || searchTerm.length < 3) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await searchItems(searchTerm);
        setResults(data);
      } catch (err) {
        setError("Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.searchResults}>
      {searchTerm && searchTerm.length >= 3 ? (
        <>
          <h2>Search Results for &ldquo;{searchTerm}&rdquo;</h2>
          {results.length === 0 ? (
            <p className={styles.noResults}>No results found.</p>
          ) : (
            <ul className={styles.resultsList}>
              {results.map((game) => (
                <li key={`${searchTerm}-${game.name}`} className={styles.resultItem}>
                  {game.name}
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p className={styles.instruction}>Enter at least 3 characters to search</p>
      )}
    </div>
  );
}

export default SearchResults;
