import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccProfile = ({ user, setUser }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggingOut(true); // inicia o spinner

    // Simula um pequeno delay para UX melhor (opcional)
    setTimeout(() => {
      localStorage.removeItem("user");
      setUser && setUser(null);
      navigate("/Login");
    }, 800); // tempo em ms
  };

  return (
    <div className="flex flex-col items-center gap-2 p-8">
      <p>
        Logado como {user?.nome} ( {user?.email} )
      </p>

      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="bg-primary-400 hover:bg-primary-button min-w-44 cursor-pointer rounded-full px-4 py-2 text-white transition disabled:opacity-50 disabled:cursor-wait"
      >
        {isLoggingOut ? (
          <span className="flex items-center justify-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full" />
            Saindo...
          </span>
        ) : (
          "Logout"
        )}
      </button>
    </div>
  );
};

export default AccProfile;