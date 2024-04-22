import axios from 'axios';

const createRequest = async (request, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await axios.post('/api/request', request, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const updateRequest = async (id, request, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await axios.put(`/api/request/${id}`, request, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const deleteRequest = async (requestId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await axios.delete(`/api/request/${requestId}`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const getRequest = async () => {
  try {
    const response = await axios.get('/api/request');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const requestService = {
  createRequest,
  updateRequest,
  deleteRequest,
  getRequest
};

export default requestService;
