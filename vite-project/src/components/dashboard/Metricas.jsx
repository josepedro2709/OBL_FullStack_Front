import React, { useState } from "react";

const styles = {
  container: {
    backgroundColor: "#fff",
    border: "3px solid #000",
    borderRadius: "12px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontWeight: "bold",
    color: "#122ae0",
  },
  progressBarContainer: {
    backgroundColor: "#e0e0e0",
    borderRadius: "8px",
    height: "20px",
    width: "100%",
    overflow: "hidden",
  },
  progressBar: (porcentaje) => ({
    width: `${porcentaje}%`,
    height: "100%",
    backgroundColor: "#122ae0",
    borderRadius: "8px",
    transition: "width 0.3s ease",
  }),
  porcentajeText: {
    fontWeight: "bold",
    textAlign: "right",
    color: "#122ae0",
  },
};

const MetricasUso = () => {
  const [porcentaje] = useState(65); // valor provisorio

  return (
    <div style={styles.container}>
      <span style={styles.label}>Porcentaje de uso:</span>
      <div style={styles.progressBarContainer}>
        <div style={styles.progressBar(porcentaje)}></div>
      </div>
      <span style={styles.porcentajeText}>{porcentaje}%</span>
    </div>
  );
};
export default MetricasUso;