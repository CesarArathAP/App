import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importar hook de navegación

const VigilanciaScreen = ({ route }) => {
  const { nombreOficial } = route.params;
  const navigation = useNavigation(); // Obtener objeto de navegación

  const handleBuscarAlumnos = () => {
    navigation.navigate('CarrerasScreen'); // Navegar a CarrerasScreen al hacer clic en Buscar Alumnos
  };

  const VisitasScreen = () => {
    navigation.navigate('VisitasScreen')
  }

  const VerVisitas = () => {
    navigation.navigate('VerVisitas')
  }

  const VerAlumnosTest = () => {
    navigation.navigate('AlumnosTestScreen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{nombreOficial}</Text>
      </View>
      <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.option} onPress={VisitasScreen}>
            <Text style={styles.optionText}>Registrar Visita</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={VerVisitas}>
            <Text style={styles.optionText}>Visitas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleBuscarAlumnos}>
              <Text style={styles.optionText}>Buscar Alumnos</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={VerAlumnosTest}>
            <Text style={styles.optionText}>Test de Alumnos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Notificaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Salir</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Instrucciones:</Text>
            <ScrollView nestedScrollEnabled={true}>
              <Text style={styles.cardText}>
                1. Mantén la calma y actúa con profesionalismo en todo momento.
              </Text>
              <Text style={styles.cardText}>
                2. Realiza rondas de vigilancia periódicas por todas las áreas asignadas.
              </Text>
              <Text style={styles.cardText}>
                3. Establece una comunicación clara y efectiva con el personal y los estudiantes.
              </Text>
              <Text style={styles.cardText}>
                4. Observa y documenta cualquier actividad sospechosa o violación de las normas.
              </Text>
              <Text style={styles.cardText}>
                5. Reporta cualquier emergencia o incidente al supervisor de seguridad de inmediato.
              </Text>
              <Text style={styles.cardText}>
                6. Colabora con otros oficiales y personal de seguridad para mantener un entorno seguro.
              </Text>
              <Text style={styles.cardText}>
                7. Mantente actualizado sobre los procedimientos de seguridad y emergencia.
              </Text>
            </ScrollView>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Importancia de la seguridad en la institución universitaria</Text>
            <Text style={styles.cardText}>
              La seguridad en una institución universitaria es fundamental para garantizar un entorno de aprendizaje seguro y protegido para todos los miembros de la comunidad educativa. La presencia de oficiales de seguridad capacitados y la implementación de medidas de seguridad efectivas ayudan a prevenir incidentes y a mantener la tranquilidad en el campus.
            </Text>
            <Text style={styles.cardText}>
              El desarrollo de esta aplicación tiene como objetivo principal mejorar la eficiencia y la coordinación del personal de seguridad, permitiendo una respuesta más rápida y efectiva ante cualquier situación de emergencia. Además, proporciona herramientas adicionales para el monitoreo y la gestión de la seguridad en todo el campus.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#007bff',
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '100%',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  menu: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  option: {
    backgroundColor: 'transparent',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginBottom: 20,
    padding: 15,
    width: '100%',
  },
  cardTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
});

export default VigilanciaScreen;