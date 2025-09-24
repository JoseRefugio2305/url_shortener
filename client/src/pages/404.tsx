import image_404 from "../assets/404.png";

export function NotFound404() {
   return (
      <>
         <div className="min-h-screen p-15 flex flex-col gap-4">
            <div className="justify-center content">
               <h1 className="w-full text-2xl sm:text-3xl justify-center text-center font-bold">
                  Error
               </h1>
               <p className="text-xl  justify-center text-center font-bold">
                  Asegúrate que la URL este bien escrita e intenta de nuevo.
               </p>
               <img src={image_404} className="mx-auto " width="500px" />
            </div>
         </div>
      </>
   );
}
