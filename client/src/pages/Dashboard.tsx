import { useEffect, useState } from "react";
import {
   Dropdown,
   DropdownItem,
   Label,
   Pagination,
   Spinner,
   TextInput,
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader,
} from "flowbite-react";
import UrlCard from "../components/UrlCard";
import type {
   ListURLs,
   Url,
   UrlDeletedResponse,
   UrlStats,
} from "../types/urlTypes";
import { HiOutlineSearch } from "react-icons/hi";
import {
   deleteURL,
   getURLList,
   getUrlStats,
   updateURL,
} from "../services/urlAPI";
import Swal from "sweetalert2";
import { useDebounce } from "../hooks/useDebounce";
import { IsURL } from "../utils/validateUtil";
import notFData from "../assets/NotDataFound.png"

export const Dashboard = () => {
   const [urls, setUrls] = useState<ListURLs>(); //Data
   const [page, setPage] = useState<number>(1); //Pagina actual
   const [pageSize, setPageSize] = useState<number>(6); //Numero de cards por pagina
   const [search, setSearch] = useState<string>("");
   const debouncedSearch: string = useDebounce(search, 500); //Damos un delay de 500 ms a cada cambio de la variable de search
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [isModal, setIsModal] = useState<boolean>(false);
   const [stats, setStats] = useState<UrlStats | undefined>(undefined);
   async function fetchUrls() {
      setIsLoading(true);
      try {
         const res: ListURLs = await getURLList({
            page,
            page_size: pageSize,
            search: debouncedSearch.trim(), //
            sort_by: "created_at",
            sort_dir: "desc",
         });
         if (res.statusCode == 200) {
            //Si se obtubo exitosamente se actualiza
            setUrls(res);
         } else {
            //Error
            Swal.fire({
               title: "Error",
               text: res.message,
               icon: "error",
            });
         }
      } catch (err) {
         //Error
         console.error("Error cargando URLs:", err);
         Swal.fire({
            title: "Error",
            text: "Ocurrió un error inesperado",
            icon: "error",
         });
      }
      setIsLoading(false);
   }

   useEffect(() => {
      fetchUrls(); //Cada cambio de pagina, tamano de registros o texto de busqueda
   }, [page, pageSize, debouncedSearch]);

   //Editar
   const handleEdit = (shortU: string) => {
      Swal.fire({
         //Primer ventana pedimos el nuevo URL
         title: "Ingresa el nuevo URL",
         input: "text",
         inputAttributes: {
            autocapitalize: "off",
         },
         showCancelButton: true,
         cancelButtonText: "Cancelar",
         confirmButtonText: "Editar",
         showLoaderOnConfirm: true,
         preConfirm: (nOUrl) => {
            if (IsURL(nOUrl)) {
               //Validamos el URL
               Swal.fire({
                  //Confirmacion de edicion
                  title: "¿Estás seguro?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  cancelButtonText: "Cancelar",
                  confirmButtonText: "Confirmar",
               }).then(async (result) => {
                  if (result.isConfirmed) {
                     try {
                        const resp: Url = await updateURL(shortU, nOUrl); //Hacemos peticion para editar la informacion

                        if (resp.statusCode === 200) {
                           //Edicion exitosa
                           Swal.fire({
                              title: "¡Éxito!",
                              text: resp.message,
                              icon: "success",
                           });
                           fetchUrls(); //Actualizamos los resultados para que se muestre la nueva informacion
                        } else {
                           //Error en la edicion
                           Swal.fire({
                              title: "Error",
                              text: resp.message,
                              icon: "error",
                           });
                        }
                     } catch (error) {
                        //Error en la edicion
                        console.log(error);
                        Swal.fire({
                           title: "Error",
                           text: "Ocurrió un error inesperado",
                           icon: "error",
                        });
                        return false;
                     }
                  }
               });
            } else {
               //Si no es una URL
               Swal.fire({
                  title: "Alerta",
                  text: "Lo que ingresaste no es una URL ",
                  icon: "warning",
               });
               return false;
            }
         },
         allowOutsideClick: () => !Swal.isLoading(),
      });
   };
   //Eliminar
   const handleDelete = (shortU: string) => {
      Swal.fire({
         //Ventana de confirmacion
         title: "¿Estás seguro de querer eliminar el URL?",
         text: "No podrás revertir esta acción.",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#d33",
         cancelButtonColor: "#3085d6",
         cancelButtonText: "Cancelar",
         confirmButtonText: "Confirmar",
      }).then(async (result) => {
         if (result.isConfirmed) {
            //Si es confirmado
            try {
               const resp: UrlDeletedResponse = await deleteURL(shortU); //Hacemos la peticion de eliminacion
               if (resp.statusCode === 204) {
                  //Si fue eliminado exitosamente
                  Swal.fire({
                     title: "¡Éxito!",
                     text: resp.message,
                     icon: "success",
                  });
                  fetchUrls(); //Actualizamos la informacion
               } else {
                  //Si hubo un error en la eliminacion
                  Swal.fire({
                     title: "Error",
                     text: resp.message,
                     icon: "error",
                  });
               }
            } catch (error) {
               //Error
               console.log(error);
               Swal.fire({
                  title: "Error",
                  text: "Ocurrió un error al procesar la petición.",
                  icon: "error",
               });
            }
         }
      });
   };
   //Estadisticas
   const handleStats = async (shortU: string) => {
      try {
         const resp: UrlStats = await getUrlStats(shortU);
         if (resp.statusCode === 200) {
            //Se obtuvo la informacion exitosamente
            setIsModal(true);
            setStats(resp);
         } else {
            //Si hubo un error en la obtencion de informacion
            Swal.fire({
               title: "Error",
               text: resp.message,
               icon: "error",
            });
         }
      } catch (error) {
         //Error
         console.log(error);
         Swal.fire({
            title: "Error",
            text: "Ocurrió un error al procesar la petición.",
            icon: "error",
         });
      }
   };

   return (
      <>
         <div className="min-h-screen p-15 flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-4 m-auto">
               Mis URLs Acortadas
            </h1>

            {/* Campo de búsqueda */}
            <div className="mb-4 flex items-center gap-2 flex-col sm:flex-row">
               <div className="mb-2 block">
                  <Label
                     htmlFor="searchText"
                     className="dark:text-black font-bold text-lg"
                  >
                     Buscar por URL o código:
                  </Label>
               </div>
               <TextInput
                  id="searchText"
                  value={search}
                  onChange={(e) => {
                     setSearch(e.target.value);
                     setPage(1); // resetear a la primera página
                  }}
                  className="rounded-lg px-3 py-2 w-full md:w-1/3"
                  type="text"
                  icon={HiOutlineSearch}
                  placeholder="Buscar por URL..."
                  disabled={isLoading}
               />
            </div>

            {/* Grid de cards */}
            {isLoading ? (
               <div className="flex flex-col items-center m-auto gap-4">
                  <h1 className="text-2xl font-bold mb-4 m-auto">
                     Cargando...
                  </h1>
                  <Spinner
                     color="purple"
                     aria-label="Purple spinner example"
                     size="xl"
                  />
               </div>
            ) : (
               <>
                  {/* Paginación */}
                  <div className="flex flex-col sm:flex-row items-center m-auto gap-4">
                     <Dropdown
                        label={`Ítems por página: ${pageSize}`}
                        color="alternative"
                     >
                        <DropdownItem
                           onClick={() => {
                              setPage(1);
                              setPageSize(6);
                           }}
                        >
                           6
                        </DropdownItem>
                        <DropdownItem
                           onClick={() => {
                              setPage(1);
                              setPageSize(12);
                           }}
                        >
                           12
                        </DropdownItem>
                        <DropdownItem
                           onClick={() => {
                              setPage(1);
                              setPageSize(18);
                           }}
                        >
                           18
                        </DropdownItem>
                        <DropdownItem
                           onClick={() => {
                              setPage(1);
                              setPageSize(24);
                           }}
                        >
                           24
                        </DropdownItem>
                     </Dropdown>
                     <Pagination
                        currentPage={page}
                        totalPages={
                           urls?.totalFiltered
                              ? Math.ceil(urls?.totalFiltered / pageSize)
                              : 1
                        }
                        onPageChange={(page: number) => setPage(page)}
                     />
                  </div>
                  {urls?.listUrls ? (
                     urls.listUrls.length > 0 ? (
                        <div>
                           <h1 className="text-lg font-bold mb-4 m-auto">
                              {`Mostrando de la ${
                                 pageSize * (page - 1) + 1
                              } a la ${
                                 pageSize * page < urls.totalFiltered
                                    ? pageSize * page
                                    : urls.totalFiltered
                              } de ${urls.totalFiltered} URLs`}
                           </h1>
                           <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center">
                              {urls?.listUrls.map((url) => (
                                 <UrlCard
                                    key={url.id}
                                    {...url}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onStats={handleStats}
                                 />
                              ))}
                           </div>
                        </div>
                     ) : (
                        <>
                           <h1 className="text-2xl font-bold m-auto">
                              {search.trim() === ""
                                 ? "No hay URLs"
                                 : "No hay URLs que correspondan a la búsqueda"}
                           </h1>
                           <img src={notFData} className="m-auto" width="500px" />
                        </>
                     )
                  ) : (
                     <>
                        <h1 className="text-2xl font-bold m-auto">
                           No hay URLs
                        </h1>
                        <img src={notFData} className="m-auto" width="500px" />
                     </>
                  )}
               </>
            )}
         </div>

         <Modal show={isModal} onClose={() => setIsModal(false)}>
            <ModalHeader>Estadísticas</ModalHeader>
            <ModalBody className="dark:bg-white">
               <div className="space-y-6">
                  <p className="text-base leading-relaxed text-dark dark:text-dark">
                     El código: <b>{` ${stats?.short_url}`}</b>
                  </p>
                  <p className="text-base leading-relaxed text-dark dark:text-dark truncate">
                     Conel URL original :<br></br>
                     <b>{` ${stats?.original_url}`}</b>
                  </p>
                  <p className="text-base leading-relaxed text-dark dark:text-dark">
                     Creado el: <b>{` ${stats?.created_At}`}</b>
                  </p>
                  <p className="text-base leading-relaxed text-dark dark:text-dark">
                     Ultima actualización el: <b>{` ${stats?.updated_At}`}</b>
                  </p>
                  <p className="text-base leading-relaxed text-dark dark:text-dark">
                     Tiene un total de <b>{` ${stats?.clicks}`}</b> clikcs
                  </p>
                  <p className="text-base leading-relaxed text-dark dark:text-dark">
                     La ultima visita que tuvo fue el:{" "}
                     <b>
                        {stats?.last_accessed_at
                           ? ` ${stats?.last_accessed_at}`
                           : "Nunca"}
                     </b>
                  </p>
               </div>
            </ModalBody>
            <ModalFooter className="dark:bg-white">
               <Button
                  color="alternative"
                  onClick={() => setIsModal(false)}
                  className="m-auto text-white dark:text-white"
                  size="xl"
               >
                  Cerrar
               </Button>
            </ModalFooter>
         </Modal>
      </>
   );
};
