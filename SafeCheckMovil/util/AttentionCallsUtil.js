// util/AttentionCallsUtil.js

import { createAttentionCall } from '../api/api_attention_calls';

// Función para enviar datos del formulario a la API y registrar una nueva llamada de atención
export const registrarLlamadaAtencion = async (datosFormulario) => {
  try {
    // Crear la llamada de atención utilizando la API
    const response = await createAttentionCall(datosFormulario);
    return response; // Puedes manipular la respuesta si es necesario
  } catch (error) {
    throw error; // Puedes manejar el error aquí o dejar que se propague
  }
};