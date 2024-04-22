import './App.css';
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux"; 
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import LandingPage from './Pages/LandingPage';

import AdminDashboard from './Pages/AdminPage/AdminDashboard';
import BrokerDashboard from './Pages/BrokerPage/BrokerDashboard';
import TenantDashboard from './Pages/TenantPage/TenantDashboard';
import LandlordDashboard from './Pages/LandlordPage/LandlordDashboard';
import HouseList from './Components/HouseList';
import HouseCard from './Components/HouseCard';
import CreateUserPage from './Pages/AdminPage/CreateUserPage'; // Corrected import path
import EditUserPage from './Pages/AdminPage/EditUserPage';
import UserList from './Pages/AdminPage/UserList';
import EditHouse from './Pages/EditHouse';
import CreateHouse from './Pages/CreateHouse';
import DetailHousePage from './Pages/DetailHousePage';
import Bidding from './Pages/TenantPage/Bidding';
import RequestPage from './Pages/RequestPage';
import RequestDetailPage from './Pages/RequestDetailPage';
import ProfilePage from './Pages/ProfilePage';
import SearchForm from './Components/SearchForm';
import RequestComponent from './Components/RequestComponent';





function App() {
  const { user } = useSelector((state) => state.user || {}); 
  console.log(user);
  const role_name = user && user.role ? user.role.role_name : null; 
  console.log(role_name);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <LandingPage />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/adminDashboard' element={<AdminDashboard />} />
        <Route path='/brokerDashboard' element={<BrokerDashboard />} />
        <Route path='/tenantDashboard' element={<TenantDashboard />} />
        <Route path='/landlordDashboard' element={<LandlordDashboard />} />
        <Route path='/list' element={<HouseList />} />
        <Route path='/card' element={<HouseCard />} />
        <Route path="/notification" element={<RequestPage />} />
        <Route path="/notification/:id" element={<RequestDetailPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path="/details/:id" element={<DetailHousePage />} />
        <Route path="/createHouse" element={<CreateHouse />} />
        
 
        <Route path="/createUser" element={<CreateUserPage />} />
        {/* <Route path="/search" element={<SearchForm />} /> */}
        <Route path="/request" element={<RequestComponent />} />

        






           {/* superAdmin authorized */}
        {role_name === "superAdmin" && (
          <Route path="/usersList" element={<UserList />} /> 
        )}
        {role_name === "superAdmin" && (
          <Route path="/createUser" element={<CreateUserPage />} />
        )}
        {role_name === "superAdmin" && (
          <Route path="/usersList/:username" element={<EditUserPage />} />
        )}
        
         
      {/* admin authorized */}
        {role_name === "admin" && (
          <Route path="/usersList" element={<UserList />} /> 
        )}
        {role_name === "admin" && (
          <Route path="/createUser" element={<CreateUserPage />} />
        )}
        {role_name === "admin" && (
          <Route path="/usersList/:username" element={<EditUserPage />} />
        )}


            
        {/* landlord authorization */}
       {role_name === "landlord" && (
          <Route path="/createHouse" element={<CreateHouse />} />
        )}
        {role_name === "landlord" && (
          <Route path="/houseList" element={<LandlordDashboard />} />
        )}
        {role_name === "admin" && (
          <Route path="/houseList/:id" element={<EditHouse />} />
        )}


              {/* broker authorization */}
       {role_name === "broker" && (
          <Route path="/houseList" element={<BrokerDashboard />} />
        )}
        {role_name === "broker" && (
          <Route path="/createHouse" element={<CreateHouse />} />
        )}
        {role_name === "broker" && (
          <Route path="/houseList/:id" element={<EditHouse />} />
        )}
        
     {/* tenant authorization */}
     {role_name === "tenant" && (
          <Route path="/houseList" element={<TenantDashboard />} />
        )}
        {role_name === "tenant" && (
          <Route path="/bidding/:id" element={<Bidding />} />
        )}
        


      </Routes>
    </div>
  );
}

export default App;
