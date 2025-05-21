import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const AppNavbar: React.FC = () => {
  const [redirect, setRedirect] = React.useState<string | null>(null);
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const { isAuthenticated, logout, userName, userRole } = useAuth();

  const handleLogout = () => {
    logout();
    setRedirect('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div onClick={closeMenu}>
          <Link to="/" className="navbar-logo">
            Vehicle Tax Renewal
          </Link>
        </div>
        
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <div onClick={closeMenu}>
            <Link to="/" className="navbar-item">Home</Link>
          </div>
          
          {!isAuthenticated ? (
            <>
              <div className="navbar-dropdown">
                <button className="navbar-dropdown-btn">Login</button>
                <div className="navbar-dropdown-content">
                  <div onClick={closeMenu}>
                    <Link to="/login" className="navbar-item">
                      User Login
                    </Link>
                  </div>
                  <div onClick={closeMenu}>
                    <Link to="/login?role=admin" className="navbar-item">
                      Admin Login
                    </Link>
                  </div>
                </div>
              </div>
              <div onClick={closeMenu}>
                <Link to="/register" className="navbar-item">
                  Register
                </Link>
              </div>
            </>
          ) : (
            <>
              <div onClick={closeMenu}>
                <Link to="/dashboard" className="navbar-item">
                  Dashboard
                </Link>
              </div>
              {userRole === 'admin' && (
                <>
                  <div onClick={closeMenu}>
                    <Link to="/admin/payments" className="navbar-item">
                      Payments
                    </Link>
                  </div>
                  <div onClick={closeMenu}>
                    <Link to="/admin/overdue" className="navbar-item">
                      Overdue
                    </Link>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {isAuthenticated && (
          <div className="navbar-user">
            <span className="welcome-message">Welcome, {userName}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AppNavbar; 