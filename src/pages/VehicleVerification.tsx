import React from 'react';
import { Container, Table, Badge, Button, Form, InputGroup } from 'react-bootstrap';
import { BsSearch, BsCheckCircle, BsXCircle } from 'react-icons/bs';
import '../styles/VehicleVerification.css';

interface Verification {
  id: number;
  vehicleNumber: string;
  ownerName: string;
  vehicleType: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  receiptNumber: string;
  status: 'pending' | 'verified' | 'rejected';
}

// Mock verification data
const pendingVerificationsData: Verification[] = [
  {
    id: 1,
    vehicleNumber: 'BA 2 JA 4456',
    ownerName: 'Sunita Thapa',
    vehicleType: 'Motorcycle',
    amount: 3500,
    paymentDate: '2023-07-15',
    paymentMethod: 'Credit Card',
    receiptNumber: 'REC-45678',
    status: 'pending'
  },
  {
    id: 2,
    vehicleNumber: 'GN 12 PA 5501',
    ownerName: 'Priya Singh',
    vehicleType: 'Car',
    amount: 5000,
    paymentDate: '2023-07-14',
    paymentMethod: 'Bank Transfer',
    receiptNumber: 'REC-45679',
    status: 'pending'
  },
  {
    id: 3,
    vehicleNumber: 'BA 12 CHA 4011',
    ownerName: 'Mohan Adhikari',
    vehicleType: 'SUV',
    amount: 12000,
    paymentDate: '2023-07-14',
    paymentMethod: 'E-Wallet',
    receiptNumber: 'REC-45680',
    status: 'pending'
  },
  {
    id: 4,
    vehicleNumber: 'LU 10 PA 7723',
    ownerName: 'Hari Prasad',
    vehicleType: 'Car',
    amount: 6500,
    paymentDate: '2023-07-13',
    paymentMethod: 'Credit Card',
    receiptNumber: 'REC-45681',
    status: 'pending'
  },
  {
    id: 5,
    vehicleNumber: 'KO 05 CHA 1289',
    ownerName: 'Gita Sharma',
    vehicleType: 'Motorcycle',
    amount: 2800,
    paymentDate: '2023-07-12',
    paymentMethod: 'Bank Transfer',
    receiptNumber: 'REC-45682',
    status: 'pending'
  }
];

const VehicleVerification: React.FC = () => {
  const [verifications, setVerifications] = React.useState<Verification[]>(pendingVerificationsData);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  
  const handleVerify = (id: number) => {
    // In a real application, this would involve an API call
    setVerifications(verifications.map(v => 
      v.id === id ? { ...v, status: 'verified' } : v
    ));
  };
  
  const handleReject = (id: number) => {
    // In a real application, this would involve an API call
    setVerifications(verifications.map(v => 
      v.id === id ? { ...v, status: 'rejected' } : v
    ));
  };
  
  const filteredVerifications = verifications.filter(v => 
    v.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="page-container">
      <h2 className="page-title">Vehicle Payment Verification</h2>
      
      <div className="verification-header">
        <div className="search-wrapper">
          <InputGroup>
            <InputGroup.Text>
              <BsSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by vehicle number, owner, or receipt..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="verification-stats">
          <div className="stat">
            <span className="stat-value">{verifications.filter(v => v.status === 'pending').length}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat">
            <span className="stat-value">{verifications.filter(v => v.status === 'verified').length}</span>
            <span className="stat-label">Verified</span>
          </div>
          <div className="stat">
            <span className="stat-value">{verifications.filter(v => v.status === 'rejected').length}</span>
            <span className="stat-label">Rejected</span>
          </div>
        </div>
      </div>
      
      <div className="table-container mt-4">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Vehicle No.</th>
              <th>Owner</th>
              <th>Type</th>
              <th>Amount (NPR)</th>
              <th>Payment Date</th>
              <th>Receipt No.</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVerifications.map(verification => (
              <tr key={verification.id}>
                <td>{verification.vehicleNumber}</td>
                <td>{verification.ownerName}</td>
                <td>{verification.vehicleType}</td>
                <td>{verification.amount.toLocaleString()}</td>
                <td>{new Date(verification.paymentDate).toLocaleDateString()}</td>
                <td>{verification.receiptNumber}</td>
                <td>
                  <Badge 
                    bg={
                      verification.status === 'verified' 
                        ? 'success' 
                        : verification.status === 'rejected' 
                          ? 'danger' 
                          : 'warning'
                    }
                  >
                    {verification.status === 'verified' 
                      ? 'Verified' 
                      : verification.status === 'rejected' 
                        ? 'Rejected' 
                        : 'Pending'
                    }
                  </Badge>
                </td>
                <td>
                  {verification.status === 'pending' && (
                    <div className="action-buttons">
                      <Button 
                        variant="success" 
                        size="sm" 
                        onClick={() => handleVerify(verification.id)}
                        className="me-2"
                      >
                        <BsCheckCircle /> Verify
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => handleReject(verification.id)}
                      >
                        <BsXCircle /> Reject
                      </Button>
                    </div>
                  )}
                  {verification.status !== 'pending' && (
                    <span className="text-muted">Processed</span>
                  )}
                </td>
              </tr>
            ))}
            {filteredVerifications.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No records found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default VehicleVerification; 