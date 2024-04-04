import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, LayoutAnimation, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Especialidades from './Especialidades';

const DocenteScreen = ({ route }) => {
  const { nombreCompleto, carreras } = route.params;
  const navigation = useNavigation();
  const [expandedCarreraIndex, setExpandedCarreraIndex] = useState(null);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [expandedCarreraIndex]);

  const toggleCarreraExpansion = (index) => {
    setExpandedCarreraIndex(index === expandedCarreraIndex ? null : index);
  };

  const navigateToNotificaciones = () => {
    navigation.navigate('Notificaciones'); // Navegar a la pantalla 'Notificaciones'
  };

  const navigateToHome = () => {
    navigation.reset({ routes: [{ name: 'Home' }] }); // Regresar a la pantalla de inicio
  };

  const Visitas = () => {
    navigation.navigate('Visitas');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>{nombreCompleto}</Text>
          <Image source={require('../assets/images/logo.png')} style={styles.icon} />
        </View>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.option} onPress={Visitas}>
          <Text style={styles.optionText}>Visitas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={navigateToNotificaciones}>
          <Text style={styles.optionText}>Notificaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={navigateToHome}>
          <Text style={styles.optionText}>Salir</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.instructionsTitle}>Carreras a la que imparte clase como Docente:</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.body}>
          {carreras ? (
            <>
              {carreras.map((carrera, index) => (
                <View key={index} style={styles.card}>
                  <TouchableOpacity onPress={() => toggleCarreraExpansion(index)}>
                    <View style={styles.headerCard}>
                      <Text style={styles.carreraText}>{carrera.nombreCarrera}</Text>
                      <Text style={styles.directorText}>{carrera.directorCarrera}</Text>
                    </View>
                    {expandedCarreraIndex === index && (
                      <Especialidades especialidades={carrera.especialidades} />
                    )}
                  </TouchableOpacity>
                </View>
              ))}
              <View style={styles.instructionsAndAdditionalContainer}>
                <View style={styles.instructionsContainer}>
                  <Text style={styles.instructionsTitle}>Instrucciones:</Text>
                  <Text style={styles.instructionsText}>
                    - Presiona sobre una carrera para expandir o contraer detalles.
                  </Text>
                  <Text style={styles.instructionsText}>
                    - Usa los botones en el menú para poder buscar a cualquier alumno por su nombre, matricula y/o grupo.
                  </Text>
                </View>
                <View style={styles.additionalContainer}>
                  <Text style={styles.additionalTitle}>Reportar Comportamiento Inaceptable:</Text>
                  <Text style={styles.additionalText}>
                    - Si observas a un alumno o alumna con un comportamiento inaceptable o sospechoso, como estar alcoholizado o en posesión de sustancias prohibidas, notifica a las autoridades de la institución de inmediato.
                  </Text>
                </View>
              </View>
              <View style={styles.instructionsAndAdditionalContainer}>
                <View style={styles.additionalContainer}>
                  <Text style={styles.additionalText}>
                     Si un alumno muestra agresividad hacia otros estudiantes o personal docente, sigue los procedimientos establecidos por la institución para garantizar la seguridad de todos.
                  </Text>
                </View>
              </View>
              <View style={styles.instructionsAndAdditionalContainer}>
                <View style={styles.additionalContainer}>
                <Image source={require('../assets/images/logo.png')} style={styles.Imagen} />
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.carreraText}>No se han encontrado carreras</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  carreraText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  directorText: {
    color: '#333',
    fontSize: 14,
    marginTop: 5,
  },
  header: {
    backgroundColor: '#007bff',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  menu: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#dee2e6',
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 14,
    color: '#495057',
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginBottom: 10,
    padding: 15,
    width: '100%',
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  instructionsAndAdditionalContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  Text: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  instructionsContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    flex: 1,
  },
  additionalContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    flex: 1,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 5,
  },
  additionalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 10,
  },
  additionalText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 5,
  },
  scrollContent: {
    flexGrow: 1,
  },
  Imagen: {
    paddingStart: 'auto',
    width: 350,
    height: 350
  }
});

export default DocenteScreen;