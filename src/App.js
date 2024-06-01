import './App.css';
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CreateHouse from "./Pages/CreateHouse"
import LandingPage from './LandingPage';


function App() {
  return (
    <div className="App">
      
      
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/createhouse' element={<CreateHouse />} />
        
      </Routes>
    </div>
  );
}

export default App;
