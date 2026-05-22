import apiClient from "./axiosConfig";

// OBS INGET TESTAT ÄNNU

export const testQuestions = async () => {
    console.log('hej vi kör')
    const response = await apiClient.get('/questions/test');
    return response;
}

export const getQuestions = async (listId) => {
    console.log(listId)
    console.log('get qeustions kör');
  const response = await apiClient.get(`/questions?listId=${listId}`);
  return response.data; 
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

export const deleteQuestion = async (id) => {
  const response = await apiClient.delete(`/questions/${id}`);
  return response.data.data;
}
