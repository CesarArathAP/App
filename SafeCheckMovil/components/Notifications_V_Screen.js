import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import PushNotification from 'react-native-push-notification';

const Notifications_V_Screen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      PushNotification.getDeliveredNotifications((notifications) => {
        const filteredNotifications = notifications.filter(notification => notification.title && notification.body);
        const formattedNotifications = filteredNotifications.map((notification, index) => ({
          id: notification.identifier || index.toString(), // Usar el índice si no hay identificador
          title: notification.title,
          message: notification.body,
        }));
        setNotifications(formattedNotifications);
      });
    };

    loadNotifications();

    return () => {}; // No hacer nada en el cleanup
  }, []);

  const handleOk = (notificationId) => {
    console.log(`Notificación con ID ${notificationId} marcada como OK`);
    // Aquí puedes realizar cualquier acción adicional
  };

  const handleDelete = (notificationId) => {
    console.log(`Notificación con ID ${notificationId} eliminada`);

    // Eliminar la notificación localmente
    PushNotification.cancelLocalNotification(notificationId);

    // Actualizar el estado eliminando la notificación
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== notificationId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historial de Notificaciones</Text>
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
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
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
    backgroundColor: 'green',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Notifications_V_Screen;
