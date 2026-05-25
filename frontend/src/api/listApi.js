import apiClient from "./axiosConfig";

export const createList = async (listData) => {
  const response = await apiClient.post("/lists", listData);
return response.data.data;
};

export const deleteList = async (id) => {
  const response = await apiClient.delete(`/lists/${id}`);
  return response.data;
}