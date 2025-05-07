import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container text-md-left">
        <div className="row">

          {/* About */}
          <div className="col-md-4 col-lg-3 col-xl-4 mb-4">
            <h5 className="text-uppercase mb-4 font-weight-bold">Reliable Pest Control</h5>
            <p>
              We provide trusted and effective pest control solutions to keep your home and business safe from pests. Professional, eco-friendly treatments for all your pest-related needs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mb-4">
            <h5 className="text-uppercase mb-4 font-weight-bold">Quick Links</h5>
            <p><a href="#" className="text-white text-decoration-none">Home</a></p>
            <p><a href="#" className="text-white text-decoration-none">Services</a></p>
          
            <p><a href="#" className="text-white text-decoration-none">Contact Us</a></p>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 col-lg-4 col-xl-3 mb-4">
            <h5 className="text-uppercase mb-4 font-weight-bold">Contact</h5>
            <p><i className="fas fa-home me-2"></i> Chennai</p>
            <p><i className="fas fa-envelope me-2"></i> contact@pestcontrol.com</p>
            <p><i className="fas fa-phone me-2"></i> +91 9876543210</p>
          </div>

          {/* Social Media */}
          <div className="col-md-3 col-lg-3 col-xl-3 mb-4">
            <h5 className="text-uppercase mb-4 font-weight-bold">Follow Us</h5>
            <a href="#" className="text-white me-3 fs-5"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-white me-3 fs-5"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-white me-3 fs-5"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-white fs-5"><i className="fab fa-linkedin-in"></i></a>
          </div>

        </div>

        <hr className="mb-4 mt-4" style={{ borderColor: '#444' }} />

        <div className="row align-items-center">
          <div className="col-12 text-center">
            <p className="mb-0">&copy; 2025 Reliable Pest Control. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
