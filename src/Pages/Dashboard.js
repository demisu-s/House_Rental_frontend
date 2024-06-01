import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

const Dashboard = () => {
  const [role, setRole] = useState("")
  return (
    <div>
      <Header isLoggedIn={true} />

      {
      role === "Tenant" ?
      <table>
        <thead>
          <th>Total Houses</th>
          <th>Total Tenants</th>
        </thead>
        <tbody>
          <td>100</td>
          <td>50</td>
        </tbody>
      </table>
      : role === "Broker" ?
      <div>
        <h2>Brokers dashboard</h2>
      </div>
      : role === "Landlord" ?
      <div>
        <h2>Landlords dashboard</h2>
      </div>
      : role === "Admin" ?
      <div>
        <h2>Admin dashboard</h2>
      </div>
      :
      <div>
         <Link className=' px-2 py-1 rounded-sm bg-purple-700 text-white' to="/login">Login</Link> to see your saved info
      </div>
      }
    </div>
    
  );
};

export default Dashboard;
