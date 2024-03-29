import React from 'react';
import { StatusBar, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DocenteLogin from './components/DocenteLogin';
import VigilanciaLogin from './components/VigilanciaLogin';
import DocenteScreen from './components/DocenteScreen';
import Especialidades from './components/Especialidades';
import AlumnosScreen from './components/AlumnosScreen';
import VerAlumnosScreen from './components/VerAlumnosScreen';
import VigilanciaScreen from './components/VigilanciaScreen';
import CarrerasScreen from './components/CarrerasScreen';
import AlumnosCarreraScreen from './components/AlumnosCarreraScreen';
import TestScreen from './components/TestScreen';
import VisitasScreen from './components/VisitasScreen';
import VerVisitasScreen from './components/VerVisitasScreen';
import OptionsVisitaScreen from './components/OptionsVisitaScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="DocenteLogin" component={DocenteLogin} />
        <Stack.Screen name="VigilanciaLogin" component={VigilanciaLogin} />
        <Stack.Screen name="DocenteScreen" component={DocenteScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Especialidades" component={Especialidades} options={{ headerShown: false }} />
        <Stack.Screen name="AlumnosScreen" component={AlumnosScreen} />
        <Stack.Screen name="VerAlumnosScreen" component={VerAlumnosScreen} />
        <Stack.Screen name="VigilanciaScreen" component={VigilanciaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CarrerasScreen" component={CarrerasScreen} />
        <Stack.Screen name="AlumnosCarreraScreen" component={AlumnosCarreraScreen} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="VisitasScreen" component={VisitasScreen} />
        <Stack.Screen name="VerVisitas" component={VerVisitasScreen} />
        <Stack.Screen name="OptionsVisita" component={OptionsVisitaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  const handleRoleSelection = (role) => {
    console.log(`Rol seleccionado: ${role}`);
    navigation.navigate(`${role}Login`);
  };

  const Card = ({ role, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardText}>{role}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerlogin}>
        <Image source={require('./assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>SAFECHECKSCHOOL</Text>
        <Text style={styles.subtitle}>Entrar Como:</Text>

        <View style={styles.cardsContainer}>
          <Card role="Docente" onPress={() => handleRoleSelection('Docente')} />
          <Card role="Vigilancia" onPress={() => handleRoleSelection('Vigilancia')} />
        </View>

        <StatusBar style="light" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa', // Color de fondo de Bootstrap
  },
  profileContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  containerlogin: {
    borderRadius: 20,
    width: '90%', // Ancho del contenedor al 90% de la pantalla
    padding: 20, 
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignItems: 'center', // Centrar elementos horizontalmente
  },
  logo: {
    width: 150, // Tamaño de la imagen ajustado
    height: 150, // Tamaño de la imagen ajustado
    marginBottom: 20, // Espacio entre el logo y el título
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%', // Ancho al 100% del contenedor
  },
  card: {
    backgroundColor: '#007bff', // Color de botón primario de Bootstrap
    borderRadius: 5, // Bordes redondeados
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    elevation: 2,
  },
  cardText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold', // Texto en negrita
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
    color: '#007bff', // Color primario de Bootstrap
  },
  subtitle: {
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },
});