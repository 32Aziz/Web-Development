import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import "../../styles/layout/navbar.css";

function MyNavbar() {
  return (
    // Main navbar container
    // background color uses Dark Navy from the chosen palette
    // expand="lg" means the navbar stays collapsed on small screens
    // and expands normally on large screens
    <Navbar className="custom-navbar" expand="lg">
      {/* Container fluid makes the navbar take the full width */}
      <Container fluid className="navbar-container">
        {/* Navbar.Brand is the website name or logo */}
        <Navbar.Brand className="brand" as={Link} to="/">
          Movies Database
        </Navbar.Brand>

        {/* Navbar.Toggle is the menu button that appears on small screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar.Collapse is the part that opens and closes when the toggle is clicked */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Nav holds the navigation links */}
          {/* ms-auto pushes the links to the right */}
          <Nav className="ms-auto nav-links">
            {/* One navigation link */}
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>

            {/* Another navigation link */}
            <Nav.Link as={NavLink} to="/movies">
              Movies
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;