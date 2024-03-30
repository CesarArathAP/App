import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import obtenerVisitas from '../util/ObtenerVisitasController';

const VerVisitasScreen = ({ route }) => {
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [visitasPerPage] = useState(10);
  const navigation = useNavigation();

  useEffect(() => {
    cargarVisitas();
    // Escuchar el parámetro refresh al cargar el componente
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params && route.params.refresh) {
        // Si se solicita un refrescamiento, cargar las visitas nuevamente
        cargarVisitas();
      }
    });

    return unsubscribe;
  }, [navigation, route.params]);

  const cargarVisitas = async () => {
    try {
      const data = await obtenerVisitas();
      setVisitas(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar las visitas:', error.message);
      // Manejar el error
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    setCurrentPage(1); // Reiniciar la página cuando se realiza una búsqueda
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

  const renderVisita = ({ item }) => (
    <View style={styles.visitaCard}>
      {item.fotografia && (
        <Image source={{ uri: item.fotografia }} style={styles.foto} />
      )}
      <Text style={styles.visitaText}>Nombre: {item.visitante}</Text>
      <Text style={styles.visitaText}>Motivo: {item.motivo}</Text>
      <Text style={styles.visitaText}>Área: {item.ubicacion}</Text>
      <Text style={styles.visitaText}>Fecha: {item.registro.fecha}</Text>
      <Text style={styles.visitaText}>Hora de entrada: {item.registro.hora_entrada}</Text>
      <Text style={styles.visitaText}>Hora de salida: {item.registro.hora_salida}</Text>
      <TouchableOpacity style={styles.opcionesButton} onPress={() => navigation.navigate('OptionsVisita', { visita: item })}>
        <Text style={styles.opcionesButtonText}>Ver</Text>
      </TouchableOpacity>
    </View>
  );

  const startIndex = (currentPage - 1) * visitasPerPage;
  const endIndex = startIndex + visitasPerPage;
  const paginatedVisitas = filteredVisitas.slice(startIndex, endIndex);

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
        data={paginatedVisitas}
        renderItem={renderVisita}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
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
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 0.5,
    marginHorizontal: 6,
  },
  visitaText: {
    color: 'black',
    fontSize: 12,
    marginBottom: 5,
  },
  foto: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 10,
  },
  opcionesButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  opcionesButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
    color: 'black'
  },
});

export default VerVisitasScreen;