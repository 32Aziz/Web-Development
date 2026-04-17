import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import SearchBar from "../Components/movies/SearchBar";
import MovieCard from "../Components/movies/MovieCard";
import Fav from "../Components/movies/Fav";
import "../styles/movies/movies.css";

function Movies() {
  // create state for movies
  // we will fetch movies from the API and store them in this state
  const [movies, setMovies] = useState([]);

  // create state for favorite movies
  const [favorites, setFavorites] = useState([]);

  // create state for search term
  const [searchTerm, setSearchTerm] = useState("Avatar");

  // create state for loading status
  const [loading, setLoading] = useState(false);

  // load favorites from localStorage when page loads
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function fetchMovies(value) {
    setLoading(true);

    // fetch movies from the API based on the search term
    fetch(`https://www.omdbapi.com/?s=${value}&apikey=f2a62b34`)
      .then((res) => {
        // if the response is not okay, throw an error
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        // convert the response to JSON
        return res.json();
      })
      .then((data) => {
        // remove duplicate movies by imdbID before saving them
        const uniqueMovies = (data.Search || []).filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.imdbID === movie.imdbID)
        );

        // save movies in state
        setMovies(uniqueMovies);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setMovies([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // useEffect runs only one time when the page first loads
  useEffect(() => {
    fetchMovies("Avatar");
  }, []);

  function addToFavorites(movie) {
    setFavorites((prevFavorites) => {
      // check if the movie already exists in favorites
      if (prevFavorites.some((fav) => fav.imdbID === movie.imdbID)) {
        return prevFavorites;
      }

      // if not found, add it
      return [...prevFavorites, movie];
    });
  }

  function removeFromFavorites(movie) {
    // filter creates a new array with all movies except the one to remove
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID)
    );
  }

  function isFavorite(movie) {
    // returns true if the movie is already in favorites
    return favorites.some((fav) => fav.imdbID === movie.imdbID);
  }

  return (
    <motion.main
      className="movies-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1.0, delay: 0.32 }}
    >
      <Container fluid className="movies-container">
        <Row className="movies-header-row">
          <Col xs={12} lg={6} className="movies-search-col">
            <h4>
              Movies List: <span>{movies.length}</span>
            </h4>
          </Col>

          <Col xs={12} lg={6}>
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              fetchMovies={fetchMovies}
            />
          </Col>
        </Row>

        {loading ? (
          <h5 className="loading-text">Loading movies...</h5>
        ) : (
          <div className="movies-flex">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                title={movie.Title}
                poster={movie.Poster}
                movie={movie}
                isFavorite={isFavorite(movie)}
                onAddToFavorites={addToFavorites}
                onRemoveFromFavorites={removeFromFavorites}
                showFavoriteButton={true}
                cardType="movies"
              />
            ))}
          </div>
        )}

        <div className="fav-section">
          <Row className="favorites-header-row">
            <Col xs={12} className="favorites-header-col">
              <h4>
                Favorites List: <span>{favorites.length}</span>
              </h4>
            </Col>
          </Row>

          {/* pass the favorites array to the Fav component */}
          <Fav
            favorites={favorites}
            onRemoveFromFavorites={removeFromFavorites}
          />
        </div>
      </Container>
    </motion.main>
  );
}

export default Movies;