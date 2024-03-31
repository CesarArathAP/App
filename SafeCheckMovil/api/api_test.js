import axios from 'axios';

const apiTest = axios.create({
  baseURL: 'http://192.168.1.40:3000/api/test', // Reemplaza 'tu_servidor' por la dirección de tu servidor
  headers: {
    'Content-type': 'application/json',
  },
});

export default apiTest;