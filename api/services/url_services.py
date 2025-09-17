from extensions.database import db_session
from models.url import Url
from models.user import User
from schemas.url_schema import (
    URLShortenResponseSchema as URLSS,
    URLDeleteResponseSchema as URLDRS,
    URLStatsResponseSchema as URLStRS,
)
import random, string
from datetime import datetime, timezone


def validateURL(url, schema):
    try:
        return schema(**url)
    except:
        return False


def registerURL(original_url, user_email):
    user = db_session.query(User).filter(User.email == user_email).first()
    code=None
    #Mientras el codio generado exista en la base de datos, generamos uno nuevo
    while True:
        code = "".join(random.choices(string.ascii_letters + string.digits, k=8))
        existing_url = db_session.query(Url).filter(Url.short_url == code).first()
        if not existing_url:
            break

    new_url = Url(original_url=original_url, short_url=code, user_id=user.id)
    db_session.add(new_url)
    db_session.commit()

    return URLSS(
        message="URL Acortada Exitosamente",
        id=new_url.id,
        original_url=original_url,
        short_url=code,
        created_At=str(new_url.createdt_at),
        updated_At=str(new_url.updated_at),
    )


def getURLInfo(url_code, is_visit=False):
    url_data = db_session.query(Url).filter(Url.short_url == url_code).first()
    if not url_data:
        return None

    # Si es un click al url acortado, incrementamos el contador de visitas y la fecha de ultimo acceso
    if is_visit:
        url_data.clicks += 1
        url_data.last_accessed_at = datetime.now(timezone.utc)
        db_session.commit()

    return URLSS(
        message="URL encontrada exitosamente",
        id=url_data.id,
        original_url=url_data.original_url,
        short_url=url_code,
        created_At=str(url_data.createdt_at),
        updated_At=str(url_data.updated_at),
    )


def updateURLInfo(url_code, new_original_url, email):
    url_data = (
        db_session.query(Url)
        .join(User, Url.user_id == User.id)
        .filter(Url.short_url == url_code, User.email == email)
        .first()
    )
    if not url_data:
        return None

    url_data.original_url = new_original_url
    db_session.commit()

    return URLSS(
        message="URL actualizada exitosamente",
        id=url_data.id,
        original_url=new_original_url,
        short_url=url_code,
        created_At=str(url_data.createdt_at),
        updated_At=str(url_data.updated_at),
    )


def deleteURLInfo(url_code, email):
    url_data = (
        db_session.query(Url)
        .join(User, Url.user_id == User.id)
        .filter(Url.short_url == url_code, User.email == email)
        .first()
    )

    if not url_data:
        return None

    db_session.delete(url_data)
    db_session.commit()

    return URLDRS(message="URL borrada exitosamente")


def getURLStatsInfo(url_code, email):
    url_data = (
        db_session.query(Url)
        .join(User, Url.user_id == User.id)
        .filter(Url.short_url == url_code, User.email == email)
        .first()
    )
    if not url_data:
        return None

    return URLStRS(
        message="Estadisticas obtenidas exitosamente",
        id=url_data.id,
        original_url=url_data.original_url,
        short_url=url_code,
        created_At=str(url_data.createdt_at),
        updated_At=str(url_data.updated_at),
        clicks=url_data.clicks,
        last_accessed_at=(
            str(url_data.last_accessed_at) if url_data.last_accessed_at else None
        ),
    )
