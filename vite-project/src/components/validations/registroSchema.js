import * as Yup from "yup";

const registroSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Debe tener al menos 2 caracteres")
    .required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Format de correo invalido")
    .required("El correo es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contrasenas deben coincidir")
    .required("Confirmar la contrasena es obligatorio"),
});

export default registroSchema;
