import registrarVisitaApi from '../api/apivisitas';

const registrarVisita = async (datosVisita) => {
  try {
    await registrarVisitaApi(datosVisita);
  } catch (error) {
    throw new Error('Error al registrar la visita: ' + error.message);
  }
};

export default registrarVisita;