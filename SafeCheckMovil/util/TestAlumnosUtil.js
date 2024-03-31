import apiTest from '../api/api_test';

export const enviarResultadoPrueba = async (formData) => {
  try {
    const response = await apiTest.post('/', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};