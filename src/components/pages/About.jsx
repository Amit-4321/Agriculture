import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./About.css";
import Footer from "./Footer";
import MarketPrice from "./MarketPrice";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";


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
  

  return (
    <div className="about-page">
      {/* Hero Section */}
       <div className="hero-section">
       <div className="hero-overlay">
        <div className="hero-content text-center">
          <h1 className="animate__animated animate__fadeInDown">Empowering Farmers, Revolutionizing Agriculture</h1>
          <p  className="animate__animated animate__fadeInUp animate__delay-1s">Providing real-time insights, expert guidance, and modern solutions.</p>
        </div>
      </div>
      </div> 

      <div className="mt-5">
        {/* Mission & Vision Section */}
        <Row className="mission-vision">
          <Col md={6} className="mission">
            <h2>Our Mission</h2>
            <p>Our mission is to empower farmers with cutting-edge technology, real-time insights, and expert guidance. We aim to revolutionize agriculture by providing innovative solutions that enhance productivity, sustainability, and profitability</p>

          </Col>
          <Col md={6} className="vision">
            <h2>Our Vision</h2>
            <p>We envision a future where every farmer has access to the best resources, knowledge, and market opportunities. By bridging the gap between tradition and technology, we strive to create a smarter, more connected, and more resilient agricultural ecosystem.</p>
          </Col>
        </Row>

        {/* Why Choose Us */}
        <h2 className="text-center mt-5">Why Choose Us?</h2>
        <Row className="why-choose-us">
          <Col md={4}>
            <Card className="feature-card">
              <i className="fas fa-cloud-sun-rain"></i>
              <Card.Body>
                <Card.Title>Real-Time Weather Updates</Card.Title>
                <Card.Text>Accurate forecasts to plan your farming efficiently.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

           <Col md={4}>
  <Link to="/market-price" className="text-decoration-none">
    <Card className="feature-card hover-effect">
      <i className="fas fa-chart-line"></i>
      <Card.Body>
        <Card.Title>Market Price Insights</Card.Title>
        <Card.Text>Stay updated with real-time crop prices.</Card.Text>
      </Card.Body>
    </Card>
  </Link>
</Col>

          <Col md={4}>
            <Card className="feature-card">
              <i className="fas fa-users"></i>
              <Card.Body>
                <Card.Title>Expert Agriculturists</Card.Title>
                <Card.Text>Connect with professionals for guidance.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

{/* <div className=" mt-5">
  <h3 className="text-center mb-3">Live Market Price</h3>
  <MarketPrice/>
</div> */}
        {/* Team Section */}
        <h2 className="text-center mt-5">Meet Our Team</h2>
        <Row className="team-section">
          {teamMembers.map((member, index) => (
            <Col md={4} key={index}>
              <Card className="team-card">
                <div className="team-card-img-container">
                  <img  src={member.img} alt={member.name} className="team-img" />
                </div>
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Text>{member.role}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* What Farmers Say (Updated) */}
        <h2 className="text-center mt-5">What Farmers Say</h2>
        <div className="testimonials-slider">
          {testimonials.map((testimonial, index) => (
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
