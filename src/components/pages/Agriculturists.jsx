import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Form, Button } from "react-bootstrap";
import './Agriculturist.css';

const agriculturists = [
  {
    name: "Radhika",
    location: "Hyderabad, India",
    specialization: "Crop Management",
    experience: "10 years",
    email: "agriculturist1@example.com",
    image: "/aradhya.jpeg",
  },
  {
    name: "Rohan",
    location: "Chennai, India",
    specialization: "Soil Science",
    experience: "8 years",
    email: "agriculturist2@example.com",
    image: "/rohan.jpeg",
  },
  {
    name: "Mukesh",
    location: "Guntur, India",
    specialization: "Soil Science",
    experience: "5 years",
    email: "agriculturist3@example.com",
    image: "/kimjong.jpeg",
  },
  {
    name: "Sonu",
    location: "Bangalore, India",
    specialization: "Horticulture",
    experience: "12 years",
    email: "agriculturist4@example.com",
    image: "/sonu.jpeg",
  },
  {
    name: "Raja",
    location: "Mumbai, India",
    specialization: "Organic Farming",
    experience: "7 years",
    email: "agriculturist5@example.com",
    image: "/ramu.jpg",
  },
  {
    name: "Santosh",
    location: "Delhi, India",
    specialization: "Irrigation",
    experience: "9 years",
    email: "agriculturist6@example.com",
    image: "/santosh.jpg",
  },
];

const Agriculturists = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    specialization: "",
    experience: "",
    email: "",
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Agriculturist Enrolled Successfully!");
    setFormData({ name: "", location: "", specialization: "", experience: "", email: "" });
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % (agriculturists.length - 3));
    }, 3000);

    return () => clearInterval(interval);
  }, [agriculturists.length]);

  // Update slider position
  useEffect(() => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0]?.offsetWidth || 0;
      sliderRef.current.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    }
  }, [currentSlide]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Meet Our Agriculturists</h2>
      
      {/* Slider Container */}
      <div className="slider-container">
        <div className="slider-track" ref={sliderRef}>
          {agriculturists.map((agri, index) => (
            <div key={index} className="slider-card">
              <Card className="agri-card text-center">
                <CardBody>
                  <img src={agri.image} alt={agri.name} className="agri-img" />
                  <h5 className="mt-2">{agri.name}</h5>
                  <p><strong>Location:</strong> {agri.location}</p>
                  <p><strong>Specialization:</strong> {agri.specialization}</p>
                  <p><strong>Experience:</strong> {agri.experience}</p>
                  <p>{agri.email}</p>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Enroll Form */}
      <div className="enroll-form mt-5">
        <h3 className="text-center text-success">Enroll New Agriculturist</h3>
        <Form onSubmit={handleSubmit} className="form-container">
          <Form.Group>
            <Form.Label>Full Name:</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Location:</Form.Label>
            <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Specialization:</Form.Label>
            <Form.Control type="text" name="specialization" value={formData.specialization} onChange={handleChange} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Experience (in years):</Form.Label>
            <Form.Control type="number" name="experience" value={formData.experience} onChange={handleChange} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>

          <Button variant="success" type="submit" className="mt-3 w-100">Enroll</Button>
        </Form>
      </div>
    </div>
  );
};

export default Agriculturists;