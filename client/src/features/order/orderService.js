import axios from "axios";

export const createOrderApi = async (order, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    const response = await axios.post("/create-order-endpoint", order, config); // Replace "/create-order-endpoint" with the actual endpoint
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllOrderApi = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    const response = await axios.get("/get-all-order-endpoint", config); // Replace "/get-all-order-endpoint" with the actual endpoint
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const editOrderApi = async ({ id, newOrder, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    const response = await axios.put(`/order/${id}`, newOrder, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteOrderApi = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    const response = await axios.delete(`/order/${id}`, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
