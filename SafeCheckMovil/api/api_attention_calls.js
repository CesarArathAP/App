// api/api_attention_calls.js

import axios from 'axios';

const BASE_URL = 'http://192.168.1.40:3000'; // Ajusta la URL base según sea necesario

// Función para crear una nueva llamada de atención
export const createAttentionCall = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/attentioncalls`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};