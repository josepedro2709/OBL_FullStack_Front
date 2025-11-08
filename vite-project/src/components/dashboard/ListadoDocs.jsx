const styles = {
  listadoContenedor: {
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
    gap: "1rem",
    overflowX: "auto",
    padding: "1rem",
  },
  tarjeta: {
    flex: "0 0 calc(33.33% - 1rem)",
    minWidth: "130px",
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

const ListadoDocs = () => {
  const reseñas = [
    {
      id: 1,
      imagen: "imagen",
      multimedia: "Película: Inception",
      comentario: "Excelente trama y fotografía impecable.",
      tipo: "Cine",
      fecha: "2025-11-07",
    },
    {
      id: 2,
      imagen: "imagen",
      multimedia: "Serie: Dark",
      comentario: "Intrigante y compleja, una obra maestra.",
      tipo: "Serie",
      fecha: "2025-10-28",
    },
     {
      id: 3,
      imagen: "imagen",
      multimedia: "Serie: Dark",
      comentario: "Intrigante y compleja, una obra maestra.",
      tipo: "Serie",
      fecha: "2025-10-28",
    },
    {
      id: 4,
      imagen: "imagen",
      multimedia: "Serie: Dark",
      comentario: "Intrigante y compleja, una obra maestra.",
      tipo: "Serie",
      fecha: "2025-10-28",
    },
    {
      id: 5,
      imagen: "imagen",
      multimedia: "Serie: Dark",
      comentario: "Intrigante y compleja, una obra maestra.",
      tipo: "Serie",
      fecha: "2025-10-28",
    }
  ];

  return (
    <div style={styles.listadoContenedor}>
      {reseñas.map((r) => (
        <div key={r.id} style={styles.tarjeta}>
          <img src={r.imagen} alt={r.multimedia} style={styles.imagen} />
          <h5 style={styles.titulo}>{r.multimedia}</h5>
          <p style={styles.comentario}>{r.comentario}</p>

          <div style={styles.infoYBotones}>
            <div style={styles.info}>
              <p style={styles.tipo}>Tipo: {r.tipo}</p>
              <p style={styles.fecha}>Fecha: {r.fecha}</p>
            </div>

            <div style={styles.botones}>
              <button style={styles.botonEditar}>Editar</button>
              <button style={styles.botonEliminar}>Eliminar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListadoDocs;


