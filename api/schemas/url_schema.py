from pydantic import BaseModel, HttpUrl


# Schema para acortar URL
class URLShortenRequestSchema(BaseModel):
    original_url: HttpUrl


# Respuesta al acortar URL
class URLShortenResponseSchema(BaseModel):
    message: str
    id: int
    original_url: str
    short_url: str
    created_At: str
    updated_At: str


# Request de actualizacion de url
class URLUpdateRequestSchema(BaseModel):
    short_url: str
    new_original_url: HttpUrl


# Respuesta para actualizar url
class URLUpdateResponseSchema(URLShortenResponseSchema):
    message: str = "URL actualizada exitosamente"

# Respuesta para borrar URL
class URLDeleteResponseSchema(BaseModel):
    message: str = "URL borrada exitosamente"

#Respuesta para estadisticas de URL
class URLStatsResponseSchema(URLShortenResponseSchema):
    clicks: int
    last_accessed_at: str|None = None
