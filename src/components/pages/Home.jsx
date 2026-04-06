import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";
import Agriculturists from "./Agriculturists";
import Footer from "./Footer";
import { useTranslation } from "react-i18next"; 

function Home() {
  const { t } = useTranslation(); 

  return (
    <>
      <div className="home-container mt-4">
        <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
            <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
          </div>

          <div className="carousel-inner">
  <div className="carousel-item active">
    <a href="/fertilizersPage">
      <img src="/farmer-fertilizer .png 
      " className="d-block mx-auto custom-carousel-img" alt="Slide 1" />
    </a>
  </div>

  <div className="carousel-item">
    <a href="/seedsPage">
      <img src="/seedsBaner.png"  className="d-block mx-auto custom-carousel-img" alt="Slide 2" />
    </a>
  </div>

  <div className="carousel-item">
    <a href="/farmingToolsPage">
      <img src="/tools baner.png" className="d-block mx-auto custom-carousel-img" alt="Slide 3" />
    </a>
  </div>

  <div className="carousel-item">
    <a href="/fertilizersPage">
      <img src="/ChatGPT.png" className="d-block mx-auto custom-carousel-img" alt="Slide 4" />
    </a>
  </div>

  <div className="carousel-item">
    <a href="/pesticides">
      <img src="/farmer-pestisides .png" className="d-block mx-auto custom-carousel-img" alt="Slide 5" />
    </a>
  </div>
</div>

          <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">{t("home.prev")}</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">{t("home.next")}</span>
          </button>
        </div>
      </div>

      <Container className="mt-5 text-center about-section">
        <h2>{t("home.about_title")}</h2>
        <p>{t("home.about_text")}</p>
      </Container>

      <Container className="mt-5 text-center">
        <h3 className="heading-title">{t("home.more_details")}</h3>
        <Row className="justify-content-center">
          <Col md={4} sm={6} className="d-flex justify-content-center">
            <Link to="/season-wise" className="card-link">
              <Card className="info-card">
                <Card.Img variant="top" src="/season.png" />
                <Card.Body>
                  <Card.Title>{t("home.season_wise")}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={4} sm={6} className="d-flex justify-content-center">
            <Link to="/soil-type" className="card-link">
              <Card className="info-card">
                <Card.Img variant="top" src="/soil.png" />
                <Card.Body>
                  <Card.Title>{t("home.soil_type")}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>

      <Agriculturists />
      <Footer />
    </>
  );
}

export default Home;
