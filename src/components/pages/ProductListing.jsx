import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProductListing.css"; // Styling ke liye

const products = [
  {
    id: 1,
    name: "Super 6 Bajra",
    price: "$240",
    rating: "⭐⭐⭐⭐",
    image: "millet.jpeg", // Replace with actual product images
  },
  {
    id: 2,
    name: "Organic Wheat Seeds",
    price: "$180",
    rating: "⭐⭐⭐⭐⭐",
    image: "wheat.jpeg",
  },
  {
    id: 3,
    name: "Premium Rice Seeds",
    price: "$220",
    rating: "⭐⭐⭐⭐",
    image: "rice.jpeg",
  },
  {
    id: 4,
    name: "Hybrid Maize Seeds",
    price: "$260",
    rating: "⭐⭐⭐⭐⭐",
    image: "Maize.jpeg",
  },
];

const ProductListing = () => {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Our Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="product-card">
              <Card.Img variant="top" src={product.image} className="product-img" />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  <strong>{product.price}</strong> <br />
                  {product.rating}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="success">Add to Cart</Button>
                  <Link to={`/product/${product.id}`}>
                    <Button variant="primary">Buy Now</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductListing;
