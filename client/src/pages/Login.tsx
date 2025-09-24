import {
   Button,
   ButtonGroup,
   Card,
   Label,
   Spinner,
   TextInput,
} from "flowbite-react";
import type React from "react";
import { useEffect, useState } from "react";
import { RegisterUser, SignIn } from "../services/authAPI";
import type { ResponseLogRes, UserLogReg } from "../types/authTypes";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { IsEmail, valPass } from "../utils/validateUtil";

function Login() {
   const { token, login } = useAuth(); //Crearemos las variables de sesion
   const [email, setEmail] = useState<string>("");
   const [pass, setPass] = useState<string>("");
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isLogin, setIsLogin] = useState<boolean>(true); //True es para login y false registro

   const navigate = useNavigate();

   useEffect(() => {
      if (token) {
         //Si esta autenticado no lo dejamos entrar
         navigate("/");
      }
   }, [navigate, token]);

   const handleLogin = async (event: React.FormEvent) => {
      event.preventDefault(); //Cancelamos el evento submit del form
      setIsLoading(true);
      if (!(IsEmail(email) && valPass(pass))) {
         Swal.fire({
            title: "Error",
            text: "El formato del email o la contraseña son incorrectos. \nLa contraseña tiene que tener entre 8 y 15 caracteres, con letras mayúsculas y minúsculas, números y mínimo uno de estos caracteres especiales ($@$!%*?&_)",
            icon: "error",
         });
         setIsLoading(false);
         return false;
      }

      const logUser: UserLogReg = {
         email,
         password: pass,
      };
      try {
         const response: ResponseLogRes = isLogin
            ? await SignIn(logUser)
            : await RegisterUser(logUser);

         Swal.fire({
            title:
               (response.statusCode === 200 || response.statusCode === 201) &&
               response.token !== ""
                  ? "Bienvenido"
                  : "Error",
            text: response.message,
            icon:
               (response.statusCode === 200 || response.statusCode === 201) &&
               response.token !== ""
                  ? "success"
                  : "error",
         });

         // Si es registro o login
         if (
            (response.statusCode === 200 || response.statusCode === 201) &&
            response.token !== ""
         ) {
            //Login
            login(response.token); //Agregamos el token de autenticacion
            setTimeout(() => {
               navigate("/");
            }, 1500);
         }
      } catch (error) {
         console.log(error);
         Swal.fire({
            title: "Error",
            text: "Ocurrió un error inesperado",
            icon: "error",
         });
      }
      setIsLoading(false);
   };

   return (
      <div className="min-h-screen p-15 flex flex-col gap-4 ">
         <Card className="sm:m-auto justify-center">
            <form
               className="w-full flex  flex-col gap-4"
               onSubmit={handleLogin}
            >
               <ButtonGroup className="m-auto">
                  <Button
                     color="alternative"
                     onClick={() => setIsLogin(true)}
                     className={isLogin ? "border-b-5 border-sky-500" : ""}
                  >
                     Iniciar Sesión
                  </Button>
                  <Button
                     color="alternative"
                     onClick={() => setIsLogin(false)}
                     className={!isLogin ? "border-b-5 border-sky-500" : ""}
                  >
                     Registrarse
                  </Button>
               </ButtonGroup>
               <p className="w-full text-3xl sm:text-5xl justify-center text-center font-bold dark:text-white">
                  {isLogin ? "Iniciar Sesión" : "Registrarse"}
               </p>
               <div>
                  <div className="mb-2 block">
                     <Label className="text-sm" htmlFor="email">
                        E-mail
                     </Label>
                  </div>
                  <TextInput
                     id="email"
                     type="email"
                     placeholder="Ingresa tu e-mail"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                     shadow
                  />
               </div>
               <div>
                  <div className="mb-2 block">
                     <Label className="text-sm" htmlFor="password">
                        Password
                     </Label>
                  </div>
                  <TextInput
                     id="password"
                     type="password"
                     value={pass}
                     onChange={(e) => setPass(e.target.value)}
                     placeholder="Password"
                     required
                     shadow
                  />
               </div>

               <Button type="submit" pill disabled={isLoading}>
                  {isLoading ? (
                     <>
                        <Spinner
                           size="sm"
                           aria-label="Cargando"
                           className="me-3"
                           light
                        />
                        Cargando...
                     </>
                  ) : isLogin ? (
                     "Iniciar Sesión"
                  ) : (
                     "Registrarse"
                  )}
               </Button>
            </form>
         </Card>
      </div>
   );
}

export default Login;
