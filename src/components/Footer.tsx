import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-main">
        <Container>
          <Row>
            <Col md={6} className="footer-column">
              <h4 className="footer-logo">Vehicle Tax Renewal</h4>
              <p className="footer-description">
                Simplifying vehicle tax management with a modern, user-friendly platform. Stay compliant and avoid penalties with timely tax renewals.
              </p>
              <div className="footer-social">
                <a href="#" className="social-icon">F</a>
                <a href="#" className="social-icon">T</a>
                <a href="#" className="social-icon">I</a>
                <a href="#" className="social-icon">L</a>
              </div>
            </Col>
            
            <Col md={3} className="footer-column">
              <h5 className="footer-title">Quick Links</h5>
              <ul className="footer-links">
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/vehicles">My Vehicles</Link></li>
                <li><Link to="/tax-history">Tax History</Link></li>
                <li><Link to="/profile">My Profile</Link></li>
              </ul>
            </Col>
            
            <Col md={3} className="footer-column">
              <h5 className="footer-title">Information</h5>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </Col>
          </Row>
          
          <Row className="mt-4">
            <Col md={6} className="footer-column">
              <h5 className="footer-title">Newsletter</h5>
              <p className="footer-description">Subscribe to receive updates on tax regulations and new features.</p>
              <div className="footer-newsletter">
                <div className="d-flex">
                  <input type="email" className="form-control me-2" placeholder="Your email" />
                  <Button variant="primary" type="button">Subscribe</Button>
                </div>
              </div>
            </Col>
            
            <Col md={6} className="footer-column">
              <div className="footer-contact">
                <h5 className="footer-title">Contact Us</h5>
                <p className="mb-0">
                  Department of Transport Management<br />
                  Kathmandu, Nepal<br />
                  <strong>Email:</strong> support@vehicletax.gov.np<br />
                  <strong>Phone:</strong> +977-1-4XXXXXX
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
              <p className="mb-0">
                &copy; {currentYear} Vehicle Tax Renewal System. All rights reserved.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <div className="footer-bottom-links">
                <Link to="/privacy-policy">Privacy</Link>
                <Link to="/terms">Terms</Link>
                <Link to="/sitemap">Sitemap</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer; 