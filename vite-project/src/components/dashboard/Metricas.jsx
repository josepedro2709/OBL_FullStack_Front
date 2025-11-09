import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cargarUsuario } from "../../store/slices/usuarioSlice";


//imposibilidad de aceder al user. no lo encuentra en el llamado por alguna razon
const MetricasUso = () => {
  const reviews = useSelector((state) => state.reviews.listaResenias);
  const dispatch = useDispatch();
  const totalReviews = reviews.length;

  useEffect(() => {
    const fetchUsuario = async () => {
      const email = localStorage.getItem("usuario");
      console.log("email", email);
      if (!email) return;

      try {
        let token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/v1/user/email/${email}`,{
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
        });
        const data = await res.json();
        dispatch(cargarUsuario(data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsuario();
  }, [dispatch]);
  const usuario = useSelector((state) => state.usuario.usuario);
  const userPlan = usuario?.plan;
  const maxDocsPlus = 10;

  const porcentaje = Math.min((totalReviews / maxDocsPlus) * 100, 100);
  return (
    <div style={styles.container}>
      {userPlan === 'plus' ? (
        <>
          <div style={styles.label}>Uso de documentos:</div>
          <div style={styles.progressBarContainer}>
            <div style={styles.progressBar(porcentaje)} />
          </div>
          <div style={styles.porcentajeText}>{porcentaje}%</div>
        </>
      ) : (
        <div style={styles.label}>Total documentos: {totalReviews}</div>
      )}
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
export default MetricasUso;