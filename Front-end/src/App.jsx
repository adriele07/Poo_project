import Header from "./componentes/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />

      {/* Configurando rotas para deixar o site mais dinâmico */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
