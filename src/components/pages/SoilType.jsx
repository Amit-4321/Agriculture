import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./SoilType.css";

const SoilType = () => {
  const { t } = useTranslation();
  
  // Get all soil data from translations
  const soilTypes = t("soil.types", { returnObjects: true });

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">{t("soil.heading")}</h2>
      <Row className="justify-content-center align-items-start">
        {soilTypes.map((soil, index) => (
          <Col md={4} sm={6} xs={12} className="mb-4" key={index}>
            <Card className="shadow soil-card">
              <Card.Img variant="top" src={soil.img} alt={soil.name} />
              <Card.Body>
                <Card.Title>{soil.name}</Card.Title>
                <Card.Text>{soil.description}</Card.Text>
                <Card.Text>
                  <strong>{t("soil.examplesLabel")}</strong> {soil.examples}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SoilType;