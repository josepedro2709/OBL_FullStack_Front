import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registroSchema from "./validations/registroSchema";
import { useTranslation } from "react-i18next";
const Registro = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const cambiarIdioma = (lang) => {
    i18n.changeLanguage(lang);
  };
  const [error, setError] = useState(null);

  const name = useRef(null);
  const user = useRef(null);
  const pass = useRef(null);
  const confirmPass = useRef(null);

  const URL_BASE = import.meta.env.VITE_URL_BASE;


  const registro = () => {
    let campoName = name.current.value;
    let campoUser = user.current.value;
    let campoPass = pass.current.value;

    fetch(`${URL_BASE}/v1/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: campoName,
        email: campoUser,
        password: campoPass,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("usuario", campoUser);
          alert("Exito, formulario enviado correctamente");
          reset();
          navigate("/");
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        setError("Error en el registro");
      });
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(registroSchema(t)),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    registro();
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <div style={{ position: "absolute", top: 10, right: 10 }}>
            <button onClick={() => cambiarIdioma("es")}>ES</button>
            <button onClick={() => cambiarIdioma("en")}>EN</button>
        </div>
        <h3 className="text-center mb-4 text-success fw-bold">Crear Cuenta</h3>

        <div className="mb-3">
          <label htmlFor="txtName" className="form-label">
            {t("registro.name")}
          </label>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="txtName"
                className="form-control"
                placeholder="Juan Pérez"
                ref={name}
              />
            )}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="txtEmail" className="form-label">
            {t("registro.email")}
          </label>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <input
                {...field}
                type="email"
                id="txtEmail"
                className="form-control"
                placeholder="usuario@correo.com"
                ref={user}
              />
            )}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="txtPass" className="form-label">
           {t("registro.password")}
          </label>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <input
                {...field}
                type="password"
                id="txtPass"
                className="form-control"
                placeholder="********"
                ref={pass}
              />
            )}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="txtConfirmPass" className="form-label">
            {t("registro.confirmPassword")}
          </label>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <input
                {...field}
                type="password"
                id="txtConfirmPass"
                className="form-control"
                placeholder="********"
                ref={confirmPass}
              />
            )}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>

        {error && (
          <div className="alert alert-danger py-2">
            {error}
          </div>
        )}

        <button
          className="btn btn-success w-100 mb-2"
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
        >
          {t("registro.submit")}
        </button>

        <div className="text-center">
          <Link to="/login" className="text-decoration-none">
            {t("registro.accesoSignIn")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;
