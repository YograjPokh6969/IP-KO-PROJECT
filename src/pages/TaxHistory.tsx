import React from 'react';
import { Container, Table, Card, Form, InputGroup, Badge } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import '../styles/TaxHistory.css';

// Mock tax payment history data
const taxHistoryData = [
  {
    id: 1,
    vehicleNumber: 'BA 1 CH 2022',
    paymentDate: '2023-03-01',
    amount: 8000,
    paymentMethod: 'Credit Card',
    receiptNumber: 'REC-98765',
    period: '2023-2024'
  },
  {
    id: 2,
    vehicleNumber: 'BA 2 JA 4456',
    paymentDate: '2023-04-10',
    amount: 3500,
    paymentMethod: 'Bank Transfer',
    receiptNumber: 'REC-87654',
    period: '2023-2024'
  },
  {
    id: 3,
    vehicleNumber: 'LU 15 PA 3901',
    paymentDate: '2023-02-15',
    amount: 12000,
    paymentMethod: 'E-Wallet',
    receiptNumber: 'REC-76543',
    period: '2023-2024'
  },
  {
    id: 4,
    vehicleNumber: 'BA 1 CH 2022',
    paymentDate: '2022-02-28',
    amount: 7500,
    paymentMethod: 'Credit Card',
    receiptNumber: 'REC-65432',
    period: '2022-2023'
  },
  {
    id: 5,
    vehicleNumber: 'BA 2 JA 4456',
    paymentDate: '2022-03-20',
    amount: 3200,
    paymentMethod: 'E-Wallet',
    receiptNumber: 'REC-54321',
    period: '2022-2023'
  }
];

const TaxHistory: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [payments] = React.useState(taxHistoryData);
  
  const filteredPayments = payments.filter(payment => 
    payment.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.period.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Container className="page-container">
      <h2 className="page-title">Tax Payment History</h2>
      
      <Card className="mb-4">
        <Card.Body>
          <div className="search-container">
            <InputGroup>
              <InputGroup.Text>
                <BsSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by vehicle number, receipt number, or period..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </div>
        </Card.Body>
      </Card>
      
      <div className="table-container">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Receipt No.</th>
              <th>Vehicle No.</th>
              <th>Payment Date</th>
              <th>Period</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map(payment => (
                <tr key={payment.id}>
                  <td>{payment.receiptNumber}</td>
                  <td>{payment.vehicleNumber}</td>
                  <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                  <td>{payment.period}</td>
                  <td>NPR {payment.amount.toLocaleString()}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>
                    <Badge bg="success">Paid</Badge>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-5">
                  No tax payment records found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      
      <div className="history-note mt-4">
        <p>
          <strong>Note:</strong> This history shows all tax payments made for your registered vehicles. 
          For receipt downloads or detailed information about specific payments, please click on the receipt number.
        </p>
      </div>
    </Container>
  );
};

export default TaxHistory; 