import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const TestScreen = ({ route, navigation }) => {
  const { alumno } = route.params;
  const [resultado, setResultado] = useState('');
  const [pruebaEnviada, setPruebaEnviada] = useState(false);

  const handleInputChange = (text) => {
    const regex = /^\d*\.?\d*$/;
    if (regex.test(text) || text === '') {
      setResultado(text);
    }
  };

  const handleSubmit = () => {
    if (resultado.trim() === '') {
      Alert.alert(
        'Campo Vacío',
        'Por favor, ingresa el resultado de la prueba antes de enviar.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    } else {
      console.log('Resultado de la prueba:', resultado);
      setPruebaEnviada(true);
      Alert.alert(
        'Prueba Realizada con éxito',
        `La prueba ha sido realizada con éxito para ${alumno.nombre}`,
        [{ text: 'OK', onPress: () => navigation.navigate('CarrerasScreen') }]
      );
    }
  };  

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>Realizar Prueba para {alumno.nombre}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Matrícula:</Text>
          <TextInput
            style={styles.textInput}
            value={alumno.matricula}
            editable={false}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.textInput}
            value={`${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`}
            editable={false}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Grupo:</Text>
          <TextInput
            style={styles.textInput}
            value={alumno.grupo}
            editable={false}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Ingresar resultado de la prueba"
          onChangeText={handleInputChange}
          value={resultado}
          keyboardType="numeric"
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar Resultado</Text>
        </TouchableOpacity>
      </View>
      {pruebaEnviada && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>Prueba Realizada con éxito para {alumno.nombre}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  cardContent: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    color: '#555',
    width: 100,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f0f0f0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessage: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  successText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default TestScreen;