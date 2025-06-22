import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import FadeInLog from "../utils/FadeInLog";
import Spline from "@splinetool/react-spline";

const Login = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // Limpa erro anterior
    if (email && senha) {
      try {
        const { data: userDoc } = await axios.post("/login", {
          email,
          senha,
        });
        setUser(userDoc);
        localStorage.setItem("user", JSON.stringify(userDoc)); // Salva o usuário no localStorage para manter login após F5
        setRedirect(true);
      } catch (error) {
        let msg = "Erro ao logar.";
        if (error.response && error.response.data) {
          if (typeof error.response.data === "string") {
            msg = error.response.data;
          } else if (error.response.data.detail) {
            msg = error.response.data.detail;
          } else if (error.response.data.message) {
            msg = error.response.data.message;
          } else {
            msg = JSON.stringify(error.response.data);
          }
        }
        setErrorMsg(msg);
      }
    } else {
      setErrorMsg("Verifique se email e senha foram preenchidos corretamente!");
    }
  };

  if (redirect || user) {
    return <Navigate to="/" />;
  }

  return (
    <section className="flex h-full flex-col items-center justify-center bg-[#000921] md:flex-row">

      <FadeInLog duration={800} delay={300}>
        <div className="mx-6 mt-10 flex w-full max-w-md flex-col items-center gap-4 md:absolute md:left-0 md:mt-0 md:w-1/2">
        <h2 className="text-3xl font-bold text-white">Faça seu login</h2>
        <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full rounded-full border border-gray-300 bg-white/10 px-4 py-2 text-white placeholder-white backdrop-blur"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full rounded-full border border-gray-300 bg-white/10 px-4 py-2 text-white placeholder-white backdrop-blur"
            required
          />
          <button
            type="submit"
            className="bg-primary-button w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 font-bold text-white"
          >
            Login
          </button>
        </form>
        {errorMsg && (
          <div className="w-full rounded border border-red-300 bg-red-100 px-3 py-2 text-center text-sm text-red-700">
            {errorMsg}
          </div>
        )}
        <p className="text-white">
          Ainda não tem uma conta?{" "}
          <Link to="/Register" className="font-semibold underline">
            Registre-se aqui!
          </Link>
        </p>
      </div>
      </FadeInLog>

      

      {/* <'Spline'
        className="flex h-[400px] w-full items-center justify-center md:h-full md:w-1/2"
        scene="https://prod.spline.design/mcNlCXKkC049EVep/scene.splinecode"
      />*/}

      <Spline
        className="flex h-[400px] w-full items-center justify-center md:h-full md:w-1/2"
        scene="https://prod.spline.design/RNeAXRSagCe9VLWn/scene.splinecode"
      />
    </section>
  );
};

export default Login;
