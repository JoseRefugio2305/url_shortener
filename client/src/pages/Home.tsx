import { Button, Spinner, TextInput } from "flowbite-react";
import type React from "react";
import { useState } from "react";
import { urlShorten } from "../services/urlAPI";
import type { Url } from "../types/urlTypes";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { HiLink, HiOutlineScissors } from "react-icons/hi";
import { IsURL } from "../utils/validateUtil";

function Home() {
   const { token } = useAuth();
   const [url, setURL] = useState<string>("");
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const URL_PAGE = import.meta.env.VITE_BASE_URL_PAGE; //URL propio de esta pagina para agregarlo al shortcode
   const navigate = useNavigate();

   //Funcion para procesar peticion de acortar URL
   const handleShorten = async (event: React.FormEvent) => {
      event.preventDefault(); //Cancelamos el submit del form
      setIsLoading(true);

      if (!token) {
         //Si no esta logeado lo invitamos a hacerlo
         Swal.fire({
            title: "¿Quieres Iniciar sesión?",
            text: "Primero debes iniciar sesión para poder acortar un URL",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Iniciar sesión",
            cancelButtonText: `Cancelar`,
         }).then((result) => {
            if (result.isConfirmed) {
               navigate("/login");
            }
         });
         setIsLoading(false);
         return false;
      } else if (!IsURL(url)) {
         //validamos que sea una URL
         Swal.fire({
            title: "Alerta",
            text: "Lo que ingresaste no es una URL ",
            icon: "warning",
         });
         setIsLoading(false);
         return false;
      }

      try {
         const response: Url = await urlShorten(url); //Hacemos la peticion para acortar el URL
         if (response.statusCode == 201) {
            //Si el acortamiento fue exitoso
            setURL("");
            Swal.fire({
               title: response.message,
               icon: "success",
               html: `<b>${response.short_url}</b>`,
               showCloseButton: true,
               confirmButtonText: ` Copiar`,
            }).then(async (result) => {
               if (result.isConfirmed) {
                  await navigator.clipboard.writeText(
                     `${URL_PAGE + response.short_url}`
                  );
                  Swal.fire({
                     title: "",
                     text: "El URL acortado fue copiado exitosamente.",
                     icon: "success",
                  });
               }
            });
         } else {
            //En caso de error
            Swal.fire({
               title: "Error",
               text: response.message,
               icon: "error",
            });
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

   //Funcion para redirigir al link acortado
   const visitURL = () => {
      if (!IsURL(url)) {
         //validamos que sea una URL
         Swal.fire({
            title: "Alerta",
            text: "Lo que ingresaste no es una URL ",
            icon: "warning",
         });
         
         return false;
      }
      window.open(url, "_blank", "noopener,noreferrer");
   };

   return (
      <div className="min-h-screen p-15 flex flex-col gap-4">
         <h1 className="w-full text-3xl sm:text-5xl justify-center text-center font-bold">
            Acortador de URLs
         </h1>
         <form onSubmit={handleShorten} className="flex w-full flex-col gap-4">
            <TextInput
               id="url"
               type="text"
               placeholder="Ingresa el URL"
               value={url}
               onChange={(e) => setURL(e.target.value)}
               required
               sizing="lg"
               shadow
            />

            <div className="flex flex-col gap-4 sm:flex-row  text-sm sm:text-xl ">
               <Button
                  pill
                  type="submit"
                  className=" text-sm sm:text-xl sm:w-full sm:mr-20 sm:ml-10"
                  size="xl"
                  color={"green"}
                  disabled={isLoading}
               >
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
                  ) : (
                     <>
                        <HiOutlineScissors className="me-2 h-4 w-4" />
                        Acortar URL
                     </>
                  )}
               </Button>
               <Button
                  pill
                  className=" text-sm sm:text-xl sm:w-full sm:mr-10 sm:ml-20"
                  size="xl"
                  onClick={visitURL}
                  disabled={isLoading}
               >
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
                  ) : (
                     <>
                        <HiLink className="me-2 h-4 w-4" />
                        Visitar URL
                     </>
                  )}
               </Button>
            </div>
         </form>
      </div>
   );
}

export default Home;
