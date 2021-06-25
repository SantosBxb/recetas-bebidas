import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";

//material ui
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: '60vw',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  scroll: { maxHeight: '98vh', overflowY: 'scroll', overflowX: 'none' }
}));

const Receta = ({ receta }) => {
  //config modal de material ui
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const clases = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //context
  const { setReceta, setIdReceta, informacion } = useContext(ModalContext);

  //muestra y formatea los ingredientes
  const mostrarIngredinetes = (informacion) => {
    let ingredientes = [];
    for (let i = 1; i < 16; i++) {
      if (informacion[`strIngredient${i}`]) {
        ingredientes.push(
          <li>
            {informacion[`strIngredient${i}`]} {informacion[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredientes;
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card text-center">
        <h2 className="card-header">{receta.strDrink}</h2>
        <img
          className="card-img-top"
          src={receta.strDrinkThumb}
          alt={`imagen de ${receta.strDrink}`}
        />
        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => {
              setIdReceta(receta.idDrink);
              handleOpen();
            }}
          >
            Ver Receta
          </button>

          <Modal
            open={open}
            onClose={() => {
              //para que cuandose cierre el modal el state de idreceta vuelva a estar inactivo
              setIdReceta(null);
              setReceta({});
              handleClose();
            }}
          >
            <div style={modalStyle} className={`${clases.scroll} ${clases.paper}`}>
              <h2>{informacion.strDrink}</h2>
              <h2 className="mt-4">Instrucciones</h2>
              <p>{informacion.strInstructions}</p>
              <img
                className="img-fluid mt-4"
                src={informacion.strDrinkThumb}
                alt={`imagen de ${informacion.strDrink}`}
              />
              <h3>Ingredientes y Cantidades</h3>
              <ul>{mostrarIngredinetes(informacion)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Receta;
