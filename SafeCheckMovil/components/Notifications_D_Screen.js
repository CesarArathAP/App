import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';

const Notification_D_Screen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      PushNotification.getDeliveredNotifications((allNotifications) => {
        // Filtrar las notificaciones que tienen el título deseado
        const filteredNotifications = allNotifications.filter(notification => notification.title === 'Alumnos(a) reportado a la hora de ingresar a la universidad');

        // Formatear las notificaciones
        const formattedNotifications = filteredNotifications.map((notification, index) => ({
          id: notification.identifier || index.toString(),
          title: notification.title,
          message: notification.body,
        }));

        // Actualizar el estado con las notificaciones filtradas
        setNotifications(formattedNotifications);
      });
    };

    loadNotifications();

    return () => {}; // No hacer nada en el cleanup
  }, []);

  const handleOk = (notificationId) => {
    console.log(`Notificación con ID ${notificationId} marcada como OK`);
    // Mostrar alerta al presionar OK
    showAlert();
  };

  const handleDelete = (notificationId) => {
    console.log(`Notificación con ID ${notificationId} eliminada`);

    // Eliminar la notificación localmente
    PushNotification.cancelLocalNotification(notificationId);

    // Actualizar el estado eliminando la notificación
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== notificationId));
  };

  const showAlert = () => {
    Alert.alert(
      'Seguimiento de advertencia',
      'Ya se está dando seguimiento a su advertencia.',
      [
        { text: 'Cerrar', onPress: () => console.log('Alert closed') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notificaciones de Alumnos Reportados</Text>
      <ScrollView style={styles.notificationList}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationMessage}>{notification.message}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.okButton]}
                onPress={() => handleOk(notification.id)}
              >
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(notification.id)}
              >
                <Text style={styles.buttonText}>Borrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  notificationList: {
    flex: 1,
  },
  notificationItem: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  notificationMessage: {
    fontSize: 14,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  okButton: {
    backgroundColor: '#28a745',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Notification_D_Screen;