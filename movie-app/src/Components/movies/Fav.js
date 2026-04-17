import React from "react";
import MovieCard from "./MovieCard";

function Fav({ favorites, onRemoveFromFavorites }) {
  return (
    <div className="movies-flex">
      {favorites.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          title={movie.Title}
          poster={movie.Poster}
          movie={movie}
          isFavorite={true}
          onRemoveFromFavorites={onRemoveFromFavorites}
          showFavoriteButton={true}
          cardType="favorites"
        />
      ))}
    </div>
  );
}

export default Fav;