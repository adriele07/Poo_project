import Header from "./componentes/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Account from "./pages/Account";
import NewPlace from "./componentes/NewPlace";
import Place from "./pages/Place";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ProtectedRoute from "./utils/ProtectedRoute";
// Importa o SearchProvider para fornecer o contexto de busca para toda a aplicação
import { SearchProvider } from "./utils/SearchContext";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;

function App() {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  // useEffect para restaurar o usuário do localStorage ao iniciar o app.
  // Isso garante que o usuário continue logado mesmo após atualizar a página (F5).
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoadingUser(false); // Finaliza o carregamento
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <BrowserRouter>
        {/*
          Envolve toda a aplicação com SearchProvider para que o contexto de busca
          (search/setSearch) fique disponível em qualquer componente, como Header e Home.
          Isso permite que a barra de pesquisa funcione globalmente e o filtro seja aplicado.
        */}
        <SearchProvider>
          <Header user={user} isLoadingUser={isLoadingUser} />

          {/* Configurando rotas para deixar o site mais dinâmico */}
          <main className="no-scrollbar flex-1 overflow-y-auto">
            <Routes>
              {/*
                As rotas permanecem iguais, mas agora Home e outros componentes podem acessar
                o contexto de busca para filtrar acomodações conforme o termo digitado.
              */}
              <Route
                path="/login"
                element={<Login user={user} setUser={setUser} />}
              />
              <Route path="/register" element={<Register setUser={setUser} />} />
              <Route path="/" element={<Home />} />

              <Route
                path="/account/:subpage/:action?/:id?"
                element={
                  <ProtectedRoute user={user} isLoadingUser={isLoadingUser}>
                    <Account user={user} setUser={setUser} />
                  </ProtectedRoute>
                }
              />
              <Route path="/account/places/new" element={<NewPlace />} />
              <Route path="/account/places/:id" element={<NewPlace />} />
              <Route path="/places/:id" element={<Place />} />
            </Routes>
          </main>
        </SearchProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;