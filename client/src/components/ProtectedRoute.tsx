import {  type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

//Componente para revisar si el usuario esta autenticado para porder ingresar en la ruta
function ProtectedRoute({ children }: { children: ReactNode }) {
   const {token} = useAuth()
   //Revisamos si existe un token de acceso
   if (!token) {
      return <Navigate to="/" />;
   }

   return children;
}

export default ProtectedRoute;
