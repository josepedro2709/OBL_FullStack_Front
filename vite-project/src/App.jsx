import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";

// Componentes
import Login from "./components/Login";
import Registro from "./components/Registro";
import Home from "./components/Home";
import "./App.css";

const RutasPrivadas = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

function App() {
  return (
    /*<Provider store={store}>*/
    <BrowserRouter>
      <RutasPrivadas />
    </BrowserRouter>
    /*</Provider>*/
  );
}

export default App;
