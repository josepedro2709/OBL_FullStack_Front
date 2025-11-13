import * as Yup from "yup";



const loginSchema = (t)=>Yup.object().shape({
  email: Yup.string()
    .email(t("login.errors.emailInvalid"))
    .required(t("login.errors.emailRequired")),
  password: Yup.string().required(t("login.errors.passwordRequired")),
});

export default loginSchema;
