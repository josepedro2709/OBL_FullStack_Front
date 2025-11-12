import React, { useState } from "react";
import Header from "./Header";
import Metricas from "./Metricas";
import Graficos from "./Graficos";
import ListadoDocs from "./ListadoDocs";
import AgregarDoc from "./AltaDocs";
import CambioPlan from "./CambioPlanU";

const Home = () => {
  // 👇 Estado para el filtro
  const [filtro, setFiltro] = useState("todos");

  return (
    <div style={styles.dashboard}>
      <Header />
      <div style={styles.seccionPrincipal}>
        <div style={styles.columnaIzquierda}>
          {/* Selector de filtro */}
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            style={{
              width: "100%",
              height: "30px",
              background: "#919beaff",
              borderRadius: "6px",
              border: "2px solid #000",
              color: "#000",
              fontWeight: "bold",
              fontFamily: "inherit",
            }}
          >
            <option value="todos">Historico</option>
            <option value="mes">Ultimo Mes</option>
            <option value="semana">Ultima Semana</option>
          </select>

          {/* Pasamos el valor del filtro al Listado */}
          <ListadoDocs filtro={filtro} />
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

const styles = {
  dashboard: {
    backgroundColor: "#95b4e8",
    minHeight: "100vh",
    padding: "2rem",
  },
  seccionPrincipal: {
    marginTop: "5rem",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    gap: "16px",
  },
  columnaIzquierda: {
    border: "3px solid #000",
    borderRadius: "12px",
    backgroundColor: "#3761a6",
    flex: 3,
    display: "flex",
    overflowX: "auto",
    overflowY: "hidden",
    gap: "16px",
    padding: "25px 5px 10px 10px",
    boxSizing: "border-box",
    maxHeight: "100%",
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
    border: "3px solid #000",
    borderRadius: "12px",
    padding: "1rem",
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    flex: 2,
  },
  columnaDerechaInferior: {
    backgroundColor: "#a9b4c8ff",
    border: "3px solid #000",
    borderRadius: "12px",
    padding: "1rem",
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    flex: 2,
  },
};

export default Home;
