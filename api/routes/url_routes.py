from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from schemas.url_schema import (
    URLShortenRequestSchema as URLSR,
    URLUpdateRequestSchema as URLUR,
)
from exceptions.customExceptions import InvalidDataInputException, UnauthorizedException
from services.url_services import (
    validateURL,
    registerURL,
    getURLInfo,
    updateURLInfo,
    deleteURLInfo,
    getURLStatsInfo,
)

url_bp = Blueprint("url", __name__)


# Acortar URL
@url_bp.route("/shorten", methods=["POST"])
@jwt_required()
def shorten():
    user_email = get_jwt_identity()

    url = validateURL(request.json, URLSR)

    if not url:
        raise InvalidDataInputException()

    urlRespSchema = registerURL(str(url.original_url), user_email)
    return urlRespSchema.model_dump(), 201


# Obtener informacion de la URL
@url_bp.route("/shorten/<url_code>", methods=["GET"])
def getOriginalURL(url_code):
    url_data = getURLInfo(url_code, is_visit=True)
    if not url_data:
        return {"message": "URL no encontrada"}, 404
    return url_data.model_dump(), 200


# Actualizar URL
@url_bp.route("/shorten", methods=["PUT"])
@jwt_required()
def updateURL():
    url_data_request = validateURL(request.json, URLUR)
    if not url_data_request:
        raise InvalidDataInputException()

    url_data = getURLInfo(url_data_request.short_url)
    if not url_data:
        return {"message": "URL no encontrada"}, 404

    email = get_jwt_identity()
    upd_Info = updateURLInfo(
        url_data_request.short_url, str(url_data_request.new_original_url), email
    )
    if not upd_Info:
        raise UnauthorizedException(
            message="No estas autorizado para actualizar esta URL"
        )

    return upd_Info.model_dump(), 200


# Borrar URL
@url_bp.route("/shorten/<url_code>", methods=["DELETE"])
@jwt_required()
def deleteURL(url_code):
    url_data = getURLInfo(url_code)
    if not url_data:
        return {"message": "URL no encontrada"}, 404

    email = get_jwt_identity()

    url_DelInfo = deleteURLInfo(url_code, email)
    if not url_DelInfo:
        raise UnauthorizedException(
            message="No estas autorizado para eliminar esta URL"
        )

    return url_DelInfo.model_dump(), 204


# Estadisticas de la URL
@url_bp.route("/shorten/stats/<url_code>", methods=["GET"])
@jwt_required()
def getURLStats(url_code):
    is_Exists = getURLInfo(url_code)
    if not is_Exists:
        return {"message": "URL no encontrada"}, 404

    email = get_jwt_identity()
    stats = getURLStatsInfo(url_code, email)
    if not stats:
        raise UnauthorizedException(
            message="No estas autorizado para ver las estadisticas de esta URL"
        )

    return stats.model_dump(), 200
