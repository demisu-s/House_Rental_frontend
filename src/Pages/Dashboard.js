
import React from 'react';
import Header from '../Components/Header';

const Dashboard = () => {
  return (
    <div>
      <Header isLoggedIn={true} />
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
    </div>
  );
};

export default Dashboard;
