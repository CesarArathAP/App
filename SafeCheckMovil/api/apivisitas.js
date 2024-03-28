const apiUrl = 'http://192.168.1.40:3000/registrar-visita'; // 130.131.4.148, 192.168.1.40

const registrarVisitaApi = async (datosVisita) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosVisita),
    });

    if (!response.ok) {
      throw new Error('Error al registrar la visita');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default registrarVisitaApi;