import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Container, Card, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import '../styles/Payment.css';

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

interface PaymentProps {
  vehicle?: {
    id: number;
    registrationNumber: string;
    amount: number;
  };
  onSuccess?: () => void;
}

const Payment: React.FC<PaymentProps> = ({ vehicle: propVehicle, onSuccess }) => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const [redirectToDashboard, setRedirectToDashboard] = React.useState(false);
  
  // Get vehicle data from props or URL parameter
  const vehicle = propVehicle || (vehicleId ? vehicleData[vehicleId as unknown as keyof typeof vehicleData] : null);
  
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [cardholderName, setCardholderName] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  // Handle case when vehicle is not found
  if (!vehicle) {
    return (
      <Container className="payment-container">
        <Alert variant="danger">
          Vehicle not found. <Link to="/dashboard">Return to Dashboard</Link>
        </Alert>
      </Container>
    );
  }

  if (redirectToDashboard) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setProcessing(true);

    // Basic validation
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      setError('Please fill in all fields');
      setProcessing(false);
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          // Navigate back to dashboard after successful payment
          setRedirectToDashboard(true);
        }
      }, 2000);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return value;
  };

  if (success) {
    return (
      <Container className="payment-container">
        <Card className="payment-card">
          <Card.Body className="text-center p-5">
            <div className="success-icon mb-4">✓</div>
            <h3>Payment Successful!</h3>
            <p className="text-muted">Your vehicle tax has been renewed successfully.</p>
            <p className="mt-3">
              Registration Number: <strong>{vehicle.registrationNumber}</strong>
            </p>
            <p>
              Amount Paid: <strong>NPR {vehicle.amount.toLocaleString()}</strong>
            </p>
            <Button 
              variant="primary" 
              className="mt-3"
              onClick={() => setRedirectToDashboard(true)}
            >
              Return to Dashboard
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="payment-container">
      <div className="mb-4">
        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>
      </div>
      
      <Card className="payment-card">
        <Card.Body>
          <h2 className="payment-title text-center mb-4">
            💳 Payment Details
          </h2>

          <div className="payment-info mb-4">
            <p className="mb-1">Registration Number: {vehicle.registrationNumber}</p>
            <h4 className="mb-0">Amount to Pay: NPR {vehicle.amount.toLocaleString()}</h4>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Cardholder Name</Form.Label>
              <Form.Control
                type="text"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                placeholder="Enter cardholder name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <input
                className="form-control"
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Expiry Date</Form.Label>
                  <input
                    className="form-control"
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <input
                    className="form-control"
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="123"
                    maxLength={3}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="primary"
              type="submit"
              className="w-100 payment-button"
              disabled={processing}
            >
              {processing ? 'Processing...' : `Pay NPR ${vehicle.amount.toLocaleString()}`}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Payment; 