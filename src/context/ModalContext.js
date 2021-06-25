import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';
import Receta from '../components/Receta';

export const ModalContext = createContext();

const ModalProvider = (props) =>{
  //state 
  const [idReceta, setIdReceta] = useState(null);
  const [informacion, setReceta] = useState({});

  //una vez que tenemos una receta, llamar a la api
  useEffect(() => {
    const obtenerReceta = async () => {
      if(!idReceta)return;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;

      const resultado = await axios.get(url);
      setReceta(resultado.data.drinks[0]);
    }
    obtenerReceta();
  }, [idReceta]);

  return(
    <ModalContext.Provider
      value={{
        informacion,
        setIdReceta,
        setReceta
      }}>
      {props.children}
    </ModalContext.Provider>
  )
}

export default ModalProvider;
