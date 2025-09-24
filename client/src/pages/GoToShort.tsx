import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { valShortUrlCode } from "../utils/validateUtil";
import type { Url } from "../types/urlTypes";
import { getOriginalURL } from "../services/urlAPI";
import image_404 from "../assets/404.png";
import image_500 from "../assets/500.png";

export function GoToShort() {
   const { short_url_code } = useParams();
   const [isError, setIsError] = useState<boolean>(false);
   const [msg, setMsg] = useState<string>("");//Mensaje de la respuesta
   const [errCode, setErrCode] = useState<number>(0);//Codigo de la respuesta en caso de error

   useEffect(() => {
      if (short_url_code) {//Revisamos si se recibio un codigo como parametro de la URL
         getURL(short_url_code);
      }
   }, [short_url_code]);

   //Funcion para mandar a obtener la informacion 
   const getURL = async (short_url_code: string) => {
      if (valShortUrlCode(short_url_code)) {//Validamos primero que el codigo cumpla con las reglas
         const response: Url = await getOriginalURL(short_url_code);

         if (response.statusCode == 200) {//Si se obtubo la informacion redirigimos a la URL original
            window.open(response.original_url, "_self", "noopener,noreferrer");
         } else {//En caso de error mostramos un mensaje
            setIsError(true);
            setErrCode(response.statusCode);
            setMsg(response.message);
         }
      } else {//Si no es valido el codigo
         setIsError(true);
         setErrCode(404);
         setMsg("URL no encontrada");
      }
   };

   return (
      <>
         <div className="min-h-screen p-15 flex flex-col gap-4">
            {!isError ? (
               <>
                  <h1 className="w-full text-3xl sm:text-5xl justify-center text-center font-bold">
                     Serás redirigido en un momento, espera…
                  </h1>
                  <div className="text-center">
                     <Spinner
                        color="purple"
                        aria-label="center-aligned spinner example "
                        size="xl"
                     />
                  </div>
               </>
            ) : (
               <div className="justify-center conten">
                  <h1 className="w-full text-2xl sm:text-3xl justify-center text-center font-bold">
                     Error<br></br>
                     {msg}
                  </h1>
                  <p className="text-xl  justify-center text-center font-bold">
                     Asegúrate que la URL este bien escrita e intenta de nuevo.
                  </p>
                  <img
                     src={errCode === 404 ? image_404 : image_500}
                     className="mx-auto "
                     width="500px"
                  />
               </div>
            )}
         </div>
      </>
   );
}
