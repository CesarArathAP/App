import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Alert, Platform } from 'react-native';
import { registrarLlamadaAtencion } from '../util/AttentionCallsUtil';
import PushNotification from 'react-native-push-notification';
import notificationsApi from '../api/notificationsApi';

const VerAlumnosScreen = ({ route }) => {
  const { alumno } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [reporteEnviado, setReporteEnviado] = useState(false);
  const [descripcion, setDescripcion] = useState('');

  const handleReportarAlumno = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setReporteEnviado(false); // Restablecer el estado de reporte enviado
    setDescripcion(''); // Limpiar el campo de descripción al cerrar el modal
  };

  const handleSubmitReporte = async () => {
    if (descripcion.trim() === '') {
      Alert.alert('Error', 'La descripción es obligatoria.');
      return;
    }
  
    try {
      // Enviar datos del formulario para registrar la llamada de atención
      await registrarLlamadaAtencion({
        matricula: alumno.matricula,
        nombreCompleto: `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`,
        grupo: alumno.grupo,
        descripcion: descripcion,
      });
  
      // Enviar notificación a la API y mostrarla localmente
      enviarNotificacion(alumno, descripcion);
  
      // Cerrar el modal y mostrar mensaje de éxito
      setModalVisible(false);
      setReporteEnviado(true);
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al registrar la visita. Por favor, inténtalo de nuevo.');
      console.error(error);
    }
  };
  
  const enviarNotificacion = async (alumno, descripcion) => {
    const channelId = 'default-channel-id';
  
    PushNotification.createChannel(
      {
        channelId,
        channelName: 'Notificaciones de Reportes',
        channelDescription: 'Canal para notificaciones de reportes de alumnos',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`Channel '${channelId}' created: ${created}`)
    );
  
    try {
      // Enviar notificación a la API
      await notificationsApi.sendNotification('Reporte de Alumno(a)', `El alumno(a) ${alumno.nombre} ${alumno.apellido_paterno} con matrícula ${alumno.matricula} del grupo ${alumno.grupo} ha sido reportado por ${descripcion}`);
      
      // Mostrar notificación localmente en el dispositivo móvil
      PushNotification.localNotification({
        channelId: channelId,
        title: 'Reporte de Alumno(a)',
        message: `El alumno(a) ${alumno.nombre} ${alumno.apellido_paterno} con matrícula ${alumno.matricula} del grupo ${alumno.grupo} ha sido reportado por ${descripcion}`,
      });
    } catch (error) {
      console.error('Error al enviar o mostrar la notificación:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalles del Alumno</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Matrícula:</Text>
          <Text style={styles.infoValue}>{alumno.matricula}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Nombre:</Text>
          <Text style={styles.infoValue}>{alumno.nombre}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Apellido Paterno:</Text>
          <Text style={styles.infoValue}>{alumno.apellido_paterno}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Apellido Materno:</Text>
          <Text style={styles.infoValue}>{alumno.apellido_materno}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Correo Electrónico:</Text>
          <Text style={styles.infoValue}>{alumno.correo_electronico}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Grupo:</Text>
          <Text style={styles.infoValue}>{alumno.grupo}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>NSS:</Text>
          <Text style={styles.infoValue}>{alumno.nss}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Estado:</Text>
          <Text style={styles.infoValue}>{alumno.estado}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleReportarAlumno} style={styles.reportButton}>
        <Text style={styles.reportButtonText}>Reportar</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Reportar al Alumn(a) {alumno.nombre}</Text>
            <View style={styles.alumnoInfo}>
              <Text style={styles.infoLabel}>Matrícula:</Text>
              <Text style={styles.infoValue}>{alumno.matricula}</Text>
            </View>
            <View style={styles.alumnoInfo}>
              <Text style={styles.infoLabel}>Nombre Completo:</Text>
              <Text style={styles.infoValue}>{alumno.nombre} {alumno.apellido_paterno} {alumno.apellido_materno}</Text>
            </View>
            <View style={styles.alumnoInfo}>
              <Text style={styles.infoLabel}>Grupo:</Text>
              <Text style={styles.infoValue}>{alumno.grupo}</Text>
            </View>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Descripción detallada"
              multiline={true}
              numberOfLines={4}
              value={descripcion}
              onChangeText={setDescripcion}
            />
            <View style={styles.buttonsContainer}>
              <Button title="Cancelar" onPress={handleCloseModal} color="red" />
              <Button title="Enviar" onPress={handleSubmitReporte} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={reporteEnviado}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>¡Alumno Reportado!</Text>
            <Text style={styles.successText}>
              La visita del alumno {alumno.nombre} {alumno.apellido_paterno} {alumno.apellido_materno} ha sido registrada correctamente.
            </Text>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  infoContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    width: '40%',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: 'black',
  },
  infoValue: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  reportButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  reportButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    color: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  successText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  alumnoInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'green',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default VerAlumnosScreen;