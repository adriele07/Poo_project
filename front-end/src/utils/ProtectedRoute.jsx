import { Navigate } from "react-router-dom";
import FadeIn from "./FadeIn"; 

const ProtectedRoute = ({ user, isLoadingUser, children }) => {
  if (isLoadingUser) {
    return (
      <FadeIn duration={800} delay={300}>
        <div className="flex h-[60vh] items-center justify-center text-lg text-blue-800">
          Carregando...
        </div>
      </FadeIn>
    );
  }

  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  return (
    <FadeIn duration={800} delay={300}>
      {children}
    </FadeIn>
    
  );
};

export default ProtectedRoute;