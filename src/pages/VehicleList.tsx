import React from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsSearch, BsCarFrontFill, BsExclamationTriangleFill, BsCheckCircleFill } from 'react-icons/bs';

// Mock data for vehicles
const mockVehicles = [
  {
    id: 1,
    registrationNumber: 'BA 1 CH 2022',
    type: 'Car',
    make: 'Hyundai',
    model: 'i10',
    year: 2020,
    taxStatus: 'paid',
    taxDueDate: '2024-03-15',
    lastPaid: '2023-03-10',
    amount: 8500,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=500&q=80'
  },
  {
    id: 2,
    registrationNumber: 'BA 2 JA 4456',
    type: 'Motorcycle',
    make: 'Honda',
    model: 'CB Shine',
    year: 2019,
    taxStatus: 'overdue',
    taxDueDate: '2023-05-10',
    lastPaid: '2022-05-05',
    amount: 3200,
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500&q=80'
  },
  {
    id: 3,
    registrationNumber: 'LU 15 PA 3901',
    type: 'SUV',
    make: 'Toyota',
    model: 'Fortuner',
    year: 2021,
    taxStatus: 'paid',
    taxDueDate: '2024-07-22',
    lastPaid: '2023-07-18',
    amount: 12500,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&q=80'
  },
  {
    id: 4,
    registrationNumber: 'BA 10 PA 2045',
    type: 'Car',
    make: 'Maruti Suzuki',
    model: 'Swift',
    year: 2022,
    taxStatus: 'paid',
    taxDueDate: '2024-05-30',
    lastPaid: '2023-05-25',
    amount: 7800,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&q=80'
  },
];

const VehicleList: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [vehicles] = React.useState(mockVehicles);
  const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');
  const [filterStatus, setFilterStatus] = React.useState<string>('all');
  const [sortBy, setSortBy] = React.useState<string>('registrationNumber');

  // Filter vehicles based on search term and filter status
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && vehicle.taxStatus === filterStatus;
  });

  // Sort vehicles
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sortBy === 'registrationNumber') {
      return a.registrationNumber.localeCompare(b.registrationNumber);
    } else if (sortBy === 'dueDate') {
      return new Date(a.taxDueDate).getTime() - new Date(b.taxDueDate).getTime();
    } else if (sortBy === 'make') {
      return a.make.localeCompare(b.make);
    } else if (sortBy === 'year') {
      return b.year - a.year;
    }
    return 0;
  });

  // Calculate statistics
  const totalVehicles = vehicles.length;
  const paidVehicles = vehicles.filter(v => v.taxStatus === 'paid').length;
  const overdueVehicles = vehicles.filter(v => v.taxStatus === 'overdue').length;

  const handleViewModeChange = (mode: 'list' | 'grid') => {
    setViewMode(mode);
  };

  const handleDownloadReport = () => {
    alert('Vehicle report download started');
  };

  return (
    <Container className="page-container">
      {/* Header with statistics */}
      <Row className="mb-4">
        <Col>
          <h2 className="page-title mb-3">My Vehicles</h2>
          <div className="d-flex flex-wrap gap-3">
            <Card className="stat-card">
              <Card.Body className="d-flex align-items-center">
                <div className="stat-icon bg-primary bg-opacity-10 text-primary">
                  <BsCarFrontFill />
                </div>
                <div className="ms-3">
                  <h6 className="stat-label mb-1">Total Vehicles</h6>
                  <h3 className="stat-value mb-0">{totalVehicles}</h3>
                </div>
              </Card.Body>
            </Card>
            
            <Card className="stat-card">
              <Card.Body className="d-flex align-items-center">
                <div className="stat-icon bg-success bg-opacity-10 text-success">
                  <BsCheckCircleFill />
                </div>
                <div className="ms-3">
                  <h6 className="stat-label mb-1">Paid Status</h6>
                  <h3 className="stat-value mb-0">{paidVehicles}</h3>
                </div>
              </Card.Body>
            </Card>
            
            <Card className="stat-card">
              <Card.Body className="d-flex align-items-center">
                <div className="stat-icon bg-danger bg-opacity-10 text-danger">
                  <BsExclamationTriangleFill />
                </div>
                <div className="ms-3">
                  <h6 className="stat-label mb-1">Overdue</h6>
                  <h3 className="stat-value mb-0">{overdueVehicles}</h3>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>

      {/* Search and filter controls */}
      <Card className="mb-4 filter-card">
        <Card.Body>
          <Row className="align-items-center mb-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <BsSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by registration number, make, or model..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6} className="mt-3 mt-md-0 d-flex justify-content-md-end">
              <div className="d-flex align-items-center">
                <Button 
                  variant={viewMode === 'list' ? 'primary' : 'outline-primary'} 
                  className="me-2 view-toggle-btn"
                  onClick={() => handleViewModeChange('list')}
                >
                  List View
                </Button>
                <Button 
                  variant={viewMode === 'grid' ? 'primary' : 'outline-primary'} 
                  className="me-3 view-toggle-btn"
                  onClick={() => handleViewModeChange('grid')}
                >
                  Grid View
                </Button>
                <Button
                  variant="outline-secondary"
                  className="d-flex align-items-center"
                  onClick={handleDownloadReport}
                >
                  Export Report
                </Button>
              </div>
            </Col>
          </Row>
          
          <Row className="align-items-center">
            <Col md={8}>
              <div className="filter-tabs">
                <Button 
                  variant={filterStatus === 'all' ? 'primary' : 'outline-secondary'} 
                  size="sm"
                  className="me-2 mb-2 mb-md-0"
                  onClick={() => setFilterStatus('all')}
                >
                  All Vehicles
                </Button>
                <Button 
                  variant={filterStatus === 'paid' ? 'success' : 'outline-secondary'} 
                  size="sm"
                  className="me-2 mb-2 mb-md-0"
                  onClick={() => setFilterStatus('paid')}
                >
                  Paid
                </Button>
                <Button 
                  variant={filterStatus === 'overdue' ? 'danger' : 'outline-secondary'} 
                  size="sm"
                  className="me-2 mb-2 mb-md-0"
                  onClick={() => setFilterStatus('overdue')}
                >
                  Overdue
                </Button>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex justify-content-md-end mt-3 mt-md-0">
                <Form.Control
                  as="select"
                  size="sm" 
                  value={sortBy} 
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
                  style={{ width: '200px' }}
                >
                  <option value="registrationNumber">Sort by: Registration No.</option>
                  <option value="dueDate">Sort by: Due Date</option>
                  <option value="make">Sort by: Make</option>
                  <option value="year">Sort by: Year (newest)</option>
                </Form.Control>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Add Vehicle Button */}
      <div className="mb-4 d-flex justify-content-end">
        <Button variant="primary" className="add-vehicle-btn">
          <BsCarFrontFill className="me-2" /> Add New Vehicle
        </Button>
      </div>

      {/* Vehicles Display */}
      {filteredVehicles.length === 0 ? (
        <Alert variant="info" className="text-center py-4">
          <h4>No vehicles found</h4>
          <p className="mb-0">No vehicles match your current search criteria. Try adjusting your filters or search term.</p>
        </Alert>
      ) : viewMode === 'list' ? (
        <div className="table-container">
          <Table hover responsive className="vehicle-table">
            <thead>
              <tr>
                <th>Registration No.</th>
                <th>Vehicle Details</th>
                <th>Year</th>
                <th>Tax Status</th>
                <th>Due Date</th>
                <th>Last Paid</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedVehicles.map(vehicle => (
                <tr key={vehicle.id}>
                  <td className="registration-cell">
                    <strong>{vehicle.registrationNumber}</strong>
                    <span className="vehicle-type">{vehicle.type}</span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="vehicle-image-small me-3">
                        <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} />
                      </div>
                      <div>
                        <div>{vehicle.make} {vehicle.model}</div>
                      </div>
                    </div>
                  </td>
                  <td>{vehicle.year}</td>
                  <td>
                    <span className={`status-badge status-${vehicle.taxStatus}`}>
                      {vehicle.taxStatus === 'paid' ? (
                        <>
                          <BsCheckCircleFill className="me-1" /> Paid
                        </>
                      ) : (
                        <>
                          <BsExclamationTriangleFill className="me-1" /> Overdue
                        </>
                      )}
                    </span>
                  </td>
                  <td>{new Date(vehicle.taxDueDate).toLocaleDateString()}</td>
                  <td>{vehicle.lastPaid}</td>
                  <td>
                    {vehicle.taxStatus === 'overdue' ? (
                      <Link to={`/tax-payment/${vehicle.id}`} className="btn btn-primary btn-sm">
                        Pay Now
                      </Link>
                    ) : (
                      <Link to={`/tax-details/${vehicle.id}`} className="btn btn-outline-secondary btn-sm">
                        View Details
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Row className="g-4">
          {sortedVehicles.map(vehicle => (
            <Col key={vehicle.id} md={6} className="mb-4">
              <Card className="vehicle-card h-100">
                <div className="vehicle-card-image">
                  <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} />
                  <div className={`tax-status-overlay status-${vehicle.taxStatus}`}>
                    {vehicle.taxStatus === 'paid' ? (
                      <>
                        <BsCheckCircleFill className="me-1" /> Paid
                      </>
                    ) : (
                      <>
                        <BsExclamationTriangleFill className="me-1" /> Overdue
                      </>
                    )}
                  </div>
                </div>
                <Card.Body>
                  <div className="vehicle-reg-number mb-2">{vehicle.registrationNumber}</div>
                  <h5 className="vehicle-title mb-1">{vehicle.make} {vehicle.model}</h5>
                  <div className="vehicle-details mb-3">
                    <span className="me-2">{vehicle.year}</span>
                    <span className="text-muted">{vehicle.type}</span>
                  </div>
                  <div className="vehicle-tax-info mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Due Date:</span>
                      <span>{new Date(vehicle.taxDueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Amount:</span>
                      <span>₹{vehicle.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="d-grid">
                    {vehicle.taxStatus === 'overdue' ? (
                      <Link to={`/tax-payment/${vehicle.id}`} className="btn btn-primary">
                        Pay Now
                      </Link>
                    ) : (
                      <Link to={`/tax-details/${vehicle.id}`} className="btn btn-outline-secondary">
                        View Details
                      </Link>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default VehicleList; 