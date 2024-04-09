import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera } from 'react-native-image-picker'; // Cambiado de launchImageLibrary a launchCamera
import PushNotification from 'react-native-push-notification';
import registrarVisita from '../util/RegistrarVisitas';
import notificationsApi from '../api/notificationsApi';

const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'p.m.' : 'a.m.';
  const adjustedHours = hours % 12 || 12; // Ajustar las horas al formato de 12 horas
  return `${adjustedHours}:${minutes} ${period}`;
};

const VisitasScreen = () => {
  const [visitante, setVisitante] = useState('');
  const [motivo, setMotivo] = useState('');
  const [area, setArea] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [horaEntrada, setHoraEntrada] = useState(getCurrentTime());
  const [horaSalida, setHoraSalida] = useState('Pendiente');
  const [foto, setFoto] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    // Establecer la fecha y hora actual cuando el componente se monte
    const now = new Date();
    setFecha(now);
    setHoraEntrada(getCurrentTime());
  }, []);

  const handleSubmit = async () => {
    if (!visitante || !motivo || !area || !fecha || !horaEntrada || !foto) {
      Alert.alert('Error', 'Todos los campos son obligatorios, incluyendo la foto de identificación');
      return;
    }
  
    try {
      const datosVisita = {
        visitante: visitante,
        motivo: motivo,
        area: area,
        fecha: formatDate(fecha), // Aquí se ajusta el formato de la fecha
        hora_entrada: horaEntrada,
        hora_salida: horaSalida,
        fotografia: `data:image/jpeg;base64,${foto}` // Agregar "data:image/jpeg;base64," a la cadena de la imagen base64
      };
  
      await registrarVisita(datosVisita);
  
      // Formatea los datos para incluir en el mensaje de la notificación
      const notificationMessage = `Nombre del visitante: ${visitante}\nMotivo de la visita: ${motivo}\nHora de entrada: ${horaEntrada}`;
  
      // Envía una notificación cuando se registra una visita
      PushNotification.localNotification({
        channelId: 'default-channel-id',
        title: 'Ingreso una Visita a la Universidad',
        message: notificationMessage,
        largeIcon: foto, // Utiliza la imagen como ícono grande de la notificación
      });

      // Envía la notificación a la API
      await notificationsApi.sendNotification('Ingreso una Visita a la Universidad', notificationMessage);
  
      // Limpiar el formulario después de enviar los datos
      setVisitante('');
      setMotivo('');
      setArea('');
      setFecha(new Date());
      setHoraEntrada(getCurrentTime());
      setHoraSalida('Pendiente');
      setFoto('');
  
      Alert.alert('Éxito', 'La visita ha sido registrada exitosamente');
    } catch (error) {
      console.error('Error al registrar la visita:', error.message);
      Alert.alert('Error', 'Ha ocurrido un error al registrar la visita');
    }
  };  

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(false);
    setFecha(currentDate);
  };

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
      includeBase64: true, // Solicitar que se incluya la representación base64 de la imagen
      maxWidth: 500,
      maxHeight: 500,
    };

    launchCamera(options, (response) => { // Cambiado de launchImageLibrary a launchCamera
      if (response.didCancel) {
        console.log('El usuario canceló la selección de la imagen');
      } else if (response.error) {
        console.log('Error al seleccionar la imagen:', response.error);
      } else {
        if (response.assets && response.assets.length > 0) {
          const base64Image = response.assets[0].base64; // Obtener la representación base64 de la imagen
          setFoto(base64Image); // Establecer la imagen como base64 en el estado
        } else {
          console.log('No se encontraron imágenes seleccionadas');
        }
      }
    });    
  };   

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || new Date();
    setShowTimePicker(false);
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    setHoraEntrada(`${hours}:${minutes}`);
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={styles.card}>
        <Text style={styles.title}>Registrar Visita</Text>
        <TextInput style={styles.input} placeholder="Nombre del visitante" placeholderTextColor="#ccc" value={visitante} onChangeText={setVisitante} />
        <TextInput style={styles.input} placeholder="Motivo de la visita" placeholderTextColor="#ccc" value={motivo} onChangeText={setMotivo} />
        <TextInput style={styles.input} placeholder="Área visitada" placeholderTextColor="#ccc" value={area} onChangeText={setArea} />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput style={styles.input} placeholder="Fecha de la visita" placeholderTextColor="#ccc" value={formatDate(fecha)} editable={false} />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={fecha}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <TextInput style={styles.input} placeholder="Hora de entrada" placeholderTextColor="#ccc" value={horaEntrada} editable={false} />
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={new Date()}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}
        <TextInput style={styles.input} placeholder="Hora de salida" placeholderTextColor="#ccc" value={horaSalida} editable={false} />
        {foto !== '' ? (
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Image source={{ uri: `data:image/jpeg;base64,${foto}` }} style={styles.image} />
            <Text style={styles.textSelect}>Seleccionar la fotografía de la identificación de la visita</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Image source={require('../assets/images/toma-una-foto.png')} style={styles.defaultImage} />
            <Text style={styles.textSelect}>Seleccionar la fotografía de la identificación de la visita</Text>
          </TouchableOpacity>
        )}
        {foto !== '' && (
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Text style={styles.changePhotoButton}>Cambiar Fotografía</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrar Visita</Text>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    textAlign: 'center'
  },
  card: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
    alignSelf: 'center', // Alineación horizontal
    justifyContent: 'center', // Alineación vertical
  },
  defaultImage: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
    alignSelf: 'center', // Alineación horizontal
    justifyContent: 'center', // Alineación vertical
  },  
  registerButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textSelect: {
    fontSize: 15,
    marginBottom: 10,
    color: 'black',
    textAlign: 'center'
  },
  changePhotoButton: {
    fontSize: 15,
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
  }
});

export default VisitasScreen;