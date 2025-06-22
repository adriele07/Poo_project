import { useEffect, useState, isValidElement, cloneElement } from "react";

const FadeInLog = ({ children, duration = 600, delay = 100 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Garante que só aplica em elementos válidos
  if (!isValidElement(children)) return children;

  const style = {
    transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(10px)',
    willChange: 'opacity, transform',
    ...(children.props.style || {}),
  };

  return cloneElement(children, {
    style,
  });
};

export default FadeInLog;