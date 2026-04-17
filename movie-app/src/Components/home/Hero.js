import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/home/hero.css";
import heroVideo from "../../assets/video/8263456-uhd_2160_4096_25fps.mp4";

function Hero() {
  return (
    <section className="hero-section">
      <Container fluid>
        <Row className="hero-row align-items-center">
          
          {/* Left side: heading, description, buttons, and feature tags */}
          <Col lg={6} className="hero-left">
            <h1>
              Discover Your Next <br />
              <span>Favorite Film</span>
            </h1>

            <p>
              Explore thousands of movies, read detailed descriptions,
              discover genres, and find your perfect film for any mood or occasion.
            </p>

            {/* Hero action buttons */}
            <div className="hero-buttons">
              <Button
                className="btn-1"
                as={Link}
                to="/movies"
                variant="primary"
              >
                Explore
              </Button>

              <Button
                className="btn-2"
                as={Link}
                to="/movies"
                variant="outline-light"
              >
                Search Films
              </Button>
            </div>

            {/* Small feature tags */}
            <div className="hero-tags">
              <span className="hero-tag">Movie Search</span>
              <span className="hero-tag">Genres</span>
              <span className="hero-tag">Ratings</span>
              <span className="hero-tag">Favorites</span>
              <span className="hero-tag">Descriptions</span>
            </div>
          </Col>

          {/* Right side: video showcase */}
          <Col lg={6} className="hero-right">
            <div className="hero-video-wrapper">
              <video
                controls
                loop
                muted
                playsInline
                className="hero-video"
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;