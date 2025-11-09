import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cargarResenias } from "../../store/slices/reviewsSlice";

import toast, { Toaster } from "react-hot-toast";

const ListadoDocs = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const resenias = useSelector((state) => state.reviews.listaResenias);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    }
    fetch("http://localhost:3000/v1/reviews", {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }).then((r) =>
      r.json().then((datos) => {
        dispatch(cargarResenias(datos));
      })
    );
  }, []);

  const eliminar = (id) => {
    toast((t) => (
      <div>
        <p>¿Seguro que querés eliminar este review?</p>
        <button onClick={() => { onEliminar(id); toast.dismiss(t.id); }}>OK</button>
        <button onClick={() => toast.dismiss(t.id)}>Cancelar</button>
      </div>
    ), { duration: Infinity });
  };

  const onEliminar = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/v1/reviews/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const nuevasReviews = resenias.filter(r => r._id !== id);
      dispatch(cargarResenias(nuevasReviews));
      toast.success("Review eliminado correctamente");
    } else {
      toast.error("Error al eliminar el review");
    }
  } catch (err) {
    console.log(err);
    toast.error("Ocurrió un error al eliminar");
  }
};

  return (
    <div style={styles.listadoContenedor}>
    {resenias.length > 0 ? (
        resenias.map((r) => (
            <div key={r._id} style={styles.tarjeta}>
            <img src={r.imagen} alt={r.multimedia} style={styles.imagen} />
            <h5 style={styles.titulo}>{r.multimediaId.titulo}</h5>
            <p style={styles.comentario}>{r.comentario}</p>

            <div style={styles.infoYBotones}>
                <div style={styles.info}>
                <p style={styles.tipo}>Tipo: {r.etiquetaId.nombre}</p>
                <p style={styles.fecha}>Fecha: {r.createdAt}</p>
                </div>

                <div style={styles.botones}>
                <button style={styles.botonEditar} >Editar</button>
                <button style={styles.botonEliminar} onClick={() => eliminar(r._id)}>Eliminar</button>
                </div>
            </div>
            </div>
        ))
    ) : (
        <p style={{ color: "#fff", fontWeight: "bold" }}>
        No ha registrado ninguna reseña todavía
        </p>
        
    )}
    <Toaster /> 
    </div>
  )
};
const styles = {
  listadoContenedor: {
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
    gap: "1rem",
    padding: "1rem 0",
    height: "100%", 
  },
  tarjeta: {
    flex: "0 0 32%",  
    border: "3px solid #000",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "4px 4px 0 #000",
    flexShrink: 0,
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  imagen: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "2px solid #122ae0",
    marginBottom: "0.5rem",
  },
  titulo: {
    color: "#122ae0",
    fontWeight: "bold",
    marginBottom: "0.4rem",
  },
  comentario: {
    fontSize: "0.9rem",
    marginBottom: "0.4rem",
  },
  infoYBotones: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: "0.6rem",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    fontSize: "0.85rem",
  },
  tipo: {
    fontWeight: "bold",
  },
  fecha: {
    color: "gray",
    fontSize: "0.8rem",
  },
  botones: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  botonEditar: {
    backgroundColor: "#122ae0",
    color: "#fff",
    border: "2px solid #000",
    borderRadius: "6px",
    padding: "0.3rem 0.8rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  botonEliminar: {
    backgroundColor: "#fff",
    color: "#122ae0",
    border: "2px solid #000",
    borderRadius: "6px",
    padding: "0.3rem 0.8rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default ListadoDocs;
