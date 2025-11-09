import React, { useState } from "react";

const styles = {
  container: {
    backgroundColor: "#fff",
    border: "3px solid #000",
    borderRadius: "12px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  label: {
    fontWeight: "bold",
  },
  planText: {
    fontSize: "1.1rem",
    color: "#122ae0",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#122ae0",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
};

const CambioPlan = () => {
  const [plan, setPlan] = useState("Básico"); 

  const cambiarPlan = () => {
    //temporal 
    setPlan("Plus");
    alert("Tu plan ha sido promovido a Plus");
  };

  return (
    <div style={styles.container}>
      <div>
        <span style={styles.label}>Tu plan es: </span>
        <span style={styles.planText}>{plan}</span>
      </div>
      <div>
        <span style={styles.label}>Seleccione si desea promover su plan a Plus:</span>
        <br />
        <button style={styles.button} onClick={cambiarPlan}>
          Cambiar Plan
        </button>
      </div>
    </div>
  );
};

export default CambioPlan;
