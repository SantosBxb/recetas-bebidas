import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

// crear context
export const CategoriasContext = createContext();

// provider es donde se encuentran las fns y state
const CategoriasProvider = (props) => {
  //crear state del context
  const [categorias, setCategorias] = useState([]);

  //ejecutar llamado a la api
  useEffect(() => {
    const obtenerCategorias = async () => {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

      const categorias = await axios.get(url);
      setCategorias(categorias.data.drinks);
    };
    obtenerCategorias();
  }, []);

  return (
    <CategoriasContext.Provider
      //se deben poner los states que se desean pasar a los hijos
      value={{
        categorias
      }}
    >
      {props.children}
    </CategoriasContext.Provider>
  );
};

//se debe exportar el context creado
export default CategoriasProvider;
