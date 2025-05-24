import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CropPage.css'
import Footer from "./Footer";

const cropCategories = [
  {
    title: 'Field Crops',
    crops: [
      { 
        src: 'rice.jpeg', 
        name: "Rice", 
        description: [
          "Sowing Months: June-July (Kharif season)",
          "Harvesting: October-November",
          "Soil Type: Clay-loam with good water retention (pH 5.5-6.5)",
          "Water Requirements: 1500-2500 mm total, Continuous flooding (5-10 cm standing water)",
          "Fertilizers (per acre): N: 80-120 kg, P: 40-60 kg, K: 40-60 kg, Zinc sulfate: 25 kg",
          "Market Price (2024): ₹1,800-₹2,500 per quintal"
        ] 
      },
      { 
        src: 'wheat.jpeg', 
        name: "Wheat", 
        description: [
          "Sowing Months: November (Rabi season)",
          "Harvesting: March-April",
          "Soil Type: Well-drained loam (pH 6.0-7.5)",
          "Water Requirements: 4-6 irrigations (500-700 mm total)",
          "Fertilizers (per acre): N: 50-60 kg, P: 25-30 kg, K: 20-25 kg",
          "Market Price: ₹2,100-₹2,600 per quintal"
        ] 
      },
      { 
        src: 'Maize.jpeg', 
        name: "Maize", 
        description: [
          "Sowing Months: Kharif: June-July, Rabi: October-November (in South India)",
          "Harvesting: 90-100 days after sowing",
          "Soil Type: Well-drained sandy loam (pH 5.5-7.0)",
          "Water Requirements: 500-800 mm total",
          "Fertilizers (per acre): N: 60-80 kg, P: 30-40 kg, K: 20-30 kg",
          "Market Price: ₹1,700-₹2,200 per quintal"
        ] 
      },
      { 
        src: 'sugarcane.jpeg', 
        name: "Sugarcane", 
        description: [
          "Planting Months: February-March or October-November",
          "Harvesting: 12-18 months after planting",
          "Soil Type: Deep fertile loams (pH 6.5-7.5)",
          "Water Requirements: 2000-2500 mm annually",
          "Fertilizers (per acre): N: 150-200 kg, P: 60-80 kg, K: 80-100 kg",
          "Market Price: ₹310-₹340 per quintal"
        ] 
      },
      { 
        src: 'soyabean.jpeg', 
        name: "Soyabean", 
        description: [
          "Sowing Months: June-July (with monsoon onset)",
          "Harvesting: September-October",
          "Soil Type: Well-drained black soil (pH 6.0-7.5)",
          "Water Requirements: 450-700 mm total",
          "Fertilizers (per acre): N: 20-25 kg, P: 60-80 kg, K: 40-50 kg",
          "Market Price: ₹3,500-₹4,500 per quintal"
        ] 
      },
      { 
        src: 'joh.jpeg', 
        name: "Jowar", 
        description: [
          "Sowing Months: Kharif: June-July, Rabi: September-October",
          "Harvesting: 100-120 days after sowing",
          "Soil Type: Red, black or sandy loam (pH 6.0-8.0)",
          "Water Requirements: 400-600 mm (Drought resistant)",
          "Fertilizers (per acre): N: 40-60 kg, P: 20-30 kg, K: 20-25 kg",
          "Market Price: ₹2,000-₹2,800 per quintal"
        ] 
      },
      { 
        src: 'millet.jpeg', 
        name: "Millet", 
        description: [
          "Sowing Months: July-August",
          "Harvesting: October-November",
          "Soil Type: Light sandy soils (pH 6.5-7.5)",
          "Water Requirements: 350-500 mm (Highly drought resistant)",
          "Fertilizers (per acre): N: 30-40 kg, P: 20-25 kg, K: 15-20 kg",
          "Market Price: ₹2,500-₹3,500 per quintal"
        ] 
      },
      {
   src: 'mung.jpeg',
  name: "Moong (Green Gram)",
  description: [
    "Sowing: June-July (Kharif) or March-April (Zaid)",
    "Harvest: 60-75 days after sowing",
    "Soil: Well-drained loam (pH 6.5-7.5)",
    "Water: 2-3 irrigations (350-400mm total)",
    "Fertilizers (per acre): N:15kg, P:30kg, K:20kg",
    "Yield: 8-12 quintals/acre",
    "Price: ₹6,000-₹8,000 per quintal"
   
  ]
},
      { 
        src: 'sarso.jpeg', 
        name: "Sarso", 
        description: [
          "Sowing Months: October-November",
          "Harvesting: February-March",
          "Soil Type: Light loam to clay loam (pH 7.0-8.5)",
          "Water Requirements: 300-400 mm total",
          "Fertilizers (per acre): N: 40-50 kg, P: 20-25 kg, K: 15-20 kg, Sulfur: 20 kg",
          "Market Price: ₹5,000-₹6,500 per quintal"
        ] 
      },
      { 
        src: 'coffee-beans.jpeg', 
        name: "Coffee-Beans", 
        description: [
          "Planting Months: June-September (with rains)",
          "First Harvest: 3-4 years after planting",
          "Soil Type: Volcanic red soil (pH 4.5-6.0)",
          "Water Requirements: 1500-2500 mm annually",
          "Fertilizers (per acre): N: 80-100 kg, P: 40-50 kg, K: 100-120 kg",
          "Market Price: Arabica: ₹8,000-₹12,000, Robusta: ₹5,000-₹8,000 per quintal"
        ] 
      }
    ]
  },
  {
    title: 'Fruits',
    crops: [
      { 
        src: 'apple.jpeg', 
        name: "Apple", 
        description: [
          "Planting Season: January-February (in plains), March-April (hills)",
          "Harvesting: July-November (varies by variety)",
          "Soil Type: Well-drained loamy (pH 5.5-6.5)",
          "Water Requirements: 100-125 cm annually",
          "Fertilizers (per tree): N: 500-1000g, P: 300-500g, K: 500-800g",
          "Market Price: ₹80-₹200 per kg"
        ] 
      },
      { 
        src: 'banana.jpeg', 
        name: "Banana", 
        description: [
          "Planting Season: June-July or February-March",
          "Harvesting: 12-15 months after planting",
          "Soil Type: Deep, rich loamy (pH 6.0-7.5)",
          "Water Requirements: 2000-2500 mm annually",
          "Fertilizers (per plant): N: 200-250g, P: 60-100g, K: 300-400g",
          "Market Price: ₹20-₹60 per kg"
        ] 
      },
      { 
        src: 'grapes.jpeg', 
        name: "Grapes", 
        description: [
          "Planting Season: February-March (in North India)",
          "Harvesting: May-June (summer crop), October-November (winter crop)",
          "Soil Type: Well-drained sandy loam (pH 6.5-7.5)",
          "Water Requirements: 800-1200 mm annually",
          "Fertilizers (per acre): N: 100-120kg, P: 50-60kg, K: 100-120kg",
          "Market Price: ₹40-₹150 per kg"
        ] 
      },
      { 
        src: 'strawberry.jpeg', 
        name: "Strawberry", 
        description: [
          "Planting Season: September-October (in North India)",
          "Harvesting: January-March",
          "Soil Type: Sandy loam (pH 5.5-6.5)",
          "Water Requirements: 500-700 mm (drip irrigation preferred)",
          "Fertilizers (per acre): N: 50kg, P: 25kg, K: 25kg",
          "Market Price: ₹200-₹500 per kg"
        ] 
      },
      { 
        src: 'orange.jpeg', 
        name: "Orange", 
        description: [
          "Planting Season: June-August (with monsoon)",
          "Harvesting: December-February",
          "Soil Type: Deep, well-drained loam (pH 6.0-7.5)",
          "Water Requirements: 1000-1200 mm annually",
          "Fertilizers (per tree): N: 500-600g, P: 200-300g, K: 300-500g",
          "Market Price: ₹30-₹80 per kg"
        ] 
      },
      { 
        src: 'dates.jpeg', 
        name: "Dates", 
        description: [
          "Planting Season: June-July",
          "First Harvest: 4-5 years after planting",
          "Soil Type: Sandy loam (pH 8.0-10.0)",
          "Water Requirements: 1500-2000 mm (drought tolerant after establishment)",
          "Fertilizers (per tree): N: 500g, P: 200g, K: 500g",
          "Market Price: ₹100-₹300 per kg"
        ] 
      },
      { 
        src: 'pineapple.jpeg', 
        name: "Pineapple", 
        description: [
          "Planting Season: Throughout year (best in July-August)",
          "Harvesting: 15-18 months after planting",
          "Soil Type: Acidic sandy loam (pH 4.5-6.0)",
          "Water Requirements: 1000-1500 mm annually",
          "Fertilizers (per acre): N: 16kg, P: 4kg, K: 16kg",
          "Market Price: ₹20-₹60 per kg"
        ] 
      },
      { 
        src: 'mango.jpeg', 
        name: "Mango", 
        description: [
          "Planting Season: July-August (monsoon season)",
          "First Harvest: 4-5 years after planting",
          "Soil Type: Deep, well-drained loam (pH 5.5-7.5)",
          "Water Requirements: 900-1200 mm annually",
          "Fertilizers (per tree): N: 1kg, P: 500g, K: 1kg",
          "Market Price: ₹30-₹150 per kg (varies by variety)"
        ] 
      },
      { 
        src: 'chiku.jpeg', 
        name: "Chiku", 
        description: [
          "Planting Season: June-September",
          "First Harvest: 3-4 years after planting",
          "Soil Type: Deep, well-drained sandy loam (pH 6.0-8.0)",
          "Water Requirements: 1000-1500 mm annually",
          "Fertilizers (per tree): N: 500g, P: 250g, K: 500g",
          "Market Price: ₹40-₹100 per kg"
        ] 
      },
      { 
        src: 'kiwi.jpeg', 
        name: "Kiwi", 
        description: [
          "Planting Season: December-January",
          "First Harvest: 4-5 years after planting",
          "Soil Type: Deep, well-drained loam (pH 5.0-6.5)",
          "Water Requirements: 1500-2000 mm annually",
          "Fertilizers (per vine): N: 500g, P: 300g, K: 800g",
          "Market Price: ₹150-₹400 per kg"
        ] 
      }
    ]
  },
  {
    title: 'Vegetables',
    crops: [
      { 
        src: 'Carrots.jpeg', 
        name: "Carrots", 
        description: [
          "Sowing Season: August-November",
          "Harvesting: 90-100 days after sowing",
          "Soil Type: Sandy loam (pH 6.0-7.0)",
          "Water Requirements: 400-500 mm (regular light irrigation)",
          "Fertilizers (per acre): N: 50kg, P: 25kg, K: 50kg",
          "Market Price: ₹20-₹60 per kg"
        ] 
      },
      { 
        src: 'Broccoli.jpeg', 
        name: "Broccoli", 
        description: [
          "Sowing Season: September-November",
          "Harvesting: 90-100 days after transplanting",
          "Soil Type: Well-drained loam (pH 6.0-7.0)",
          "Water Requirements: 350-400 mm (drip irrigation preferred)",
          "Fertilizers (per acre): N: 80kg, P: 40kg, K: 40kg",
          "Market Price: ₹40-₹100 per kg"
        ] 
      },
      { 
        src: 'Spinach.jpeg', 
        name: "Spinach", 
        description: [
          "Sowing Season: September-November (winter crop)",
          "Harvesting: 30-45 days after sowing",
          "Soil Type: Rich, well-drained loam (pH 6.5-7.5)",
          "Water Requirements: 300-400 mm (frequent light irrigation)",
          "Fertilizers (per acre): N: 25kg, P: 10kg, K: 10kg",
          "Market Price: ₹20-₹50 per kg"
        ] 
      },
      { 
        src: 'kale.jpeg', 
        name: "Kale", 
        description: [
          "Sowing Season: September-October",
          "Harvesting: 50-60 days after sowing",
          "Soil Type: Well-drained loam (pH 6.0-7.5)",
          "Water Requirements: 350-450 mm",
          "Fertilizers (per acre): N: 60kg, P: 30kg, K: 30kg",
          "Market Price: ₹50-₹120 per kg"
        ] 
      },
      { 
        src: 'Peas.jpeg', 
        name: "Peas", 
        description: [
          "Sowing Season: October-November",
          "Harvesting: 90-100 days after sowing",
          "Soil Type: Well-drained loam (pH 6.0-7.5)",
          "Water Requirements: 400-500 mm",
          "Fertilizers (per acre): N: 20kg, P: 50kg, K: 20kg",
          "Market Price: ₹30-₹80 per kg"
        ] 
      },
      { 
        src: 'brussels-sprouts.jpeg', 
        name: "Brussels Sprouts", 
        description: [
          "Sowing Season: August-September",
          "Harvesting: 90-120 days after transplanting",
          "Soil Type: Rich, well-drained loam (pH 6.0-7.5)",
          "Water Requirements: 450-500 mm",
          "Fertilizers (per acre): N: 80kg, P: 40kg, K: 60kg",
          "Market Price: ₹80-₹150 per kg"
        ] 
      },
      { 
        src: 'onion.jpeg', 
        name: "Onion", 
        description: [
          "Sowing Season: October-November (rabi)",
          "Harvesting: 120-150 days after sowing",
          "Soil Type: Sandy loam (pH 6.0-7.0)",
          "Water Requirements: 450-500 mm",
          "Fertilizers (per acre): N: 60kg, P: 30kg, K: 30kg",
          "Market Price: ₹15-₹40 per kg"
        ] 
      },
      { 
        src: 'Cucumber.jpeg', 
        name: "Cucumber", 
        description: [
          "Sowing Season: February-March (summer), June-July (rainy)",
          "Harvesting: 50-70 days after sowing",
          "Soil Type: Well-drained loam (pH 6.0-7.0)",
          "Water Requirements: 500-600 mm",
          "Fertilizers (per acre): N: 40kg, P: 20kg, K: 20kg",
          "Market Price: ₹15-₹40 per kg"
        ] 
      },
      { 
        src: 'potato.jpeg', 
        name: "Potato", 
        description: [
          "Sowing Season: October-November (rabi)",
          "Harvesting: 90-110 days after sowing",
          "Soil Type: Well-drained sandy loam (pH 5.0-6.5)",
          "Water Requirements: 500-700 mm",
          "Fertilizers (per acre): N: 120kg, P: 60kg, K: 100kg",
          "Market Price: ₹10-₹30 per kg"
        ] 
      },
      { 
        src: 'tomato.jpeg', 
        name: "Tomato", 
        description: [
          "Sowing Season: June-July (kharif), October-November (rabi)",
          "Harvesting: 90-100 days after transplanting",
          "Soil Type: Well-drained loam (pH 6.0-7.0)",
          "Water Requirements: 600-800 mm",
          "Fertilizers (per acre): N: 80kg, P: 40kg, K: 40kg",
          "Market Price: ₹15-₹50 per kg"
        ] 
      }
    ]
  },
  {
    title: "Flowers",
    crops: [
      { 
        src: 'roses.jpeg', 
        name: "Rose", 
        description: [
          "Planting Season: October-November",
          "Flowering: Year-round in suitable climates",
          "Soil Type: Well-drained loam (pH 6.0-7.0)",
          "Water Requirements: 500-600 mm (drip irrigation preferred)",
          "Fertilizers (per acre): N: 150kg, P: 100kg, K: 150kg",
          "Market Price: ₹1-₹5 per flower (varies by variety)"
        ] 
      },
      { 
        src: 'Sunflowers .jpeg', 
        name: "Sunflower", 
        description: [
          "Sowing Season: June-July (kharif), February-March (spring)",
          "Flowering: 70-80 days after sowing",
          "Soil Type: Well-drained loam (pH 6.0-8.0)",
          "Water Requirements: 500-600 mm",
          "Fertilizers (per acre): N: 60kg, P: 30kg, K: 30kg",
          "Market Price: ₹10-₹30 per flower"
        ] 
      },
      { 
        src: 'tulips.jpeg', 
        name: "Tulips", 
        description: [
          "Planting Season: October-November (bulbs)",
          "Flowering: February-March",
          "Soil Type: Sandy loam (pH 6.0-7.0)",
          "Water Requirements: 300-400 mm",
          "Fertilizers (per acre): N: 50kg, P: 30kg, K: 40kg",
          "Market Price: ₹20-₹50 per flower"
        ] 
      },
      { 
        src: 'Marigolds .jpeg', 
        name: "Marigold", 
        description: [
          "Sowing Season: June-July (rainy season), September-October (winter)",
          "Flowering: 60-70 days after sowing",
          "Soil Type: Well-drained loam (pH 6.0-7.5)",
          "Water Requirements: 400-500 mm",
          "Fertilizers (per acre): N: 40kg, P: 20kg, K: 20kg",
          "Market Price: ₹50-₹150 per kg (flowers)"
        ] 
      },
      { 
        src: 'lotus.jpeg', 
        name: "Lotus", 
        description: [
          "Planting Season: June-July",
          "Flowering: August-October",
          "Soil Type: Clayey soil under 30-60cm water",
          "Water Requirements: Standing water required",
          "Fertilizers (per acre): Organic manure preferred",
          "Market Price: ₹10-₹30 per flower"
        ] 
      },
      { 
        src: 'daisy.jpeg', 
        name: "Daisy", 
        description: [
          "Sowing Season: September-October",
          "Flowering: 90-100 days after sowing",
          "Soil Type: Well-drained loam (pH 6.0-7.5)",
          "Water Requirements: 400-500 mm",
          "Fertilizers (per acre): N: 40kg, P: 20kg, K: 20kg",
          "Market Price: ₹1-₹5 per flower"
        ] 
      },
      { 
        src: 'Lilies.jpeg', 
        name: "Lilies", 
        description: [
          "Planting Season: October-November (bulbs)",
          "Flowering: March-April",
          "Soil Type: Well-drained loam (pH 6.0-6.5)",
          "Water Requirements: 400-500 mm",
          "Fertilizers (per acre): N: 60kg, P: 40kg, K: 40kg",
          "Market Price: ₹20-₹50 per flower"
        ] 
      },
      { 
        src: 'Orchids .jpeg', 
        name: "Orchids", 
        description: [
          "Planting Season: Year-round in controlled environments",
          "Flowering: Varies by species (typically 6-12 months after planting)",
          "Growing Medium: Special orchid mix (bark, moss, etc.)",
          "Water Requirements: High humidity, moderate watering",
          "Fertilizers: Special orchid fertilizer (weekly weakly)",
          "Market Price: ₹200-₹2000 per plant (varies by variety)"
        ] 
      },
      { 
        src: 'lavender.jpeg', 
        name: "Lavender", 
        description: [
          "Planting Season: October-November",
          "Flowering: April-June",
          "Soil Type: Well-drained sandy soil (pH 6.5-7.5)",
          "Water Requirements: 300-400 mm (drought tolerant)",
          "Fertilizers (per acre): N: 20kg, P: 15kg, K: 15kg",
          "Market Price: ₹500-₹1500 per kg (dried flowers)"
        ] 
      },
      { 
        src: 'jasmines.jpeg', 
        name: "Jasmines", 
        description: [
          "Planting Season: June-September",
          "Flowering: Year-round in tropical climates",
          "Soil Type: Well-drained loam (pH 6.5-7.5)",
          "Water Requirements: 500-600 mm",
          "Fertilizers (per acre): N: 100kg, P: 50kg, K: 50kg",
          "Market Price: ₹100-₹300 per kg (flowers)"
        ] 
      }
    ]
  }
];

function CropPage() {
  const [selectedCrop, setSelectedCrop] = useState(null);

  return (
    <>
      <div className="container text-center my-1" style={{backgroundColor:"#fff"}}>
        {cropCategories.map((category, index) => (
          <div key={index}>
            <h2 className="mb-5 mt-4 pt-5">{category.title}</h2>
            
            <div className="custom-card-row">
              {category.crops.map((crop, idx) => (
                <div key={idx} className="crop-card-custom" onClick={() => setSelectedCrop(crop)}>
                  <img
                    src={crop.src}
                    alt={crop.name}
                    className="img-fluid rounded-circle"
                    style={{ cursor: 'pointer' }}
                  />
                  <p className="crop-name">{crop.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Overlay Blur Effect */}
        {selectedCrop && <div className="overlay" onClick={() => setSelectedCrop(null)}></div>}
        
        {/* Crop Details Modal */}
        {selectedCrop && (
          <div className="crop-description">
            <h4>{selectedCrop.name}</h4>
            <ul className="text-left">
              {selectedCrop.description.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <button className="btn btn-danger" onClick={() => setSelectedCrop(null)}>Close</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default CropPage;