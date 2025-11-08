import React, { useState } from "react";
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
    width: "70px",
    height: "70px",
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

const fotosDisponibles = [
  { id: 1, src: "https://via.placeholder.com/150?text=Foto1", tipo: "Cine" },
  { id: 2, src: "https://via.placeholder.com/150?text=Foto2", tipo: "Serie" },
  { id: 3, src: "https://via.placeholder.com/150?text=Foto3", tipo: "Videojuego" },
  { id: 4, src: "https://via.placeholder.com/150?text=Foto4", tipo: "Libro" },
];

const Altadoc = () => {
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null);
  const [comentario, setComentario] = useState("");

  const handleFotoClick = (foto) => {
    setFotoSeleccionada(foto);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fotoSeleccionada || !comentario) {
      alert("Completá todos los campos");
      return;
    }
    // Aquí irá la lógica para enviar a backend + Cloudinary si hace falta
    console.log("Foto:", fotoSeleccionada);
    console.log("Comentario:", comentario);
  };

  return (
    <form style={styles.formContainer} onSubmit={handleSubmit}>
      <div>
        <p style={styles.label}>Elegí una foto</p>
        <div style={styles.fotosContainer}>
          {fotosDisponibles.map((f) => (
            <img
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
        <p style={styles.label}>Tipo de reseña</p>
        <input
          style={styles.input}
          type="text"
          value={fotoSeleccionada ? fotoSeleccionada.tipo : ""}
          readOnly
        />
      </div>

      <div>
        <p style={styles.label}>Comentario</p>
        <textarea
          style={styles.textarea}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Escribí tu reseña..."
        />
      </div>

      <button style={styles.button} type="submit">
        Agregar Reseña
      </button>
    </form>
  );
};

export default Altadoc;