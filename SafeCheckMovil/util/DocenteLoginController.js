// util/DocenteLoginController.js

import { login } from '../api/apiconexion';

const DocenteLoginController = {
  handleLogin: async (username, password) => {
    try {
      const { success, message, carreras, error: loginError } = await login(username, password);
      
      if (success) {
        return { success: true, message, carreras }; // Se agrega carreras al objeto de retorno si la autenticación es exitosa
      } else {
        return { success: false, error: loginError }; // Si la autenticación falla, se devuelve un objeto con éxito falso y el mensaje de error.
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      return { success: false, error: 'Error de conexión' }; // En caso de error de conexión, se devuelve un objeto con éxito falso y un mensaje de error genérico.
    }
  }
};

export default DocenteLoginController;