// util/VigilanciaLoginController.js

import { loginVigilancia } from '../api/apivigilancia';

const VigilanciaLoginController = {
  handleLogin: async (username, password, navigation) => {
    try {
      const { success, message, error: loginError } = await loginVigilancia(username, password);
      
      if (success) {
        navigation.navigate('VigilanciaScreen', { nombreOficial: message }); // Navegar a VigilanciaScreen con el nombre del oficial
      } else {
        return { success: false, error: loginError }; // Si la autenticación falla, devuelve un objeto con éxito falso y el mensaje de error.
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      return { success: false, error: 'Error de conexión' }; // En caso de error de conexión, devuelve un objeto con éxito falso y un mensaje de error genérico.
    }
  }
};

export default VigilanciaLoginController;