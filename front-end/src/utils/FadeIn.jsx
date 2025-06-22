import { useEffect, useState } from "react";

const FadeIn = ({ children, duration = 600, delay = 100 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="transition-opacity"
      style={{
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0px)' : 'translateY(10px)',
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;