import * as Yup from "yup";

const reviewValidationSchema = Yup.object().shape({
  foto: Yup.string().url("Debe ingresar una imagen válida").required("La imagen es obligatoria"),
  comentario: Yup.string().min(3, "Mínimo 3 caracteres").max(100, "Máximo 100 caracteres").required("El comentario es obligatorio"),
  tipo: Yup.string().required("Debe seleccionar una etiqueta"),
  multimedia: Yup.string().required("Debe seleccionar un contenido al que reseñar"),
});
export default reviewValidationSchema;