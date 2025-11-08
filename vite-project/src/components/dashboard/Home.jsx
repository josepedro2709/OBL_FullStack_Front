import React from "react";
import Header from "./Header";
import Metricas from "./Metricas";
import Graficos from "./Graficos";
import ListadoDocs from "./ListadoDocs";
import AgregarDoc from "./AltaDoc";
import CambioPlan from "./CambioPlan";


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
  },
  columnaIzquierda: {
    flex: 3,
  },
  columnaDerecha: {
    flex: 1,
  },
  seccionInferior: {
    display: "flex",
    gap: "1rem",
  },
  columnaIzquierdaInferior: {
    flex: 1,          
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
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
          <CambioPlan />
          <Metricas />
        </div>
        <div style={styles.columnaDerechaInferior}>
          <Graficos />
        </div>
      </div>
    </div>
  );
};

export default Home;

