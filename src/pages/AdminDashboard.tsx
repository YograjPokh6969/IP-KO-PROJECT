import React from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  BsSearch, 
  BsCheckCircleFill, 
  BsExclamationTriangleFill, 
  BsPersonFill, 
  BsCarFrontFill, 
  BsCurrencyDollar
} from 'react-icons/bs';
import '../styles/AdminDashboard.css';

interface AdminDashboardProps {
  userName: string;
}

// Define payment types
interface Payment {
  id: number;
  userInfo: {
    name: string;
    id: number;
  };
  vehicleInfo: {
    registrationNumber: string;
    model: string;
    type: string;
  };
  amount: number;
  date: string;
  status: 'completed' | 'pending';
}

// Mock data for admin dashboard
const initialAdminDashboardData = {
  totalVehicles: 120,
  totalUsers: 45,
  pendingPayments: 18,
  recentPayments: [
    {
      id: 1,
      userInfo: {
        name: 'John Doe',
        id: 101
      },
      vehicleInfo: {
        registrationNumber: 'BA 1 CH 2022',
        model: 'Hyundai i10',
        type: 'Car'
      },
      amount: 8000,
      date: '2023-06-15',
      status: 'completed'
    },
    {
      id: 2,
      userInfo: {
        name: 'Rita Sharma',
        id: 102
      },
      vehicleInfo: {
        registrationNumber: 'BA 2 JA 4456',
        model: 'Honda CB Shine',
        type: 'Motorcycle'
      },
      amount: 3500,
      date: '2023-06-10',
      status: 'completed'
    },
    {
      id: 3,
      userInfo: {
        name: 'Sunil Thapa',
        id: 103
      },
      vehicleInfo: {
        registrationNumber: 'BA 7 PA 1234',
        model: 'Toyota Fortuner',
        type: 'SUV'
      },
      amount: 12000,
      date: '2023-06-05',
      status: 'pending'
    }
  ],
  overdueTaxes: [
    {
      id: 1,
      userInfo: {
        name: 'Binod Karki',
        id: 104
      },
      vehicleInfo: {
        registrationNumber: 'BA 4 KA 7890',
        model: 'Mahindra Scorpio',
        type: 'SUV'
      },
      amount: 10000,
      dueDate: '2023-04-15',
      daysPastDue: 62
    },
    {
      id: 2,
      userInfo: {
        name: 'Anita Rai',
        id: 105
      },
      vehicleInfo: {
        registrationNumber: 'BA 18 CH 5432',
        model: 'Suzuki Access',
        type: 'Scooter'
      },
      amount: 2500,
      dueDate: '2023-05-20',
      daysPastDue: 25
    }
  ]
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ userName }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [adminData, setAdminData] = React.useState(initialAdminDashboardData);
  
  // Function to handle payment verification
  const handleVerifyPayment = (paymentId: number, status: 'completed' | 'pending') => {
    // Update the payments data with the new status
    const updatedPayments = adminData.recentPayments.map(payment => {
      if (payment.id === paymentId) {
        return { ...payment, status };
      }
      return payment;
    });
    
    // Count pending payments
    const pendingCount = updatedPayments.filter(p => p.status === 'pending').length;
    
    // Update the state
    setAdminData({
      ...adminData,
      recentPayments: updatedPayments,
      pendingPayments: pendingCount
    });
  };
  
  return (
    <Container fluid className="admin-dashboard">
      <div className="admin-header">
        <h2 className="page-title">Admin Dashboard</h2>
        <p className="text-muted">Welcome back, {userName}</p>
      </div>
      
      {/* Stats Cards */}
      <Row className="stats-cards mb-4">
        <Col md={4}>
          <Card className="stats-card">
            <Card.Body>
              <div className="stat-icon bg-light-blue">
                <BsPersonFill />
              </div>
              <div className="stat-details">
                <h3 className="stat-value">{adminData.totalUsers}</h3>
                <p className="stat-label">Registered Users</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="stats-card">
            <Card.Body>
              <div className="stat-icon bg-light-green">
                <BsCarFrontFill />
              </div>
              <div className="stat-details">
                <h3 className="stat-value">{adminData.totalVehicles}</h3>
                <p className="stat-label">Total Vehicles</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="stats-card">
            <Card.Body>
              <div className="stat-icon bg-light-orange">
                <BsCurrencyDollar />
              </div>
              <div className="stat-details">
                <h3 className="stat-value">{adminData.pendingPayments}</h3>
                <p className="stat-label">Pending Payments</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Search Bar */}
      <Card className="mb-4">
        <Card.Body>
          <Form>
            <InputGroup>
              <InputGroup.Text>
                <BsSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by registration number, user name, or vehicle model"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary">Search</Button>
            </InputGroup>
          </Form>
        </Card.Body>
      </Card>
      
      {/* Recent Payments */}
      <Card className="mb-4">
        <Card.Header className="d-flex align-items-center justify-content-between">
          <h5 className="mb-0">Recent Payments</h5>
          <Link to="/admin/payments" className="btn btn-sm btn-outline-primary">View All</Link>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>User</th>
                <th>Vehicle</th>
                <th>Registration No.</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {adminData.recentPayments.map(payment => (
                <tr key={payment.id}>
                  <td>{payment.userInfo.name}</td>
                  <td>{payment.vehicleInfo.model} ({payment.vehicleInfo.type})</td>
                  <td>{payment.vehicleInfo.registrationNumber}</td>
                  <td>NPR {payment.amount.toLocaleString()}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                  <td>
                    {payment.status === 'completed' ? (
                      <Badge bg="success" className="status-badge">
                        <BsCheckCircleFill className="me-1" /> Completed
                      </Badge>
                    ) : (
                      <Badge bg="warning" className="status-badge">
                        <BsExclamationTriangleFill className="me-1" /> Pending
                      </Badge>
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button 
                        variant={payment.status === 'completed' ? 'success' : 'outline-success'} 
                        size="sm" 
                        onClick={() => handleVerifyPayment(payment.id, 'completed')}
                        className="verification-btn"
                      >
                        Paid
                      </Button>
                      <Button 
                        variant={payment.status === 'pending' ? 'warning' : 'outline-warning'} 
                        size="sm" 
                        onClick={() => handleVerifyPayment(payment.id, 'pending')}
                        className="verification-btn"
                      >
                        Not Paid
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      {/* Overdue Taxes */}
      <Card className="mb-4">
        <Card.Header className="d-flex align-items-center justify-content-between">
          <h5 className="mb-0">Overdue Taxes</h5>
          <Link to="/admin/overdue" className="btn btn-sm btn-outline-primary">View All</Link>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>User</th>
                <th>Vehicle</th>
                <th>Registration No.</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Days Overdue</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {adminData.overdueTaxes.map(tax => (
                <tr key={tax.id}>
                  <td>{tax.userInfo.name}</td>
                  <td>{tax.vehicleInfo.model} ({tax.vehicleInfo.type})</td>
                  <td>{tax.vehicleInfo.registrationNumber}</td>
                  <td>NPR {tax.amount.toLocaleString()}</td>
                  <td>{new Date(tax.dueDate).toLocaleDateString()}</td>
                  <td>
                    <Badge bg="danger" className="status-badge">
                      {tax.daysPastDue} days
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button 
                        variant="success" 
                        size="sm"
                        className="verification-btn"
                      >
                        Mark Paid
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        className="verification-btn"
                      >
                        Send Reminder
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard; 