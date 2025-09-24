import "./assets/styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBarCmp from "./components/NavBar";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import FooterCmp from "./components/Footer";
import Login from "./pages/Login";
import { GoToShort } from "./pages/GoToShort";
import { NotFound404 } from "./pages/404";
import { Dashboard } from "./pages/Dashboard";

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primeicons/primeicons.css'; //icons


function App() {
   return (
      <AuthProvider>
         <BrowserRouter>
            <NavBarCmp />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/:short_url_code" element={<GoToShort/>}/>
               <Route path="/login" element={<Login/>}/>
               <Route
                  path="/dashboard"
                  element={
                     <ProtectedRoute>
                        <Dashboard />
                     </ProtectedRoute>
                  }
               />
               <Route path="*" element={<NotFound404 />} />
            </Routes>
            <FooterCmp/>
         </BrowserRouter>
      </AuthProvider>
   );
}

export default App;
