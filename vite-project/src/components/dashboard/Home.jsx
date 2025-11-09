import React from "react";
import Header from "./Header";
import Metricas from "./Metricas";
import Graficos from "./Graficos";
import ListadoDocs from "./ListadoDocs";
import AgregarDoc from "./AltaDocs";
import CambioPlan from "./CambioPlanU";


const styles = {
  dashboard: {
    backgroundColor: "#95b4e8",
    minHeight: "100vh",
    padding: "2rem",
  },
  seccionPrincipal: {
    backgroundColor: "#3761a6",
    border: "3px solid #000",
    borderRadius: "16px",
    marginTop: "6rem",
    padding: "1rem",
    boxShadow: "5px 5px 0 #000",
    display: "flex",
    gap: "1rem",
    height: "500px", // altura fija para controlar scroll
  },
  columnaIzquierda: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
  },
  columnaDerecha: {
    flex: 1,
  },
  seccionInferior: {
    display: "flex",
    gap: "1rem",
  },
  columnaIzquierdaInferior: {
    backgroundColor: "#3761a6",       
    border: "3px solid #000",      // Borde negro grueso
    borderRadius: "12px",          // Bordes redondeados
    padding: "1rem",               // Espacio interno entre los componentes
    marginTop: "1rem",             
    display: "flex",
    flexDirection: "column",
    gap: "1rem",                   // Espacio entre los dos componentes internos
  },
  columnaDerechaInferior: {
    flex: 3,         
  },
};



const Home = () => {
  return (
    <div style={styles.dashboard}>
      <Header />
      <div style={styles.seccionPrincipal}>
        <div style={styles.columnaIzquierda}>
          <ListadoDocs />
        </div>
        <div style={styles.columnaDerecha}>
          <AgregarDoc />
        </div>
      </div>
      <div style={styles.seccionInferior}>
        <div style={styles.columnaIzquierdaInferior}>
          <Metricas />
          <CambioPlan />
        </div>
        <div style={styles.columnaDerechaInferior}>
          <Graficos />
        </div>
      </div>
    </div>
  );
};

export default Home;

