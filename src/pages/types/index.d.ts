// Type declarations for components/pages that haven't been created yet
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module './pages/VehicleList' {
  import React from 'react';
  const VehicleList: React.FC;
  export default VehicleList;
}

declare module './pages/TaxPayment' {
  import React from 'react';
  const TaxPayment: React.FC;
  export default TaxPayment;
}

declare module './pages/TaxHistory' {
  import React from 'react';
  const TaxHistory: React.FC;
  export default TaxHistory;
}

declare module './pages/Profile' {
  import React from 'react';
  const Profile: React.FC;
  export default Profile;
} 