import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import posterImage from "../../assets/images/crossed-image.jpg";

function MovieCard(props) {
  return (
    <Card className="movie-card">
      <Card.Img
        variant="top"
        src={props.poster && props.poster !== "N/A" ? props.poster : posterImage}
        alt={props.title}
        className="movie-poster"
      />

      <Card.Body>
        <Card.Title className="movie-title">{props.title}</Card.Title>

        {/* Movies list button */}
        {props.cardType === "movies" && (
          <Button
            className={props.isFavorite ? "fav-btn added-btn" : "fav-btn"}
            onClick={() => props.onAddToFavorites(props.movie)}
            disabled={props.isFavorite}
          >
            {props.isFavorite ? "Added to Favorites" : "Favorite"}
          </Button>
        )}

        {/* Favorites list button */}
        {props.cardType === "favorites" && (
          <Button
            variant="danger"
            className="fav-btn remove-btn"
            onClick={() => props.onRemoveFromFavorites(props.movie)}
          >
            Remove
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default MovieCard;