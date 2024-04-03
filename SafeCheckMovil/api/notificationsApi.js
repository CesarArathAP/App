import axios from 'axios';

const notificationsApi = {
  async sendNotification(title, message) {
    try {
      // Enviar la notificación al servidor API con el mismo título y mensaje
      const response = await axios.post('http://192.168.1.40:3000/notificaciones', {
        title: title,
        message: message,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default notificationsApi;