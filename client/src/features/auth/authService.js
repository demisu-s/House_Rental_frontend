import axios from 'axios';

const baseURL = 'https://house-rental-backend-1-0hiq.onrender.com/api/users/';

const register = async (userData) => {
  const response = await axios.post(`${baseURL}`, userData);
  return response.data;
}

const login = async (userData) => {
  const response = await axios.post(`${baseURL}login`, userData);
  return response.data;
}

const getSingleUser = async (id) => {
  const response = await axios.get(`${baseURL}${id}`);
  return response.data;
}

const logout = () => {
  localStorage.removeItem('user');
}

const authService = {
  register,
  login,
  logout,
  getSingleUser
}

export default authService;
