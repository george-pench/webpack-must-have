import React, { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import SearchResults from "../components/SearchResults";
import * as styles from "./Home.m.scss";

const DEBOUNCE_DELAY = 600;

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const debouncedSetSearch = useCallback(
    debounce((term: string) => {
      if (term.length >= 3) {
        setDebouncedSearchTerm(term);
      } else {
        setDebouncedSearchTerm("");
      }
    }, DEBOUNCE_DELAY),
    [],
  );

  useEffect(() => {
    debouncedSetSearch(searchTerm);
  }, [searchTerm, debouncedSetSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.home}>
      <div className={styles.searchContainer}>
        <h1>Game Search</h1>
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for games..."
            className={styles.searchInput}
          />
          <i className={styles.searchIcon}>🔍</i>
        </div>
      </div>
      <SearchResults searchTerm={debouncedSearchTerm} />
    </div>
  );
}

export default Home;
