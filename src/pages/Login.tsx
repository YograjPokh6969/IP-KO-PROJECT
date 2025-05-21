import React from 'react';
import { Card, Form, Button, Container, Alert, InputGroup, Navbar } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import '../styles/Login.css';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  onLogin?: (username: string, password: string, role: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [loginType, setLoginType] = React.useState('user');
  const [redirectToDashboard, setRedirectToDashboard] = React.useState(false);
  const { login, isAuthenticated } = useAuth();
  
  // Check if user is already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      setRedirectToDashboard(true);
    }
  }, [isAuthenticated]);
  
  // Check URL parameters for role on component mount
  React.useEffect(() => {
    // Use window.location instead of router hooks
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const role = urlParams.get('role');
    if (role === 'admin') {
      setLoginType('admin');
    } else {
      setLoginType('user');
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both name and password');
      return;
    }
    
    // Use the provided onLogin prop if available, otherwise use the login from context
    const loginFn = onLogin || login;
    const success = loginFn(username, password, loginType);
    if (success) {
      setRedirectToDashboard(true);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };
  
  if (redirectToDashboard) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container>
          {/* Navbar will remain empty as requested */}
          <span></span>
        </Container>
      </Navbar>
      <Container className="login-container">
        <h1 className="system-title">Vehicle Tax Renewal System</h1>
        <Card className="login-card">
          <Card.Body className="p-4">
            <h2 className="login-title text-center">
              {loginType === 'admin' ? 'Admin Login' : 'User Login'}
            </h2>
            <p className="login-subtitle text-center">
              Login to manage your vehicle tax payments
            </p>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <div className="fa-icon">
                      <svg viewBox="0 0 448 512" width="1em" height="1em">
                        <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z"></path>
                      </svg>
                    </div>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>
              
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <div className="fa-icon">
                      <svg viewBox="0 0 448 512" width="1em" height="1em">
                        <path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path>
                      </svg>
                    </div>
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>
              
              <Button variant="primary" type="submit" className="w-100 mb-3">
                <div className="me-2 d-inline-block">
                  <svg viewBox="0 0 512 512" width="1em" height="1em">
                    <path fill="currentColor" d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"></path>
                  </svg>
                </div>
                {loginType === 'admin' ? 'Login as Admin' : 'Login'}
              </Button>
              
              {loginType === 'user' && (
                <div className="text-center mt-3">
                  <p>
                    Don't have an account? <Link to="/register">Register here</Link>
                  </p>
                </div>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login; 