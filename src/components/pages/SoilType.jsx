import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./SoilType.css"; // Importing CSS

const soilTypes = [
  {
    name: "Alluvial Soil",
    description: "Most fertile soil found in river plains, suitable for crops like wheat, rice, and sugarcane.",
    examples: "Wheat, Rice, Sugarcane, Pulses",
    img: "alluvial.jpeg"
  },
  {
    name: "Black Soil",
    description: "Rich in clay and retains moisture, ideal for cotton and soybean cultivation.",
    examples: "Cotton, Soybean, Sugarcane, Millets",
    img: "black.jpeg"
  },
  {
    name: "Red Soil",
    description: "Iron-rich soil found in dry regions, supports crops like wheat, rice, and pulses.",
    examples: "Wheat, Rice, Groundnut, Millets",
    img: "red.jpeg"
  },
  {
    name: "Laterite Soil",
    description: "Rich in iron and aluminum, good for tea, coffee, and cashew nuts.",
    examples: "Tea, Coffee, Cashew, Rubber",
    img: "laterite.jpeg"
  },
  {
    name: "Desert Soil",
    description: "Sandy soil with low organic content, suitable for date palm and millets.",
    examples: "Date Palm, Millets, Barley",
    img: "desert.jpeg"
  },
  {
    name: "Forest Soil",
    description: "Found in forested areas, rich in humus and nutrients, supports tea and spices.",
    examples: "Tea, Spices, Fruits",
    img: "forest.jpeg"
  },
  {
    name: "Peaty & Saline Soil",
    description: "Highly organic and saline in nature, used for rice and coconut farming.",
    examples: "Rice, Coconut, Jute",
    img: "peaty.jpeg"
  }
];

const SoilType = () => {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Types of Soil in India</h2>
      <Row className="justify-content-center align-items-start">
        {soilTypes.map((soil, index) => (
          <Col md={4} sm={6} xs={12} className="mb-4" key={index}>
            <Card className="shadow soil-card">
              <Card.Img variant="top" src={soil.img} alt={soil.name} />
              <Card.Body>
                <Card.Title>{soil.name}</Card.Title>
                <Card.Text>{soil.description}</Card.Text>
                <Card.Text><strong>Examples:</strong> {soil.examples}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SoilType;
