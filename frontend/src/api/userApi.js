import apiClient from "./axiosConfig";

export const getUsers = async () => {
  const response = await apiClient.get('/users/');
  // Eftersom din interceptor returnerar error.response.data vid fel,
  // så antar vi att lyckade anrop returnerar hela response-objektet där vi vill ha .data
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