/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
  //states
  const [busqueda, buscarRecetas] = useState({
    nombre: "",
    categoria: "",
  });
  const [recetas, setRecetas] = useState([]);
  //para luegopoder ejecutar el useEffect solo si consultar es true 
  const [consultar, setConsultar] = useState(false);

  //extraer datos
  const { nombre, categoria } = busqueda;

  //useeffect
  useEffect(() => {
    if (consultar) {
      const obtenerRecetas = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;

        const resultado = await axios.get(url)
        setRecetas(resultado.data.drinks);
      };
      obtenerRecetas();
    }
  }, [busqueda]);
  return (
    <RecetasContext.Provider
      value={{
        buscarRecetas,
        setConsultar,
        recetas
      }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
};
export default RecetasProvider;
