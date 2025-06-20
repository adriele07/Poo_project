import React, { useState } from "react";

const AccProfile = ({user}) => {
   // if (!user) return<></>;
   const [redirect, setRedirect] = useState(false)

   const logout = async () => {
    cont
   }

  return (
    <div className="flex flex-col items-center gap-2 p-8">
      <p>Logado como {user?.name} ({user?.email})</p>

      <button onClick={logout} className="bg-primary-400 hover:bg-primary-button min-w-44 cursor-pointer rounded-full px-4 py-2 text-white transition">
            Logout
            

      </button>
    </div>
  );
};

export default AccProfile;
