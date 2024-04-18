import React from 'react';
import Header from '../../Components/Header';
import HouseList from '../../Components/HouseList';

const LandlordDashboard = () => {
  const isLoggedIn = true; 
  const role = 'Landlord'; 

  return (
    <div>
      {isLoggedIn && role === 'Landlord' && <Header isLoggedIn={isLoggedIn} role={role} />}
      <HouseList />
    </div>
  );
};

export default LandlordDashboard;
