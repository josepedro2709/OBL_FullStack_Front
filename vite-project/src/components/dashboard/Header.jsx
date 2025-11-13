import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { resetReviews } from "../../store/slices/reviewsSlice";
import { resetUsuario } from "../../store/slices/usuarioSlice";
import { useTranslation } from "react-i18next";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const cambiarIdioma = (lang) => {
    i18n.changeLanguage(lang);
  };

  const cerrarSesion = () => {
    dispatch(resetReviews());
    dispatch(resetUsuario());
    localStorage.removeItem("token");
    localStorage.removeItem("usuario"); 
    navigate("/login"); 
  };
  
  return (
    <header style={styles.header}>
      <div style={styles.leftContainer}>
        <h2 style={styles.title}>{t("header.title")}</h2>
        <div style={styles.languageContainer}>
          <button style={styles.langButton} onClick={() => cambiarIdioma("es")}>ES</button>
          <button style={styles.langButton} onClick={() => cambiarIdioma("en")}>EN</button>
        </div>
      </div>
      <button style={styles.button} onClick={cerrarSesion}>{t("header.logout")}</button>
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
  },leftContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px", 
  },
    languageContainer: {
    display: "flex",
    gap: "6px",
    background: "#f5f5f5",
    padding: "6px 10px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  langButton: {
    background: "#e0e0e0",
    color: "#333",
    border: "none",
    borderRadius: "4px",
    padding: "4px 8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Header;