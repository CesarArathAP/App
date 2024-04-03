import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Image, Modal, Button } from 'react-native';
import obtenerVisitas from '../util/ObtenerVisitasController';
import PushNotification from 'react-native-push-notification';
import notificationsApi from '../api/notificationsApi';

const VisitasScreen_D = () => {
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [visitasPerPage] = useState(10);
  const [selectedVisita, setSelectedVisita] = useState(null);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportDescription, setReportDescription] = useState('');
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    cargarVisitas();
  }, []);

  const cargarVisitas = async () => {
    try {
      const data = await obtenerVisitas();
      const visitasOrdenadas = data.sort((a, b) => new Date(b.registro.fecha) - new Date(a.registro.fecha));
      setVisitas(visitasOrdenadas);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar las visitas:', error.message);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleReportarVisita = (visita) => {
    setSelectedVisita(visita);
    setReportModalVisible(true);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setImageModalVisible(true);
  };

  const handleCancelarReporte = () => {
    setReportModalVisible(false);
    setReportDescription('');
  };

  const sendNotification = async () => {
    try {
      // Enviar notificación local
      PushNotification.localNotification({
        channelId: 'default-channel-id',
        title: 'Visita Reportada',
        message: `${selectedVisita.visitante} como visita a la Universidad ha sido reportada por ${reportDescription}`,
        smallIcon: 'ic_notification',
      });
  
      // Enviar notificación a la API
      await notificationsApi.sendNotification('Visita Reportada', `${selectedVisita.visitante} como visita a la Universidad ha sido reportada por ${reportDescription}`);
    } catch (error) {
      console.error('Error al enviar notificación a la API:', error.message);
    }
  };  

  const filteredVisitas = visitas.filter((visita) => {
    return (
      visita.visitante.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visita.ubicacion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visita.registro.fecha.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visita.registro.hora_entrada.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visita.registro.hora_salida.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const startIndex = (currentPage - 1) * visitasPerPage;
  const endIndex = Math.min(startIndex + visitasPerPage, filteredVisitas.length);
  const visitasPaginadas = filteredVisitas.slice(startIndex, endIndex);

  const renderVisita = ({ item }) => (
    <TouchableOpacity style={styles.visitaCard} onPress={() => handleReportarVisita(item)}>
      <View style={styles.visitaCardContent}>
        {item.fotografia && (
          <TouchableOpacity onPress={() => handleImageClick(item.fotografia)}>
            <Image source={{ uri: item.fotografia }} style={styles.foto} />
          </TouchableOpacity>
        )}
        <View>
          <Text style={styles.visitaText}>Nombre: {item.visitante}</Text>
          <Text style={styles.visitaText}>Motivo: {item.motivo}</Text>
          <Text style={styles.visitaText}>Área: {item.ubicacion}</Text>
          <Text style={styles.visitaText}>Fecha: {item.registro.fecha}</Text>
          <Text style={styles.visitaText}>Hora de entrada: {item.registro.hora_entrada}</Text>
          <Text style={styles.visitaText}>Hora de salida: {item.registro.hora_salida}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const nextPage = () => {
    if (endIndex < filteredVisitas.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar visita..."
        onChangeText={handleSearch}
        value={searchQuery}
        placeholderTextColor="black"
      />
      <FlatList
        data={visitasPaginadas}
        renderItem={renderVisita}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.pagination}>
        <TouchableOpacity style={styles.paginationButton} onPress={prevPage} disabled={currentPage === 1}>
          <Text style={styles.paginationButtonText}>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>Página {currentPage}</Text>
        <TouchableOpacity style={styles.paginationButton} onPress={nextPage} disabled={endIndex >= filteredVisitas.length}>
          <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={reportModalVisible}
        onRequestClose={() => setReportModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {selectedVisita && (
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedVisita.fotografia }} style={styles.fotoModal} />
              <Text style={styles.visitaText}>Nombre: {selectedVisita.visitante}</Text>
              <Text style={styles.visitaText}>Motivo: {selectedVisita.motivo}</Text>
              <Text style={styles.visitaText}>Área: {selectedVisita.ubicacion}</Text>
              <Text style={styles.visitaText}>Fecha: {selectedVisita.registro.fecha}</Text>
              <Text style={styles.visitaText}>Hora de entrada: {selectedVisita.registro.hora_entrada}</Text>
              <Text style={styles.visitaText}>Hora de salida: {selectedVisita.registro.hora_salida}</Text>
              <TextInput
                style={styles.reportInput}
                placeholder="Descripción del reporte..."
                onChangeText={(text) => setReportDescription(text)}
                value={reportDescription}
                multiline={true}
              />
              <View style={styles.modalButtonsContainer}>
                <Button title="Cancelar" onPress={handleCancelarReporte} />
                <Button title="Enviar Reporte" onPress={() => { handleCancelarReporte(); sendNotification(); }} />
              </View>
            </View>
          )}
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      >
      <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={() => setImageModalVisible(false)}>
        <View style={styles.modalContentFoto}>
          <Image source={{ uri: selectedImage }} style={styles.fotoModal_01} />
        </View>
      </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  visitaCard: {
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
  visitaCardContent: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  visitaText: {
    color: 'black',
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 10
  },
  foto: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  paginationButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pageNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalContentFoto: {
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  fotoModal: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
    borderRadius: 10,
  },
  fotoModal_01: {
    width: '100%',
    height: 800,
    resizeMode: 'contain',
    marginBottom: 10,
    borderRadius: 10,
  },
  reportInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
    width: '100%',
    minHeight: 100,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
});

export default VisitasScreen_D;
