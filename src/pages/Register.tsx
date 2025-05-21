import React from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Register.css';

const Register: React.FC = () => {
  const [licenseNumber, setLicenseNumber] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [phoneNo, setPhoneNo] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [agreeTerms, setAgreeTerms] = React.useState(false);
  const [redirectToLogin, setRedirectToLogin] = React.useState(false);
  const { register } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!licenseNumber || !fullName || !phoneNo || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!agreeTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }
    
    // Register with license number as username
    const registered = register(licenseNumber, password, 'user');
    
    if (registered) {
      setSuccess(true);
      setTimeout(() => {
        setRedirectToLogin(true);
      }, 2000);
    } else {
      setError('License number already registered');
    }
  };
  
  if (redirectToLogin) {
    return <Navigate to="/login" replace />;
  }

  if (success) {
    return (
      <Container className="register-container">
        <Card className="register-card">
          <Card.Body className="text-center p-4">
            <div className="success-icon mb-3">✓</div>
            <h2>Registration Successful!</h2>
            <p>Your account has been created successfully.</p>
            <p>You will be redirected to the login page shortly...</p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="register-container">
      <Card className="register-card">
        <div className="register-header">
          <h2 className="register-title">Create an Account</h2>
          <p className="register-subtitle">Vehicle Tax Renewal System</p>
        </div>
        <Card.Body className="p-4 pt-2">
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <div className="form-section mb-4">
              <h5 className="form-section-title">Personal Information</h5>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label>License Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your license number"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    required
                  />
                </Col>
                
                <Col md={6} className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </Col>
              </Row>

              <Row>
                <Col md={12} className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    required
                  />
                </Col>
              </Row>
            </div>

            <div className="form-section">
              <h5 className="form-section-title">Account Security</h5>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Col>
                
                <Col md={6} className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Col>
              </Row>
            </div>

            <Form.Group className="mb-4 mt-4">
              <Form.Check 
                type="checkbox"
                id="terms"
                label={<>I accept the <Link to="#">Terms of Service</Link> and <Link to="#">Privacy Policy</Link></>}
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3 register-button">
              Register
            </Button>

            <div className="text-center mt-4">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register; 