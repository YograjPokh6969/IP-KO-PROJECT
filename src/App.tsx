import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Payment from './pages/Payment';
import BankPayment from './pages/BankPayment';
import { AppNavbar, PrivateRoute } from './components';
import './styles/App.css';

// Component to conditionally render User or Admin Dashboard
const DashboardRouter = () => {
  const { userRole, userName } = useAuth();
  
  if (userRole === 'admin') {
    return <AdminDashboard userName={userName || 'Admin'} />;
  }
  
  return <Dashboard userRole={userRole || 'user'} userName={userName || 'User'} />;
};

const AppRoutes: React.FC = () => {
  const { userRole, userName } = useAuth();

  // Mock vehicle data for Payment component
  const mockVehicle = {
    id: 1,
    registrationNumber: 'BA 1 CH 2022',
    amount: 8000
  };

  const handlePaymentSuccess = () => {
    console.log('Payment successful');
    // Add any other success handling logic here
  };

  return (
    <>
      <AppNavbar />
      <div className="main-content">
        <div className="content-container fade-in">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardRouter />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/payment/:vehicleId"
              element={
                <PrivateRoute>
                  <Payment vehicle={mockVehicle} onSuccess={handlePaymentSuccess} />
                </PrivateRoute>
              }
            />

            <Route
              path="/bank-payment/:vehicleId"
              element={
                <PrivateRoute>
                  <BankPayment />
                </PrivateRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/payments"
              element={
                <PrivateRoute>
                  {userRole === 'admin' ? <AdminDashboard userName={userName || 'Admin'} /> : <Navigate to="/dashboard" />}
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/overdue"
              element={
                <PrivateRoute>
                  {userRole === 'admin' ? <AdminDashboard userName={userName || 'Admin'} /> : <Navigate to="/dashboard" />}
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App; 