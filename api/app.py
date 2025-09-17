from flask import Flask
from config import Config
from extensions.database import init_db
from extensions.jwt import jwt
from routes.url_routes import url_bp
from routes.auth_routes import auth_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar extensiones
    init_db(app)
    jwt.init_app(app)

    # Registrar blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(url_bp, url_prefix="/url")

    #Manejo de excepciones globales
    @app.errorhandler(Exception)
    def handle_exception(e):
        if hasattr(e, 'status_code'):
            return {"message": str(e)}, e.status_code
        return {"message": str(e)}, 500

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
