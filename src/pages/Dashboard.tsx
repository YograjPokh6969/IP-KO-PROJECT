import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Badge, Card, Alert } from 'react-bootstrap';
import { BsExclamationTriangleFill, BsCheckCircleFill, BsCarFrontFill, BsCalendarEvent, BsCurrencyDollar } from 'react-icons/bs';
import '../styles/Dashboard.css';

interface DashboardProps {
  userRole: string;
  userName: string;
}

// Mock data for user dashboard
const userDashboardData = {
  totalVehicles: 2,
  pendingPayments: 1,
  paidVehicles: 1,
  vehicles: [
    {
      id: 1,
      registrationNumber: 'BA 1 CH 2022',
      type: 'Car',
      model: 'Hyundai i10',
      lastPaid: '2023-03-15',
      nextDue: '2024-03-15',
      status: 'paid',
      amount: 8000
    },
    {
      id: 2,
      registrationNumber: 'BA 2 JA 4456',
      type: 'Motorcycle',
      model: 'Honda CB Shine',
      lastPaid: '2022-05-10',
      nextDue: '2023-05-10',
      status: 'overdue',
      amount: 3500
    }
  ]
};

const Dashboard: React.FC<DashboardProps> = ({ userRole, userName }) => {
  const [redirectToLogin, setRedirectToLogin] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    setRedirectToLogin(true);
  };

  if (redirectToLogin) {
    return <Navigate to="/login" replace />;
  }

  if (userRole === 'admin') {
    // If this is an admin, they should be redirected to admin dashboard
    // But we'll handle that in routing
    return null;
  }

  const { totalVehicles, pendingPayments, paidVehicles, vehicles } = userDashboardData;

  return (
    <Container className="page-container">
      <div className="dashboard-header">
        <h2 className="page-title">Welcome back, {userName}</h2>
        <p className="dashboard-date">
          <BsCalendarEvent className="icon" />
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <section className="dashboard-stats">
        <Card className="stat-card">
          <Card.Body>
            <p className="stat-title">Total Vehicles</p>
            <p className="stat-value">{totalVehicles}</p>
            <BsCarFrontFill className="stat-icon" />
          </Card.Body>
        </Card>
        
        <Card className="stat-card">
          <Card.Body>
            <p className="stat-title">Pending Payments</p>
            <p className="stat-value">{pendingPayments}</p>
            <BsExclamationTriangleFill className="stat-icon warning" />
          </Card.Body>
        </Card>
        
        <Card className="stat-card">
          <Card.Body>
            <p className="stat-title">Paid Vehicles</p>
            <p className="stat-value">{paidVehicles}</p>
            <BsCheckCircleFill className="stat-icon success" />
          </Card.Body>
        </Card>
      </section>

      <section className="section">
        <div className="section-header">
          <h3 className="section-title">Your Vehicles</h3>
        </div>
        
        <Card className="table-card">
          <Card.Body>
            <Table responsive hover className="vehicles-table">
              <thead>
                <tr>
                  <th>Vehicle Details</th>
                  <th>Registration No.</th>
                  <th>Last Paid</th>
                  <th>Next Due</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map(vehicle => (
                  <tr key={vehicle.id}>
                    <td>
                      <div className="vehicle-info">
                        <div className="vehicle-model">{vehicle.model}</div>
                        <div className="vehicle-type">{vehicle.type}</div>
                      </div>
                    </td>
                    <td>{vehicle.registrationNumber}</td>
                    <td>{new Date(vehicle.lastPaid).toLocaleDateString()}</td>
                    <td>{new Date(vehicle.nextDue).toLocaleDateString()}</td>
                    <td>₹ {vehicle.amount}</td>
                    <td>
                      <Badge 
                        bg={vehicle.status === 'paid' ? 'success' : 'danger'}
                        className="status-badge"
                      >
                        {vehicle.status === 'paid' ? 'Paid' : 'Overdue'}
                      </Badge>
                    </td>
                    <td>
                      {vehicle.status === 'overdue' && (
                        <Link to={`/payment/${vehicle.id}`} className="btn btn-sm btn-primary pay-now-btn">
                          <BsCurrencyDollar className="me-1" />
                          Pay Now
                        </Link>
                      )}
                      {vehicle.status === 'paid' && (
                        <span className="text-muted">No Action Needed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </section>
    </Container>
  );
};

export default Dashboard; 