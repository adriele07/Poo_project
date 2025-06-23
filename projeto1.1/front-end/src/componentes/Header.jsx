import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
// Importa o hook do contexto de busca para acessar e modificar o termo pesquisado
import { useSearch } from "../utils/SearchContext";

// Componente para mostrar o nome do usuário de forma responsiva
function NomeResponsivo({ nomeCompleto }) {
  // Gera as iniciais do nome para telas pequenas
  const iniciais = nomeCompleto
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <>
      {/* Mostra só as iniciais no mobile */}
      <p className="block sm:hidden">{iniciais.toUpperCase()}</p>
      {/* Mostra o nome completo em telas maiores */}
      <p className="hidden max-w-20 truncate sm:block">{nomeCompleto}</p>
    </>
  );
}

const Header = ({ user, isLoadingUser }) => {
  // Estado para controlar animação de carregamento e exibição do usuário
  const [showSpinner, setShowSpinner] = useState(false);
  const [showUser, setShowUser] = useState(false);
  // Estado para mostrar ou esconder a barra de pesquisa
  const [showSearchBar, setShowSearchBar] = useState(false);
  // Pega o termo de busca e a função para alterá-lo do contexto
  const { search, setSearch } = useSearch();
  // Ref para focar automaticamente o input da barra de pesquisa
  const inputRef = useRef(null);

  useEffect(() => {
    let timeout;
    // Controla o spinner e a transição do nome do usuário
    if (isLoadingUser) {
      setShowSpinner(true);
      setShowUser(false);
    } else if (user) {
      timeout = setTimeout(() => {
        setShowSpinner(false);
        setShowUser(true);
      }, 500); // Espera 500ms para transição suave
    } else {
      setShowSpinner(false);
      setShowUser(false);
    }
    return () => clearTimeout(timeout);
  }, [isLoadingUser, user]);

  useEffect(() => {
    // Foca o input quando a barra de pesquisa aparece
    if (showSearchBar && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearchBar]);

  return (
    <header className="shadow-md">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
        {/* Logo do site */}
        <Link to="/" className="flex items-center">
          <img className="h-13 w-20" src="/Logo.png" alt="Logo" />
        </Link>

        {/* Barra de pesquisa sobreposta, aparece ao clicar na lupa */}
        {showSearchBar && (
          <div className="absolute left-1/2 top-1/2 z-50 flex w-[350px] -translate-x-1/2 -translate-y-1/2 transform items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 shadow-lg">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)} // Atualiza o termo de busca
              placeholder="Buscar por palavra-chave..."
              className="flex-1 bg-transparent outline-none"
              onKeyDown={(e) => e.key === "Escape" && setShowSearchBar(false)} // Fecha ao apertar ESC
            />
            <button
              onClick={() => setShowSearchBar(false)} // Botão para fechar a barra
              className="ml-2 text-gray-500 hover:text-gray-800"
              title="Fechar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Bloco central com "Qualquer lugar", "Qualquer semana", "Hóspede" e a lupa */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 transform items-center rounded-full border border-gray-300 py-2 pr-4 pl-6 shadow-md lg:flex">
          <p className="border-r border-r-gray-300 pr-4">Qualquer lugar</p>
          <p className="border-r border-r-gray-300 px-4">Qualquer semana</p>
          <p className="px-4">Hóspede</p>
          {/* Botão da lupa: abre/fecha a barra de pesquisa */}
          <button
            className="bg-primary-400 rounded-full p-2 text-white focus:outline-none"
            onClick={() => setShowSearchBar((v) => !v)}
            title="Buscar acomodação"
            aria-label="Buscar acomodação"
            type="button"
          >
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
          </button>
        </div>

        {/* Bloco do usuário (login/perfil) e ícones */}
        <Link
          to={user ? "/Account/profile" : "/Login"}
          className="flex items-center gap-2 rounded-full border border-gray-300 py-2 pr-4 pl-6 shadow-md"
        >
          {/* Ícone de menu hamburguer */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6 text-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>

          {/* Ícone de usuário */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-10 text-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>
          {/* Mostra spinner de carregamento ou nome do usuário */}
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