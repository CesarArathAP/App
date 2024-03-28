import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { filterAlumnos } from '../util/AlumnosScreenController';

const AlumnosScreen = ({ route }) => {
  const { alumnos } = route.params;
  const [searchText, setSearchText] = useState('');
  const [filteredAlumnos, setFilteredAlumnos] = useState(alumnos);
  const navigation = useNavigation();

  const handleVerAlumno = (alumno) => {
    navigation.navigate('VerAlumnosScreen', { alumno }); // Navegar a VerAlumnosScreen y pasar el alumno como parámetro
  };

  const renderAlumnos = () => {
    if (filteredAlumnos.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay alumnos para mostrar</Text>
        </View>
      );
    }

    return filteredAlumnos.map((alumno, index) => (
      <TouchableOpacity key={index} style={styles.cardContainer} onPress={() => handleVerAlumno(alumno)}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Matrícula: {alumno.matricula}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoText}>Nombre: {alumno.nombre}</Text>
            <Text style={styles.infoText}>Apellido Paterno: {alumno.apellido_paterno}</Text>
            <Text style={styles.infoText}>Apellido Materno: {alumno.apellido_materno}</Text>
            <Text style={styles.infoText}>Correo Electrónico: {alumno.correo_electronico}</Text>
            <Text style={styles.infoText}>Grupo: {alumno.grupo}</Text>
            <Text style={styles.infoText}>NSS: {alumno.nss}</Text>
            <Text style={styles.infoText}>Estado: {alumno.estado}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por matrícula, nombre, grupo, etc."
          placeholderTextColor="black"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            setFilteredAlumnos(filterAlumnos(alumnos, text));
          }}
        />
      </View>
      {renderAlumnos()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 10, // Ajuste para el espacio debajo del encabezado de navegación
  },
  searchBarContainer: {
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#007bff',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    color: 'black',
    fontSize: 16,
  },
  cardContainer: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    padding: 15,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    color: 'black',
  },
  info: {
    marginTop: 10,
  },
  infoText: {
    marginBottom: 5,
    color: 'black',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});

export default AlumnosScreen;