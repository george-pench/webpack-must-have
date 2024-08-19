import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { AppDispatch, RootState } from "../store";
import { setQuery, setResults, setLoading, setError } from "../store/searchSlice";
import searchItems from "../services/api";
import { Game } from "../types/game";
import * as styles from "./Search.m.scss";

function Search(): React.ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const { query, results, isLoading, error } = useSelector((state: RootState) => state.search);

  const debouncedSearch = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchTerm.trim() === "") {
        dispatch(setResults([]));
        return;
      }

      dispatch(setLoading(true));
      try {
        const data = await searchItems(searchTerm);
        dispatch(setResults(data));
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : "An error occurred"));
      }
    }, 600),
    [dispatch],
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    dispatch(setQuery(newQuery));
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputContainer}>
        <input type="text" value={query} onChange={handleSearch} placeholder="Search for games..." className={styles.searchInput} />
        <i className={styles.searchIcon}>🔍</i>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul className={styles.searchResults}>
        {results.length > 0 ? (
          results.map((result: Game) => (
            <li key={result.id} className={styles.searchResultItem}>
              {result.name}
            </li>
          ))
        ) : (
          <li className={styles.searchResultItem}>No results found</li>
        )}
      </ul>
    </div>
  );
}

export default Search;
