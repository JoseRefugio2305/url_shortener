from pydantic import BaseModel, EmailStr


# Schema para el registro y login de usuarios
class UserRegLogSchema(BaseModel):
    email: EmailStr
    password: str


# Respuesta de login y registro de usuario
class UserLoginResponseSchema(BaseModel):
    message: str = "Login Exitoso"
    jwtToken: str
