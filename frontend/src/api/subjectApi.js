import apiClient from "./axiosConfig";

export const getAllSubjects = async () => {
  const response = await apiClient.get('/subjects/');
  return response.data.data;
}