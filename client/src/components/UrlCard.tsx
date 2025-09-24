import type { FC } from "react";
import type { UrlCardProps } from "../types/urlTypes";
import {
   HiOutlineExternalLink,
   HiOutlinePencilAlt,
   HiOutlineTrash,
   HiTrendingUp,
} from "react-icons/hi";
import { Button, Tooltip } from "flowbite-react";

const UrlCard: FC<UrlCardProps> = ({
   short_url,
   original_url,
   clicks,
   last_accessed_at,
   onEdit,
   onDelete,
   onStats,
}) => {
   const URL_PAGE = import.meta.env.VITE_BASE_URL_PAGE; //URL propio de esta pagina para agregarlo al shortcode

   return (
      <div className="bg-[#D9D9D9] shadow-xl rounded-2xl p-4 flex flex-col gap-3  hover:shadow-2xl hover:bg-[#B5B5B5] hover:border-1 transition">
         {/* URL corta */}
         <div className="m-auto">
            <p className="text-sm text-gray-500 font-bold">URL Acortada</p>
            <Tooltip content="Visitar Link">
               <a
                  href={`${URL_PAGE + short_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline flex flex-row"
               >
                  {short_url}
                  <HiOutlineExternalLink />
               </a>
            </Tooltip>
         </div>

         {/* URL original */}
         <div>
            <p className="text-sm text-gray-500 font-bold">URL Original</p>
            <p className="text-gray-800 truncate">{original_url}</p>
         </div>

         {/* Estadísticas */}
         <div className="flex justify-between text-sm text-gray-600 flex-col sm:flex-row">
            <span className="font-bold">
               Clicks: <b>{clicks}</b>
            </span>
            <span className="font-bold">
               Última visita:{" "}
               {last_accessed_at ? (
                  <b>{last_accessed_at}</b>
               ) : (
                  <span className="italic">Nunca</span>
               )}
            </span>
         </div>

         {/* Botones de acción */}
         <div className="flex flex-row gap-4 m-auto">
            <Tooltip content="Editar Link">
               <Button color="yellow" pill onClick={() => onEdit(short_url)}>
                  <HiOutlinePencilAlt className="h-6 w-6"/>
               </Button>
            </Tooltip>
            <Tooltip content="Estadísticas">
               <Button pill onClick={() => onStats(short_url)}>
                  <HiTrendingUp className="h-6 w-6"/>
               </Button>
            </Tooltip>
            <Tooltip content="Eliminar">
               <Button  color="red" pill onClick={() => onDelete(short_url)}>
                  <HiOutlineTrash className="h-6 w-6"/>
               </Button>
            </Tooltip>
         </div>
      </div>
   );
};

export default UrlCard;
