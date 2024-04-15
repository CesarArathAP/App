import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, StatusBar, ScrollView, Text, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importar useNavigation
import searchAlumnoByMatricula from '../api/search_alumnos_qr';
import { enviarResultadoPrueba } from '../util/TestAlumnosUtil';
import { fetchData } from '../api/api_arduino_mq3'; // Importar la función fetchData desde el archivo api_arduino_mq3

const App = () => {
  const [inputText, setInputText] = useState('');
  const [alumnoData, setAlumnoData] = useState(null);
  const [newInputText, setNewInputText] = useState('');
  const [showInstructions, setShowInstructions] = useState(true);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [porcentaje, setPorcentaje] = useState(null); // Agregar estado para el porcentaje
  const navigation = useNavigation(); // Obtener la navegación

  useEffect(() => {
    // Realizar la búsqueda del alumno cuando se actualice el inputText
    if (inputText.length === 10) {
      handleSearchAlumno();
    }
  }, [inputText]);

  useEffect(() => {
    if (alumnoData) {
      // Realizar la llamada a la API una vez que aparezcan los datos del alumno
      fetchData(setPorcentaje);

      // Actualizar el porcentaje cada 5 segundos
      const interval = setInterval(() => {
        fetchData(setPorcentaje);
      }, 5000);

      // Limpiar el intervalo cuando el componente se desmonte
      return () => clearInterval(interval);
    }
  }, [alumnoData]);

  const handleInputChange = text => {
    // Limitar la longitud del texto a 10 caracteres
    setInputText(text.substring(0, 10));
  };

  const handleSearchAlumno = async () => {
    try {
      const alumno = await searchAlumnoByMatricula(inputText);
      if (alumno) {
        setAlumnoData(alumno);
        setShowInstructions(false);
        const currentDate = new Date();
        setDate(`${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`);
        setTime(`${currentDate.getHours()}:${currentDate.getMinutes()}`);
      } else {
        showAlert('Alumno no encontrado', 'El alumno no se encontró en el sistema.');
      }
    } catch (error) {
      console.error('Error searching alumno by matricula:', error);
      showAlert('Error', 'Ocurrió un error al buscar el alumno.');
    }
  };

  const handleSendResult = async () => {
    // Validar que el campo de resultado no esté vacío
    if (newInputText.trim() === '') {
      showAlert('Resultado obligatorio', 'Por favor, captura el resultado del test.');
      return;
    }

    try {
      const nombreCompleto = `${alumnoData.nombre} ${alumnoData.apellido_paterno} ${alumnoData.apellido_materno}`;
      const formData = {
        alumno: {
          matricula: alumnoData.matricula,
          nombre: nombreCompleto,
          grupo: alumnoData.grupo
        },
        fecha: date,
        hora: time,
        resultado: newInputText
      };
      await enviarResultadoPrueba(formData);
      showAlert('Registro exitoso', 'La prueba fue registrada con éxito.');
      setNewInputText(''); // Limpiamos el campo de resultado después de enviarlo
      navigation.goBack(); // Regresar al componente anterior
    } catch (error) {
      console.error('Error al enviar el resultado del alumno:', error);
      showAlert('Error', 'Ocurrió un error al enviar el resultado del alumno.');
    }
  };

  const handleCaptureValue = () => {
    if (porcentaje !== null) {
      setNewInputText(`${porcentaje}`);
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: 'Aceptar', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Buscar Alumno</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese matrícula del alumno"
            onChangeText={handleInputChange}
            value={inputText}
            maxLength={10}
            keyboardType="numeric"
          />
        </View>
        {showInstructions && (
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>Instrucciones:</Text>
            <View style={styles.instructionsCard}>
              <View style={styles.instructionsContent}>
                <Text style={styles.instructionsText}>1. Escanea el código QR para buscar al alumno.</Text>
                <Text style={styles.instructionsText}>2. Ingresa la matrícula del alumno manualmente en caso de no contar con el Scanner en la barra de búsqueda.</Text>
                <Text style={styles.instructionsNote}>Nota: Debido al rendimiento de la aplicación, se sugiere conectar el lector QR o scanner por Bluetooth antes de iniciar la aplicación para evitar que te saque de la misma. Este problema se resolverá en la próxima versión de la aplicación.</Text>
              </View>
              <View style={styles.qrCodeContainer}>
                <Image source={require('../assets/icons/codigo-qr.png')} style={styles.qrCodeIcon} />
              </View>
            </View>
          </View>
        )}
        {alumnoData && (
          <View style={styles.alumnoCard}>
            <Text style={styles.alumnoTitle}>Información del Alumno</Text>
            <View style={styles.alumnoDataContainer}>
              <Text style={styles.dataLabel}>Matrícula:</Text>
              <TextInput
                style={styles.alumnoData}
                value={alumnoData.matricula}
                editable={false}
              />
              <Text style={styles.dataLabel}>Nombre Completo:</Text>
              <TextInput
                style={styles.alumnoData}
                value={`${alumnoData.nombre} ${alumnoData.apellido_paterno} ${alumnoData.apellido_materno}`}
                editable={false}
              />
              <Text style={styles.dataLabel}>Grupo:</Text>
              <TextInput
                style={styles.alumnoData}
                value={alumnoData.grupo}
                editable={false}
              />
              <Text style={[styles.resultText, { color: '#000' }]}>Fecha:</Text>
              <View style={styles.divider}></View>
              <TextInput
                style={styles.newInput}
                placeholder="Fecha"
                value={date}
                editable={false}
              />
              <Text style={[styles.resultText, { color: '#000' }]}>Hora:</Text>
              <TextInput
                style={styles.newInput}
                placeholder="Hora"
                value={time}
                editable={false}
              />
              <Text style={[styles.resultText, { color: '#000' }]}>Porcentaje de Alcohol:</Text>
              <TextInput
                style={styles.newInput}
                placeholder="Porcentaje"
                value={porcentaje !== null ? `${porcentaje}` : 'Cargando...'} // Mostrar el porcentaje si está disponible
                editable={false}
              />
              <Button title="Capturar Valor" onPress={handleCaptureValue} />
              <Button title="Enviar resultado de alumno" onPress={handleSendResult} />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black'
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    color: 'black',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  alumnoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  alumnoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  alumnoDataContainer: {
    marginTop: 10,
  },
  alumnoData: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  divider: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  newInput: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#000',
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  qrCodeContainer: {
    alignItems: 'center',
  },
  qrCodeIcon: {
    width: 50,
    height: 50,
  },
  instructionsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    alignSelf: 'center',
  },
  instructionsContent: {
    flex: 1,
  },
  instructionsText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  instructionsNote: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginTop: 10,
  },
  dataLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default App;