import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, LayoutAnimation } from 'react-native';
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
    navigation.navigate('Visitas')
  }

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
      <View style={styles.body}>
        {carreras ? (
          carreras.map((carrera, index) => (
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
          ))
        ) : (
          <Text style={styles.carreraText}>No se han encontrado carreras</Text>
        )}
      </View>
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
    flex: 1,
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
    marginBottom: 15,
    padding: 15,
    width: '100%',
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default DocenteScreen;