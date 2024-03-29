import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import registrarVisita from '../util/RegistrarVisitas';

const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const VisitasScreen = () => {
  const [visitante, setVisitante] = useState('');
  const [motivo, setMotivo] = useState('');
  const [area, setArea] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [horaEntrada, setHoraEntrada] = useState(getCurrentTime());
  const [horaSalida, setHoraSalida] = useState('');
  const [foto, setFoto] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

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
        fecha: fecha.toISOString(),
        hora_entrada: horaEntrada,
        hora_salida: horaSalida,
        fotografia: foto
      };

      console.log('Datos del formulario:', JSON.stringify(datosVisita));
  
      await registrarVisita(datosVisita);

      // Limpiar el formulario después de enviar los datos
      setVisitante('');
      setMotivo('');
      setArea('');
      setFecha(new Date());
      setHoraEntrada(getCurrentTime());
      setHoraSalida('');
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
      includeBase64: false,
      maxWidth: 500,
      maxHeight: 500,
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('El usuario canceló la selección de la imagen');
      } else if (response.error) {
        console.log('Error al seleccionar la imagen:', response.error);
      } else {
        if (response.assets && response.assets.length > 0) {
          const source = response.assets[0].uri;
          setFoto(source);
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
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('es-ES', options).replace(/\//g, '-');
  };

  return (
    <View style={styles.container}>
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
        <TextInput style={styles.input} placeholder="Hora de salida" placeholderTextColor="#ccc" value={horaSalida} onChangeText={setHoraSalida} />
        {foto !== '' && (
          <Image source={{ uri: foto }} style={styles.image} />
        )}

        <Button title="Seleccionar Foto" onPress={handleChoosePhoto} />
        <Button title="Registrar Visita" onPress={handleSubmit} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
});

export default VisitasScreen;
