import apiClient from "./axiosConfig";

export const getQuestions = async (listId) => {
  const response = await apiClient.get(`/questions?listId=${listId}`);
  return response.data.data; 
};


// ALLT HÄR UNDER ÄR OTESTAT - BARA FÖRSLAG PÅ API-FUNKTIONER

export const createQuestion = async (questionText, listId) => {
  const response = await apiClient.post('/questions/', { questionText, listId });
  return response.data.data;
}
export const createQuestions = async (listId, questions) => {
const response = await apiClient.post("/questions", {listId, questions,});
return response.data.data;
}

export const updateQuestion = async (id, questionText) => {
  const response = await apiClient.put(`/questions/${id}`, { questionText });
  return response.data.data;
}

export const updateQuestions = async (id, question, answer) => {
  const response = await apiClient.put(`/questions/${id}`, {
    question,
    answer
  });

  return response.data.data;
}

export const deleteQuestion = async (id) => {
  const response = await apiClient.delete(`/questions/${id}`);
  return response.data.data;
}
