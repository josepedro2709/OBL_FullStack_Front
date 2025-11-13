import * as Yup from "yup";

const reviewValidationSchema =(t)=> Yup.object().shape({
  foto: Yup.string().url(t("review.errors.fotoUrl")).required(t("review.errors.fotoRequired")),
  comentario: Yup.string().min(3, t("review.errors.comentarioMin")).max(100, t("review.errors.comentarioMax")).required(t("review.errors.comentarioRequired")),
  tipo: Yup.string().required(t("review.errors.tipoRequired")),
  multimedia: Yup.string().required(t("review.errors.multimediaRequired")),
});
export default reviewValidationSchema;