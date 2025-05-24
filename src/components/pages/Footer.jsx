import React from 'react';
import './Footer.css'; // Create and link this CSS file

const Footer = () => {
  return (
    <footer className="footer text-light py-5">
      <div className="container">
        <div className="row">

          {/* ABOUT */}
          <div className="col-6 col-md-2">
            <h6>ABOUT</h6>
            <ul className="list-unstyled small">
              <li><a href="About">About Us</a></li>
              <li><a href="Crop">Crop</a></li>
              <li><a href="Purchase">Purchase</a></li>
              <li><a href="Blogs">Blogs</a></li>
              <li><a href="Contact">Contact Us</a></li>
            </ul>
          </div>

          {/* HELP */}
          <div className="col-6 col-md-2">
            <h6>HELP</h6>
            <ul className="list-unstyled small">
              <li><a href="#">Payments</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Cancellation & Returns</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          {/* CONSUMER POLICY */}
          <div className="col-6 col-md-3">
            <h6>CONSUMER POLICY</h6>
            <ul className="list-unstyled small">
              <li><a href="#">Cancellation & Returns</a></li>
              <li><a href="#">Terms Of Use</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </div>

          {/* Mail Us */}
          <div className="col-12 col-md-5 mt-4 mt-md-0">
            <h6>Mail Us:</h6>
            <address className="small">
              agriworld@123.com,<br />
           CSLAB sikar, Near by Sanjay Restaurant, Piprali Road Sikar, India<br />
            Telephone: <a href="tel:0123456789">01234567890</a> / <a href="tel:1234567890">01234567890</a>
          
            </address>

            <h6 className="mt-3">Social</h6>
            <div className="social-icons">
              <i className="bi bi-facebook me-3"></i>
              <i className="bi bi-twitter me-3"></i>
              <i className="bi bi-instagram me-3"></i>
              <i className="bi bi-youtube"></i>
            </div>
        
        </div>
          </div>
        </div>

  
       
      
    </footer>
  );
};

export default Footer;
