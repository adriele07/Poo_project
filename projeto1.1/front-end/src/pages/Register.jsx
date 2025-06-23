import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Register = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (name && email && password) {
      try {
        const { data: userDoc } = await axios.post("/usuarios", {
          nome: name,
          email,
          senha: password,
        });
        setUser && setUser(userDoc);
        setRedirect(true);
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

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <section className="flex h-full items-center justify-center bg-[#000921]">
      <div className="mx-7 flex w-full max-w-96 flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-white">Faça seu cadastro</h1>
        <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full rounded-full border border-gray-300 bg-white/10 px-4 py-2 text-white placeholder-white backdrop-blur"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="w-full rounded-full border border-gray-300 bg-white/10 px-4 py-2 text-white placeholder-white backdrop-blur"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full rounded-full border border-gray-300 bg-white/10 px-4 py-2 text-white placeholder-white backdrop-blur"
            placeholder="Digete sua senha"
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
    </section>
  );
};

export default Register;
