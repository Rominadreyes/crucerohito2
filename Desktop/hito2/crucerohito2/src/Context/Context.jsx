import React, { createContext, useEffect, useState } from 'react';

export const MyContext = createContext({});

export const Context = ({ children }) => {

  // Lógica global

  const [viajes, setViajes] = useState([]);
  // const [page, setPage] = useState(1) // no piden paginación, no creo que deberíamos hacerla por el momento

  useEffect(() => {
    viajesFetch();
  }, []);

  const viajesFetch = async () => {
    try {
      // Asegúrate de que la URL esté correcta
      const response = await fetch("http://localhost:3000/viajes");
      const data = await response.json();
      console.log(data);
      setViajes(data); // Actualizamos el estado con los datos obtenidos
    } catch (error) {
      console.error("Error fetching viajes:", error);
    }
  };

  // Ejemplo de uso de paginación (comentado)
  // useEffect(() => {
  //   const response = await fetch(`http://localhost:3000/viajes${page}`);
  // }, [page]);

  const globalState = { // Almacena todos los estados y constantes que se pasan a la aplicación
    viajes,
    // page
  };

  return (
    <MyContext.Provider value={globalState}>
      {children}
    </MyContext.Provider>
  );
};
