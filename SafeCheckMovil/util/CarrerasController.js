import React, { useState, useEffect } from 'react';
import { obtenerCarreras } from '../api/apicarreras';

const useCarrerasController = () => {
  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    cargarCarreras();
  }, []);

  const cargarCarreras = async () => {
    try {
      const data = await obtenerCarreras();
      setCarreras(data);
    } catch (error) {
      // Manejar el error aquí
    }
  };

  return carreras;
};

export default useCarrerasController;