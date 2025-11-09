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
    marginTop: "5rem",
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    overflow: 'hidden', 
    gap: '16px', 
  },
  columnaIzquierda: {
    border: "3px solid #000",      
    borderRadius: "12px",
    backgroundColor: "#3761a6",
    flex: 3,
    display: 'flex',
    overflowX: 'auto', 
    overflowY: 'hidden',
    gap: '16px',
    padding: '8px',
    boxSizing: 'border-box',
    maxHeight: '100%', 
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
    border: "3px solid #000",     
    borderRadius: "12px",          
    padding: "1rem",               
    marginTop: "1rem",             
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

