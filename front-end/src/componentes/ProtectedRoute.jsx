import { Navigate } from "react-router-dom";
import FadeIn from "./FadeIn"; // importe o componente criado acima

const ProtectedRoute = ({ user, isLoadingUser, children }) => {
  if (isLoadingUser) {
    return (
      <FadeIn>
        <div className="flex justify-center items-center h-[60vh] text-blue-800 text-lg">
          Carregando...
        </div>
      </FadeIn>
    );
  }

  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  return <FadeIn>{children}</FadeIn>;
};

export default ProtectedRoute;