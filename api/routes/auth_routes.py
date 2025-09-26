from flask import Blueprint, request, jsonify
from services.auth_services import is_User_Exists, registerUser, validateData, loginUser
from schemas.auth_schema import (
    UserRegLogSchema as URLS,
    UserLoginResponseSchema as ULRS,
)
from exceptions.customExceptions import InvalidDataInputException, UnauthorizedException
from flask import current_app

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    user_data = validateData(request.json, URLS)
    if not user_data:
        raise InvalidDataInputException()
        # return jsonify({"message": "Revisa la información ingresada."}), 400

    if is_User_Exists(user_data.email.lower()):
        return jsonify({"message": "Ya existe un usuario con este email."}), 400

    token = registerUser(user_data.email.lower(), user_data.password)
    current_app.logger.info(f"Se registro un nuevo usuario -> {user_data.email.lower()}")
    return (
        ULRS(jwtToken=token, message="Usuario Registrado Exitosamente").model_dump(),
        201,
    )


@auth_bp.route("/login", methods=["POST"])
def login():
    user_data = validateData(request.json, URLS)
    if not user_data:
        raise InvalidDataInputException()
        # return jsonify({"message": "Revisa la información ingresada."}), 400

    token = loginUser(user_data.email.lower(), user_data.password)
    if not token:
        raise UnauthorizedException()
    current_app.logger.info(f"El usuario -> {user_data.email.lower()}, inicio sesión")
    return ULRS(jwtToken=token).model_dump(), 200
