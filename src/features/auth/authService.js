import axios from 'axios';

const register = async (userData) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users/', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users/', userData);
    
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

const logout = async () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout
};

export default authService;
