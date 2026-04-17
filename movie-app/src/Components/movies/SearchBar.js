import { Form, Button } from "react-bootstrap";

function SearchBar({ searchTerm, setSearchTerm, fetchMovies }) {
  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchMovies(searchTerm);
  }

  return (
    <Form
      onSubmit={handleSubmit}
      className="search-form"
    >
      <Form.Control
        type="search"
        placeholder="Search movies..."
        className="search-box"
        id="search-movies"
        value={searchTerm}
        onChange={handleChange}
      />
      <Button className="search-button" type="submit" variant="primary">
        Search
      </Button>
    </Form>
  );
}

export default SearchBar;