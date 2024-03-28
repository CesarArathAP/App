// api/apiconexion.js

const API_URL = 'http://192.168.1.40:3000/docentes/login';

const login = async (username, password) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message, carreras: data.carreras }; // Se agrega carreras al objeto de retorno
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('Error de conexión:', error);
    return { success: false, error: 'Error de conexión' };
  }
};

export { login };