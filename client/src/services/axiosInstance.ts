import axios from "axios";

const API_URL = import.meta.env.VITEAPI_BASE_URL_PAGE || "http://127.0.0.1:5000";

const axiosInstance = axios.create({
     baseURL: API_URL,
     timeout: 5000,
     headers: {
          "Content-Type": "application/json",
     },
})

// Interceptor para agregar token a cada request
axiosInstance.interceptors.request.use(
     (config) => {
          const token = sessionStorage.getItem("token_jwt_url");
          if (token && config.headers) {
               config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
     },
     (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(function (response) {
     //Este se activa con los codigos 2xx
     return response;
},
     function (error) {
          const { status } = error.response
          //Revisamos si retorna un error de no terner autorizacion
          if (status == 401) {
               // sessionStorage.clear();
               // window.location.href = '/login'
          }

          return Promise.reject(error);
     });

// Interceptor para manejar errores de respuesta
axiosInstance.interceptors.response.use(
     (response) => response, // si la respuesta es correcta, se devuelve tal cual
     (error) => {
          if (error.response && error.response.status === 401) {//Error de autorizacion
               // El token ya no es válido
               sessionStorage.removeItem("token_jwt_url");

               // Redirigir al login si no se esta en el login
               if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
               }

          } else if (error.response && error.response.status === 500) {//Si hubo un error del servidor
               error.response.data.message = "Error al procesar la petición"
          }
          return Promise.reject(error);
     }
);

export default axiosInstance;