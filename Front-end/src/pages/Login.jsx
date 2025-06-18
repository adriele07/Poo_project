import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Login = ({user, setUser}) => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [redirect, setRedirect] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //Verificação de preenchimento de email e senha
    if ( email && password ) {
      try {
        const {data: userDoc} = await axios.post('/users/login', {
          email,
          password,
        });
        
        setUser(userDoc)
        setRedirect(True)
        
      } catch (error) {
        alert(`Erro ao logar: ${error.response.data}`)
      }
    } else {
      alert('Verifique se email e senha foram preenchidos corretamente!')
    }

  };

  if (redirect || user) {
   return <Navigate to = "/" />;
  }
  
  return (
    <section className="flex h-full items-center justify-center">
      <div className="mx-7 flex w-full max-w-96 flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Faça seu login</h1>
        <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            placeholder="Digite seu email"

            value={email}
            onChange = {(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            placeholder="Digete sua senha"

            value={password}
            onChange = {(e) => setPassword(e.target.value)}
          />
          <button className="bg-primary-button w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 font-bold text-white">
            Login
          </button>
        </form>

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
