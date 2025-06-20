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
        localStorage.setItem("user", JSON.stringify(userDoc)); // [Adriele adicionou ] Salva o usuário no localStorage para manter login após F5
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
        <h2 className="text-3xl font-bold">Faça seu login</h2>
        <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Digete sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full rounded-full border border-gray-300 px-4 py-2"
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
          <div className="w-full rounded bg-red-100 px-3 py-2 text-red-700 text-sm text-center border border-red-300">
            {errorMsg}
          </div>
        )}
        <p>
          Ainda não tem uma conta?{" "}
          <Link to="/Register" className="font-semibold underline">
            Registre-se aqui!
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
