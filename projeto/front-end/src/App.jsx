import Header from "./componentes/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";


axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;

function App() {
  const [user, setUser] = useState(null);
  //  useEffect para restaurar o usuário do localStorage ao iniciar o app.
  // Isso garante que o usuário continue logado mesmo após atualizar a página (F5).
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <BrowserRouter>
              {/* [A feiura que eu disse que adicionei Cayo] Agora o Header recebe setUser para permitir logout ao clicar em "Sair" */}
        <Header user={user} setUser={setUser} />


        {/* Configurando rotas para deixar o site mais dinâmico */}
        <main className="no-scrollbar flex-1 overflow-y-auto">
          <Routes>
            <Route path="/Login" element={<Login user = {user} setUser = {setUser} />} />
            <Route path="/Register" element={<Register setUser = {setUser} />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
