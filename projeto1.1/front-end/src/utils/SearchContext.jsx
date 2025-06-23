import { createContext, useContext, useState } from "react";

// Cria o contexto para armazenar o termo de busca globalmente
const SearchContext = createContext();

// Provider: componente que envolve a aplicação e fornece o contexto de busca
export function SearchProvider({ children }) {
  // Estado que guarda o termo digitado na barra de pesquisa
  const [search, setSearch] = useState("");
  return (
    // O value disponibiliza search e setSearch para todos os componentes filhos
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

// Hook customizado para acessar o contexto de busca facilmente
export function useSearch() {
  // Retorna o objeto { search, setSearch } para qualquer componente que usar esse hook
  return useContext(SearchContext);
}
