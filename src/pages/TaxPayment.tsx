import React from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useParams, Link } from 'react-router-dom';
import '../styles/TaxPayment.css';

interface TaxPaymentProps {
  userName?: string;
}

// Create a generic vehicle data object
const createVehicleData = (ownerName: string) => ({
  id: 2,
  registrationNumber: 'BA 2 JA 4456',
  type: 'Motorcycle',
  make: 'Honda',
  model: 'CB Shine',
  year: 2019,
  ownerName: ownerName,
  taxAmount: 3500,
  lateFee: 500,
  totalAmount: 4000,
  taxDueDate: '2023-05-10',
});

const TaxPayment: React.FC<TaxPaymentProps> = ({ userName }) => {
  const { vehicleId } = useParams();
  
  
  const currentUserName = userName || 'User'; 

  
  const vehicleData = createVehicleData(currentUserName);
  
  const [paymentMethod, setPaymentMethod] = React.useState('credit_card');
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [nameOnCard, setNameOnCard] = React.useState('');
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showBankModal, setShowBankModal] = React.useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'bank_transfer') {
      setShowBankModal(true);
    } else {
      // In a real app, here you would make an API call to process the payment
      // Simulate successful payment
      setShowSuccess(true);
    }
  };

  const handleBankPaymentConfirm = () => {
    setShowBankModal(false);
    setShowSuccess(true);
  };
  
  if (showSuccess) {
    return (
      <Container className="page-container">
        <Card className="success-card">
          <Card.Body className="text-center">
            <div className="success-icon">✓</div>
            <h2>Payment Successful!</h2>
            <p>Your payment for {vehicleData.registrationNumber} has been processed successfully.</p>
            <p>Receipt Number: REC-{Date.now().toString().substring(6)}</p>
            <p>Amount Paid: NPR {vehicleData.totalAmount.toLocaleString()}</p>
            <p className="mb-4">Date: {new Date().toLocaleDateString()}</p>
            <Link to="/vehicles" className="btn btn-primary">Return to My Vehicles</Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
  
  return (
    <Container className="page-container">
      <h2 className="page-title">Pay Vehicle Tax</h2>
      
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-3">Vehicle Details</h4>
              <table className="vehicle-details-table">
                <tbody>
                  <tr>
                    <td>Registration Number:</td>
                    <td>{vehicleData.registrationNumber}</td>
                  </tr>
                  <tr>
                    <td>Vehicle:</td>
                    <td>{vehicleData.make} {vehicleData.model} ({vehicleData.year})</td>
                  </tr>
                  <tr>
                    <td>Type:</td>
                    <td>{vehicleData.type}</td>
                  </tr>
                  <tr>
                    <td>Owner:</td>
                    <td>{vehicleData.ownerName}</td>
                  </tr>
                  <tr>
                    <td>Tax Due Date:</td>
                    <td>{new Date(vehicleData.taxDueDate).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <h4 className="mb-3">Payment Details</h4>
              <table className="payment-details-table">
                <tbody>
                  <tr>
                    <td>Tax Amount:</td>
                    <td>NPR {vehicleData.taxAmount.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Late Fee:</td>
                    <td>NPR {vehicleData.lateFee.toLocaleString()}</td>
                  </tr>
                  <tr className="total-row">
                    <td>Total Amount:</td>
                    <td>NPR {vehicleData.totalAmount.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Body>
              <h4 className="mb-3">Payment Method</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Payment Method</Form.Label>
                  <select 
                    className="form-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="e_wallet">E-Wallet</option>
                    <option value="qr_code">QR Code Payment</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </select>
                </Form.Group>
                
                {paymentMethod === 'credit_card' || paymentMethod === 'debit_card' ? (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                      />
                    </Form.Group>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Expiry Date</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="XXX"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Name on Card</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name as shown on card"
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </>
                ) : paymentMethod === 'e_wallet' ? (
                  <Alert variant="info">
                    You'll be redirected to the e-wallet payment gateway after clicking "Pay Now".
                  </Alert>
                ) : paymentMethod === 'qr_code' ? (
                  <div className="text-center">
                    <p>Scan this QR code with your payment app to pay:</p>
                    <div className="qr-code-container">
                      <img 
                        src="qrcode.png" 
                        alt="Payment QR Code" 
                        className="payment-qr-code" 
                      />
                    </div>
                    <p className="mt-3 mb-0 text-muted">
                      After scanning, enter amount NPR {vehicleData.totalAmount.toLocaleString()} and complete the payment
                    </p>
                  </div>
                ) : (
                  <Alert variant="info">
                    Complete bank transfer details will be provided after clicking "Pay Now".
                  </Alert>
                )}
                
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  {paymentMethod === 'qr_code' ? 'Confirm Payment' : `Pay NPR ${vehicleData.totalAmount.toLocaleString()} Now`}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bank Transfer Modal */}
      <Modal 
        show={showBankModal} 
        onHide={() => setShowBankModal(false)} 
        centered 
        size="sm"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Make Your Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bank-details-card">
            <Form>
              <div className="payment-info">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Amount:</span>
                  <span className="fw-bold">NPR {vehicleData.totalAmount.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Reference:</span>
                  <span className="fw-bold">{vehicleData.registrationNumber}</span>
                </div>
              </div>
              
              <Form.Group className="mb-3">
                <Form.Label>Your Bank</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter bank name"
                  size="sm"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Account Number</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter account number"
                  size="sm"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Account Holder</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter account holder name"
                  size="sm"
                />
              </Form.Group>
              
              <div className="small text-danger mt-3">
                <strong>Important:</strong> Use your vehicle registration as payment reference.
              </div>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" size="sm" onClick={() => setShowBankModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleBankPaymentConfirm}>
            Complete Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TaxPayment; 