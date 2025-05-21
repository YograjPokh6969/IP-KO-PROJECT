import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import VehicleList from '../pages/VehicleList';
import TaxPayment from '../pages/TaxPayment';
import TaxHistory from '../pages/TaxHistory';
import AdminDashboard from '../pages/AdminDashboard';
import VehicleVerification from '../pages/VehicleVerification';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import './styles/App.css';

// Mock user accounts for demo purposes
const mockUsers = [
  { username: 'user', password: 'password', role: 'user', displayName: 'John Doe' },
  { username: 'stuti', password: 'stuti123', role: 'user', displayName: 'Stuti Sharma' },
  { username: 'admin', password: 'admin123', role: 'admin', displayName: 'Admin User' }
];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [userRole, setUserRole] = React.useState<string>('');
  const [currentUser, setCurrentUser] = React.useState<string>('');

  // Simple auth functions
  const login = (username: string, password: string, role: string): boolean => {
    // First, try to find the user in our mock database
    const user = mockUsers.find(
      u => u.username === username && u.password === password
    );
    
    if (user) {
      setIsAuthenticated(true);
      setUserRole(user.role);
      setCurrentUser(user.displayName);
      return true;
    }
    
    // If not found in mock database, allow login based on role selection
    // This is for demo purposes only
    if (username && password) {
      setIsAuthenticated(true);
      setUserRole(role);
      setCurrentUser(username); // Use username as display name for demo users
      return true;
    }
    return false;
  };

  const logout = (): void => {
    setIsAuthenticated(false);
    setUserRole('');
    setCurrentUser('');
  };

  // Route guards
  interface PrivateRouteProps {
    children: React.ReactNode;
    requiredRole?: string;
  }

  const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/" replace />;
    }

    return <>{children}</>;
  };

  return (
    <div className="app">
      <Header isAuthenticated={isAuthenticated} userRole={userRole} onLogout={logout} />
      <main className="main-content">
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={login} />
          } />
          
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/" replace /> : <Register />
          } />
          
          {/* User Routes */}
          <Route path="/" element={
            <PrivateRoute requiredRole="user">
              <Dashboard userRole={userRole} userName={currentUser} />
            </PrivateRoute>
          } />
          <Route path="/vehicles" element={
            <PrivateRoute requiredRole="user">
              <VehicleList />
            </PrivateRoute>
          } />
          <Route path="/tax-payment/:vehicleId" element={
            <PrivateRoute requiredRole="user">
              <TaxPayment userName={currentUser} />
            </PrivateRoute>
          } />
          <Route path="/tax-history" element={
            <PrivateRoute requiredRole="user">
              <TaxHistory />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile userName={currentUser} />
            </PrivateRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <PrivateRoute requiredRole="admin">
              <AdminDashboard userName={currentUser} />
            </PrivateRoute>
          } />
          <Route path="/verification" element={
            <PrivateRoute requiredRole="admin">
              <VehicleVerification />
            </PrivateRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App; 