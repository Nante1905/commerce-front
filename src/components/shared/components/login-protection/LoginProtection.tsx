import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginProtection = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
};

export default LoginProtection;
