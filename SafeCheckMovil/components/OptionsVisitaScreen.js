import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const OptionsVisitaScreen = ({ route }) => {
  // Estado local para la hora de salida
  const [horaSalida, setHoraSalida] = useState('');

  // Estado local para mostrar o no el selector de hora
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Función para obtener la hora actual en el formato deseado (hh:mm a)
  const obtenerHoraActual = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  // Establecer la hora actual al cargar el componente
  useEffect(() => {
    setHoraSalida(obtenerHoraActual());
  }, []);

  // Función para manejar el cambio de hora seleccionada
  const onChangeHoraSalida = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowTimePicker(false);
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    setHoraSalida(`${formattedHours}:${formattedMinutes} ${ampm}`);
  };

  // Función para manejar la actualización de la hora de salida
  const handleUpdateHoraSalida = () => {
    // Aquí deberías implementar la lógica para actualizar la hora de salida
    console.log('Nueva hora de salida:', horaSalida);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Colocar la imagen dentro de la tarjeta */}
          {route.params.visita.fotografia && (
            <Image
              source={{ uri: route.params.visita.fotografia }}
              style={{ width: '100%', height: 200, resizeMode: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
            />
          )}

          <Text style={styles.label}>Nombre:</Text>
          <Text style={[styles.input, styles.disabled]}>{route.params.visita.visitante}</Text>
          
          <Text style={styles.label}>Motivo:</Text>
          <Text style={[styles.input, styles.disabled]}>{route.params.visita.motivo}</Text>
          
          <Text style={styles.label}>Área:</Text>
          <Text style={[styles.input, styles.disabled]}>{route.params.visita.ubicacion}</Text>
          
          <Text style={styles.label}>Fecha:</Text>
          <Text style={[styles.input, styles.disabled]}>{route.params.visita.registro.fecha}</Text>
          
          <Text style={styles.label}>Hora de entrada:</Text>
          <Text style={[styles.input, styles.disabled]}>{route.params.visita.registro.hora_entrada}</Text>
          
          <Text style={styles.label}>Hora de salida:</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
            <Text style={{ color: 'black' }}>{horaSalida}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeHoraSalida}
            />
          )}
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleUpdateHoraSalida}>
          <Text style={styles.buttonText}>Actualizar hora de salida</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    marginTop: 10,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
    marginLeft: 10,
    marginRight: 10, // Agregar margen horizontal
  },
  disabled: {
    opacity: 0.5,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OptionsVisitaScreen;
