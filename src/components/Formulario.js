import React, { useContext, useState } from "react";
//importar el provider
import { CategoriasContext } from "../context/CategoriasContext";
import { RecetasContext } from "../context/RecetasContext";

const Formulario = () => {
  //context, para poder tomar todo lo que este dentro del value del context
  //se deben llamar a state que se desea utilizar
  const { categorias } = useContext(CategoriasContext);
  const { buscarRecetas, setConsultar } = useContext(RecetasContext);

  //state local
  const [busqueda, setBusqueda] = useState({
    nombre: "",
    categoria: "",
  });

  //fn para leer contenifo
  const obtenerDatos = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      className="col-12"
      onSubmit={(e) => {
        e.preventDefault();
        buscarRecetas(busqueda);
        setConsultar(true)
      }}
    >
      <fieldset className="text-center">
        <legend>Busca Bebidas por categoria o ingrediente</legend>
      </fieldset>
      <div className="row mt-4">
        <div className="col-md-4">
          <input
            name="nombre"
            className="form-control"
            type="text"
            placeholder="Buscar por ingrediente"
            onChange={obtenerDatos}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            name="categoria"
            onChange={obtenerDatos}
          >
            <option value="">--Selecciona Categoria--</option>
            {categorias.map((categoria) => (
              <option key={categoria.strCategory} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4"> 
          <input
            type="submit"
            className="btn btn-block btn-primary"
            name="Buscar Bebidas"
          />
        </div>
      </div>
    </form>
  );
};

export default Formulario;
