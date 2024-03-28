import axios from 'axios';

const baseUrl = 'http://192.168.1.40:3000'; // Reemplaza con la URL de tu API

const obtenerCarreras = async () => {
  try {
    const response = await axios.get(`${baseUrl}/carreras`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las carreras:', error);
    throw error; // Puedes manejar el error en el componente que llame a esta función
  }
};

export { obtenerCarreras };