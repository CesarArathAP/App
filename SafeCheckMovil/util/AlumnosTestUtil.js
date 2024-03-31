// util/AlumnosTestUtil.js

import apiGetAlumnos from '../api/api_get_alumnos';

export const obtenerAlumnos = async () => {
  try {
    const response = await apiGetAlumnos.get('/');
    return response.data;
  } catch (error) {
    throw error;
  }
};