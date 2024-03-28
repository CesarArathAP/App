import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const AlumnosCarrerasScreen = ({ route }) => {
  const { alumnos } = route.params;

  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 10; // Número de alumnos por página

  const renderAlumno = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Matrícula:</Text>
        <Text style={styles.value}>{item.matricula}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{`${item.nombre} ${item.apellido_paterno} ${item.apellido_materno}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Grupo:</Text>
        <Text style={styles.value}>{item.grupo}</Text>
      </View>
    </View>
  );

  const onPageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  const paginatedAlumnos = alumnos.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alumnos de la Carrera</Text>
      <FlatList
        data={paginatedAlumnos}
        renderItem={renderAlumno}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.paginationContainer}>
        {pageNumber > 1 && (
          <TouchableOpacity onPress={() => onPageChange(pageNumber - 1)}>
            <Text style={styles.paginationButton}>Anterior</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.pageNumber}>{pageNumber}</Text>
        {pageNumber * itemsPerPage < alumnos.length && (
          <TouchableOpacity onPress={() => onPageChange(pageNumber + 1)}>
            <Text style={styles.paginationButton}>Siguiente</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: '#666',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    marginHorizontal: 10,
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default AlumnosCarrerasScreen;