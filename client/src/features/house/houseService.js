import axios from 'axios';

const createHouse = async (house, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await axios.post('/api/houses', house, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const updateHouse = async (id, house, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await axios.put(`/api/houses/${id}`, house, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const deleteHouse = async (houseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await axios.delete(`/api/houses/${houseId}`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const getHouse = async () => {
  try {
    const response = await axios.get('/api/houses');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const houseService = {
  createHouse,
  updateHouse,
  deleteHouse,
  getHouse
};

export default houseService;
