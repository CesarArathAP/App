const updateVisita = async (idVisita, nuevaHoraSalida) => {
    try {
      const response = await fetch(`http://192.168.1.40:3000/api/update_visitas/${idVisita}`, {  // Utiliza el campo "id" en la URL
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nuevaHoraSalida }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error actualizando visita:', error);
      throw error;
    }
  };
  
  export default updateVisita;  