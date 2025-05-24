import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Ratings.css';

const Ratings = () => {
  const { filterRating } = useParams();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([
    { id: 1, name: 'John Doe', rating: 5, comment: 'Excellent product! Fast delivery.', date: '2023-05-15' },
    { id: 2, name: 'Jane Smith', rating: 4, comment: 'Good quality, would recommend.', date: '2023-06-02' },
    { id: 3, name: 'Ravi Singh', rating: 3, comment: 'Average experience.', date: '2023-08-12' },
    { id: 4, name: 'Meena Kumari', rating: 5, comment: 'Loved it!', date: '2023-09-01' },
  ]);

  const products = [
    { id: 1, name: 'Organic Fertilizer', rating: 5 },
    { id: 2, name: 'Natural Pesticide', rating: 4 },
    { id: 3, name: 'Hybrid Seeds', rating: 3 },
    { id: 4, name: 'Soil Conditioner', rating: 4 },
    { id: 5, name: 'Irrigation Kit', rating: 5 },
  ];

  const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleStarFilter = (star) => {
    if (parseFloat(filterRating) === star) {
      navigate('/ratings');
    } else {
      navigate(`/ratings/${star}`);
    }
  };

  const StarRating = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= (hoverRating || rating) ? 'star-filled' : 'star-empty'}`}
            onClick={() => {
              setRating(star);
              setErrors({ ...errors, rating: null });
            }}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            {star <= (hoverRating || rating) ? "★" : "☆"}
          </span>
        ))}
        {errors.rating && <div className="invalid-feedback">{errors.rating}</div>}
      </div>
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newReview.name.trim()) newErrors.name = "Please enter your name";
    if (newReview.rating === 0) newErrors.rating = "Please select a rating";
    if (!newReview.comment.trim()) newErrors.comment = "Please write your review";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const review = {
        id: reviews.length + 1,
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      };

      setReviews([...reviews, review]);
      setNewReview({ name: '', rating: 0, comment: '' });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const filteredReviews = filterRating
    ? reviews.filter(r => r.rating === parseFloat(filterRating))
    : reviews;

  return (
    <Container className="ratings-container">
      <div className="ratings-header">
        <h2>🌿 Product Ratings</h2>
      </div>



      {/* ⭐ Filter by rating */}
      <div className="star-filter mb-4 text-center">
        <strong className="me-2">Filter by Rating:</strong>
        {[5, 4, 3, 2, 1].map((star) => (
          <span
            key={star}
            className={`filter-star ${parseFloat(filterRating) === star ? 'active' : ''}`}
            onClick={() => handleStarFilter(star)}
          >
            {'★'.repeat(star)}{'☆'.repeat(5 - star)}
          </span>
        ))}
      </div>

      {/* ⭐ Average rating */}
      <Card className="average-rating-card text-center">
        <Card.Body>
          <h5>Average Rating</h5>
          <div className="average-rating-value text-warning">
            {averageRating}/5
          </div>
          <div className="static-stars">
            {'★'.repeat(Math.round(averageRating))}
            {'☆'.repeat(5 - Math.round(averageRating))}
          </div>
          <small className="text-muted">{reviews.length} total reviews</small>
        </Card.Body>
      </Card>

      {/* 🛒 Filtered products section */}
      {filterRating && (
        <div className="filtered-products mb-4">
          <h5>🛒 Products with {filterRating}-Star Rating:</h5>
          <Row>
            {products.filter(p => p.rating === parseFloat(filterRating)).map((product) => (
              <Col key={product.id} md={4} className="mb-3">
                <Card className="product-card">
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <div className="star-rating">
                      {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                    </div>
                    <Button variant="success" size="sm">Buy Now</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* 🔍 Filter notice */}
      {filterRating && (
        <Alert variant="info" className="mt-3">
          Showing only reviews with <strong>{filterRating}</strong> stars
        </Alert>
      )}

      {/* 📝 Reviews */}
      <Row className="mb-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <Col md={6} key={review.id} className="mb-3">
              <Card className="review-card">
                <div className="review-header">
                  <h5 className="reviewer-name">{review.name}</h5>
                  <small className="review-date">{review.date}</small>
                </div>
                <Card.Body className="review-body">
                  <div className="star-rating">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="warning" className="mt-4">
              No reviews found for {filterRating} star rating.
            </Alert>
          </Col>
        )}
      </Row>

      {/* ➕ Add new review */}
      <Card className="review-form-card">
        <Card.Body>
          <Card.Title className="review-form-title">Add Your Review</Card.Title>

          {success && <Alert variant="success">Thank you! Your review has been submitted.</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={newReview.name}
                onChange={(e) => {
                  setNewReview({ ...newReview, name: e.target.value });
                  setErrors({ ...errors, name: null });
                }}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating *</Form.Label>
              <StarRating
                rating={newReview.rating}
                setRating={(rating) => setNewReview({ ...newReview, rating })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Review *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Share your experience..."
                value={newReview.comment}
                onChange={(e) => {
                  setNewReview({ ...newReview, comment: e.target.value });
                  setErrors({ ...errors, comment: null });
                }}
                isInvalid={!!errors.comment}
              />
              <Form.Control.Feedback type="invalid">
                {errors.comment}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit Review
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Ratings;
