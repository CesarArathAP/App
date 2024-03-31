import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { obtenerAlumnos } from '../util/AlumnosTestUtil';

const AlumnosTestScreen = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [numMostrar, setNumMostrar] = useState(10); // Estado para controlar el número de elementos a mostrar

  useEffect(() => {
    obtenerListaAlumnos();
  }, []);

  const obtenerListaAlumnos = async () => {
    try {
      const listaAlumnos = await obtenerAlumnos();
      // Ordenar alumnos por fecha y hora de forma descendente (más reciente primero)
      const alumnosOrdenados = listaAlumnos.sort((a, b) => {
        const fechaHoraA = new Date(a.fecha + ' ' + a.hora);
        const fechaHoraB = new Date(b.fecha + ' ' + b.hora);
        return fechaHoraB - fechaHoraA;
      });
      setAlumnos(alumnosOrdenados);
    } catch (error) {
      console.error('Error al obtener la lista de alumnos:', error);
    }
  };

  const handleMostrarMas = () => {
    // Mostrar 10 registros adicionales al presionar el botón
    setNumMostrar(prevNumMostrar => prevNumMostrar + 10);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Alumnos</Text>
      <ScrollView style={styles.alumnosContainer}>
        {alumnos.slice(0, numMostrar).map((alumno, index) => ( // Usar slice para mostrar solo los primeros "numMostrar" elementos
          <View key={index} style={styles.alumnoCard}>
            <Text style={styles.textoNegro}>Matrícula: {alumno.alumno.matricula}</Text>
            <Text style={styles.textoNegro}>Nombre: {alumno.alumno.nombre}</Text>
            <Text style={styles.textoNegro}>Grupo: {alumno.alumno.grupo}</Text>
            <Text style={styles.textoNegro}>Fecha: {alumno.fecha}</Text>
            <Text style={styles.textoNegro}>Hora: {alumno.hora}</Text>
            <Text style={styles.textoNegro}>Resultado: {alumno.resultado}</Text>
          </View>
        ))}
      </ScrollView>
      {alumnos.length > numMostrar && ( // Mostrar botón solo si hay más registros para mostrar
        <TouchableOpacity onPress={handleMostrarMas} style={styles.button}>
          <Text style={styles.buttonText}>Mostrar más</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  alumnosContainer: {
    marginTop: 10,
    flex: 1,
  },
  alumnoCard: {
    backgroundColor: '#fff',
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
  },
  textoNegro: {
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AlumnosTestScreen;