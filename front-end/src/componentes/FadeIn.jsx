import { useEffect, useState } from "react";

const FadeIn = ({ children, duration = 700 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`opacity-0 transition-opacity duration-${duration} ${
        isVisible ? "opacity-100" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default FadeIn;