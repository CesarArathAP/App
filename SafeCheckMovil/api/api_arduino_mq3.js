// api/api_arduino_mq3.js

import axios from 'axios';

const obtenerDatosSensorMQ3 = async () => {
  try {
    const response = await axios.get('http://192.168.1.40:3000/arduino-mq3'); // 130.131.4.148 o 192.168.1.40
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud al servidor:', error);
    throw error;
  }
};

export default obtenerDatosSensorMQ3;