import apiClient from "./axiosConfig";

export const getAvatars = async () => {
  const response = await apiClient.get("/avatars");
  
  return response.data.data;
};