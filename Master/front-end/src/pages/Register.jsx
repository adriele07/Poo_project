import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import FadeInLog from "../utils/FadeInLog";
import axios from "axios";

const Register = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (name && email && password) {
      try {
        await axios.post("/usuarios", {
          nome: name,
          email,
          senha: password,
        });

        // Mostrar animação de sucesso
        setShowSuccess(true);
      } catch (error) {
        let msg = "Erro ao registrar.";
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
      setErrorMsg("Preencha todos os campos!");
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  if (redirect) {
    return <Navigate to="/Login" />;
  }

  if (showSuccess) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[#000921]">
        <div className="animate-bounce rounded-full bg-green-500 p-6 shadow-lg">
          <svg
            className="h-10 w-10 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="font-semibold text-white">
          Cadastro realizado com sucesso!
        </p>
      </div>
    );
  }

  return (
    <section className="flex h-full items-center justify-center bg-[#000921]">
      <FadeInLog duration={800} delay={300}>
        <div className="mx-7 flex w-full max-w-96 flex-col items-center gap-4">
          <h1 className="text-3xl font-bold text-white">Faça seu cadastro</h1>
          <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full rounded-full bg-white/10 px-4 py-2 text-white placeholder-white backdrop-blur-lg"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="w-full rounded-full bg-white/10 px-4 py-2 text-white placeholder-white backdrop-blur-lg"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full rounded-full bg-white/10 px-4 py-2 text-white placeholder-white backdrop-blur-lg"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-primary-button w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 font-bold text-white">
              Registrar
            </button>
          </form>
          {errorMsg && (
            <div className="w-full rounded border border-red-300 bg-red-100 px-3 py-2 text-center text-sm text-red-700">
              {errorMsg}
            </div>
          )}
          <p className="text-white">
            Já tem uma conta?{" "}
            <Link to="/Login" className="font-semibold underline">
              Logue aqui!
            </Link>
          </p>
        </div>
      </FadeInLog>
    </section>
  );
};

export default Register;
