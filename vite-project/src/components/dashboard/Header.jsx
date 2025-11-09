import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { resetReviews } from "../../store/slices/reviewsSlice";
import { resetUsuario } from "../../store/slices/usuarioSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cerrarSesion = () => {
    dispatch(resetReviews());
    dispatch(resetUsuario());
    localStorage.removeItem("token");
    localStorage.removeItem("usuario"); 
    navigate("/"); 
 };
  return (
    <header style={styles.header}>
      <h2 style={styles.title}>Mi Dashboard</h2>
      <button style={styles.button} onClick={cerrarSesion}>Cerrar sesión</button>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#c2cad9ff",
    width: "100vw",             
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    position: "fixed",           
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  title: {
    color: "#122ae0",
    margin: 0,
    fontWeight: "bold",
  },
  button: {
    border: "2px solid #122ae0",
    color: "#122ae0",
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "0.4rem 0.8rem",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Header;