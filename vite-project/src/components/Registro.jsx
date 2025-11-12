import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registroSchema from "./validations/registroSchema";
const Registro = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const name = useRef(null);
  const user = useRef(null);
  const pass = useRef(null);
  const confirmPass = useRef(null);

  const URL_BASE = import.meta.env.VITE_URL_BASE;

  /*  useEffect(() => {
    localStorage.clear();
    setBtn(true);
  }, []); */

  const registro = () => {
    let campoName = name.current.value;
    let campoUser = user.current.value;
    let campoPass = pass.current.value;
    if (!campoUser || !campoPass || !campoName) {
      setError(true);
      return;
    }

    setError(false);

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
          navigate("/");
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(registroSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log("formulario enviado: ", data);
    registro();
    alert("Exito, formulario enviado correctamente");
    reset();
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4 text-success fw-bold">Crear Cuenta</h3>

        <div className="mb-3">
          <label htmlFor="txtName" className="form-label">
            Nombre completo
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
            Correo electrónico
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
            Contraseña
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
            Confirmar contraseña
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
            Error al registrar usuario
          </div>
        )}

        <button
          className="btn btn-success w-100 mb-2"
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
        >
          Registrarse
        </button>

        <div className="text-center">
          <Link to="/login" className="text-decoration-none">
            ¿Ya tenés cuenta? Iniciá sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;
