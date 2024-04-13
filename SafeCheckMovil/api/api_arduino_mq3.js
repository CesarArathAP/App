export async function fetchData(setPorcentaje) {
    try {
      const response = await fetch('http://192.168.1.40:5000/datos_serial');
      const data = await response.json();
      if (data.datos && data.datos.length > 0) {
        setPorcentaje(data.datos[data.datos.length - 1]);
      } else {
        console.error('No se recibió ningún dato del Arduino');
      }
    } catch (error) {
      console.error('Error al obtener datos del Arduino:', error);
    }
  }
  
  export function clearInterval(interval) {
    clearInterval(interval);
  }  