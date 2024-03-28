import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Importa useNavigation desde @react-navigation/native
import useCarrerasController from '../util/CarrerasController';
import CarrerasScreenStyles from '../static/CarrerasScreenStyles';

const CarrerasScreen = () => {
  const navigation = useNavigation(); // Obtiene el objeto de navegación
  const carreras = useCarrerasController();
  const [busqueda, setBusqueda] = useState('');
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);
  const [showAlumnos, setShowAlumnos] = useState(false);
  const [showAlumnoNoEncontrado, setShowAlumnoNoEncontrado] = useState(false);

  const filtrarAlumnos = (carreras, busqueda) => {
    const alumnosFiltrados = [];
    carreras.forEach(carrera => {
      carrera.especialidades.forEach(especialidad => {
        especialidad.alumnos.forEach(alumno => {
          const { matricula, nombre, apellido_paterno, apellido_materno, grupo } = alumno;
          const nombreCompleto = `${nombre} ${apellido_paterno} ${apellido_materno}`;
          if (
            matricula.toLowerCase().includes(busqueda.toLowerCase()) ||
            nombreCompleto.toLowerCase().includes(busqueda.toLowerCase()) ||
            grupo.toLowerCase().includes(busqueda.toLowerCase()) ||
            especialidad.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            carrera.nombre.toLowerCase().includes(busqueda.toLowerCase())
          ) {
            alumnosFiltrados.push(alumno);
          }
        });
      });
    });
    return alumnosFiltrados;
  };  

  const buscarAlumnos = () => {
    // Validar si el campo de búsqueda está vacío
    if (busqueda.trim() === '') {
      // Mostrar mensaje de error
      Alert.alert(
        'Error',
        'No puedes realizar la búsqueda si no escribes el nombre de un alumno.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      return;
    }

    // Realizar la búsqueda
  const alumnos = filtrarAlumnos(carreras, busqueda);
  if (alumnos.length === 0) {
    setShowAlumnoNoEncontrado(true);
  } else {
    setAlumnosFiltrados(alumnos);
    setShowAlumnos(true);
    // Limpiar el campo de búsqueda
    setBusqueda('');
  }
};

  const renderItem = ({ item }) => (
    <View style={CarrerasScreenStyles.card}>
      <View style={CarrerasScreenStyles.cardContent}>
        <Text style={CarrerasScreenStyles.title}>{item.nombre}</Text>
        <TouchableOpacity style={CarrerasScreenStyles.button} onPress={() => verAlumnos(item)}>
          <Text style={CarrerasScreenStyles.buttonText}>Ver Alumnos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const verAlumnos = (carrera) => {
    // Navega al componente AlumnosCarrerasScreen y pasa la lista de alumnos como parámetro
    navigation.navigate('AlumnosCarreraScreen', { alumnos: carrera.especialidades.flatMap(especialidad => especialidad.alumnos) });
  };

  const renderResultadoBusqueda = () => {
    if (!showAlumnos || alumnosFiltrados.length === 0) {
      return null;
    }

    return (
      <Modal visible={showAlumnos} animationType="slide" transparent={true}>
        <View style={CarrerasScreenStyles.modalContainer}>
          <View style={CarrerasScreenStyles.resultadoContainer}>
            <Text style={CarrerasScreenStyles.resultadoTitle}>Resultados de búsqueda:</Text>
            <FlatList
              horizontal
              data={alumnosFiltrados}
              renderItem={({ item }) => (
                <View style={[CarrerasScreenStyles.resultadoItem, CarrerasScreenStyles.alumnoContainer]}>
                  <Text style={CarrerasScreenStyles.resultadoMatricula}>Matrícula: {item.matricula}</Text>
                  <Text style={CarrerasScreenStyles.resultadoNombre}>{`${item.nombre} ${item.apellido_paterno} ${item.apellido_materno}`}</Text>
                  <Text style={CarrerasScreenStyles.resultadoGrupo}>Grupo: {item.grupo}</Text>
                  <View style={CarrerasScreenStyles.buttonsContainer}>
                    <TouchableOpacity style={CarrerasScreenStyles.realizarPruebaButton} onPress={() => realizarPrueba(item)}>
                      <Text style={CarrerasScreenStyles.realizarPruebaButtonText}>Realizar Prueba</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity style={CarrerasScreenStyles.closeButton} onPress={() => setShowAlumnos(false)}>
              <Text style={CarrerasScreenStyles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderAlumnoNoEncontrado = () => {
    if (!showAlumnoNoEncontrado) {
      return null;
    }

    return (
      <Modal visible={showAlumnoNoEncontrado} animationType="slide" transparent={true}>
        <View style={CarrerasScreenStyles.modalContainer}>
          <View style={CarrerasScreenStyles.resultadoContainer}>
            <Text style={CarrerasScreenStyles.resultadoTitle}>Alumno No Encontrado</Text>
            <TouchableOpacity style={CarrerasScreenStyles.closeButton} onPress={() => setShowAlumnoNoEncontrado(false)}>
              <Text style={CarrerasScreenStyles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const realizarPrueba = (alumno) => {
    // Navega al componente TestScreen y pasa los datos del alumno como parámetro
    navigation.navigate('TestScreen', { alumno });
  };  

  // Función que se ejecutará cuando el componente CarrerasScreen obtenga foco
  useFocusEffect(
    React.useCallback(() => {
      // Restablecer el estado cuando el componente obtenga foco nuevamente
      setBusqueda('');
      setAlumnosFiltrados([]);
      setShowAlumnos(false);
      setShowAlumnoNoEncontrado(false);
    }, [])
  );

  return (
    <View style={CarrerasScreenStyles.container}>
      <View style={CarrerasScreenStyles.searchContainer}>
      <TextInput
        style={CarrerasScreenStyles.input}
        placeholder="Buscar alumnos por carrera, matrícula o grupo"
        onChangeText={(text) => {
          setBusqueda(text);
          setShowAlumnos(false);
          setShowAlumnoNoEncontrado(false);
        }}
        value={busqueda}
        placeholderTextColor="#000"
        />
        <TouchableOpacity style={CarrerasScreenStyles.searchButton} onPress={buscarAlumnos}>
          <Text style={CarrerasScreenStyles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={carreras}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      {renderResultadoBusqueda()}
      {renderAlumnoNoEncontrado()}
    </View>
  );
};

export default CarrerasScreen;