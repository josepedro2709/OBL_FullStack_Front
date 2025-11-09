import React, { use, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cargarUsuario } from "../../store/slices/usuarioSlice";


const CambioPlan = () => {
    const dispatch=useDispatch();
    const usuario = useSelector((state) => state.usuario.usuario);
    const token = localStorage.getItem("token");
    const [mensaje, setMensaje] = useState("");
    if (!usuario) return <p>Cargando...</p>;

    const cambiarPlan = () => {
      if (usuario && usuario.plan === "plus") {
        const payload = { plan: "premium" };
        fetch(`http://localhost:3000/v1/user`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(payload),
        })
        .then(r => r.json())
        .then(r => {
          dispatch(cargarUsuario({ ...usuario, plan: "premium" }));
          setMensaje(r.message); 
        
        })
        .catch(err => {
          setMensaje("Ha ocurrido un error"); 
        });

      } else {
        setMensaje("Tu plan ya es premium");
      }
    
    };

    return (
      
      <div style={styles.container}>
          {mensaje && <p style={{ color: "blue", fontWeight: "bold" }}>{mensaje+"!"}</p>}
        <div>
          <span style={styles.label}>Tu plan es: </span>
          <span style={styles.planText}>{usuario.plan}</span>
        </div>
        <div>
          {usuario.plan === "plus" ? (
            <>
              <span style={styles.label}>Seleccione si desea promover su plan a Premium:</span>
              <br />
              <button style={styles.button} onClick={cambiarPlan}>
                Aumentar Plan
              </button>
            </>
          ) : (
            <>
              <button disabled style={styles.buttonDisabled} onClick={cambiarPlan}>
                  Cambiar Plan
              </button>
              <br />
              <span style={styles.label}>¡Ya tienes el plan Premium! Contactate si deseas bajar el nivel de tu suscripción.</span>
            </>
          )}
          <br />
        </div>
      </div>
    );
};

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
  buttonDisabled: {
    padding: "0.5rem 1rem",
    backgroundColor: "#999", 
    color: "#ccc",           
    border: "none",
    borderRadius: "8px",
    cursor: "not-allowed",
    fontWeight: "bold",
    opacity: 0.6,             
  },
};
export default CambioPlan;
