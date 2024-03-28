import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DocenteLoginController from '../util/DocenteLoginController';

const DocenteLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    const { success, message, carreras, error: loginError } = await DocenteLoginController.handleLogin(username, password);
    
    if (success) {
      navigation.navigate('DocenteScreen', { nombreCompleto: message, carreras }); // Aquí se pasan los datos al componente DocenteScreen.js
    } else {
      setError(loginError);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.iconContainer}>
          <Image source={require('../assets/icons/profesor.png')} style={styles.icon} />
          <Text style={styles.title}>Docente</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nombre de usuario</Text>
          <TextInput
            style={[styles.input, error && styles.errorInput, styles.inputText]}
            placeholder="Nombre de usuario"
            onChangeText={(text) => setUsername(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Contraseña</Text>
          <TextInput
            style={[styles.input, error && styles.errorInput, styles.inputText]}
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
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
  cardContainer: {
    borderRadius: 10, // Bordes redondeados
    width: '80%', // Ancho del contenedor al 80% de la pantalla
    padding: 20,
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center', // Centrar elementos horizontalmente
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#007bff', // Color primario de Bootstrap
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 80, // Tamaño del icono
    height: 80, // Tamaño del icono
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%', // Ancho al 100% del contenedor
  },
  inputLabel: {
    marginBottom: 5,
    color: '#007bff', // Color primario de Bootstrap
  },
  inputText: {
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: '#ced4da', // Color del borde del input de Bootstrap
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5, // Bordes redondeados
  },
  errorInput: {
    borderColor: 'red', // Color de borde rojo para indicar error
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#007bff', // Color de botón primario de Bootstrap
    borderRadius: 5, // Bordes redondeados
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default DocenteLogin;