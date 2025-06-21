import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NomeResponsivo({ nomeCompleto }) {
  const iniciais = nomeCompleto
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <>
      <p className="block sm:hidden">{iniciais.toUpperCase()}</p>
      <p className="hidden max-w-20 truncate sm:block">{nomeCompleto}</p>
    </>
  );
}

const Header = ({ user, isLoadingUser }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showUser, setShowUser] = useState(false);

  useEffect(() => {
    let timeout;

    if (isLoadingUser) {
      // Inicia carregamento
      setShowSpinner(true);
      setShowUser(false);
    } else if (user) {
      // Aguarda um tempo mínimo antes de esconder o spinner e mostrar o nome
      timeout = setTimeout(() => {
        setShowSpinner(false);
        setShowUser(true);
      }, 500); // Ex: 500ms de transição suave
    } else {
      // Nada carregado, mostra nenhum
      setShowSpinner(false);
      setShowUser(false);
    }

    return () => clearTimeout(timeout);
  }, [isLoadingUser, user]);

  return (
    <header className="shadow-md">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
        <Link to="/" className="flex items-center">
          <img className="h-13 w-20" src="/Logo.png" alt="Logo" />
        </Link>

        <Link
          to="/"
          className="absolute left-1/2 hidden -translate-x-1/2 transform items-center rounded-full border border-gray-300 py-2 pr-4 pl-6 shadow-md lg:flex"
        >
          <p className="border-r border-r-gray-300 pr-4">Qualquer lugar</p>
          <p className="border-r border-r-gray-300 px-4">Qualquer semana</p>
          <p className="px-4">Hóspede</p>
          <div className="bg-primary-400 rounded-full p-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </Link>

        <Link
          to={user ? "/Account/profile" : "/Login"}
          className="flex items-center gap-2 rounded-full border border-gray-300 py-2 pr-4 pl-6 shadow-md"
        >
          {/* Ícones */}
          <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" className="size-10 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>

          {/* Transição suave: spinner ou nome */}
          {showSpinner && (
            <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-gray-600 rounded-full" />
          )}
          {showUser && (
            <NomeResponsivo nomeCompleto={user?.name || user?.nome || "Usuário"} />
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;