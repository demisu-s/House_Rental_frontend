import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { fetchRole } from '../features/auth/roleSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role.role);
  const status = useSelector((state) => state.role.status);
  const error = useSelector((state) => state.role.error);
  const isSuccess = useSelector((state) => state.auth.isSuccess);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (status === 'idle' && isSuccess && user) {
      dispatch(fetchRole(user.id));
    }
  }, [status, dispatch, isSuccess, user]);

  if(!isSuccess) {
    return (
      <div>
        <Header isLoggedIn={false} />
        <div>
          <Link className='px-2 py-1 rounded-sm bg-purple-700 text-white' to='/login'>Login</Link> to see your saved info
        </div>
      </div>
    )
  }

  if(status === 'loading') {
    return <div>Loading...</div>;
  }

  if(status === 'failed') {
    return <div>Error: {error} </div>;
  }

  return (
    <div>
      <Header isLoggedIn={true} />

      {
      role === "Tenant" ?
      <div>
        <h2 className="text-2xl font-bold">Tenant Dashboard</h2>
        <table className="mt-4 w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Your Favorites</th>
              <th className="border px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">House number 1</td>
              <td className="border px-4 py-2">Details about house number 1...</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">House number 2</td>
              <td className="border px-4 py-2">Details about house number 2...</td>
            </tr>
          </tbody>
        </table>
      </div>
      : role === "Broker" ?
      <div>
        <h2 className="text-2xl font-bold">Broker Dashboard</h2>
        <div className="mt-4">Welcome, {user.name}. Here are your listings.</div>
      </div>
      : role === "Landlord" ?
      <div>
        <h2 className="text-2xl font-bold">Landlord Dashboard</h2>
        <div className="mt-4">Welcome, {user.name}. Here are your properties.</div>
      </div>
      : role === "Admin" ?
      <div>
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">User Statistics</h3>
          <ul className="list-disc list-inside">
            <li>Total Users: 1000</li>
            <li>Active Users: 800</li>
            <li>Inactive Users: 200</li>
          </ul>
          <h3 className="text-xl font-semibold mt-4">Site Performance</h3>
          <ul className="list-disc list-inside">
            <li>Page Views Today: 1500</li>
            <li>Unique Visitors Today: 900</li>
            <li>Server Uptime: 99.9%</li>
          </ul>
          <h3 className="text-xl font-semibold mt-4">Recent Activities</h3>
          <ul className="list-disc list-inside">
            <li>User JohnDoe added a new listing</li>
            <li>User JaneDoe updated his profile</li>
            <li>Server maintenance completed successfully</li>
          </ul>
        </div>
      </div>
      :
      <div>
         <Link className=' px-2 py-1 rounded-sm bg-purple-700 text-white' to="/login">Login</Link> again
      </div>
      }
    </div>
    
  );
};

export default Dashboard;
