import messaging from '@react-native-firebase/messaging';

// Obtener el token de registro del dispositivo
async function getToken() {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log('FCM Token:', fcmToken);
    // Aquí puedes enviar el token al servidor para almacenarlo y usarlo para enviar notificaciones.
    // Por ejemplo, puedes almacenarlo en la base de datos Firestore o Realtime Database.
  } else {
    console.log('No se pudo obtener el token de FCM');
  }
}

// Escuchar cambios en el token de registro del dispositivo
messaging().onTokenRefresh((token) => {
  console.log('FCM Token actualizado:', token);
  // Aquí puedes enviar el nuevo token al servidor para actualizarlo.
});

export { getToken };