import registrarVisitaApi from '../api/apivisitas';

const registrarVisita = async (datosVisita) => {
  try {
    // Llamar a la función registrarVisitaApi y manejar la respuesta
    await registrarVisitaApi(datosVisita);
  } catch (error) {
    // Lanzar un nuevo error con un mensaje específico que incluya el mensaje de error original
    throw new Error('Error al registrar la visita: ' + error.message);
  }
};

export default registrarVisita;