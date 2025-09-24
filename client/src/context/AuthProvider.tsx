import {  useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

//Provider para la autenticacion
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(sessionStorage.getItem("token_jwt_url"));

  const login = (newToken: string) => {//Funcion Logeo
    sessionStorage.setItem("token_jwt_url", newToken);
    setToken(newToken);
  };

  const logout = () => {//Funcion de registro
    sessionStorage.removeItem("token_jwt_url");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};