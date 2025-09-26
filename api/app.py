from flask import Flask
from config import Config, URL_FRONT
from extensions.database import init_db
from extensions.jwt import jwt
from routes.url_routes import url_bp
from routes.auth_routes import auth_bp
from flask_cors import CORS

import logging
from logging.handlers import RotatingFileHandler
import os


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Habilitamos CORS
    CORS(app, origin=URL_FRONT)

    # Inicializar extensiones
    init_db(app)
    jwt.init_app(app)

    # Registrar blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(url_bp, url_prefix="/url")

    # Manejo de logs
    if not os.path.exists("logs"):
        os.mkdir("logs")

    # Especificamos las configuraciones para los archivos de logs
    file_handler = RotatingFileHandler("logs/app.log", maxBytes=10485, backupCount=5, encoding="utf-8")
    # Especificamos el formateo del log
    formatter = logging.Formatter(
        "[%(asctime)s] on %(name)s Log  with level [%(levelname)s] in %(module)s: %(message)s"
    )
    file_handler.setFormatter(formatter)
    file_handler.setLevel(
        logging.DEBUG if app.config["ENV"] == "development" else logging.INFO
    )  # Cambiar a INFO en un entorno de produccion

    # Agregamos el logger a los loggers de la aplicacion
    app.logger.addHandler(file_handler)
    app.logger.setLevel(
        logging.DEBUG if app.config["ENV"] == "development" else logging.INFO
    )# Cambiar a INFO en un entorno de produccion

    # Manejo de excepciones globales
    @app.errorhandler(Exception)
    def handle_exception(e):
        if hasattr(e, "status_code"):
            app.logger.error(f"Código: {e.status_code} -> {str(e)}",exc_info=True)
            return {"message": str(e)}, e.status_code
        app.logger.error(f"{str(e)}",exc_info=True)
        return {
            "message": "Ocurrió un error al procesar tu solicitud en el servidor."
        }, 500

    app.logger.info("Se inicializo la aplicación correctamente")
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
