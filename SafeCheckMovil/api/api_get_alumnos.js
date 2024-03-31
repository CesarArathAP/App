// api/api_get_alumnos.js

import axios from 'axios';

const apiGetAlumnos = axios.create({
  baseURL: 'http://192.168.1.40:3000/api/get-alumnos',
  headers: {
    'Content-type': 'application/json',
  },
});

export default apiGetAlumnos;