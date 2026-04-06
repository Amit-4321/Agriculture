import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./About.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const teamMembers = [
  { name: "Rahul Sharma", role: "Founder & CEO", img: "/amar.jpeg" },
  { name: "Pooja Verma", role: "Agriculture Expert", img: "/pooja.jpeg" },
  { name: "Amit Singh", role: "Technology Lead", img: "/amit.jpeg" },
];

const testimonials = [
  { text: "This platform helped me increase my crop yield by 20%!", author: "Ramesh Kumar, Punjab" },
  { text: "Weather updates are super accurate, saved my crops multiple times.", author: "Sita Devi, Bihar" },
  { text: "I found the best market prices for my crops, boosting my profits!", author: "Vikram Singh, Haryana" },
];

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content text-center">
            <h1 className="animate__animated animate__fadeInDown">{t("about.hero_title")}</h1>
            <p className="animate__animated animate__fadeInUp animate__delay-1s">{t("about.hero_subtitle")}</p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        {/* Mission & Vision Section */}
        <Row className="mission-vision">
          <Col md={6} className="mission">
            <h2>{t("about.mission_title")}</h2>
            <p>{t("about.mission_text")}</p>
          </Col>
          <Col md={6} className="vision">
            <h2>{t("about.vision_title")}</h2>
            <p>{t("about.vision_text")}</p>
          </Col>
        </Row>

        {/* Why Choose Us */}
        <h2 className="text-center mt-5">{t("about.why_choose_us")}</h2>
        <Row className="why-choose-us">
          <Col md={4}>
            <Card className="feature-card">
              <i className="fas fa-cloud-sun-rain"></i>
              <Card.Body>
                <Card.Title>{t("about.weather_feature")}</Card.Title>
                <Card.Text>{t("about.weather_desc")}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Link to="/market-price" className="text-decoration-none">
              <Card className="feature-card hover-effect">
                <i className="fas fa-chart-line"></i>
                <Card.Body>
                  <Card.Title>{t("about.market_feature")}</Card.Title>
                  <Card.Text>{t("about.market_desc")}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={4}>
            <Card className="feature-card">
              <i className="fas fa-users"></i>
              <Card.Body>
                <Card.Title>{t("about.expert_feature")}</Card.Title>
                <Card.Text>{t("about.expert_desc")}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Team Section */}
        <h2 className="text-center mt-5">{t("about.team_title")}</h2>
        <Row className="team-section">
          {teamMembers.map((member, index) => (
            <Col md={4} key={index}>
              <Card className="team-card">
                <div className="team-card-img-container">
                  <img src={member.img} alt={member.name} className="team-img" />
                </div>
                <Card.Body>
                <Card.Title>{t(`about.team.${index}.name`)}</Card.Title>
                <Card.Text>{t(`about.team.${index}.role`)}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Testimonials */}
        <h2 className="text-center mt-5">{t("about.testimonial_title")}</h2>
        <div className="testimonials-slider">
        {t("about.testimonials", { returnObjects: true }).map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p>"{testimonial.text}"</p>
              <h5>- {testimonial.author}</h5>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
