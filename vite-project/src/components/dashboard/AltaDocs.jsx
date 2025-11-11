import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import reviewValidationSchema from "../../validations/reviewValidations";
import {
  cargarTipos,
  cargarMultimedia,
} from "../../store/slices/renderizadosSlice";
import { crearResenia } from "../../store/slices/reviewsSlice";

const URL_BASE = import.meta.env.VITE_URL_BASE;

const fotosDisponibles = [
  {
    id: 1,
    src: "https://res.cloudinary.com/ds1u1bvf3/image/upload/v1762630649/download_1_mx2z4p.jpg",
    tipo: "Resumen",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/ds1u1bvf3/image/upload/v1762630825/Trim_Possible_in_Hanoi_Vietnam_mfkyhp.jpg",
    tipo: "Recomendacion",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/ds1u1bvf3/image/upload/v1762630825/download_wuefo4.jpg",
    tipo: "Critica",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/ds1u1bvf3/image/upload/v1762630832/Rating_illustration_ginmij.jpg",
    tipo: "Comentario",
  },
];
//problema con campo etiquetaId y comentario: aunque en el payload del network puedo ver que esta ok me marca como si llegase mal
const Altadoc = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(reviewValidationSchema),
    defaultValues: {
      comentario: "",
      tipo: "",
      foto: "",
      etiquetaId: "",
      multimedia: "",
    },
  });
  const dispatch = useDispatch();

  const [fotoSeleccionada, setFotoSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const Multimedias = useSelector(
    (state) => state.renderizados.listaMultimedias
  );
  const Etiquetas = useSelector((state) => state.renderizados.listaTipos);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
    const fetchData = async () => {
      await fetch(`${URL_BASE}/v1/etiquetas`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }).then((r) =>
        r.json().then((datos) => {
          dispatch(cargarTipos(datos));
        })
      );
      await fetch(`${URL_BASE}/v1/multimedia`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }).then((r) =>
        r.json().then((datos) => {
          dispatch(cargarMultimedia(datos));
        })
      );
    };
    fetchData();
  }, []);

  const handleFotoClick = (foto) => {
    const tipoEncontrado = Etiquetas.find((t) => t.nombre === foto.tipo);
    setFotoSeleccionada(foto);
    setValue("tipo", tipoEncontrado.nombre);
    setValue("etiquetaId", tipoEncontrado._id);
    setValue("foto", foto.src);
  };

  const onSubmit = (data) => {
    const payload = {
      imagen: data.foto,
      comentario: data.comentario,
      etiquetaId: data.etiquetaId,
      multimediaId: data.multimedia,
    };
    console.log("Payload enviado:", payload);
    fetch(`${URL_BASE}/v1/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((res) => {
        setMensaje(res.message);
        reset();
        setFotoSeleccionada(null);
        if (res.review) {
          dispatch(crearResenia(res.review));
        }
      })
      .catch((err) => {
        setMensaje("Ha ocurrido un error");
        console.error(err);
      });
  };

  return (
    <form style={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="foto"
        control={control}
        render={({ field }) => (
          <input {...field} type="hidden" /> //guarda en el form la url de la foto seleccionada
        )}
      />
      <Controller
        name="etiquetaId"
        control={control}
        render={({ field }) => <input {...field} type="hidden" />}
      />

      <div>
        <p style={styles.label}>Elegí el tipo de tu reseña</p>
        <div style={styles.fotosContainer}>
          {fotosDisponibles.map((f) => (
            <img
              name="foto"
              key={f.id}
              src={f.src}
              alt={f.tipo}
              style={{
                ...styles.foto,
                ...(fotoSeleccionada?.id === f.id ? styles.selectedFoto : {}),
              }}
              onClick={() => handleFotoClick(f)}
            />
          ))}
        </div>
      </div>

      <div>
        <Controller
          name="tipo"
          control={control}
          render={({ field }) => (
            <input {...field} style={styles.input} type="text" readOnly />
          )}
        />
        <p style={styles.label}>Seleccioná el contenido a reseñar</p>
        <Controller
          name="multimedia"
          control={control}
          render={({ field }) => (
            <select {...field} style={styles.input}>
              <option value="">-- Elegí uno --</option>
              {Multimedias.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.titulo}
                </option>
              ))}
            </select>
          )}
        />
        {errors.multimedia && (
          <p style={styles.error}>{errors.multimedia.message}</p>
        )}
      </div>

      <div>
        <p style={styles.label}>Comentario</p>
        <Controller
          name="comentario"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              style={styles.textarea}
              placeholder="Escribí tu reseña..."
            />
          )}
        />
        {errors.comentario ? (
          <p className="error">{errors.comentario.message}</p>
        ) : null}
      </div>

      <button style={styles.button} type="submit">
        Agregar Reseña
      </button>
      {mensaje && (
        <p style={{ color: "blue", fontWeight: "bold" }}>{mensaje}</p>
      )}
    </form>
  );
};

const styles = {
  formContainer: {
    backgroundColor: "#fff",
    border: "3px solid #000",
    borderRadius: "12px",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  fotosContainer: {
    display: "flex",
    gap: "1rem",
    justifyContent: "space-between",
  },
  foto: {
    width: "90px",
    height: "100px",
    objectFit: "cover",
    border: "2px solid #122ae0",
    borderRadius: "8px",
    cursor: "pointer",
  },
  selectedFoto: {
    border: "4px solid #122ae0",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "8px",
    border: "2px solid #122ae0",
    width: "100%",
  },
  textarea: {
    padding: "0.5rem",
    borderRadius: "8px",
    border: "2px solid #122ae0",
    width: "100%",
    minHeight: "80px",
  },
  button: {
    padding: "0.6rem 1rem",
    backgroundColor: "#122ae0",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
};

export default Altadoc;
