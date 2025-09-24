import {
   Button,
   Navbar,
   NavbarBrand,
   NavbarCollapse,
   NavbarLink,
   NavbarToggle,
} from "flowbite-react";
import viteLogo from "/icono.png";
import { useAuth } from "../hooks/useAuth";

function NavBarCmp() {
   const { token, logout } = useAuth();

   return (
      <Navbar fluid className="shadow-md">
         <NavbarBrand href="/">
            <img
               src={viteLogo}
               className="mr-5 h-10 sm:h-20"
               alt="Shorten URL Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
               Shortening URL
            </span>
         </NavbarBrand>
         <NavbarToggle />
         <NavbarCollapse>
            <NavbarLink href="/" className="text-sm sm:text-xl">
               Home
            </NavbarLink>

            {!token ? (
               <>
                  <NavbarLink href="/login" className="text-sm sm:text-xl">
                     Iniciar Sesión/Registrarse
                  </NavbarLink>
               </>
            ) : (
               <>
                  <NavbarLink href="/dashboard" className="text-sm sm:text-xl">
                     Dasboard
                  </NavbarLink>
                  <Button color="alternative" pill onClick={logout}>Cerrar sesión</Button>
               </>
            )}
            {/* <NavbarLink href="#">Services</NavbarLink>
            <NavbarLink href="#">Pricing</NavbarLink>
            <NavbarLink href="#">Contact</NavbarLink> */}
         </NavbarCollapse>
      </Navbar>
   );
}

export default NavBarCmp;
