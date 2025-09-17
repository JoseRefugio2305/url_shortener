from pydantic import BaseModel, EmailStr

#Schema para el registro y login de usuarios
class UserRegLogSchema(BaseModel):
    email: EmailStr
    password: str

#Respuesta a registro de usuario
class UserRegisterResponseSchema(BaseModel):
    message: str = "Usuario Registrado Exitosamente"

#Resouesta de login de usuario
class UserLoginResponseSchema(BaseModel):
    message: str = "Login Exitoso"
    jwtToken: str
