import axios from 'axios';

const apiUrl = 'http://192.168.1.40:3000/registrar-visita';

const registrarVisitaApi = async (datosVisita) => {
  try {
    const response = await axios.post(apiUrl, datosVisita);

    if (response.status !== 200) {
      throw new Error('Error al registrar la visita');
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default registrarVisitaApi;