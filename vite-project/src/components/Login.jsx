import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "./validations/loginSchema";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const URL_BASE = import.meta.env.VITE_URL_BASE;

  const campoEmail = useRef(null);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("formulario enviado: ", data);
    setError(false);

    fetch(`${URL_BASE}/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("usuario", campoEmail.current.value);
          navigate("/dashboard/home");
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  // Observar los valores del formulario para habilitar/deshabilitar el botón
  const emailValue = watch("email");
  const passwordValue = watch("password");

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow p-4" style={{ width: "380px" }}>
          <h3 className="text-center mb-4 text-primary fw-bold">
            Iniciar Sesión
          </h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="txtUser" className="form-label">
                Correo electrónico
              </label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    id="txtUser"
                    ref={campoEmail}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="usuario@correo.com"
                  />
                )}
              />
              {errors.email && (
                <div className="invalid-feedback d-block">
                  {errors.email.message}
                </div>
              )}
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
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="********"
                  />
                )}
              />
              {errors.password && (
                <div className="invalid-feedback d-block">
                  {errors.password.message}
                </div>
              )}
            </div>

            {error && (
              <div className="alert alert-danger py-2">
                Credenciales incorrectas
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100 mb-2"
              disabled={!isValid}
            >
              Ingresar
            </button>
          </form>

          <div className="text-center">
            <Link to="/registro" className="text-decoration-none">
              ¿No tenés cuenta? Registrate acá
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
