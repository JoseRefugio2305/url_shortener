import { createContext } from "react";

interface AuthContextType {
   token: string | null;
   login: (token: string) => void;
   logout: () => void;
}

//Creamos el contexto de autenticacion
export const AuthContext = createContext<AuthContextType | null>(null);
