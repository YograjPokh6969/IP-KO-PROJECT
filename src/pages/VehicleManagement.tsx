import React from 'react';
import { Container, Card, Button, Table, Form, Alert } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { BsPlusCircle } from 'react-icons/bs';
import '../styles/VehicleManagement.css';

interface Vehicle {
  id: number;
  registrationNumber: string;
  type: string;
  model: string;
  year: number;
  tax: {
    amount: number;
    lastPaid: string;
    nextDue: string;
  }
}

const VehicleManagement: React.FC = () => {
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([
    {
      id: 1,
      registrationNumber: 'BA 1 CH 2022',
      type: 'Car',
      model: 'Hyundai i10',
      year: 2020,
      tax: {
        amount: 8000,
        lastPaid: '2023-03-15',
        nextDue: '2024-03-15'
      }
    },
    {
      id: 2,
      registrationNumber: 'BA 2 JA 4456',
      type: 'Motorcycle',
      model: 'Honda CB Shine',
      year: 2019,
      tax: {
        amount: 3500,
        lastPaid: '2022-05-10',
        nextDue: '2023-05-10'
      }
    }
  ]);

  const [showModal, setShowModal] = React.useState(false);
  const [editingVehicle, setEditingVehicle] = React.useState<number | null>(null);
  const [formData, setFormData] = React.useState<Partial<Vehicle>>({});
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingVehicle(null);
    setFormData({});
    setError(null);
  };

  const handleShowModal = (vehicleId?: number) => {
    if (vehicleId) {
      const vehicle = vehicles.find(v => v.id === vehicleId);
      if (vehicle) {
        setFormData(vehicle);
        setEditingVehicle(vehicleId);
      }
    } else {
      setFormData({});
      setEditingVehicle(null);
    }
    setShowModal(true);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate required fields
    if (!formData.registrationNumber || !formData.type || !formData.model || !formData.year) {
      setError('All fields are required');
      return;
    }
    
    if (editingVehicle) {
      // Update existing vehicle
      setVehicles(vehicles.map(v => 
        v.id === editingVehicle 
          ? { ...v, ...formData, id: v.id } 
          : v
      ));
      setSuccess('Vehicle updated successfully');
    } else {
      // Add new vehicle
      const newVehicle: Vehicle = {
        id: Math.max(0, ...vehicles.map(v => v.id)) + 1,
        registrationNumber: formData.registrationNumber || '',
        type: formData.type || '',
        model: formData.model || '',
        year: formData.year || 2023,
        tax: {
          amount: formData.type === 'Car' ? 8000 : 3500,
          lastPaid: new Date().toISOString().slice(0, 10),
          nextDue: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 10)
        }
      };
      
      setVehicles([...vehicles, newVehicle]);
      setSuccess('Vehicle added successfully');
    }
    
    handleCloseModal();
    
    // Clear success message after delay
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  const handleDelete = (vehicleId: number) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(vehicles.filter(v => v.id !== vehicleId));
      setSuccess('Vehicle deleted successfully');
      
      // Clear success message after delay
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    }
  };

  return (
    <Container className="page-container">
      <div className="section-header">
        <h2 className="page-title">Vehicle Management</h2>
        <Button 
          variant="primary" 
          onClick={() => handleShowModal()}
          className="add-button"
        >
          <BsPlusCircle className="me-2" />
          Add Vehicle
        </Button>
      </div>
      
      {success && <Alert variant="success">{success}</Alert>}
      
      <Card>
        <Card.Body>
          {vehicles.length === 0 ? (
            <div className="text-center p-4">
              <p>You haven't added any vehicles yet.</p>
              <Button 
                variant="primary" 
                onClick={() => handleShowModal()}
              >
                <BsPlusCircle className="me-2" />
                Add Your First Vehicle
              </Button>
            </div>
          ) : (
            <Table responsive className="vehicle-table">
              <thead>
                <tr>
                  <th>Registration No.</th>
                  <th>Type</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Tax Amount</th>
                  <th>Next Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map(vehicle => (
                  <tr key={vehicle.id}>
                    <td>{vehicle.registrationNumber}</td>
                    <td>{vehicle.type}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.year}</td>
                    <td>₹ {vehicle.tax.amount}</td>
                    <td>
                      {new Date(vehicle.tax.nextDue).toLocaleDateString()}
                      {new Date(vehicle.tax.nextDue) < new Date() && (
                        <span className="badge bg-danger ms-2">Overdue</span>
                      )}
                    </td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleShowModal(vehicle.id)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(vehicle.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., BA 1 CH 2022"
                value={formData.registrationNumber || ''}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Vehicle Type</Form.Label>
              <select
                className="form-select"
                value={formData.type || ''}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <option value="">Select Vehicle Type</option>
                <option value="Car">Car</option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="Truck">Truck</option>
                <option value="Bus">Bus</option>
              </select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Hyundai i10"
                value={formData.model || ''}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="e.g., 2020"
                value={formData.year?.toString() || ''}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                required
              />
            </Form.Group>
            
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default VehicleManagement; 