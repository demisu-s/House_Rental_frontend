import axios from 'axios';



const register = async (userData) => {
  const response = await axios.post('https://house-rental-backend-1-0hiq.onrender.com/api/users/', userData);
  return response.data;
}

const login = async (userData) => {
  const response = await axios.post('https://house-rental-backend-1-0hiq.onrender.com/api/users/login', userData);
  return response.data;
}

const getAllUser = async () => {
  const response = await axios.get('https://house-rental-backend-1-0hiq.onrender.com/api/users/');
  return response.data;
}
const editUsers = async () => {
  const response = await axios.get('https://house-rental-backend-1-0hiq.onrender.com/api/users/+id');
  return response.data;
}
const deleteUser = async () => {
  const response = await axios.get('https://house-rental-backend-1-0hiq.onrender.com/api/users/+id');
  return response.data;
}
const getSingleUser = async (id) => {
  const response = await axios.get('https://house-rental-backend-1-0hiq.onrender.com/api/users/+id');
  return response.data;
}

const logout = () => {
  localStorage.removeItem('user');
}

const authService = {
  register,
  login,
  logout,
  getSingleUser,
  getAllUser,
  editUsers,
  deleteUser,
}

export default authService;
