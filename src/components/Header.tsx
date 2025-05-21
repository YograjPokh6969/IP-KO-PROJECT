import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { BsCarFront, BsPersonCircle } from 'react-icons/bs';
import '../styles/Header.css';

interface HeaderProps {
  isAuthenticated: boolean;
  userRole: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, userRole, onLogout }) => {
  const notifications = [
    { id: 1, text: 'Your tax payment was successfully processed', read: false },
    { id: 2, text: 'Vehicle tax for BA 1 CH 2022 is due in 7 days', read: false },
    { id: 3, text: 'New government policy update on vehicle taxes', read: true }
  ];
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm sticky-top header-main">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          <BsCarFront className="brand-icon" />
          <span className="brand-text">Vehicle Tax Renewal</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {isAuthenticated ? (
            <>
              <Nav className="me-auto">
                {userRole === 'user' && (
                  <>
                    <Nav.Link as={NavLink} to="/" className="nav-link-hover">Dashboard</Nav.Link>
                    <Nav.Link as={NavLink} to="/vehicles" className="nav-link-hover">My Vehicles</Nav.Link>
                    <Nav.Link as={NavLink} to="/tax-history" className="nav-link-hover">Tax History</Nav.Link>
                  </>
                )}
                {userRole === 'admin' && (
                  <>
                    <Nav.Link as={NavLink} to="/admin" className="nav-link-hover">
                      <BsPersonCircle className="me-1" /> Admin Dashboard
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/verification" className="nav-link-hover">Verify Payments</Nav.Link>
                  </>
                )}
              </Nav>
              <Nav className="align-items-center">
                <div className="notification-container me-2">
                  <BsPersonCircle className="notification-icon" />
                  {unreadCount > 0 && (
                    <span className="notification-badge bg-danger">
                      {unreadCount}
                    </span>
                  )}
                </div>
                
                <div className="dropdown">
                  <div className="profile-toggle cursor-pointer">
                    <div className="d-flex align-items-center">
                      <div className="avatar-container">
                        <BsPersonCircle className="profile-icon" />
                      </div>
                      <span className="ms-2 d-none d-md-block">My Account</span>
                    </div>
                  </div>
                  <div className="dropdown-menu profile-dropdown shadow-lg">
                    <div className="px-3 py-2 border-bottom d-flex align-items-center">
                      <div className="avatar-container me-2">
                        <BsPersonCircle className="profile-icon" />
                      </div>
                      <div>
                        <h6 className="mb-0">User Profile</h6>
                        <small className="text-muted">
                          {userRole === 'admin' ? 'Administrator' : 'Vehicle Owner'}
                        </small>
                      </div>
                    </div>
                    <Link to="/profile" className="dropdown-item dropdown-item-hover">
                      <BsPersonCircle className="me-2" /> My Profile
                    </Link>
                    <Link to="/profile" className="dropdown-item dropdown-item-hover">
                      <BsPersonCircle className="me-2" /> Settings
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Button onClick={onLogout} className="dropdown-item dropdown-item-hover text-danger">
                      <BsPersonCircle className="me-2" /> Logout
                    </Button>
                  </div>
                </div>
              </Nav>
            </>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/login" className="nav-link-hover">Login</Nav.Link>
              <Button 
                variant="primary" 
                className="ms-2 signup-btn"
                onClick={() => window.location.href = '/register'}
              >
                Sign Up
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 