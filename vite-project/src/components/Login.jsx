import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [boton, setBtn] = useState(true);

  const user = useRef(null);
  const pass = useRef(null);

  useEffect(() => {
    localStorage.clear();
    setBtn(true);
  }, []);

  const verificarCampos = () => {
    let campoUser = user.current.value;
    let campoPass = pass.current.value;

    if (campoUser.length > 0 && campoPass.length > 0) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  };

  const ingresar = () => {
    let campoUser = user.current.value;
    let campoPass = pass.current.value;
    if (!campoUser || !campoPass) {
      setError(true);
      return;
    }

    setError(false);

    fetch("https://obl-full-stack-um6b.vercel.app/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: campoUser,
        password: campoPass,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.token);

        if (data) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("usuario", campoUser);
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

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow p-4" style={{ width: "380px" }}>
          <h3 className="text-center mb-4 text-primary fw-bold">
            Iniciar Sesión
          </h3>

          <div className="mb-3">
            <label htmlFor="txtUser" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              id="txtUser"
              className="form-control"
              placeholder="usuario@correo.com"
              ref={user}
              onChange={verificarCampos}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="txtPass" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="txtPass"
              className="form-control"
              placeholder="********"
              ref={pass}
              onChange={verificarCampos}
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2">
              Credenciales incorrectas
            </div>
          )}

          <button
            className="btn btn-primary w-100 mb-2"
            disabled={boton}
            onClick={ingresar}
          >
            Ingresar
          </button>

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
