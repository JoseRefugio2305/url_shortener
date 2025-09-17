import os
from dotenv import load_dotenv

load_dotenv()  # Carga las variables de entorno desde el archivo .env


##Clase con las variables de configuracion para flask
class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
