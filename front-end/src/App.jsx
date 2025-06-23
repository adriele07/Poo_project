import Header from "./componentes/Header";
import Login from "./pages/Login";
import Place from "./pages/Place";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Account from "./pages/Account";
import NewPlace from "./componentes/NewPlace";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ProtectedRoute from "./utils/ProtectedRoute";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;

function App() {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  //  useEffect para restaurar o usuário do localStorage ao iniciar o app.
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
        <Header user={user} isLoadingUser={isLoadingUser} />

        {/* Configurando rotas para deixar o site mais dinâmico */}
        <main className="no-scrollbar flex-1 overflow-y-auto">
          <Routes>
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
      </BrowserRouter>
    </div>
  );
}

export default App;