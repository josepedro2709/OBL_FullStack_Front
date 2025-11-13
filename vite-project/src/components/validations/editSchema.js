import * as Yup from "yup";

const editSchema = Yup.object().shape({
  slcMultimedia: Yup.string()
    .oneOf(
      [
        "68e1b061d38409c1242dae8e",
        "68e8239aa2fd3cab5bd7815f",
        "68e8239aa2fd3cab5bd78160",
        "68e8239aa2fd3cab5bd78161",
        "68e8239aa2fd3cab5bd78162",
        "68e8239aa2fd3cab5bd78163",
        "68e8239aa2fd3cab5bd78164",
        "68e8239aa2fd3cab5bd78165",
        "68e8239aa2fd3cab5bd78166",
        "68e8239aa2fd3cab5bd78167",
      ],
      "Seleccione una opcion"
    )
    /* .required("La multimedia es obligatoria") */,
  comentario: Yup.string()
    .min(3, "Debe tener al menos 3 caracteres")
    .required("El comentario es obligatorio"),
});

export default editSchema;
