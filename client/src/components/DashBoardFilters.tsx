import { Dropdown, DropdownItem, Pagination } from "flowbite-react";
import { SortBy } from "../types/urlTypes";

interface DashboardControlsProps {
   orderBy: SortBy;
   setOrderBy: (order: SortBy) => void;
   orderDir: boolean;
   setOrderDir: (dir: boolean) => void;
   pageSize: number;
   setPageSize: (size: number) => void;
   page: number;
   setPage: (page: number) => void;
   totalFiltered: number;
}

const NombreCampos = {
   short_url: "URL Corta",
   original_url: "URL Original",
   created_at: "Fecha de creación",
   updated_at: "Fecha de actualización",
   clicks: "Clicks",
   last_accessed_at: "Ultima visita",
};

export function DashboardControls({
   orderBy,
   setOrderBy,
   orderDir,
   setOrderDir,
   pageSize,
   setPageSize,
   page,
   setPage,
   totalFiltered
}: DashboardControlsProps) {
   return (
      <div className="flex flex-col sm:flex-row items-center m-auto gap-4">
         <Dropdown
            label={`Ordenar por: ${NombreCampos[orderBy]}`}
            color="alternative"
         >
            {Object.keys(NombreCampos).map((key: string) => (
               <DropdownItem
                  key={key}
                  onClick={() => {
                     setPage(1);
                     setOrderBy(SortBy[key]);
                  }}
               >
                  {NombreCampos[key]}
               </DropdownItem>
            ))}
         </Dropdown>
         <Dropdown
            label={`Ordenar en: ${orderDir ? "Desc" : "Asc"}`}
            color="alternative"
         >
            <DropdownItem
               onClick={() => {
                  setPage(1);
                  setOrderDir(true);
               }}
            >
               Desc
            </DropdownItem>
            <DropdownItem
               onClick={() => {
                  setPage(1);
                  setOrderDir(false);
               }}
            >
               Asc
            </DropdownItem>
         </Dropdown>
         <Dropdown label={`Ítems por página: ${pageSize}`} color="alternative">
            {[6, 12, 18, 24].map((size) => (
               <DropdownItem
                  key={size}
                  onClick={() => {
                     setPage(1);
                     setPageSize(size);
                  }}
               >
                  {size}
               </DropdownItem>
            ))}
         </Dropdown>
         <Pagination
            currentPage={page}
            totalPages={totalFiltered ? Math.ceil(totalFiltered / pageSize) : 1}
            onPageChange={setPage}
         />
      </div>
   );
}
