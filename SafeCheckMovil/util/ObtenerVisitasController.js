// util/ObtenerVisitasController.js
import axios from 'axios';
import { ver_visitas } from '../api/ver_visitas_api';

const obtenerVisitas = async () => {
  try {
    const response = await axios.get(ver_visitas);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las visitas:', error.message);
    throw new Error('No se pudieron obtener las visitas');
  }
};

export default obtenerVisitas;