import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cargarResenias,
  deleteResenia,
  editarResenia,
} from "../../store/slices/reviewsSlice";
import { cargarMultimedia } from "../../store/slices/renderizadosSlice";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const ListadoDocs = ({ filtro }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const resenias = useSelector((state) => state.reviews.listaResenias) || [];
  const Multimedias =
  useSelector((state) => state.renderizados.listaMultimedias) || [];
  const URL_BASE = import.meta.env.VITE_URL_BASE;
  const token = localStorage.getItem("token");

  const [editandoId, setEditandoId] = useState(null);
  const [comentarioEditado, setComentarioEditado] = useState("");
  const [multimediaEditada, setMultimediaEditada] = useState("");
  const [etiquetaEditada, setEtiquetaEditada] = useState("");
  const [imagenEditada, setImagenEditada] = useState("");

  useEffect(() => {
    if (!token) navigate("/login");

    fetch(`${URL_BASE}/v1/reviews`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((datos) => {
        if (Array.isArray(datos)) dispatch(cargarResenias(datos));
        else dispatch(cargarResenias([]));
      });

    fetch(`${URL_BASE}/v1/multimedia`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((datos) => dispatch(cargarMultimedia(datos)));
  }, []);

  const filtrarPorFecha = (lista) => {
    if (filtro === "todos") return lista;
    const ahora = new Date();
    let limite = new Date();

    if (filtro === "mes") {
      limite.setMonth(ahora.getMonth() - 1);
    } else if (filtro === "semana") {
      limite.setDate(ahora.getDate() - 7);
    }

    return lista.filter((r) => new Date(r.createdAt) >= limite);
  };

  const reseniasFiltradas = filtrarPorFecha(resenias);

  const eliminar = (id) => {
    toast(

      (toastInstance) => (
        <div>
          <p>{t("listadoDocs.toasts.confirmDelete")}</p>
          <button
            onClick={() => {
              onEliminar(id);
              toast.dismiss(toastInstance.id);
            }}
          >
            {t("listadoDocs.buttons.ok")}
          </button>
          <button onClick={() => toast.dismiss(toastInstance.id)}>{t("listadoDocs.buttons.cancel")}</button>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const onEliminar = async (id) => {
    try {
      const res = await fetch(`${URL_BASE}/v1/reviews/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (res.ok) {
        dispatch(deleteResenia(id));
        toast.success(t("listadoDocs.toasts.deleteOk"));
      } else {
        toast.error(t("listadoDocs.toast.deletedError"));
      }
    } catch {
      toast.error(t("listadoDocs.toast.deletedException"));
    }
  };

  const activarEdicion = (resenia) => {
    setEditandoId(resenia._id);
    setComentarioEditado(resenia.comentario);

    const multimediaValue =
      typeof resenia.multimediaId === "object"
        ? resenia.multimediaId._id
        : resenia.multimediaId;

    const etiquetaValue =
      typeof resenia.etiquetaId === "object"
        ? resenia.etiquetaId._id
        : resenia.etiquetaId;

    setMultimediaEditada(multimediaValue);
    setImagenEditada(resenia.imagen);
    setEtiquetaEditada(etiquetaValue);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setComentarioEditado("");
    setMultimediaEditada("");
    setImagenEditada("");
    setEtiquetaEditada("");
  };

  const guardarEdicion = async (resenia) => {
    try {
      const res = await fetch(`${URL_BASE}/v1/reviews/${resenia._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          imagen: imagenEditada,
          comentario: comentarioEditado,
          multimediaId: multimediaEditada,
          etiquetaId: etiquetaEditada,
        }),
      });

      if (res.ok) {
        const multimediaCompleta = Multimedias.find(
          (m) => m._id === multimediaEditada
        );
        dispatch(
          editarResenia({
            ...resenia,
            imagen: imagenEditada,
            comentario: comentarioEditado,
            multimediaId: multimediaCompleta,
            etiquetaId: etiquetaEditada,
          })
        );
        toast.success(t("listadoDocs.toasts.updatedOk"));
        cancelarEdicion();
      } else {
        toast.error(t("listadoDocs.toasts.updatedError"));
      }
    } catch {
      toast.error(t("listadoDocs.toasts.updatedException"));
    }
  };

  return (
    <div style={styles.listadoContenedor}>
      {reseniasFiltradas.length > 0 ? (
        reseniasFiltradas.map((r) => (
          <div key={r._id} style={styles.tarjeta}>
            <img src={r.imagen} alt={r.multimedia} style={styles.imagen} />

            {editandoId === r._id ? (
              <>
                <p style={styles.labelEdit}>{t("listadoDocs.editSelect")}</p>
                <select
                  value={multimediaEditada}
                  onChange={(e) => setMultimediaEditada(e.target.value)}
                  style={styles.selectEdicion}
                >
                  <option value="">{t("listadoDocs.placeholderSeleccion")}</option>
                  {Multimedias.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.titulo}
                    </option>
                  ))}
                </select>

                <p style={styles.labelEdit}>{t("listadoDocs.editComentario")}</p>
                <textarea
                  value={comentarioEditado}
                  onChange={(e) => setComentarioEditado(e.target.value)}
                  style={styles.textareaEdicion}
                  rows="4"
                />
              </>
            ) : (
              <>
                <h5 style={styles.titulo}>{r.multimediaId.titulo}</h5>
                <p style={styles.comentario}>{r.comentario}</p>
              </>
            )}

            <div style={styles.infoYBotones}>
              <div style={styles.info}>
                <p style={styles.tipo}>{t("listadoDocs.type")} {r.etiquetaId.nombre}</p>
                <p style={styles.fecha}>{t("listadoDocs.date")} {new Date(r.updatedAt).toLocaleDateString()}</p>
              </div>

              <div style={styles.botones}>
                {editandoId === r._id ? (
                  <>
                    <button
                      style={styles.botonGuardar}
                      onClick={() => guardarEdicion(r)}
                    >
                      {t("listadoDocs.buttons.save")}
                    </button>
                    <button
                      style={styles.botonCancelar}
                      onClick={cancelarEdicion}
                    >
                      {t("listadoDocs.buttons.cancel")}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={styles.botonEditar}
                      onClick={() => activarEdicion(r)}
                    >
                      {t("listadoDocs.buttons.edit")}
                    </button>
                    <button
                      style={styles.botonEliminar}
                      onClick={() => eliminar(r._id)}
                    >
                      {t("listadoDocs.buttons.delete")}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: "#fff", fontWeight: "bold" }}>
          {t("listadoDocs.noReviews")}
        </p>
      )}
      <Toaster />
    </div>
  );
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
    minHeight: "60px",
  },
  labelEdit: {
    fontSize: "0.85rem",
    fontWeight: "bold",
    marginBottom: "0.3rem",
    color: "#122ae0",
  },
  selectEdicion: {
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
    padding: "0.5rem",
    borderRadius: "6px",
    border: "2px solid #122ae0",
    width: "100%",
    fontFamily: "inherit",
  },
  textareaEdicion: {
    fontSize: "0.9rem",
    marginBottom: "0.4rem",
    padding: "0.5rem",
    borderRadius: "6px",
    border: "2px solid #122ae0",
    width: "100%",
    fontFamily: "inherit",
    resize: "vertical",
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
  tipo: { fontWeight: "bold" },
  fecha: { color: "gray", fontSize: "0.8rem" },
  botones: { display: "flex", flexDirection: "column", gap: "0.4rem" },
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
  botonGuardar: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "2px solid #000",
    borderRadius: "6px",
    padding: "0.3rem 0.8rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  botonCancelar: {
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "2px solid #000",
    borderRadius: "6px",
    padding: "0.3rem 0.8rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default ListadoDocs;
