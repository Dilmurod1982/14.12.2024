import { Navigate } from "react-router-dom";
import { useAppStore } from "./zustand/index";

const RoleBasedRedirect = () => {
  const rol = useAppStore((state) => state.rol);

  if (rol === "admin") {
    return <Navigate to="/" />;
  } else if (rol === "user") {
    return <Navigate to="/homeuser" />;
  }

  // Если роль не определена
  return <Navigate to="/login" />;
};

export default RoleBasedRedirect;
