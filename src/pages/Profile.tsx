import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import '../styles/Profile.css';

interface ProfileProps {
  userName: string;
}

// Mock user data template (will be filled with the logged-in user name)
const userDataTemplate = {
  id: 1,
  email: 'user@example.com',
  phone: '+977 9801234567',
  address: 'Kathmandu, Nepal',
  licenseNumber: 'NPL123456789',
  joinDate: '2022-05-15',
  profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
};

const Profile: React.FC<ProfileProps> = ({ userName }) => {
  // Initialize user data with the passed userName
  const userData = React.useMemo(() => ({
    ...userDataTemplate,
    fullName: userName,
    email: userName.toLowerCase().replace(' ', '.') + '@example.com'
  }), [userName]);

  const [isEditing, setIsEditing] = React.useState(false);
  const [fullName, setFullName] = React.useState(userData.fullName);
  const [email, setEmail] = React.useState(userData.email);
  const [phone, setPhone] = React.useState(userData.phone);
  const [address, setAddress] = React.useState(userData.address);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, here you would save the updated profile
    setIsEditing(false);
  };
  
  return (
    <Container className="page-container">
      <h2 className="page-title">My Profile</h2>
      
      <Row>
        <Col md={5} className="mb-4">
          <Card className="profile-sidebar mb-4">
            <Card.Body className="text-center">
              <div className="profile-image-container mb-3">
                <img 
                  src={userData.profileImage} 
                  alt="Profile" 
                  className="profile-image" 
                />
              </div>
              <h3 className="profile-name">{userData.fullName}</h3>
              <p className="profile-license">License: {userData.licenseNumber}</p>
              <p className="profile-member-since">Member since: {new Date(userData.joinDate).toLocaleDateString()}</p>
              {!isEditing && (
                <Button 
                  variant="outline-primary" 
                  className="w-100"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={7}>
          <Card>
            <Card.Body>
              {isEditing ? (
                <Form onSubmit={handleSubmit}>
                  <h3 className="mb-4">Edit Profile</h3>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </Form.Group>
                  
                  <div className="d-flex gap-2">
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      type="button"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <h3 className="mb-4">Profile Details</h3>
                  
                  <div className="profile-details">
                    <div className="profile-detail-item">
                      <div className="profile-detail-label">Full Name</div>
                      <div className="profile-detail-value">{userData.fullName}</div>
                    </div>
                    
                    <div className="profile-detail-item">
                      <div className="profile-detail-label">Email</div>
                      <div className="profile-detail-value">{userData.email}</div>
                    </div>
                    
                    <div className="profile-detail-item">
                      <div className="profile-detail-label">Phone</div>
                      <div className="profile-detail-value">{userData.phone}</div>
                    </div>
                    
                    <div className="profile-detail-item">
                      <div className="profile-detail-label">Address</div>
                      <div className="profile-detail-value">{userData.address}</div>
                    </div>
                    
                    <div className="profile-detail-item">
                      <div className="profile-detail-label">License Number</div>
                      <div className="profile-detail-value">{userData.licenseNumber}</div>
                    </div>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile; 