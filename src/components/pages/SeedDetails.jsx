
import React from "react";
import { useParams } from "react-router-dom";

// Seed data (moved inside the component)
const seedData = [
  {
    id: "cucumber-seeds",
    name: "Cucumber Seeds",
    brand: "Sagar Seeds",
    price: "10.99",
    description: "Premium quality cucumber seeds for a healthy and high-yield crop.",
    image: "anar.jpeg",
  },
  {
    id: "garden-vegetable-seed",
    name: "Garden Vegetable Seed",
    brand: "IFFDC",
    price: "10.99",
    description: "High-quality vegetable seeds for an organic garden.",
    image: "anar.jpeg",
  },
  {
    id: "bio-seeds",
    name: "Bio Seeds",
    brand: "ABS",
    price: "10.99",
    description: "Eco-friendly bio seeds for sustainable farming.",
    image: "anar.jpeg",
  },
];

const SeedDetails = () => {
  const { seedId } = useParams();
  const seed = seedData.find((item) => item.id === seedId);

  if (!seed) {
    return <h2 className="text-center">Seed not found</h2>;
  }

  return (
    <div className="container mt-5">
    <h2>seedsPage</h2>
      <div className="row">
        <div className="col-md-6">
          <img src={seed.image} alt={seed.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{seed.name}</h2>
          <h4>Brand: {seed.brand}</h4>
          <h5>Price: ${seed.price}</h5>
          <p>{seed.description}</p>
          <button className="btn btn-success">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default SeedDetails;
