import axios from 'axios';

const notification = async (notification, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await axios.post('/api/houses', notification, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};


const notificationService = {
  notification
};

export default notificationService;
