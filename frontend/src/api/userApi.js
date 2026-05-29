import apiClient from "./axiosConfig";

// Note on response: Axios wraps the server response in a "data" property.
// The second ".data" is the actual payload returned by our custom backend API wrapper.

export const getUsers = async () => {
  const response = await apiClient.get('/users/');
  return response.data.data; 
};

export const getUserById = async (id) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data.data;
};

export const createApiUser = async (username, profileImg) => {
  const response = await apiClient.post('/users/', { username, profileImg });
  return response.data.data;
}

export const updateApiUser = async (id, username, profileImg) => {
  const response = await apiClient.put(`/users/${id}`, { username, profileImg });
  return response.data.data;
}

export const deleteApiUser = async (id) => {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data.data;
}