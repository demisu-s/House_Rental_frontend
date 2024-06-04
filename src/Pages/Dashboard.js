import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { fetchRole } from '../redux/roleSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role.role);
  const status = useSelector((state) => state.role.status);
  const error = useSelector((state) => state.role.error);
  const isSuccess = useSelector((state) => state.auth.isSuccess);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (status === 'idle' && isSuccess) {
      dispatch(fetchRole());
    }
  }, [status, dispatch, isSuccess]);

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
         <Link className=' px-2 py-1 rounded-sm bg-purple-700 text-white' to="/login">Login</Link> again
      </div>
      }
    </div>
    
  );
};

export default Dashboard;
