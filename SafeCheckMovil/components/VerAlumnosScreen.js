import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

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
  };

  const handleSubmitReporte = () => {
    // Aquí puedes implementar la lógica para enviar el reporte
    console.log('Reporte enviado:');
    console.log('Descripción:', descripcion);
    setModalVisible(false);
    setReporteEnviado(true);
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
        <TouchableOpacity onPress={handleReportarAlumno} style={styles.reportButton}>
          <Text style={styles.reportButtonText}>Reportar Alumno</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Reportar Alumno</Text>
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
              style={[styles.descriptionInput, {color: 'black'}]}
              placeholder="Descripción detallada"
              multiline={true}
              numberOfLines={4}
              onChangeText={text => setDescripcion(text)}
              placeholderTextColor="black"
            />
            <View style={styles.buttonsContainer}>
              <Button title="Cancelar" onPress={handleCloseModal} color="red" />
              <Button title="Enviar Reporte" onPress={handleSubmitReporte} />
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
        <Text style={styles.modalHeader}>¡Reporte Enviado!</Text>
            <Text style={styles.successText}>
            El alumno {alumno.nombre} {alumno.apellido_paterno} {alumno.apellido_materno} fue reportado correctamente.
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
    color: 'black', // Texto en negro
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
    color: 'black', // Texto en negro
  },
  infoValue: {
    flex: 1,
    fontSize: 16,
    color: 'black', // Texto en negro
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
    color: 'black', // Texto en negro
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  successText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black', // Texto en negro
  },
  alumnoInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    backgroundColor: 'green',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    alignSelf: 'center', // Esto centra el botón horizontalmente en su contenedor
    marginTop: 20, // Ajusta el margen superior según sea necesario
  },    
});

export default VerAlumnosScreen;