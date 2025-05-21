import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { BsCheckCircleFill } from 'react-icons/bs';
import '../styles/BankPayment.css';

// Mock vehicle data
const vehicleData = {
  1: {
    id: 1,
    registrationNumber: 'BA 1 CH 2022',
    type: 'Car',
    model: 'Hyundai i10',
    make: 'Hyundai',
    year: 2020,
    lastPaid: '2023-03-15',
    nextDue: '2024-03-15',
    status: 'paid',
    amount: 8000
  },
  2: {
    id: 2,
    registrationNumber: 'BA 2 JA 4456',
    type: 'Motorcycle',
    model: 'Honda CB Shine',
    make: 'Honda',
    year: 2019,
    lastPaid: '2022-05-10',
    nextDue: '2023-05-10',
    status: 'overdue',
    amount: 3500
  }
};

const BankPayment: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const [showSuccess, setShowSuccess] = React.useState(false);
  
  // Get vehicle data
  const vehicle = vehicleId ? vehicleData[vehicleId as unknown as keyof typeof vehicleData] : null;
  
  if (!vehicle) {
    return (
      <Container className="page-container">
        <Alert variant="danger">
          Vehicle not found. <Link to="/dashboard">Return to Dashboard</Link>
        </Alert>
      </Container>
    );
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };
  
  if (showSuccess) {
    return (
      <Container className="page-container">
        <div className="mb-4">
          <Link to="/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>
        </div>
        
        <Card className="success-card">
          <Card.Body className="text-center">
            <div className="success-icon">
              <BsCheckCircleFill />
            </div>
            <h2>Payment Successful!</h2>
            <p>Your payment for {vehicle.registrationNumber} has been processed successfully.</p>
            <p>Receipt Number: REC-{Date.now().toString().substring(6)}</p>
            <p>Amount Paid: NPR {vehicle.amount.toLocaleString()}</p>
            <p className="mb-4">Date: {new Date().toLocaleDateString()}</p>
            <Link to="/dashboard" className="btn btn-primary">
              Return to Dashboard
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
  
  return (
    <Container className="page-container">
      <div className="mb-4">
        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>
      </div>
      
      <h2 className="page-title mb-4">Bank Payment</h2>
      
      <Row>
        <Col lg={5} md={6} className="mb-4">
          <Card>
            <Card.Body>
              <h4 className="mb-3">Vehicle Details</h4>
              <div className="vehicle-details">
                <div className="detail-row">
                  <span className="detail-label">Registration Number:</span>
                  <span className="detail-value">{vehicle.registrationNumber}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Vehicle:</span>
                  <span className="detail-value">{vehicle.make} {vehicle.model} ({vehicle.year})</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{vehicle.type}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Amount Due:</span>
                  <span className="detail-value highlight">NPR {vehicle.amount.toLocaleString()}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={7} md={6}>
          <Card>
            <Card.Body>
              <h4 className="mb-3">Payment Information</h4>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Your Bank</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter your bank name"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter your account number"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Account Holder Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter name on account"
                    required
                  />
                </Form.Group>
                
                <div className="payment-info mb-4 mt-4">
                  <h5>Payment Details</h5>
                  <div className="detail-row">
                    <span className="detail-label">Amount:</span>
                    <span className="detail-value">NPR {vehicle.amount.toLocaleString()}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Reference:</span>
                    <span className="detail-value">{vehicle.registrationNumber}</span>
                  </div>
                  
                  <Alert variant="info" className="mt-3 mb-0">
                    <strong>Important:</strong> Please use your vehicle registration number
                    as payment reference.
                  </Alert>
                </div>
                
                <Button variant="primary" type="submit" className="w-100">
                  Complete Payment
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BankPayment; 