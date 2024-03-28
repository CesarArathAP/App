// api/apivigilancia.js

const API_URL = 'http://192.168.1.40:3000'; // Reemplaza con la dirección de tu servidor

const loginVigilancia = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/vigilancia/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message }; // Se agrega el mensaje de bienvenida
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('Error de conexión:', error);
    return { success: false, error: 'Error de conexión' };
  }
};

export { loginVigilancia };