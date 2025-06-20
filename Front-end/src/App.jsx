import Header from "./componentes/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Account from "./pages/Account";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <BrowserRouter>
        <Header user = {user} />

        {/* Configurando rotas para deixar o site mais dinâmico */}
        <main className="no-scrollbar flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login user = {user} setUser = {setUser} />} />
            <Route path="/Register" element={<Register setUser = {setUser} />} />
            <Route path="/Account/:subpage?" element={<Account user={user} />} />

          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
