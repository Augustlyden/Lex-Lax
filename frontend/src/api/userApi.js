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