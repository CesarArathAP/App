import axios from 'axios';

const apiUrl = 'http://192.168.1.40:3000/visitas';

const registrarVisitaApi = async (datosVisita) => {
  try {
    const response = await axios.post(apiUrl, datosVisita);

    // Verificar si el código de estado es 200
    if (response.status === 200) {
      // La solicitud se completó correctamente
      return response.data;
    } else {
      // La solicitud falló, lanzar un error
      throw new Error('Error al registrar la visita: Código de estado ' + response.status);
    }
  } catch (error) {
    // Capturar cualquier error de red u otros errores
    throw new Error('Error al registrar la visita: ' + error.message);
  }
};

export default registrarVisitaApi;