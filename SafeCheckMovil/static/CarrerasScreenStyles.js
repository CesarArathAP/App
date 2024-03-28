import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  searchButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  card: {
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 18,
    color: '#000',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 20, // Agregar un padding al contenedor del modal
  },
  resultadoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
    overflow: 'auto',
  },
  resultadoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000', // Texto negro
  },
  resultadoCard: {
    backgroundColor: '#f2f2f2', // Color de fondo más claro
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultadoNombre: {
    fontSize: 18,
    marginBottom: 5,
    color: '#000', // Color de texto negro
  },
  resultadoGrupo: {
    fontSize: 16,
    color: '#000', // Color de texto negro
  },
  buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Espaciar los botones horizontalmente
    },      
  realizarPruebaButton: {
    backgroundColor: '#007bff', // Color azul para el botón de realizar prueba
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  resultadoItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    width: 250, // Ajusta el ancho según tus preferencias
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultadoMatricula: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333', // Color de texto
  },  
  realizarPruebaButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
      backgroundColor: '#dc3545',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20, // Ajustar el margen superior del botón de cerrar
  },      
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
}); 

export default styles;