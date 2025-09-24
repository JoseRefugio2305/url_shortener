import type { ResponseLogRes, UserLogReg } from "../types/authTypes";
import axiosInstance from "./axiosInstance";

export async function SignIn(logUser: UserLogReg) {
     const response: ResponseLogRes = await axiosInstance.post("/auth/login", {
          email: logUser.email, password: logUser.password
     }).then((r) => {
          return {
               statusCode: r.status,
               message: r.data.message,
               token: r.data.jwtToken
          }
     }).catch((error) => {
          return {
               statusCode: error.response.status,
               message: error.response.data?.message ? error.response.data?.message : "Error al procesar la petición",
               token: ""
          }
     })
     console.log(response)
     setTimeout(() => {
         
     }, 10000);
     return response 
}

export async function RegisterUser(regUser: UserLogReg) {
     const response: ResponseLogRes = await axiosInstance.post("/auth/register", {
          email: regUser.email,
          password: regUser.password
     })
          .then((r) => {
               return {
                    statusCode: r.status,
                    message: r.data.message,
                    token: r.data.jwtToken
               }
          })
          .catch((error) => {
               return {
                    statusCode: error.response.status,
                    message: error.response.data?.message ? error.response.data?.message : "Error al procesar la petición",
                    token: ""
               }
          })
     return response
}