import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Especialidades = ({ especialidades }) => {
  const navigation = useNavigation();

  const handleVerAlumnos = (alumnos) => {
    navigation.navigate('AlumnosScreen', { alumnos: alumnos });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.especialidadesTitle}>Especialidades</Text>
      {especialidades.map((especialidad, index) => (
        <View key={index}>
          <View style={styles.especialidadContainer}>
            <View style={styles.especialidadInfo}>
              <Text style={styles.especialidadText}>{especialidad.nombre}</Text>
              <Text style={styles.nivelText}>{especialidad.nivel}</Text>
            </View>
            <TouchableOpacity
              style={styles.alumnosButton}
              onPress={() => handleVerAlumnos(especialidad.alumnos)}>
              <Text style={styles.buttonText}>Ver Alumnos</Text>
            </TouchableOpacity>
          </View>
          {index !== especialidades.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
  },
  especialidadesTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  especialidadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  especialidadInfo: {
    flex: 1,
  },
  especialidadText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nivelText: {
    color: '#333',
    fontSize: 14,
  },
  alumnosButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 5, // Reducir el espacio vertical
    paddingHorizontal: 10, // Reducir el espacio horizontal
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14, // Reducir el tamaño del texto
    fontWeight: 'bold',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Especialidades;