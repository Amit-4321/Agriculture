import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import BuyNowModal from "./BuyNowModal";
import "./Pesticides.css";

const Pesticides = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const pesticidesData = t("pesticides.products", { returnObjects: true });

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowBuyNowModal(true);
  };

  const handleConfirmPurchase = () => {
    setShowBuyNowModal(false);
    alert(`${selectedProduct.name} ${t("pesticides.addedToCart")}`);
  };

  const filteredPesticides = pesticidesData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="pesticides-container">
      <h2 className="section-title">{t("pesticides.title")}</h2>

      <Form className="mb-4 text-center">
        <Form.Control
          type="text"
          placeholder={t("pesticides.searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-50 mx-auto"
        />
      </Form>

      <Row className="justify-content-center">
        {filteredPesticides.length > 0 ? (
          filteredPesticides.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="pesticide-card">
                <div className="image-container">
                  <Card.Img variant="top" src={item.image} className="product-image" />
                </div>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text className="price">{item.price}</Card.Text>
                  <Button
                    className="buy-now-btn"
                    onClick={() => handleBuyNow(item)}
                  >
                    {t("pesticides.buttons.buyNow")}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">{t("pesticides.noResults")}</p>
        )}
      </Row>

      <BuyNowModal
        show={showBuyNowModal}
        onClose={() => setShowBuyNowModal(false)}
        product={selectedProduct}
        onConfirm={handleConfirmPurchase}
        t={t}
      />
    </Container>
  );
};

export default Pesticides;
