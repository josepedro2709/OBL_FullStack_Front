import { t } from "i18next";
import * as Yup from "yup";

const registroSchema =(t)=> Yup.object().shape({
  name: Yup.string()
    .min(2, t("registro.errors.nameMin"))
    .required(t("registro.errors.nameRequired")),
  email: Yup.string()
    .email(t("registro.errors.emailInvalid"))
    .required(t("registro.errors.emailRequired")),
  password: Yup.string().required(t("registro.errors.passwordRequired")),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], t("registro.errors.confirmMatch"))
    .required(t("registro.errors.confirmRequired")),
});

export default registroSchema;
