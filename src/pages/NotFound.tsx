import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsExclamationTriangle } from 'react-icons/bs';
import '../styles/NotFound.css';

const NotFound: React.FC = () => {
  return (
    <Container className="not-found-container">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <div className="not-found-content">
            <BsExclamationTriangle className="not-found-icon" />
            <h1 className="not-found-title">404</h1>
            <h2 className="not-found-subtitle">Page Not Found</h2>
            <p className="not-found-message">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/">
              <Button variant="primary" size="lg" className="mt-3">
                Go Back to Home
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound; 