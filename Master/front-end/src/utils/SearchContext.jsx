import { createContext, useContext, useState, useMemo } from "react";
import { SearchManager } from "../utils/SearchManager";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [manager] = useState(() => new SearchManager());
  const [input, setInput] = useState(""); // usado para re-renderizar

  const setSearch = (novoTermo) => {
    manager.termo = novoTermo;
    setInput(manager.termo); // força atualização no React
  };

  const limparBusca = () => {
    manager.limpar();
    setInput(""); // atualiza o estado
  };

  const value = useMemo(() => ({
    search: manager.termo,
    setSearch,
    limparBusca,
    historico: manager.getHistorico(),
  }), [manager, input]);

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}