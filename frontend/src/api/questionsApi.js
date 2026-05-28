import apiClient from "./axiosConfig";

// Note on response: Axios wraps the server response in a "data" property.
// The second ".data" is the actual payload returned by our custom backend API wrapper.

export const getQuestions = async (listId) => {
    const response = await apiClient.get(`/questions?listId=${listId}`);
    return response.data.data; 
};

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
