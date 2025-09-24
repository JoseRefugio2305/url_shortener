
import type { BodyRequestListURLs, ListURLs, Url, UrlDeletedResponse, UrlStats } from "../types/urlTypes";
import axiosInstance from "./axiosInstance";

//Acortar URL
export async function urlShorten(url: string) {

     const response: Url = await axiosInstance.post("/url/shorten", {
          original_url: url
     })
          .then((r) => {
               return {
                    statusCode: r.status,
                    message: r.data.message,
                    id: r.data.id,
                    original_url: r.data.original_url,
                    short_url: r.data.short_url,
                    created_At: r.data.created_At,
                    updated_At: r.data.updated_At,
               }
          }).catch((error) => {
               return {
                    statusCode: error.response.status,
                    message: error.response.data.message,
                    id: 0,
                    original_url: "",
                    short_url: "",
                    created_At: "",
                    updated_At: "",
               }
          })
     return response
}

//Obtener URL original a partir de la acortada
export async function getOriginalURL(short_url_code: string) {
     const response: Url = await axiosInstance.get(`/url/shorten/${short_url_code}`)
          .then((r) => {
               return {
                    statusCode: r.status,
                    message: r.data.message,
                    id: r.data.id,
                    original_url: r.data.original_url,
                    short_url: r.data.short_url,
                    created_At: r.data.created_At,
                    updated_At: r.data.updated_At,
               }
          }).catch((error) => {
               return {
                    statusCode: error.response.status,
                    message: error.response.data.message,
                    id: 0,
                    original_url: "",
                    short_url: "",
                    created_At: "",
                    updated_At: "",
               }
          })

     return response
}

//Obtener la lista de URLs para el dashboard
export async function getURLList(lazyState: BodyRequestListURLs) {
     const response: ListURLs = await axiosInstance
          .post("/url/list", { ...lazyState })
          .then((resp) => {
               return {

                    statusCode: resp.status,
                    message: "Success",
                    total: resp.data.total,
                    totalFiltered: resp.data.totalFiltered,
                    listUrls: resp.data.urls,
               }
          })
          .catch((error) => {
               console.log(error);
               return {
                    statusCode: error.response.status,
                    message: error.response.data.message,
                    total: 0,
                    totalFiltered: 0,
                    listUrls: [],
               }
          });

     return response
}


//Actualizacion de URL
export async function updateURL(shortU: string, newOrgUrl: string) {
     const response: Url = await axiosInstance.put("url/shorten", {
          short_url: shortU,
          new_original_url: newOrgUrl
     }).then((r) => {
          return {
               statusCode: r.status,
               message: r.data.message,
               id: r.data.id,
               original_url: r.data.original_url,
               short_url: r.data.short_url,
               created_At: r.data.created_At,
               updated_At: r.data.updated_At,
          }
     }).catch((error) => {
          return {
               statusCode: error.response.status,
               message: error.response.data.message,
               id: 0,
               original_url: "",
               short_url: "",
               created_At: "",
               updated_At: "",
          }
     })
     return response
}

//Borrar URL
export async function deleteURL(shortU: string) {
     const response: UrlDeletedResponse = await axiosInstance.delete(`/url/shorten/${shortU}`)
          .then((r) => {
               return {
                    statusCode: r.status,
                    message: r.data.message,
               }
          }).catch((error) => {
               return {
                    statusCode: error.response.status,
                    message: error.response.data.message,
               }
          })
     return response
}

//Estadisticas de la URL
export async function getUrlStats(shortU: string) {
     const response: UrlStats = await axiosInstance.get(`/url/shorten/stats/${shortU}`)
          .then((r) => {
               return {
                    statusCode: r.status,
                    message: r.data.message,
                    id: r.data.id,
                    original_url: r.data.original_url,
                    short_url: r.data.short_url,
                    created_At: r.data.created_At,
                    updated_At: r.data.updated_At,
                    clicks: r.data.clicks,
                    last_accessed_at: r.data.last_accessed_at
               }
          }).catch((error) => {
               return {
                    statusCode: error.response.status,
                    message: error.response.data.message,
                    id: 0,
                    original_url: "",
                    short_url: "",
                    created_At: "",
                    updated_At: "", clicks: 0,
                    last_accessed_at: ""
               }
          })

     return response
}