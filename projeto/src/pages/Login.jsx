import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

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
    <section className="flex h-full items-center justify-center">
      <div className="mx-7 flex w-full max-w-96 flex-col items-center gap-4">
        <h2 className="text-2xl font-bold">Login</h2>
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border px-3 py-2"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="rounded border px-3 py-2"
            required
          />
          <button type="submit" className="rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
            Entrar
          </button>
        </form>
        {errorMsg && (
          <div className="w-full rounded bg-red-100 px-3 py-2 text-red-700 text-sm text-center border border-red-300">
            {errorMsg}
          </div>
        )}
        <p>
          Não tem conta? <Link to="/Register" className="text-blue-600">Cadastre-se</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
