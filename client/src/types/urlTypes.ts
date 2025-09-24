export interface Url {//Url
     statusCode: number
     message: string
     id: number
     original_url: string
     short_url: string
     created_At: string
     updated_At: string
}

export interface UrlStats extends Url {//Url con estadisticas
     clicks: number
     last_accessed_at: string | undefined
     visible?: boolean
}

export interface ListURLs {//Lista de urls para dashboard
     statusCode: number
     message: string
     total: number
     totalFiltered: number
     listUrls: UrlStats[]
}

//Enum par almacenar los campos de ordenar
export enum SortBy {
     short_url = "short_url",
     original_url = "original_url",
     created_at = "created_at",
     updated_at = "updated_at",
     clicks = "clicks",
     last_accessed_at = "last_accessed_at",
}
 
//LazyState para filtrado en dashboard
export interface BodyRequestListURLs {
     page: number,
     page_size: number,
     search: string,
     sort_by: SortBy,
     sort_dir: string,
}

//Card de URL en dashboard
export interface UrlCardProps extends UrlStats {
     onEdit: (shortU: string) => void;
     onDelete: (shortU: string) => void;
     onStats: (shortU: string) => void;
}

//Response de URL eliminada
export interface UrlDeletedResponse {
     message: string
     statusCode: number
}