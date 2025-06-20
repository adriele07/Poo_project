import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccProfile = ({ user, setUser }) => {
  // if (!user) return<></>;
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  // Isso garante que o usuário só saia ao clicar em "Sair".
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser && setUser(null);
    navigate("/Login"); // <-- redireciona para login
  };

  return (
    <div className="flex flex-col items-center gap-2 p-8">
      <p>
        Logado como {user?.nome} ( {user?.email} )
      </p>

      <button
        onClick={handleLogout}
        className="bg-primary-400 hover:bg-primary-button min-w-44 cursor-pointer rounded-full px-4 py-2 text-white transition"
      >
        Logout
      </button>
    </div>
  );
};

export default AccProfile;
