const filterAlumnos = (alumnos, searchText) => {
    if (!searchText) return alumnos;
    
    const lowerSearchText = searchText.toLowerCase();
    return alumnos.filter(alumno =>
      alumno.matricula.includes(searchText) ||
      alumno.nombre.toLowerCase().includes(lowerSearchText) ||
      alumno.apellido_paterno.toLowerCase().includes(lowerSearchText) ||
      alumno.apellido_materno.toLowerCase().includes(lowerSearchText) ||
      alumno.correo_electronico.toLowerCase().includes(lowerSearchText) ||
      alumno.grupo.toLowerCase().includes(lowerSearchText) ||
      alumno.nss.includes(searchText) ||
      alumno.estado.toLowerCase().includes(lowerSearchText)
    );
  };
  
  export { filterAlumnos };  