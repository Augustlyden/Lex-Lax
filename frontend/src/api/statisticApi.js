import apiClient from "./axiosConfig.js";

export const getAllStats = async (userId) => {
  const response = await apiClient.get('/statistics/', {
    params: { userId }
  });
  return response.data.data;
}

export const updateAndCreateStats = async (userId, listId, correctCount, wrongCount) => {
  const response = await apiClient.post('/statistics/',
    { userId, listId, correctCount, wrongCount }
  );
  return response.data.data;
}

export const getHistory = async (userId, listId) => {
  const response = await apiClient.get('/statistics/history', {
    params: { userId, listId }
  });
  return response.data.data;
}