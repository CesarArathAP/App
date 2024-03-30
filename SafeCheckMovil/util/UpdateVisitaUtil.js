import updateVisita from '../api/apiupdatevisita';

const updateVisitaUtil = async (idVisita, nuevaHoraSalida) => {
  try {
    const response = await updateVisita(idVisita, nuevaHoraSalida);
    return response;
  } catch (error) {
    console.error('Error actualizando visita:', error);
    throw error;
  }
};

export default updateVisitaUtil;