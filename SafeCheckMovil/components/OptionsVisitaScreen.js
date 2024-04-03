import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import updateVisitaUtil from '../util/UpdateVisitaUtil'; // Importar la función de utilidad
import PushNotification from 'react-native-push-notification'; // Importar la biblioteca de notificaciones
import notificationsApi from '../api/notificationsApi';

const OptionsVisitaScreen = ({ route, navigation }) => {
  const [horaSalida, setHoraSalida] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const obtenerHoraActual = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  useEffect(() => {
    setHoraSalida(obtenerHoraActual());
  }, []);

  const onChangeHoraSalida = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowTimePicker(false);
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    setHoraSalida(`${formattedHours}:${formattedMinutes} ${ampm}`);
  };

  const handleUpdateHoraSalida = async () => {
    try {
      // Actualiza la hora de salida de la visita
      await updateVisitaUtil(route.params.visita.id, horaSalida);
  
      // Crear mensaje para la notificación
      const notificationMessage = `Nombre del visita: ${route.params.visita.visitante}\nSu hora de salida fue a las ${horaSalida} horas`;
  
      // Enviar notificación
      PushNotification.localNotification({
        channelId: 'default-channel-id',
        title: 'La Visita salió de la Universidad',
        message: notificationMessage,
      });
  
      // Envía la notificación a la API
      await notificationsApi.sendNotification('La Visita salió de la Universidad', notificationMessage);
  
      Alert.alert('Éxito', 'La hora de salida se actualizó correctamente', [
        { text: 'OK', onPress: () => navigation.navigate('VerVisitas', { refresh: true }) }
      ]);
    } catch (error) {
      console.error('Error al actualizar la visita:', error);
      Alert.alert('Error', 'Ocurrió un error al actualizar la visita');
    }
  };  

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            {route.params.visita.fotografia && (
              <Image
                source={{ uri: route.params.visita.fotografia }}
                style={styles.image}
              />
            )}
          </TouchableOpacity>

          <Text style={styles.label}>Nombre:</Text>
          <Text style={[styles.input, styles.disabled]}>{route.params.visita.visitante}</Text>
          
          <Text style={styles.label}>Motivo:</Text>
          <Text style={[styles.input, styles.disabled]}>{route.params.visita.motivo}</Text>
          
          <Text style={styles.label}>Área:</Text>
          <Text style={[styles.input, styles.disabled]}>{route.params.visita.ubicacion}</Text>
          
          <Text style={styles.label}>Fecha:</Text>
          <Text style={[styles.input, styles.disabled]}>{route.params.visita.registro.fecha}</Text>
          
          <Text style={styles.label}>Hora de entrada:</Text>
          <Text style={[styles.input, styles.disabled]}>{route.params.visita.registro.hora_entrada}</Text>
          
          <Text style={styles.label}>Hora de salida:</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
            <Text style={{ color: 'black' }}>{horaSalida}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeHoraSalida}
            />
          )}
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleUpdateHoraSalida}>
          <Text style={styles.buttonText}>Actualizar hora de salida</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <Image
              source={{ uri: route.params.visita.fotografia }}
              style={styles.modalImage}
            />
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    marginTop: 10,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
    marginLeft: 10,
    marginRight: 10,
  },
  disabled: {
    opacity: 0.5,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default OptionsVisitaScreen;