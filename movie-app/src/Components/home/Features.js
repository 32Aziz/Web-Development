import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/home/features.css";
import posterFallback from "../../assets/images/crossed-image.jpg";

function Features() {
  // state to store featured movies
  const [featuredMovies, setFeaturedMovies] = useState([]);

  // loading state for the section
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // selected featured movie titles
    // using exact movie titles with t= gives richer details than s=
    const featuredTitles = [
      "Dune: Part Two",
      "Oppenheimer",
      "The Shawshank Redemption",
      "Avatar: The Way of Water",
    ];

    async function fetchFeaturedMovies() {
      setLoading(true);

      try {
        // fetch all selected movies in parallel
        const requests = featuredTitles.map((title) =>
          fetch(
            `https://www.omdbapi.com/?t=${encodeURIComponent(
              title
            )}&plot=short&apikey=f2a62b34`
          ).then((res) => res.json())
        );

        const results = await Promise.all(requests);

        // keep only valid movie results
        const validMovies = results.filter(
          (movie) => movie && movie.Response === "True"
        );

        setFeaturedMovies(validMovies);
      } catch (error) {
        console.error("Error fetching featured movies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedMovies();
  }, []);

  return (
    <section className="features-section">
      <Container fluid>
        {/* Top header */}
        <div className="features-header">
          <div>
            <span className="features-subtitle">EDITOR'S CHOICE</span>
            <h2>Featured Films</h2>
          </div>

          <Link to="/movies" className="features-view-all">
            View All
          </Link>
        </div>

        {/* Cards */}
        {loading ? (
          <p className="features-loading">Loading featured movies...</p>
        ) : (
          <div className="features-grid">
            {featuredMovies.map((movie) => (
              <div className="feature-card" key={movie.imdbID}>
                {/* Poster */}
                <div className="feature-poster-wrapper">
                  <img
                    src={
                      movie.Poster && movie.Poster !== "N/A"
                        ? movie.Poster
                        : posterFallback
                    }
                    alt={movie.Title}
                    className="feature-poster"
                  />

                  {/* Genre tag */}
                  <span className="feature-genre">
                    {movie.Genre ? movie.Genre.split(",")[0] : "Movie"}
                  </span>

                  {/* Rating badge */}
                  <span className="feature-rating">
                    ⭐ {movie.imdbRating !== "N/A" ? movie.imdbRating : "N/A"}
                  </span>
                </div>

                {/* Card body */}
                <div className="feature-card-body">
                  <h3>{movie.Title}</h3>

                  <div className="feature-meta">
                    <span>{movie.Year}</span>
                    <span>{movie.Runtime !== "N/A" ? movie.Runtime : "N/A"}</span>
                  </div>

                  <p>
                    {movie.Plot && movie.Plot !== "N/A"
                      ? movie.Plot
                      : "No description available for this movie."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom action */}
        <div className="features-footer">
          <Button as={Link} to="/movies" className="features-btn">
            Browse All Movies
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default Features;