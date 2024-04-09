async function searchAlumnoByMatricula(matricula) {
  try {
    const response = await fetch(`http://192.168.1.40:3000/api/alumnos/${matricula}`);
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching alumno by matricula:', error);
    throw error; // Propagamos el error
  }
}

module.exports = searchAlumnoByMatricula;