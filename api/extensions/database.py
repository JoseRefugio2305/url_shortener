from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, scoped_session
import config

# Declarative Base
Base = declarative_base()

# Crear el engine
engine = create_engine(
    config.Config.SQLALCHEMY_DATABASE_URI, echo=True, pool_pre_ping=True  # Logs de SQL
)

# Creamos la sesion
sessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
db_session = scoped_session(sessionLocal)


# Funcion para inicializar la base de datos en la aplciacion flask
def init_db(app):
    # Importamos todos los modelos de para la base de datos
    from models.user import User
    from models.url import Url

    # Creamos las tablas en la base de datos
    Base.metadata.create_all(bind=engine)

    # Asociamos la sesion de la base de datos con el contexto de la aplicacion
    @app.teardown_appcontext
    def shutdown_session(exception=None):
        db_session.remove()
