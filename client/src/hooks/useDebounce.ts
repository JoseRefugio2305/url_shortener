import { useEffect, useState } from "react";

//Con este hook haremos daremos un delay al cambio de una propiedad
export function useDebounce<T>(value: T, delay: number) {//Recibimos la propiedad y el delay que tomara
     const [debouncedValue, setDebouncedValue] = useState(value)

     useEffect(() => {
          const handler = setTimeout(() => {
               setDebouncedValue(value);
          }, delay);

          return () => {
               clearTimeout(handler); // Si antes de que termine el delay, la funcion se vuelve a ejecutar limpia la anterior
          };
     }, [value, delay])

     return debouncedValue//Retornamos la propiedad qu recibimos
}